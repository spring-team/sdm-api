import { ReviewListener } from "../../../listener/ReviewListener";
import { ProjectLoader } from "../../../repo/ProjectLoader";
import { ExecuteGoalWithLog } from "../../goals/support/reportGoalError";
import { ReviewerRegistration } from "./ReviewerRegistration";
/**
 * Execute reviews and route or react to results using review listeners
 * @param {ProjectLoader} projectLoader
 * @param {ReviewerRegistration[]} reviewerRegistrations
 * @param {ReviewListener[]} reviewListeners
 * @return {ExecuteGoalWithLog}
 */
export declare function executeReview(projectLoader: ProjectLoader, reviewerRegistrations: ReviewerRegistration[], reviewListeners: ReviewListener[]): ExecuteGoalWithLog;
