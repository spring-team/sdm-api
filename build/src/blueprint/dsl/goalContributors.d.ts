import { Goal } from "../../common/delivery/goals/Goal";
import { Goals } from "../../common/delivery/goals/Goals";
import { Mapping } from "../../common/listener/Mapping";
import { PushListenerInvocation } from "../../common/listener/PushListener";
export declare type GoalContributors<F> = Mapping<F, Goal | Goal[] | Goals>;
/**
 * Contribute goals based on a series of contribution rules.
 * Duplicates will be removed.
 * @param contributor first contributor
 * @param {GoalContributors<F>} contributors
 * @return a mapping to goals
 */
export declare function goalContributors<F = PushListenerInvocation>(contributor: GoalContributors<F>, ...contributors: Array<GoalContributors<F>>): Mapping<F, Goals>;
