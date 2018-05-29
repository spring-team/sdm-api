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
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const goalDsl_1 = require("../../../src/blueprint/dsl/goalDsl");
const libraryGoals_1 = require("../../../src/common/delivery/goals/common/libraryGoals");
const PushRules_1 = require("../../../src/common/listener/support/PushRules");
const jvmPushTests_1 = require("../../../src/common/listener/support/pushtest/jvm/jvmPushTests");
describe("Construction of PushRules", () => {
    it("Does not think an empty project is a lein project", () => __awaiter(this, void 0, void 0, function* () {
        const rule = new PushRules_1.PushRules("test", [goalDsl_1.whenPushSatisfies(jvmPushTests_1.IsLein)
                .itMeans("Build a Clojure library")
                .setGoals(libraryGoals_1.LibraryGoals)]);
        const project = InMemoryProject_1.InMemoryProject.from({ owner: "yes", repo: "no" }, { path: "package.json", content: "{}" });
        const fakePush = { id: "test1" };
        const result = yield rule.mapping({ project, push: fakePush });
        assert(!result);
    }));
    it("Does think a lein project is a lein project", () => __awaiter(this, void 0, void 0, function* () {
        const rule = new PushRules_1.PushRules("test", [goalDsl_1.whenPushSatisfies(jvmPushTests_1.IsLein)
                .itMeans("Build a Clojure library")
                .setGoals(libraryGoals_1.LibraryGoals)]);
        const project = InMemoryProject_1.InMemoryProject.from({ owner: "yes", repo: "no" }, { path: "project.clj", content: "{}" });
        const fakePush = { id: "ttest2" };
        const result = yield rule.mapping({ project, push: fakePush });
        assert(result);
    }));
});
//# sourceMappingURL=pushRuleTest.js.map