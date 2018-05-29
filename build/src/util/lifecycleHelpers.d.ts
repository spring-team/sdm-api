import * as slack from "@atomist/slack-messages/SlackMessages";
/**
 * Safely truncate the first line of a commit message to 50 characters
 * or less.  Only count printable characters, i.e., not link URLs or
 * markup.
 */
export declare function truncateCommitMessage(message: string, repo: any): string;
/**
 * Generate GitHub repository "slug", i.e., owner/repo.
 *
 * @param repo repository with .owner and .name
 * @return owner/name string
 */
export declare function repoSlug(repo: RepoInfo): string;
export declare function htmlUrl(repo: RepoInfo): string;
export declare const DefaultGitHubApiUrl = "https://api.github.com/";
export declare function apiUrl(repo: any): string;
export declare function userUrl(repo: any, login: string): string;
export interface RepoInfo {
    owner: string;
    name: string;
    org?: {
        provider: {
            url?: string;
        };
    };
}
export declare function avatarUrl(repo: any, login: string): string;
export declare function commitUrl(repo: RepoInfo, commit: any): string;
/**
 * Find image URLs in a message body, returning an array of Slack
 * message attachments, one for each image.  It expects the message to
 * be in Slack message markup.
 *
 * @param body message body
 * @return array of Slack message Attachments with the `image_url` set
 *         to the URL of the image and the `text` and `fallback` set
 *         to the image name.
 */
export declare function extractImageUrls(body: string): slack.Attachment[];
/**
 * Find issue mentions in body and replace them with links.
 *
 * @param body message to modify
 * @param repo repository information
 * @return string with issue mentions replaced with links
 */
export declare function linkIssues(body: string, repo: any): string;
/**
 * Find all issue mentions and return an array of unique issue
 * mentions as "#3" and "owner/repo#5".
 *
 * @param msg string that may contain mentions
 * @return unique list of issue mentions as #N or O/R#N
 */
export declare function getIssueMentions(msg?: string): string[];
