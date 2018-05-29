import { Project } from "@atomist/automation-client/project/Project";
import { StatusForExecuteGoal } from "../../typings/types";
import { SdmListener } from "./Listener";
import { PushListenerInvocation } from "./PushListener";
/**
 * Invocation object used by most listeners that react to code changes.
 * Provides fuller information about the impact of the push.
 */
export interface PushImpactListenerInvocation extends PushListenerInvocation {
    /**
     * Files changed in this push. Undefined if unknown how many files have changed
     */
    filesChanged: string[] | undefined;
    /**
     * Head commit on push
     */
    commit: StatusForExecuteGoal.Commit;
    /**
     * Project of affected files. May be the same as project, if we can't tell
     * which files were affected.
     */
    impactedSubProject: Project;
}
export declare type PushImpactListener = SdmListener<PushImpactListenerInvocation>;
