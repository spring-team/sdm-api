import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { SpawnCommand } from "../../../../../util/misc/spawned";
import { ProjectLoader } from "../../../../repo/ProjectLoader";
import { ExecuteGoalResult } from "../../../goals/ExecuteGoalResult";
import { RunWithLogContext } from "../../../goals/support/reportGoalError";
import { SpawnBuilder, SpawnBuilderOptions } from "../SpawnBuilder";
/**
 * Options to use when running node commands like npm run compile that require dev dependencies to be installed
 */
export declare const DevelopmentEnvOptions: {
    env: {
        NODE_ENV: string;
    };
};
export declare const Install: SpawnCommand;
export declare function nodeBuilder(projectLoader: ProjectLoader, ...commands: string[]): SpawnBuilder;
export declare function npmBuilderOptionsFromFile(commandFile: string): SpawnBuilderOptions;
export declare const NpmPreparations: (typeof npmInstallPreparation)[];
export declare function npmInstallPreparation(p: GitProject, rwlc: RunWithLogContext): Promise<ExecuteGoalResult>;
export declare function npmVersionPreparation(p: GitProject, rwlc: RunWithLogContext): Promise<ExecuteGoalResult>;
export declare function npmCompilePreparation(p: GitProject, rwlc: RunWithLogContext): Promise<ExecuteGoalResult>;
