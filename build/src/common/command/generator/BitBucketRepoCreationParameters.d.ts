import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { NewRepoCreationParameters } from "@atomist/automation-client/operations/generate/NewRepoCreationParameters";
export declare class BitBucketRepoCreationParameters extends NewRepoCreationParameters {
    githubToken: any;
    apiUrl: string;
    readonly credentials: ProjectOperationCredentials;
    /**
     * Return a single RepoRef or undefined if we're not identifying a single repo
     * This implementation returns a GitHub.com repo but it can be overriden
     * to return any kind of repo
     * @return {RepoRef}
     */
    readonly repoRef: RemoteRepoRef;
}
