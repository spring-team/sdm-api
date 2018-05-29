import { HandlerContext } from "@atomist/automation-client";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { SdmGoal } from "../../../../ingesters/sdmGoalIngester";
import { CommitForSdmGoal, SdmGoalFields, SdmGoalRepo, SdmGoalsForCommit } from "../../../../typings/types";
import { Goal } from "../Goal";
export declare function findSdmGoalOnCommit(ctx: HandlerContext, id: RemoteRepoRef, providerId: string, goal: Goal): Promise<SdmGoal>;
export declare function fetchCommitForSdmGoal(ctx: HandlerContext, goal: SdmGoalFields.Fragment & SdmGoalRepo.Fragment): Promise<CommitForSdmGoal.Commit>;
export declare function fetchGoalsForCommit(ctx: HandlerContext, id: RemoteRepoRef, providerId: string): Promise<SdmGoalsForCommit.SdmGoal[]>;
export declare function sumSdmGoalEvents(some: SdmGoal[]): SdmGoal[];
