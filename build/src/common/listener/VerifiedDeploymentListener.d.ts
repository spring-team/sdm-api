import { StatusState } from "../../typings/types";
import { RepoListenerInvocation, SdmListener } from "./Listener";
export interface StatusInfo {
    state?: StatusState | null;
    targetUrl?: string | null;
    context?: string | null;
}
/**
 * Represents a verified deployment
 */
export interface VerifiedDeploymentListenerInvocation extends RepoListenerInvocation {
    status: StatusInfo;
}
export declare type VerifiedDeploymentListener = SdmListener<VerifiedDeploymentListenerInvocation>;
