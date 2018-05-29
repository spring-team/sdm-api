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
const _ = require("lodash");
const repoRef_1 = require("../../util/git/repoRef");
const ghub_1 = require("../../util/github/ghub");
const SetStatusOnBuildComplete_1 = require("../events/delivery/build/SetStatusOnBuildComplete");
let DisplayBuildLogParameters = class DisplayBuildLogParameters {
};
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.UserToken),
    __metadata("design:type", String)
], DisplayBuildLogParameters.prototype, "githubToken", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubOwner),
    __metadata("design:type", String)
], DisplayBuildLogParameters.prototype, "owner", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepository),
    __metadata("design:type", String)
], DisplayBuildLogParameters.prototype, "repo", void 0);
__decorate([
    automation_client_1.Parameter({ required: false }),
    __metadata("design:type", String)
], DisplayBuildLogParameters.prototype, "sha", void 0);
DisplayBuildLogParameters = __decorate([
    decorators_1.Parameters()
], DisplayBuildLogParameters);
exports.DisplayBuildLogParameters = DisplayBuildLogParameters;
function displayBuildLogForCommit(interpreter) {
    return (ctx, params) => __awaiter(this, void 0, void 0, function* () {
        const sha = params.sha ? params.sha :
            yield ghub_1.tipOfDefaultBranch(params.githubToken, new GitHubRepoRef_1.GitHubRepoRef(params.owner, params.repo)); // TODO: use fetchDefaultBranchTip
        const id = repoRef_1.toRemoteRepoRef(params, { sha });
        const ac = (msg, opts) => ctx.messageClient.respond(msg, opts);
        const build = yield fetchBuildUrl(ctx, id);
        yield SetStatusOnBuildComplete_1.displayBuildLogFailure(id, build, ac, interpreter);
        yield ctx.messageClient.respond(":heavy_check_mark: Build log displayed for " + sha);
        return automation_client_1.Success;
    });
}
function fetchBuildUrl(context, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryResult = yield context.graphClient.query({
            name: "BuildUrlBySha",
            variables: { sha: id.sha },
        });
        const commit = _.get(queryResult, "Commit[0]");
        if (!commit) {
            throw new Error("No commit found for " + id.sha);
        }
        if (!commit.builds || commit.builds.length === 0) {
            throw new Error("No builds found for commit " + id.sha);
        }
        return queryResult.Commit[0].builds.sort((b1, b2) => b2.timestamp.localeCompare(b1.timestamp))[0];
    });
}
function displayBuildLogHandler(logInterpretation) {
    return onCommand_1.commandHandlerFrom(displayBuildLogForCommit(logInterpretation), DisplayBuildLogParameters, "DisplayBuildLog", "interpret and report on a build log", "show build log");
}
exports.displayBuildLogHandler = displayBuildLogHandler;
//# sourceMappingURL=ShowBuildLog.js.map