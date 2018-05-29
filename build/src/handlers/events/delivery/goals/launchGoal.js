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
const configuration_1 = require("@atomist/automation-client/configuration");
const ApolloGraphClient_1 = require("@atomist/automation-client/graph/ApolloGraphClient");
const string_1 = require("@atomist/automation-client/internal/util/string");
const AutomationEventListener_1 = require("@atomist/automation-client/server/AutomationEventListener");
const GraphClient_1 = require("@atomist/automation-client/spi/graph/GraphClient");
const cluster = require("cluster");
const FulfillGoalOnRequested_1 = require("./FulfillGoalOnRequested");
class GoalAutomationEventListener extends AutomationEventListener_1.AutomationEventListenerSupport {
    constructor(implementationMapper, projectLoader, logFactory) {
        super();
        this.implementationMapper = implementationMapper;
        this.projectLoader = projectLoader;
        this.logFactory = logFactory;
    }
    eventIncoming(payload) {
        if (cluster.isWorker) {
            // Register event handler locally only
            const maker = () => new FulfillGoalOnRequested_1.FulfillGoalOnRequested(this.implementationMapper, this.projectLoader, this.logFactory);
            automation_client_1.automationClientInstance().withEventHandler(maker);
        }
    }
    registrationSuccessful(eventHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cluster.isMaster) {
                const registration = eventHandler.registration;
                const teamId = process.env.ATOMIST_GOAL_TEAM;
                const teamName = process.env.ATOMIST_GOAL_TEAM_NAME || teamId;
                const goalId = process.env.ATOMIST_GOAL_ID;
                const correlationId = process.env.ATOMIST_CORRELATION_ID || string_1.guid();
                // Obtain goal via graphql query
                const graphClient = new ApolloGraphClient_1.ApolloGraphClient(`https://automation.atomist.com/graphql/team/${teamId}`, { Authorization: `Bearer ${registration.jwt}` });
                const goal = yield graphClient.query({
                    name: "SdmGoalById",
                    variables: {
                        id: goalId,
                    },
                    options: GraphClient_1.QueryNoCacheOptions,
                });
                // Register event handler locally only
                const maker = () => new FulfillGoalOnRequested_1.FulfillGoalOnRequested(this.implementationMapper, this.projectLoader, this.logFactory);
                automation_client_1.automationClientInstance().withEventHandler(maker);
                // Create event and run event handler
                const event = {
                    data: goal,
                    extensions: {
                        correlation_id: correlationId,
                        team_id: teamId,
                        team_name: teamName,
                        operationName: maker().subscriptionName,
                    },
                    secrets: [{
                            uri: automation_client_1.Secrets.OrgToken,
                            value: configuration_1.configurationValue("token"),
                        }],
                };
                yield eventHandler.processEvent(event, (results) => __awaiter(this, void 0, void 0, function* () {
                    const resolved = yield results;
                    automation_client_1.logger.info("Processing goal completed with results %j", resolved);
                    setTimeout(() => process.exit(0), 10000);
                }));
            }
        });
    }
}
exports.GoalAutomationEventListener = GoalAutomationEventListener;
//# sourceMappingURL=launchGoal.js.map