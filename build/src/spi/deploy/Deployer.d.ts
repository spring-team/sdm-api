import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { DeployableArtifact } from "../artifact/ArtifactStore";
import { LogInterpretation } from "../log/InterpretedLog";
import { ProgressLog } from "../log/ProgressLog";
import { Deployment, TargetInfo } from "./Deployment";
/**
 * Implemented by classes that can deploy from a published artifact that was build
 * by execution of a previous Build goal.
 */
export interface Deployer<T extends TargetInfo = TargetInfo, U extends Deployment = Deployment> extends LogInterpretation {
    /**
     * Remove a deployment. Very useful for project cleanup
     * @return {Promise<any>}
     */
    undeploy(ti: T, deployment: U, log: ProgressLog): Promise<any>;
    /**
     * Find all deployments of the artifact or app
     * @param id of the project
     * @param ti
     * @param credentials
     * @return {Promise<Array<Promise<Deployment>>>}
     */
    findDeployments(id: RemoteRepoRef, ti: T, credentials: ProjectOperationCredentials): Promise<U[]>;
    /**
     * Deploy the app returning a promise of deployments
     * @param {DeployableArtifact} da
     * @param {T} ti
     * @param {ProgressLog} log
     * @param {ProjectOperationCredentials} credentials
     * @param {string} team
     * @return {Promise<Array<Promise<Deployment>>>}
     */
    deploy(da: DeployableArtifact, ti: T, log: ProgressLog, credentials: ProjectOperationCredentials, team: string): Promise<U[]>;
}
