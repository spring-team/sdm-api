/// <reference types="node" />
import { ReadStream } from "fs";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { CloudFoundryApi } from "./CloudFoundryApi";
import { ManifestApplication } from "./CloudFoundryManifest";
import { CloudFoundryDeployment } from "./CloudFoundryTarget";
export interface ServicesModifications {
    servicesToAdd: any[];
    servicesToRemove: any[];
}
/**
 * Uses the Cloud Foundry API to (mostly) reimplement their CLI push.
 * It supports using the manifest, but not all attributes.
 * It currently attaches a default route rather than the routes specified in the manifest.
 * This is separate from the deployer so that the API could easily be mocked for testing.
 */
export declare class CloudFoundryPusher {
    private readonly api;
    readonly spaceName: string;
    readonly defaultDomain: string;
    private spaceGuid;
    constructor(api: CloudFoundryApi, spaceName: string, defaultDomain?: string);
    getSpaceGuid(): Promise<string>;
    push(manifestApp: ManifestApplication, packageFile: ReadStream, log: ProgressLog): Promise<CloudFoundryDeployment>;
    constructEndpoint(hostName: string): string;
    appServiceModifications(appGuid: string, serviceNames: string[]): Promise<ServicesModifications>;
}
