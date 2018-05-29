import { Deployer } from "../../../../../spi/deploy/Deployer";
import { LocalDeployerOptions } from "../LocalDeployerOptions";
import { ManagedDeployments, ManagedDeploymentTargetInfo } from "../ManagedDeployments";
/**
 * Managed deployments
 */
export declare let managedExecutableJarDeployments: ManagedDeployments;
/**
 * Start up an executable Jar on the same node as the automation client.
 * Not intended as a Paas, but for use during demos and development.
 * Always uses the same URL, whatever the branch and sha.
 * @param opts options
 */
export declare function executableJarDeployer(opts: LocalDeployerOptions): Deployer<ManagedDeploymentTargetInfo>;
