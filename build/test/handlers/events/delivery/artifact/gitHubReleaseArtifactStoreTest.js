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
Object.defineProperty(exports, "__esModule", { value: true });
const GitHubRepoRef_1 = require("@atomist/automation-client/operations/common/GitHubRepoRef");
const fs = require("fs");
const assert = require("power-assert");
const GitHubReleaseArtifactStore_1 = require("../../../../../src/common/artifact/github/GitHubReleaseArtifactStore");
const commandLine_1 = require("@atomist/automation-client/action/cli/commandLine");
const p = require("path");
const asset = "https://github.com/spring-team/fintan/releases/download/0.1.0-SNAPSHOT454/fintan-0.1.0-SNAPSHOT.jar";
describe("GitHubReleaseArtifactStore", () => {
    describe("checkout", () => {
        it("should checkout existing file", () => {
            const ghras = new GitHubReleaseArtifactStore_1.GitHubReleaseArtifactStore();
            const id = new GitHubRepoRef_1.GitHubRepoRef("spring-team", "fintan");
            return ghras.checkout(asset, id, { token: process.env.GITHUB_TOKEN })
                .then(da => {
                const path = `${da.cwd}/${da.filename}`;
                assert(fs.existsSync(path), `File [${path}] must exist`);
                const cwd = p.dirname(path);
                const filename = p.basename(path);
                return commandLine_1.runCommand(`unzip ${filename}`, { cwd });
            });
        }).timeout(60000);
        it("should checkout existing file and parse AppInfo", () => {
            const ghras = new GitHubReleaseArtifactStore_1.GitHubReleaseArtifactStore();
            const id = new GitHubRepoRef_1.GitHubRepoRef("spring-team", "fintan");
            return ghras.checkout(asset, id, { token: process.env.GITHUB_TOKEN })
                .then(da => {
                assert.equal(da.id.owner, id.owner);
                assert.equal(da.id.repo, id.repo);
                assert.equal(da.name, "fintan", "name should be 'fintan', not " + da.name);
                assert.equal(da.version, "0.1.0-SNAPSHOT", "version should be '0.1.0-SNAPSHOT', not " + da.version);
            });
        }).timeout(60000);
    });
});
//# sourceMappingURL=gitHubReleaseArtifactStoreTest.js.map