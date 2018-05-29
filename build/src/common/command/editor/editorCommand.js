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
const GitHubFallbackReposParameters_1 = require("@atomist/automation-client/operations/common/params/GitHubFallbackReposParameters");
const editModes_1 = require("@atomist/automation-client/operations/edit/editModes");
const editorToCommand_1 = require("@atomist/automation-client/operations/edit/editorToCommand");
const constructionUtils_1 = require("@atomist/automation-client/util/constructionUtils");
const assert = require("power-assert");
const CachingProjectLoader_1 = require("../../repo/CachingProjectLoader");
const projectLoaderRepoLoader_1 = require("../../repo/projectLoaderRepoLoader");
const EmptyParameters_1 = require("../EmptyParameters");
const allReposInTeam_1 = require("./allReposInTeam");
const editorWrappers_1 = require("./editorWrappers");
/**
 * Wrap an editor in a command handler, allowing use of custom parameters.
 * Targeting (targets property) is handled automatically if the parameters
 * do not implement TargetsParams
 * @param edd function to make a fresh editor instance from the params
 * @param name editor name
 * @param paramsMaker parameters factory, typically the name of a class with a no arg constructor
 * @param targets targets parameters. Allows targeting to other source control systems
 * @param details optional details to customize behavior
 * Add intent "edit <name>"
 */
function editorCommand(edd, name, paramsMaker = EmptyParameters_1.EmptyParameters, details = {}, targets = new GitHubFallbackReposParameters_1.GitHubFallbackReposParameters()) {
    const description = details.description || name;
    const detailsToUse = Object.assign({ description, intent: `edit ${name}`, repoFinder: allReposInTeam_1.allReposInTeam(), repoLoader: p => projectLoaderRepoLoader_1.projectLoaderRepoLoader(new CachingProjectLoader_1.CachingProjectLoader(), p.targets.credentials), editMode: ((params) => new editModes_1.PullRequest(params.desiredBranchName || `edit-${name}-${Date.now()}`, params.desiredPullRequestTitle || description)) }, details);
    return editorToCommand_1.editorHandler(editorWrappers_1.chattyEditorFactory(name, edd), toEditorOrReviewerParametersMaker(paramsMaker, targets), name, detailsToUse);
}
exports.editorCommand = editorCommand;
/**
 * Return a parameters maker that is targeting aware
 * @param {Maker<PARAMS>} paramsMaker
 * @param targets targets parameters to set if necessary
 * @return {Maker<EditorOrReviewerParameters & PARAMS>}
 */
function toEditorOrReviewerParametersMaker(paramsMaker, targets) {
    const sampleParams = constructionUtils_1.toFactory(paramsMaker)();
    return isEditorOrReviewerParameters(sampleParams) ?
        paramsMaker :
        () => {
            const rawParms = constructionUtils_1.toFactory(paramsMaker)();
            const allParms = rawParms;
            allParms.targets = targets;
            allParms.bindAndValidate = () => {
                validate(targets);
            };
            return allParms;
        };
}
exports.toEditorOrReviewerParametersMaker = toEditorOrReviewerParametersMaker;
function isEditorOrReviewerParameters(p) {
    return !!p.targets;
}
function validate(targets) {
    if (!targets.repo) {
        assert(!!targets.repos, "Must set repos or repo");
        targets.repo = targets.repos;
    }
}
//# sourceMappingURL=editorCommand.js.map