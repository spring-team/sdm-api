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
const deploy_1 = require("./deploy");
const _ = require("lodash");
/**
 * Execute deploy with the supplied deployer and target
 */
function executeDeploy(artifactStore, endpointGoal, target) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const commit = rwlc.status.commit;
        const { credentials, id, context, progressLog } = rwlc;
        const atomistTeam = context.teamId;
        automation_client_1.logger.info("Deploying project %s:%s with target [%j]", id.owner, id.repo, target);
        const artifactCheckout = yield deploy_1.checkOutArtifact(_.get(commit, "image.imageName"), artifactStore, id, credentials, progressLog);
        // questionable
        artifactCheckout.id.branch = commit.pushes[0].branch;
        const deployments = yield target.deployer.deploy(artifactCheckout, target.targeter(id, id.branch), progressLog, credentials, atomistTeam);
        yield Promise.all(deployments.map(deployment => deploy_1.setEndpointGoalOnSuccessfulDeploy({ endpointGoal, rwlc, deployment })));
        return automation_client_1.Success;
    });
}
exports.executeDeploy = executeDeploy;
//# sourceMappingURL=executeDeploy.js.map