import { RepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { GitHubStatusAndFriends, GitHubStatusContext, GoalEnvironment } from "./support/github/gitHubContext";
/**
 * Core data for a goal
 */
export interface GoalDefinition {
    /**
     * Must be unique among goals
     * Should be camel case
     */
    uniqueName: string;
    environment: GoalEnvironment;
    orderedName: string;
    displayName?: string;
    completedDescription?: string;
    workingDescription?: string;
    failedDescription?: string;
    waitingForApprovalDescription?: string;
    isolated?: boolean;
    approvalRequired?: boolean;
}
export declare type PreconditionsStatus = "waiting" | "success" | "failure";
/**
 * Represents a delivery action, such as Build or Deploy.
 */
export declare class Goal {
    readonly context: GitHubStatusContext;
    readonly name: string;
    readonly definition: GoalDefinition;
    readonly uniqueCamelCaseName: string;
    readonly environment: GoalEnvironment;
    readonly successDescription: string;
    readonly inProcessDescription: string;
    readonly failureDescription: string;
    readonly requestedDescription: string;
    readonly waitingForApprovalDescription: string;
    readonly retryIntent: string;
    constructor(definition: GoalDefinition);
    preconditionsStatus(id: RepoRef, sub: GitHubStatusAndFriends): Promise<PreconditionsStatus>;
}
export declare class GoalWithPrecondition extends Goal {
    readonly dependsOn: Goal[];
    constructor(definition: GoalDefinition, ...dependsOn: Goal[]);
    preconditionsStatus(idForLogging: RepoRef, sub: GitHubStatusAndFriends): Promise<PreconditionsStatus>;
}
export declare function hasPreconditions(goal: Goal): goal is GoalWithPrecondition;
export declare function currentGoalIsStillPending(currentGoal: GitHubStatusContext, status: GitHubStatusAndFriends): boolean;
