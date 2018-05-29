import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { EventHandlerMetadata, ValueDeclaration } from "@atomist/automation-client/metadata/automationMetadata";
import { SdmGoalImplementationMapper } from "../../../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { ProjectLoader } from "../../../../common/repo/ProjectLoader";
import { ProgressLogFactory } from "../../../../spi/log/ProgressLog";
import { OnAnyRequestedSdmGoal } from "../../../../typings/types";
/**
 * Handle an SDM request goal. Used for many implementation types.
 */
export declare class FulfillGoalOnRequested implements HandleEvent<OnAnyRequestedSdmGoal.Subscription>, EventHandlerMetadata {
    private readonly implementationMapper;
    private readonly projectLoader;
    private readonly logFactory;
    subscriptionName: string;
    subscription: string;
    name: string;
    description: string;
    values: ValueDeclaration[];
    githubToken: string;
    constructor(implementationMapper: SdmGoalImplementationMapper, projectLoader: ProjectLoader, logFactory: ProgressLogFactory);
    handle(event: EventFired<OnAnyRequestedSdmGoal.Subscription>, ctx: HandlerContext, params: this): Promise<HandlerResult>;
}
