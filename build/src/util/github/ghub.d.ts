import { GitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { Issue } from "@atomist/automation-client/util/gitHub";
import { AxiosPromise, AxiosRequestConfig } from "axios";
export declare type State = "error" | "failure" | "pending" | "success";
/**
 * GitHub status
 */
export interface Status {
    state: State;
    target_url?: string;
    description?: string;
    context?: string;
}
/**
 * Create a GitHub status
 * @param {string | ProjectOperationCredentials} creds
 * @param {GitHubRepoRef} rr
 * @param {Status} inputStatus
 * @return {AxiosPromise}
 */
export declare function createStatus(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef, inputStatus: Status): AxiosPromise;
export interface Tag {
    tag: string;
    message: string;
    /** Commit sha */
    object: string;
    type: string;
    tagger: {
        name: string;
        email: string;
        date: string;
    };
}
export declare function createTag(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef, tag: Tag): AxiosPromise;
export declare function createTagReference(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef, tag: Tag): AxiosPromise;
export declare function deleteRepository(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef): AxiosPromise;
export interface Release {
    tag_name: string;
    target_commitish?: string;
    name?: string;
    body?: string;
    draft?: boolean;
    prerelease?: boolean;
}
export declare function createRelease(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef, release: Release): AxiosPromise;
export interface GitHubCommitsBetween {
    commits: Array<{
        sha: string;
        author: {
            login: string;
        };
        commit: {
            message: string;
        };
    }>;
}
/**
 * List commits between these shas
 * @param {string | ProjectOperationCredentials} creds
 * @param {GitHubRepoRef} rr
 * @param {string} startSha
 * @param {string} endSha
 * @return {Promise<GitHubCommitsBetween>}
 */
export declare function listCommitsBetween(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef, startSha: string, endSha: string): Promise<GitHubCommitsBetween>;
export declare function authHeaders(token: string): AxiosRequestConfig;
export declare function tipOfDefaultBranch(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef): Promise<string>;
export declare function isPublicRepo(creds: string | ProjectOperationCredentials, rr: GitHubRepoRef): Promise<boolean>;
export declare function updateIssue(creds: string | ProjectOperationCredentials, rr: RemoteRepoRef, issueNumber: number, issue: Issue): AxiosPromise;
export declare function listTopics(creds: string | ProjectOperationCredentials, rr: RemoteRepoRef): Promise<string[]>;
