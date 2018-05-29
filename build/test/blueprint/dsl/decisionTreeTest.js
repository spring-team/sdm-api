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
const decisionTree_1 = require("../../../src/blueprint/dsl/decisionTree");
const pushTestUtilsTest_1 = require("../../common/listener/support/pushTestUtilsTest");
const assert = require("power-assert");
const goalDsl_1 = require("../../../src/blueprint/dsl/goalDsl");
const commonGoals_1 = require("../../../src/common/delivery/goals/common/commonGoals");
const httpServiceGoals_1 = require("../../../src/common/delivery/goals/common/httpServiceGoals");
const fakeContext_1 = require("../../../src/util/test/fakeContext");
const FrogPushMapping = {
    name: "frog",
    mapping: () => __awaiter(this, void 0, void 0, function* () { return "frog"; }),
};
function fakePush(project) {
    return {
        push: { id: new Date().getTime() + "_" },
        project,
        context: fakeContext_1.fakeContext(),
    };
}
exports.fakePush = fakePush;
describe("given", () => {
    it("should combine true with one", () => __awaiter(this, void 0, void 0, function* () {
        const pm = decisionTree_1.given(pushTestUtilsTest_1.TruePushTest)
            .itMeans("frogs coming")
            .then(FrogPushMapping);
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, "frog");
    }));
    it("should combine false with one", () => __awaiter(this, void 0, void 0, function* () {
        const pm = decisionTree_1.given(pushTestUtilsTest_1.FalsePushTest)
            .itMeans("no frogs coming")
            .then(FrogPushMapping);
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, undefined);
    }));
    it("allows multiple given guards", () => __awaiter(this, void 0, void 0, function* () {
        const pm = decisionTree_1.given(pushTestUtilsTest_1.TruePushTest, pushTestUtilsTest_1.TruePushTest)
            .itMeans("frogs coming")
            .then(FrogPushMapping);
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, "frog");
    }));
    it("should allow literal", () => __awaiter(this, void 0, void 0, function* () {
        const pm = decisionTree_1.given(pushTestUtilsTest_1.TruePushTest)
            .itMeans("frogs coming")
            .set("frogs");
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, "frogs");
    }));
    it("nest with when", () => __awaiter(this, void 0, void 0, function* () {
        const pm = decisionTree_1.given(pushTestUtilsTest_1.TruePushTest)
            .itMeans("no frogs coming")
            .then(goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.TruePushTest).itMeans("http").setGoals(httpServiceGoals_1.HttpServiceGoals));
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, httpServiceGoals_1.HttpServiceGoals);
    }));
    it("nest with multiple when", () => __awaiter(this, void 0, void 0, function* () {
        const pm = decisionTree_1.given(pushTestUtilsTest_1.TruePushTest)
            .itMeans("no frogs coming")
            .then(goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.FalsePushTest).itMeans("nope").setGoals(commonGoals_1.NoGoals), goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.TruePushTest).itMeans("yes").setGoals(httpServiceGoals_1.HttpServiceGoals));
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, httpServiceGoals_1.HttpServiceGoals);
    }));
    it("nested given", () => __awaiter(this, void 0, void 0, function* () {
        const pm = decisionTree_1.given(pushTestUtilsTest_1.TruePushTest)
            .itMeans("no frogs coming")
            .then(decisionTree_1.given(pushTestUtilsTest_1.TruePushTest).itMeans("case1").then(goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.FalsePushTest).itMeans("nope").setGoals(commonGoals_1.NoGoals), goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.TruePushTest).itMeans("yes").setGoals(httpServiceGoals_1.HttpServiceGoals)));
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, httpServiceGoals_1.HttpServiceGoals);
    }));
    it("nested given with variable", () => __awaiter(this, void 0, void 0, function* () {
        let count = 0;
        const pm = decisionTree_1.given(pushTestUtilsTest_1.TruePushTest)
            .init(() => count = 0)
            .itMeans("no frogs coming")
            .then(decisionTree_1.given(pushTestUtilsTest_1.TruePushTest).itMeans("case1")
            .compute(() => count++)
            .then(goalDsl_1.whenPushSatisfies(count > 0, pushTestUtilsTest_1.FalsePushTest).itMeans("nope").setGoals(commonGoals_1.NoGoals), goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.TruePushTest).itMeans("yes").setGoals(httpServiceGoals_1.HttpServiceGoals)));
        const mapped = yield pm.mapping(fakePush());
        assert.equal(mapped, httpServiceGoals_1.HttpServiceGoals);
    }));
});
//# sourceMappingURL=decisionTreeTest.js.map