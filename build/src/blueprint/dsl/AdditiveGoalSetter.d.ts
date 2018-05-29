import { Goal } from "../../common/delivery/goals/Goal";
import { Goals } from "../../common/delivery/goals/Goals";
import { Mapping } from "../../common/listener/Mapping";
import { PushListenerInvocation } from "../../common/listener/PushListener";
export declare type GoalContribution<F> = Mapping<F, Goal | Goal[] | Goals>;
/**
 * Contribute goals based on a series of contribution rules.
 * Duplicates will be removed.
 * @param contributor first contributor
 * @param {GoalContribution<F>} contributors
 * @return a mapping to goals
 */
export declare function goalContributors<F = PushListenerInvocation>(contributor: GoalContribution<F>, ...contributors: Array<GoalContribution<F>>): Mapping<F, Goals>;
