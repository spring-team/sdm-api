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
const repoRef_1 = require("../../../util/git/repoRef");
const fetchGoalsOnCommit_1 = require("../goals/support/fetchGoalsOnCommit");
const storeGoals_1 = require("../goals/support/storeGoals");
function checkOutArtifact(targetUrl, artifactStore, id, credentials, progressLog) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!targetUrl) {
            automation_client_1.logger.debug("No artifact, must be source-deployed");
            return sourceArtifact(id);
        }
        const artifactCheckout = yield artifactStore.checkout(targetUrl, id, credentials)
            .catch(err => {
            progressLog.write("Error checking out artifact: " + err.message);
            throw err;
        });
        if (!artifactCheckout) {
            throw new Error("Error checking out artifact: none found");
        }
        return artifactCheckout;
    });
}
exports.checkOutArtifact = checkOutArtifact;
function sourceArtifact(id) {
    return {
        // TODO need to do something about this: Use general identifier as in PCF editor?
        name: id.repo,
        version: "0.1.0",
        id,
    };
}
function setEndpointGoalOnSuccessfulDeploy(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rwlc, deployment, endpointGoal } = params;
        const sdmGoal = yield fetchGoalsOnCommit_1.findSdmGoalOnCommit(rwlc.context, rwlc.id, repoRef_1.providerIdFromStatus(rwlc.status), endpointGoal);
        if (deployment.endpoint) {
            const newState = "success";
            yield markEndpointStatus({ context: rwlc.context, sdmGoal, endpointGoal, newState, endpoint: deployment.endpoint });
        }
        else {
            const error = new Error("Deploy finished with success, but the endpoint was not found");
            const newState = "failure";
            yield markEndpointStatus({ context: rwlc.context, sdmGoal, endpointGoal, newState, endpoint: deployment.endpoint, error });
        }
    });
}
exports.setEndpointGoalOnSuccessfulDeploy = setEndpointGoalOnSuccessfulDeploy;
function markEndpointStatus(parameters) {
    const { context, sdmGoal, endpointGoal, newState, endpoint, error } = parameters;
    return storeGoals_1.updateGoal(context, sdmGoal, {
        description: storeGoals_1.descriptionFromState(endpointGoal, newState),
        url: endpoint,
        state: newState,
        error,
    }).catch(endpointStatus => {
        automation_client_1.logger.error("Could not set Endpoint status: " + endpointStatus.message);
        // do not fail this whole handler
    });
}
//# sourceMappingURL=deploy.js.map