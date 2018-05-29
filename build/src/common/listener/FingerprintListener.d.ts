import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
import { RepoListenerInvocation, SdmListener } from "./Listener";
/**
 * Event raised on a computed fingerprint
 */
export interface FingerprintListenerInvocation extends RepoListenerInvocation {
    fingerprint: Fingerprint;
}
/**
 * React to a fingerprint diff
 */
export declare type FingerprintListener = SdmListener<FingerprintListenerInvocation>;
