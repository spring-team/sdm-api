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
const axios_1 = require("axios");
const FormData = require("form-data");
const _ = require("lodash");
const request = require("request");
const retry_1 = require("@atomist/automation-client/util/retry");
const cfClient = require("cf-client");
function initializeCloudFoundry(cfi) {
    return __awaiter(this, void 0, void 0, function* () {
        const cloudController = new cfClient.CloudController(cfi.api);
        const endpoint = yield cloudController.getInfo();
        const usersUaa = new cfClient.UsersUAA();
        usersUaa.setEndPoint(endpoint.authorization_endpoint);
        const token = yield usersUaa.login(cfi.username, cfi.password);
        usersUaa.setToken(token);
        const cf = {
            api_url: cfi.api,
            token,
            usersUaa,
            apps: new cfClient.Apps(cfi.api),
            domains: new cfClient.Domains(cfi.api),
            spaces: new cfClient.Spaces(cfi.api),
            serviceBindings: new cfClient.ServiceBindings(cfi.api),
            userProvidedServices: new cfClient.UserProvidedServices(cfi.api),
            routes: new cfClient.Routes(cfi.api),
        };
        return cf;
    });
}
exports.initializeCloudFoundry = initializeCloudFoundry;
/**
 * This abstracts away the details of common CF API operations.
 * The implementations use a mix of API versions and HTTP libs and will likely change.
 */
