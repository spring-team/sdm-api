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
const string_1 = require("@atomist/automation-client/internal/util/string");
const onCommand_1 = require("@atomist/automation-client/onCommand");
const MessageClient_1 = require("@atomist/automation-client/spi/message/MessageClient");
const deployPushTests_1 = require("../../common/listener/support/pushtest/deployPushTests");
const SetDeployEnablement_1 = require("./SetDeployEnablement");
function displayDeployEnablement() {
    return (context, params) => __awaiter(this, void 0, void 0, function* () {
        const enabled = yield deployPushTests_1.isDeployEnabled({ context, id: params });
        return context.messageClient.respond(reportDeployEnablement(params, enabled))
            .then(() => automation_client_1.Success, automation_client_1.failure);
    });
}
function reportDeployEnablement(params, enabled) {
    const text = `SDM Deployment is currently ${enabled ? "enabled" : "disabled"} on ${params.owner}/${params.repo}`;
    const actions = [MessageClient_1.buttonForCommand({ text: enabled ? "Disable" : "Enable" }, enabled ? "DisableDeploy" : "EnableDeploy", Object.assign({}, params))];
    const msg = {
        attachments: [{
                author_icon: `https://images.atomist.com/rug/check-circle.gif?gif=${string_1.guid()}`,
                author_name: "SDM Deployment",
                text,
                fallback: text,
                color: enabled ? "#45B254" : "#aaaaaa",
                mrkdwn_in: ["text"],
                actions,
            }],
    };
    return msg;
}
exports.reportDeployEnablement = reportDeployEnablement;
function isDeployEnabledCommand() {
    return onCommand_1.commandHandlerFrom(displayDeployEnablement(), SetDeployEnablement_1.SetDeployEnablementParameters, "DisplayDeployEnablement", "Display whether deployment via Atomist SDM in enabled", "is deploy enabled?");
}
exports.isDeployEnabledCommand = isDeployEnabledCommand;
//# sourceMappingURL=DisplayDeployEnablement.js.map