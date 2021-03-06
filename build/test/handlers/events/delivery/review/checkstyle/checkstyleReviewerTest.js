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
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const GitCommandGitProject_1 = require("@atomist/automation-client/project/git/GitCommandGitProject");
const path = require("path");
const assert = require("power-assert");
const checkstyleReviewer_1 = require("../../../../../../src/common/delivery/code/review/checkstyle/checkstyleReviewer");
const checkstylePath = path.join(__dirname, "../../../../../checkstyle-8.8-all.jar");
describe("checkstyleReviewer", () => {
    it("should succeed in reviewing repo", () => __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned({ token: process.env.GITHUB_TOKEN }, new GitHubRepoRef_1.GitHubRepoRef("atomist-seeds", "spring-rest-seed"));
        const review = yield checkstyleReviewer_1.checkstyleReviewer(checkstylePath)(p, null);
        assert(!!review);
        assert(review.comments.length > 1);
    })).timeout(10000);
    it("should handle invalid checkstyle path", () => __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned({ token: process.env.GITHUB_TOKEN }, new GitHubRepoRef_1.GitHubRepoRef("atomist-seeds", "spring-rest-seed"));
        try {
            yield checkstyleReviewer_1.checkstyleReviewer("invalid checkstyle path")(p, null);
            assert("Checkstyle should have failed with invalid path");
        }
        catch (_a) {
            // Ok
        }
    })).timeout(10000);
});
//# sourceMappingURL=checkstyleReviewerTest.js.map