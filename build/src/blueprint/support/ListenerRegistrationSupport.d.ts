import { AutofixRegistration } from "../../common/delivery/code/autofix/AutofixRegistration";
import { FingerprinterRegistration } from "../../common/delivery/code/fingerprint/FingerprinterRegistration";
import { PushReactionRegisterable } from "../../common/delivery/code/PushReactionRegistration";
import { ReviewerRegistration } from "../../common/delivery/code/review/ReviewerRegistration";
import { ArtifactListenerRegisterable } from "../../common/listener/ArtifactListener";
import { BuildListener } from "../../common/listener/BuildListener";
import { ChannelLinkListener } from "../../common/listener/ChannelLinkListenerInvocation";
import { ClosedIssueListener } from "../../common/listener/ClosedIssueListener";
import { DeploymentListener } from "../../common/listener/DeploymentListener";
import { FingerprintDifferenceListener } from "../../common/listener/FingerprintDifferenceListener";
import { FingerprintListener } from "../../common/listener/FingerprintListener";
import { GoalCompletionListener, GoalsSetListener } from "../../common/listener/GoalsSetListener";
import { NewIssueListener } from "../../common/listener/NewIssueListener";
import { ProjectListener } from "../../common/listener/ProjectListener";
import { PullRequestListener } from "../../common/listener/PullRequestListener";
import { PushListener } from "../../common/listener/PushListener";
import { RepoCreationListener } from "../../common/listener/RepoCreationListener";
import { ReviewListener } from "../../common/listener/ReviewListener";
import { TagListener } from "../../common/listener/TagListener";
import { UpdatedIssueListener } from "../../common/listener/UpdatedIssueListener";
import { UserJoiningChannelListener } from "../../common/listener/UserJoiningChannelListener";
import { VerifiedDeploymentListener } from "../../common/listener/VerifiedDeploymentListener";
import { EndpointVerificationListener } from "../../handlers/events/delivery/verify/executeVerifyEndpoint";
import { ListenerRegistration } from "../ListenerRegistration";
/**
 * Listener management offering a fluent builder pattern for registrations.
 * This class is purely a registration store, and has no other behavior.
 */
export declare class ListenerRegistrationSupport implements ListenerRegistration {
    protected readonly buildListeners: BuildListener[];
    protected readonly userJoiningChannelListeners: UserJoiningChannelListener[];
    protected readonly tagListeners: TagListener[];
    protected readonly newIssueListeners: NewIssueListener[];
    protected readonly updatedIssueListeners: UpdatedIssueListener[];
    protected readonly closedIssueListeners: ClosedIssueListener[];
    protected readonly repoCreationListeners: RepoCreationListener[];
    protected readonly repoOnboardingListeners: ProjectListener[];
    protected readonly pullRequestListeners: PullRequestListener[];
    protected readonly newRepoWithCodeActions: PushListener[];
    protected readonly channelLinkListeners: ChannelLinkListener[];
    protected readonly goalsSetListeners: GoalsSetListener[];
    protected readonly reviewerRegistrations: ReviewerRegistration[];
    protected readonly reviewListeners: ReviewListener[];
    protected readonly pushReactionRegistrations: PushReactionRegisterable[];
    protected readonly autofixRegistrations: AutofixRegistration[];
    protected readonly artifactListenerRegistrations: ArtifactListenerRegisterable[];
    protected readonly fingerprinterRegistrations: FingerprinterRegistration[];
    protected readonly fingerprintListeners: FingerprintListener[];
    protected readonly fingerprintDifferenceListeners: FingerprintDifferenceListener[];
    protected readonly deploymentListeners?: DeploymentListener[];
    protected readonly verifiedDeploymentListeners: VerifiedDeploymentListener[];
    protected readonly endpointVerificationListeners: EndpointVerificationListener[];
    protected readonly goalCompletionListeners: GoalCompletionListener[];
    addNewIssueListeners(...e: NewIssueListener[]): this;
    addUpdatedIssueListeners(...e: UpdatedIssueListener[]): this;
    /**
     * These are invoked when a goal reaches status "failure" or "success"
     * @param {GoalCompletionListener} e
     * @returns {this}
     */
    addGoalCompletionListeners(...e: GoalCompletionListener[]): this;
    addClosedIssueListeners(...e: ClosedIssueListener[]): this;
    addTagListeners(...e: TagListener[]): this;
    addChannelLinkListeners(...e: ChannelLinkListener[]): this;
    addBuildListeners(...e: BuildListener[]): this;
    /**
     * You probably mean to use addNewRepoWithCodeActions!
     * This responds to a repo creation, but there may be no
     * code in it.
     * @param {RepoCreationListener} rcls
     * @return {this}
     */
    addRepoCreationListeners(...rcls: RepoCreationListener[]): this;
    addRepoOnboardingListeners(...rols: ProjectListener[]): this;
    addNewRepoWithCodeActions(...pls: PushListener[]): this;
    addPullRequestListeners(...pls: PullRequestListener[]): this;
    addGoalsSetListeners(...listeners: GoalsSetListener[]): this;
    addReviewerRegistrations(...reviewers: ReviewerRegistration[]): this;
    /**
     * Add review listeners. Will be invoked during a ReviewGoal
     * @param {ReviewListener} listeners
     * @return {this}
     */
    addReviewListeners(...listeners: ReviewListener[]): this;
    /**
     * Add reactions to a push: That is, functions that run during execution of a
     * PushReaction goal.
     * @param {PushReactionRegistration} prrs
     * @return {this}
     */
    addPushReactions(...prrs: PushReactionRegisterable[]): this;
    addArtifactListeners(...alrs: ArtifactListenerRegisterable[]): this;
    /**
     * Editors automatically invoked on eligible commits.
     * Note: be sure that these editors check and don't cause
     * infinite recursion!!
     */
    addAutofixes(...ars: AutofixRegistration[]): this;
    addFingerprinterRegistrations(...f: FingerprinterRegistration[]): this;
    addFingerprintListeners(...l: FingerprintListener[]): this;
    addFingerprintDifferenceListeners(...fh: FingerprintDifferenceListener[]): this;
    addDeploymentListeners(...l: DeploymentListener[]): this;
    addVerifiedDeploymentListeners(...l: VerifiedDeploymentListener[]): this;
    addEndpointVerificationListeners(...l: EndpointVerificationListener[]): this;
    addUserJoiningChannelListeners(...l: UserJoiningChannelListener[]): this;
}
