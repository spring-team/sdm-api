import { PushImpactListenerInvocation } from "../../listener/PushImpactListener";
import { PushRegistration } from "../../listener/PushRegistration";
/**
 * A code action response that affects delivery:
 * failing the current goal or requiring approval,
 * causing dependent goals to fail or wait.
 */
export declare enum PushReactionResponse {
    /**
     * Fail execution of the present goalset. Any dependent goals will stop.
     * Will not stop execution of non-dependent goals.
     */
    failGoals = "fail",
    /**
     * Require approval to proceed to dependent goals in the present goalset.
     */
    requireApprovalToProceed = "requireApproval",
}
/**
 * Optional PushReactionResponse included in a return value.
 */
export interface HasCodeActionResponse {
    /**
     * Response affecting further execution of the current goalset.
     */
    response?: PushReactionResponse;
}
/**
 * Reaction on a push, with the code available.
 * Can optionally return a response that
 * determines whether to ask for approval or terminate current delivery flow.
 */
export declare type PushReaction<R> = (i: PushImpactListenerInvocation) => Promise<R & HasCodeActionResponse>;
/**
 * Used to register actions on a push that can potentially
 * influence downstream goals. Will be invoked if a PushReactionGoal has
 * been set for the given push.
 * Use ReviewerRegistration if you want to return a structured review.
 */
export declare type PushReactionRegistration<R = any> = PushRegistration<PushReaction<R>>;
/**
 * Something we can register as a push reaction
 */
export declare type PushReactionRegisterable<R = any> = PushReactionRegistration | PushReaction<R>;
/**
 * Convert an action function to a PushReaction if necessary
 * @param {PushReactionRegisterable<any>} prr
 * @return {PushReactionRegistration}
 */
export declare function toPushReactionRegistration(prr: PushReactionRegisterable<any>): PushReactionRegistration;
/**
 * Base options object for registrations that process selective files
 */
export interface SelectiveCodeActionOptions {
    /**
     * Run only on affected files?
     */
    considerOnlyChangedFiles: boolean;
}
/**
 * Compute the relevant actions for this push. Some may be filtered out
 * by their push tests.
 */
export declare function relevantCodeActions<R>(registrations: Array<PushReactionRegistration<R>>, pli: PushImpactListenerInvocation): Promise<Array<PushReactionRegistration<R>>>;
