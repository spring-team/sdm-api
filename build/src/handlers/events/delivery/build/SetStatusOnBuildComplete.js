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
const slack = require("@atomist/slack-messages/SlackMessages");
const axios_1 = require("axios");
const stringify = require("json-stringify-safe");
const fetchGoalsOnCommit_1 = require("../../../../common/delivery/goals/support/fetchGoalsOnCommit");
const storeGoals_1 = require("../../../../common/delivery/goals/support/storeGoals");
const addressChannels_1 = require("../../../../common/slack/addressChannels");
const repoRef_1 = require("../../../../util/git/repoRef");
const reportFailureInterpretationToLinkedChannels_1 = require("../../../../util/slack/reportFailureInterpretationToLinkedChannels");
/**
 * Set build status on complete build
 */
let SetGoalOnBuildComplete = class SetGoalOnBuildComplete {
    constructor(buildGoals, logInterpretation) {
        this.buildGoals = buildGoals;
        this.logInterpretation = logInterpretation;
    }
    handle(event, ctx, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const build = event.data.Build[0];
            const commit = build.commit;
            const id = repoRef_1.toRemoteRepoRef(commit.repo, { sha: commit.sha });
            params.buildGoals.forEach((buildGoal) => __awaiter(this, void 0, void 0, function* () {
                const sdmGoal = yield fetchGoalsOnCommit_1.findSdmGoalOnCommit(ctx, id, commit.repo.org.provider.providerId, buildGoal);
                if (!sdmGoal) {
                    automation_client_1.logger.debug("No build goal on commit; ignoring someone else's build result");
                    return automation_client_1.Success;
                }
                if (sdmGoal.fulfillment.method !== "side-effect" && sdmGoal.fulfillment.method !== "other") {
                    automation_client_1.logger.info("This build goal is not set up to be completed based on the build node. %j", sdmGoal.fulfillment);
                    return automation_client_1.Success;
                }
                automation_client_1.logger.info("Updating build goal: %s", buildGoal.context);
                yield setBuiltContext(ctx, buildGoal, sdmGoal, build.status, build.buildUrl);
            }));
            if (build.status === "failed" && build.buildUrl) {
                const ac = addressChannels_1.addressChannelsFor(commit.repo, ctx);
                yield displayBuildLogFailure(id, build, ac, params.logInterpretation);
            }
            return automation_client_1.Success;
        });
    }
};
SetGoalOnBuildComplete = __decorate([
    automation_client_1.EventHandler("Set build goal to successful on build complete, if it's side-effecting", graphQL_1.subscription("OnBuildComplete")),
    __metadata("design:paramtypes", [Array, Object])
], SetGoalOnBuildComplete);
exports.SetGoalOnBuildComplete = SetGoalOnBuildComplete;
function displayBuildLogFailure(id, build, addressChannels, logInterpretation) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildUrl = build.buildUrl;
        if (buildUrl) {
            automation_client_1.logger.info("Retrieving failed build log from " + buildUrl);
            const buildLog = (yield axios_1.default.get(buildUrl)).data;
            automation_client_1.logger.debug("Do we have a log interpretation? " + !!logInterpretation);
            const interpretation = logInterpretation && logInterpretation.logInterpreter(buildLog);
            automation_client_1.logger.debug("What did it say? " + stringify(interpretation));
            yield reportFailureInterpretationToLinkedChannels_1.reportFailureInterpretationToLinkedChannels("external-build", interpretation, { log: buildLog, url: buildUrl }, id, addressChannels);
        }
        else {
            return addressChannels("No build log detected for " + linkToSha(id));
        }
    });
}
exports.displayBuildLogFailure = displayBuildLogFailure;
function linkToSha(id) {
    return slack.url(id.url + "/tree/" + id.sha, id.sha.substr(0, 6));
}
function buildStatusToSdmGoalState(buildStatus) {
    switch (buildStatus) {
        case "passed":
            return "success";
        case "broken":
        case "failed":
        case "canceled":
            return "failure";
        default:
            return "in_process"; // in_process
    }
}
function setBuiltContext(ctx, goal, sdmGoal, state, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const newState = buildStatusToSdmGoalState(state);
        return storeGoals_1.updateGoal(ctx, sdmGoal, {
            url,
            state: newState,
            description: storeGoals_1.descriptionFromState(goal, newState),
        });
    });
}
//# sourceMappingURL=SetStatusOnBuildComplete.js.map