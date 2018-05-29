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
const DelimitedWriteProgressLogDecorator_1 = require("../../../src/common/log/DelimitedWriteProgressLogDecorator");
class ListProgressLog {
    constructor() {
        this.logList = [];
        this.name = "ListProgressLog";
    }
    close() {
        return Promise.resolve();
    }
    flush() {
        return Promise.resolve();
    }
    write(what) {
        this.logList.push(what);
    }
    isAvailable() {
        return Promise.resolve(true);
    }
}
describe("DelimitedWriteProgressLogDecorator", () => {
    it("should not complete line until delimited", () => __awaiter(this, void 0, void 0, function* () {
        const delegateLog = new ListProgressLog();
        const log = new DelimitedWriteProgressLogDecorator_1.DelimitedWriteProgressLogDecorator(delegateLog, "\n");
        log.write("I'm a lumberjack");
        log.write(" and I'm");
        log.write(" OK\n");
        log.write("I sleep all night and I work all day\n");
        assert.deepEqual(delegateLog.logList, [
            "I'm a lumberjack and I'm OK",
            "I sleep all night and I work all day",
        ]);
    }));
    it("should split into multiple log lines if delimiter is encountered", () => __awaiter(this, void 0, void 0, function* () {
        const delegateLog = new ListProgressLog();
        const log = new DelimitedWriteProgressLogDecorator_1.DelimitedWriteProgressLogDecorator(delegateLog, "\n");
        log.write("I'm a lumberjack and I'm OK\nI sleep all");
        log.write(" night and I work all day\n");
        assert.deepEqual(delegateLog.logList, [
            "I'm a lumberjack and I'm OK",
            "I sleep all night and I work all day",
        ]);
    }));
    it("should write remainder of logs on flush", () => __awaiter(this, void 0, void 0, function* () {
        const delegateLog = new ListProgressLog();
        const log = new DelimitedWriteProgressLogDecorator_1.DelimitedWriteProgressLogDecorator(delegateLog, "\n");
        log.write("I'm a lumberjack and I'm OK\nI sleep all");
        log.write(" night and I work all day");
        yield log.flush();
        assert.deepEqual(delegateLog.logList, [
            "I'm a lumberjack and I'm OK",
            "I sleep all night and I work all day",
        ]);
    }));
});
//# sourceMappingURL=DelimitedWriteProgressLogDecoratorTest.js.map