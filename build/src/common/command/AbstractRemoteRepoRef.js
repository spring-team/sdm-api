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
const BasicAuthCredentials_1 = require("@atomist/automation-client/operations/common/BasicAuthCredentials");
const ProjectOperationCredentials_1 = require("@atomist/automation-client/operations/common/ProjectOperationCredentials");
/**
 * Superclass for RemoteRepoRef implementations.
 * Handles parsing remote base
 *
 * This should ultimately move down to automation-client-ts and replace AbstractRepoRef.
 */
class AbstractRemoteRepoRef {
    /**
     * Construct a new RemoteRepoRef
     * @param {ProviderType} providerType
     * @param {string} rawRemote remote url. Should start with a scheme.
     * May have a trailing slash, which will be stripped
     * @param {string} owner
     * @param {string} repo
     * @param {string} sha
     * @param {string} path
     */
    constructor(providerType, rawRemote, owner, repo, sha = "master", path) {
        this.providerType = providerType;
        this.owner = owner;
        this.repo = repo;
        this.sha = sha;
        this.path = path;
        if (!rawRemote.startsWith("http")) {
            throw new Error(`Scheme required in remoteBase: '${rawRemote}'`);
        }
        // Strip any trailing /
        const remote = rawRemote.replace(/\/$/, "");
        this.scheme = remote.startsWith("http://") ? "http://" : "https://";
        this.apiBase = remote.substr(this.scheme.length);
        this.remoteBase = remote.substr(this.scheme.length);
    }
    get url() {
        return `${this.scheme}${this.remoteBase}/${this.owner}/${this.repo}`;
    }
    cloneUrl(creds) {
        if (BasicAuthCredentials_1.isBasicAuthCredentials(creds)) {
            return `${this.scheme}${encodeURIComponent(creds.username)}:${encodeURIComponent(creds.password)}@` +
                `${this.remoteBase}/${this.pathComponent}.git`;
        }
        if (!ProjectOperationCredentials_1.isTokenCredentials(creds)) {
            throw new Error("Only token or basic auth supported");
        }
        return `${this.scheme}${creds.token}:x-oauth-basic@${this.remoteBase}/${this.pathComponent}.git`;
    }
    get pathComponent() {
        return this.owner + "/" + this.repo;
    }
}
exports.AbstractRemoteRepoRef = AbstractRemoteRepoRef;
//# sourceMappingURL=AbstractRemoteRepoRef.js.map