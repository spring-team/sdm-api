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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const retry_1 = require("@atomist/automation-client/util/retry");
const axios_1 = require("axios");
const toToken_1 = require("../credentials/toToken");
/**
 * Create a GitHub status
 * @param {string | ProjectOperationCredentials} creds
 * @param {GitHubRepoRef} rr
 * @param {Status} inputStatus
 * @return {AxiosPromise}
 */
function createStatus(creds, rr, inputStatus) {
    const config = authHeaders(toToken_1.toToken(creds));
    const saferStatus = ensureValidUrl(inputStatus);
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}/statuses/${rr.sha}`;
    automation_client_1.logger.info("Updating github status: %s to %j", url, saferStatus);
    return retry_1.doWithRetry(() => axios_1.default.post(url, saferStatus, config).catch(err => Promise.reject(new Error(`Error hitting ${url} to set status ${JSON.stringify(saferStatus)}: ${err.message}`))), `Updating github status: ${url} to ${JSON.stringify(saferStatus)}`, {});
}
exports.createStatus = createStatus;
/*
 * If you send a targetUrl that doesn't work, GitHub will not accept the status.
 * Commonly on findArtifact, we get a Docker image name instead, and people really want
 * to put that in the URL but it doesn't work.
 *
 * This limitation exists only because we are using GitHub Statuses for Goals right now,
 * and when we move to a custom event it won't be the same problem. So it makes sense
 * to encode the limitation here.
 *
 * Yes the description is going to be ugly. Deal with it.
 */
function ensureValidUrl(inputStatus) {
    if (!inputStatus.target_url) {
        return inputStatus;
    }
    if (inputStatus.target_url.startsWith("http")) {
        return inputStatus;
    }
    automation_client_1.logger.warn("Illegal to send a non-url in target_url, so I'm appending it to the description");
    return {
        target_url: undefined,
        description: inputStatus.description + " at " + inputStatus.target_url,
        state: inputStatus.state,
        context: inputStatus.context,
    };
}
function createTag(creds, rr, tag) {
    const config = authHeaders(toToken_1.toToken(creds));
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}/git/tags`;
    automation_client_1.logger.info("Updating github tag: %s to %j", url, tag);
    return retry_1.doWithRetry(() => axios_1.default.post(url, tag, config)
        .catch(err => Promise.reject(new Error(`Error hitting ${url} to set tag ${JSON.stringify(tag)}: ${err.message}`))), `Updating github tag: ${url} to ${JSON.stringify(tag)}`, {});
}
exports.createTag = createTag;
function createTagReference(creds, rr, tag) {
    const config = authHeaders(toToken_1.toToken(creds));
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}/git/refs`;
    automation_client_1.logger.info("Creating github reference: %s to %j", url, tag);
    return retry_1.doWithRetry(() => axios_1.default.post(url, { ref: `refs/tags/${tag.tag}`, sha: tag.object }, config)
        .catch(err => Promise.reject(new Error(`Error hitting ${url} to set tag ${JSON.stringify(tag)}: ${err.message}`))), `Updating github tag: ${url} to ${JSON.stringify(tag)}`, {});
}
exports.createTagReference = createTagReference;
function deleteRepository(creds, rr) {
    const config = authHeaders(toToken_1.toToken(creds));
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}`;
    automation_client_1.logger.info("Deleting repository: %s", url);
    return axios_1.default.delete(url, config)
        .catch(err => {
        automation_client_1.logger.error(err.message);
        automation_client_1.logger.error(err.response.body);
        return Promise.reject(new Error(`Error hitting ${url} to delete repo`));
    });
}
exports.deleteRepository = deleteRepository;
function createRelease(creds, rr, release) {
    const config = authHeaders(toToken_1.toToken(creds));
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}/releases`;
    automation_client_1.logger.info("Updating github release: %s to %j", url, release);
    return retry_1.doWithRetry(() => axios_1.default.post(url, release, config)
        .catch(err => Promise.reject(new Error(`Error hitting ${url} to set release ${JSON.stringify(release)}: ${err.message}`))), `Updating github release: ${url} to ${JSON.stringify(release)}`, {});
}
exports.createRelease = createRelease;
/**
 * List commits between these shas
 * @param {string | ProjectOperationCredentials} creds
 * @param {GitHubRepoRef} rr
 * @param {string} startSha
 * @param {string} endSha
 * @return {Promise<GitHubCommitsBetween>}
 */
function listCommitsBetween(creds, rr, startSha, endSha) {
    const config = authHeaders(toToken_1.toToken(creds));
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}/compare/${startSha}...${endSha}`;
    return axios_1.default.get(url, config)
        .then(ap => ap.data);
}
exports.listCommitsBetween = listCommitsBetween;
function authHeaders(token) {
    return token ? {
        headers: {
            Authorization: `token ${token}`,
        },
    }
        : {};
}
exports.authHeaders = authHeaders;
function tipOfDefaultBranch(creds, rr) {
    // TODO: use real default branch
    const config = authHeaders(toToken_1.toToken(creds));
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}/branches/master`;
    return axios_1.default.get(url, config)
        .then(ap => ap.data.commit.sha);
}
exports.tipOfDefaultBranch = tipOfDefaultBranch;
function isPublicRepo(creds, rr) {
    const config = authHeaders(toToken_1.toToken(creds));
    const url = `${rr.apiBase}/repos/${rr.owner}/${rr.repo}`;
    return axios_1.default.get(url, config)
        .then(ap => {
        const privateness = ap.data.private;
        automation_client_1.logger.info(`Retrieved ${url}. Private is '${privateness}'`);
        return !privateness;
    })
        .catch(ap => {
        automation_client_1.logger.warn(`Could not access ${url} to determine repo visibility: ${ap.response.status}`);
        return false;
    });
}
exports.isPublicRepo = isPublicRepo;
// TODO move to client
function updateIssue(creds, rr, issueNumber, issue) {
    const grr = GitHubRepoRef_1.isGitHubRepoRef(rr) ? rr : new GitHubRepoRef_1.GitHubRepoRef(rr.owner, rr.repo, rr.sha);
    const url = `${grr.apiBase}/repos/${grr.owner}/${grr.repo}/issues/${issueNumber}`;
    automation_client_1.logger.debug(`Request to '${url}' to update issue`);
    return axios_1.default.patch(url, issue, authHeaders(toToken_1.toToken(creds)));
}
exports.updateIssue = updateIssue;
function listTopics(creds, rr) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            headers: Object.assign({}, authHeaders(toToken_1.toToken(creds)).headers, { Accept: "application/vnd.github.mercy-preview+json" }),
        };
        const grr = GitHubRepoRef_1.isGitHubRepoRef(rr) ? rr : new GitHubRepoRef_1.GitHubRepoRef(rr.owner, rr.repo, rr.sha);
        const url = `${grr.apiBase}/repos/${grr.owner}/${grr.repo}/topics`;
        const topics = yield axios_1.default.get(url, headers);
        return topics.data.names;
    });
}
exports.listTopics = listTopics;
//# sourceMappingURL=ghub.js.map