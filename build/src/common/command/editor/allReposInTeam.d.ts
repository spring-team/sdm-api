import { RepoFinder } from "@atomist/automation-client/operations/common/repoFinder";
/**
 * Use a GraphQL query to find all repos for the current team,
 * or look locally if appropriate, in current working directory
 * @param cwd directory to look in if this is local
 * @constructor
 */
export declare function allReposInTeam(cwd?: string): RepoFinder;
