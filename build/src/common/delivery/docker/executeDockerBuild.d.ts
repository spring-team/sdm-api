import { HandlerContext } from "@atomist/automation-client";
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { StatusForExecuteGoal } from "../../../typings/types";
import { ProjectLoader } from "../../repo/ProjectLoader";
import { ExecuteGoalWithLog, PrepareForGoalExecution } from "../goals/support/reportGoalError";
export interface DockerOptions {
    registry: string;
    user: string;
    password: string;
    dockerfileFinder?: (p: GitProject) => Promise<string>;
}
export declare type DockerImageNameCreator = (p: GitProject, status: StatusForExecuteGoal.Fragment, options: DockerOptions, ctx: HandlerContext) => Promise<{
    registry: string;
    name: string;
    version: string;
}>;
/**
 * Execute a Docker build for the project available from provided projectLoader
 * @param {ProjectLoader} projectLoader
 * @param {DockerImageNameCreator} imageNameCreator
 * @param {DockerOptions} options
 * @returns {ExecuteGoalWithLog}
 */
export declare function executeDockerBuild(projectLoader: ProjectLoader, imageNameCreator: DockerImageNameCreator, preparations: PrepareForGoalExecution[], options: DockerOptions): ExecuteGoalWithLog;
export declare const DefaultDockerImageNameCreator: DockerImageNameCreator;
