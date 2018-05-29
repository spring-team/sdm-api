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
const commandLine_1 = require("@atomist/automation-client/action/cli/commandLine");
/**
 * Use git to list the files changed since the given sha
 * or undefined if we cannot determine it
 * @param {GitProject} project
 * @param {string} sha
 * @return {Promise<string[]>}
 */
function filesChangedSince(project, sha) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!sha) {
            automation_client_1.logger.info(`No sha passed in on ${JSON.stringify(project.id)}: Looking for parent sha`);
            return filesChangedSinceParentCommit(project);
        }
        const command = `git diff --name-only ${sha}`;
        try {
            const cr = yield commandLine_1.runCommand(command, { cwd: project.baseDir });
            // stdout is nothing but a list of files, one per line
            automation_client_1.logger.debug(`$Output from filesChangedSince ${sha} on ${JSON.stringify(project.id)}:\n${cr.stdout}`);
            return cr.stdout.split("\n")
                .filter(n => !!n);
        }
        catch (err) {
            automation_client_1.logger.warn("Error diffing project %j since %s: %s", project.id, sha, err.message);
            return undefined;
        }
    });
}
exports.filesChangedSince = filesChangedSince;
// TODO: we should use the earliest commit in the push, and find its parent. See: https://github.com/atomist/github-sdm/issues/293
// we're using this to list changes for code reactions, and that should include all changes in the push.
function filesChangedSinceParentCommit(project) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const command = `git show --name-only ${(yield project.gitStatus()).sha}^`;
            const cr = yield commandLine_1.runCommand(command, { cwd: project.baseDir });
            // stdout starts with a line like this:
            // commit acd5f89cb2c3e96fa47ef85b32b2028ea2e045fb (origin/master, origin/HEAD)
            automation_client_1.logger.debug(`$Output from filesChangedSinceParent on ${JSON.stringify(project.id)}:\n${cr.stdout}`);
            const matches = /commit ([a-f0-9]{40})/.exec(cr.stdout);
            const sha = matches[1];
            return filesChangedSince(project, sha);
        }
        catch (err) {
            automation_client_1.logger.warn("Error diffing project %j finding parent: %s", project.id, err.message);
            return undefined;
        }
    });
}
exports.filesChangedSinceParentCommit = filesChangedSinceParentCommit;
class Rename {
    constructor(name, newName) {
        this.name = name;
        this.newName = newName;
        this.how = "renamed";
    }
}
exports.Rename = Rename;
function changesSince(project, sha) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = `git diff --name-status ${sha}`;
        const cr = yield commandLine_1.runCommand(command, { cwd: project.baseDir });
        // stdout is nothing but a list of files, one per line
        automation_client_1.logger.debug(`$Output from filesChangedSince ${sha} on ${JSON.stringify(project.id)}:\n${cr.stdout}`);
        if (1 === 1) {
            throw new Error("Not yet implemented");
        }
        return cr.stdout.split("\n")
            .filter(n => !!n);
    });
}
exports.changesSince = changesSince;
/**
 * Does a file satisfying this text exist within the set of changed files?
 * @param {string[]} changedFilePaths
 * @param {string[]} test test for the file change
 * @return {boolean}
 */
function anyFileChangedSuchThat(changedFilePaths, test) {
    return changedFilePaths.some(test);
}
exports.anyFileChangedSuchThat = anyFileChangedSuchThat;
function anyFileChangedWithExtension(changedFilePaths, extensions) {
    return anyFileChangedSuchThat(changedFilePaths, path => extensions.some(ext => path.endsWith("." + ext)));
}
exports.anyFileChangedWithExtension = anyFileChangedWithExtension;
//# sourceMappingURL=filesChangedSince.js.map