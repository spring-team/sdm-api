import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
import { PushImpactListenerInvocation } from "../../../listener/PushImpactListener";
import { PushReaction } from "../PushReactionRegistration";
import { FingerprinterResult } from "./FingerprinterRegistration";
/**
 * Compute fingerprints on this invocation with the given fingerprinters
 * @param {PushImpactListenerInvocation} pli
 * @param {Array<PushReaction<FingerprinterResult>>} fingerprinters
 * @return {Promise<Fingerprint[]>}
 */
export declare function computeFingerprints(pli: PushImpactListenerInvocation, fingerprinters: Array<PushReaction<FingerprinterResult>>): Promise<Fingerprint[]>;
export declare function isFingerprint(a: any): a is Fingerprint;
