import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { VerifiedDeploymentListener } from "../../../../common/listener/VerifiedDeploymentListener";
import { OnSuccessStatus } from "../../../../typings/types";
import { CredentialsResolver } from "../../../common/CredentialsResolver";
/**
 * React to a verified deployment
 */
export declare class OnVerifiedDeploymentStatus implements HandleEvent<OnSuccessStatus.Subscription> {
    private readonly listeners;
    private readonly credentialsFactory;
    constructor(listeners: VerifiedDeploymentListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<OnSuccessStatus.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
