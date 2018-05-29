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
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const decorators_1 = require("@atomist/automation-client/decorators");
const onCommand_1 = require("@atomist/automation-client/onCommand");
const MessageClient_1 = require("@atomist/automation-client/spi/message/MessageClient");
const sdmDeployEnablement_1 = require("../../ingesters/sdmDeployEnablement");
const messages_1 = require("../../util/slack/messages");
let SetDeployEnablementParameters = class SetDeployEnablementParameters {
};
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubOwner),
    __metadata("design:type", String)
], SetDeployEnablementParameters.prototype, "owner", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepository),
    __metadata("design:type", String)
], SetDeployEnablementParameters.prototype, "repo", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepositoryProvider),
    __metadata("design:type", String)
], SetDeployEnablementParameters.prototype, "providerId", void 0);
SetDeployEnablementParameters = __decorate([
    decorators_1.Parameters()
], SetDeployEnablementParameters);
exports.SetDeployEnablementParameters = SetDeployEnablementParameters;
/**
 * Command to set deploy enablement on the currently mapped repo
 * @param {boolean} enable
 * @return {(ctx: HandlerContext, params: SetDeployEnablementParameters) => Promise<HandlerResult>}
 */
function setDeployEnablement(enable) {
    return (ctx, params) => {
        const deployEnablement = {
            state: enable ? "requested" : "disabled",
            owner: params.owner,
            repo: params.repo,
            providerId: params.providerId,
        };
        return ctx.messageClient.send(deployEnablement, MessageClient_1.addressEvent(sdmDeployEnablement_1.DeployEnablementRootType))
            .then(() => ctx.messageClient.respond(messages_1.success("Deploy Enablement", `Successfully ${enable ? "enabled" : "disabled"} deployment`)))
            .then(() => automation_client_1.Success, automation_client_1.failure);
    };
}
exports.setDeployEnablement = setDeployEnablement;
function enableDeploy() {
    return onCommand_1.commandHandlerFrom(setDeployEnablement(true), SetDeployEnablementParameters, "EnableDeploy", "Enable deployment via Atomist SDM", "enable deploy");
}
exports.enableDeploy = enableDeploy;
function disableDeploy() {
    return onCommand_1.commandHandlerFrom(setDeployEnablement(false), SetDeployEnablementParameters, "DisableDeploy", "Disable deployment via Atomist SDM", "disable deploy");
}
exports.disableDeploy = disableDeploy;
//# sourceMappingURL=SetDeployEnablement.js.map