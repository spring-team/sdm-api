import { CredentialsResolver } from "../../../common/CredentialsResolver";
import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { GoalCompletionListener } from "../../../../common/listener/GoalsSetListener";
import { OnAnyCompletedSdmGoal } from "../../../../typings/types";
/**
 * Respond to a failure or success status by running listeners
 */
export declare class RespondOnGoalCompletion implements HandleEvent<OnAnyCompletedSdmGoal.Subscription> {
    private readonly credentialsFactory;
    private readonly goalCompletionListeners;
    token: string;
    constructor(credentialsFactory: CredentialsResolver, goalCompletionListeners: GoalCompletionListener[]);
    handle(event: EventFired<OnAnyCompletedSdmGoal.Subscription>, context: HandlerContext): Promise<HandlerResult>;
}
