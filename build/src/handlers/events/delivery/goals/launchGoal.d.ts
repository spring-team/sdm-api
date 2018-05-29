import { HandlerContext, HandlerResult } from "@atomist/automation-client";
import { EventIncoming, RequestProcessor } from "@atomist/automation-client/internal/transport/RequestProcessor";
import { AutomationEventListenerSupport } from "@atomist/automation-client/server/AutomationEventListener";
import { SdmGoalImplementationMapper } from "../../../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { ProjectLoader } from "../../../../common/repo/ProjectLoader";
import { ProgressLog, ProgressLogFactory } from "../../../../spi/log/ProgressLog";
import { OnAnyRequestedSdmGoal } from "../../../../typings/types";
/**
 * Launch a goal in an isolated environment (container or process) for fulfillment.
 */
export declare type IsolatedGoalLauncher = (goal: OnAnyRequestedSdmGoal.SdmGoal, ctx: HandlerContext, progressLog: ProgressLog) => Promise<HandlerResult>;
export declare class GoalAutomationEventListener extends AutomationEventListenerSupport {
    private readonly implementationMapper;
    private readonly projectLoader;
    private readonly logFactory;
    constructor(implementationMapper: SdmGoalImplementationMapper, projectLoader: ProjectLoader, logFactory: ProgressLogFactory);
    eventIncoming(payload: EventIncoming): void;
    registrationSuccessful(eventHandler: RequestProcessor): Promise<void>;
}
