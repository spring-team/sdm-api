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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const graphQL_1 = require("@atomist/automation-client/graph/graphQL");
const fetchGoalsOnCommit_1 = require("../../../../common/delivery/goals/support/fetchGoalsOnCommit");
const storeGoals_1 = require("../../../../common/delivery/goals/support/storeGoals");
const sdmGoalIngester_1 = require("../../../../ingesters/sdmGoalIngester");
const repoRef_1 = require("../../../../util/git/repoRef");
const RequestDownstreamGoalsOnGoalSuccess_1 = require("./RequestDownstreamGoalsOnGoalSuccess");
/**
 * Respond to a failure status by failing downstream goals
 */
let SkipDownstreamGoalsOnGoalFailure = class SkipDownstreamGoalsOnGoalFailure {
    // #98: GitHub Status->SdmGoal: We still have to respond to failure on status,
    // until we change all the failure updates to happen on SdmGoal.
    // but we can update the SdmGoals, and let that propagate to the statuses.
    // we can count on all of the statuses we need to update to exist as SdmGoals.
    // however, we can't count on the SdmGoal to have the latest state, so check the Status for that.
    handle(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const failedGoal = event.data.SdmGoal[0];
            if (failedGoal.state !== "failure") { // atomisthq/automation-api#395
                automation_client_1.logger.debug(`Nevermind: failure reported when the state was=[${failedGoal.state}]`);
                return Promise.resolve(automation_client_1.Success);
            }
            const id = repoRef_1.repoRefFromSdmGoal(failedGoal, yield RequestDownstreamGoalsOnGoalSuccess_1.fetchScmProvider(context, failedGoal.repo.providerId));
            const goals = RequestDownstreamGoalsOnGoalSuccess_1.sumSdmGoalEventsByOverride(yield fetchGoalsOnCommit_1.fetchGoalsForCommit(context, id, failedGoal.repo.providerId), [failedGoal]);
            const goalsToSkip = goals.filter(g => isDependentOn(failedGoal, g, mapKeyToGoal(goals)))
                .filter(g => g.state === "planned");
            yield Promise.all(goalsToSkip.map(g => storeGoals_1.updateGoal(context, g, {
                state: "skipped",
                description: `Skipped ${g.name} because ${failedGoal.name} failed`,
            })));
            return automation_client_1.Success;
        });
    }
};
SkipDownstreamGoalsOnGoalFailure = __decorate([
    automation_client_1.EventHandler("Fail downstream goals on a goal failure", graphQL_1.subscription("OnAnyFailedSdmGoal"))
], SkipDownstreamGoalsOnGoalFailure);
exports.SkipDownstreamGoalsOnGoalFailure = SkipDownstreamGoalsOnGoalFailure;
function mapKeyToGoal(goals) {
    return (keyToFind) => {
        const found = goals.find(g => sdmGoalIngester_1.goalKeyEquals(keyToFind, g));
        return found;
    };
}
function isDependentOn(failedGoal, goal, preconditionToGoal) {
    if (!goal) {
        // TODO we think this is caused by automation-api#396
        automation_client_1.logger.warn("Internal error: Trying to work out if %j is dependent on null or undefined goal", failedGoal);
        return false;
    }
    if (!goal.preConditions || goal.preConditions.length === 0) {
        return false; // no preconditions? not dependent
    }
    if (mapKeyToGoal(goal.preConditions)(failedGoal)) {
        return true; // the failed goal is one of my preconditions? dependent
    }
    // otherwise, recurse on my preconditions
    return !!goal.preConditions
        .map(precondition => isDependentOn(failedGoal, preconditionToGoal(precondition), preconditionToGoal))
        .find(a => a); // if one is true, return true
}
//# sourceMappingURL=SkipDownstreamGoalsOnGoalFailure.js.map