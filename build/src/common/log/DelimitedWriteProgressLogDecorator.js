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
/**
 * Sometimes new log lines are separated by a character rather than a call to write.
 * For example, when receiving data events from a child process newlines delimit log lines.
 */
class DelimitedWriteProgressLogDecorator {
    constructor(delegate, lineDelimiter) {
        this.delegate = delegate;
        this.lineDelimiter = lineDelimiter;
        this.lineBuffer = "";
    }
    get name() {
        return this.delegate.name;
    }
    get url() {
        return this.delegate.url;
    }
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delegate.isAvailable();
        });
    }
    write(what) {
        this.lineBuffer += what;
        const splitLines = this.lineBuffer.split(this.lineDelimiter);
        if (splitLines.length > 1) {
            const completedLines = splitLines.slice(0, splitLines.length - 1);
            this.lineBuffer = splitLines[splitLines.length - 1];
            completedLines.forEach(l => this.delegate.write(l));
        }
    }
    flush() {
        this.writeRemainder();
        return this.delegate.flush();
    }
    close() {
        this.writeRemainder();
        return this.delegate.close();
    }
    writeRemainder() {
        const remainder = this.lineBuffer;
        this.lineBuffer = "";
        this.delegate.write(remainder);
    }
}
exports.DelimitedWriteProgressLogDecorator = DelimitedWriteProgressLogDecorator;
//# sourceMappingURL=DelimitedWriteProgressLogDecorator.js.map