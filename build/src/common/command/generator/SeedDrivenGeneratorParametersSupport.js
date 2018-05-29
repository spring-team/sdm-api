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
const decorators_1 = require("@atomist/automation-client/decorators");
const gitHubPatterns_1 = require("@atomist/automation-client/operations/common/params/gitHubPatterns");
const GitHubRepoCreationParameters_1 = require("@atomist/automation-client/operations/generate/GitHubRepoCreationParameters");
const commonPatterns_1 = require("../support/commonPatterns");
/**
 * Convenient base class for project generator parameters.
 */
let SeedDrivenGeneratorParametersSupport = class SeedDrivenGeneratorParametersSupport {
    constructor(config) {
        this.config = config;
        this.addAtomistWebhook = false;
        this.version = "0.1.0-SNAPSHOT";
        this.target = new GitHubRepoCreationParameters_1.GitHubRepoCreationParameters();
        this.addAtomistWebhook = config.addAtomistWebhook;
    }
    get description() {
        return this.target.description;
    }
    /**
     * Resolve the seed repo
     * @return {RemoteLocator}
     */
    get source() {
        const repoRef = this.config.seed;
        repoRef.repo = this.seed || repoRef.repo;
        return { repoRef };
    }
};
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.SlackUserName),
    __metadata("design:type", String)
], SeedDrivenGeneratorParametersSupport.prototype, "screenName", void 0);
__decorate([
    automation_client_1.Parameter({
        pattern: /^(?:true|false)$/,
        type: "boolean",
        displayName: "Add Atomist webhook",
        description: "whether to add the Atomist webhook to the repository to allow updates",
        validInput: "'true' or 'false'",
        required: false,
        displayable: true,
    }),
    __metadata("design:type", Boolean)
], SeedDrivenGeneratorParametersSupport.prototype, "addAtomistWebhook", void 0);
__decorate([
    automation_client_1.Parameter(Object.assign({}, commonPatterns_1.SemVerRegExp, { required: true, order: 52 })),
    __metadata("design:type", String)
], SeedDrivenGeneratorParametersSupport.prototype, "version", void 0);
__decorate([
    automation_client_1.Parameter(Object.assign({ displayName: "Seed repo", description: "Seed repo" }, gitHubPatterns_1.GitHubNameRegExp, { minLength: 1, maxLength: 50, required: false })),
    __metadata("design:type", String)
], SeedDrivenGeneratorParametersSupport.prototype, "seed", void 0);
__decorate([
    automation_client_1.MappedParameter(automation_client_1.MappedParameters.SlackTeam),
    __metadata("design:type", String)
], SeedDrivenGeneratorParametersSupport.prototype, "slackTeam", void 0);
SeedDrivenGeneratorParametersSupport = __decorate([
    decorators_1.Parameters(),
    __metadata("design:paramtypes", [Object])
], SeedDrivenGeneratorParametersSupport);
exports.SeedDrivenGeneratorParametersSupport = SeedDrivenGeneratorParametersSupport;
//# sourceMappingURL=SeedDrivenGeneratorParametersSupport.js.map