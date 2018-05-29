import { Deployer } from "../../../../../spi/deploy/Deployer";
import { ProjectLoader } from "../../../../repo/ProjectLoader";
import { LocalDeployerOptions } from "../LocalDeployerOptions";
import { ManagedDeployments, ManagedDeploymentTargetInfo } from "../ManagedDeployments";
/**
 * Managed deployments
 */
export declare let managedMavenDeployments: ManagedDeployments;
/**
 * Use Maven to deploy
 * @param projectLoader use to load projects
 * @param opts options
 */
export declare function mavenDeployer(projectLoader: ProjectLoader, opts: LocalDeployerOptions): Deployer<ManagedDeploymentTargetInfo>;
