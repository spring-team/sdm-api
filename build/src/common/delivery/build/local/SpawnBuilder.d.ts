/// <reference types="node" />
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { Project } from "@atomist/automation-client/project/Project";
import { SpawnOptions } from "child_process";
import { ArtifactStore } from "../../../../spi/artifact/ArtifactStore";
import { AppInfo } from "../../../../spi/deploy/Deployment";
import { InterpretLog, LogInterpretation } from "../../../../spi/log/InterpretedLog";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { ErrorFinder, SpawnCommand } from "../../../../util/misc/spawned";
import { ProjectLoader } from "../../../repo/ProjectLoader";
import { LocalBuilder, LocalBuildInProgress } from "./LocalBuilder";
export interface SpawnBuilderOptions {
    name: string;
    /**
     * Commands we'll execute via Node spawn.
     * Command execution will terminate on the first error.
     */
    commands?: SpawnCommand[];
    /**
     * Alternative to commands. File containing a list of
     * newline-separated commands. May contain blank lines
     * or comments beginning with #.
     */
    commandFile?: string;
    /**
     * Error finder: Necessary only if a spawned process
     * can return non-zero on success.
     */
    errorFinder?: ErrorFinder;
    /**
     * Interpreter of command output
     */
    logInterpreter: InterpretLog;
    options?: SpawnOptions;
    /**
     * Find artifact info from the sources of this project,
     * for example by parsing a package.json or Maven POM file.
     * @param {Project} p
     * @return {Promise<AppInfo>}
     */
    projectToAppInfo(p: Project): Promise<AppInfo>;
    /**
     * Find the deploymentUnit after a successful build
     * @param {Project} p
     * @param {AppInfo} appId
     * @return {Promise<string>}
     */
    deploymentUnitFor?(p: GitProject, appId: AppInfo): Promise<string>;
}
/**
 * Build using spawn on the automation client node.
 * Note it is NOT intended for use for multiple organizations. It's OK
 * for one organization to use inside its firewall, but there is potential
 * vulnerability in builds of unrelated tenants getting at each others
 * artifacts.
 */
export declare class SpawnBuilder extends LocalBuilder implements LogInterpretation {
    private readonly options;
    constructor(params: {
        artifactStore?: ArtifactStore;
        projectLoader: ProjectLoader;
        options: SpawnBuilderOptions;
    });
    readonly logInterpreter: InterpretLog;
    protected startBuild(credentials: ProjectOperationCredentials, id: RemoteRepoRef, team: string, log: ProgressLog): Promise<LocalBuildInProgress>;
}
