import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { UpdatedIssueListener } from "../../../common/listener/UpdatedIssueListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * An issue has been updated
 */
export declare class UpdatedIssueHandler implements HandleEvent<schema.OnIssueAction.Subscription> {
    private readonly credentialsFactory;
    private readonly updatedIssueListeners;
    constructor(updatedIssueListeners: UpdatedIssueListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnIssueAction.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
