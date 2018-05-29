import { Goal } from "../../../../common/delivery/goals/Goal";
import { ExecuteGoalWithLog } from "../../../../common/delivery/goals/support/reportGoalError";
import { RepoListenerInvocation, SdmListener } from "../../../../common/listener/Listener";
export interface EndpointVerificationInvocation extends RepoListenerInvocation {
    /**
     * Reported endpoint base url
     */
    url: string;
}
export declare type EndpointVerificationListener = SdmListener<EndpointVerificationInvocation>;
/**
 * What the SDM should define for each environment's verification
 */
export interface SdmVerification {
    verifiers: EndpointVerificationListener[];
    endpointGoal: Goal;
    requestApproval: boolean;
}
export declare function executeVerifyEndpoint(sdm: SdmVerification): ExecuteGoalWithLog;
