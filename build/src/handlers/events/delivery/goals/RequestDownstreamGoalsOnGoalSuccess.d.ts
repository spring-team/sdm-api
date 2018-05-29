import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { SdmGoalImplementationMapper } from "../../../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { SdmGoal } from "../../../../ingesters/sdmGoalIngester";
import { OnAnySuccessfulSdmGoal, ScmProvider } from "../../../../typings/types";
/**
 * Respond to a failure status by failing downstream goals
 */
export declare class RequestDownstreamGoalsOnGoalSuccess implements HandleEvent<OnAnySuccessfulSdmGoal.Subscription> {
    private readonly implementationMapper;
    githubToken: string;
    constructor(implementationMapper: SdmGoalImplementationMapper);
    handle(event: EventFired<OnAnySuccessfulSdmGoal.Subscription>, context: HandlerContext): Promise<HandlerResult>;
}
export declare function sumSdmGoalEventsByOverride(some: SdmGoal[], more: SdmGoal[]): SdmGoal[];
export declare function fetchScmProvider(context: HandlerContext, providerId: string): Promise<ScmProvider.ScmProvider>;
