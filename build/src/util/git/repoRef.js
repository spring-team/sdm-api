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
const _ = require("lodash");
const BitBucketServerRepoRef_1 = require("../../common/command/BitBucketServerRepoRef");
const types_1 = require("../../typings/types");
/**
 * Obtain a RemoteRepoRef from the given push, correctly
 * resolving provider.
 * @param {OnPushToAnyBranch.Push} push
 * @return {any}
 */
function repoRefFromPush(push) {
    const providerType = push.repo.org.provider.providerType;
    switch (providerType) {
        case types_1.ProviderType.github_com:
        case types_1.ProviderType.ghe:
            return GitHubRepoRef_1.GitHubRepoRef.from({
                owner: push.repo.owner,
                repo: push.repo.name,
                sha: push.after.sha,
                rawApiBase: push.repo.org.provider.apiUrl,
                branch: push.branch,
            });
        case types_1.ProviderType.bitbucket:
            const providerUrl = push.repo.org.provider.url;
            return toBitBucketServerRepoRef({
                providerUrl,
                owner: push.repo.owner,
                name: push.repo.name,
                sha: push.after.sha,
                branch: push.branch,
            });
        case types_1.ProviderType.bitbucket_cloud:
            throw new Error("BitBucket Cloud not yet supported");
        default:
            throw new Error(`Provider ${providerType} not currently supported in SDM`);
    }
}
exports.repoRefFromPush = repoRefFromPush;
function toBitBucketServerRepoRef(params) {
    const url = params.providerUrl;
    const id = new BitBucketServerRepoRef_1.BitBucketServerRepoRef(url, params.owner, params.name, true, params.sha);
    id.branch = params.branch;
    // id.cloneUrl = (creds: BasicAuthCredentials) =>
    //     `http://${encodeURIComponent(creds.username)}:${encodeURIComponent(creds.password)}@${id.remoteBase}${id.pathComponent}.git`;
    return id;
}
exports.toBitBucketServerRepoRef = toBitBucketServerRepoRef;
function providerIdFromPush(push) {
    return push.repo.org.provider.providerId;
}
exports.providerIdFromPush = providerIdFromPush;
function providerIdFromStatus(status) {
    return status.commit.repo.org.provider.providerId;
}
exports.providerIdFromStatus = providerIdFromStatus;
function repoRefFromStatus(status) {
    return GitHubRepoRef_1.GitHubRepoRef.from({
        owner: status.commit.repo.owner,
        repo: status.commit.repo.name,
        sha: status.commit.sha,
        rawApiBase: status.commit.repo.org.provider.apiUrl,
        branch: _.get(status, "commit.pushes[0].branch"),
    });
}
exports.repoRefFromStatus = repoRefFromStatus;
function repoRefFromSdmGoal(sdmGoal, provider) {
    switch (provider.providerType) {
        case types_1.ProviderType.github_com:
        case types_1.ProviderType.ghe:
            return GitHubRepoRef_1.GitHubRepoRef.from({
                owner: sdmGoal.repo.owner,
                repo: sdmGoal.repo.name,
                sha: sdmGoal.sha,
                branch: sdmGoal.branch,
                rawApiBase: provider.apiUrl,
            });
        case types_1.ProviderType.bitbucket:
            const providerUrl = provider.url;
            return toBitBucketServerRepoRef({
                providerUrl,
                owner: sdmGoal.repo.owner,
                name: sdmGoal.repo.name,
                sha: sdmGoal.sha,
                branch: sdmGoal.branch,
            });
        default:
            throw new Error(`Provider ${provider.providerType} not currently supported in SDM`);
    }
}
exports.repoRefFromSdmGoal = repoRefFromSdmGoal;
/**
 * Convert GraphQL return to our remote repo ref, instantiating
 * the correct type based on provider
 * @param {CoreRepoFieldsAndChannels.Fragment} repo
 * @param opts options - sha or branch
 * @return {RemoteRepoRef}
 */
function toRemoteRepoRef(repo, opts = {}) {
    const providerType = _.get(repo, "org.provider.providerType");
    const apiUrl = _.get(repo, "org.provider.apiUrl");
    automation_client_1.logger.info("toRemoteRepoRef with GraphQL-sourced repo: %j", repo);
    switch (providerType) {
        case undefined:
        case null:
        case types_1.ProviderType.github_com:
        case types_1.ProviderType.ghe:
            return GitHubRepoRef_1.GitHubRepoRef.from({
                owner: repo.owner,
                repo: repo.name,
                sha: opts.sha,
                branch: opts.branch,
                rawApiBase: apiUrl,
            });
        case types_1.ProviderType.bitbucket:
            return toBitBucketServerRepoRef({
                owner: repo.owner,
                name: repo.name,
                sha: opts.sha,
                branch: opts.branch,
                providerUrl: apiUrl,
            });
        default:
            throw new Error(`Provider ${repo.org.provider.providerType} not currently supported in SDM`);
    }
}
exports.toRemoteRepoRef = toRemoteRepoRef;
//# sourceMappingURL=repoRef.js.map