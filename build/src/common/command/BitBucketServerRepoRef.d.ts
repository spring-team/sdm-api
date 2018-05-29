import { ActionResult } from "@atomist/automation-client/action/ActionResult";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { Configurable } from "@atomist/automation-client/project/git/Configurable";
import { AbstractRemoteRepoRef } from "./AbstractRemoteRepoRef";
/**
 * RemoteRepoRef implementation for BitBucket server (not BitBucket Cloud)
 *
 * This should ultimately move to automation-client-ts
 */
export declare class BitBucketServerRepoRef extends AbstractRemoteRepoRef {
    private readonly isProject;
    readonly ownerType: "projects" | "users";
    /**
     * Construct a new BitBucketServerRepoRef
     * @param {string} remoteBase remote base, including scheme
     * @param {string} owner
     * @param {string} repo
     * @param {boolean} isProject
     * @param {string} sha
     * @param {string} path
     */
    constructor(remoteBase: string, owner: string, repo: string, isProject?: boolean, sha?: string, path?: string);
    createRemote(creds: ProjectOperationCredentials, description: string, visibility: any): Promise<ActionResult<this>>;
    deleteRemote(creds: ProjectOperationCredentials): Promise<ActionResult<this>>;
    setUserConfig(credentials: ProjectOperationCredentials, project: Configurable): Promise<ActionResult<any>>;
    raisePullRequest(credentials: ProjectOperationCredentials, title: string, body: string, head: string, base: string): Promise<ActionResult<this>>;
    readonly url: string;
    readonly pathComponent: string;
    private readonly maybeTilde;
    private readonly apiBasePathComponent;
    readonly apiPathComponent: string;
}
