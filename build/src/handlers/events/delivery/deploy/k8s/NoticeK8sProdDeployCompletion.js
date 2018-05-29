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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const graphQL_1 = require("@atomist/automation-client/graph/graphQL");
const Goal_1 = require("../../../../../common/delivery/goals/Goal");
const repoRef_1 = require("../../../../../util/git/repoRef");
const ghub_1 = require("../../../../../util/github/ghub");
const RequestK8sDeploys_1 = require("./RequestK8sDeploys");
// TODO parameterize once we can have multiple handlers
exports.K8sTestingDomain = "testing";
exports.K8sProductionDomain = "production";
/**
 * Deploy a published artifact identified in an ImageLinked event.
 */
let NoticeK8sProdDeployCompletionOnStatus = class NoticeK8sProdDeployCompletionOnStatus {
    /**
     *
     * @param {Goal} deployGoal
     * @param {Goal} endpointGoal
     */
    constructor(deployGoal, endpointGoal) {
        this.deployGoal = deployGoal;
        this.endpointGoal = endpointGoal;
    }
    handle(event, ctx, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = event.data.Status[0];
            const commit = status.commit;
            if (status.state === "pending") {
                // not interesting
                return automation_client_1.Success;
            }
            if (!status.context.startsWith(RequestK8sDeploys_1.K8TargetBase)) {
                automation_client_1.logger.warn(`Unexpected event: ${status.context} is ${status.state}`);
                return automation_client_1.Success;
            }
            automation_client_1.logger.info(`Recognized deploy result. ${status.state} status: ${status.context}: ${status.description}`);
            // TODO this is Github only
            const id = repoRef_1.toRemoteRepoRef(commit.repo, { sha: commit.sha });
            yield ghub_1.createStatus(params.githubToken, id, {
                context: params.deployGoal.context,
                state: status.state,
                // todo: don't say "complete" if it failed
                description: params.deployGoal.successDescription,
                target_url: undefined,
            });
            if (status.state === "success" && status.targetUrl) {
                yield ghub_1.createStatus(params.githubToken, id, {
                    context: params.endpointGoal.context,
                    state: "success",
                    description: params.endpointGoal.successDescription,
                    // we expect k8-automation to have set the targetUrl on its deploy status to the endpoint URL
                    target_url: status.targetUrl,
                });
            }
            else if (status.state === "success") {
                automation_client_1.logger.warn("no endpoint URL determined from " + status.context);
            }
            return automation_client_1.Success;
        });
    }
};
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.OrgToken),
    __metadata("design:type", String)
], NoticeK8sProdDeployCompletionOnStatus.prototype, "githubToken", void 0);
NoticeK8sProdDeployCompletionOnStatus = __decorate([
    automation_client_1.EventHandler("Request k8s deploy of linked artifact", graphQL_1.subscription({
        name: "OnAParticularStatus",
        variables: {
            context: RequestK8sDeploys_1.k8AutomationDeployContext(exports.K8sProductionDomain),
        }
    })),
    __metadata("design:paramtypes", [Goal_1.Goal,
        Goal_1.Goal])
], NoticeK8sProdDeployCompletionOnStatus);
exports.NoticeK8sProdDeployCompletionOnStatus = NoticeK8sProdDeployCompletionOnStatus;
//# sourceMappingURL=NoticeK8sProdDeployCompletion.js.map