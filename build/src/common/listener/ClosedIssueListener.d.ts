import * as schema from "../../typings/types";
import { IssueListenerInvocation } from "./IssueListenerInvocation";
import { SdmListener } from "./Listener";
/**
 * Invoked when an issue has been closed.
 */
export interface ClosedIssueListenerInvocation extends IssueListenerInvocation {
    issue: schema.OnClosedIssue.Issue;
}
export declare type ClosedIssueListener = SdmListener<ClosedIssueListenerInvocation>;
