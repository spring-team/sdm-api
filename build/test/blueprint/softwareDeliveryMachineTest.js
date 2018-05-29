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
const goalDsl_1 = require("../../src/blueprint/dsl/goalDsl");
const commonGoals_1 = require("../../src/common/delivery/goals/common/commonGoals");
const commonPushTests_1 = require("../../src/common/listener/support/pushtest/commonPushTests");
const sdmGoalImplementationTest_1 = require("./sdmGoalImplementationTest");
const InMemoryFile_1 = require("@atomist/automation-client/project/mem/InMemoryFile");
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const constructionUtils_1 = require("@atomist/automation-client/util/constructionUtils");
const assert = require("power-assert");
const buildDsl_1 = require("../../src/blueprint/dsl/buildDsl");
const ConcreteSoftwareDeliveryMachine_1 = require("../../src/blueprint/support/ConcreteSoftwareDeliveryMachine");
const NpmDetectBuildMapping_1 = require("../../src/common/delivery/build/local/npm/NpmDetectBuildMapping");
const httpServiceGoals_1 = require("../../src/common/delivery/goals/common/httpServiceGoals");
const nodePushTests_1 = require("../../src/common/listener/support/pushtest/node/nodePushTests");
const executeAutofixesTest_1 = require("../common/delivery/code/autofix/executeAutofixesTest");
const decisionTreeTest_1 = require("./dsl/decisionTreeTest");
describe("SDM handler creation", () => {
    describe("emits event handlers", () => {
        it("emits goal setter", () => __awaiter(this, void 0, void 0, function* () {
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies(commonPushTests_1.AnyPush)
                    .itMeans("do nothing")
                    .setGoals(commonGoals_1.NoGoals)]);
            assert(sdm.eventHandlers.length > 0);
            const sgop = sdm.eventHandlers.map(h => constructionUtils_1.toFactory(h)()).find(h => !!h.goalsListeners);
            assert(sgop.goalsListeners.length >= 0);
        }));
        it("emits goal setter with listener", () => __awaiter(this, void 0, void 0, function* () {
            const gl = () => __awaiter(this, void 0, void 0, function* () { return undefined; });
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies(commonPushTests_1.AnyPush)
                    .itMeans("do nothing")
                    .setGoals(commonGoals_1.NoGoals)]);
            sdm.addGoalsSetListeners(gl);
            assert(sdm.eventHandlers.length > 0);
            const sgop = sdm.eventHandlers.map(h => constructionUtils_1.toFactory(h)()).find(h => !!h.goalsListeners);
            assert(sgop.goalsListeners.length >= 1);
        }));
    });
    describe("can test goal setting", () => {
        it("sets no goals", () => __awaiter(this, void 0, void 0, function* () {
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies(commonPushTests_1.AnyPush)
                    .itMeans("do nothing")
                    .setGoals(null)]);
            const p = decisionTreeTest_1.fakePush();
            assert.equal(yield sdm.pushMapping.mapping(p), undefined);
        }));
        it("sets goals on any push", () => __awaiter(this, void 0, void 0, function* () {
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies(commonPushTests_1.AnyPush)
                    .setGoals(httpServiceGoals_1.HttpServiceGoals)]);
            const p = decisionTreeTest_1.fakePush();
            assert.equal(yield sdm.pushMapping.mapping(p), httpServiceGoals_1.HttpServiceGoals);
        }));
        it("sets goals on particular push", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("thing", "1"));
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies((pu) => __awaiter(this, void 0, void 0, function* () { return !!(yield pu.project.getFile("thing")); }))
                    .setGoals(httpServiceGoals_1.HttpServiceGoals)]);
            const p = decisionTreeTest_1.fakePush(project);
            assert.equal(yield sdm.pushMapping.mapping(p), httpServiceGoals_1.HttpServiceGoals);
        }));
    });
    describe("observesOnly", () => {
        it("cannot mutate", () => __awaiter(this, void 0, void 0, function* () {
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies((pu) => __awaiter(this, void 0, void 0, function* () { return !!(yield pu.project.getFile("thing")); }))
                    .setGoals(httpServiceGoals_1.HttpServiceGoals)]);
            assert(sdm.observesOnly);
        }));
        it("has an autofix", () => __awaiter(this, void 0, void 0, function* () {
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies((pu) => __awaiter(this, void 0, void 0, function* () { return !!(yield pu.project.getFile("thing")); }))
                    .setGoals(httpServiceGoals_1.HttpServiceGoals)]);
            sdm.addAutofixes(executeAutofixesTest_1.AddThingAutofix);
            assert(!sdm.observesOnly);
        }));
        it("has a build", () => __awaiter(this, void 0, void 0, function* () {
            const sdm = new ConcreteSoftwareDeliveryMachine_1.ConcreteSoftwareDeliveryMachine("Gustave", sdmGoalImplementationTest_1.fakeSoftwareDeliveryMachineOptions, undefined, [goalDsl_1.whenPushSatisfies((pu) => __awaiter(this, void 0, void 0, function* () { return !!(yield pu.project.getFile("thing")); }))
                    .setGoals(httpServiceGoals_1.HttpServiceGoals)]);
            sdm.addBuildRules(buildDsl_1.when(nodePushTests_1.HasAtomistBuildFile)
                .itMeans("Custom build script")
                .set(NpmDetectBuildMapping_1.npmCustomBuilder(sdm.options.artifactStore, sdm.options.projectLoader)));
            assert(!sdm.observesOnly);
        }));
        // tslint:disable:no-unused-expression
        it("has a deployment").pending;
    });
});
//# sourceMappingURL=softwareDeliveryMachineTest.js.map