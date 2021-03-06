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
const onCommand_1 = require("@atomist/automation-client/onCommand");
const EmptyParameters_1 = require("../../common/command/EmptyParameters");
const executableJarDeployer_1 = require("../../common/delivery/deploy/local/jar/executableJarDeployer");
const mavenSourceDeployer_1 = require("../../common/delivery/deploy/local/maven/mavenSourceDeployer");
/**
 * Return a command handler that can list local deploys
 * @return {HandleCommand<EmptyParameters>}
 */
exports.listLocalDeploys = () => onCommand_1.commandHandlerFrom(handleListDeploys(), EmptyParameters_1.EmptyParameters, "listLocalDeploys", "list local deploys", "list local deploys");
function handleListDeploys() {
    return (ctx) => __awaiter(this, void 0, void 0, function* () {
        yield handleListDeploysWith("Maven source deployer", mavenSourceDeployer_1.managedMavenDeployments, ctx);
        yield handleListDeploysWith("Executable JAR deployer", executableJarDeployer_1.managedExecutableJarDeployments, ctx);
        return automation_client_1.Success;
    });
}
function handleListDeploysWith(description, managedDeployments, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = `*${description}* managing ${managedDeployments.deployments.length} deployments:\n${managedDeployments.deployments.map(deployedAppToString).join("\n")}`;
        yield ctx.messageClient.respond(message);
    });
}
function deployedAppToString(da) {
    return `${da.id.owner}:${da.id.repo}:${da.id.branch}@${da.id.sha} -  ${da.deployment.endpoint};port=${da.port};pid=${!!da.childProcess ? da.childProcess.pid : "<not running>"}`;
}
//# sourceMappingURL=listLocalDeploys.js.map