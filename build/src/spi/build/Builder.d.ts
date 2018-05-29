import { HandlerContext } from "@atomist/automation-client";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { AddressChannels } from "../../common/slack/addressChannels";
import { LogInterpretation } from "../log/InterpretedLog";
import { ProgressLog } from "../log/ProgressLog";
export interface PushThatTriggersBuild {
    branch: string;
    defaultBranch: string;
    name: string;
    owner: string;
    providerId: string;
    sha: string;
}
/**
 * Responsible for initiating a build and storing an artifact.
 * Wherever the build runs, it is responsible for emitting Atomist build events.
 */
export interface Builder extends LogInterpretation {
    name: string;
    initiateBuild(creds: ProjectOperationCredentials, id: RemoteRepoRef, ac: AddressChannels, push: PushThatTriggersBuild, log: ProgressLog, context: HandlerContext): Promise<any>;
}
