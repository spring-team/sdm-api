import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ArtifactStore } from "../../../../../spi/artifact/ArtifactStore";
import { InterpretLog, LogInterpretation } from "../../../../../spi/log/InterpretedLog";
import { ProgressLog, ProgressLogFactory } from "../../../../../spi/log/ProgressLog";
import { ProjectLoader } from "../../../../repo/ProjectLoader";
import { AddressChannels } from "../../../../slack/addressChannels";
import { LocalBuilder, LocalBuildInProgress } from "../LocalBuilder";
/**
 * Build with Maven in the local automation client.
 * This implementation requires Java and maven on the classpath.
 * Note it is NOT intended for use for multiple organizations. It's OK
 * for one organization to use inside its firewall, but there is potential
 * vulnerability in builds of unrelated tenants getting at each others
 * artifacts.
 */
export declare class MavenBuilder extends LocalBuilder implements LogInterpretation {
    private readonly skipTests;
    constructor(artifactStore: ArtifactStore, logFactory: ProgressLogFactory, projectLoader: ProjectLoader, skipTests?: boolean);
    protected startBuild(credentials: ProjectOperationCredentials, id: RemoteRepoRef, atomistTeam: string, log: ProgressLog, addressChannels: AddressChannels): Promise<LocalBuildInProgress>;
    logInterpreter: InterpretLog;
}
