import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { PushListener } from "../../../common/listener/PushListener";
import * as schema from "../../../typings/types";
import { CredentialsResolver } from "../../common/CredentialsResolver";
/**
 * A new repo has been created, and it has some code in it.
 */
export declare class OnFirstPushToRepo implements HandleEvent<schema.OnFirstPushToRepo.Subscription> {
    private readonly actions;
    private readonly credentialsFactory;
    constructor(actions: PushListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnFirstPushToRepo.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
