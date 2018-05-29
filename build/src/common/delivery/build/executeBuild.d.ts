import { Builder } from "../../../spi/build/Builder";
import { StatusForExecuteGoal } from "../../../typings/types";
import { ProjectLoader } from "../../repo/ProjectLoader";
import { ExecuteGoalWithLog } from "../goals/support/reportGoalError";
/**
 * Execute build with the appropriate builder
 * @param projectLoader used to load projects
 * @param builder builder to user
 */
export declare function executeBuild(projectLoader: ProjectLoader, builder: Builder): ExecuteGoalWithLog;
export declare function branchFromCommit(commit: StatusForExecuteGoal.Commit): string;
