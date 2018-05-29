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
const assert = require("power-assert");
const RepoId_1 = require("@atomist/automation-client/operations/common/RepoId");
const checkstyleReportExtractor_1 = require("../../../../../../src/common/delivery/code/review/checkstyle/checkstyleReportExtractor");
const checkStyleReportToReview_1 = require("../../../../../../src/common/delivery/code/review/checkstyle/checkStyleReportToReview");
const checkstyleReportExtractorTest_1 = require("./checkstyleReportExtractorTest");
describe("checkstyleReportToReview", () => {
    it("should parse valid output", () => __awaiter(this, void 0, void 0, function* () {
        const report = yield checkstyleReportExtractor_1.extract(checkstyleReportExtractorTest_1.xml2valid1);
        const review = checkStyleReportToReview_1.checkstyleReportToReview(new RepoId_1.SimpleRepoId("a", "b"), report, "/Users/rodjohnson/tools/checkstyle-8.8/");
        assert(!!review);
        assert.equal(review.comments.length, 4);
        assert.equal(review.comments[0].sourceLocation.path, "Test.java");
        assert.equal(review.comments[0].severity, "error");
        assert.equal(review.comments[0].sourceLocation.lineFrom1, 0);
        assert.equal(review.comments[2].sourceLocation.path, "src/main/java/thing/Test2.java");
    }));
});
//# sourceMappingURL=checkstyleReportToReviewTest.js.map