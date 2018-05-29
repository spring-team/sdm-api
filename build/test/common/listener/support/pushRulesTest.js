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
const PushRules_1 = require("../../../../src/common/listener/support/PushRules");
const pushTestUtilsTest_1 = require("./pushTestUtilsTest");
exports.UndefinedPushTest = PushTest_1.pushTest("true", () => __awaiter(this, void 0, void 0, function* () { return undefined; }));
exports.NullPushTest = PushTest_1.pushTest("true", () => __awaiter(this, void 0, void 0, function* () { return null; }));
describe("PushRules", () => {
    it("should be undefined none", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t1", []);
        assert.equal(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }), undefined);
    }));
    it("should match true", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t2", [pushTestUtilsTest_1.TruePushTest]);
        assert(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }));
    }));
    it("should be undefined on false", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t3", [pushTestUtilsTest_1.FalsePushTest]);
        assert.equal(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }), undefined);
    }));
    it("should not match undefined", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t4", [exports.UndefinedPushTest]);
        assert.equal(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }), undefined);
    }));
    it("should match undefined and true", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t5", [exports.UndefinedPushTest, pushTestUtilsTest_1.TruePushTest]);
        assert(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }));
    }));
    it("should return undefined on null", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t6", [exports.NullPushTest]);
        assert.equal(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }), undefined);
    }));
    it("should return undefined on null and true", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t7", [exports.NullPushTest, pushTestUtilsTest_1.TruePushTest]);
        assert.equal(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }), undefined);
    }));
    it("should return defined on true and null", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t8", [pushTestUtilsTest_1.TruePushTest, exports.NullPushTest]);
        assert(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }));
    }));
    it("should return undefined on false and null and true", () => __awaiter(this, void 0, void 0, function* () {
        const pr = new PushRules_1.PushRules("t9", [pushTestUtilsTest_1.FalsePushTest, exports.NullPushTest, pushTestUtilsTest_1.TruePushTest]);
        assert.equal(yield pr.mapping({ id: new GitHubRepoRef_1.GitHubRepoRef("a", "b") }), undefined);
    }));
});
//# sourceMappingURL=pushRulesTest.js.map