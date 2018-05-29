/// <reference types="node" />
import { ChildProcess } from "child_process";
import { Deployment } from "../../../../spi/deploy/Deployment";
export interface StartupInfo {
    port: number;
    atomistTeam: string;
    contextRoot: string;
}
export interface SpawnedDeployment extends Deployment {
    childProcess: ChildProcess;
}
export interface LocalDeployerOptions {
    /**
     * url of the host
     */
    baseUrl: string;
    /**
     * Initial port to use
     */
    lowerPort?: number;
    /**
     * Command line arguments for the startup process to
     * expose our port and Atomist team if possible
     * Should be an array as valid input into node spawn
     * @param {StartupInfo} s
     * @return {string[]}
     */
    commandLineArgumentsFor: (s: StartupInfo) => string[];
    /**
     * Pattern to find in output to indicate that the server has come up successfully.
     * For example, matching something like "Started SpringRestSeedApplication in 3.931 seconds"
     */
    successPatterns: RegExp[];
}
export declare const DefaultLocalDeployerOptions: Partial<LocalDeployerOptions>;
