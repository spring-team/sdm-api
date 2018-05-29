import { EventFired, HandleEvent, HandlerContext, HandlerResult } from "@atomist/automation-client";
import { Goal } from "../../../../../common/delivery/goals/Goal";
import { OnAParticularStatus } from "../../../../../typings/types";
export declare const K8sTestingDomain = "testing";
export declare const K8sProductionDomain = "production";
/**
 * Deploy a published artifact identified in an ImageLinked event.
 */
export declare class NoticeK8sTestDeployCompletionOnStatus implements HandleEvent<OnAParticularStatus.Subscription> {
    private readonly deployGoal;
    private readonly endpointGoal;
    private readonly githubToken;
    /**
     *
     * @param {Goal} deployGoal
     * @param {Goal} endpointGoal
     */
    constructor(deployGoal: Goal, endpointGoal: Goal);
    handle(event: EventFired<OnAParticularStatus.Subscription>, ctx: HandlerContext, params: this): Promise<HandlerResult>;
}
