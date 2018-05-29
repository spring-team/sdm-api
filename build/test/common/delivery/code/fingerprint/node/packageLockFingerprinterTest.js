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
const InMemoryFile_1 = require("@atomist/automation-client/project/mem/InMemoryFile");
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const PackageLockFingerprinter_1 = require("../../../../../../src/common/delivery/code/fingerprint/node/PackageLockFingerprinter");
describe("package-lock.json", () => {
    const fingerprinter = new PackageLockFingerprinter_1.PackageLockFingerprinter();
    it("should produce no fingerprint when no package-lock.json", () => __awaiter(this, void 0, void 0, function* () {
        const project = InMemoryProject_1.InMemoryProject.of();
        const cri = { project };
        const fp = yield fingerprinter.action(cri);
        assert.equal(fp.length, 0);
    }));
    it("should produce fingerprint when package-lock.json found", () => __awaiter(this, void 0, void 0, function* () {
        const project = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("package-lock.json", valid1()));
        const cri = { project };
        const fp = yield fingerprinter.action(cri);
        assert.equal(fp.abbreviation, "deps");
        assert(!!fp.sha);
    }));
    it("should not detect change unless dependencies change", () => __awaiter(this, void 0, void 0, function* () {
        const project1 = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("package-lock.json", valid1({ lockfileVersion: 1 })));
        const cri1 = { project: project1 };
        const fp1 = yield fingerprinter.action(cri1);
        const project2 = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("package-lock.json", valid1({ lockfileVersion: 2 })));
        const cri2 = { project: project2 };
        const fp2 = yield fingerprinter.action(cri2);
        assert.equal(fp1.sha, fp2.sha);
    }));
    it("should detect change when dependencies change", () => __awaiter(this, void 0, void 0, function* () {
        const project1 = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("package-lock.json", valid1({ antlrVersion: "0.2.0" })));
        const cri1 = { project: project1 };
        const fp1 = yield fingerprinter.action(cri1);
        const project2 = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("package-lock.json", valid1({ antlrVersion: "0.2.1" })));
        const cri2 = { project: project2 };
        const fp2 = yield fingerprinter.action(cri2);
        assert.notEqual(fp1.sha, fp2.sha);
    }));
});
// tslint:disable
function valid1(params = {}) {
    const paramsToUse = Object.assign({ lockfileVersion: 1, antlrVersion: "0.2.0" }, params);
    return JSON.stringify({
        "name": "@atomist/sdm",
        "version": "0.0.1",
        lockfileVersion: paramsToUse.lockfileVersion,
        "requires": true,
        "dependencies": {
            "@atomist/antlr": {
                "version": paramsToUse.antlrVersion,
                "resolved": "https://registry.npmjs.org/@atomist/antlr/-/antlr-0.2.0.tgz",
                "integrity": "sha512-UM76Knaans8ZYn/4aKWx/EVnLqsjsFqnDuaObC08A0o7sr+m7xeBt3LyWfB2jTfIjXFztKG02DA9sHtGspAI/Q==",
                "requires": {
                    "@atomist/automation-client": "0.6.6",
                    "antlr4ts": "0.4.1-alpha.0",
                    "lodash": "4.17.5"
                }
            }
        }
    }, null, 2);
}
//# sourceMappingURL=packageLockFingerprinterTest.js.map