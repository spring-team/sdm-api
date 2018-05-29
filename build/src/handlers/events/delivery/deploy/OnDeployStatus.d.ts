import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { DeploymentListener } from "../../../../common/listener/DeploymentListener";
import { OnSuccessStatus } from "../../../../typings/types";
import { CredentialsResolver } from "../../../common/CredentialsResolver";
/**
 * React to a deployment.
 */
export declare class OnDeployStatus implements HandleEvent<OnSuccessStatus.Subscription> {
    private readonly listeners;
    private readonly credentialsFactory;
    constructor(listeners: DeploymentListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<OnSuccessStatus.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
