import { ActionResult } from "@atomist/automation-client/action/ActionResult";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { ProviderType, RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { Configurable } from "@atomist/automation-client/project/git/Configurable";
/**
 * Superclass for RemoteRepoRef implementations.
 * Handles parsing remote base
 *
 * This should ultimately move down to automation-client-ts and replace AbstractRepoRef.
 */
export declare abstract class AbstractRemoteRepoRef implements RemoteRepoRef {
    readonly providerType: ProviderType;
    readonly owner: string;
    readonly repo: string;
    readonly sha: string;
    readonly path: string;
    branch?: string;
    readonly scheme: "http://" | "https://";
    readonly apiBase: string;
    /**
     * Remote url not including scheme or trailing /
     */
    readonly remoteBase: string;
    /**
     * Construct a new RemoteRepoRef
     * @param {ProviderType} providerType
     * @param {string} rawRemote remote url. Should start with a scheme.
     * May have a trailing slash, which will be stripped
     * @param {string} owner
     * @param {string} repo
     * @param {string} sha
     * @param {string} path
     */
    protected constructor(providerType: ProviderType, rawRemote: string, owner: string, repo: string, sha?: string, path?: string);
    readonly url: string;
    cloneUrl(creds: ProjectOperationCredentials): string;
    readonly pathComponent: string;
    abstract createRemote(creds: ProjectOperationCredentials, description: string, visibility: any): Promise<ActionResult<this>>;
    abstract setUserConfig(credentials: ProjectOperationCredentials, project: Configurable): Promise<ActionResult<any>>;
    abstract raisePullRequest(creds: ProjectOperationCredentials, title: string, body: string, head: string, base: string): Promise<ActionResult<this>>;
    abstract deleteRemote(creds: ProjectOperationCredentials): Promise<ActionResult<this>>;
}
