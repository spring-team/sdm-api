/**˚
 * Added to end of URL of a status to fire manual approval step
 * @type {string}
 */
import { GitHubStatus } from "../../../../common/delivery/goals/support/github/gitHubContext";
export declare const ApprovalGateParam = "atomist:approve=true";
/**
 * Return a form of this URL for approval
 * @param {string} url
 * @return {string}
 */
export declare function forApproval(url: string): string;
export declare function requiresApproval(ghs: GitHubStatus): boolean;
export declare function disregardApproval(url: string): string;
