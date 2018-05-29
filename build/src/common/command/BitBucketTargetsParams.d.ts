import { FallbackParams } from "@atomist/automation-client/operations/common/params/FallbackParams";
import { TargetsParams } from "@atomist/automation-client/operations/common/params/TargetsParams";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { BitBucketServerRepoRef } from "./BitBucketServerRepoRef";
/**
 * Base parameters for working with GitHub repo(s).
 * Allows use of regex.
 */
export declare class BitBucketTargetsParams extends TargetsParams implements FallbackParams {
    apiUrl: string;
    owner: string;
    repo: string;
    sha: string;
    repos: string;
    readonly credentials: ProjectOperationCredentials;
    constructor();
    /**
     * Return a single RepoRef or undefined if we're not identifying a single repo
     * @return {RepoRef}
     */
    readonly repoRef: BitBucketServerRepoRef;
}
