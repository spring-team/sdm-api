/// <reference types="node" />
import { CloudFoundryInfo } from "./CloudFoundryTarget";
import { AxiosResponse } from "axios";
import { ReadStream } from "fs";
import { ManifestApplication } from "./CloudFoundryManifest";
export interface CloudFoundryClientV2 {
    api_url: string;
    token: any;
    usersUaa: any;
    apps: any;
    domains: any;
    spaces: any;
    serviceBindings: any;
    userProvidedServices: any;
    routes: any;
}
export declare function initializeCloudFoundry(cfi: CloudFoundryInfo): Promise<CloudFoundryClientV2>;
/**
 * This abstracts away the details of common CF API operations.
 * The implementations use a mix of API versions and HTTP libs and will likely change.
 */
export declare class CloudFoundryApi {
    private readonly cf;
    private readonly retryInterval;
    private authHeader;
    private readonly jsonContentHeader;
    constructor(cf: CloudFoundryClientV2, retryInterval?: number);
    private refreshToken();
    private retryUntilCondition(action, successCondition, failureCondition);
    stopApp(appGuid: string): Promise<AxiosResponse<any>>;
    startApp(appGuid: string): Promise<AxiosResponse<any>>;
    getApp(spaceGuid: string, appName: string): Promise<any>;
    createApp(spaceGuid: string, manifestApp: ManifestApplication): Promise<any>;
    updateAppWithManifest(appGuid: string, manifestApp: ManifestApplication): Promise<any>;
    renameApp(appGuid: string, appName: string): Promise<any>;
    private normalizeManifestMemory(memory);
    deleteApp(appGuid: string): Promise<AxiosResponse<any>>;
    getProcessStats(appGuid: string): Promise<AxiosResponse<any>>;
    uploadPackage(appGuid: string, packageFile: ReadStream): Promise<AxiosResponse<any>>;
    buildDroplet(packageGuid: string): Promise<AxiosResponse<any>>;
    setCurrentDropletForApp(appGuid: string, dropletGuid: string): Promise<AxiosResponse<any>>;
    getAppServiceBindings(appGuid: string): Promise<any[]>;
    getUserServices(): Promise<any[]>;
    addServices(appGuid: string, servicesToAdd: any[]): Promise<any>;
    removeServices(appGuid: string, serviceToRemove: any[]): Promise<any>;
    getAppRoutes(appGuid: string): Promise<any>;
    addRouteToApp(spaceGuid: string, appGuid: string, hostName: string, domainGuid: string): Promise<any>;
    getDomain(domainName: string): Promise<any>;
    getDomainByGuid(domainGuid: string): Promise<any>;
    removeRouteFromApp(spaceGuid: string, appGuid: string, hostName: string, domainName: string): Promise<any>;
    getSpaceByName(spaceName: string): Promise<any>;
}
