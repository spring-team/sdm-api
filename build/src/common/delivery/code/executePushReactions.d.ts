import { ProjectLoader } from "../../repo/ProjectLoader";
import { ExecuteGoalWithLog } from "../goals/support/reportGoalError";
import { PushReactionRegisterable } from "./PushReactionRegistration";
/**
 * Execute arbitrary code reactions against a codebase
 * @param {ProjectLoader} projectLoader
 * @param {PushReactionRegistration[]} registrations
 * @return {ExecuteGoalWithLog}
 */
export declare function executePushReactions(projectLoader: ProjectLoader, registrations: PushReactionRegisterable[]): ExecuteGoalWithLog;
