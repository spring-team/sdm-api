import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { ChannelLinkListener } from "../../../common/listener/ChannelLinkListenerInvocation";
import { ProjectLoader } from "../../../common/repo/ProjectLoader";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A new channel has been linked to a repo
 */
export declare class OnChannelLink implements HandleEvent<schema.OnChannelLink.Subscription> {
    private readonly projectLoader;
    private readonly listeners;
    private readonly credentialsFactory;
    constructor(projectLoader: ProjectLoader, listeners: ChannelLinkListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnChannelLink.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
