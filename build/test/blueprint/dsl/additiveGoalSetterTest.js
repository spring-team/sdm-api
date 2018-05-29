"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const goalContribution_1 = require("../../../src/blueprint/dsl/goalContribution");
const goalDsl_1 = require("../../../src/blueprint/dsl/goalDsl");
const httpServiceGoals_1 = require("../../../src/common/delivery/goals/common/httpServiceGoals");
const decisionTreeTest_1 = require("./decisionTreeTest");
const assert = require("power-assert");
describe("goalContributors", () => {
    it("should set goals", () => {
        const gs = goalContribution_1.goalContributors(goalDsl_1.whenPushSatisfies(true).itMeans("thing").setGoals(httpServiceGoals_1.HttpServiceGoals));
        const p = decisionTreeTest_1.fakePush();
        assert.equal(gs.mapping(p), httpServiceGoals_1.HttpServiceGoals);
    });
});
//# sourceMappingURL=additiveGoalSetterTest.js.map