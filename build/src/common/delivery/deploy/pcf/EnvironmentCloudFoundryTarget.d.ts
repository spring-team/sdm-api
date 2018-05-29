import { CloudFoundryInfo } from "./CloudFoundryTarget";
/**
 * Configure cloud foundry from environment variables.
 * See README for definition.
 */
export declare class EnvironmentCloudFoundryTarget implements CloudFoundryInfo {
    private readonly environmentName;
    api: string;
    username: string;
    password: string;
    org: string;
    /**
     * Logical name for the space
     * @param {string} environmentName: Name of the environment, such as "staging" or "production"
     */
    constructor(environmentName: "staging" | "production");
    readonly space: string;
    readonly name: string;
    readonly description: string;
}
export interface CloudfoundryOptions {
    api: string;
    user: string;
    password: string;
    org: string;
    spaces: {
        [key: string]: string;
    };
}
