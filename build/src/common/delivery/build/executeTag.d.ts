import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ProjectLoader } from "../../repo/ProjectLoader";
import { ExecuteGoalWithLog } from "../goals/support/reportGoalError";
export declare function executeTag(projectLoader: ProjectLoader): ExecuteGoalWithLog;
export declare function createTagForStatus(id: RemoteRepoRef, sha: string, message: string, version: string, credentials: ProjectOperationCredentials): Promise<void>;
