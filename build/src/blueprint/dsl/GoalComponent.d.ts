import { Goal } from "../../common/delivery/goals/Goal";
import { Goals } from "../../common/delivery/goals/Goals";
/**
 * Type used in constructing goals
 */
export declare type GoalComponent = Goal | Goal[] | Goals;
export declare function toGoals(gc: GoalComponent): Goals;
