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
const fs = require("fs-extra");
const p = require("path");
const ghub_1 = require("../../../../../util/github/ghub");
const spawned_1 = require("../../../../../util/misc/spawned");
const npmBuilder_1 = require("./npmBuilder");
/**
 * Execute npm publish
 * @param {ProjectLoader} projectLoader
 * @param {ProjectIdentifier} projectIdentifier
 * @param {PrepareForGoalExecution[]} preparations
 * @return {ExecuteGoalWithLog}
 */
function executePublish(projectLoader, projectIdentifier, preparations = npmBuilder_1.NpmPreparations, options) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { credentials, id, context } = rwlc;
        return projectLoader.doWithProject({ credentials, id, context, readOnly: false }, (project) => __awaiter(this, void 0, void 0, function* () {
            for (const preparation of preparations) {
                const pResult = yield preparation(project, rwlc);
                if (pResult.code !== 0) {
                    return pResult;
                }
            }
            yield configure(options);
            const result = yield spawned_1.spawnAndWatch({
                command: "bash",
                args: [p.join(__dirname, "..", "..", "..", "..", "..", "scripts", "npm-publish.bash"),
                    `--registry=${options.registry}`,
                    "--access",
                    options.access ? options.access : "restricted"],
            }, {
                cwd: project.baseDir,
            }, rwlc.progressLog, {
                errorFinder: code => code !== 0,
            });
            if (result.code === 0) {
                const pi = yield projectIdentifier(project);
                const url = `${options.registry}/${pi.name}/-/${pi.name}-${pi.version}.tgz`;
                yield ghub_1.createStatus(credentials, id, {
                    context: "npm/atomist/package",
                    description: "NPM package",
                    target_url: url,
                    state: "success",
                });
                result.targetUrl = url;
            }
            yield deleteNpmrc();
            return result;
        }));
    });
}
exports.executePublish = executePublish;
function configure(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const npmrc = p.join(process.env.HOME || process.env.USER_DIR, ".npmrc");
        let npm = "";
        if (fs.existsSync(npmrc)) {
            npm = fs.readFileSync(npmrc).toString();
        }
        if (!npm.includes(options.npmrc)) {
            npm = `${npm}
${options.npmrc}`;
        }
        yield fs.writeFile(npmrc, npm);
        return options;
    });
}
function deleteNpmrc() {
    return __awaiter(this, void 0, void 0, function* () {
        const npmrc = p.join(process.env.HOME || process.env.USER_DIR, ".npmrc");
        return fs.unlink(npmrc);
    });
}
//# sourceMappingURL=executePublish.js.map