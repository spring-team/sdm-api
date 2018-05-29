"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const goalContribution_1 = require("../../../src/blueprint/dsl/goalContribution");
const goalDsl_1 = require("../../../src/blueprint/dsl/goalDsl");
const httpServiceGoals_1 = require("../../../src/common/delivery/goals/common/httpServiceGoals");
const decisionTreeTest_1 = require("./decisionTreeTest");
const assert = require("power-assert");
const wellKnownGoals_1 = require("../../../src/blueprint/wellKnownGoals");
describe("goalContributors", () => {
    it("should set no goals", () => __awaiter(this, void 0, void 0, function* () {
        const gs = goalContribution_1.goalContributors(goalDsl_1.whenPushSatisfies(false).itMeans("thing").setGoals(httpServiceGoals_1.HttpServiceGoals));
        const p = decisionTreeTest_1.fakePush();
        const goals = yield gs.mapping(p);
        assert.equal(goals, undefined);
    }));
    it("should set goals from one goal", () => __awaiter(this, void 0, void 0, function* () {
        const gs = goalContribution_1.goalContributors(goalDsl_1.whenPushSatisfies(true).itMeans("thing").setGoals(wellKnownGoals_1.BuildGoal));
        const p = decisionTreeTest_1.fakePush();
        const goals = yield gs.mapping(p);
        assert.deepEqual(goals.goals, [wellKnownGoals_1.BuildGoal]);
    }));
    it("should set goals from one goals", () => __awaiter(this, void 0, void 0, function* () {
        const r = goalDsl_1.whenPushSatisfies(true).setGoals(httpServiceGoals_1.HttpServiceGoals);
        const gs = goalContribution_1.goalContributors(r);
        const p = decisionTreeTest_1.fakePush();
        assert.equal(yield r.mapping(p), httpServiceGoals_1.HttpServiceGoals);
        const goals = yield gs.mapping(p);
        assert.deepEqual(goals.goals, httpServiceGoals_1.HttpServiceGoals.goals);
    }));
});
//# sourceMappingURL=goalContributorsTest.js.map