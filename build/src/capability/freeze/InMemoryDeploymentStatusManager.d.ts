import { DeploymentStatusManager } from "./deploymentFreeze";
/**
 * Demo implementation of DeploymentStatusManager that works only on this SDM node using local state
 */
export declare class InMemoryDeploymentStatusManager implements DeploymentStatusManager {
    private frozen;
    readonly isFrozen: Promise<boolean>;
    setFrozen(f: boolean): void;
}
