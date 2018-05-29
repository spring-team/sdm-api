import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { UserJoiningChannelListener } from "../../../common/listener/UserJoiningChannelListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A user joined a channel
 */
export declare class OnUserJoiningChannel implements HandleEvent<schema.OnUserJoiningChannel.Subscription> {
    private readonly listeners;
    private readonly credentialsFactory;
    constructor(listeners: UserJoiningChannelListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnUserJoiningChannel.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
