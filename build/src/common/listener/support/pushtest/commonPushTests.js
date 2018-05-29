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
const projectUtils_1 = require("@atomist/automation-client/project/util/projectUtils");
const ghub_1 = require("../../../../util/github/ghub");
const PushTest_1 = require("../../PushTest");
exports.ToDefaultBranch = PushTest_1.pushTest("Push to default branch", (p) => __awaiter(this, void 0, void 0, function* () {
    return p.push.branch === p.push.repo.defaultBranch ||
        ((!p.push.repo.defaultBranch || p.push.repo.defaultBranch.length === 0) && p.push.branch === "master");
}));
/**
 * Is this a push originated by Atomist? Note that we can't look at the committer,
 * as if a user invoked a command handler, their credentials will be used
 * @param {PushListenerInvocation} p
 * @return {boolean}
 * @constructor
 */
exports.FromAtomist = PushTest_1.pushTest("Push from Atomist", (p) => __awaiter(this, void 0, void 0, function* () { return p.push.after.message.includes("[atomist]"); }));
/**
 * Match on any push
 * @param {PushListenerInvocation} p
 * @constructor
 */
exports.AnyPush = PushTest_1.pushTest("Any push", (p) => __awaiter(this, void 0, void 0, function* () { return true; }));
/**
 * Match only pushes on a public repo
 * @param {PushListenerInvocation} p
 * @return {Promise<boolean>}
 * @constructor
 */
exports.ToPublicRepo = PushTest_1.pushTest("To public repo", (p) => __awaiter(this, void 0, void 0, function* () { 
// Ask GitHub if the repo is public as we do not have this information in our model
return GitHubRepoRef_1.isGitHubRepoRef(p.id) && ghub_1.isPublicRepo(p.credentials, p.id); }));
/**
 * Return a PushTest testing for the existence of the given file
 * @param {string} path
 * @return {PushTest}
 */
function hasFile(path) {
    return PushTest_1.predicatePushTest(`HasFile(${path}})`, (p) => __awaiter(this, void 0, void 0, function* () { return !!(yield p.getFile(path)); }));
}
exports.hasFile = hasFile;
/**
 * Return a PushTest testing for the existence of the given file containing the pattern
 * @param {string} path
 * @param pattern regex to look for
 * @return {PushTest}
 */
function hasFileContaining(path, pattern) {
    return PushTest_1.predicatePushTest(`HasFile(${path}} containing ${pattern.source})`, (p) => __awaiter(this, void 0, void 0, function* () {
        const f = yield p.getFile(path);
        if (!f) {
            return false;
        }
        const content = yield f.getContent();
        return pattern.test(content);
    }));
}
exports.hasFileContaining = hasFileContaining;
/**
 * Is there at least one file with the given extension?
 * @param {string} extension
 * @return {PredicatePushTest}
 */
function hasFileWithExtension(extension) {
    return PushTest_1.predicatePushTest(`HasFileWithExtension(${extension}})`, (p) => __awaiter(this, void 0, void 0, function* () { return projectUtils_1.fileExists(p, `**/*.${extension}`, () => true); }));
}
exports.hasFileWithExtension = hasFileWithExtension;
//# sourceMappingURL=commonPushTests.js.map