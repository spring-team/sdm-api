/**
 * Interface that can be implemented by editor parameters that can suggest EditMode to present them
 * to users.
 */
export interface EditModeSuggestion {
    desiredBranchName: string;
    desiredPullRequestTitle?: string;
    desiredCommitMessage?: string;
}
