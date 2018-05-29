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
const automation_client_1 = require("@atomist/automation-client");
/**
 * Execute build with the appropriate builder
 * @param projectLoader used to load projects
 * @param builder builder to user
 */
function executeBuild(projectLoader, builder) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { status, credentials, id, context, progressLog, addressChannels } = rwlc;
        const commit = status.commit;
        automation_client_1.logger.info("Building project %s:%s with builder [%s]", id.owner, id.repo, builder.name);
        // the builder is expected to result in a complete Build event (which will update the build status)
        // and an ImageLinked event (which will update the artifact status).
        return builder.initiateBuild(credentials, id, addressChannels, {
            name: commit.repo.name,
            owner: commit.repo.owner,
            providerId: commit.repo.org.provider.providerId,
            branch: branchFromCommit(commit),
            defaultBranch: commit.repo.defaultBranch,
            sha: commit.sha,
        }, progressLog, context);
    });
}
exports.executeBuild = executeBuild;
function branchFromCommit(commit) {
    const allBranchesThisCommitIsOn = commit.pushes.map(p => p.branch);
    const theDefaultBranchIfThisCommitIsOnIt = allBranchesThisCommitIsOn.find(b => b === commit.repo.defaultBranch);
    const someBranchIDoNotReallyCare = allBranchesThisCommitIsOn.find(b => true);
    const branchToMarkTheBuildWith = theDefaultBranchIfThisCommitIsOnIt || someBranchIDoNotReallyCare || "master";
    return branchToMarkTheBuildWith;
}
exports.branchFromCommit = branchFromCommit;
//# sourceMappingURL=executeBuild.js.map