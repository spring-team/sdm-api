import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
/**
 * Convenient superclass for fingerprints.
 */
export declare abstract class AbstractFingerprint implements Fingerprint {
    readonly name: any;
    readonly abbreviation: any;
    readonly version: any;
    protected constructor(name: any, abbreviation: any, version: any);
    readonly abstract data: any;
    readonly sha: string;
}
