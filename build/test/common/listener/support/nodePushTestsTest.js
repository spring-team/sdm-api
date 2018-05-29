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
const tsPushTests_1 = require("../../../../src/common/listener/support/pushtest/node/tsPushTests");
describe("nodePushTests", () => {
    describe("IsTypeScript", () => {
        it("should not find ts in empty repo", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of();
            const r = yield tsPushTests_1.IsTypeScript.mapping({ project });
            assert(!r);
        }));
        it("should find ts in repo with ts file", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of({ path: "src/Thing.ts", content: "export class Thing {}" });
            const r = yield tsPushTests_1.IsTypeScript.mapping({ project });
            assert(r);
        }));
        it("should not find ts in repo with no ts file", () => __awaiter(this, void 0, void 0, function* () {
            const project = InMemoryProject_1.InMemoryProject.of({ path: "src/main/java/Thing.kt", content: "public class Thing {}" });
            const r = yield tsPushTests_1.IsTypeScript.mapping({ project });
            assert(!r);
        }));
    });
});
//# sourceMappingURL=nodePushTestsTest.js.map