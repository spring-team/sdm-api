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
const ProjectOperationCredentials_1 = require("@atomist/automation-client/operations/common/ProjectOperationCredentials");
/**
 * Convert the given credentials or token string to a token string
 * if possible. Otherwise throw an exception.
 * @param {ProjectOperationCredentials | string} credentials
 * @return {string}
 */
function toToken(credentials) {
    if (typeof credentials === "string") {
        return credentials;
    }
    if (ProjectOperationCredentials_1.isTokenCredentials(credentials)) {
        return credentials.token;
    }
    throw new Error("Cannot convert credentials to token");
}
exports.toToken = toToken;
//# sourceMappingURL=toToken.js.map