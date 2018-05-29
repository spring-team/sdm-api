import { HandlerContext } from "@atomist/automation-client";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { AddressChannels } from "../slack/addressChannels";
/**
 * Context for an SDM action, whether a listener invocation or internal action
 */
export interface SdmContext {
    /**
     * Context of the Atomist EventHandler invocation. Use to run GraphQL
     * queries, use the messageClient directly and find
     * the team and correlation id
     */
    context: HandlerContext;
    /**
     * If available, provides a way to address the channel(s) related to this event.
     * This is usually, but not always, the channels linked to a
     * In some cases, such as repo creation or a push to a repo where there is no linked channel,
     * addressChannels will go to dev/null without error.
     */
    addressChannels: AddressChannels;
    /**
     * Credentials for use with source control hosts such as GitHub
     */
    credentials: ProjectOperationCredentials;
}
/**
 * Context for an SDM action on a particular repo
 */
export interface RepoContext extends SdmContext {
    /**
     * The repo this relates to
     */
    id: RemoteRepoRef;
}
