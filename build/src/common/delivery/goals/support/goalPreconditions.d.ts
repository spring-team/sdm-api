import { SdmGoal } from "../../../../ingesters/sdmGoalIngester";
export declare function preconditionsAreMet(goal: SdmGoal, info: {
    goalsForCommit: SdmGoal[];
}): boolean;
