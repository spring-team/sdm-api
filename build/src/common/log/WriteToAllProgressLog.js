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
const automation_client_1 = require("@atomist/automation-client");
/**
 * Write to multiple progress logs, exposing them as one.
 */
class WriteToAllProgressLog {
    constructor(name, log1, log2, ...others) {
        this.name = name;
        this.logs = [log1, log2].concat(others);
    }
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    write(what) {
        this.logs.forEach(log => log.write(what));
    }
    flush() {
        return Promise.all(this.logs.map(log => log.flush()));
    }
    close() {
        if (!this.logs) {
            automation_client_1.logger.error("This is unexpected! How did I get here without logs?");
            return;
        }
        return Promise.all(this.logs.map(log => log.close()));
    }
    get log() {
        const hasLog = this.logs.find(l => l.log !== undefined);
        return !!hasLog ? hasLog.log : undefined;
    }
    get url() {
        const hasUrl = this.logs.find(l => !!l.url);
        return !!hasUrl ? hasUrl.url : undefined;
    }
}
exports.WriteToAllProgressLog = WriteToAllProgressLog;
//# sourceMappingURL=WriteToAllProgressLog.js.map