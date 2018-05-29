import { OnSuccessStatus } from "../../typings/types";
import { RepoListenerInvocation, SdmListener } from "./Listener";
import Status = OnSuccessStatus.Status;
/**
 * Invoked on a successful deployment
 */
export interface DeploymentListenerInvocation extends RepoListenerInvocation {
    status: Status;
}
export declare type DeploymentListener = SdmListener<DeploymentListenerInvocation>;
