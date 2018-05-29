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
const ReviewResult_1 = require("@atomist/automation-client/operations/review/ReviewResult");
const projectUtils_1 = require("@atomist/automation-client/project/util/projectUtils");
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const fakeRunWithLogContext_1 = require("../../../../../src/util/test/fakeRunWithLogContext");
const pushTestUtilsTest_1 = require("../../../listener/support/pushTestUtilsTest");
const InMemoryFile_1 = require("@atomist/automation-client/project/mem/InMemoryFile");
const assert = require("power-assert");
const PushReactionRegistration_1 = require("../../../../../src/common/delivery/code/PushReactionRegistration");
const executeReview_1 = require("../../../../../src/common/delivery/code/review/executeReview");
const SingleProjectLoader_1 = require("../../../../../src/util/test/SingleProjectLoader");
const HatesTheWorld = {
    name: "hatred",
    pushTest: pushTestUtilsTest_1.TruePushTest,
    action: (cri) => __awaiter(this, void 0, void 0, function* () {
        return ({
            repoId: cri.project.id,
            comments: yield projectUtils_1.saveFromFiles(cri.project, "**/*", f => new ReviewResult_1.DefaultReviewComment("info", "hater", `Found a file at \`${f.path}\`: We hate all files`, {
                path: f.path,
                lineFrom1: 1,
                offset: -1,
            })),
        });
    }),
    options: { considerOnlyChangedFiles: false },
};
const JustTheOne = {
    name: "justOne",
    pushTest: pushTestUtilsTest_1.TruePushTest,
    action: (cri) => __awaiter(this, void 0, void 0, function* () {
        return ({
            repoId: cri.project.id,
            comments: [
                new ReviewResult_1.DefaultReviewComment("info", "justOne", `One thing`, {
                    path: "whatever",
                    lineFrom1: 1,
                    offset: -1,
                })
            ],
        });
    }),
    options: { considerOnlyChangedFiles: false },
};
function loggingReviewListenerWithApproval(saveTo) {
    return (re) => __awaiter(this, void 0, void 0, function* () {
        saveTo.push(re);
        if (re.review.comments.length > 0) {
            return PushReactionRegistration_1.PushReactionResponse.requireApprovalToProceed;
        }
    });
}
function loggingReviewListenerWithoutApproval(saveTo) {
    return (re) => __awaiter(this, void 0, void 0, function* () {
        saveTo.push(re);
    });
}
describe("executeReview", () => {
    it("should be clean on empty", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("a", "b");
        const p = InMemoryProject_1.InMemoryProject.from(id);
        const reviewEvents = [];
        const l = loggingReviewListenerWithApproval(reviewEvents);
        const ge = executeReview_1.executeReview(new SingleProjectLoader_1.SingleProjectLoader(p), [HatesTheWorld], [l]);
        const r = yield ge(fakeRunWithLogContext_1.fakeRunWithLogContext(id));
        assert.equal(r.code, 0);
        assert(!r.requireApproval);
        assert.equal(reviewEvents.length, 1);
        assert.equal(reviewEvents[0].review.comments.length, 0);
    }));
    it("should hate anything it finds", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("a", "b");
        const p = InMemoryProject_1.InMemoryProject.from(id, new InMemoryFile_1.InMemoryFile("thing", "1"));
        const reviewEvents = [];
        const l = loggingReviewListenerWithApproval(reviewEvents);
        const ge = executeReview_1.executeReview(new SingleProjectLoader_1.SingleProjectLoader(p), [HatesTheWorld], [l]);
        const rwlc = fakeRunWithLogContext_1.fakeRunWithLogContext(id);
        const r = yield ge(rwlc);
        assert.equal(reviewEvents.length, 1);
        assert.equal(reviewEvents[0].review.comments.length, 1);
        assert.equal(reviewEvents[0].addressChannels, rwlc.addressChannels);
        assert.equal(r.code, 0);
        assert(r.requireApproval);
    }));
    it("should hate anything it finds, without requiring approval", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("a", "b");
        const p = InMemoryProject_1.InMemoryProject.from(id, new InMemoryFile_1.InMemoryFile("thing", "1"));
        const reviewEvents = [];
        const l = loggingReviewListenerWithoutApproval(reviewEvents);
        const ge = executeReview_1.executeReview(new SingleProjectLoader_1.SingleProjectLoader(p), [HatesTheWorld], [l]);
        const rwlc = fakeRunWithLogContext_1.fakeRunWithLogContext(id);
        const r = yield ge(rwlc);
        assert.equal(reviewEvents.length, 1);
        assert.equal(reviewEvents[0].review.comments.length, 1);
        assert.equal(reviewEvents[0].addressChannels, rwlc.addressChannels);
        assert.equal(r.code, 0);
        assert(!r.requireApproval);
    }));
    it("consolidate reviewers", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("a", "b");
        const p = InMemoryProject_1.InMemoryProject.from(id, new InMemoryFile_1.InMemoryFile("thing", "1"));
        const reviewEvents = [];
        const l = loggingReviewListenerWithApproval(reviewEvents);
        const ge = executeReview_1.executeReview(new SingleProjectLoader_1.SingleProjectLoader(p), [HatesTheWorld, JustTheOne], [l]);
        const rwlc = fakeRunWithLogContext_1.fakeRunWithLogContext(id);
        const r = yield ge(rwlc);
        assert.equal(reviewEvents.length, 1);
        assert.equal(reviewEvents[0].review.comments.length, 2);
        assert.equal(reviewEvents[0].addressChannels, rwlc.addressChannels);
        assert.equal(r.code, 0);
    }));
});
//# sourceMappingURL=executeReviewTest.js.map