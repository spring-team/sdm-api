import { HandlerContext } from "@atomist/automation-client";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { SdmGoal, SdmGoalFulfillment, SdmGoalState } from "../../../ingesters/sdmGoalIngester";
import { Goal } from "./Goal";
import { GoalImplementation } from "./SdmGoalImplementationMapper";
export declare function environmentFromGoal(goal: Goal): string;
export interface UpdateSdmGoalParams {
    state: SdmGoalState;
    description: string;
    url?: string;
    approved?: boolean;
    error?: Error;
    data?: string;
}
export declare function updateGoal(ctx: HandlerContext, before: SdmGoal, params: UpdateSdmGoalParams): Promise<any>;
export declare function goalCorrespondsToSdmGoal(goal: Goal, sdmGoal: SdmGoal): boolean;
export declare function constructSdmGoalImplementation(gi: GoalImplementation): SdmGoalFulfillment;
export declare function constructSdmGoal(ctx: HandlerContext, parameters: {
    goalSet: string;
    goalSetId: string;
    goal: Goal;
    state: SdmGoalState;
    id: RemoteRepoRef;
    providerId: string;
    url?: string;
    fulfillment?: SdmGoalFulfillment;
}): SdmGoal;
export declare function storeGoal(ctx: HandlerContext, sdmGoal: SdmGoal): Promise<SdmGoal>;
export declare function descriptionFromState(goal: Goal, state: SdmGoalState): string;
