import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
import { PushReactionRegistration } from "../PushReactionRegistration";
export declare type FingerprinterResult = Fingerprint | Fingerprint[];
export declare type FingerprinterRegistration = PushReactionRegistration<FingerprinterResult>;
