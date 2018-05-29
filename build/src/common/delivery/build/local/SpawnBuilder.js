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
const sprintf_js_1 = require("sprintf-js");
const spawned_1 = require("../../../../util/misc/spawned");
const LocalBuilder_1 = require("./LocalBuilder");
/**
 * Build using spawn on the automation client node.
 * Note it is NOT intended for use for multiple organizations. It's OK
 * for one organization to use inside its firewall, but there is potential
 * vulnerability in builds of unrelated tenants getting at each others
 * artifacts.
 */
class SpawnBuilder extends LocalBuilder_1.LocalBuilder {
    constructor(params) {
        super(params.options.name, params.artifactStore, params.projectLoader);
        this.options = params.options;
        if (!this.options.commands && !this.options.commandFile) {
            throw new Error("Please supply either commands or a path to a file in the project containing them");
        }
    }
    get logInterpreter() {
        return this.options.logInterpreter;
    }
    startBuild(credentials, id, team, log) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorFinder = this.options.errorFinder;
            automation_client_1.logger.info("%s.startBuild on %s, buildCommands=[%j] or file=[%s]", this.name, id.url, this.options.commands, this.options.commandFile);
            return this.projectLoader.doWithProject({ credentials, id, readOnly: true }, (p) => __awaiter(this, void 0, void 0, function* () {
                const commands = this.options.commands || (yield loadCommandsFromFile(p, this.options.commandFile));
                const appId = yield this.options.projectToAppInfo(p);
                const opts = Object.assign({ cwd: p.baseDir }, (this.options.options || {}));
                function executeOne(buildCommand) {
                    return spawned_1.spawnAndWatch(buildCommand, Object.assign({}, opts, buildCommand.options), log, {
                        errorFinder,
                        stripAnsi: true,
                    })
                        .then(br => {
                        if (br.error) {
                            const message = "Stopping build commands due to error on " + spawned_1.stringifySpawnCommand(buildCommand);
                            log.write(message);
                            return { error: true, code: br.code, message };
                        }
                        return br;
                    });
                }
                let buildResult = executeOne(commands[0]);
                for (const buildCommand of commands.slice(1)) {
                    buildResult = buildResult
                        .then(br => {
                        if (br.error) {
                            throw new Error("Build failure: " + br.error);
                        }
                        log.write(sprintf_js_1.sprintf("Next after %j is...%s", br, spawned_1.stringifySpawnCommand(buildCommand)));
                        return executeOne(buildCommand);
                    });
                }
                buildResult = buildResult.then(br => {
                    automation_client_1.logger.info("Build RETURN: %j", br);
                    return br;
                });
                const b = new SpawnedBuild(appId, id, buildResult, team, log.url, !!this.options.deploymentUnitFor ? yield this.options.deploymentUnitFor(p, appId) : undefined);
                return b;
            }));
        });
    }
}
exports.SpawnBuilder = SpawnBuilder;
function loadCommandsFromFile(p, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildFile = yield p.getFile(path);
        if (!buildFile) {
            return undefined;
        }
        const content = yield buildFile.getContent();
        const commands = content.split("\n")
            .filter(l => !!l)
            .filter(l => !l.startsWith("#"))
            .map(l => spawned_1.asSpawnCommand(l, {}));
        automation_client_1.logger.info("Found Atomist build file in project %j: Commands are %j", p.id, commands);
        return commands;
    });
}
class SpawnedBuild {
    constructor(appInfo, repoRef, buildResult, team, url, deploymentUnitFile) {
        this.appInfo = appInfo;
        this.repoRef = repoRef;
        this.buildResult = buildResult;
        this.team = team;
        this.url = url;
        this.deploymentUnitFile = deploymentUnitFile;
    }
}
//# sourceMappingURL=SpawnBuilder.js.map