/// <reference types="node" />
import { RemoteRepoRef, RepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ChildProcess } from "child_process";
import { Deployment, TargetInfo } from "../../../../spi/deploy/Deployment";
import { Targeter } from "../deploy";
export interface ManagedDeploymentTargetInfo extends TargetInfo {
    managedDeploymentKey: RemoteRepoRef;
}
export declare const ManagedDeploymentTargeter: Targeter<ManagedDeploymentTargetInfo>;
/**
 * Strategy for looking up a service
 */
export declare enum LookupStrategy {
    service = "service",
    branch = "branch",
    sha = "sha",
}
/**
 * Ports will be reused for the same app
 */
export interface DeployedApp {
    id: RepoRef;
    port: number;
    /** Will be undefined if the app is not currently deployed */
    childProcess: ChildProcess;
    deployment: Deployment;
    lookupStrategy: LookupStrategy;
}
/**
 * Manages local deployments to the automation server node
 * This is not intended for production use
 * @type {Array}
 */
export declare class ManagedDeployments {
    initialPort: number;
    readonly deployments: DeployedApp[];
    constructor(initialPort: number);
    /**
     * Find the appropriate port for this app
     * @param {RemoteRepoRef} id
     * @param lookupStrategy strategy for looking up the instance
     * @param host it will be on. Check for ports not in use
     * @return {number}
     */
    findPort(id: RemoteRepoRef, lookupStrategy: LookupStrategy, host: string): Promise<number>;
    recordDeployment(da: DeployedApp): void;
    findDeployment(id: RemoteRepoRef, lookupStrategy: LookupStrategy): DeployedApp;
    /**
     * Terminate any process we're managing on behalf of this id
     * @param {RemoteRepoRef} id
     * @param lookupStrategy strategy for finding the instance
     * @return {Promise<any>}
     */
    terminateIfRunning(id: RemoteRepoRef, lookupStrategy: LookupStrategy): Promise<any>;
    private nextFreePort(host);
}
