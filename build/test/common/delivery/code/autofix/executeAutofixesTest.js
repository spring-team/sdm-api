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
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const executeAutofixes_1 = require("../../../../../src/common/delivery/code/autofix/executeAutofixes");
const tsPushTests_1 = require("../../../../../src/common/listener/support/pushtest/node/tsPushTests");
const fakeRunWithLogContext_1 = require("../../../../../src/util/test/fakeRunWithLogContext");
const SingleProjectLoader_1 = require("../../../../../src/util/test/SingleProjectLoader");
exports.AddThingAutofix = {
    name: "AddThing",
    pushTest: tsPushTests_1.IsTypeScript,
    action: (cri) => __awaiter(this, void 0, void 0, function* () {
        yield cri.project.addFile("thing", "1");
        return { edited: true, success: true, target: cri.project };
    }),
};
describe("executeAutofixes", () => {
    it("should execute none", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("a", "b");
        const pl = new SingleProjectLoader_1.SingleProjectLoader({ id });
        const r = yield executeAutofixes_1.executeAutofixes(pl, [])(fakeRunWithLogContext_1.fakeRunWithLogContext(id));
        assert.equal(r.code, 0);
    }));
    it("should execute header adder and find no match", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("a", "b");
        const initialContent = "public class Thing {}";
        const f = new InMemoryFile_1.InMemoryFile("src/main/java/Thing.java", initialContent);
        const p = InMemoryProject_1.InMemoryProject.from(id, f);
        const pl = new SingleProjectLoader_1.SingleProjectLoader(p);
        const r = yield executeAutofixes_1.executeAutofixes(pl, [exports.AddThingAutofix])(fakeRunWithLogContext_1.fakeRunWithLogContext(id));
        assert.equal(r.code, 0);
        assert.equal(p.findFileSync(f.path).getContentSync(), initialContent);
    }));
    it("should execute header adder and find a match and add a header", () => __awaiter(this, void 0, void 0, function* () {
        const id = new GitHubRepoRef_1.GitHubRepoRef("a", "b");
        const initialContent = "public class Thing {}";
        const f = new InMemoryFile_1.InMemoryFile("src/Thing.ts", initialContent);
        const p = InMemoryProject_1.InMemoryProject.from(id, f, { path: "LICENSE", content: "Apache License" });
        p.revert = () => __awaiter(this, void 0, void 0, function* () { return null; });
        p.gitStatus = () => __awaiter(this, void 0, void 0, function* () { return ({ isClean: false }); });
        const pl = new SingleProjectLoader_1.SingleProjectLoader(p);
        const r = yield executeAutofixes_1.executeAutofixes(pl, [exports.AddThingAutofix])(fakeRunWithLogContext_1.fakeRunWithLogContext(id));
        assert.equal(r.code, 0);
        assert(!!p);
        const foundFile = p.findFileSync("thing");
        assert(!!foundFile);
        assert.equal(foundFile.getContentSync(), "1");
    }));
});
//# sourceMappingURL=executeAutofixesTest.js.map