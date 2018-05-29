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
const goalDsl_1 = require("../../../src/blueprint/dsl/goalDsl");
const httpServiceGoals_1 = require("../../../src/common/delivery/goals/common/httpServiceGoals");
const pushTestUtilsTest_1 = require("../../common/listener/support/pushTestUtilsTest");
const decisionTreeTest_1 = require("./decisionTreeTest");
describe("whenPushSatisfies", () => {
    it("should satisfy true", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(true).itMeans("war").setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), httpServiceGoals_1.HttpServiceGoals);
    }));
    it("should not satisfy false", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(false).itMeans("war").setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), undefined);
    }));
    it("should satisfy function returning true", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(() => true).itMeans("war").setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), httpServiceGoals_1.HttpServiceGoals);
    }));
    it("should not satisfy function returning false", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(() => false).itMeans("war").setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), undefined);
    }));
    it("should satisfy function returning promise true", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(() => __awaiter(this, void 0, void 0, function* () { return true; })).itMeans("war").setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), httpServiceGoals_1.HttpServiceGoals);
    }));
    it("should allow setting array of goals", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(() => __awaiter(this, void 0, void 0, function* () { return true; })).itMeans("war").setGoals(httpServiceGoals_1.HttpServiceGoals.goals);
        assert.deepEqual((yield test.mapping(decisionTreeTest_1.fakePush())).goals, httpServiceGoals_1.HttpServiceGoals.goals);
    }));
    it("should not satisfy function returning promise false", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(() => __awaiter(this, void 0, void 0, function* () { return false; })).itMeans("war").setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), undefined);
    }));
    it("should default name with one", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.TruePushTest).setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(test.name, pushTestUtilsTest_1.TruePushTest.name);
    }));
    it("should override name with one", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.TruePushTest).itMeans("something").setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(test.name, "something");
    }));
    it("should default name with two", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies(pushTestUtilsTest_1.TruePushTest, pushTestUtilsTest_1.FalsePushTest).setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(test.name, pushTestUtilsTest_1.TruePushTest.name + " && " + pushTestUtilsTest_1.FalsePushTest.name);
    }));
    it("should allow simple function", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies((p) => __awaiter(this, void 0, void 0, function* () { return true; })).setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), httpServiceGoals_1.HttpServiceGoals);
    }));
    it("should allow simple function returning false", () => __awaiter(this, void 0, void 0, function* () {
        const test = goalDsl_1.whenPushSatisfies((p) => __awaiter(this, void 0, void 0, function* () { return p.push.id === "notThis"; })).setGoals(httpServiceGoals_1.HttpServiceGoals);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), undefined);
    }));
});
//# sourceMappingURL=whenPushSatisfiesTest.js.map