import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ExecuteGoalWithLog } from "../../../../../common/delivery/goals/support/reportGoalError";
export declare type K8Target = "testing" | "production";
export declare const K8TargetBase = "deploy/atomist/k8s/";
export declare function k8AutomationDeployContext(target: K8Target): string;
export declare function requestDeployToK8s(target: K8Target): ExecuteGoalWithLog;
export declare function undeployFromK8s(creds: ProjectOperationCredentials, id: RemoteRepoRef, env: string): Promise<void>;
