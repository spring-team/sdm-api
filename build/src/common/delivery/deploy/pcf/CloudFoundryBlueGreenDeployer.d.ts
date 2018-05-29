import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { DeployableArtifact } from "../../../../spi/artifact/ArtifactStore";
import { Deployer } from "../../../../spi/deploy/Deployer";
import { InterpretedLog } from "../../../../spi/log/InterpretedLog";
import { ProgressLog } from "../../../../spi/log/ProgressLog";
import { ProjectLoader } from "../../../repo/ProjectLoader";
import { CloudFoundryDeployment, CloudFoundryInfo } from "./CloudFoundryTarget";
/**
 * Use the Cloud Foundry API to orchestrae a blue green deployment.
 */
export declare class CloudFoundryBlueGreenDeployer implements Deployer<CloudFoundryInfo, CloudFoundryDeployment> {
    private readonly projectLoader;
    constructor(projectLoader: ProjectLoader);
    private getManifest(p);
    deploy(da: DeployableArtifact, cfi: CloudFoundryInfo, log: ProgressLog, credentials: ProjectOperationCredentials, team: string): Promise<CloudFoundryDeployment[]>;
    findDeployments(id: RemoteRepoRef, cfi: CloudFoundryInfo, credentials: ProjectOperationCredentials): Promise<CloudFoundryDeployment[]>;
    undeploy(cfi: CloudFoundryInfo, deployment: CloudFoundryDeployment, log: ProgressLog): Promise<any>;
    logInterpreter(log: string): InterpretedLog;
}
