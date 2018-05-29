import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { CredentialsResolver } from "./CredentialsResolver";
export declare class GitHubCredentialsResolver implements CredentialsResolver {
    private readonly githubToken;
    eventHandlerCredentials(): ProjectOperationCredentials;
    commandHandlerCredentials(): ProjectOperationCredentials;
}
