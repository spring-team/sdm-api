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
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const assert = require("power-assert");
const commonPushTests_1 = require("../../../../src/common/listener/support/pushtest/commonPushTests");
const credentials = { token: process.env.GITHUB_TOKEN };
describe("pushToPublicRepo", () => {
    it("should work against public repo", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("atomist", "sdm");
        const r = yield commonPushTests_1.ToPublicRepo.mapping({ id, credentials });
        assert(r);
    })).timeout(5000);
    it("should work against private repo", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("atomisthq", "internal-automation");
        const r = yield commonPushTests_1.ToPublicRepo.mapping({ id, credentials });
        assert(!r);
    })).timeout(5000);
});
//# sourceMappingURL=pushToPublicRepoTest.js.map