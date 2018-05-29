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
const LocalDeployerOptions_1 = require("../LocalDeployerOptions");
const ManagedDeployments_1 = require("../ManagedDeployments");
/**
 * Use Maven to deploy
 * @param projectLoader use to load projects
 * @param opts options
 */
function mavenDeployer(projectLoader, opts) {
    if (!exports.managedMavenDeployments) {
        automation_client_1.logger.info("Created new deployments record");
        exports.managedMavenDeployments = new ManagedDeployments_1.ManagedDeployments(opts.lowerPort);
    }
    return new MavenSourceDeployer(projectLoader, Object.assign({}, LocalDeployerOptions_1.DefaultLocalDeployerOptions, opts));
}
exports.mavenDeployer = mavenDeployer;
class MavenSourceDeployer {
    constructor(projectLoader, opts) {
        this.projectLoader = projectLoader;
        this.opts = opts;
    }
    findDeployments(id, ti, creds) {
        return __awaiter(this, void 0, void 0, function* () {
            const deployedApp = exports.managedMavenDeployments.findDeployment(ti.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.branch);
            if (!deployedApp) {
                return [];
            }
            return [deployedApp.deployment];
        });
    }
    deploy(da, ti, log, credentials, team) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = da.id;
            if (!id.branch) {
                throw new Error(`Cannot locally deploy ${JSON.stringify(id)}: Branch must be set`);
            }
            const port = yield exports.managedMavenDeployments.findPort(ti.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.branch, this.opts.baseUrl);
            automation_client_1.logger.info("MavenSourceDeployer: Deploying app [%j],branch=%s on port [%d] for team %s", id, ti.managedDeploymentKey.branch, port, team);
            yield exports.managedMavenDeployments.terminateIfRunning(ti.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.branch);
            return [yield this.projectLoader.doWithProject({ credentials, id, readOnly: true }, project => this.deployProject(ti, log, project, port, team))];
        });
    }
    undeploy(ti, deployment, log) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.managedMavenDeployments.terminateIfRunning(ti.managedDeploymentKey, ManagedDeployments_1.LookupStrategy.branch);
            return automation_client_1.Success;
        });
    }
    deployProject(ti, log, project, port, atomistTeam) {
        return __awaiter(this, void 0, void 0, function* () {
            const branchId = ti.managedDeploymentKey;
            const startupInfo = {
                port,
                atomistTeam,
                contextRoot: `/${branchId.owner}/${branchId.repo}/${branchId.branch}`,
            };
            const childProcess = child_process_1.spawn("mvn", [
                "spring-boot:run",
            ].concat(this.opts.commandLineArgumentsFor(startupInfo)), {
                cwd: project.baseDir,
            });
            if (!childProcess.pid) {
                throw new Error("Fatal error deploying using Maven--is `mvn` on your automation node path?\n" +
                    "Attempted to execute `mvn: spring-boot:run`");
            }
            const deployment = {
                childProcess,
                endpoint: `${this.opts.baseUrl}:${port}/${startupInfo.contextRoot}`,
            };
            exports.managedMavenDeployments.recordDeployment({
                id: branchId,
                port,
                childProcess,
                deployment,
                lookupStrategy: ManagedDeployments_1.LookupStrategy.branch,
            });
            const newLineDelimitedLog = new DelimitedWriteProgressLogDecorator_1.DelimitedWriteProgressLogDecorator(log, "\n");
            childProcess.stdout.on("data", what => newLineDelimitedLog.write(what.toString()));
            childProcess.stderr.on("data", what => newLineDelimitedLog.write(what.toString()));
            return new Promise((resolve, reject) => {
                childProcess.stdout.addListener("data", what => {
                    if (!!what && this.opts.successPatterns.some(successPattern => successPattern.test(what.toString()))) {
                        resolve(deployment);
                    }
                });
                childProcess.addListener("exit", () => {
                    reject(new Error("We should have found success message pattern by now!!"));
                });
                childProcess.addListener("error", reject);
            });
        });
    }
    logInterpreter(log) {
        return springBootRunLogInterpreter(log) || shortLogInterpreter(log);
    }
}
const shortLogInterpreter = (log) => {
    if (log.length < 200) {
        return {
            relevantPart: log,
            message: "This is the whole log.",
            includeFullLog: false,
        };
    }
};
const springBootRunLogInterpreter = (log) => {
    automation_client_1.logger.debug("Interpreting log");
    if (!log) {
        automation_client_1.logger.warn("log was empty");
        return undefined;
    }
    const maybeFailedToStart = appFailedToStart(log);
    if (maybeFailedToStart) {
        return {
            relevantPart: maybeFailedToStart,
            message: "Application failed to start",
            includeFullLog: false,
        };
    }
    // default to maven errors
    const maybeMavenErrors = mavenErrors(log);
    if (maybeMavenErrors) {
        automation_client_1.logger.info("recognized maven error");
        return {
            relevantPart: maybeMavenErrors,
            message: "Maven errors",
        };
    }
    // or it could be this problem here
    if (log.match(/Error checking out artifact/)) {
        automation_client_1.logger.info("Recognized artifact error");
        return {
            relevantPart: log,
            message: "I lost the local cache. Please rebuild",
            includeFullLog: false,
        };
    }
    automation_client_1.logger.info("Did not find anything to recognize in the log");
};
function appFailedToStart(log) {
    const lines = log.split("\n");
    const failedToStartLine = lines.indexOf("APPLICATION FAILED TO START");
    if (failedToStartLine < 1) {
        return undefined;
    }
    const likelyLines = lines.slice(failedToStartLine + 3, failedToStartLine + 10);
    return likelyLines.join("\n");
}
function mavenErrors(log) {
    if (log.match(/^\[ERROR]/m)) {
        return log.split("\n")
            .filter(l => l.startsWith("[ERROR]"))
            .join("\n");
    }
}
//# sourceMappingURL=mavenSourceDeployer.js.map