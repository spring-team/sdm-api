import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
/**
 * Compute a cache key from the given remote repo ref and sha
 * @param {RemoteRepoRef} id
 * @return {any}
 */
export declare function cacheKeyForSha(id: RemoteRepoRef): any;
