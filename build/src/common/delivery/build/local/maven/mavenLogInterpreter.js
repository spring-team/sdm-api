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
const Microgrammar_1 = require("@atomist/microgrammar/Microgrammar");
const Primitives_1 = require("@atomist/microgrammar/Primitives");
exports.MavenLogInterpreter = log => {
    const timingInfo = timingGrammar.firstMatch(log);
    const data = {
        timeMillis: timingInfo ? timingInfo.seconds * 1000 : undefined,
        success: log.includes("BUILD SUCCESS\----"),
        testInfo: testSummaryGrammar.firstMatch(log) || undefined,
    };
    if (!log) {
        automation_client_1.logger.warn("Log was empty");
        return {
            relevantPart: "",
            message: "Failed with empty log",
            includeFullLog: false,
            data,
        };
    }
    const maybeFailedToStart = appFailedToStart(log);
    if (maybeFailedToStart) {
        return {
            relevantPart: maybeFailedToStart,
            message: "Application failed to start",
            includeFullLog: false,
            data,
        };
    }
    // default to maven errors
    const maybeMavenErrors = mavenErrors(log);
    if (maybeMavenErrors) {
        automation_client_1.logger.info("Recognized Maven error");
        return {
            relevantPart: maybeMavenErrors,
            message: "Maven errors",
            includeFullLog: false,
            data,
        };
    }
    // or it could be this problem here
    if (log.match(/Error checking out artifact/)) {
        automation_client_1.logger.info("Recognized artifact error");
        return {
            relevantPart: log,
            message: "I lost the local cache. Please rebuild",
            includeFullLog: false,
            data,
        };
    }
    automation_client_1.logger.info("Did not find anything to recognize in the log");
    return {
        relevantPart: "",
        message: "Unknown error",
        data,
    };
};
function appFailedToStart(log) {
    const lines = log.split("\n");
    const failedToStartLine = lines.indexOf("APPLICATION FAILED TO START");
    if (failedToStartLine < 1) {
        return undefined;
    }
    const likelyLines = lines.slice(failedToStartLine + 3, failedToStartLine + 10);
    return likelyLines.join("\n");
}
function mavenErrors(log) {
    const relevantPart = log.split("\n")
        .filter(l => l.startsWith("[ERROR]"))
        .map(l => l.replace("[ERROR] ", ""))
        .join("\n");
    if (!relevantPart) {
        return undefined;
    }
    return relevantPart;
}
// Microgrammars...
const timingGrammar = Microgrammar_1.Microgrammar.fromString("Total time: ${seconds} s", {
    seconds: Primitives_1.Float,
});
/**
 * Microgrammar for Maven test output
 * @type {Microgrammar<MavenInfo>}
 */
const testSummaryGrammar = Microgrammar_1.Microgrammar.fromString("Tests run: ${testsRun}, Failures: ${failingTests}, Errors: ${errors}, Skipped: ${pendingTests}", {
    testsRun: Primitives_1.Integer,
    failingTests: Primitives_1.Integer,
    pendingTests: Primitives_1.Integer,
    errors: Primitives_1.Integer,
});
//# sourceMappingURL=mavenLogInterpreter.js.map