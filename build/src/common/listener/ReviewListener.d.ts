import { ProjectReview } from "@atomist/automation-client/operations/review/ReviewResult";
import { PushReactionResponse } from "../delivery/code/PushReactionRegistration";
import { SdmListener } from "./Listener";
import { PushListenerInvocation } from "./PushListener";
/**
 * Invocation on a completed review.
 */
export interface ReviewListenerInvocation extends PushListenerInvocation {
    /**
     * Consolidated review
     */
    review: ProjectReview;
}
/**
 * Listener invoked when a review has been completed.
 * Listeners will be invoked even in the case of a clean review,
 * without errors or comments.
 */
export declare type ReviewListener = SdmListener<ReviewListenerInvocation, void | PushReactionResponse>;
