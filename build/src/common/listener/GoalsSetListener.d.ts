import { SdmGoal } from "../../ingesters/sdmGoalIngester";
import { Goals } from "../delivery/goals/Goals";
import { RepoListenerInvocation, SdmListener } from "./Listener";
/**
 * Invokes when goals have been set
 */
export interface GoalsSetListenerInvocation extends RepoListenerInvocation {
    /**
     * The goals that were set
     */
    goalSet: Goals | null;
    goalSetId: string;
}
export declare type GoalsSetListener = SdmListener<GoalsSetListenerInvocation>;
export interface GoalCompletionListenerInvocation extends RepoListenerInvocation {
    completedGoal: SdmGoal;
    allGoals: SdmGoal[];
}
export declare type GoalCompletionListener = SdmListener<GoalCompletionListenerInvocation>;
