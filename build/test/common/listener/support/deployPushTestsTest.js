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
const string_1 = require("@atomist/automation-client/internal/util/string");
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const assert = require("power-assert");
const deployPushTests_1 = require("../../../../src/common/listener/support/pushtest/deployPushTests");
describe("deployPushTests tests thing", () => {
    describe("IsDeployEnabled", () => {
        it("should be disabled by default and correctly set parameters on the query", () => __awaiter(this, void 0, void 0, function* () {
            const pi = {
                context: {
                    graphClient: {
                        query(options) {
                            assert.equal(options.variables.owner, "atomist");
                            assert.equal(options.variables.repo, "github-sdm");
                            return {
                                SdmDeployEnablement: [],
                            };
                        },
                    },
                },
                push: {
                    repo: {
                        owner: "atomist",
                        name: "github-sdm",
                    },
                },
                id: GitHubRepoRef_1.GitHubRepoRef.from({ owner: "atomist", repo: "github-sdm" }),
            };
            const result = yield deployPushTests_1.IsDeployEnabled.mapping(pi);
            assert(!result);
        }));
        it("should be enabled correctly via setting", () => __awaiter(this, void 0, void 0, function* () {
            const pi = {
                context: {
                    graphClient: {
                        query(options) {
                            return {
                                SdmDeployEnablement: [{
                                        id: string_1.guid(),
                                        state: "requested",
                                        owner: "atomist",
                                        repo: "github-sdm",
                                        providerId: "123456",
                                    }],
                            };
                        },
                    },
                },
                push: {
                    repo: {
                        owner: "atomist",
                        name: "github-sdm",
                    },
                },
                id: GitHubRepoRef_1.GitHubRepoRef.from({ owner: "atomist", repo: "github-sdm" }),
            };
            const result = yield deployPushTests_1.IsDeployEnabled.mapping(pi);
            assert(result);
        }));
        it("should be disabled correctly via setting", () => __awaiter(this, void 0, void 0, function* () {
            const pi = {
                context: {
                    graphClient: {
                        query(options) {
                            return {
                                SdmDeployEnablement: [{
                                        id: string_1.guid(),
                                        state: "disabled",
                                        owner: "atomist",
                                        repo: "github-sdm",
                                        providerId: "123456",
                                    }],
                            };
                        },
                    },
                },
                push: {
                    repo: {
                        owner: "atomist",
                        name: "github-sdm",
                    },
                },
                id: GitHubRepoRef_1.GitHubRepoRef.from({ owner: "atomist", repo: "github-sdm" }),
            };
            const result = yield deployPushTests_1.IsDeployEnabled.mapping(pi);
            assert(!result);
        }));
    });
});
//# sourceMappingURL=deployPushTestsTest.js.map