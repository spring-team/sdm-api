import * as slack from "@atomist/slack-messages/SlackMessages";
export declare class ReviewerError extends Error {
    reviewerName: string;
    stderr: string;
    constructor(reviewerName: string, msg: string, stderr: string);
}
export declare function formatReviewerError(err: ReviewerError): slack.SlackMessage;
