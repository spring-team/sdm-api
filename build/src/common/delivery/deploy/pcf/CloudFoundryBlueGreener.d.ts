/// <reference types="node" />
import { ReadStream } from "fs";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { CloudFoundryApi } from "./CloudFoundryApi";
import { ManifestApplication } from "./CloudFoundryManifest";
import { CloudFoundryPusher } from "./CloudFoundryPusher";
import { CloudFoundryDeployment } from "./CloudFoundryTarget";
export declare class BlueGreenNamer {
    private readonly currentAppName;
    constructor(currentAppName: string);
    getCurrentAppName(): string;
    getPreviousAppName(): string;
    getNextAppName(): string;
}
export declare class CloudFoundryBlueGreener {
    private readonly cfApi;
    private readonly pusher;
    private readonly namer;
    private readonly log;
    constructor(cfApi: CloudFoundryApi, pusher: CloudFoundryPusher, namer: BlueGreenNamer, log: ProgressLog);
    cleanUpExistingBlueGreenApps(): Promise<void>;
    createNextAppWithRoutes(manifestApp: ManifestApplication, packageFile: ReadStream): Promise<CloudFoundryDeployment>;
    retireCurrentApp(): Promise<any>;
}
