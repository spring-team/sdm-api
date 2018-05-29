import { ExtensionPack } from "../../blueprint/ExtensionPack";
import { MessageGoal } from "../../common/delivery/goals/common/MessageGoal";
import { PushTest } from "../../common/listener/PushTest";
/**
 * Goal to explain a deployment freeze to the user.
 * Available after adding deploymentFreeze capability.
 * @type {MessageGoal}
 */
export declare const ExplainDeploymentFreezeGoal: MessageGoal;
/**
 * Implemented by objects that know how to persist deployment freeze status.
 */
export interface DeploymentStatusManager {
    setFrozen(flag: boolean): any;
    isFrozen: Promise<boolean>;
}
/**
 * Capability to add to an SDM to add deployment freeze.
 * Makes the ExplainDeploymentFreezeGoal available.
 * @param {DeploymentStatusManager} dsm
 * @return {ExtensionPack}
 */
export declare function deploymentFreeze(dsm: DeploymentStatusManager): ExtensionPack;
/**
 * Return a push test working against the current DeploymentStatusManager.
 * Use in SDMs that have enabled deploymentFreeze capability.
 * @param {DeploymentStatusManager} dsm
 * @return {PushTest}
 */
export declare function isDeploymentFrozen(dsm: DeploymentStatusManager): PushTest;
