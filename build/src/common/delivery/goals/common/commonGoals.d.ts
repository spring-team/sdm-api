import { Goal, GoalWithPrecondition } from "../Goal";
import { Goals } from "../Goals";
export declare const VersionGoal: Goal;
export declare const DockerBuildGoal: GoalWithPrecondition;
export declare const TagGoal: GoalWithPrecondition;
export declare const StagingUndeploymentGoal: Goal;
export declare const LocalUndeploymentGoal: Goal;
export declare const LocalEndpointGoal: GoalWithPrecondition;
/**
 * Special Goals object to be returned if changes are immaterial.
 * The identity of this object is important.
 * @type {Goals}
 */
export declare const NoGoals: Goals;
