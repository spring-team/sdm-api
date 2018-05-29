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
const gitHub_1 = require("@atomist/automation-client/util/gitHub");
const dryRunEditor_1 = require("../../../common/command/editor/dry-run/dryRunEditor");
const repoRef_1 = require("../../../util/git/repoRef");
const ghub_1 = require("../../../util/github/ghub");
/**
 * React to to result of a dry run build to raise a PR or issue
 */
let OnDryRunBuildComplete = class OnDryRunBuildComplete {
    handle(event, ctx, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const build = event.data.Build[0];
            const commit = build.commit;
            // TODO currently Github only
            const id = repoRef_1.toRemoteRepoRef(commit.repo, { sha: commit.sha });
            const branch = build.commit.pushes[0].branch;
            automation_client_1.logger.debug("Assessing dry run for %j: Statuses=%j", id, commit.statuses);
            const dryRunStatus = commit.statuses.find(s => s.context === dryRunEditor_1.DryRunContext);
            if (!dryRunStatus || dryRunStatus.state !== "pending") { // this could be any kind of pending, dunno
                automation_client_1.logger.debug("Not a dry run build on %j: Statuses=%j", id, commit.statuses);
                return automation_client_1.Success;
            }
            if (build.status === "passed") {
                automation_client_1.logger.info("Raising PR for successful dry run on %j", id);
                yield id.raisePullRequest({ token: params.githubToken }, dryRunStatus.description, dryRunStatus.description, branch, "master");
                yield ghub_1.createStatus(params.githubToken, id, {
                    context: dryRunEditor_1.DryRunContext,
                    target_url: dryRunStatus.targetUrl,
                    description: dryRunStatus.description,
                    state: "success",
                });
            }
            else if (build.status === "failed" || build.status === "broken") {
                automation_client_1.logger.info("Raising issue for failed dry run on %j on branch %s,", id, branch);
                let body = "Details:\n\n";
                body += !!build.buildUrl ? `[Build log](${build.buildUrl})` : "No build log available";
                body += `\n\n[Branch with failure](${id.url}/tree/${branch} "Failing branch ${branch}")`;
                yield gitHub_1.raiseIssue(params.githubToken, id, {
                    title: `Failed to ${dryRunStatus.description}`,
                    body,
                });
                yield ghub_1.createStatus(params.githubToken, id, {
                    context: dryRunEditor_1.DryRunContext,
                    target_url: dryRunStatus.targetUrl,
                    description: dryRunStatus.description,
                    state: "failure",
                });
            }
            return automation_client_1.Success;
        });
    }
};
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.OrgToken),
    __metadata("design:type", String)
], OnDryRunBuildComplete.prototype, "githubToken", void 0);
OnDryRunBuildComplete = __decorate([
    automation_client_1.EventHandler("React to result of a dry run build", graphQL_1.subscription("OnBuildCompleteForDryRun"))
], OnDryRunBuildComplete);
exports.OnDryRunBuildComplete = OnDryRunBuildComplete;
//# sourceMappingURL=OnDryRunBuildComplete.js.map