import * as schema from "../../typings/types";
import { IssueListenerInvocation } from "./IssueListenerInvocation";
import { SdmListener } from "./Listener";
export interface NewIssueListenerInvocation extends IssueListenerInvocation {
    issue: schema.OnIssueAction.Issue;
}
export declare type NewIssueListener = SdmListener<NewIssueListenerInvocation>;
