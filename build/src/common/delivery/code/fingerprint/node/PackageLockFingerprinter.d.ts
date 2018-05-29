import { PushImpactListenerInvocation } from "../../../../listener/PushImpactListener";
import { PushTest } from "../../../../listener/PushTest";
import { FingerprinterRegistration, FingerprinterResult } from "../FingerprinterRegistration";
/**
 * Compute a fingerprint from a package-lock.json file.
 * Unlike a Maven POM, we can rely on ordering in a package lock file
 * so do not need to sort the data ourselves before sha-ing.
 */
export declare class PackageLockFingerprinter implements FingerprinterRegistration {
    readonly name: string;
    readonly pushTest: PushTest;
    action(cri: PushImpactListenerInvocation): Promise<FingerprinterResult>;
}
