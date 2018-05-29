import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { BuildListener } from "../../../../common/listener/BuildListener";
import { OnBuildComplete } from "../../../../typings/types";
import { CredentialsResolver } from "../../../common/CredentialsResolver";
/**
 * Invoke listeners on complete build. Not a part of our delivery flow:
 * just observational.
 */
export declare class InvokeListenersOnBuildComplete implements HandleEvent<OnBuildComplete.Subscription> {
    private readonly listeners;
    private readonly credentialsFactory;
    constructor(listeners: BuildListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<OnBuildComplete.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
