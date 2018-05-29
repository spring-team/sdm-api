import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { BranchCommit } from "@atomist/automation-client/operations/edit/editModes";
import { Project } from "@atomist/automation-client/project/Project";
import { Status } from "../../../../util/github/ghub";
/**
 * Create a new branch, setting a GitHub commit status
 */
export declare class NewBranchWithStatus implements BranchCommit {
    branch: string;
    message: string;
    private readonly creds;
    private readonly status;
    constructor(branch: string, message: string, creds: ProjectOperationCredentials, status: Status);
    afterPersist(p: Project): Promise<any>;
}
