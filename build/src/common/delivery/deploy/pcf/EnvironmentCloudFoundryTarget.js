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
const configuration_1 = require("@atomist/automation-client/configuration");
const CloudFoundryTarget_1 = require("./CloudFoundryTarget");
/**
 * Configure cloud foundry from environment variables.
 * See README for definition.
 */
class EnvironmentCloudFoundryTarget {
    /**
     * Logical name for the space
     * @param {string} environmentName: Name of the environment, such as "staging" or "production"
     */
    constructor(environmentName) {
        this.environmentName = environmentName;
        this.api = configuration_1.configurationValue("sdm.cloudfoundry").api || CloudFoundryTarget_1.PivotalWebServices.api;
        this.username = configuration_1.configurationValue("sdm.cloudfoundry").user;
        this.password = configuration_1.configurationValue("sdm.cloudfoundry").password;
        this.org = configuration_1.configurationValue("sdm.cloudfoundry").org;
    }
    get space() {
        const space = configuration_1.configurationValue(`sdm.cloudfoundry`).spaces[this.environmentName];
        automation_client_1.logger.info("PCF space for environment [%s] is [%s]", this.environmentName, space);
        if (!space) {
            throw new Error(`Please set environment key cloudfoundry.spaces.${this.environmentName} to deploy to Cloud Foundry environment ${this.environmentName}`);
        }
        return space;
    }
    get name() {
        return `PCF: ${this.environmentName}`;
    }
    get description() {
        return `PCF ${this.api};org=${this.org};space=${this.space};user=${this.username}`;
    }
}
exports.EnvironmentCloudFoundryTarget = EnvironmentCloudFoundryTarget;
//# sourceMappingURL=EnvironmentCloudFoundryTarget.js.map