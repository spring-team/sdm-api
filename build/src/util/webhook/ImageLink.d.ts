export interface AtomistBuildRepository {
    owner_name: string;
    name: string;
}
export declare type AtomistBuildType = "cron" | "pull_request" | "push" | "tag" | "manual";
export declare type AtomistBuildStatus = "started" | "failed" | "error" | "passed" | "canceled";
export interface AtomistBuild {
    repository: AtomistBuildRepository;
    number?: number;
    name?: string;
    compare_url?: string;
    type: AtomistBuildType;
    pull_request_number?: number;
    build_url?: string;
    status: AtomistBuildStatus;
    id?: string;
    commit: string;
    tag?: string;
    branch?: string;
    provider?: string;
}
export declare type AtomistWebhookType = "application" | "build" | "link-image";
/**
 * Post to the Atomist generic build webhook URL.  It creates the payload
 * then uses postWebhook.
 *
 * @param owner repository owner, i.e., user or organization
 * @param repo name of repository
 * @param branch commit branch
 * @param commit commit SHA
 * @param status "start", "success", or "fail"
 * @param teamId Atomist team ID
 * @param retryOptions change default retry options
 * @return true if successful, false on failure after retries
 */
export declare function postBuildWebhook(owner: string, repo: string, branch: string, commit: string, status: AtomistBuildStatus, teamId: string, retryOptions?: {
    retries: number;
    factor: number;
    minTimeout: number;
    maxTimeout: number;
    randomize: boolean;
}): Promise<boolean>;
export interface AtomistLinkImageGit {
    owner: string;
    repo: string;
    sha: string;
}
export interface AtomistLinkImageDocker {
    image: string;
}
export interface AtomistLinkImage {
    git: AtomistLinkImageGit;
    docker: AtomistLinkImageDocker;
    type: "link-image";
}
/**
 * Post to the Atomist link-image webhook URL.  It creates the payload
 * then uses postWebhook.
 *
 * @param owner repository owner, i.e., user or organization
 * @param repo name of repository
 * @param commit commit SHA
 * @param image Docker image tag, e.g., registry.com/owner/repo:version
 * @param teamId Atomist team ID
 * @param retryOptions change default retry options
 * @return true if successful, false on failure after retries
 */
export declare function postLinkImageWebhook(owner: string, repo: string, commit: string, image: string, teamId: string, retryOptions?: {
    retries: number;
    factor: number;
    minTimeout: number;
    maxTimeout: number;
    randomize: boolean;
}): Promise<boolean>;
/**
 * Post payload to the Atomist webhook URL.  It will retry
 * several times.
 *
 * @param webhook type of webhook
 * @param payload object to post
 * @param teamId Atomist team ID
 * @param retryOptions change default retry options
 * @return true if successful, false on failure after retries
 */
export declare function postWebhook(webhook: AtomistWebhookType, payload: any, teamId: string, retryOptions?: {
    retries: number;
    factor: number;
    minTimeout: number;
    maxTimeout: number;
    randomize: boolean;
}): Promise<boolean>;
