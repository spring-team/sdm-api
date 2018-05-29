import { ArtifactStore } from "../../../spi/artifact/ArtifactStore";
import { Goal } from "../goals/Goal";
import { Target } from "./deploy";
import { ExecuteGoalWithLog } from "../goals/support/reportGoalError";
/**
 * Execute deploy with the supplied deployer and target
 */
export declare function executeDeploy(artifactStore: ArtifactStore, endpointGoal: Goal, target: Target): ExecuteGoalWithLog;
