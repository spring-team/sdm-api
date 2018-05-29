"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const onCommand_1 = require("@atomist/automation-client/onCommand");
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const generatorUtils_1 = require("@atomist/automation-client/operations/generate/generatorUtils");
const remoteGitProjectPersister_1 = require("@atomist/automation-client/operations/generate/remoteGitProjectPersister");
const addAtomistWebhook_1 = require("@atomist/automation-client/operations/generate/support/addAtomistWebhook");
const GraphClient_1 = require("@atomist/automation-client/spi/graph/GraphClient");
const _ = require("lodash");
const CachingProjectLoader_1 = require("../../repo/CachingProjectLoader");
const projectLoaderRepoLoader_1 = require("../../repo/projectLoaderRepoLoader");
const allReposInTeam_1 = require("../editor/allReposInTeam");
/**
 * Create a command handler for project generation
 * @param {EditorFactory<P extends SeedDrivenGeneratorParameters>} editorFactory to create editor to perform transformation
 * @param {Maker<P extends SeedDrivenGeneratorParameters>} factory
 * @param {string} name
 * @param {Partial<GeneratorCommandDetails<P extends SeedDrivenGeneratorParameters>>} details
 * @return {HandleCommand}
 */
function generatorHandler(editorFactory, factory, name, details = {}) {
    const detailsToUse = Object.assign({}, defaultDetails(name), details);
    return onCommand_1.commandHandlerFrom(handleGenerate(editorFactory, detailsToUse), factory, name, detailsToUse.description, detailsToUse.intent, detailsToUse.tags);
}
exports.generatorHandler = generatorHandler;
function handleGenerate(editorFactory, details) {
    return (ctx, parameters) => {
        return handle(ctx, editorFactory, parameters, details);
    };
}
function handle(ctx, editorFactory, params, details) {
    return __awaiter(this, void 0, void 0, function* () {
        const r = yield generatorUtils_1.generate(startingPoint(params, ctx, details.repoLoader(params), details)
            .then(p => {
            return ctx.messageClient.respond(`Cloned seed project from ${params.source.repoRef.url}`)
                .then(() => p);
        }), ctx, params.target.credentials, editorFactory(params, ctx), details.projectPersister, params.target.repoRef, params, details.afterAction);
        yield ctx.messageClient.respond(`Created and pushed new project ${params.target.repoRef.url}`);
        if (GitHubRepoRef_1.isGitHubRepoRef(r.target.id)) {
            const webhookInstalled = yield hasOrgWebhook(params.target.repoRef.owner, ctx);
            if (!webhookInstalled) {
                yield addAtomistWebhook_1.addAtomistWebhook(r.target, params);
            }
        }
        return {
            code: 0,
            // Redirect to local project page
            redirect: details.redirecter(params.target.repoRef),
        };
    });
}
const OrgWebhookQuery = `query OrgWebhook($owner: String!) {
  Webhook(webhookType: organization) {
    org(owner: $owner) @required {
      owner
    }
  }
}`;
function hasOrgWebhook(owner, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const orgHooks = yield ctx.graphClient.query({
            query: OrgWebhookQuery,
            variables: {
                owner,
            },
            options: GraphClient_1.QueryNoCacheOptions,
        });
        const hookOwner = _.get(orgHooks, "Webhook[0].org.owner");
        return hookOwner === owner;
    });
}
/**
 * Retrieve a seed
 * @param {HandlerContext} ctx
 * @param {RepoLoader} repoLoader
 * @param {P} params
 * @param details command details
 * @return {Promise<Project>}
 */
function startingPoint(params, ctx, repoLoader, details) {
    return repoLoader(params.source.repoRef);
}
function defaultDetails(name) {
    return {
        description: name,
        repoFinder: allReposInTeam_1.allReposInTeam(),
        repoLoader: (p) => projectLoaderRepoLoader_1.projectLoaderRepoLoader(new CachingProjectLoader_1.CachingProjectLoader(), p.target.credentials),
        projectPersister: remoteGitProjectPersister_1.RemoteGitProjectPersister,
        redirecter: () => undefined,
    };
}
//# sourceMappingURL=generatorHandler.js.map