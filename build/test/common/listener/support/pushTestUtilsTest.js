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
const assert = require("power-assert");
const PushTest_1 = require("../../../../src/common/listener/PushTest");
const pushTestUtils_1 = require("../../../../src/common/listener/support/pushtest/pushTestUtils");
exports.TruePushTest = PushTest_1.pushTest("true", () => __awaiter(this, void 0, void 0, function* () { return true; }));
exports.FalsePushTest = PushTest_1.pushTest("false", () => __awaiter(this, void 0, void 0, function* () { return false; }));
exports.TrueProjectPredicate = () => __awaiter(this, void 0, void 0, function* () { return true; });
exports.FalseProjectPredicate = () => __awaiter(this, void 0, void 0, function* () { return false; });
const id = new GitHubRepoRef_1.GitHubRepoRef("atomist", "github-sdm");
describe("pushTestUtilsTest", () => {
    describe("not", () => {
        it("should handle one true", () => __awaiter(this, void 0, void 0, function* () {
            const r = yield pushTestUtils_1.not(exports.TruePushTest).mapping({ id });
            assert(!r);
        }));
        it("should handle one false", () => __awaiter(this, void 0, void 0, function* () {
            const r = yield pushTestUtils_1.not(exports.FalsePushTest).mapping({ id });
            assert(r);
        }));
    });
    describe("allPredicatesSatisfied", () => {
        describe("with PushTest", () => {
            it("should handle one true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.allSatisfied(exports.TruePushTest).mapping({ id });
                assert(r);
            }));
            it("should handle two true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.allSatisfied(exports.TruePushTest, exports.TruePushTest).mapping({ id });
                assert(r);
            }));
            it("should handle one true and one false", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.allSatisfied(exports.TruePushTest, exports.FalsePushTest).mapping({ id });
                assert(!r);
            }));
        });
        describe("with ProjectPredicate", () => {
            it("should handle one true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.allSatisfied(exports.TrueProjectPredicate).mapping({ id });
                assert(r);
            }));
            it("should handle two true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.allSatisfied(exports.TrueProjectPredicate, exports.TrueProjectPredicate).mapping({ id });
                assert(r);
            }));
            it("should handle one true and one false", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.allSatisfied(exports.TrueProjectPredicate, exports.FalseProjectPredicate).mapping({ id });
                assert(!r);
            }));
        });
    });
    describe("anyPredicateSatisfied", () => {
        describe("with PushTest", () => {
            it("should handle one true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.TruePushTest).mapping({ id });
                assert(r);
            }));
            it("should handle two true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.TruePushTest, exports.TruePushTest).mapping({ id });
                assert(r);
            }));
            it("should handle one true and one false", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.TruePushTest, exports.FalsePushTest).mapping({ id });
                assert(r);
            }));
            it("should handle two false", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.FalsePushTest, exports.FalsePushTest).mapping({ id });
                assert(!r);
            }));
        });
        describe("with ProjectPredicate", () => {
            it("should handle one true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.TrueProjectPredicate).mapping({ id });
                assert(r);
            }));
            it("should handle two true", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.TrueProjectPredicate, exports.TrueProjectPredicate).mapping({ id });
                assert(r);
            }));
            it("should handle one true and one false", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.TrueProjectPredicate, exports.FalseProjectPredicate).mapping({ id });
                assert(r);
            }));
            it("should handle two false", () => __awaiter(this, void 0, void 0, function* () {
                const r = yield pushTestUtils_1.anySatisfied(exports.FalseProjectPredicate, exports.FalseProjectPredicate).mapping({ id });
                assert(!r);
            }));
        });
    });
});
//# sourceMappingURL=pushTestUtilsTest.js.map