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
const MessageClient_1 = require("@atomist/automation-client/spi/message/MessageClient");
const stringify = require("json-stringify-safe");
const deleteRepository_1 = require("../../../handlers/commands/deleteRepository");
const gitHubProvider_1 = require("../../../util/github/gitHubProvider");
function executeUndeploy(target) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { id, credentials, status, progressLog } = rwlc;
        const commit = status.commit;
        const pushBranch = commit.pushes[0].branch;
        progressLog.write(`Commit is on ${commit.pushes.length} pushes. Choosing the first one, branch ${pushBranch}`);
        const targetInfo = target.targeter(id, pushBranch);
        const deployments = yield target.deployer.findDeployments(id, targetInfo, credentials);
        if (!deployments) {
            progressLog.write("No deployments found");
            return automation_client_1.Success;
        }
        automation_client_1.logger.info("Detected deployments: %s", deployments.map(s => stringify(s)).join(", "));
        deployments.forEach((d) => __awaiter(this, void 0, void 0, function* () {
            return target.deployer.undeploy(targetInfo, d, progressLog);
        }));
        return { code: 0 };
    });
}
exports.executeUndeploy = executeUndeploy;
function offerToDeleteRepository() {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { addressChannels, id } = rwlc;
        const params = new deleteRepository_1.DeleteRepositoryParameters();
        params.owner = id.owner;
        params.repo = id.repo;
        params.providerId = gitHubProvider_1.GitHubDotComProviderId; // we should put this in the RWLC?
        params.areYouSure = "yes";
        const deleteRepoButton = MessageClient_1.buttonForCommand({ text: "Delete Repo", style: "danger" }, deleteRepository_1.DeleteRepositoryCommandName, params);
        const attachment = {
            fallback: "delete repository button",
            color: "#ff0234",
            text: "Would you like to delete this repository?",
            actions: [deleteRepoButton],
        };
        const message = {
            attachments: [attachment],
        };
        yield addressChannels(message);
        return automation_client_1.Success;
    });
}
exports.offerToDeleteRepository = offerToDeleteRepository;
//# sourceMappingURL=executeUndeploy.js.map