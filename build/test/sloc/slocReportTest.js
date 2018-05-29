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
const languages_1 = require("../../src/util/sloc/languages");
const slocReport_1 = require("../../src/util/sloc/slocReport");
describe("reportForLanguage", () => {
    it("should work on TypeScript", () => __awaiter(this, void 0, void 0, function* () {
        const p = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("thing.ts", "// Comment\n\nconst x = 10;\n"));
        const r = yield slocReport_1.reportForLanguage(p, { language: languages_1.TypeScriptLanguage });
        assert.equal(r.fileReports.length, 1);
        const f0 = r.fileReports[0];
        assert.equal(r.stats.total, 3);
        assert.equal(r.stats.source, 1);
        assert.equal(f0.stats.total, 3);
        assert.equal(f0.stats.source, 1);
    }));
    it("should work on Java", () => __awaiter(this, void 0, void 0, function* () {
        const p = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("src/Thing.java", "// Comment\n\nclass Foo{}\n"));
        const r = yield slocReport_1.reportForLanguage(p, { language: languages_1.JavaLanguage });
        assert.equal(r.fileReports.length, 1);
        const f0 = r.fileReports[0];
        assert.equal(r.stats.total, 3);
        assert.equal(r.stats.source, 1);
        assert.equal(f0.stats.total, 3);
        assert.equal(f0.stats.source, 1);
    }));
    it("should work on Java and TypeScript", () => __awaiter(this, void 0, void 0, function* () {
        const p = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("thing.ts", "// Comment\n\nconst x = 10;\n"), new InMemoryFile_1.InMemoryFile("src/Thing.java", "// Comment\n\nclass Foo{}\n"));
        const r = yield slocReport_1.reportForLanguages(p, [{ language: languages_1.JavaLanguage }, { language: languages_1.TypeScriptLanguage }]);
        assert.equal(r.languageReports.length, 2);
        assert.equal(r.relevantLanguageReports.length, 2);
        assert(r.languageReports.some(l => l.language === languages_1.JavaLanguage));
        assert(r.relevantLanguageReports.some(l => l.language === languages_1.TypeScriptLanguage));
    }));
    it("should find default languages", () => __awaiter(this, void 0, void 0, function* () {
        const p = InMemoryProject_1.InMemoryProject.of(new InMemoryFile_1.InMemoryFile("Thing.scala", "// Comment\n\nclass Foo {}\n"), new InMemoryFile_1.InMemoryFile("src/Thing.java", "// Comment\n\nclass Foo{}\n"));
        const r = yield slocReport_1.reportForLanguages(p);
        assert(r.languageReports.length > 2);
        assert.equal(r.relevantLanguageReports.length, 2);
        assert(r.languageReports.some(l => l.language === languages_1.JavaLanguage));
        assert(r.relevantLanguageReports.some(l => l.language === languages_1.ScalaLanguage));
    }));
});
//# sourceMappingURL=slocReportTest.js.map