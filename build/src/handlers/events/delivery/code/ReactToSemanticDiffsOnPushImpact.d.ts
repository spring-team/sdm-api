import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { FingerprintDifferenceListener } from "../../../../common/listener/FingerprintDifferenceListener";
import * as schema from "../../../../typings/types";
import { CredentialsResolver } from "../../../common/CredentialsResolver";
/**
 * React to a PushImpact event to react to semantic diffs
 */
export declare class ReactToSemanticDiffsOnPushImpact implements HandleEvent<schema.OnPushImpact.Subscription> {
    private readonly differenceListeners;
    private readonly credentialsFactory;
    constructor(differenceListeners: FingerprintDifferenceListener[], credentialsFactory: CredentialsResolver);
    handle(event: EventFired<schema.OnPushImpact.Subscription>, context: HandlerContext, params: this): Promise<HandlerResult>;
}
