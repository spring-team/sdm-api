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
const elementRequest_1 = require("../../../src/util/fingerprint/elementRequest");
const assert = require("power-assert");
describe("elementRequest", () => {
    it("supports JavaScript", () => {
        it("finds functions", () => __awaiter(this, void 0, void 0, function* () {
            const p = InMemoryProject_1.InMemoryProject.of({
                path: "script.js",
                content: "function it(a, b) { // get rid of this \nreturn \n 'frogs'; }",
            });
            const functions = yield elementRequest_1.findElements(p);
            assert.equal(functions.length, 1);
            assert.equal(functions[0].identifier, "it");
            assert.equal(functions[0].canonicalBody, "function it(a, b){return 'frogs';}");
            assert.equal(functions[0].path, "script.js");
        }));
        it("finds matching functions", () => __awaiter(this, void 0, void 0, function* () {
            const p = InMemoryProject_1.InMemoryProject.of({
                path: "script.js",
                content: "function it(a, b) { // get rid of this \nreturn \n 'frogs'; } function notIt() {}",
            });
            const functions = yield elementRequest_1.findElements(p, {
                identifierPattern: /^i.*$/,
            });
            assert.equal(functions.length, 1);
            assert.equal(functions[0].identifier, "it");
            assert.equal(functions[0].canonicalBody, "function it(a, b){return 'frogs';}");
            assert.equal(functions[0].path, "script.js");
            assert(!!functions[0].sha);
        }));
    });
});
//# sourceMappingURL=elementRequestTest.js.map