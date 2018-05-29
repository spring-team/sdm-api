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
const yaml = require("js-yaml");
const _ = require("lodash");
const CloudFoundryApi_1 = require("./CloudFoundryApi");
const CloudFoundryPusher_1 = require("./CloudFoundryPusher");
const CloudFoundryTarget_1 = require("./CloudFoundryTarget");
const ProjectArchiver_1 = require("./ProjectArchiver");
/**
 * Use the Cloud Foundry API to approximate their CLI to push.
 * Note that this is indeed thread safe concerning multiple logins and spaces.
 */
class CloudFoundryPushDeployer {
    constructor(projectLoader) {
        this.projectLoader = projectLoader;
    }
    getManifest(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const manifestFile = yield p.findFile(CloudFoundryTarget_1.CloudFoundryManifestPath);
            const manifestContent = yield manifestFile.getContent();
            return yaml.load(manifestContent);
        });
    }
    deploy(da, cfi, log, credentials, team) {
        return __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.info("Deploying app [%j] to Cloud Foundry [%j]", da, Object.assign({}, cfi, { password: "REDACTED" }));
            if (!cfi.api || !cfi.username || !cfi.password || !cfi.space) {
                throw new Error("cloud foundry authentication information missing. See CloudFoundryTarget.ts");
            }
            return this.projectLoader.doWithProject({ credentials, id: da.id, readOnly: !da.cwd }, (project) => __awaiter(this, void 0, void 0, function* () {
                const archiver = new ProjectArchiver_1.ProjectArchiver(log);
                const packageFile = yield archiver.archive(project, da);
                const manifest = yield this.getManifest(project);
                const cfClient = yield CloudFoundryApi_1.initializeCloudFoundry(cfi);
                const cfApi = new CloudFoundryApi_1.CloudFoundryApi(cfClient);
                const pusher = new CloudFoundryPusher_1.CloudFoundryPusher(cfApi, cfi.space);
                const deploymentPromises = manifest.applications.map(manifestApp => {
                    manifestApp["random-route"] = true; // always use a random route for now to match previous behavior
                    return pusher.push(manifestApp, packageFile, log);
                });
                return Promise.all(deploymentPromises);
            }));
        });
    }
    findDeployments(id, cfi, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cfi.api || !cfi.username || !cfi.password || !cfi.space) {
                throw new Error("cloud foundry authentication information missing. See CloudFoundryTarget.ts");
            }
            return this.projectLoader.doWithProject({ credentials, id, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
                const manifest = yield this.getManifest(project);
                const cfClient = yield CloudFoundryApi_1.initializeCloudFoundry(cfi);
                const cfApi = new CloudFoundryApi_1.CloudFoundryApi(cfClient);
                const pusher = new CloudFoundryPusher_1.CloudFoundryPusher(cfApi, cfi.space);
                const spaceGuid = yield pusher.getSpaceGuid();
                const apps = manifest.applications.map((manifestApp) => __awaiter(this, void 0, void 0, function* () {
                    const app = yield cfApi.getApp(spaceGuid, manifestApp.name);
                    if (app) {
                        return manifestApp.name;
                    }
                    else {
                        return undefined;
                    }
                }));
                const appNames = _.compact(yield Promise.all(apps));
                return appNames.map(appName => {
                    return {
                        appName,
                    };
                });
            }));
        });
    }
    undeploy(cfi, deployment, log) {
        return __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.info(`Undeploying app ${cfi.space}:${deployment.appName} from Cloud Foundry ${cfi.description}`);
            if (!cfi.api || !cfi.org || !cfi.username || !cfi.password || !cfi.space) {
                throw new Error("cloud foundry authentication information missing. See CloudFoundryTarget.ts");
            }
            const cfClient = yield CloudFoundryApi_1.initializeCloudFoundry(cfi);
            const cfApi = new CloudFoundryApi_1.CloudFoundryApi(cfClient);
            const space = yield cfApi.getSpaceByName(cfi.space);
            const spaceGuid = space.metadata.guid;
            const app = yield cfApi.getApp(spaceGuid, deployment.appName);
            if (app) {
                return cfApi.deleteApp(app.metadata.guid);
            }
        });
    }
    logInterpreter(log) {
        return {
            relevantPart: log.split("\n").slice(-10).join("\n"),
            message: "Oh no!",
        };
    }
}
exports.CloudFoundryPushDeployer = CloudFoundryPushDeployer;
//# sourceMappingURL=CloudFoundryPushDeployer.js.map