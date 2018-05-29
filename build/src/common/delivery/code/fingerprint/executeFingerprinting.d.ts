import { FingerprintListener } from "../../../listener/FingerprintListener";
import { ProjectLoader } from "../../../repo/ProjectLoader";
import { ExecuteGoalWithLog } from "../../goals/support/reportGoalError";
import { FingerprinterRegistration } from "./FingerprinterRegistration";
/**
 * Execute fingerprinting
 * @param projectLoader project loader
 * @param {FingerprinterRegistration} fingerprinters
 * @param listeners listeners to fingerprints
 */
export declare function executeFingerprinting(projectLoader: ProjectLoader, fingerprinters: FingerprinterRegistration[], listeners: FingerprintListener[]): ExecuteGoalWithLog;
