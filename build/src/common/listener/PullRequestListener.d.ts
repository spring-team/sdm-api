import { OnPullRequest } from "../../typings/types";
import { SdmListener } from "./Listener";
import { ProjectListenerInvocation } from "./ProjectListener";
/**
 * Invocation for a pull request. The project will be as of the sha of the head
 * of the pull request
 */
export interface PullRequestListenerInvocation extends ProjectListenerInvocation {
    pullRequest: OnPullRequest.PullRequest;
}
export declare type PullRequestListener = SdmListener<PullRequestListenerInvocation>;
