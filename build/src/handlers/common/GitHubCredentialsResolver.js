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
class GitHubCredentialsResolver {
    eventHandlerCredentials() {
        if (!this.githubToken) {
            throw new Error("githubToken has not been injected");
        }
        return { token: this.githubToken };
    }
    commandHandlerCredentials() {
        if (!this.githubToken) {
            throw new Error("githubToken has not been injected");
        }
        return { token: this.githubToken };
    }
}
__decorate([
    automation_client_1.Secret(automation_client_1.Secrets.OrgToken),
    __metadata("design:type", String)
], GitHubCredentialsResolver.prototype, "githubToken", void 0);
exports.GitHubCredentialsResolver = GitHubCredentialsResolver;
//# sourceMappingURL=GitHubCredentialsResolver.js.map