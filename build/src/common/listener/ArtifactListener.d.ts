import { DeployableArtifact } from "../../spi/artifact/ArtifactStore";
import { RepoListenerInvocation, SdmListener } from "./Listener";
import { PushRegistration } from "./PushRegistration";
export interface ArtifactListenerInvocation extends RepoListenerInvocation {
    deployableArtifact: DeployableArtifact;
}
export declare type ArtifactListener = SdmListener<ArtifactListenerInvocation>;
export declare type ArtifactListenerRegistration = PushRegistration<ArtifactListener>;
export declare type ArtifactListenerRegisterable = ArtifactListener | ArtifactListenerRegistration;
export declare function toArtifactListenerRegistration(alr: ArtifactListenerRegisterable): ArtifactListenerRegistration;
