import { Severity } from "@atomist/automation-client/operations/review/ReviewResult";
import { PushTest } from "../../../../listener/PushTest";
import { ReviewerRegistration } from "../ReviewerRegistration";
/**
 * Antipattern we'll look for. Can be defined as a regex or a string.
 */
export interface AntiPattern {
    name: string;
    antiPattern: RegExp | string;
    comment: string;
}
export interface PatternMatchReviewerOptions {
    /**
     * PushTest to narrow review applicability
     */
    pushTest?: PushTest;
    /**
     * Glob pattern for files to check
     */
    globPattern: string;
    category?: string;
    severity?: Severity;
}
/**
 * Return a ReviewerRegistration that objects to the given antipatterns and looks in the specified files
 * @param {string} name
 * @param opts targeting options
 * @param {AntiPattern} antiPatterns
 * @return {ReviewerRegistration}
 */
export declare function patternMatchReviewer(name: string, opts: PatternMatchReviewerOptions, ...antiPatterns: AntiPattern[]): ReviewerRegistration;
