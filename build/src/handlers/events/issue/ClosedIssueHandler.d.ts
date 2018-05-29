import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { ClosedIssueListener } from "../../../common/listener/ClosedIssueListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A new issue has been created.
 */
export declare class ClosedIssueHandler implements HandleEvent<schema.OnClosedIssue.Subscription> {
    private readonly credentialsFactory;
    private readonly closedIssueListeners;
    constructor(closedIssueListeners: ClosedIssueListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnClosedIssue.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
