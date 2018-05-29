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
const _ = require("lodash");
const EphemeralLocalArtifactStore_1 = require("../common/artifact/local/EphemeralLocalArtifactStore");
const CachingProjectLoader_1 = require("../common/repo/CachingProjectLoader");
const GitHubCredentialsResolver_1 = require("../handlers/common/GitHubCredentialsResolver");
const logFactory_1 = require("../spi/log/logFactory");
function softwareDeliveryMachineOptions(configuration) {
    return {
        artifactStore: new EphemeralLocalArtifactStore_1.EphemeralLocalArtifactStore(),
        projectLoader: new CachingProjectLoader_1.CachingProjectLoader(),
        logFactory: logFactory_1.logFactory(_.get(configuration, "sdm.rolar.url"), _.get(configuration, "sdm.dashboard.url")),
        credentialsResolver: new GitHubCredentialsResolver_1.GitHubCredentialsResolver(),
    };
}
exports.softwareDeliveryMachineOptions = softwareDeliveryMachineOptions;
//# sourceMappingURL=sdmOptions.js.map