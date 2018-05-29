import { HandlerContext } from "@atomist/automation-client";
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { StatusForExecuteGoal } from "../../../../typings/types";
import { ProjectLoader } from "../../../repo/ProjectLoader";
import { ExecuteGoalWithLog } from "../../goals/support/reportGoalError";
export declare type ProjectVersioner = (status: StatusForExecuteGoal.Fragment, p: GitProject, log: ProgressLog) => Promise<string>;
/**
 * Version the project with a build specific version number
 * @param projectLoader used to load projects
 */
export declare function executeVersioner(projectLoader: ProjectLoader, projectVersioner: ProjectVersioner): ExecuteGoalWithLog;
export declare function readSdmVersion(owner: string, name: string, providerId: string, sha: string, branch: string, context: HandlerContext): Promise<string>;
