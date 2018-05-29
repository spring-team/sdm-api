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
const fileGlobs_1 = require("@atomist/automation-client/project/fileGlobs");
const InMemoryFile_1 = require("@atomist/automation-client/project/mem/InMemoryFile");
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const assert = require("power-assert");
const patternMatchReviewer_1 = require("../../../../../../src/common/delivery/code/review/support/patternMatchReviewer");
describe("patternMatchReviewer", () => {
    it("should not find anything", () => __awaiter(this, void 0, void 0, function* () {
        const rer = patternMatchReviewer_1.patternMatchReviewer("name", { globPattern: fileGlobs_1.AllFiles }, {
            name: "t thing",
            antiPattern: /t.*/,
            comment: "something else",
        });
        const project = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("a", "b"));
        const rr = yield rer.action({ project });
        assert.equal(rr.comments.length, 0);
    }));
    it("should find regex", () => __awaiter(this, void 0, void 0, function* () {
        const rer = patternMatchReviewer_1.patternMatchReviewer("name", { globPattern: fileGlobs_1.AllFiles }, {
            name: "t thing",
            antiPattern: /t.*/,
            comment: "something else",
        });
        const project = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("thing", "b test"));
        const rr = yield rer.action({ project });
        assert.equal(rr.comments.length, 1);
        assert.equal(rr.comments[0].sourceLocation.path, "thing");
    }));
    it("should not find string", () => __awaiter(this, void 0, void 0, function* () {
        const rer = patternMatchReviewer_1.patternMatchReviewer("name", { globPattern: fileGlobs_1.AllFiles }, {
            name: "t thing",
            antiPattern: "frogs suck",
            comment: "something else",
        });
        const project = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("thing", "b test"));
        const rr = yield rer.action({ project });
        assert.equal(rr.comments.length, 0);
    }));
    it("should find string", () => __awaiter(this, void 0, void 0, function* () {
        const rer = patternMatchReviewer_1.patternMatchReviewer("name", { globPattern: fileGlobs_1.AllFiles }, {
            name: "t thing",
            antiPattern: "frogs suck",
            comment: "something else",
        });
        const project = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("thing", "b frogs suck test"));
        const rr = yield rer.action({ project });
        assert.equal(rr.comments.length, 1);
        assert.equal(rr.comments[0].sourceLocation.path, "thing");
    }));
    it("should find complex string", () => __awaiter(this, void 0, void 0, function* () {
        const rer = patternMatchReviewer_1.patternMatchReviewer("name", { globPattern: fileGlobs_1.AllFiles }, {
            name: "t thing",
            antiPattern: "frogs /[&(* suck",
            comment: "something else",
        });
        const project = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("thing", "b frogs /[&(* suck test"));
        const rr = yield rer.action({ project });
        assert.equal(rr.comments.length, 1);
        assert.equal(rr.comments[0].sourceLocation.path, "thing");
    }));
});
//# sourceMappingURL=patternMatchReviewerTest.js.map