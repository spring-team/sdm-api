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
const sdmGoalIngester_1 = require("../../../../../ingesters/sdmGoalIngester");
const ghub_1 = require("../../../../../util/github/ghub");
function createPendingGitHubStatusOnGoalSet(credentialsFactory) {
    return (inv) => __awaiter(this, void 0, void 0, function* () {
        const { id, credentials } = inv;
        if (inv.goalSet && inv.goalSet.goals && inv.goalSet.goals.length > 0) {
            automation_client_1.logger.info("Created goal set '%s'. Creating in progress GitHub status", inv.goalSetId);
            return ghub_1.createStatus(credentials, id, {
                context: "sdm/atomist",
                description: "Atomist SDM Goals in progress",
                target_url: "https://app.atomist.com",
                state: "pending",
            });
        }
        else {
            automation_client_1.logger.info("No goals planned. Not creating in progress GitHub status");
            return Promise.resolve();
        }
    });
}
exports.createPendingGitHubStatusOnGoalSet = createPendingGitHubStatusOnGoalSet;
function SetGitHubStatusOnGoalCompletion() {
    return (inv) => __awaiter(this, void 0, void 0, function* () {
        const { id, completedGoal, allGoals, credentials } = inv;
        automation_client_1.logger.info("Completed goal: '%s' with '%s' in set '%s'", sdmGoalIngester_1.goalKeyString(completedGoal), completedGoal.state, completedGoal.goalSetId);
        if (completedGoal.state === "failure") {
            automation_client_1.logger.info("Setting GitHub status to failed on %s" + id.sha);
            return ghub_1.createStatus(credentials, id, {
                context: "sdm/atomist",
                description: `Atomist SDM Goals: ${completedGoal.description}`,
                target_url: "https://app.atomist.com",
                state: "failure",
            });
        }
        if (allSuccessful(allGoals)) {
            automation_client_1.logger.info("Setting GitHub status to success on %s", id.sha);
            return ghub_1.createStatus(credentials, id, {
                context: "sdm/atomist",
                description: `Atomist SDM Goals: all succeeded`,
                target_url: "https://app.atomist.com",
                state: "success",
            });
        }
    });
}
exports.SetGitHubStatusOnGoalCompletion = SetGitHubStatusOnGoalCompletion;
function allSuccessful(goals) {
    goals.forEach(g => automation_client_1.logger.debug("goal %s is %s", g.name, g.state));
    return !goals.some(g => g.state !== "success");
}
function sdmGoalStateToGitHubStatusState(goalState) {
    switch (goalState) {
        case "planned":
        case "requested":
        case "in_process":
            return "pending";
        case "waiting_for_approval":
        case "success":
            return "success";
        case "failure":
        case "skipped":
            return "failure";
        default:
            throw new Error("Unknown goal state " + goalState);
    }
}
exports.sdmGoalStateToGitHubStatusState = sdmGoalStateToGitHubStatusState;
//# sourceMappingURL=gitHubStatusSetters.js.map