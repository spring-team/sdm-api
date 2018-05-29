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
const _ = require("lodash");
class BlueGreenNamer {
    constructor(currentAppName) {
        this.currentAppName = currentAppName;
    }
    getCurrentAppName() {
        return `${this.currentAppName}`;
    }
    getPreviousAppName() {
        return `${this.currentAppName}-old`;
    }
    getNextAppName() {
        return `${this.currentAppName}-new`;
    }
}
exports.BlueGreenNamer = BlueGreenNamer;
class CloudFoundryBlueGreener {
    constructor(cfApi, pusher, namer, log) {
        this.cfApi = cfApi;
        this.pusher = pusher;
        this.namer = namer;
        this.log = log;
    }
    cleanUpExistingBlueGreenApps() {
        return __awaiter(this, void 0, void 0, function* () {
            const spaceGuid = yield this.pusher.getSpaceGuid();
            const previousApp = yield this.cfApi.getApp(spaceGuid, this.namer.getPreviousAppName());
            if (previousApp) {
                this.log.write(`Removing app ${this.pusher.spaceName}:${this.namer.getPreviousAppName()}.`);
                yield this.cfApi.deleteApp(previousApp.metadata.guid);
            }
            const nextApp = yield this.cfApi.getApp(spaceGuid, this.namer.getNextAppName());
            if (nextApp) {
                yield this.cfApi.deleteApp(nextApp.metadata.guid);
                this.log.write(`Removing app ${this.pusher.spaceName}:${this.namer.getNextAppName()}.`);
            }
        });
    }
    createNextAppWithRoutes(manifestApp, packageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const spaceGuid = yield this.pusher.getSpaceGuid();
            const appProperties = _.assign({}, manifestApp);
            const currentApp = yield this.cfApi.getApp(spaceGuid, this.namer.getCurrentAppName());
            let currentRoutes = [];
            if (currentApp) {
                appProperties.name = this.namer.getNextAppName();
                currentRoutes = yield this.cfApi.getAppRoutes(currentApp.metadata.guid);
            }
            if (currentRoutes.length === 0) {
                appProperties["random-route"] = true;
            }
            this.log.write(`Creating app ${this.pusher.spaceName}:${appProperties.name}.`);
            const deployment = yield this.pusher.push(appProperties, packageFile, this.log);
            if (currentRoutes.length > 0) {
                this.log.write(`Adding routes to app ${this.pusher.spaceName}:${appProperties.name}.`);
                const nextApp = yield this.cfApi.getApp(spaceGuid, appProperties.name);
                currentRoutes.forEach((route) => __awaiter(this, void 0, void 0, function* () {
                    yield this.cfApi.addRouteToApp(spaceGuid, nextApp.metadata.guid, route.entity.host, route.entity.domain_guid);
                }));
                const anyRoute = currentRoutes[0];
                const domain = yield this.cfApi.getDomainByGuid(anyRoute.entity.domain_guid);
                const endpoint = `https://${anyRoute.entity.host}.${domain.entity.name}`;
                return _.assign({}, deployment, { endpoint });
            }
            return deployment;
        });
    }
    retireCurrentApp() {
        return __awaiter(this, void 0, void 0, function* () {
            const spaceGuid = yield this.pusher.getSpaceGuid();
            const nextApp = yield this.cfApi.getApp(spaceGuid, this.namer.getNextAppName());
            if (!nextApp) {
                return;
            }
            const currentApp = yield this.cfApi.getApp(spaceGuid, this.namer.getCurrentAppName());
            if (!currentApp) {
                return;
            }
            const currentRoutes = yield this.cfApi.getAppRoutes(currentApp.metadata.guid);
            if (currentRoutes.length > 0) {
                this.log.write(`Removing routes from app ${this.pusher.spaceName}:${this.namer.getNextAppName()}.`);
                const domain = this.pusher.defaultDomain;
                currentRoutes.forEach((route) => __awaiter(this, void 0, void 0, function* () {
                    yield this.cfApi.removeRouteFromApp(spaceGuid, currentApp.metadata.guid, route.entity.host, domain);
                }));
            }
            this.log.write(`Renaming app ${this.pusher.spaceName}:${this.namer.getCurrentAppName()} `
                + `to ${this.namer.getPreviousAppName()}.`);
            yield this.cfApi.renameApp(currentApp.metadata.guid, this.namer.getPreviousAppName());
            this.log.write(`Stopping app ${this.pusher.spaceName}:${this.namer.getPreviousAppName()}.`);
            yield this.cfApi.stopApp(currentApp.metadata.guid);
            this.log.write(`Renaming app ${this.pusher.spaceName}:${this.namer.getNextAppName()} `
                + `to ${this.namer.getCurrentAppName()}.`);
            yield this.cfApi.renameApp(nextApp.metadata.guid, this.namer.getCurrentAppName());
            return nextApp;
        });
    }
}
exports.CloudFoundryBlueGreener = CloudFoundryBlueGreener;
//# sourceMappingURL=CloudFoundryBlueGreener.js.map