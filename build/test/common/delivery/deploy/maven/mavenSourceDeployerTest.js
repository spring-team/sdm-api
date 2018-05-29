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
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const mavenSourceDeployer_1 = require("../../../../../src/common/delivery/deploy/local/maven/mavenSourceDeployer");
const LoggingProgressLog_1 = require("../../../../../src/common/log/LoggingProgressLog");
const SingleProjectLoader_1 = require("../../../../../src/util/test/SingleProjectLoader");
describe("mavenSourceDeployer", () => {
    it("should fail to deploy non Maven", () => __awaiter(this, void 0, void 0, function* () {
        const id = GitHubRepoRef_1.GitHubRepoRef.from({ owner: "spring-team", repo: "spring-rest-seed", branch: "master" });
        const p = InMemoryProject_1.InMemoryProject.from(id);
        const deployer = mavenSourceDeployer_1.mavenDeployer(new SingleProjectLoader_1.SingleProjectLoader(p), {
            baseUrl: "http://127.0.0.1",
            commandLineArgumentsFor: () => [],
            successPatterns: [/Started [A-Za-z0-9_$]+ in [0-9].[0-9]+ seconds/],
        });
        try {
            yield deployer.deploy({ id, name: "spring-rest-seed", version: "0.1.0" }, {
                name: "foo",
                description: "whatever",
                managedDeploymentKey: id,
            }, new LoggingProgressLog_1.LoggingProgressLog("test"), { token: process.env.GITHUB_TOKEN }, "T123");
            assert.fail("Should have failed");
        }
        catch (err) {
            // Ok
        }
    })).timeout(300000);
    // TODO figure out why this doesn't terminate
    it.skip("should deploy valid Maven", () => __awaiter(this, void 0, void 0, function* () {
        const credentials = { token: process.env.GITHUB_TOKEN };
        const id = GitHubRepoRef_1.GitHubRepoRef.from({ owner: "atomist-seeds", repo: "spring-rest-seed", branch: "master" });
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned(credentials, id);
        const deployer = mavenSourceDeployer_1.mavenDeployer(new SingleProjectLoader_1.SingleProjectLoader(p), {
            baseUrl: "http://127.0.0.1",
            lowerPort: 10000,
            commandLineArgumentsFor: () => [`-Dserver.port=10000`],
            successPatterns: [/Started [A-Za-z0-9_$]+ in [0-9].[0-9]+ seconds/],
        });
        const deployed = yield deployer.deploy({ id, name: "spring-rest-seed", version: "0.1.0" }, {
            name: "foo",
            description: "whatever",
            managedDeploymentKey: id,
        }, new LoggingProgressLog_1.LoggingProgressLog("test", "info"), credentials, "T123");
        assert.equal(deployed.length, 1);
        yield deployed[0].childProcess.kill();
    })); // .timeout(300000);
});
//# sourceMappingURL=mavenSourceDeployerTest.js.map