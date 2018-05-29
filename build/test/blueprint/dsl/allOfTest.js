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
const allOf_1 = require("../../../src/blueprint/dsl/allOf");
const decisionTreeTest_1 = require("./decisionTreeTest");
describe("allOf", () => {
    it("should satisfy true", () => __awaiter(this, void 0, void 0, function* () {
        const test = allOf_1.allOf(true);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), true);
    }));
    it("should satisfy function => true", () => __awaiter(this, void 0, void 0, function* () {
        const test = allOf_1.allOf(() => true);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), true);
    }));
    it("should satisfy function => Promise(true)", () => __awaiter(this, void 0, void 0, function* () {
        const test = allOf_1.allOf(() => __awaiter(this, void 0, void 0, function* () { return true; }));
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), true);
    }));
    it("should not satisfy function => Promise(true) and false", () => __awaiter(this, void 0, void 0, function* () {
        const test = allOf_1.allOf(() => __awaiter(this, void 0, void 0, function* () { return true; }), false);
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), false);
    }));
    it("should satisfy function => Promise(true) and correct calculation", () => __awaiter(this, void 0, void 0, function* () {
        const test = allOf_1.allOf(() => __awaiter(this, void 0, void 0, function* () { return true; }), (pu) => __awaiter(this, void 0, void 0, function* () { return pu.push.id.includes("_"); }));
        assert.equal(yield test.mapping(decisionTreeTest_1.fakePush()), true);
    }));
});
//# sourceMappingURL=allOfTest.js.map