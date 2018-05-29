import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { DeployableArtifact } from "../../../../spi/artifact/ArtifactStore";
import { Deployer } from "../../../../spi/deploy/Deployer";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { ProjectLoader } from "../../../repo/ProjectLoader";
import { ExecuteGoalResult } from "../../goals/ExecuteGoalResult";
import { CloudFoundryDeployment, CloudFoundryInfo } from "./CloudFoundryTarget";
/**
 * Spawn a new process to use the Cloud Foundry CLI to push.
 * Note that this isn't thread safe concerning multiple logins or spaces.
 */
export declare class CommandLineCloudFoundryDeployer implements Deployer<CloudFoundryInfo, CloudFoundryDeployment> {
    private readonly projectLoader;
    constructor(projectLoader: ProjectLoader);
    deploy(da: DeployableArtifact, cfi: CloudFoundryInfo, log: ProgressLog, credentials: ProjectOperationCredentials): Promise<CloudFoundryDeployment[]>;
    findDeployments(id: RemoteRepoRef, ti: CloudFoundryInfo, credentials: ProjectOperationCredentials): Promise<CloudFoundryDeployment[]>;
    undeploy(cfi: CloudFoundryInfo, deployment: CloudFoundryDeployment, log: ProgressLog): Promise<ExecuteGoalResult>;
    logInterpreter(log: string): {
        relevantPart: string;
        message: string;
    };
}