class CloudFoundryApi {
    constructor(cf, retryInterval = 1000) {
        this.cf = cf;
        this.retryInterval = retryInterval;
        this.jsonContentHeader = {
            "Content-Type": "application/json",
        };
    }
    refreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const newToken = yield this.cf.usersUaa.refreshToken();
            this.cf.token = newToken;
            this.authHeader = {
                Authorization: `${newToken.token_type} ${newToken.access_token}`,
            };
            this.cf.usersUaa.setToken(newToken);
            this.cf.apps.setToken(newToken);
            this.cf.domains.setToken(newToken);
            this.cf.spaces.setToken(newToken);
            this.cf.serviceBindings.setToken(newToken);
            this.cf.userProvidedServices.setToken(newToken);
            this.cf.routes.setToken(newToken);
        });
    }
    retryUntilCondition(action, successCondition, failureCondition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield action();
            if (successCondition(result)) {
                return result;
            }
            if (failureCondition(result)) {
                throw {
                    name: "RetryUntilConditionFailure",
                    message: JSON.stringify(result.data),
                };
            }
            yield new Promise(res => setTimeout(res, this.retryInterval));
            return this.retryUntilCondition(action, successCondition, failureCondition);
        });
    }
    stopApp(appGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return retry_1.doWithRetry(() => axios_1.default.post(`${this.cf.api_url}/v3/apps/${appGuid}/actions/stop`, undefined, { headers: this.authHeader }), `stop app ${appGuid}`);
        });
    }
    startApp(appGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            yield retry_1.doWithRetry(() => axios_1.default.post(`${this.cf.api_url}/v3/apps/${appGuid}/actions/start`, undefined, { headers: this.authHeader }), `start app ${appGuid}`);
            return this.retryUntilCondition(() => __awaiter(this, void 0, void 0, function* () {
                yield this.refreshToken();
                return this.getProcessStats(appGuid);
            }), r => _.every(r.data.resources, (p) => p.state === "RUNNING"), r => _.every(r.data.resources, (p) => p.state === "CRASHED"));
        });
    }
    getApp(spaceGuid, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const apps = yield this.cf.spaces.getSpaceApps(spaceGuid, {
                q: `name:${appName}`,
            });
            return _.head(apps.resources);
        });
    }
    createApp(spaceGuid, manifestApp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return this.cf.apps.add({
                "name": manifestApp.name,
                "space_guid": spaceGuid,
                "memory": this.normalizeManifestMemory(manifestApp.memory),
                "instances": manifestApp.instances,
                "disk_quota": manifestApp.disk_quota,
                "command": manifestApp.command,
                "buildpack": manifestApp.buildpack,
                "health-check-type": manifestApp["health-check-type"],
                "health_check_timeout": manifestApp.timeout,
                "environment_json": manifestApp.env,
            });
        });
    }
    updateAppWithManifest(appGuid, manifestApp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return this.cf.apps.update(appGuid, {
                "memory": this.normalizeManifestMemory(manifestApp.memory),
                "instances": manifestApp.instances,
                "disk_quota": manifestApp.disk_quota,
                "command": manifestApp.command,
                "buildpack": manifestApp.buildpack,
                "health-check-type": manifestApp["health-check-type"],
                "health_check_timeout": manifestApp.timeout,
                "environment_json": manifestApp.env,
            });
        });
    }
    renameApp(appGuid, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return retry_1.doWithRetry(() => axios_1.default.patch(`${this.cf.api_url}/v3/apps/${appGuid}`, {
                name: appName,
            }, { headers: _.assign({}, this.authHeader, this.jsonContentHeader) }), `rename app ${appGuid} to ${appName}`);
        });
    }
    normalizeManifestMemory(memory) {
        if (memory.endsWith("M")) {
            return +memory.replace("M", "");
        }
        else if (memory.endsWith("G")) {
            return +memory.replace("G", "") * 1000;
        }
    }
    deleteApp(appGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return retry_1.doWithRetry(() => axios_1.default.delete(`${this.cf.api_url}/v3/apps/${appGuid}`, { headers: this.authHeader }), `delete app ${appGuid}`);
        });
    }
    getProcessStats(appGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return retry_1.doWithRetry(() => axios_1.default.get(`${this.cf.api_url}/v3/processes/${appGuid}/stats`, { headers: this.authHeader }), `get process stats ${appGuid}`);
        });
    }
    uploadPackage(appGuid, packageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const packageCreateResult = yield retry_1.doWithRetry(() => axios_1.default.post(`${this.cf.api_url}/v3/packages`, {
                type: "bits",
                relationships: {
                    app: {
                        data: {
                            guid: appGuid,
                        },
                    },
                },
            }, { headers: _.assign({}, this.authHeader, this.jsonContentHeader) }), `create package ${appGuid}`);
            const formData = FormData();
            formData.maxDataSize = Infinity;
            formData.append("bits", packageFile);
            const uploadHeaders = _.assign({}, this.authHeader, formData.getHeaders());
            const options = {
                method: "POST",
                url: packageCreateResult.data.links.upload.href,
                headers: uploadHeaders,
                formData: {
                    bits: packageFile,
                },
            };
            request(options, (error, response, body) => {
                if (error) {
                    throw new Error(error);
                }
            });
            return this.retryUntilCondition(() => __awaiter(this, void 0, void 0, function* () {
                yield this.refreshToken();
                return retry_1.doWithRetry(() => axios_1.default.get(packageCreateResult.data.links.self.href, { headers: this.authHeader }), `get package ${packageCreateResult.data.guid}`);
            }), r => r.data.state === "READY", r => r.data.state === "FAILED");
        });
    }
    buildDroplet(packageGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const buildResult = yield retry_1.doWithRetry(() => axios_1.default.post(`${this.cf.api_url}/v3/builds`, {
                package: {
                    guid: packageGuid,
                },
            }, { headers: _.assign({}, this.authHeader, this.jsonContentHeader) }), `build droplet ${packageGuid}`);
            return this.retryUntilCondition(() => __awaiter(this, void 0, void 0, function* () {
                yield this.refreshToken();
                return retry_1.doWithRetry(() => axios_1.default.get(buildResult.data.links.self.href, { headers: this.authHeader }), `get build for package ${buildResult.data.guid}`);
            }), r => r.data.state === "STAGED", r => r.data.state === "FAILED" || r.data.state === "EXPIRED");
        });
    }
    setCurrentDropletForApp(appGuid, dropletGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return retry_1.doWithRetry(() => axios_1.default.patch(`${this.cf.api_url}/v3/apps/${appGuid}/relationships/current_droplet`, { data: { guid: dropletGuid } }, { headers: _.assign({}, this.authHeader, this.jsonContentHeader) }), `set current droplet for app ${appGuid}`);
        });
    }
    getAppServiceBindings(appGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const bindings = yield this.cf.apps.getServiceBindings(appGuid);
            return bindings.resources;
        });
    }
    getUserServices() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const services = yield this.cf.userProvidedServices.getServices();
            return services.resources;
        });
    }
    addServices(appGuid, servicesToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return servicesToAdd.map(service => {
                this.cf.serviceBindings.associateServiceWithApp(service.metadata.guid, appGuid);
            });
        });
    }
    removeServices(appGuid, serviceToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            return serviceToRemove.forEach(service => {
                this.cf.apps.removeServiceBindings(appGuid, service.metadata.guid);
            });
        });
    }
    getAppRoutes(appGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const result = yield this.cf.apps.getAppRoutes(appGuid);
            return result.resources;
        });
    }
    addRouteToApp(spaceGuid, appGuid, hostName, domainGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const routesMatchingHost = yield this.cf.routes.getRoutes({ q: `host:${hostName}` });
            const existingRoute = routesMatchingHost.resources.find(r => r.entity.domain_guid === domainGuid && r.entity.space_guid === spaceGuid);
            const route = existingRoute ? existingRoute : yield this.cf.routes.add({
                domain_guid: domainGuid,
                space_guid: spaceGuid,
                host: hostName,
            });
            return this.cf.apps.associateRoute(appGuid, route.metadata.guid);
        });
    }
    getDomain(domainName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const domains = yield this.cf.domains.getSharedDomains();
            return domains.resources.find(d => d.entity.name === domainName);
        });
    }
    getDomainByGuid(domainGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const domains = yield this.cf.domains.getSharedDomains();
            return domains.resources.find(d => d.metadata.guid === domainGuid);
        });
    }
    removeRouteFromApp(spaceGuid, appGuid, hostName, domainName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const appRoutes = yield this.getAppRoutes(appGuid);
            const domains = yield this.cf.domains.getSharedDomains();
            const domain = domains.resources.find(d => d.entity.name === domainName);
            const domainGuid = domain.metadata.guid;
            const existingRoute = appRoutes.find(r => r.entity.host === hostName && r.entity.domain_guid === domainGuid && r.entity.space_guid === spaceGuid);
            if (existingRoute) {
                return this.cf.apps.dissociateRoute(appGuid, existingRoute.metadata.guid);
            }
            return undefined;
        });
    }
    getSpaceByName(spaceName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshToken();
            const spaces = yield this.cf.spaces.getSpaces({ q: `name:${spaceName}` });
            return _.head(spaces.resources);
        });
    }
}
exports.CloudFoundryApi = CloudFoundryApi;
//# sourceMappingURL=CloudFoundryApi.js.map