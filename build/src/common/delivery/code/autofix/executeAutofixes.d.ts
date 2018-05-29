import { ProjectLoader } from "../../../repo/ProjectLoader";
import { ExecuteGoalWithLog } from "../../goals/support/reportGoalError";
import { AutofixRegistration } from "./AutofixRegistration";
/**
 * Execute autofixes against this push
 * Throw an error on failure
 * @param projectLoader use to load projects
 * @param {AutofixRegistration[]} registrations
 * @return GoalExecutor
 */
export declare function executeAutofixes(projectLoader: ProjectLoader, registrations: AutofixRegistration[]): ExecuteGoalWithLog;
