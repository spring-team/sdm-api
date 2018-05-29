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
const commandLine_1 = require("@atomist/automation-client/action/cli/commandLine");
const child_process_1 = require("child_process");
const spawned_1 = require("../../../../util/misc/spawned");
const DelimitedWriteProgressLogDecorator_1 = require("../../../log/DelimitedWriteProgressLogDecorator");
const pomParser_1 = require("../../build/local/maven/pomParser");
const cloudFoundryLogParser_1 = require("./cloudFoundryLogParser");
const CloudFoundryTarget_1 = require("./CloudFoundryTarget");
/**
 * Spawn a new process to use the Cloud Foundry CLI to push.
 * Note that this isn't thread safe concerning multiple logins or spaces.
 */
class CommandLineCloudFoundryDeployer {
    constructor(projectLoader) {
        this.projectLoader = projectLoader;
    }
    deploy(da, cfi, log, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.info("Deploying app [%j] to Cloud Foundry [%s]", da, cfi.description);
            // We need the Cloud Foundry manifest. If it's not found, we can't deploy
            // We want a fresh version unless we need it build
            return this.projectLoader.doWithProject({ credentials, id: da.id, readOnly: !da.cwd }, (project) => __awaiter(this, void 0, void 0, function* () {
                const manifestFile = yield project.findFile(CloudFoundryTarget_1.CloudFoundryManifestPath);
                if (!cfi.api || !cfi.org || !cfi.username || !cfi.password) {
                    throw new Error("Cloud foundry authentication information missing. See CloudFoundryTarget.ts");
                }
                const opts = { cwd: !!da.cwd ? da.cwd : project.baseDir };
                // Note: if the password is wrong, things hangs forever waiting for input.
                yield commandLine_1.runCommand(`cf login -a ${cfi.api} -o ${cfi.org} -u ${cfi.username} -p '${cfi.password}' -s ${cfi.space}`, opts);
                automation_client_1.logger.debug("Successfully selected space [%s]", cfi.space);
                // Turn off color so we don't have unpleasant escape codes in stream
                yield commandLine_1.runCommand("cf config --color false", { cwd: da.cwd });
                const spawnCommand = {
                    command: "cf",
                    args: [
                        "push",
                        da.name,
                        "-f",
                        project.baseDir + "/" + manifestFile.path,
                        "--random-route"
                    ]
                        .concat(!!da.filename ?
                        ["-p",
                            da.filename] :
                        []),
                };
                automation_client_1.logger.info("About to issue Cloud Foundry command %s: options=%j", spawned_1.stringifySpawnCommand(spawnCommand), opts);
                const childProcess = child_process_1.spawn(spawnCommand.command, spawnCommand.args, opts);
                const newLineDelimitedLog = new DelimitedWriteProgressLogDecorator_1.DelimitedWriteProgressLogDecorator(log, "\n");
                childProcess.stdout.on("data", what => newLineDelimitedLog.write(what.toString()));
                childProcess.stderr.on("data", what => newLineDelimitedLog.write(what.toString()));
                return [yield new Promise((resolve, reject) => {
                        childProcess.addListener("exit", (code, signal) => {
                            if (code !== 0) {
                                reject(`Error: code ${code}`);
                            }
                            resolve({
                                endpoint: cloudFoundryLogParser_1.parseCloudFoundryLogForEndpoint(log.log),
                                appName: da.name,
                            });
                        });
                        childProcess.addListener("error", reject);
                    })];
            }));
        });
    }
    findDeployments(id, ti, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            // This may or may not be deployed. For now, let's guess that it is.
            return this.projectLoader.doWithProject({ credentials, id, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
                const pom = yield project.findFile("pom.xml");
                const content = yield pom.getContent();
                const va = yield pomParser_1.identification(content);
                return [{ appName: va.artifact }];
            }));
        });
    }
    undeploy(cfi, deployment, log) {
        return __awaiter(this, void 0, void 0, function* () {
            yield spawned_1.spawnAndWatch(spawned_1.asSpawnCommand(`cf login -a ${cfi.api} -o ${cfi.org} -u ${cfi.username} -p '${cfi.password}' -s ${cfi.space}`), {}, log);
            return spawned_1.spawnAndWatch(spawned_1.asSpawnCommand(`cf delete ${deployment.appName}`), {}, log);
        });
    }
    logInterpreter(log) {
        return {
            relevantPart: "",
            message: "Deploy failed",
        };
    }
}
exports.CommandLineCloudFoundryDeployer = CommandLineCloudFoundryDeployer;
//# sourceMappingURL=CommandLineCloudFoundryDeployer.js.map