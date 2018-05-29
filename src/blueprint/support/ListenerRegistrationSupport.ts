/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
export class ListenerRegistrationSupport implements ListenerRegistration {

    protected readonly buildListeners: BuildListener[] = [];

    protected readonly userJoiningChannelListeners: UserJoiningChannelListener[] = [];

    protected readonly tagListeners: TagListener[] = [];

    protected readonly newIssueListeners: NewIssueListener[] = [];

    protected readonly updatedIssueListeners: UpdatedIssueListener[] = [];

    protected readonly closedIssueListeners: ClosedIssueListener[] = [];

    protected readonly repoCreationListeners: RepoCreationListener[] = [];

    protected readonly repoOnboardingListeners: ProjectListener[] = [];

    protected readonly pullRequestListeners: PullRequestListener[] = [];

    protected readonly newRepoWithCodeActions: PushListener[] = [];

    protected readonly channelLinkListeners: ChannelLinkListener[] = [];

    protected readonly goalsSetListeners: GoalsSetListener[] = [];

    protected readonly reviewerRegistrations: ReviewerRegistration[] = [];

    protected readonly reviewListeners: ReviewListener[] = [];

    protected readonly pushReactionRegistrations: PushReactionRegisterable[] = [];

    protected readonly autofixRegistrations: AutofixRegistration[] = [];

    protected readonly artifactListenerRegistrations: ArtifactListenerRegisterable[] = [];

    protected readonly fingerprinterRegistrations: FingerprinterRegistration[] = [];

    protected readonly fingerprintListeners: FingerprintListener[] = [];

    protected readonly fingerprintDifferenceListeners: FingerprintDifferenceListener[] = [];

    protected readonly deploymentListeners?: DeploymentListener[] = [];

    protected readonly verifiedDeploymentListeners: VerifiedDeploymentListener[] = [];

    protected readonly endpointVerificationListeners: EndpointVerificationListener[] = [];

    protected readonly goalCompletionListeners: GoalCompletionListener[] = [];

    public addNewIssueListeners(...e: NewIssueListener[]): this {
        this.newIssueListeners.push(...e);
        return this;
    }

    public addUpdatedIssueListeners(...e: UpdatedIssueListener[]): this {
        this.updatedIssueListeners.push(...e);
        return this;
    }

    /**
     * These are invoked when a goal reaches status "failure" or "success"
     * @param {GoalCompletionListener} e
     * @returns {this}
     */
    public addGoalCompletionListeners(...e: GoalCompletionListener[]): this {
        this.goalCompletionListeners.push(...e);
        return this;
    }

    public addClosedIssueListeners(...e: ClosedIssueListener[]): this {
        this.closedIssueListeners.push(...e);
        return this;
    }

    public addTagListeners(...e: TagListener[]): this {
        this.tagListeners.push(...e);
        return this;
    }

    public addChannelLinkListeners(...e: ChannelLinkListener[]): this {
        this.channelLinkListeners.push(...e);
        return this;
    }

    public addBuildListeners(...e: BuildListener[]): this {
        this.buildListeners.push(...e);
        return this;
    }

    /**
     * You probably mean to use addNewRepoWithCodeActions!
     * This responds to a repo creation, but there may be no
     * code in it.
     * @param {RepoCreationListener} rcls
     * @return {this}
     */
    public addRepoCreationListeners(...rcls: RepoCreationListener[]): this {
        this.repoCreationListeners.push(...rcls);
        return this;
    }

    public addRepoOnboardingListeners(...rols: ProjectListener[]): this {
        this.repoOnboardingListeners.push(...rols);
        return this;
    }

    public addNewRepoWithCodeActions(...pls: PushListener[]): this {
        this.newRepoWithCodeActions.push(...pls);
        return this;
    }

    public addPullRequestListeners(...pls: PullRequestListener[]): this {
        this.pullRequestListeners.push(...pls);
        return this;
    }

    public addGoalsSetListeners(...listeners: GoalsSetListener[]): this {
        this.goalsSetListeners.push(...listeners);
        return this;
    }

    public addReviewerRegistrations(...reviewers: ReviewerRegistration[]): this {
        this.reviewerRegistrations.push(...reviewers);
        return this;
    }

    /**
     * Add review listeners. Will be invoked during a ReviewGoal
     * @param {ReviewListener} listeners
     * @return {this}
     */
    public addReviewListeners(...listeners: ReviewListener[]): this {
        this.reviewListeners.push(...listeners);
        return this;
    }

    /**
     * Add reactions to a push: That is, functions that run during execution of a
     * PushReaction goal.
     * @param {PushReactionRegistration} prrs
     * @return {this}
     */
    public addPushReactions(...prrs: PushReactionRegisterable[]): this {
        this.pushReactionRegistrations.push(...prrs);
        return this;
    }

    public addArtifactListeners(...alrs: ArtifactListenerRegisterable[]): this {
        this.artifactListenerRegistrations.push(...alrs);
        return this;
    }

    /**
     * Editors automatically invoked on eligible commits.
     * Note: be sure that these editors check and don't cause
     * infinite recursion!!
     */
    public addAutofixes(...ars: AutofixRegistration[]): this {
        this.autofixRegistrations.push(...ars);
        return this;
    }

    public addFingerprinterRegistrations(...f: FingerprinterRegistration[]): this {
        this.fingerprinterRegistrations.push(...f);
        return this;
    }

    public addFingerprintListeners(...l: FingerprintListener[]): this {
        this.fingerprintListeners.push(...l);
        return this;
    }

    public addFingerprintDifferenceListeners(...fh: FingerprintDifferenceListener[]): this {
        this.fingerprintDifferenceListeners.push(...fh);
        return this;
    }

    public addDeploymentListeners(...l: DeploymentListener[]): this {
        this.deploymentListeners.push(...l);
        return this;
    }

    public addVerifiedDeploymentListeners(...l: VerifiedDeploymentListener[]): this {
        this.verifiedDeploymentListeners.push(...l);
        return this;
    }

    public addEndpointVerificationListeners(...l: EndpointVerificationListener[]): this {
        this.endpointVerificationListeners.push(...l);
        return this;
    }

    public addUserJoiningChannelListeners(...l: UserJoiningChannelListener[]): this {
        this.userJoiningChannelListeners.push(...l);
        return this;
    }

}
