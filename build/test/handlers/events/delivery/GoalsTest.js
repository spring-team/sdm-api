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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const commonGoals_1 = require("../../../../src/common/delivery/goals/common/commonGoals");
const gitHubContext_1 = require("../../../../src/common/delivery/goals/gitHubContext");
describe("Goal handling", () => {
    it("parses my contexts", () => {
        const result = gitHubContext_1.splitContext(commonGoals_1.ReviewContext);
        assert.equal(result.name, "review");
        assert.equal(result.base, gitHubContext_1.BaseContext);
        assert.equal(result.env, "code");
        assert.equal(result.envOrder, 0);
        assert.equal(result.goalOrder, 1);
    });
    it("says endpoint is after deploy", () => {
        assert(gitHubContext_1.contextIsAfter(commonGoals_1.StagingDeploymentContext, commonGoals_1.StagingEndpointContext));
    });
    it("says deploy is after build", () => {
        assert(gitHubContext_1.contextIsAfter(commonGoals_1.BuildContext, commonGoals_1.StagingDeploymentContext));
    });
    it("says prod endpoint is after prod ", () => {
        assert(gitHubContext_1.contextIsAfter(commonGoals_1.ProductionDeploymentContext, commonGoals_1.ProductionEndpointContext));
    });
});
//# sourceMappingURL=GoalsTest.js.map