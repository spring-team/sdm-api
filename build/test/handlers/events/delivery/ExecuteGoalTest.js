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
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const Goal_1 = require("../../../../src/common/delivery/goals/Goal");
const gitHubContext_1 = require("../../../../src/common/delivery/goals/support/github/gitHubContext");
const logInterpreters_1 = require("../../../../src/common/delivery/goals/support/logInterpreters");
const EphemeralProgressLog_1 = require("../../../../src/common/log/EphemeralProgressLog");
const executeGoal_1 = require("../../../../src/handlers/events/delivery/goals/executeGoal");
const fakeContext_1 = require("../../../../src/util/test/fakeContext");
const SingleProjectLoader_1 = require("../../../../src/util/test/SingleProjectLoader");
const helloWorldGoalExecutor = (rwlc) => __awaiter(this, void 0, void 0, function* () {
    rwlc.progressLog.write("Hello world\n");
    return automation_client_1.Success;
});
const fakeGoal = new Goal_1.Goal({
    uniqueName: "HelloWorld",
    environment: gitHubContext_1.IndependentOfEnvironment, orderedName: "0-yo",
});
const fakeSdmGoal = { fulfillment: { name: "HelloWorld" }, environment: "0-code" };
const fakeCredentials = { token: "NOT-A-TOKEN" };
describe("executing the goal", () => {
    it("calls a pre-hook and sends output to the log", done => {
        const projectLoader = new SingleProjectLoader_1.SingleProjectLoader(InMemoryProject_1.InMemoryProject.of());
        EphemeralProgressLog_1.createEphemeralProgressLog(fakeContext_1.fakeContext(), { name: "test" }).then(progressLog => {
            const fakeRWLC = {
                context: fakeContext_1.fakeContext(),
                progressLog,
                credentials: fakeCredentials,
            };
            return executeGoal_1.executeGoal({ projectLoader }, helloWorldGoalExecutor, fakeRWLC, fakeSdmGoal, fakeGoal, logInterpreters_1.lastLinesLogInterpreter("hi"))
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                yield fakeRWLC.progressLog.close();
                //   const result = Success;
                assert.equal(result.code, 0, result.message);
                assert(fakeRWLC.progressLog.log.includes("Hello world"));
            }));
        }).then(done, done);
    });
});
//# sourceMappingURL=ExecuteGoalTest.js.map