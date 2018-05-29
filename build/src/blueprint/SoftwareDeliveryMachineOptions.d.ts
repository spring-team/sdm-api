import { ProjectLoader } from "../common/repo/ProjectLoader";
import { CredentialsResolver } from "../handlers/common/CredentialsResolver";
import { ArtifactStore } from "../spi/artifact/ArtifactStore";
import { ProgressLogFactory } from "../spi/log/ProgressLog";
/**
 * Infrastructure options for a SoftwareDeliveryMachine.
 * Can be used to control the behavior of an SDM, and
 * also to facilitate testing.
 */
export interface SoftwareDeliveryMachineOptions {
    /**
     * Store for artifacts produced during the build process
     */
    artifactStore: ArtifactStore;
    /**
     * Object used to load projects
     */
    projectLoader: ProjectLoader;
    /**
     * Factory for loggers used to log specific activities
     * such as build and deployment.
     */
    logFactory: ProgressLogFactory;
    /**
     * Strategy for resolving credentials from a handler invocation
     */
    credentialsResolver: CredentialsResolver;
}
