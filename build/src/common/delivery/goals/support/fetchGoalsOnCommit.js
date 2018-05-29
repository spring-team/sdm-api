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
const GraphClient_1 = require("@atomist/automation-client/spi/graph/GraphClient");
const stringify = require("json-stringify-safe");
const _ = require("lodash");
const sdmGoalIngester_1 = require("../../../../ingesters/sdmGoalIngester");
const storeGoals_1 = require("./storeGoals");
function findSdmGoalOnCommit(ctx, id, providerId, goal) {
    return __awaiter(this, void 0, void 0, function* () {
        const sdmGoals = yield fetchGoalsForCommit(ctx, id, providerId);
        const matches = sdmGoals.filter(g => storeGoals_1.goalCorrespondsToSdmGoal(goal, g));
        if (matches && matches.length > 1) {
            automation_client_1.logger.warn("FindSdmGoal: More than one match found for %s/%s; they are %j", goal.environment, goal.name, matches);
        }
        if (matches.length === 0) {
            automation_client_1.logger.debug("Did not find goal %s on commit %s#%s", sdmGoalIngester_1.goalKeyString(goal), id.repo, id.sha);
            return undefined;
        }
        return matches[0];
    });
}
exports.findSdmGoalOnCommit = findSdmGoalOnCommit;
function fetchCommitForSdmGoal(ctx, goal) {
    return __awaiter(this, void 0, void 0, function* () {
        const variables = { sha: goal.sha, repo: goal.repo.name, owner: goal.repo.owner, branch: goal.branch };
        const result = yield ctx.graphClient.query({
            options: GraphClient_1.QueryNoCacheOptions,
            name: "CommitForSdmGoal",
            variables: { sha: goal.sha, repo: goal.repo.name, owner: goal.repo.owner, branch: goal.branch },
        });
        if (!result || !result.Commit || result.Commit.length === 0) {
            throw new Error("No commit found for goal " + stringify(variables));
        }
        return result.Commit[0];
    });
}
exports.fetchCommitForSdmGoal = fetchCommitForSdmGoal;
function fetchGoalsForCommit(ctx, id, providerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ctx.graphClient.query({
            name: "SdmGoalsForCommit",
            variables: {
                owner: id.owner,
                repo: id.repo,
                branch: id.branch,
                sha: id.sha,
                providerId,
                qty: 200,
            },
            options: GraphClient_1.QueryNoCacheOptions,
        });
        if (!result || !result.SdmGoal) {
            throw new Error(`No result finding goals for commit ${providerId}/${id.owner}/${id.repo}#${id.sha} on ${id.branch}`);
        }
        if (result.SdmGoal.length === 0) {
            automation_client_1.logger.warn("0 goals found for commit %j, provider %s", id, providerId);
        }
        if (result.SdmGoal.some(g => !g)) {
            automation_client_1.logger.warn("Internal error: Null or undefined goal found for commit %j, provider %s", id, providerId);
        }
        if (result.SdmGoal.length === 200) {
            automation_client_1.logger.warn("Watch out! There may be more goals than this. We only retrieve 200.");
            // automation-api#399 paging is not well-supported yet
        }
        // only maintain latest version of SdmGoals
        const goals = sumSdmGoalEvents(result.SdmGoal);
        automation_client_1.logger.debug("summed goals: ", stringify(goals));
        return goals;
    });
}
exports.fetchGoalsForCommit = fetchGoalsForCommit;
function sumSdmGoalEvents(some) {
    // For some reason this won't compile with the obvious fix
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    const byKey = _.groupBy(some, sg => sdmGoalIngester_1.goalKeyString(sg));
    const summedGoals = Object.keys(byKey).map(k => sumEventsForOneSdmGoal(byKey[k]));
    return summedGoals;
}
exports.sumSdmGoalEvents = sumSdmGoalEvents;
function sumEventsForOneSdmGoal(events) {
    if (events.length === 1) {
        return events[0];
    }
    // SUCCESS OVERRIDES ALL
    const success = events.find(e => e.state === "success");
    return success || _.maxBy(events, e => e.ts);
}
//# sourceMappingURL=fetchGoalsOnCommit.js.map