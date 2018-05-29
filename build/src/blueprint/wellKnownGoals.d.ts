import { Goal, GoalWithPrecondition } from "../common/delivery/goals/Goal";
/**
 * Goals referenced in TheSoftwareDeliveryMachine
 */
export declare const NoGoal: Goal;
/**
 * Goal that performs fingerprinting. Typically invoked
 * early in a delivery flow.
 * @type {Goal}
 */
export declare const FingerprintGoal: Goal;
/**
 * Goal that performs autofixes: For example, linting
 * and adding license headers.
 * @type {Goal}
 */
export declare const AutofixGoal: Goal;
/**
 * Goal to run code reviews
 * @type {Goal}
 */
export declare const ReviewGoal: Goal;
/**
 * Goal that runs PushReactionRegistrations
 * @type {Goal}
 */
export declare const PushReactionGoal: Goal;
/**
 * Just build, without any checks
 * @type {Goal}
 */
export declare const JustBuildGoal: Goal;
export declare const BuildGoal: GoalWithPrecondition;
export declare const ArtifactGoal: GoalWithPrecondition;
export declare const LocalDeploymentGoal: Goal;
export declare const StagingDeploymentGoal: GoalWithPrecondition;
export declare const StagingEndpointGoal: GoalWithPrecondition;
export declare const StagingVerifiedGoal: GoalWithPrecondition;
export declare const ProductionDeploymentGoal: GoalWithPrecondition;
export declare const ProductionEndpointGoal: GoalWithPrecondition;
export declare const ProductionUndeploymentGoal: Goal;
export declare const DeleteAfterUndeploysGoal: GoalWithPrecondition;
export declare const DeleteRepositoryGoal: Goal;
