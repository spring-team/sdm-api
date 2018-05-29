/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    HandleCommand,
    HandlerContext,
    MappedParameter,
    MappedParameters,
    Parameter,
    Secret,
    Secrets,
    success,
    Success,
} from "@atomist/automation-client";
import { Parameters } from "@atomist/automation-client/decorators";
import { commandHandlerFrom } from "@atomist/automation-client/onCommand";
import { GitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { deleteRepository } from "../../util/github/ghub";
import { fetchProvider } from "../../util/github/gitHubProvider";

@Parameters()
export class DeleteRepositoryParameters {

    @Secret(Secrets.userToken("delete_repo"))
    public githubToken: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubRepositoryProvider)
    public providerId: string;

    @Parameter({required: true})
    public areYouSure: string;
}

export const DeleteRepositoryCommandName = "DeleteRepository";

export function deleteRepositoryCommand(): HandleCommand {
    return commandHandlerFrom(deleteRepositoryPlease(),
        DeleteRepositoryParameters,
        DeleteRepositoryCommandName,
        "Really delete the GitHub repository",
        "delete this repository");
}

function deleteRepositoryPlease() {
    return async (ctx: HandlerContext, commandParams: DeleteRepositoryParameters) => {
        if (commandParams.areYouSure.toLowerCase() !== "yes") {
            return ctx.messageClient.respond("You didn't say 'yes' to 'are you sure?' so I won't do anything.")
                .then(success);
        }

        const provider = await fetchProvider(ctx, commandParams.providerId);
        const id = GitHubRepoRef.from({owner: commandParams.owner, repo: commandParams.repo, rawApiBase: provider.apiUrl});

        await deleteRepository(commandParams.githubToken, id);
        return Success;
    };
}
