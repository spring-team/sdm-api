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
const httpServiceGoals_1 = require("../src/common/delivery/goals/common/httpServiceGoals");
const graphGoalsToSlack_1 = require("../src/common/delivery/goals/graph/graphGoalsToSlack");
const DesiredDot = `digraph HTTP_Service {
    fontname="Arial";
    splines="polyline";
    rankdir="LR";
    edge [arrowhead="vee"];
    node [shape=box, fontname="Arial", style="rounded"];

    code_fingerprint [label="fingerprint"]
    code_autofix [label="autofix"]
    code_review [label="review"]
    code_react [label="react"]
    code_build [label="build"]
    code_artifact [label="store artifact"]
    staging_deploy [label="deploy to Test"]
    staging_endpoint [label="locate service endpoint in Test"]
    staging_verifyEndpoint [label="verify Test deployment"]
    prod_prod_deploy [label="deploy to Prod"]
    prod_endpoint [label="locate service endpoint in Prod"]

    code_autofix -> code_build
    code_build -> code_artifact
    code_artifact -> staging_deploy
    staging_deploy -> staging_endpoint
    staging_endpoint -> staging_verifyEndpoint
    code_artifact -> prod_prod_deploy
    staging_verifyEndpoint -> prod_prod_deploy
    prod_prod_deploy -> prod_endpoint
}
`;
describe("Rendering a goal graph", () => {
    it("renders the HTTP Service Goals", () => {
        const goals = httpServiceGoals_1.HttpServiceGoals;
        const dot = graphGoalsToSlack_1.goalsToDot(goals);
        assert.equal(dot, DesiredDot);
    });
});
//# sourceMappingURL=goalGraphTest.js.map