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
const automation_client_1 = require("@atomist/automation-client");
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const goalDsl_1 = require("../../src/blueprint/dsl/goalDsl");
const machineFactory_1 = require("../../src/blueprint/machineFactory");
const wellKnownGoals_1 = require("../../src/blueprint/wellKnownGoals");
const Goal_1 = require("../../src/common/delivery/goals/Goal");
const Goals_1 = require("../../src/common/delivery/goals/Goals");
const commonPushTests_1 = require("../../src/common/listener/support/pushtest/commonPushTests");
const SetGoalsOnPush_1 = require("../../src/handlers/events/delivery/goals/SetGoalsOnPush");
const SingleProjectLoader_1 = require("../../src/util/test/SingleProjectLoader");
const favoriteRepoRef = GitHubRepoRef_1.GitHubRepoRef.from({
    owner: "jess",
    repo: "monet",
    sha: "75132357b19889c4d6c2bef99fce8f477e1f2196",
    branch: "claude",
});
exports.fakeSoftwareDeliveryMachineOptions = {
    projectLoader: new SingleProjectLoader_1.SingleProjectLoader(InMemoryProject_1.InMemoryProject.from(favoriteRepoRef, { path: "README.md", content: "read sometthing else" })),
};
const credentials = { token: "ab123bbbaaa" };
const fakeContext = { context: { name: "my favorite context " } };
const aPush = { repo: { org: { provider: { providerId: "myProviderId" } } } };
describe("implementing goals in the SDM", () => {
    it("can autofix", () => __awaiter(this, void 0, void 0, function* () {
        const mySDM = machineFactory_1.createSoftwareDeliveryMachine({ name: "Gustave", options: exports.fakeSoftwareDeliveryMachineOptions, configuration: undefined }, goalDsl_1.whenPushSatisfies(commonPushTests_1.AnyPush)
            .itMeans("autofix the crap out of that thing")
            .setGoals(new Goals_1.Goals("Autofix only", wellKnownGoals_1.AutofixGoal)));
        const { determinedGoals, goalsToSave } = yield SetGoalsOnPush_1.determineGoals({
            projectLoader: exports.fakeSoftwareDeliveryMachineOptions.projectLoader,
            goalSetters: mySDM.goalSetters,
            implementationMapping: mySDM.goalFulfillmentMapper,
        }, {
            credentials, id: favoriteRepoRef, context: fakeContext, push: aPush,
            addressChannels: () => Promise.resolve({}),
            goalSetId: "hi",
        });
        assert(determinedGoals.goals.includes(wellKnownGoals_1.AutofixGoal));
        assert.equal(goalsToSave.length, 1);
        const onlyGoal = goalsToSave[0];
        const myImpl = mySDM.goalFulfillmentMapper.findImplementationBySdmGoal(onlyGoal);
        assert.equal(myImpl.implementationName, "Autofix");
    }));
    const customGoal = new Goal_1.Goal({
        uniqueName: "Jerry",
        displayName: "Springer", environment: "1-staging/", orderedName: "1-springer",
    });
    it("I can teach it to do a custom goal", () => __awaiter(this, void 0, void 0, function* () {
        let executed = false;
        const goalExecutor = () => __awaiter(this, void 0, void 0, function* () {
            executed = true;
            return automation_client_1.Success;
        });
        const mySDM = machineFactory_1.createSoftwareDeliveryMachine({ name: "Gustave", options: exports.fakeSoftwareDeliveryMachineOptions, configuration: undefined }, goalDsl_1.whenPushSatisfies(commonPushTests_1.AnyPush)
            .itMeans("cornelius springer")
            .setGoals(new Goals_1.Goals("Springer", customGoal)))
            .addGoalImplementation("Cornelius", customGoal, goalExecutor);
        const { determinedGoals, goalsToSave } = yield SetGoalsOnPush_1.determineGoals({
            projectLoader: exports.fakeSoftwareDeliveryMachineOptions.projectLoader,
            goalSetters: mySDM.goalSetters,
            implementationMapping: mySDM.goalFulfillmentMapper,
        }, {
            credentials, id: favoriteRepoRef, context: fakeContext, push: aPush,
            addressChannels: () => Promise.resolve({}),
            goalSetId: "hi",
        });
        assert(determinedGoals.goals.includes(customGoal));
        assert.equal(goalsToSave.length, 1);
        const onlyGoal = goalsToSave[0];
        const myImpl = mySDM.goalFulfillmentMapper.findImplementationBySdmGoal(onlyGoal);
        assert.equal(myImpl.implementationName, "Cornelius");
        yield myImpl.goalExecutor(undefined);
        assert(executed);
    }));
});
//# sourceMappingURL=sdmGoalImplementationTest.js.map