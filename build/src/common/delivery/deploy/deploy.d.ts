import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ArtifactStore, DeployableArtifact } from "../../../spi/artifact/ArtifactStore";
import { Deployer } from "../../../spi/deploy/Deployer";
import { Deployment, TargetInfo } from "../../../spi/deploy/Deployment";
import { ProgressLog } from "../../../spi/log/ProgressLog";
import { Goal } from "../goals/Goal";
import { RunWithLogContext } from "../goals/support/reportGoalError";
export declare type Targeter<T extends TargetInfo> = (id: RemoteRepoRef, branch: string) => T;
export interface DeployStage {
    deployGoal: Goal;
    endpointGoal: Goal;
    undeployGoal: Goal;
}
export interface DeployerInfo<T extends TargetInfo> {
    deployer: Deployer<T>;
    targeter: Targeter<T>;
}
export interface Target<T extends TargetInfo = TargetInfo> extends DeployerInfo<T>, DeployStage {
}
export declare function checkOutArtifact(targetUrl: string, artifactStore: ArtifactStore, id: RemoteRepoRef, credentials: ProjectOperationCredentials, progressLog: ProgressLog): Promise<DeployableArtifact>;
export declare function setEndpointGoalOnSuccessfulDeploy(params: {
    endpointGoal: Goal;
    rwlc: RunWithLogContext;
    deployment: Deployment;
}): Promise<void>;
