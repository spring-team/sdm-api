import * as schema from "../../typings/types";
import { RepoListenerInvocation } from "./Listener";
/**
 * Superinterface for new and updated and closed issue invocations.
 */
export interface IssueListenerInvocation extends RepoListenerInvocation {
    issue: schema.OnIssueAction.Issue;
}
