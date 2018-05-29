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
const computeFingerprints_1 = require("../../../../../src/common/delivery/code/fingerprint/computeFingerprints");
const RepoId_1 = require("@atomist/automation-client/operations/common/RepoId");
const InMemoryFile_1 = require("@atomist/automation-client/project/mem/InMemoryFile");
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const MavenFingerprinter_1 = require("../../../../../src/common/delivery/code/fingerprint/maven/MavenFingerprinter");
const sha_1 = require("../../../../../src/util/misc/sha");
describe("computeFingerprints", () => {
    it("should execute none", () => __awaiter(this, void 0, void 0, function* () {
        const cri = null;
        const r = yield computeFingerprints_1.computeFingerprints(cri, []);
        assert.equal(r.length, 0);
    }));
    it("should execute one against empty project", () => __awaiter(this, void 0, void 0, function* () {
        const cri = { project: InMemoryProject_1.InMemoryProject.of() };
        const r = yield computeFingerprints_1.computeFingerprints(cri, [new MavenFingerprinter_1.MavenFingerprinter().action]);
        assert.equal(r.length, 0);
    }));
    it("should fingerprint with one", () => __awaiter(this, void 0, void 0, function* () {
        const cri = {
            project: InMemoryProject_1.InMemoryProject.from(new RepoId_1.SimpleRepoId("a", "b"), new InMemoryFile_1.InMemoryFile("thing", "1")),
        };
        const r = yield computeFingerprints_1.computeFingerprints(cri, [(i) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    name: "foo",
                    data: i.project.id.owner,
                    sha: sha_1.computeShaOf(i.project.id.owner),
                    abbreviation: "xkc",
                    version: "1.0",
                });
            })]);
        assert.equal(r.length, 1);
        assert.equal(r[0].data, "a");
    }));
});
//# sourceMappingURL=computeFingerprintsTest.js.map