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
const randomWord = require("random-word");
/**
 * Uses the Cloud Foundry API to (mostly) reimplement their CLI push.
 * It supports using the manifest, but not all attributes.
 * It currently attaches a default route rather than the routes specified in the manifest.
 * This is separate from the deployer so that the API could easily be mocked for testing.
 */
class CloudFoundryPusher {
    constructor(api, spaceName, defaultDomain = "cfapps.io") {
        this.api = api;
        this.spaceName = spaceName;
        this.defaultDomain = defaultDomain;
    }
    getSpaceGuid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.spaceGuid) {
                const space = yield this.api.getSpaceByName(this.spaceName);
                this.spaceGuid = space.metadata.guid;
            }
            return this.spaceGuid;
        });
    }
    push(manifestApp, packageFile, log) {
        return __awaiter(this, void 0, void 0, function* () {
            const spaceGuid = yield this.getSpaceGuid();
            const existingApp = yield this.api.getApp(spaceGuid, manifestApp.name);
            const app = existingApp ? existingApp : yield this.api.createApp(spaceGuid, manifestApp);
            const appGuid = app.metadata.guid;
            const appNameForLog = `${this.spaceName}:${manifestApp.name}`;
            log.write(`Uploading package for ${appNameForLog}...`);
            // tslint:disable-next-line:no-floating-promises
            log.flush();
            const packageUploadResult = yield this.api.uploadPackage(appGuid, packageFile);
            log.write(`Building package for ${appNameForLog}...`);
            // tslint:disable-next-line:no-floating-promises
            log.flush();
            const buildResult = yield this.api.buildDroplet(packageUploadResult.data.guid);
            const serviceNames = !manifestApp.services ? [] : manifestApp.services;
            const serviceModifications = yield this.appServiceModifications(appGuid, serviceNames);
            yield this.api.stopApp(appGuid);
            log.write(`Stopped app for updates to ${appNameForLog}.`);
            yield this.api.setCurrentDropletForApp(appGuid, buildResult.data.droplet.guid);
            if (serviceModifications.servicesToAdd.length > 0) {
                const addServiceNames = serviceModifications.servicesToAdd.map(s => s.entity.name);
                log.write(`Adding services ${addServiceNames} to ${appNameForLog}.`);
                yield this.api.addServices(appGuid, serviceModifications.servicesToAdd);
            }
            if (serviceModifications.servicesToRemove.length > 0) {
                const removeServiceNames = serviceModifications.servicesToRemove.map(s => s.entity.name);
                log.write(`Removing services ${removeServiceNames} from ${appNameForLog}.`);
                yield this.api.removeServices(appGuid, serviceModifications.servicesToRemove);
            }
            let hostName;
            if (manifestApp["random-route"]) {
                const appRoutes = yield this.api.getAppRoutes(appGuid);
                if (appRoutes.length === 0) {
                    hostName = `${manifestApp.name}-${randomWord()}-${randomWord()}`;
                    log.write(`Adding random route to ${appNameForLog}.`);
                    const domain = yield this.api.getDomain(this.defaultDomain);
                    const domainGuid = domain.metadata.guid;
                    yield this.api.addRouteToApp(spaceGuid, appGuid, hostName, domainGuid);
                }
                else {
                    hostName = appRoutes[0].entity.host;
                }
            }
            log.write(`Updating app with manifest ${appNameForLog}.`);
            yield this.api.updateAppWithManifest(appGuid, manifestApp);
            log.write(`Starting ${appNameForLog}...`);
            // tslint:disable-next-line:no-floating-promises
            log.flush();
            yield this.api.startApp(appGuid);
            log.write(`Push complete for ${appNameForLog}.`);
            // tslint:disable-next-line:no-floating-promises
            log.flush();
            return {
                endpoint: !!hostName ? this.constructEndpoint(hostName) : undefined,
                appName: manifestApp.name,
            };
        });
    }
    constructEndpoint(hostName) {
        return `https://${hostName}.${this.defaultDomain}`;
    }
    appServiceModifications(appGuid, serviceNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield this.api.getUserServices();
            const specifiedServices = serviceNames.map(serviceName => {
                return services.find(s => s.entity.name === serviceName);
            });
            const existingServiceBindings = yield this.api.getAppServiceBindings(appGuid);
            const existingServiceBindingGuids = existingServiceBindings
                .map(esb => esb.entity.service_instance_guid);
            const servicesToAdd = _.filter(specifiedServices, service => {
                return !_.includes(existingServiceBindingGuids, service.metadata.guid);
            });
            const specifiedServiceGuids = specifiedServices.map(s => s.metadata.guid);
            const servicesToRemove = _.filter(existingServiceBindings, (service) => {
                return !_.includes(specifiedServiceGuids, service.entity.service_instance_guid);
            });
            return {
                servicesToAdd,
                servicesToRemove,
            };
        });
    }
}
exports.CloudFoundryPusher = CloudFoundryPusher;
//# sourceMappingURL=CloudFoundryPusher.js.map