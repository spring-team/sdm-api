import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { OnAnyFailedSdmGoal } from "../../../../typings/types";
/**
 * Respond to a failure status by failing downstream goals
 */
export declare class SkipDownstreamGoalsOnGoalFailure implements HandleEvent<OnAnyFailedSdmGoal.Subscription> {
    handle(event: EventFired<OnAnyFailedSdmGoal.Subscription>, context: HandlerContext): Promise<HandlerResult>;
}
