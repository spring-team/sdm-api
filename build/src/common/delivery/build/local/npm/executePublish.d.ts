import { ProjectLoader } from "../../../../repo/ProjectLoader";
import { ExecuteGoalWithLog, PrepareForGoalExecution } from "../../../goals/support/reportGoalError";
import { ProjectIdentifier } from "../projectIdentifier";
/**
 * Execute npm publish
 * @param {ProjectLoader} projectLoader
 * @param {ProjectIdentifier} projectIdentifier
 * @param {PrepareForGoalExecution[]} preparations
 * @return {ExecuteGoalWithLog}
 */
export declare function executePublish(projectLoader: ProjectLoader, projectIdentifier: ProjectIdentifier, preparations: PrepareForGoalExecution[], options: NpmOptions): ExecuteGoalWithLog;
export interface NpmOptions {
    npmrc: string;
    registry: string;
    access: string;
}
