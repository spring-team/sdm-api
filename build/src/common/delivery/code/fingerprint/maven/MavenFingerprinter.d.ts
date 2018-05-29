import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
import { PushImpactListenerInvocation } from "../../../../listener/PushImpactListener";
import { FingerprinterRegistration } from "../FingerprinterRegistration";
/**
 * Public entry point for all Maven fingerprints. Use mvn help:effective-pom
 * to generic effective POM then parse it and turn it into fingerprints.
 * @param {GitProject} p
 * @return {Promise<Fingerprint[]>}
 */
export declare class MavenFingerprinter implements FingerprinterRegistration {
    readonly name: string;
    action(cri: PushImpactListenerInvocation): Promise<Fingerprint[]>;
}
