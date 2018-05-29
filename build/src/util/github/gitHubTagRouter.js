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
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const ActionResult_1 = require("@atomist/automation-client/action/ActionResult");
const axios_1 = require("axios");
const _ = require("lodash");
const toToken_1 = require("../credentials/toToken");
/**
 * Persist tags to GitHub topics
 * @param {Tags} tags
 * @param params params to this command
 * @return {Promise<ActionResult<Tags>>}
 * @constructor
 */
exports.GitHubTagRouter = (tags, params) => {
    const grr = GitHubRepoRef_1.isGitHubRepoRef(tags.repoId) ? tags.repoId : new GitHubRepoRef_1.GitHubRepoRef(tags.repoId.owner, tags.repoId.repo, tags.repoId.sha);
    const apiBase = grr.apiBase.replace(/\/*$/, "");
    const url = `${apiBase}/repos/${grr.owner}/${grr.repo}/topics`;
    automation_client_1.logger.debug(`Request to '${url}' to raise tags: [${tags.tags.join()}]`);
    return axios_1.default.put(url, { names: _.uniq(tags.tags) }, 
    // Mix in custom media type for
    {
        headers: Object.assign({}, authHeaders(toToken_1.toToken(params.targets.credentials)).headers, { Accept: "application/vnd.github.mercy-preview+json" }),
    })
        .then(x => ActionResult_1.successOn(tags));
};
function authHeaders(token) {
    return token ? {
        headers: {
            Authorization: `token ${token}`,
        },
    }
        : {};
}
//# sourceMappingURL=gitHubTagRouter.js.map