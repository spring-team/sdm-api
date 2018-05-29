import { HandlerContext } from "@atomist/automation-client";
import { ProjectReview } from "@atomist/automation-client/operations/review/ReviewResult";
import { LocalProject } from "@atomist/automation-client/project/local/LocalProject";
import { ReviewerRegistration } from "../ReviewerRegistration";
/**
 * Spawn Checkstyle Java process against the project directory.
 * Parse Checkstyle XML out and transform it into our ProjectReview structure.
 * An example of a common pattern for integrating third party static
 * analysis or security tools.
 * @param {string} checkstylePath the path to the CheckStyle jar on the local machine. (see README.md)
 */
export declare const checkstyleReviewer: (checkstylePath: string) => (p: LocalProject, ctx: HandlerContext) => Promise<ProjectReview | ProjectReview>;
export declare function checkstyleReviewerRegistration(considerOnlyChangedFiles: boolean): ReviewerRegistration;
