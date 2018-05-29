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
const graphQL_1 = require("@atomist/automation-client/graph/graphQL");
const fetchGoalsOnCommit_1 = require("../../../../common/delivery/goals/support/fetchGoalsOnCommit");
const gitHubStatusSetters_1 = require("../../../../common/delivery/goals/support/github/gitHubStatusSetters");
const LoggingProgressLog_1 = require("../../../../common/log/LoggingProgressLog");
const WriteToAllProgressLog_1 = require("../../../../common/log/WriteToAllProgressLog");
const addressChannels_1 = require("../../../../common/slack/addressChannels");
const repoRef_1 = require("../../../../util/git/repoRef");
const gitHubProvider_1 = require("../../../../util/github/gitHubProvider");
const executeGoal_1 = require("./executeGoal");
/**
 * Handle an SDM request goal. Used for many implementation types.
 */
class FulfillGoalOnRequested {
    constructor(implementationMapper, projectLoader, logFactory) {
        this.implementationMapper = implementationMapper;
        this.projectLoader = projectLoader;
        this.logFactory = logFactory;
        // public secrets = [{name: "githubToken", uri: Secrets.OrgToken}];
        this.values = [{ path: "token", name: "githubToken", required: true }];
        const implementationName = "FulfillGoal";
        this.subscriptionName = "OnAnyRequestedSdmGoal";
        this.subscription =
            graphQL_1.subscription({ name: "OnAnyRequestedSdmGoal" });
        this.name = implementationName + "OnAnyRequestedSdmGoal";
        this.description = `Fulfill a goal when it reaches 'requested' state`;
    }
    handle(event, ctx, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sdmGoal = event.data.SdmGoal[0];
            const commit = yield fetchGoalsOnCommit_1.fetchCommitForSdmGoal(ctx, sdmGoal);
            const status = convertForNow(sdmGoal, commit);
            // this should not happen but it does: automation-api#395
            if (sdmGoal.state !== "requested") {
                automation_client_1.logger.warn(`Goal ${sdmGoal.name}: Received '${sdmGoal.state}' on ${status.context}, while looking for 'requested'`);
                return automation_client_1.Success;
            }
            if (sdmGoal.fulfillment.method !== "SDM fulfill on requested") {
                automation_client_1.logger.info("Goal %s: Implementation method is '%s'; not fulfilling", sdmGoal.name, sdmGoal.fulfillment.method);
                return automation_client_1.Success;
            }
            automation_client_1.logger.info("Executing FulfillGoalOnRequested with '%s'", sdmGoal.fulfillment.name); // take this out when automation-api#395 is fixed
            const { goal, goalExecutor, logInterpreter } = this.implementationMapper.findImplementationBySdmGoal(sdmGoal);
            const log = yield this.logFactory(ctx, sdmGoal);
            const progressLog = new WriteToAllProgressLog_1.WriteToAllProgressLog(sdmGoal.name, new LoggingProgressLog_1.LoggingProgressLog(sdmGoal.name, "debug"), log);
            const addressChannels = addressChannels_1.addressChannelsFor(commit.repo, ctx);
            const id = repoRef_1.repoRefFromSdmGoal(sdmGoal, yield gitHubProvider_1.fetchProvider(ctx, sdmGoal.repo.providerId));
            const credentials = { token: params.githubToken };
            const rwlc = { status, progressLog, context: ctx, addressChannels, id, credentials };
            const isolatedGoalLauncher = this.implementationMapper.getIsolatedGoalLauncher();
            if (goal.definition.isolated && !process.env.ATOMIST_ISOLATED_GOAL && isolatedGoalLauncher) {
                return isolatedGoalLauncher(sdmGoal, ctx, progressLog);
            }
            else {
                delete sdmGoal.id;
                return executeGoal_1.executeGoal({ projectLoader: params.projectLoader }, goalExecutor, rwlc, sdmGoal, goal, logInterpreter)
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    yield progressLog.close();
                    return res;
                }), (err) => __awaiter(this, void 0, void 0, function* () {
                    yield progressLog.close();
                    throw err;
                }));
            }
        });
    }
}
exports.FulfillGoalOnRequested = FulfillGoalOnRequested;
function convertForNow(sdmGoal, commit) {
    return {
        commit,
        state: gitHubStatusSetters_1.sdmGoalStateToGitHubStatusState(sdmGoal.state),
        targetUrl: sdmGoal.url,
        context: sdmGoal.externalKey,
        description: sdmGoal.description,
    };
}
//# sourceMappingURL=FulfillGoalOnRequested.js.map