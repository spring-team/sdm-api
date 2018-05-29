import { RepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { ProjectReview } from "@atomist/automation-client/operations/review/ReviewResult";
import { CheckstyleReport } from "./CheckstyleReport";
export declare function checkstyleReportToReview(repoId: RepoRef, cr: CheckstyleReport, baseDir: string): ProjectReview;
