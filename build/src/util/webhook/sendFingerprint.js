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
/**
 * Publish the given fingerprint to Atomist in the given team
 * @param {GitHubRepoRef} id id of repo the fingerprint applies to
 * @param {Fingerprint} fingerprint fingerprint to publish
 * @param {string} team team to which this fingerprint applies
 * @return {Promise<any>}
 */
function sendFingerprint(id, fingerprint, team) {
    const url = `https://webhook.atomist.com/atomist/fingerprints/teams/${team}`;
    const payload = {
        commit: {
            provider: id.providerType,
            owner: id.owner,
            repo: id.repo,
            sha: id.sha,
        },
        fingerprints: [fingerprint],
    };
    automation_client_1.logger.info("Sending up fingerprint to %s: %j", url, payload);
    return axios_1.default.post(url, payload)
        .catch(err => {
        return Promise.reject(`Axios error calling ${url}: ${err.message}`);
    });
}
exports.sendFingerprint = sendFingerprint;
//# sourceMappingURL=sendFingerprint.js.map