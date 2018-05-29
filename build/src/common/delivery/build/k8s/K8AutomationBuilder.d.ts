import { HandlerContext } from "@atomist/automation-client";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { Builder, PushThatTriggersBuild } from "../../../../spi/build/Builder";
import { InterpretedLog, LogInterpretation } from "../../../../spi/log/InterpretedLog";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { AddressChannels } from "../../../slack/addressChannels";
/**
 * Upon recognizing a plan to create an artifact, send a message to k8-automation to request a build.
 * k8-automation will trigger a build for this commit in Google Container Builder.
 * When that is complete, it will send an ImageLinked event, and that means our artifact has been created.
 *
 * The message to k8-automation takes the form of a pending GitHub status.
 * Its response takes the form of a Build event which we will notice and update the Build goal,
 * and an ImageLink event which we will notice and update the Artifact goal with a link to that image.
 */
export declare class K8sAutomationBuilder implements Builder, LogInterpretation {
    name: string;
    initiateBuild(creds: ProjectOperationCredentials, id: RemoteRepoRef, ac: AddressChannels, push: PushThatTriggersBuild, log: ProgressLog, context: HandlerContext): Promise<any>;
    logInterpreter(log: string): InterpretedLog | undefined;
}
