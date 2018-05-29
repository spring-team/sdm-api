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
const firstAvailableProgressLog_1 = require("../../../src/common/log/firstAvailableProgressLog");
const LoggingProgressLog_1 = require("../../../src/common/log/LoggingProgressLog");
const NeverAvailableProgressLog = new LoggingProgressLog_1.LoggingProgressLog("neverAvailable");
NeverAvailableProgressLog.isAvailable = () => __awaiter(this, void 0, void 0, function* () { return false; });
const AvailableProgressLog = new LoggingProgressLog_1.LoggingProgressLog("available");
describe("firstAvailable", () => {
    it("should fail with none available", () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield firstAvailableProgressLog_1.firstAvailableProgressLog(NeverAvailableProgressLog);
            assert.fail("Should've thrown an exception");
        }
        catch (_a) {
            // Ok
        }
    }));
    it("should succeed with one available", () => __awaiter(this, void 0, void 0, function* () {
        const faLog = yield firstAvailableProgressLog_1.firstAvailableProgressLog(AvailableProgressLog);
        assert.equal(faLog, AvailableProgressLog);
    }));
    it("should succeed with one unavailable and one available", () => __awaiter(this, void 0, void 0, function* () {
        const faLog = yield firstAvailableProgressLog_1.firstAvailableProgressLog(NeverAvailableProgressLog, AvailableProgressLog);
        assert.equal(faLog, AvailableProgressLog);
    }));
    it("should succeed with one unavailable and two available, picking first available", () => __awaiter(this, void 0, void 0, function* () {
        const faLog = yield firstAvailableProgressLog_1.firstAvailableProgressLog(NeverAvailableProgressLog, AvailableProgressLog, new LoggingProgressLog_1.LoggingProgressLog("dontUseMe"));
        assert.equal(faLog, AvailableProgressLog);
    }));
    it("should not ask availability after finding an available logger", () => __awaiter(this, void 0, void 0, function* () {
        const dontAskMe = new LoggingProgressLog_1.LoggingProgressLog("dontAsk");
        dontAskMe.isAvailable = () => __awaiter(this, void 0, void 0, function* () {
            throw new Error("I said DON'T ASK");
        });
        const faLog = yield firstAvailableProgressLog_1.firstAvailableProgressLog(AvailableProgressLog, dontAskMe);
        assert.equal(faLog, AvailableProgressLog);
    }));
});
//# sourceMappingURL=firstAvailableProgressLogTest.js.map