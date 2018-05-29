import { HandlerContext, HandlerResult } from "@atomist/automation-client";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ArtifactStore } from "../../../../spi/artifact/ArtifactStore";
import { Builder, PushThatTriggersBuild } from "../../../../spi/build/Builder";
import { AppInfo } from "../../../../spi/deploy/Deployment";
import { InterpretLog } from "../../../../spi/log/InterpretedLog";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { ChildProcessResult } from "../../../../util/misc/spawned";
import { ProjectLoader } from "../../../repo/ProjectLoader";
import { AddressChannels } from "../../../slack/addressChannels";
export interface LocalBuildInProgress {
    readonly buildResult: Promise<ChildProcessResult>;
    readonly repoRef: RemoteRepoRef;
    readonly team: string;
    /** Available once build is complete */
    readonly appInfo: AppInfo;
    readonly deploymentUnitFile: string;
    readonly url: string;
}
/**
 * Superclass for build implemented on the automation client itself, emitting appropriate events to Atomist.
 * Allows listening to a Running build
 */
export declare abstract class LocalBuilder implements Builder {
    name: string;
    private readonly artifactStore;
    protected projectLoader: ProjectLoader;
    protected constructor(name: string, artifactStore: ArtifactStore, projectLoader: ProjectLoader);
    initiateBuild(credentials: ProjectOperationCredentials, id: RemoteRepoRef, addressChannels: AddressChannels, push: PushThatTriggersBuild, log: ProgressLog, context: HandlerContext): Promise<HandlerResult>;
    /**
     * Implemented to interpret build logs
     * @param {string} log
     * @return {InterpretedLog}
     */
    abstract logInterpreter: InterpretLog;
    protected abstract startBuild(credentials: ProjectOperationCredentials, id: RemoteRepoRef, atomistTeam: string, log: ProgressLog, addressChannels: AddressChannels): Promise<LocalBuildInProgress>;
    protected onStarted(credentials: ProjectOperationCredentials, id: RemoteRepoRef, push: PushThatTriggersBuild, runningBuild: LocalBuildInProgress, buildNo: string, context: HandlerContext): Promise<any>;
    protected onExit(credentials: ProjectOperationCredentials, id: RemoteRepoRef, success: boolean, push: PushThatTriggersBuild, runningBuild: LocalBuildInProgress, buildNo: string, artifactStore: ArtifactStore, context: HandlerContext): Promise<any>;
    protected updateBuildStatus(runningBuild: {
        repoRef: RemoteRepoRef;
        url: string;
        team: string;
    }, status: "started" | "failed" | "error" | "passed" | "canceled", branch: string, buildNo: string): Promise<any>;
    protected obtainBuildIdentifier(push: PushThatTriggersBuild, ctx: HandlerContext): Promise<string>;
    protected createBuildTag(id: RemoteRepoRef, push: PushThatTriggersBuild, buildNo: string, context: HandlerContext, credentials: ProjectOperationCredentials): Promise<void>;
}
