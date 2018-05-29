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
const retry_1 = require("@atomist/automation-client/util/retry");
const axios_1 = require("axios");
const https = require("https");
/**
 * Make an HTTP request to the reported endpoint to check
 */
function lookFor200OnEndpointRootGet(retryOpts = {}) {
    return (inv) => {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        if (!inv.url) {
            throw new Error("Verify called with null URL");
        }
        return retry_1.doWithRetry(() => axios_1.default.get(inv.url, { httpsAgent: agent })
            .then(resp => {
            automation_client_1.logger.debug(`lookFor200OnEndpointRootGet: Response for ${inv.url} was ${resp.status}`);
            if (resp.status !== 200) {
                return Promise.reject(`Unexpected response: ${resp.status}`);
            }
            return Promise.resolve();
        }), `Try to connect to ${inv.url}`, retryOpts);
        // Let a failure go through
    };
}
exports.lookFor200OnEndpointRootGet = lookFor200OnEndpointRootGet;
//# sourceMappingURL=lookFor200OnEndpointRootGet.js.map