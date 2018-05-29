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
const axios_1 = require("axios");
const promiseRetry = require("promise-retry");
const DefaultRetryOptions = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 500,
    maxTimeout: 5 * 1000,
    randomize: true,
};
/**
 * Post to the Atomist generic build webhook URL.  It creates the payload
 * then uses postWebhook.
 *
 * @param owner repository owner, i.e., user or organization
 * @param repo name of repository
 * @param branch commit branch
 * @param commit commit SHA
 * @param status "start", "success", or "fail"
 * @param teamId Atomist team ID
 * @param retryOptions change default retry options
 * @return true if successful, false on failure after retries
 */
function postBuildWebhook(owner, repo, branch, commit, status, teamId, retryOptions = DefaultRetryOptions) {
    const payload = {
        repository: { owner_name: owner, name: repo },
        type: "push",
        status,
        commit,
        branch,
        provider: "GoogleContainerBuilder",
    };
    return postWebhook("build", payload, teamId, retryOptions);
}
exports.postBuildWebhook = postBuildWebhook;
/**
 * Post to the Atomist link-image webhook URL.  It creates the payload
 * then uses postWebhook.
 *
 * @param owner repository owner, i.e., user or organization
 * @param repo name of repository
 * @param commit commit SHA
 * @param image Docker image tag, e.g., registry.com/owner/repo:version
 * @param teamId Atomist team ID
 * @param retryOptions change default retry options
 * @return true if successful, false on failure after retries
 */
function postLinkImageWebhook(owner, repo, commit, image, teamId, retryOptions = DefaultRetryOptions) {
    const payload = {
        git: {
            owner,
            repo,
            sha: commit,
        },
        docker: {
            image,
        },
        type: "link-image",
    };
    return postWebhook("link-image", payload, teamId, retryOptions);
}
exports.postLinkImageWebhook = postLinkImageWebhook;
/**
 * Post payload to the Atomist webhook URL.  It will retry
 * several times.
 *
 * @param webhook type of webhook
 * @param payload object to post
 * @param teamId Atomist team ID
 * @param retryOptions change default retry options
 * @return true if successful, false on failure after retries
 */
function postWebhook(webhook, payload, teamId, retryOptions = DefaultRetryOptions) {
    automation_client_1.logger.info("Posting webhook: %j", payload);
    const baseUrl = process.env.ATOMIST_WEBHOOK_BASEURL || "https://webhook.atomist.com";
    const url = `${baseUrl}/atomist/${webhook}/teams/${teamId}`;
    return promiseRetry(retryOptions, (retry, retryCount) => {
        automation_client_1.logger.debug("posting '%j' to '%s' attempt %d", payload, url, retryCount);
        return axios_1.default.post(url, payload)
            .then(() => true)
            .catch(err => {
            automation_client_1.logger.debug("error posting '%j' to '%s': %j", payload, url, err);
            retry(err);
        });
    })
        .catch(err => {
        automation_client_1.logger.error("failed to post '%j' to '%s': %j", payload, url, err);
        return false;
    });
}
exports.postWebhook = postWebhook;
//# sourceMappingURL=ImageLink.js.map