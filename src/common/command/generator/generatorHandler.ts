/**
 * Create a generator function wrapping the given transform
 * @param {AnyProjectEditor} editorFactory editor for the transformation
 * @param factory construction function
 * @param {string} name name of the generator
 * @param {string} details object allowing customization beyond reasonable defaults
 * @return {HandleCommand}
 */
import { HandleCommand, HandlerContext, RedirectResult } from "@atomist/automation-client";
import { commandHandlerFrom, OnCommand } from "@atomist/automation-client/onCommand";
import { isGitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { RepoLoader } from "@atomist/automation-client/operations/common/repoLoader";
import { EditorFactory, GeneratorCommandDetails } from "@atomist/automation-client/operations/generate/generatorToCommand";
import { generate } from "@atomist/automation-client/operations/generate/generatorUtils";
import { RemoteGitProjectPersister } from "@atomist/automation-client/operations/generate/remoteGitProjectPersister";
import { SeedDrivenGeneratorParameters } from "@atomist/automation-client/operations/generate/SeedDrivenGeneratorParameters";
import { addAtomistWebhook } from "@atomist/automation-client/operations/generate/support/addAtomistWebhook";
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { Project } from "@atomist/automation-client/project/Project";
import { QueryNoCacheOptions } from "@atomist/automation-client/spi/graph/GraphClient";
import { Maker } from "@atomist/automation-client/util/constructionUtils";
import * as _ from "lodash";
import { CachingProjectLoader } from "../../repo/CachingProjectLoader";
import { projectLoaderRepoLoader } from "../../repo/projectLoaderRepoLoader";
import { allReposInTeam } from "../editor/allReposInTeam";

/**
 * Create a command handler for project generation
 * @param {EditorFactory<P extends SeedDrivenGeneratorParameters>} editorFactory to create editor to perform transformation
 * @param {Maker<P extends SeedDrivenGeneratorParameters>} factory
 * @param {string} name
 * @param {Partial<GeneratorCommandDetails<P extends SeedDrivenGeneratorParameters>>} details
 * @return {HandleCommand}
 */
export function generatorHandler<P extends SeedDrivenGeneratorParameters>(editorFactory: EditorFactory<P>,
                                                                          factory: Maker<P>,
                                                                          name: string,
                                                                          details: Partial<GeneratorCommandDetails<P>> = {}): HandleCommand {

    const detailsToUse: GeneratorCommandDetails<P> = {
        ...defaultDetails(name),
        ...details,
    };
    return commandHandlerFrom(handleGenerate(editorFactory, detailsToUse), factory, name,
        detailsToUse.description, detailsToUse.intent, detailsToUse.tags);
}

function handleGenerate<P extends SeedDrivenGeneratorParameters>(editorFactory: EditorFactory<P>,
                                                                 details: GeneratorCommandDetails<P>): OnCommand<P> {

    return (ctx: HandlerContext, parameters: P) => {
        return handle(ctx, editorFactory, parameters, details);
    };
}

async function handle<P extends SeedDrivenGeneratorParameters>(ctx: HandlerContext,
                                                               editorFactory: EditorFactory<P>,
                                                               params: P,
                                                               details: GeneratorCommandDetails<P>): Promise<RedirectResult> {
    const r = await generate(
        startingPoint(params, ctx, details.repoLoader(params), details)
            .then(p => {
                return ctx.messageClient.respond(`Cloned seed project from ${params.source.repoRef.url}`)
                    .then(() => p);
            }),
        ctx,
        params.target.credentials,
        editorFactory(params, ctx),
        details.projectPersister,
        params.target.repoRef,
        params,
        details.afterAction,
    );
    await ctx.messageClient.respond(`Created and pushed new project ${params.target.repoRef.url}`);
    if (isGitHubRepoRef(r.target.id)) {
        const webhookInstalled = await hasOrgWebhook(params.target.repoRef.owner, ctx);
        if (!webhookInstalled) {
            await addAtomistWebhook((r.target as GitProject), params);
        }
    }
    return {
        code: 0,
        // Redirect to local project page
        redirect: details.redirecter(params.target.repoRef),
    };
}

const OrgWebhookQuery = `query OrgWebhook($owner: String!) {
  Webhook(webhookType: organization) {
    org(owner: $owner) @required {
      owner
    }
  }
}`;

async function hasOrgWebhook(owner: string, ctx: HandlerContext): Promise<boolean> {
    const orgHooks = await ctx.graphClient.query<any, any>({
        query: OrgWebhookQuery,
        variables: {
            owner,
        },
        options: QueryNoCacheOptions,
    });
    const hookOwner = _.get(orgHooks, "Webhook[0].org.owner");
    return hookOwner === owner;
}

/**
 * Retrieve a seed
 * @param {HandlerContext} ctx
 * @param {RepoLoader} repoLoader
 * @param {P} params
 * @param details command details
 * @return {Promise<Project>}
 */
function startingPoint<P extends SeedDrivenGeneratorParameters>(params: P,
                                                                ctx: HandlerContext,
                                                                repoLoader: RepoLoader,
                                                                details: GeneratorCommandDetails<any>): Promise<Project> {

    return repoLoader(params.source.repoRef);
}

function defaultDetails<P extends SeedDrivenGeneratorParameters>(name: string): GeneratorCommandDetails<P> {
    return {
        description: name,
        repoFinder: allReposInTeam(),
        repoLoader: (p: P) => projectLoaderRepoLoader(new CachingProjectLoader(), p.target.credentials),
        projectPersister: RemoteGitProjectPersister,
        redirecter: () => undefined,
    };
}
