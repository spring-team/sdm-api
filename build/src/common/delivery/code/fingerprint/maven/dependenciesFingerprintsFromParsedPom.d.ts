import { Fingerprint } from "@atomist/automation-client/project/fingerprint/Fingerprint";
/**
 * Don't call except via mavenFingerprinter
 * @param epom xml2js parsed form
 * @return {Promise<Fingerprint>}
 */
export declare function dependenciesFingerprintsFromParsedPom(epom: any): Promise<Fingerprint>;
