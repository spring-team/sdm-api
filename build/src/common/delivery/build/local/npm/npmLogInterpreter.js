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
Object.defineProperty(exports, "__esModule", { value: true });
const automation_client_1 = require("@atomist/automation-client");
const strip_ansi = require("strip-ansi");
exports.NpmLogInterpreter = log => {
    if (!log) {
        return undefined;
    }
    const lines = removeBlanksFromEnd(removeNpmFooter(log.split("\n")
        .map(strip_ansi)
        .map(stripLogPrefix)));
    const defaultMessage = lastOccurrenceOf(/^ERROR:/, lines) || "Error";
    const defaultLines = lines.slice(-15);
    const recognizedInterpretation = recognizeMochaTest(lines) ||
        recognizeNpmRunError(lines) ||
        {};
    const relevantLines = recognizedInterpretation.relevantLines || defaultLines;
    return {
        message: recognizedInterpretation.message || defaultMessage,
        relevantPart: "```\n" + relevantLines.join("\n") + "\n```",
    };
};
const LogPrefix = /^.*\[(info |error|warn |debug)\] /;
const NpmFooterPrefix = /^npm ERR!/;
const StackTraceLine = /^\W*at /;
const BeginMochaFailingTests = /^\W*\d* failing$/;
function recognizeNpmRunError(lines) {
    const reversedLines = lines.slice().reverse();
    const lastBreakBeforeCommand = findTwoBlankLinesIndex(reversedLines);
    if (lastBreakBeforeCommand < 0) {
        return undefined;
    }
    return { relevantLines: lines.slice(-Math.min(lastBreakBeforeCommand, 20)) };
}
function recognizeMochaTest(lines) {
    const begin = lines.findIndex(s => BeginMochaFailingTests.test(s));
    if (begin < 0) {
        automation_client_1.logger.debug("No mocha test detected");
        return undefined;
    }
    automation_client_1.logger.debug("Mocha test detected, beginning at %d: %s", begin, lines[begin]);
    const fromBeginning = lines.slice(begin);
    const end = findTwoBlankLinesIndex(fromBeginning) || fromBeginning.length;
    const fromFailingCountToTwoBlankLines = fromBeginning.slice(0, end);
    return {
        message: "Tests: " + lines[begin].trim(),
        relevantLines: fromFailingCountToTwoBlankLines.filter(s => !StackTraceLine.test(s)),
    };
}
function stripLogPrefix(line) {
    return line.replace(LogPrefix, "");
}
function removeNpmFooter(lines) {
    if (lines.includes("npm ERR! This is probably not a problem with npm. There is likely additional logging output above.")) {
        automation_client_1.logger.info("Filtering npm error footer");
        return lines.filter(s => !NpmFooterPrefix.test(s));
    }
    return lines;
}
function findTwoBlankLinesIndex(lines) {
    return lines.findIndex((s, i) => s === "" && lines[i + 1] === "");
}
function lastOccurrenceOf(re, lines) {
    const reversedLines = lines.slice().reverse(); // is there a better way tto make a copy? reverse() is in-place. >:-(
    return reversedLines.find(s => re.test(s));
}
function removeBlanksFromEnd(lines) {
    let w = lines.length - 1;
    while (lines[w].trim() === "") {
        w--;
    }
    return lines.slice(0, w + 1);
}
//# sourceMappingURL=npmLogInterpreter.js.map