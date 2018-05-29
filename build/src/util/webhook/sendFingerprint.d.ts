import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
/**
 * Publish the given fingerprint to Atomist in the given team
 * @param {GitHubRepoRef} id id of repo the fingerprint applies to
 * @param {Fingerprint} fingerprint fingerprint to publish
 * @param {string} team team to which this fingerprint applies
 * @return {Promise<any>}
 */
export declare function sendFingerprint(id: RemoteRepoRef, fingerprint: Fingerprint, team: string): Promise<any>;
