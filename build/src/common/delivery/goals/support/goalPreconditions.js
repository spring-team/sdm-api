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
const sprintf_js_1 = require("sprintf-js");
const sdmGoalIngester_1 = require("../../../../ingesters/sdmGoalIngester");
/*
 * Right now the only preconditions supported are other goals.
 * The intention is that others will be expressed, such as requiring an image.
 */
function preconditionsAreMet(goal, info) {
    if (!goal.preConditions || goal.preConditions.length === 0) {
        return true;
    }
    const falsification = goal.preConditions.find(p => !satisfied(p, info.goalsForCommit));
    if (falsification) {
        automation_client_1.logger.debug("Precondition not met for %s: %s", sdmGoalIngester_1.goalKeyString(goal), sdmGoalIngester_1.goalKeyString(falsification));
        return false;
    }
    automation_client_1.logger.debug("All %d preconditions satisfied for %s", goal.preConditions.length);
    return true;
}
exports.preconditionsAreMet = preconditionsAreMet;
function satisfied(preconditionKey, goalsForCommit) {
    const preconditionGoal = sdmGoalIngester_1.mapKeyToGoal(goalsForCommit)(preconditionKey);
    if (!preconditionGoal) {
        // TODO CD I'd suggest that goals that have a precondition that doesn't exist in the goal set
        // are satisfied
        automation_client_1.logger.error("Precondition %s not found on commit", sdmGoalIngester_1.goalKeyString(preconditionKey));
        return true;
    }
    switch (preconditionGoal.state) {
        case "failure":
        case "skipped":
            automation_client_1.logger.info("Precondition %s in state %s, won't be met", sdmGoalIngester_1.goalKeyString(preconditionKey), preconditionGoal.state);
            return false;
        case "planned":
        case "requested":
        case "waiting_for_approval":
        case "in_process":
            automation_client_1.logger.debug("Not yet. %s in state %s", sdmGoalIngester_1.goalKeyString(preconditionKey), preconditionGoal.state);
            return false;
        case "success":
            return true;
        default:
            throw new Error(sprintf_js_1.sprintf("Unhandled state: %s on %s", preconditionGoal.state, sdmGoalIngester_1.goalKeyString(preconditionKey)));
    }
}
//# sourceMappingURL=goalPreconditions.js.map