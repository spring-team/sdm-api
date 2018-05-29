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
const ActionResult_1 = require("@atomist/automation-client/action/ActionResult");
const RepoId_1 = require("@atomist/automation-client/operations/common/RepoId");
const BasicAuthCredentials_1 = require("@atomist/automation-client/operations/common/BasicAuthCredentials");
const axios_1 = require("axios");
const base64_1 = require("../../util/misc/base64");
const AbstractRemoteRepoRef_1 = require("./AbstractRemoteRepoRef");
/**
 * RemoteRepoRef implementation for BitBucket server (not BitBucket Cloud)
 *
 * This should ultimately move to automation-client-ts
 */
class BitBucketServerRepoRef extends AbstractRemoteRepoRef_1.AbstractRemoteRepoRef {
    /**
     * Construct a new BitBucketServerRepoRef
     * @param {string} remoteBase remote base, including scheme
     * @param {string} owner
     * @param {string} repo
     * @param {boolean} isProject
     * @param {string} sha
     * @param {string} path
     */
    constructor(remoteBase, owner, repo, isProject = true, sha = "master", path) {
        super(RepoId_1.ProviderType.bitbucket, remoteBase, owner, repo, sha, path);
        this.isProject = isProject;
        this.ownerType = isProject ? "projects" : "users";
        automation_client_1.logger.info("Constructed BitBucketServerRepoRef: %j", this);
    }
    createRemote(creds, description, visibility) {
        const url = `${this.scheme}${this.apiBase}/${this.apiBasePathComponent}`;
        const data = {
            name: this.repo,
            scmId: "git",
            forkable: "true",
        };
        const hdrs = headers(creds);
        automation_client_1.logger.info("Making request to BitBucket '%s' to create repo, data=%j, headers=%j", url, data, hdrs);
        return axios_1.default.post(url, data, hdrs)
            .then(axiosResponse => {
            return {
                target: this,
                success: true,
                axiosResponse,
            };
        })
            .catch(error => {
            automation_client_1.logger.error("Error attempting to create repository %j: %s", this, error);
            return Promise.reject(error);
        });
    }
    deleteRemote(creds) {
        const url = `${this.scheme}${this.apiBase}/${this.apiPathComponent}`;
        automation_client_1.logger.debug(`Making request to '${url}' to delete repo`);
        return axios_1.default.delete(url, headers(creds))
            .then(axiosResponse => {
            return {
                target: this,
                success: true,
                axiosResponse,
            };
        })
            .catch(err => {
            automation_client_1.logger.error(`Error attempting to delete repository: ${err}`);
            return Promise.reject(err);
        });
    }
    setUserConfig(credentials, project) {
        return Promise.resolve(ActionResult_1.successOn(this));
    }
    raisePullRequest(credentials, title, body, head, base) {
        const url = `${this.scheme}${this.apiBase}/${this.apiPathComponent}/pull-requests`;
        automation_client_1.logger.debug(`Making request to '${url}' to raise PR`);
        return axios_1.default.post(url, {
            title,
            description: body,
            fromRef: {
                id: head,
            },
            toRef: {
                id: base,
            },
        }, headers(credentials))
            .then(axiosResponse => {
            return {
                target: this,
                success: true,
                axiosResponse,
            };
        })
            .catch(err => {
            automation_client_1.logger.error(`Error attempting to raise PR: ${err}`);
            return Promise.reject(err);
        });
    }
    get url() {
        let url = `projects/${this.owner}/repos`;
        if (!this.isProject) {
            url = `users/${this.owner}/repos`;
        }
        return `${this.scheme}${this.remoteBase}/${url}/${this.repo}`;
    }
    get pathComponent() {
        return `scm/${this.maybeTilde}${this.owner}/${this.repo}`;
    }
    get maybeTilde() {
        return this.isProject ? "" : "~";
    }
    get apiBasePathComponent() {
        return `rest/api/1.0/projects/${this.maybeTilde}${this.owner}/repos/`;
    }
    get apiPathComponent() {
        return this.apiBasePathComponent + this.repo;
    }
}
exports.BitBucketServerRepoRef = BitBucketServerRepoRef;
function headers(creds) {
    if (!BasicAuthCredentials_1.isBasicAuthCredentials(creds)) {
        throw new Error("Only Basic auth supported: Had " + JSON.stringify(creds));
    }
    const upwd = `${creds.username}:${creds.password}`;
    const encoded = base64_1.encode(upwd);
    return {
        headers: {
            Authorization: `Basic ${encoded}`,
        },
    };
}
//# sourceMappingURL=BitBucketServerRepoRef.js.map