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
const assert = require("power-assert");
const checkstyleReportExtractor_1 = require("../../../../../../src/common/delivery/code/review/checkstyle/checkstyleReportExtractor");
describe("checkstyleReportExtractor", () => {
    it("should parse valid output", () => __awaiter(this, void 0, void 0, function* () {
        const report = yield checkstyleReportExtractor_1.extract(exports.xml2valid1);
        assert(!!report);
        assert.equal(report.files.length, 2);
        const file = report.files[0];
        assert.equal(file.name, "/Users/rodjohnson/tools/checkstyle-8.8/Test.java");
        assert.equal(file.errors.length, 2);
        file.errors.forEach(f => assert(!!f.message, "Message must be set"));
        file.errors.forEach(f => assert(!!f.severity, "Severity must be set"));
    }));
});
/* tslint:disable */
exports.xml2valid1 = `<?xml version="1.0" encoding="UTF-8"?>
<checkstyle version="8.8">
<file name="/Users/rodjohnson/tools/checkstyle-8.8/Test.java">
<error line="0" severity="error" message="Missing package-info.java file." source="com.puppycrawl.tools.checkstyle.checks.javadoc.JavadocPackageCheck"/>
<error line="1" severity="error" message="Missing a Javadoc comment." source="com.puppycrawl.tools.checkstyle.checks.javadoc.JavadocTypeCheck"/>
</file>
<file name="/Users/rodjohnson/tools/checkstyle-8.8/src/main/java/thing/Test2.java">
<error line="0" severity="error" message="Missing package-info.java file." source="com.puppycrawl.tools.checkstyle.checks.javadoc.JavadocPackageCheck"/>
<error line="1" severity="error" message="Missing a Javadoc comment." source="com.puppycrawl.tools.checkstyle.checks.javadoc.JavadocTypeCheck"/>
</file>
</checkstyle>
`;
//# sourceMappingURL=checkstyleReportExtractorTest.js.map