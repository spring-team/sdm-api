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
const stringify = require("json-stringify-safe");
const SetGoalsOnPush_1 = require("./SetGoalsOnPush");
let ResetGoalsParameters = class ResetGoalsParameters {
};
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.UserToken),
    __metadata("design:type", String)
], ResetGoalsParameters.prototype, "githubToken", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubOwner),
    __metadata("design:type", String)
], ResetGoalsParameters.prototype, "owner", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepository),
    __metadata("design:type", String)
], ResetGoalsParameters.prototype, "repo", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepositoryProvider),
    __metadata("design:type", String)
], ResetGoalsParameters.prototype, "providerId", void 0);
__decorate([
    automation_client_1.Parameter({ required: false }),
    __metadata("design:type", String)
], ResetGoalsParameters.prototype, "sha", void 0);
__decorate([
    automation_client_1.Parameter({ required: false }),
    __metadata("design:type", String)
], ResetGoalsParameters.prototype, "branch", void 0);
ResetGoalsParameters = __decorate([
    decorators_1.Parameters()
], ResetGoalsParameters);
exports.ResetGoalsParameters = ResetGoalsParameters;
function resetGoalsCommand(rules) {
    return onCommand_1.commandHandlerFrom(resetGoalsOnCommit(rules), ResetGoalsParameters, "ResetGoalsOnCommit", "Set goals", "reset goals");
}
exports.resetGoalsCommand = resetGoalsCommand;
function resetGoalsOnCommit(rules) {
    const { projectLoader, goalsListeners, goalSetters, implementationMapping } = rules;
    return (ctx, commandParams) => __awaiter(this, void 0, void 0, function* () {
        // figure out which commit
        const repoData = yield fetchDefaultBranchTip(ctx, commandParams);
        const branch = commandParams.branch || repoData.defaultBranch;
        const sha = commandParams.sha || tipOfBranch(repoData, branch);
        const id = GitHubRepoRef_1.GitHubRepoRef.from({ owner: commandParams.owner, repo: commandParams.repo, sha, branch });
        const push = yield fetchPushForCommit(ctx, id, commandParams.providerId);
        const credentials = { token: commandParams.githubToken };
        const goals = yield SetGoalsOnPush_1.chooseAndSetGoals({
            projectLoader,
            goalsListeners,
            goalSetters,
            implementationMapping,
        }, {
            context: ctx,
            credentials,
            push,
        });
        if (goals) {
            yield ctx.messageClient.respond(`Set goals on ${sha} to ${goals.name}`);
        }
        else {
            yield ctx.messageClient.respond(`No goals found for ${sha}`);
        }
        return automation_client_1.Success;
    });
}
function fetchPushForCommit(context, id, providerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commitResult = yield context.graphClient.query({
            name: "PushForCommit", variables: {
                owner: id.owner, repo: id.repo, providerId, branch: id.branch, sha: id.sha,
            },
        });
        if (!commitResult || !commitResult.Commit || commitResult.Commit.length === 0) {
            throw new Error("Could not find commit for " + stringify(id));
        }
        const commit = commitResult.Commit[0];
        if (!commit.pushes || commit.pushes.length === 0) {
            throw new Error("Could not find push for " + stringify(id));
        }
        return commit.pushes[0];
    });
}
exports.fetchPushForCommit = fetchPushForCommit;
function fetchDefaultBranchTip(ctx, repositoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ctx.graphClient.query({ name: "RepoBranchTips", variables: { name: repositoryId.repo, owner: repositoryId.owner } });
        if (!result || !result.Repo || result.Repo.length === 0) {
            throw new Error(`Repository not found: ${repositoryId.owner}/${repositoryId.repo}`);
        }
        const repo = result.Repo.find(r => r.org.provider.providerId === repositoryId.providerId);
        if (!repo) {
            throw new Error(`Repository not found: ${repositoryId.owner}/${repositoryId.repo} provider ${repositoryId.providerId}`);
        }
        return repo;
    });
}
exports.fetchDefaultBranchTip = fetchDefaultBranchTip;
function tipOfBranch(repo, branchName) {
    const branchData = repo.branches.find(b => b.name === branchName);
    if (!branchData) {
        throw new Error("Branch not found: " + branchName);
    }
    return branchData.commit.sha;
}
exports.tipOfBranch = tipOfBranch;
//# sourceMappingURL=resetGoals.js.map