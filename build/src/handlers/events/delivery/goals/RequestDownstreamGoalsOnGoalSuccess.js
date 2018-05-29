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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const _ = require("lodash");
const fetchGoalsOnCommit_1 = require("../../../../common/delivery/goals/support/fetchGoalsOnCommit");
const goalPreconditions_1 = require("../../../../common/delivery/goals/support/goalPreconditions");
const SdmGoalImplementationMapper_1 = require("../../../../common/delivery/goals/support/SdmGoalImplementationMapper");
const storeGoals_1 = require("../../../../common/delivery/goals/support/storeGoals");
const sdmGoalIngester_1 = require("../../../../ingesters/sdmGoalIngester");
const repoRef_1 = require("../../../../util/git/repoRef");
/**
 * Respond to a failure status by failing downstream goals
 */
let RequestDownstreamGoalsOnGoalSuccess = class RequestDownstreamGoalsOnGoalSuccess {
    constructor(implementationMapper) {
        this.implementationMapper = implementationMapper;
    }
    // #98: GitHub Status->SdmGoal: I believe all the goal state updates in this SDM
    // are now happening on the SdmGoal. This subscription can change to be on SdmGoal state.
    handle(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const sdmGoal = event.data.SdmGoal[0];
            if (sdmGoal.state !== "success") { // atomisthq/automation-api#395
                automation_client_1.logger.debug(`Nevermind: success reported when the state was=[${sdmGoal.state}]`);
                return Promise.resolve(automation_client_1.Success);
            }
            const id = repoRef_1.repoRefFromSdmGoal(sdmGoal, yield fetchScmProvider(context, sdmGoal.repo.providerId));
            const goals = sumSdmGoalEventsByOverride(yield fetchGoalsOnCommit_1.fetchGoalsForCommit(context, id, sdmGoal.repo.providerId), [sdmGoal]);
            const goalsToRequest = goals.filter(g => isDirectlyDependentOn(sdmGoal, g))
                // .filter(expectToBeFulfilledAfterRequest)
                .filter(shouldBePlannedOrSkipped)
                .filter(g => goalPreconditions_1.preconditionsAreMet(g, { goalsForCommit: goals }));
            if (goalsToRequest.length > 0) {
                automation_client_1.logger.info("because %s is successful, these goals are now ready: %s", sdmGoalIngester_1.goalKeyString(sdmGoal), goalsToRequest.map(sdmGoalIngester_1.goalKeyString).join(", "));
            }
            const credentials = { token: this.githubToken };
            /*
             * #294 Intention: for custom descriptions per goal, we need to look up the Goal.
             * This is the only reason to do that here.
             * I want to maintain a list in the SDM of all goals that can be assigned by rules,
             * and pass them here for mapping from SdmGoalKey -> Goal. Then, we can use
             * the requestDescription defined on that Goal.
             */
            yield Promise.all(goalsToRequest.map((goal) => __awaiter(this, void 0, void 0, function* () {
                const cbs = this.implementationMapper.findFullfillmentCallbackForGoal(goal);
                let g = goal;
                for (const cb of cbs) {
                    g = yield cb.callback(g, { id, addressChannels: undefined, credentials, context });
                }
                return storeGoals_1.updateGoal(context, g, {
                    state: "requested",
                    description: `Ready to ` + g.name,
                    data: g.data,
                });
            })));
            return automation_client_1.Success;
        });
    }
};
__decorate([
    automation_client_1.Value("token"),
    __metadata("design:type", String)
], RequestDownstreamGoalsOnGoalSuccess.prototype, "githubToken", void 0);
RequestDownstreamGoalsOnGoalSuccess = __decorate([
    automation_client_1.EventHandler("Move downstream goals from 'planned' to 'success' when preconditions are met", graphQL_1.subscription("OnAnySuccessfulSdmGoal")),
    __metadata("design:paramtypes", [SdmGoalImplementationMapper_1.SdmGoalImplementationMapper])
], RequestDownstreamGoalsOnGoalSuccess);
exports.RequestDownstreamGoalsOnGoalSuccess = RequestDownstreamGoalsOnGoalSuccess;
function sumSdmGoalEventsByOverride(some, more) {
    // For some reason this won't compile with the obvious fix
    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    const byKey = _.groupBy(some.concat(more), sg => sdmGoalIngester_1.goalKeyString(sg));
    const summedGoals = Object.keys(byKey).map(k => sumEventsForOneSdmGoal(byKey[k]));
    return summedGoals;
}
exports.sumSdmGoalEventsByOverride = sumSdmGoalEventsByOverride;
function sumEventsForOneSdmGoal(events) {
    if (events.length === 1) {
        return events[0];
    }
    // here, I could get clever and sort by timestamp, or someday build a graph if they link to prior versions,
    // or get smart about statuses. Let me be lazy.
    automation_client_1.logger.debug("Found %d events for %s. Taking the last one, which has state %s", events.length, sdmGoalIngester_1.goalKeyString(events[0]), events[events.length - 1].state);
    return events[events.length - 1];
}
function fetchScmProvider(context, providerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield context.graphClient.query({ name: "SCMProvider", variables: { providerId } });
        if (!result || !result.SCMProvider || result.SCMProvider.length === 0) {
            throw new Error(`Provider not found: ${providerId}`);
        }
        return result.SCMProvider[0];
    });
}
exports.fetchScmProvider = fetchScmProvider;
function shouldBePlannedOrSkipped(dependentGoal) {
    if (dependentGoal.state === "planned") {
        return true;
    }
    if (dependentGoal.state === "skipped") {
        automation_client_1.logger.info("Goal %s was skipped, but now maybe it can go", dependentGoal.name);
        return true;
    }
    if (dependentGoal.state === "failure" && dependentGoal.retryFeasible) {
        automation_client_1.logger.info("Goal %s failed, but maybe we will retry it", dependentGoal.name);
        return true;
    }
    automation_client_1.logger.warn("Goal %s in state %s will not be requested", dependentGoal.name, dependentGoal.state);
    return false;
}
// tslint:disable-next-line:no-unused-variable
function expectToBeFulfilledAfterRequest(dependentGoal) {
    switch (dependentGoal.fulfillment.method) {
        case "SDM fulfill on requested":
            return true;
        case "side-effect":
            return false;
        case "other":
            // legacy behavior
            return true;
    }
}
function mapKeyToGoal(goals) {
    return (keyToFind) => {
        const found = goals.find(g => g.environment === keyToFind.environment &&
            g.name === keyToFind.name);
        return found;
    };
}
function isDirectlyDependentOn(successfulGoal, goal) {
    if (!goal) {
        automation_client_1.logger.warn("Internal error: Trying to work out if %j is dependent on null or undefined goal", successfulGoal);
        return false;
    }
    if (!goal.preConditions || goal.preConditions.length === 0) {
        return false; // no preconditions? not dependent
    }
    if (mapKeyToGoal(goal.preConditions)(successfulGoal)) {
        automation_client_1.logger.debug("%s depends on %s", goal.name, successfulGoal.name);
        return true; // the failed goal is one of my preconditions? dependent
    }
    return false;
}
//# sourceMappingURL=RequestDownstreamGoalsOnGoalSuccess.js.map