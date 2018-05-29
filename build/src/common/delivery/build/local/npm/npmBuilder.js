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
const spawned_1 = require("../../../../../util/misc/spawned");
const executeBuild_1 = require("../../executeBuild");
const projectVersioner_1 = require("../projectVersioner");
const SpawnBuilder_1 = require("../SpawnBuilder");
const npmLogInterpreter_1 = require("./npmLogInterpreter");
/**
 * Options to use when running node commands like npm run compile that require dev dependencies to be installed
 */
exports.DevelopmentEnvOptions = {
    env: Object.assign({}, process.env, { NODE_ENV: "development" }),
};
exports.Install = spawned_1.asSpawnCommand("npm ci", exports.DevelopmentEnvOptions);
function nodeBuilder(projectLoader, ...commands) {
    return new SpawnBuilder_1.SpawnBuilder({
        projectLoader,
        options: npmBuilderOptions(commands.map(cmd => spawned_1.asSpawnCommand(cmd, exports.DevelopmentEnvOptions))),
    });
}
exports.nodeBuilder = nodeBuilder;
function npmBuilderOptions(commands) {
    return {
        name: "NpmBuilder",
        commands,
        errorFinder: (code, signal, l) => {
            return l.log.startsWith("[error]") || l.log.includes("ERR!");
        },
        logInterpreter: npmLogInterpreter_1.NpmLogInterpreter,
        projectToAppInfo(p) {
            return __awaiter(this, void 0, void 0, function* () {
                const packageJson = yield p.findFile("package.json");
                const content = yield packageJson.getContent();
                const pkg = JSON.parse(content);
                return { id: p.id, name: pkg.name, version: pkg.version };
            });
        },
    };
}
function npmBuilderOptionsFromFile(commandFile) {
    return {
        name: "NpmBuilder",
        commandFile,
        errorFinder: (code, signal, l) => {
            return l.log.startsWith("[error]") || l.log.includes("ERR!");
        },
        logInterpreter: npmLogInterpreter_1.NpmLogInterpreter,
        projectToAppInfo(p) {
            return __awaiter(this, void 0, void 0, function* () {
                const packageJson = yield p.findFile("package.json");
                const content = yield packageJson.getContent();
                const pkg = JSON.parse(content);
                return { id: p.id, name: pkg.name, version: pkg.version };
            });
        },
    };
}
exports.npmBuilderOptionsFromFile = npmBuilderOptionsFromFile;
exports.NpmPreparations = [npmInstallPreparation, npmVersionPreparation, npmCompilePreparation];
function npmInstallPreparation(p, rwlc) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasPackageLock = p.fileExistsSync("package-lock.json");
        return spawned_1.spawnAndWatch({
            command: "npm",
            args: [hasPackageLock ? "ci" : "install"],
        }, Object.assign({ cwd: p.baseDir }, exports.DevelopmentEnvOptions), rwlc.progressLog, {
            errorFinder: code => code != null,
        });
    });
}
exports.npmInstallPreparation = npmInstallPreparation;
function npmVersionPreparation(p, rwlc) {
    return __awaiter(this, void 0, void 0, function* () {
        const commit = rwlc.status.commit;
        const version = yield projectVersioner_1.readSdmVersion(commit.repo.owner, commit.repo.name, commit.repo.org.provider.providerId, commit.sha, executeBuild_1.branchFromCommit(commit), rwlc.context);
        return spawned_1.spawnAndWatch({
            command: "npm",
            args: ["--no-git-tag-version", "version", version],
        }, {
            cwd: p.baseDir,
        }, rwlc.progressLog, {
            errorFinder: code => code !== 0,
        });
    });
}
exports.npmVersionPreparation = npmVersionPreparation;
function npmCompilePreparation(p, rwlc) {
    return __awaiter(this, void 0, void 0, function* () {
        return spawned_1.spawnAndWatch({
            command: "npm",
            args: ["run", "compile"],
        }, Object.assign({ cwd: p.baseDir }, exports.DevelopmentEnvOptions), rwlc.progressLog, {
            errorFinder: code => code != null,
        });
    });
}
exports.npmCompilePreparation = npmCompilePreparation;
//# sourceMappingURL=npmBuilder.js.map