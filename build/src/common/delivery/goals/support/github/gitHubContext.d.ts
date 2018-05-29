import { StatusState } from "../../../../../typings/types";
export declare type GitHubStatusContext = string;
export interface GitHubStatus {
    context?: GitHubStatusContext;
    description?: string;
    state?: StatusState;
    targetUrl?: string;
}
export interface GitHubStatusAndFriends extends GitHubStatus {
    siblings: GitHubStatus[];
}
export declare type GoalEnvironment = "0-code/" | "1-staging/" | "2-prod/" | "8-doom/";
export declare const BaseContext = "sdm/atomist/";
export declare const IndependentOfEnvironment: GoalEnvironment;
export declare const StagingEnvironment: GoalEnvironment;
export declare const ProductionEnvironment: GoalEnvironment;
export declare const ProjectDisposalEnvironment: GoalEnvironment;
/**
 * if this is a context we created, then we can interpret it.
 * Otherwise returns undefined
 * @param {string} context
 * @returns {{base: string; env: string; stage: string}}
 */
export declare function splitContext(context: GitHubStatusContext): {
    base: string;
    env: string;
    envOrder: number;
    name: string;
    goalOrder: number;
    envPart: string;
    goalPart: string;
    goalName: string;
};
export declare function contextIsAfter(contextA: GitHubStatusContext, contextB: GitHubStatusContext): boolean;
