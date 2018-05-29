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
const GraphClient_1 = require("@atomist/automation-client/spi/graph/GraphClient");
const PushTest_1 = require("../../PushTest");
// TODO once the ingester is defined elsewhere move this into a file and generate types
const DeployEnablementQuery = `
query DeployEnablementForRepo($owner: [String], $repo: [String]) {
  SdmDeployEnablement(state: ["requested"], owner: $owner, repo: $repo) {
    id
    state
    owner
    repo
    providerId
  }
}`;
/**
 * Is repo enabled for deployment
 * @param {PushListenerInvocation} pi
 */
exports.IsDeployEnabled = PushTest_1.pushTest("Is Deploy Enabled", isDeployEnabled);
function isDeployEnabled(parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        const { context, id } = parameters;
        const enablement = yield context.graphClient.query({
            query: DeployEnablementQuery,
            variables: {
                owner: [id.owner],
                repo: [id.repo],
            },
            options: GraphClient_1.QueryNoCacheOptions,
        });
        return enablement
            && enablement.SdmDeployEnablement
            && enablement.SdmDeployEnablement.length === 1
            && enablement.SdmDeployEnablement[0].state === "requested";
    });
}
exports.isDeployEnabled = isDeployEnabled;
//# sourceMappingURL=deployPushTests.js.map