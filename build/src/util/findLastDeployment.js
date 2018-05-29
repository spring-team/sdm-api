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
const https = require("https");
const K8TargetBase = "deploy/atomist/k8s/";
function findLastK8sDeployment(ctx, rr, branch, environment) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ctx.graphClient.query({
            name: "LastEndpoint",
            variables: {
                name: rr.repo,
                owner: rr.owner,
                branch,
                statusContext: K8TargetBase + environment,
            },
        });
        if (!result || !result.Repo[0]) {
            throw new Error(`No commit found on ${rr.owner}/${rr.repo}#${branch}`);
        }
        const commit = result.Repo[0].branches[0].commit;
        automation_client_1.logger.debug(`Found a commit for ${rr.owner}/${rr.repo}#${branch}: ${commit.sha}`);
        const statuses = commit.statuses;
        if (!statuses || statuses.length === 0) {
            throw new Error(`No commit found on ${rr.owner}/${rr.repo}#${branch}`);
        }
        const endpointStatus = statuses[0];
        if (endpointStatus.state !== "success") {
            throw new Error(`The k8s deployment on ${commit.sha} was not successful`);
        }
        return endpointStatus.targetUrl;
    });
}
exports.findLastK8sDeployment = findLastK8sDeployment;
exports.notPicky = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
};
//# sourceMappingURL=findLastDeployment.js.map