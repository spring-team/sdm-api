"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const allReposInTeamRepoFinder_1 = require("@atomist/automation-client/operations/common/allReposInTeamRepoFinder");
const GitHubFallbackReposParameters_1 = require("@atomist/automation-client/operations/common/params/GitHubFallbackReposParameters");
const editorToCommand_1 = require("@atomist/automation-client/operations/edit/editorToCommand");
const CachingProjectLoader_1 = require("../../../repo/CachingProjectLoader");
const projectLoaderRepoLoader_1 = require("../../../repo/projectLoaderRepoLoader");
const EmptyParameters_1 = require("../../EmptyParameters");
const editorCommand_1 = require("../editorCommand");
const editorWrappers_1 = require("../editorWrappers");
const NewBranchWithStatus_1 = require("./NewBranchWithStatus");
exports.DryRunContext = "atomist-dry-run";
/**
 * Wrap an editor in a command handler that sets a dry run status.
 * Typically used to wait for build success or failure, resulting in issue or PR.
 * Allows use of custom parameters as in editorCommand
 * Targeting (targets property) is handled automatically if the parameters
 * do not implement TargetsParams
 * @param edd function to make a fresh editor instance from the params
 * @param name editor name
 * @param paramsMaker parameters factory, typically the name of a class with a no arg constructor
 * @param details optional details to customize behavior
 * @param targets targets parameters. Allows targeting to other source control systems
 * Add intent "try edit <name>"
 */
function dryRunEditor(edd, paramsMaker = EmptyParameters_1.EmptyParameters, name, details = {}, targets = new GitHubFallbackReposParameters_1.GitHubFallbackReposParameters()) {
    if (!!details.editMode) {
        throw new Error("Cannot set editMode for dryRunEditor");
    }
    const detailsToUse = Object.assign({ description: details.description || name, intent: `try edit ${name}`, repoFinder: allReposInTeamRepoFinder_1.allReposInTeam(), repoLoader: p => projectLoaderRepoLoader_1.projectLoaderRepoLoader(new CachingProjectLoader_1.CachingProjectLoader(), p.targets.credentials), editMode: ((params) => {
            automation_client_1.logger.info("About to create edit mode for dry run editor: params=%j", params);
            const description = params.desiredPullRequestTitle || details.description || name;
            const status = {
                context: exports.DryRunContext,
                target_url: "https://www.atomist.com",
                description,
                state: "pending",
            };
            return new NewBranchWithStatus_1.NewBranchWithStatus(params.desiredBranchName || `edit-${name}-${Date.now()}`, toAtomistCommitMessage(params.desiredCommitMessage || description.substr(0, 50), description), params.targets.credentials, status);
        }) }, details);
    return editorToCommand_1.editorHandler(editorWrappers_1.chattyEditorFactory(name, edd), editorCommand_1.toEditorOrReviewerParametersMaker(paramsMaker, targets), name, detailsToUse);
}
exports.dryRunEditor = dryRunEditor;
function toAtomistCommitMessage(base, description) {
    return `${base}\n\n[atomist] ${description}`;
}
//# sourceMappingURL=dryRunEditor.js.map