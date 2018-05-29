import { GitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import * as slack from "@atomist/slack-messages/SlackMessages";
import { RepoInfo } from "../lifecycleHelpers";
export declare function linkToDiff(id: RemoteRepoRef, start: string, end: string, endDescription?: string): string;
export declare function renderDiff(token: string, id: GitHubRepoRef, start: string, end: string, color: string): Promise<slack.Attachment[]>;
export interface CommitForRendering {
    sha: string;
    message: string;
    author: {
        login: string;
    };
}
export declare function renderCommitMessage(repo: RepoInfo, commitNode: CommitForRendering): string;
