import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
/**
 * Basic config for all parameter creation
 */
export interface GeneratorConfig {
    /**
     * The seed repo
     */
    seed: RemoteRepoRef;
    /**
     * Command intent
     */
    intent: string;
    /**
     * Add an Atomist webhook to new repos?
     */
    addAtomistWebhook: boolean;
}
