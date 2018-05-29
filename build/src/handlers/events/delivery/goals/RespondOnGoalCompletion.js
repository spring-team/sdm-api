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
const RequestDownstreamGoalsOnGoalSuccess_1 = require("./RequestDownstreamGoalsOnGoalSuccess");
const automation_client_1 = require("@atomist/automation-client");
const graphQL_1 = require("@atomist/automation-client/graph/graphQL");
const fetchGoalsOnCommit_1 = require("../../../../common/delivery/goals/support/fetchGoalsOnCommit");
const addressChannels_1 = require("../../../../common/slack/addressChannels");
const repoRef_1 = require("../../../../util/git/repoRef");
/**
 * Respond to a failure or success status by running listeners
 */
let RespondOnGoalCompletion = class RespondOnGoalCompletion {
    constructor(credentialsFactory, goalCompletionListeners) {
        this.credentialsFactory = credentialsFactory;
        this.goalCompletionListeners = goalCompletionListeners;
    }
    handle(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const sdmGoal = event.data.SdmGoal[0];
            if (sdmGoal.state !== "failure" && sdmGoal.state !== "success") { // atomisthq/automation-api#395
                automation_client_1.logger.debug(`********* completion reported when the state was=[${sdmGoal.state}]`);
                return Promise.resolve(automation_client_1.Success);
            }
            const commit = yield fetchGoalsOnCommit_1.fetchCommitForSdmGoal(context, sdmGoal);
            const push = commit.pushes[0];
            const id = repoRef_1.repoRefFromPush(push);
            const allGoals = RequestDownstreamGoalsOnGoalSuccess_1.sumSdmGoalEventsByOverride(yield fetchGoalsOnCommit_1.fetchGoalsForCommit(context, id, sdmGoal.repo.providerId), [sdmGoal]);
            this.credentialsFactory.githubToken = this.token;
            const gsi = {
                id,
                context,
                credentials: this.credentialsFactory.eventHandlerCredentials(context, id),
                addressChannels: addressChannels_1.addressChannelsFor(push.repo, context),
                allGoals,
                completedGoal: sdmGoal,
            };
            yield Promise.all(this.goalCompletionListeners.map(l => l(gsi)));
            return automation_client_1.Success;
        });
    }
};
__decorate([
    automation_client_1.Value("token"),
    __metadata("design:type", String)
], RespondOnGoalCompletion.prototype, "token", void 0);
RespondOnGoalCompletion = __decorate([
    automation_client_1.EventHandler("Run a listener on goal failure or success", graphQL_1.subscription("OnAnyCompletedSdmGoal")),
    __metadata("design:paramtypes", [Object, Array])
], RespondOnGoalCompletion);
exports.RespondOnGoalCompletion = RespondOnGoalCompletion;
//# sourceMappingURL=RespondOnGoalCompletion.js.map