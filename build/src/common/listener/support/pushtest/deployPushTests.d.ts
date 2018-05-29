import { HandlerContext } from "@atomist/automation-client";
import { RepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { PushTest } from "../../PushTest";
/**
 * Is repo enabled for deployment
 * @param {PushListenerInvocation} pi
 */
export declare const IsDeployEnabled: PushTest;
export declare function isDeployEnabled(parameters: {
    context: HandlerContext;
    id: RepoRef;
}): Promise<boolean>;
