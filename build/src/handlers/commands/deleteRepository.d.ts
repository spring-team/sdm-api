import { HandleCommand } from "@atomist/automation-client";
export declare class DeleteRepositoryParameters {
    githubToken: string;
    owner: string;
    repo: string;
    providerId: string;
    areYouSure: string;
}
export declare const DeleteRepositoryCommandName = "DeleteRepository";
export declare function deleteRepositoryCommand(): HandleCommand;
