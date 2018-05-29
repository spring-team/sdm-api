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
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const commonPushTests_1 = require("../../../../src/common/listener/support/pushtest/commonPushTests");
describe("commonPushTests", () => {
    describe("toDefaultBranch", () => {
        it("should pass for default branch", () => __awaiter(this, void 0, void 0, function* () {
            const pli = {
                project: InMemoryProject_1.InMemoryProject.of(),
                push: {
                    branch: "master",
                    repo: {
                        defaultBranch: "master",
                    },
                },
            };
            const r = yield commonPushTests_1.ToDefaultBranch.mapping(pli);
            assert(r);
        }));
        it("should pass for empty default branch", () => __awaiter(this, void 0, void 0, function* () {
            const pli = {
                project: InMemoryProject_1.InMemoryProject.of(),
                push: {
                    branch: "master",
                    repo: {
                        defaultBranch: "",
                    },
                },
            };
            const r = yield commonPushTests_1.ToDefaultBranch.mapping(pli);
            assert(r);
        }));
        it("should pass for null default branch", () => __awaiter(this, void 0, void 0, function* () {
            const pli = {
                project: InMemoryProject_1.InMemoryProject.of(),
                push: {
                    branch: "master",
                    repo: {
                        defaultBranch: null,
                    },
                },
            };
            const r = yield commonPushTests_1.ToDefaultBranch.mapping(pli);
            assert(r);
        }));
        it("should not pass for non default branch", () => __awaiter(this, void 0, void 0, function* () {
            const pli = {
                project: InMemoryProject_1.InMemoryProject.of(),
                push: {
                    branch: "some-feature",
                    repo: {
                        defaultBranch: "master",
                    },
                },
            };
            const r = yield commonPushTests_1.ToDefaultBranch.mapping(pli);
            assert(!r);
        }));
    });
    describe("hasFile", () => {
        it("should not find file in empty repo", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of();
            const r = yield commonPushTests_1.hasFile("whatever").mapping({ project });
            assert(!r);
        }));
        it("should find file", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of({ path: "pom.xml", content: "<xml>" });
            const r = yield commonPushTests_1.hasFile("pom.xml").mapping({ project });
            assert(r);
        }));
    });
    describe("hasFileContaining", () => {
        it("should not find in empty repo", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of();
            const r = yield commonPushTests_1.hasFileContaining("x", /y/).mapping({ project });
            assert(!r);
        }));
        it("should find containing", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of({ path: "src/main/java/Thing.java", content: "public class Thing {}" });
            const r = yield commonPushTests_1.hasFileContaining("src/main/java/Thing.java", /class/).mapping({ project });
            assert(r);
        }));
        it("should not find whe file does not contain", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of({ path: "src/main/java/Thing.kt", content: "public class Thing {}" });
            const r = yield commonPushTests_1.hasFileContaining("src/main/java/Thing.java", /xclass/).mapping({ project });
            assert(!r);
        }));
    });
    describe("hasFileWithExtension", () => {
        it("should not find file in empty repo", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of();
            const r = yield commonPushTests_1.hasFileWithExtension("java").mapping({ project });
            assert(!r);
        }));
        it("should find one file", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of({ path: "pom.xml", content: "<xml>" });
            const r = yield commonPushTests_1.hasFileWithExtension("xml").mapping({ project });
            assert(r);
            const r2 = yield commonPushTests_1.hasFileWithExtension("java").mapping({ project });
            assert(!r2);
        }));
    });
});
//# sourceMappingURL=commonPushTestsTest.js.map