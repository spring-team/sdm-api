import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { SourceLocation } from "@atomist/automation-client/operations/common/SourceLocation";
import { ReviewListener } from "../../../../listener/ReviewListener";
import { PushReactionResponse } from "../../PushReactionRegistration";
/**
 * Strategy for deep linking to a source control system.
 */
export declare type DeepLink = (grr: RemoteRepoRef, sourceLocation: SourceLocation) => string;
export interface SlackReviewRoutingParams {
    pushReactionResponse?: PushReactionResponse;
    deepLink: DeepLink;
}
/**
 * Route reviews to Slack in linked channels
 */
export declare function slackReviewListener(opts?: Partial<SlackReviewRoutingParams>): ReviewListener;
