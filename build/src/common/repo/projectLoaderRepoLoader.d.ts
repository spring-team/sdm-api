import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RepoLoader } from "@atomist/automation-client/operations/common/repoLoader";
import { ProjectLoader } from "./ProjectLoader";
/**
 * Adapter from newer ProjectLoader to older RepoLoader for use in editors
 * @param pl ProjectLoader
 * @param credentials credentials to use to load projects
 * @return {RepoLoader}
 */
export declare function projectLoaderRepoLoader(pl: ProjectLoader, credentials: ProjectOperationCredentials): RepoLoader;
