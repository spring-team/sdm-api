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
const wellKnownGoals_1 = require("../../../../blueprint/wellKnownGoals");
const addressChannels_1 = require("../../../../common/slack/addressChannels");
const repoRef_1 = require("../../../../util/git/repoRef");
/**
 * React to a deployment.
 */
let OnDeployStatus = class OnDeployStatus {
    constructor(listeners, credentialsFactory) {
        this.listeners = listeners;
        this.credentialsFactory = credentialsFactory;
    }
    handle(event, context, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = event.data.Status[0];
            const commit = status.commit;
            if (status.context !== wellKnownGoals_1.StagingDeploymentGoal.context) {
                automation_client_1.logger.debug(`********* OnDeploy got called with status context=[${status.context}]`);
                return automation_client_1.Success;
            }
            const addressChannels = addressChannels_1.addressChannelsFor(commit.repo, context);
            const id = repoRef_1.toRemoteRepoRef(commit.repo, { sha: commit.sha });
            const credentials = this.credentialsFactory.eventHandlerCredentials(context, id);
            const dil = {
                context,
                status,
                id,
                addressChannels,
                credentials,
            };
            yield Promise.all(params.listeners.map(l => l(dil)));
            return automation_client_1.Success;
        });
    }
};
OnDeployStatus = __decorate([
    automation_client_1.EventHandler("React to a successful deployment", graphQL_1.subscription({
        name: "OnSuccessStatus",
        variables: {
            context: wellKnownGoals_1.StagingDeploymentGoal.context,
        },
    })),
    __metadata("design:paramtypes", [Array, Object])
], OnDeployStatus);
exports.OnDeployStatus = OnDeployStatus;
//# sourceMappingURL=OnDeployStatus.js.map