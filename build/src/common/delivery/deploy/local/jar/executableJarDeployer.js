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
const child_process_1 = require("child_process");
const DelimitedWriteProgressLogDecorator_1 = require("../../../../log/DelimitedWriteProgressLogDecorator");
const logInterpreters_1 = require("../../../goals/support/logInterpreters");
const LocalDeployerOptions_1 = require("../LocalDeployerOptions");
const ManagedDeployments_1 = require("../ManagedDeployments");
/**
 * Start up an executable Jar on the same node as the automation client.
 * Not intended as a Paas, but for use during demos and development.
 * Always uses the same URL, whatever the branch and sha.
 * @param opts options
 */
function executableJarDeployer(opts) {
    if (!exports.managedExecutableJarDeployments) {
        automation_client_1.logger.debug("Created new deployments record");
        exports.managedExecutableJarDeployments = new ManagedDeployments_1.ManagedDeployments(opts.lowerPort);
    }
    return new ExecutableJarDeployer(Object.assign({}, LocalDeployerOptions_1.DefaultLocalDeployerOptions, opts));
}
exports.executableJarDeployer = executableJarDeployer;
class ExecutableJarDeployer {
    constructor(opts) {
        this.opts = opts;
        this.logInterpreter = logInterpreters_1.lastLinesLogInterpreter("Executable jar deployment");
    }
    findDeployments(id, ti, creds) {
        return __awaiter(this, void 0, void 0, function* () {
            const thisDeployment = this.deploymentFor(ti);
            return thisDeployment ? [thisDeployment] : [];
        });
    }
    undeploy(id, deployment, log) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.managedExecutableJarDeployments.terminateIfRunning(id.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.service);
        });
    }
    deploymentFor(ti) {
        const managed = exports.managedExecutableJarDeployments.findDeployment(ti.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.service);
        if (!managed) {
            return undefined;
        }
        const port = managed.port;
        const baseUrl = this.opts.baseUrl;
        return {
            endpoint: `${baseUrl}:${port}/${this.contextRoot(ti.managedDeploymentKey)}`,
        };
    }
    contextRoot(id) {
        return `/${id.owner}/${id.repo}/staging`;
    }
    deploy(da, ti, log, credentials, atomistTeam) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!da.filename) {
                throw new Error("No filename in deployable artifact!");
            }
            const port = yield exports.managedExecutableJarDeployments.findPort(ti.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.service, this.opts.baseUrl);
            automation_client_1.logger.info("Deploying app [%j] on port [%d] for team %s", da, port, atomistTeam);
            const startupInfo = {
                port,
                atomistTeam,
                contextRoot: this.contextRoot(da.id),
            };
            yield exports.managedExecutableJarDeployments.terminateIfRunning(ti.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.service);
            const childProcess = child_process_1.spawn("java", [
                "-jar",
                da.filename,
            ].concat(this.opts.commandLineArgumentsFor(startupInfo)), {
                cwd: da.cwd,
            });
            const newLineDelimitedLog = new DelimitedWriteProgressLogDecorator_1.DelimitedWriteProgressLogDecorator(log, "\n");
            childProcess.stdout.on("data", what => newLineDelimitedLog.write(what.toString()));
            childProcess.stderr.on("data", what => newLineDelimitedLog.write(what.toString()));
            const deployment = {
                childProcess,
                endpoint: `${this.opts.baseUrl}:${port}/${this.contextRoot(ti.managedDeploymentKey)}`,
            };
            exports.managedExecutableJarDeployments.recordDeployment({
                id: ti.managedDeploymentKey,
                port,
                childProcess,
                deployment,
                lookupStrategy: ManagedDeployments_1.LookupStrategy.service,
            });
            return [yield new Promise((resolve, reject) => {
                    childProcess.stdout.addListener("data", (what) => __awaiter(this, void 0, void 0, function* () {
                        if (!!what && this.opts.successPatterns.some(successPattern => successPattern.test(what.toString()))) {
                            resolve(deployment);
                        }
                    }));
                    childProcess.addListener("exit", () => {
                        reject(new Error("ExecutableJarDeployer: We should have found success message pattern by now!!"));
                    });
                    childProcess.addListener("error", reject);
                })];
        });
    }
}
//# sourceMappingURL=executableJarDeployer.js.map