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
const gitHubPatterns_1 = require("@atomist/automation-client/operations/common/params/gitHubPatterns");
const TargetsParams_1 = require("@atomist/automation-client/operations/common/params/TargetsParams");
const BitBucketServerRepoRef_1 = require("./BitBucketServerRepoRef");
/**
 * Base parameters for working with GitHub repo(s).
 * Allows use of regex.
 */
let BitBucketTargetsParams = class BitBucketTargetsParams extends TargetsParams_1.TargetsParams {
    constructor() {
        super();
        this.sha = "master";
        this.repos = ".*";
    }
    get credentials() {
        throw new Error("Must be overridden");
    }
    /**
     * Return a single RepoRef or undefined if we're not identifying a single repo
     * @return {RepoRef}
     */
    get repoRef() {
        return (!!this.owner && !!this.repo && !this.usesRegex) ?
            new BitBucketServerRepoRef_1.BitBucketServerRepoRef(this.apiUrl, this.owner, this.repo, true, this.sha) :
            undefined;
    }
};
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubApiUrl, false),
    __metadata("design:type", String)
], BitBucketTargetsParams.prototype, "apiUrl", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubOwner, false),
    __metadata("design:type", String)
], BitBucketTargetsParams.prototype, "owner", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.GitHubRepository, false),
    __metadata("design:type", String)
], BitBucketTargetsParams.prototype, "repo", void 0);
__decorate([
    automation_client_1.Parameter(Object.assign({ description: "Branch or ref. Defaults to 'master'" }, gitHubPatterns_1.GitBranchRegExp, { required: false })),
    __metadata("design:type", String)
], BitBucketTargetsParams.prototype, "sha", void 0);
__decorate([
    automation_client_1.Parameter({ description: "regex", required: false }),
    __metadata("design:type", String)
], BitBucketTargetsParams.prototype, "repos", void 0);
BitBucketTargetsParams = __decorate([
    automation_client_1.Parameters(),
    __metadata("design:paramtypes", [])
], BitBucketTargetsParams);
exports.BitBucketTargetsParams = BitBucketTargetsParams;
//# sourceMappingURL=BitBucketTargetsParams.js.map