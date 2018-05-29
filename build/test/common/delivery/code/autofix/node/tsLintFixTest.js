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
const InMemoryFile_1 = require("@atomist/automation-client/project/mem/InMemoryFile");
const ActionResult_1 = require("@atomist/automation-client/action/ActionResult");
const GitCommandGitProject_1 = require("@atomist/automation-client/project/git/GitCommandGitProject");
const assert = require("power-assert");
const executeAutofixes_1 = require("../../../../../../src/common/delivery/code/autofix/executeAutofixes");
const tslint_1 = require("../../../../../../src/common/delivery/code/autofix/node/tslint");
const fakeRunWithLogContext_1 = require("../../../../../../src/util/test/fakeRunWithLogContext");
const SingleProjectLoader_1 = require("../../../../../../src/util/test/SingleProjectLoader");
describe("tsLintFix", () => {
    it("should lint and make fixes", () => __awaiter(this, void 0, void 0, function* () {
        const p = yield GitCommandGitProject_1.GitCommandGitProject.cloned({ token: null }, new GitHubRepoRef_1.GitHubRepoRef("atomist", "tree-path-ts"));
        // Make commit and push harmless
        p.commit = () => __awaiter(this, void 0, void 0, function* () {
            return ActionResult_1.successOn(p);
        });
        p.push = () => __awaiter(this, void 0, void 0, function* () {
            return ActionResult_1.successOn(p);
        });
        const f = new InMemoryFile_1.InMemoryFile("src/bad.ts", "const foo\n\n");
        const pl = new SingleProjectLoader_1.SingleProjectLoader(p);
        // Now mess it up with a lint error
        yield p.addFile(f.path, f.content);
        assert(!!p.findFileSync(f.path));
        yield executeAutofixes_1.executeAutofixes(pl, [tslint_1.tslintFix])(fakeRunWithLogContext_1.fakeRunWithLogContext(p.id));
        const fileNow = p.findFileSync(f.path);
        assert(!!fileNow);
        assert(fileNow.getContentSync().startsWith("const foo;"));
    })).timeout(90000);
});
//# sourceMappingURL=tsLintFixTest.js.map