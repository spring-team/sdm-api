import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { TagListener } from "../../../common/listener/TagListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A new tag has been created
 */
export declare class OnTag implements HandleEvent<schema.OnTag.Subscription> {
    private readonly listeners;
    private readonly credentialsFactory;
    constructor(listeners: TagListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnTag.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
