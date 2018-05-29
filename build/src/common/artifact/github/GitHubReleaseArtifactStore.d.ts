import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import * as GitHubApi from "@octokit/rest";
import { ArtifactStore, DeployableArtifact } from "../../../spi/artifact/ArtifactStore";
import { AppInfo } from "../../../spi/deploy/Deployment";
/**
 * Implement ArtifactStore interface to store artifacts as GitHub releases
 */
export declare class GitHubReleaseArtifactStore implements ArtifactStore {
    storeFile(appInfo: AppInfo, localFile: string, creds: ProjectOperationCredentials): Promise<string>;
    checkout(url: string, id: RemoteRepoRef, creds: ProjectOperationCredentials): Promise<DeployableArtifact>;
}
export interface Asset {
    url: string;
    browser_download_url: string;
    name: string;
}
export declare function uploadAsset(token: string, owner: string, repo: string, tag: string, path: string, contentType?: string): Promise<Asset>;
export declare function githubApi(token: string, apiUrl?: string): GitHubApi;
