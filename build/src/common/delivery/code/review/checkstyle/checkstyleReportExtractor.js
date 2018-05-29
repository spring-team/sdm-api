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
const util_1 = require("util");
const xml2js = require("xml2js");
function extract(report) {
    return __awaiter(this, void 0, void 0, function* () {
        if (report === undefined || report === null) {
            throw new Error("checkstyle report is null or undefined");
        }
        if (report === "") {
            // great
            return {
                files: [],
            };
        }
        const parser = new xml2js.Parser();
        const output = yield util_1.promisify(parser.parseString)(report);
        if (!output) {
            automation_client_1.logger.warn(`Report: <${report}>`);
            throw new Error("Unable to parse checkstyle report.");
        }
        const raw = output.checkstyle;
        return {
            files: raw.file.map(fileToFile),
        };
    });
}
exports.extract = extract;
function fileToFile(f) {
    return {
        name: f.$.name,
        errors: f.error.map(e => e.$),
    };
}
//# sourceMappingURL=checkstyleReportExtractor.js.map