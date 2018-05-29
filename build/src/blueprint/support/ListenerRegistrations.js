"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Listener management offering a fluent builder pattern for registrations.
 * This class is purely a registration store, and has no other behavior.
 */
class ListenerRegistrations {
    constructor() {
        this.buildListeners = [];
        this.userJoiningChannelListeners = [];
        this.tagListeners = [];
        this.newIssueListeners = [];
        this.updatedIssueListeners = [];
        this.closedIssueListeners = [];
        this.repoCreationListeners = [];
        this.repoOnboardingListeners = [];
        this.pullRequestListeners = [];
        this.newRepoWithCodeActions = [];
        this.channelLinkListeners = [];
        this.goalsSetListeners = [];
        this.reviewerRegistrations = [];
        this.reviewListeners = [];
        this.pushReactionRegistrations = [];
        this.autofixRegistrations = [];
        this.artifactListenerRegistrations = [];
        this.fingerprinterRegistrations = [];
        this.fingerprintListeners = [];
        this.fingerprintDifferenceListeners = [];
        this.deploymentListeners = [];
        this.verifiedDeploymentListeners = [];
        this.endpointVerificationListeners = [];
        this.goalCompletionListeners = [];
    }
    addNewIssueListeners(...e) {
        this.newIssueListeners.push(...e);
        return this;
    }
    addUpdatedIssueListeners(...e) {
        this.updatedIssueListeners.push(...e);
        return this;
    }
    /**
     * These are invoked when a goal reaches status "failure" or "success"
     * @param {GoalCompletionListener} e
     * @returns {this}
     */
    addGoalCompletionListeners(...e) {
        this.goalCompletionListeners.push(...e);
        return this;
    }
    addClosedIssueListeners(...e) {
        this.closedIssueListeners.push(...e);
        return this;
    }
    addTagListeners(...e) {
        this.tagListeners.push(...e);
        return this;
    }
    addChannelLinkListeners(...e) {
        this.channelLinkListeners.push(...e);
        return this;
    }
    addBuildListeners(...e) {
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
    addRepoCreationListeners(...rcls) {
        this.repoCreationListeners.push(...rcls);
        return this;
    }
    addRepoOnboardingListeners(...rols) {
        this.repoOnboardingListeners.push(...rols);
        return this;
    }
    addNewRepoWithCodeActions(...pls) {
        this.newRepoWithCodeActions.push(...pls);
        return this;
    }
    addPullRequestListeners(...pls) {
        this.pullRequestListeners.push(...pls);
        return this;
    }
    addGoalsSetListeners(...listeners) {
        this.goalsSetListeners.push(...listeners);
        return this;
    }
    addReviewerRegistrations(...reviewers) {
        this.reviewerRegistrations.push(...reviewers);
        return this;
    }
    /**
     * Add review listeners. Will be invoked during a ReviewGoal
     * @param {ReviewListener} listeners
     * @return {this}
     */
    addReviewListeners(...listeners) {
        this.reviewListeners.push(...listeners);
        return this;
    }
    /**
     * Add reactions to a push: That is, functions that run during execution of a
     * PushReaction goal.
     * @param {PushReactionRegistration} prrs
     * @return {this}
     */
    addPushReactions(...prrs) {
        this.pushReactionRegistrations.push(...prrs);
        return this;
    }
    addArtifactListeners(...alrs) {
        this.artifactListenerRegistrations.push(...alrs);
        return this;
    }
    /**
     * Editors automatically invoked on eligible commits.
     * Note: be sure that these editors check and don't cause
     * infinite recursion!!
     */
    addAutofixes(...ars) {
        this.autofixRegistrations.push(...ars);
        return this;
    }
    addFingerprinterRegistrations(...f) {
        this.fingerprinterRegistrations.push(...f);
        return this;
    }
    addFingerprintListeners(...l) {
        this.fingerprintListeners.push(...l);
        return this;
    }
    addFingerprintDifferenceListeners(...fh) {
        this.fingerprintDifferenceListeners.push(...fh);
        return this;
    }
    addDeploymentListeners(...l) {
        this.deploymentListeners.push(...l);
        return this;
    }
    addVerifiedDeploymentListeners(...l) {
        this.verifiedDeploymentListeners.push(...l);
        return this;
    }
    addEndpointVerificationListeners(...l) {
        this.endpointVerificationListeners.push(...l);
        return this;
    }
    addUserJoiningChannelListeners(...l) {
        this.userJoiningChannelListeners.push(...l);
        return this;
    }
}
exports.ListenerRegistrations = ListenerRegistrations;
//# sourceMappingURL=ListenerRegistrations.js.map