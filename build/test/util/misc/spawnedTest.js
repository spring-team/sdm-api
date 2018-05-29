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
const EphemeralProgressLog_1 = require("../../../src/common/log/EphemeralProgressLog");
const spawned_1 = require("../../../src/util/misc/spawned");
const fakeContext_1 = require("../../../src/util/test/fakeContext");
describe("spawned", () => {
    it("should handle invalid command", () => __awaiter(this, void 0, void 0, function* () {
        const sc = { command: "thisIsNonsense" };
        try {
            yield spawned_1.spawnAndWatch(sc, {}, yield EphemeralProgressLog_1.createEphemeralProgressLog(fakeContext_1.fakeContext(), { name: "test" }), {});
            assert.fail("Should have thrown an exception");
        }
        catch (err) {
            // Ok
        }
    }));
    it("should handle valid command with no error finder", () => __awaiter(this, void 0, void 0, function* () {
        const sc = { command: "ls" };
        const r = yield spawned_1.spawnAndWatch(sc, {}, yield EphemeralProgressLog_1.createEphemeralProgressLog(fakeContext_1.fakeContext(), { name: "test" }), {});
        assert.equal(r.error, false);
        assert.equal(r.error, false);
    }));
    it("should use default on attempt to pass in undefined error finder", () => __awaiter(this, void 0, void 0, function* () {
        const sc = { command: "ls" };
        const r = yield spawned_1.spawnAndWatch(sc, {}, yield EphemeralProgressLog_1.createEphemeralProgressLog(fakeContext_1.fakeContext(), { name: "test" }), {
            errorFinder: undefined,
        });
        assert.equal(r.error, false);
        assert.equal(r.error, false);
    }));
    it("should handle valid command with error finder", () => __awaiter(this, void 0, void 0, function* () {
        const sc = { command: "ls" };
        const r = yield spawned_1.spawnAndWatch(sc, {}, yield EphemeralProgressLog_1.createEphemeralProgressLog(fakeContext_1.fakeContext(), { name: "test" }), {
            errorFinder: () => false,
        });
        assert.equal(r.error, false);
        assert.equal(r.error, false);
    }));
});
//# sourceMappingURL=spawnedTest.js.map