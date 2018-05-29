import { HandleCommand, HandlerContext } from "@atomist/automation-client";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { SdmGoalImplementationMapper } from "../../../../common/delivery/goals/support/SdmGoalImplementationMapper";
import { GoalSetter } from "../../../../common/listener/GoalSetter";
import { GoalsSetListener } from "../../../../common/listener/GoalsSetListener";
import { ProjectLoader } from "../../../../common/repo/ProjectLoader";
import { PushFields, RepoBranchTips } from "../../../../typings/types";
export declare class ResetGoalsParameters {
    githubToken: string;
    owner: string;
    repo: string;
    providerId: string;
    sha: string;
    branch: string;
}
export declare function resetGoalsCommand(rules: {
    projectLoader: ProjectLoader;
    goalsListeners: GoalsSetListener[];
    goalSetters: GoalSetter[];
    implementationMapping: SdmGoalImplementationMapper;
}): HandleCommand;
export declare function fetchPushForCommit(context: HandlerContext, id: RemoteRepoRef, providerId: string): Promise<PushFields.Fragment>;
export declare function fetchDefaultBranchTip(ctx: HandlerContext, repositoryId: {
    repo: string;
    owner: string;
    providerId: string;
}): Promise<RepoBranchTips.Repo>;
export declare function tipOfBranch(repo: RepoBranchTips.Repo, branchName: string): string;
