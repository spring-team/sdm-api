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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const automation_client_1 = require("@atomist/automation-client");
const createPushImpactListenerInvocation_1 = require("../createPushImpactListenerInvocation");
const PushReactionRegistration_1 = require("../PushReactionRegistration");
const ReviewerError_1 = require("./ReviewerError");
/**
 * Execute reviews and route or react to results using review listeners
 * @param {ProjectLoader} projectLoader
 * @param {ReviewerRegistration[]} reviewerRegistrations
 * @param {ReviewListener[]} reviewListeners
 * @return {ExecuteGoalWithLog}
 */
function executeReview(projectLoader, reviewerRegistrations, reviewListeners) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { credentials, id, addressChannels } = rwlc;
        try {
            if (reviewerRegistrations.length > 0) {
                automation_client_1.logger.info("Planning review of %j with %d reviewers", id, reviewerRegistrations.length);
                return projectLoader.doWithProject({ credentials, id, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
                    const cri = yield createPushImpactListenerInvocation_1.createPushImpactListenerInvocation(rwlc, project);
                    const relevantReviewers = yield PushReactionRegistration_1.relevantCodeActions(reviewerRegistrations, cri);
                    automation_client_1.logger.info("Executing review of %j with %d relevant reviewers: [%s] of [%s]", id, relevantReviewers.length, relevantReviewers.map(a => a.name).join(), reviewerRegistrations.map(a => a.name).join());
                    const reviewsAndErrors = yield Promise.all(relevantReviewers
                        .map(reviewer => {
                        return reviewer.action(cri)
                            .then(rvw => ({ review: rvw }), error => ({ error }));
                    }));
                    const reviews = reviewsAndErrors.filter(r => !!r.review)
                        .map(r => r.review);
                    const reviewerErrors = reviewsAndErrors.filter(e => !!e.error)
                        .map(e => e.error);
                    const review = consolidate(reviews);
                    automation_client_1.logger.info("Consolidated review of %j has %s comments", id, review.comments.length);
                    const rli = Object.assign({}, cri, { review });
                    sendErrorsToSlack(reviewerErrors, addressChannels);
                    const reviewResponses = yield Promise.all(reviewListeners.map(l => l(rli)));
                    const result = {
                        code: reviewResponses.some(rr => !!rr && rr === PushReactionRegistration_1.PushReactionResponse.failGoals) ? 1 : 0,
                        requireApproval: reviewResponses.some(rr => !!rr && rr === PushReactionRegistration_1.PushReactionResponse.requireApprovalToProceed),
                    };
                    automation_client_1.logger.info("Review responses are %j, result=%j", reviewResponses, result);
                    return result;
                }));
            }
            else {
                // No reviewers
                return { code: 0, requireApproval: false };
            }
        }
        catch (err) {
            automation_client_1.logger.error("Error executing review of %j with %d reviewers: $s", id, reviewerRegistrations.length, err.message);
            return automation_client_1.failure(err);
        }
    });
}
exports.executeReview = executeReview;
function consolidate(reviews) {
    return {
        repoId: reviews[0].repoId,
        comments: _.flatten(reviews.map(review => review.comments)),
    };
}
function sendErrorsToSlack(errors, addressChannels) {
    errors.forEach((e) => __awaiter(this, void 0, void 0, function* () {
        yield addressChannels(ReviewerError_1.formatReviewerError(e));
    }));
}
//# sourceMappingURL=executeReview.js.map