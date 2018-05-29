import { GitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { BitBucketServerRepoRef } from "../../common/command/BitBucketServerRepoRef";
import { SdmGoal } from "../../ingesters/sdmGoalIngester";
import { CoreRepoFieldsAndChannels, OnPushToAnyBranch, ScmProvider, StatusForExecuteGoal } from "../../typings/types";
/**
 * Obtain a RemoteRepoRef from the given push, correctly
 * resolving provider.
 * @param {OnPushToAnyBranch.Push} push
 * @return {any}
 */
export declare function repoRefFromPush(push: OnPushToAnyBranch.Push): RemoteRepoRef;
export declare function toBitBucketServerRepoRef(params: {
    providerUrl: string;
    owner: string;
    name: string;
    sha: string;
    branch?: string;
}): BitBucketServerRepoRef;
export declare function providerIdFromPush(push: OnPushToAnyBranch.Push): string;
export declare function providerIdFromStatus(status: StatusForExecuteGoal.Fragment): string;
export declare function repoRefFromStatus(status: StatusForExecuteGoal.Fragment): GitHubRepoRef;
export declare function repoRefFromSdmGoal(sdmGoal: SdmGoal, provider: ScmProvider.ScmProvider): RemoteRepoRef;
/**
 * Convert GraphQL return to our remote repo ref, instantiating
 * the correct type based on provider
 * @param {CoreRepoFieldsAndChannels.Fragment} repo
 * @param opts options - sha or branch
 * @return {RemoteRepoRef}
 */
export declare function toRemoteRepoRef(repo: CoreRepoFieldsAndChannels.Fragment, opts?: {
    sha?: string;
    branch?: string;
}): RemoteRepoRef;
