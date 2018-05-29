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
const spawned_1 = require("../../../util/misc/spawned");
const ImageLink_1 = require("../../../util/webhook/ImageLink");
const executeBuild_1 = require("../build/executeBuild");
const projectVersioner_1 = require("../build/local/projectVersioner");
/**
 * Execute a Docker build for the project available from provided projectLoader
 * @param {ProjectLoader} projectLoader
 * @param {DockerImageNameCreator} imageNameCreator
 * @param {DockerOptions} options
 * @returns {ExecuteGoalWithLog}
 */
function executeDockerBuild(projectLoader, imageNameCreator, preparations = [], options) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { status, credentials, id, context, progressLog } = rwlc;
        return projectLoader.doWithProject({ credentials, id, context, readOnly: false }, (p) => __awaiter(this, void 0, void 0, function* () {
            for (const preparation of preparations) {
                const pResult = yield preparation(p, rwlc);
                if (pResult.code !== 0) {
                    return pResult;
                }
            }
            const opts = {
                cwd: p.baseDir,
            };
            const spOpts = {
                errorFinder: code => code !== 0,
            };
            const imageName = yield imageNameCreator(p, status, options, context);
            const image = `${imageName.registry}/${imageName.name}:${imageName.version}`;
            const dockerfilePath = yield (options.dockerfileFinder ? options.dockerfileFinder(p) : "Dockerfile");
            const loginArgs = ["login", "--username", options.user, "--password", options.password];
            if (/[^A-Za-z0-9]/.test(options.registry)) {
                loginArgs.push(options.registry);
            }
            // 1. run docker login
            let result = yield spawned_1.spawnAndWatch({
                command: "docker",
                args: loginArgs,
            }, opts, progressLog, spOpts);
            if (result.code !== 0) {
                return result;
            }
            // 2. run docker build
            result = yield spawned_1.spawnAndWatch({
                command: "docker",
                args: ["build", ".", "-f", dockerfilePath, "-t", image],
            }, opts, progressLog, spOpts);
            if (result.code !== 0) {
                return result;
            }
            // 3. run docker push
            result = yield spawned_1.spawnAndWatch({
                command: "docker",
                args: ["push", image],
            }, opts, progressLog, spOpts);
            if (result.code !== 0) {
                return result;
            }
            // 4. create image link
            if (yield ImageLink_1.postLinkImageWebhook(status.commit.repo.owner, status.commit.repo.name, status.commit.sha, image, context.teamId)) {
                return result;
            }
            else {
                return { code: 1, message: "Image link failed" };
            }
        }));
    });
}
exports.executeDockerBuild = executeDockerBuild;
exports.DefaultDockerImageNameCreator = (p, status, options, context) => __awaiter(this, void 0, void 0, function* () {
    const name = p.name;
    const commit = status.commit;
    const version = yield projectVersioner_1.readSdmVersion(commit.repo.owner, commit.repo.name, commit.repo.org.provider.providerId, commit.sha, executeBuild_1.branchFromCommit(commit), context);
    return {
        registry: options.registry,
        name,
        version,
    };
});
//# sourceMappingURL=executeDockerBuild.js.map