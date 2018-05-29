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
const stringify = require("json-stringify-safe");
/**
 * Convenient function to allow creating fake contexts.
 * Useful for testing
 * @param {string} teamId
 * @return {any}
 */
function fakeContext(teamId = "T123") {
    return {
        teamId,
        messageClient: {
            respond(m) {
                automation_client_1.logger.info("respond > " + m);
                return Promise.resolve({});
            },
            send(event) {
                automation_client_1.logger.debug("send > " + stringify(event));
                return Promise.resolve({});
            },
        },
        correlationId: "foo",
        context: { name: "fakeContextName", version: "v0.0", operation: "fakeOperation" },
    };
}
exports.fakeContext = fakeContext;
//# sourceMappingURL=fakeContext.js.map