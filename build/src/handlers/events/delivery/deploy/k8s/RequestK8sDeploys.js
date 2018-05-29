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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const ghub_1 = require("../../../../../util/github/ghub");
exports.K8TargetBase = "deploy/atomist/k8s/";
function k8AutomationDeployContext(target) {
    return `${exports.K8TargetBase}${target}`;
}
exports.k8AutomationDeployContext = k8AutomationDeployContext;
function requestDeployToK8s(target) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { status, id, credentials } = rwlc;
        const commit = status.commit;
        const image = status.commit.image;
        if (!image) {
            automation_client_1.logger.warn(`No image found on commit ${commit.sha}; can't deploy`);
            return Promise.resolve(automation_client_1.failure(new Error("No image linked")));
        }
        automation_client_1.logger.info(`Requesting deploy. Triggered by ${status.state} status: ${status.context}: ${status.description}`);
        // we want this to communicate via the status directly.
        yield ghub_1.createStatus(credentials, id, {
            context: k8AutomationDeployContext(target),
            state: "pending",
            description: "Requested deploy by k8-automation",
        });
        return automation_client_1.Success;
    });
}
exports.requestDeployToK8s = requestDeployToK8s;
function undeployFromK8s(creds, id, env) {
    return __awaiter(this, void 0, void 0, function* () {
        const undeployContext = "undeploy/atomist/k8s/" + env;
        yield ghub_1.createStatus(creds, id, {
            context: undeployContext,
            state: "pending",
            description: `Requested undeploy from ${env} by k8-automation`,
        }).catch(err => Promise.resolve(new Error(`Could not undeploy from ${env}: ${err.message}`)));
    });
}
exports.undeployFromK8s = undeployFromK8s;
//# sourceMappingURL=RequestK8sDeploys.js.map