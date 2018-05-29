import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { PushImpactListenerInvocation } from "../../listener/PushImpactListener";
import { RunWithLogContext } from "../goals/support/reportGoalError";
/**
 * Create a PushImpactListenerInvocation from the given context.
 * Includes both the complete project and the changed files.
 * @param {RunWithLogContext} rwlc
 * @param {GitProject} project
 * @return {Promise<PushImpactListenerInvocation>}
 */
export declare function createPushImpactListenerInvocation(rwlc: RunWithLogContext, project: GitProject): Promise<PushImpactListenerInvocation>;
