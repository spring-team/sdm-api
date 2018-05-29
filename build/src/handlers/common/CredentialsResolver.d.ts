import { HandlerContext } from "@atomist/automation-client";
import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
/**
 * Strategy interface to resolve credentials from a handler invocation.
 */
export interface CredentialsResolver {
    eventHandlerCredentials(context: HandlerContext, id: RemoteRepoRef): ProjectOperationCredentials;
    commandHandlerCredentials(context: HandlerContext, id: RemoteRepoRef): ProjectOperationCredentials;
}
