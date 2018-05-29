import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { NewIssueListener } from "../../../common/listener/NewIssueListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A new issue has been created.
 */
export declare class NewIssueHandler implements HandleEvent<schema.OnIssueAction.Subscription> {
    private readonly credentialsFactory;
    private readonly newIssueListeners;
    constructor(newIssueListeners: NewIssueListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnIssueAction.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
