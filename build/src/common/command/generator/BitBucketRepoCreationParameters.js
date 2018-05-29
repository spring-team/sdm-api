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
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const NewRepoCreationParameters_1 = require("@atomist/automation-client/operations/generate/NewRepoCreationParameters");
const BitBucketServerRepoRef_1 = require("../BitBucketServerRepoRef");
// TODO could this be universal
class BitBucketRepoCreationParameters extends NewRepoCreationParameters_1.NewRepoCreationParameters {
    get credentials() {
        throw new Error("Override this");
    }
    /**
     * Return a single RepoRef or undefined if we're not identifying a single repo
     * This implementation returns a GitHub.com repo but it can be overriden
     * to return any kind of repo
     * @return {RepoRef}
     */
    get repoRef() {
        return new BitBucketServerRepoRef_1.BitBucketServerRepoRef(this.apiUrl, this.owner, this.repo, true);
    }
}
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.userToken(["repo", "user:email", "read:user"])),
    __metadata("design:type", Object)
], BitBucketRepoCreationParameters.prototype, "githubToken", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubApiUrl, false),
    __metadata("design:type", String)
], BitBucketRepoCreationParameters.prototype, "apiUrl", void 0);
exports.BitBucketRepoCreationParameters = BitBucketRepoCreationParameters;
//# sourceMappingURL=BitBucketRepoCreationParameters.js.map