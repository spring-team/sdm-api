import { Deployment, TargetInfo } from "../../../../spi/deploy/Deployment";
/**
 * Path to Cloud Foundry manifest within deployable projects
 * @type {string}
 */
export declare const CloudFoundryManifestPath = "manifest.yml";
export interface CloudFoundryInfo extends TargetInfo {
    api: string;
    username: string;
    password: string;
    space: string;
    org: string;
}
export interface CloudFoundryDeployment extends Deployment {
    appName: string;
}
export declare const PivotalWebServices: {
    api: string;
};
