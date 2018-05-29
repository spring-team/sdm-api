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
const automation_client_1 = require("@atomist/automation-client");
exports.BaseContext = "sdm/atomist/";
exports.IndependentOfEnvironment = "0-code/";
exports.StagingEnvironment = "1-staging/";
// should always be number dash name. The number may be a decimal
exports.ProductionEnvironment = "2-prod/";
exports.ProjectDisposalEnvironment = "8-doom/";
/**
 * if this is a context we created, then we can interpret it.
 * Otherwise returns undefined
 * @param {string} context
 * @returns {{base: string; env: string; stage: string}}
 */
function splitContext(context) {
    if (context.startsWith(exports.BaseContext)) {
        const numberAndName = /([0-9\.]+)-(.*)/;
        const wholeContext = /^sdm\/atomist\/(.*)\/(.*)$/;
        const matchWhole = context.match(wholeContext);
        if (!matchWhole) {
            return undefined;
        }
        const goalPart = matchWhole[2];
        const matchEnv = matchWhole[1].match(numberAndName);
        const matchGoal = goalPart.match(numberAndName);
        if (!matchGoal || !matchEnv) {
            automation_client_1.logger.debug(`Did not find number and name in ${matchWhole[1]} or ${matchWhole[2]}`);
            return undefined;
        }
        const name = matchGoal[2];
        const goalOrder = +matchGoal[1];
        return {
            base: exports.BaseContext,
            env: matchEnv[2],
            envOrder: +matchEnv[1], name,
            goalOrder,
            envPart: matchWhole[1],
            goalPart,
            goalName: name,
        };
    }
}
exports.splitContext = splitContext;
/*
 * true if contextB is in the same series of goals as A,
 * and A comes before B
 */
function contextIsAfter(contextA, contextB) {
    if (belongToSameSeriesOfGoals(contextA, contextB)) {
        const splitA = splitContext(contextA);
        const splitB = splitContext(contextB);
        return splitA.envOrder < splitB.envOrder || splitA.goalOrder < splitB.goalOrder;
    }
}
exports.contextIsAfter = contextIsAfter;
function belongToSameSeriesOfGoals(contextA, contextB) {
    const splitA = splitContext(contextA);
    const splitB = splitContext(contextB);
    return splitA && splitB && splitA.base === splitB.base;
}
//# sourceMappingURL=gitHubContext.js.map