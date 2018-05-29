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
const decorators_1 = require("@atomist/automation-client/decorators");
const onCommand_1 = require("@atomist/automation-client/onCommand");
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const resetGoals_1 = require("../events/delivery/goals/resetGoals");
const SetGoalsOnPush_1 = require("../events/delivery/goals/SetGoalsOnPush");
let DisposeParameters = class DisposeParameters {
};
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.UserToken),
    __metadata("design:type", String)
], DisposeParameters.prototype, "githubToken", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubOwner),
    __metadata("design:type", String)
], DisposeParameters.prototype, "owner", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepository),
    __metadata("design:type", String)
], DisposeParameters.prototype, "repo", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepositoryProvider),
    __metadata("design:type", String)
], DisposeParameters.prototype, "providerId", void 0);
__decorate([
    automation_client_1.Parameter({ required: true }),
    __metadata("design:type", String)
], DisposeParameters.prototype, "areYouSure", void 0);
DisposeParameters = __decorate([
    decorators_1.Parameters()
], DisposeParameters);
exports.DisposeParameters = DisposeParameters;
function disposeCommand(rules) {
    return onCommand_1.commandHandlerFrom(disposeOfProject(rules), DisposeParameters, "DisposeOfProject", "Remove this project from existence", ["dispose of this project", "exterminate"]);
}
exports.disposeCommand = disposeCommand;
function disposeOfProject(rules) {
    return (ctx, commandParams) => __awaiter(this, void 0, void 0, function* () {
        if (commandParams.areYouSure.toLowerCase() !== "yes") {
            return ctx.messageClient.respond("You didn't say 'yes' to 'are you sure?' so I won't do anything.")
                .then(automation_client_1.success);
        }
        const repoData = yield resetGoals_1.fetchDefaultBranchTip(ctx, commandParams);
        const branch = repoData.defaultBranch;
        const sha = resetGoals_1.tipOfBranch(repoData, branch);
        const id = GitHubRepoRef_1.GitHubRepoRef.from({ owner: commandParams.owner, repo: commandParams.repo, sha, branch });
        const push = yield resetGoals_1.fetchPushForCommit(ctx, id, commandParams.providerId);
        const determinedGoals = yield SetGoalsOnPush_1.chooseAndSetGoals(rules, {
            context: ctx,
            credentials: { token: commandParams.githubToken },
            push,
        });
        if (!determinedGoals) {
            yield ctx.messageClient.respond("I don't know how to dispose of this project.");
        }
        return automation_client_1.Success;
    });
}
//# sourceMappingURL=disposeCommand.js.map