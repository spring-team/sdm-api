import * as schema from "../../typings/types";
import { IssueListenerInvocation } from "./IssueListenerInvocation";
import { SdmListener } from "./Listener";
/**
 * Invocation on an updated issue
 */
export interface UpdatedIssueListenerInvocation extends IssueListenerInvocation {
    issue: schema.OnIssueAction.Issue;
}
export declare type UpdatedIssueListener = SdmListener<UpdatedIssueListenerInvocation>;
