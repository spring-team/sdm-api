import { ProjectReview } from "@atomist/automation-client/operations/review/ReviewResult";
import { PushReactionRegistration, SelectiveCodeActionOptions } from "../PushReactionRegistration";
export declare type ReviewerRegistrationOptions = SelectiveCodeActionOptions;
export interface ReviewerRegistration extends PushReactionRegistration<ProjectReview> {
    options?: ReviewerRegistrationOptions;
}
