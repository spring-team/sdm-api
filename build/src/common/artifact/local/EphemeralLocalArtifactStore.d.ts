import { ArtifactStore, DeployableArtifact, StoredArtifact } from "../../../spi/artifact/ArtifactStore";
import { AppInfo } from "../../../spi/deploy/Deployment";
/**
 * Store the artifact on local disk, relying on in memory cache.
 * **This is purely for demo and test use. It is NOT a production
 * quality implementation. It uses fake artifact links in
 * GitHub statuses that may not be honored after the present automation
 * client is shut down.**
 */
export declare class EphemeralLocalArtifactStore implements ArtifactStore {
    private readonly entries;
    storeFile(appInfo: AppInfo, what: string): Promise<string>;
    protected retrieve(url: string): Promise<StoredArtifact>;
    checkout(url: string): Promise<DeployableArtifact>;
}
