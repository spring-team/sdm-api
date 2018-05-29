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
const GitCommandGitProject_1 = require("@atomist/automation-client/project/git/GitCommandGitProject");
const filteredView_1 = require("../../../src/util/project/filteredView");
const fileGlobs_1 = require("@atomist/automation-client/project/fileGlobs");
const projectUtils_1 = require("@atomist/automation-client/project/util/projectUtils");
const assert = require("power-assert");
describe("filteredView", () => {
    it("should suppress sync method", () => __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned({ token: null }, new GitHubRepoRef_1.GitHubRepoRef("atomist-seeds", "spring-rest-seed"));
        const filtered = filteredView_1.filteredView(p, path => path === "pom.xml");
        assert.throws(() => filtered.addFileSync("x", "y"));
    })).timeout(10000);
    it("should not filter anything", () => __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned({ token: null }, new GitHubRepoRef_1.GitHubRepoRef("atomist-seeds", "spring-rest-seed"));
        const filtered = filteredView_1.filteredView(p, path => true);
        assert.equal(yield p.totalFileCount(), yield filtered.totalFileCount());
    })).timeout(10000);
    it("should copy one", () => __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned({ token: null }, new GitHubRepoRef_1.GitHubRepoRef("atomist-seeds", "spring-rest-seed"));
        const filtered = filteredView_1.filteredView(p, path => path === "pom.xml");
        assert.equal(1, yield filtered.totalFileCount());
        yield filtered.findFile("pom.xml");
    })).timeout(10000);
    it("should find files", () => __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned({ token: null }, new GitHubRepoRef_1.GitHubRepoRef("atomist-seeds", "spring-rest-seed"));
        const filtered = filteredView_1.filteredView(p, path => path === "pom.xml");
        const r = yield projectUtils_1.saveFromFiles(filtered, fileGlobs_1.AllFiles, f => f.path);
        assert.deepEqual(r, ["pom.xml"]);
    })).timeout(10000);
});
//# sourceMappingURL=filterTest.js.map