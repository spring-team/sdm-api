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
const configuration_1 = require("@atomist/automation-client/configuration");
const child_process_1 = require("child_process");
const jvmPushTests_1 = require("../../../../listener/support/pushtest/jvm/jvmPushTests");
const ReviewerError_1 = require("../ReviewerError");
const checkstyleReportExtractor_1 = require("./checkstyleReportExtractor");
const checkStyleReportToReview_1 = require("./checkStyleReportToReview");
/**
 * Spawn Checkstyle Java process against the project directory.
 * Parse Checkstyle XML out and transform it into our ProjectReview structure.
 * An example of a common pattern for integrating third party static
 * analysis or security tools.
 * @param {string} checkstylePath the path to the CheckStyle jar on the local machine. (see README.md)
 */
exports.checkstyleReviewer = (checkstylePath) => (p, ctx) => {
    // TODO switch to watchSpawned
    const childProcess = child_process_1.spawn("java", ["-jar",
        checkstylePath,
        "-c",
        "/sun_checks.xml",
        "src/main/java",
        "-f",
        "xml",
    ], {
        cwd: p.baseDir,
    });
    let stdout = "";
    let stderr = "";
    childProcess.stdout.on("data", data => stdout += data.toString());
    childProcess.stderr.on("data", data => stderr += data.toString());
    return new Promise((resolve, reject) => {
        childProcess.on("error", err => {
            reject(err);
        });
        childProcess.on("exit", (code, signal) => {
            automation_client_1.logger.debug("Checkstyle ran on %j, code=%d, stdout=\n%s\nstderr=%s", p.id, code, stdout, stderr);
            if (code !== 0 && stdout === "") {
                reject(new ReviewerError_1.ReviewerError("CheckStyle", `Process returned ${code}: ${stderr}`, stderr));
            }
            return checkstyleReportExtractor_1.extract(stdout)
                .then(cr => resolve(checkStyleReportToReview_1.checkstyleReportToReview(p.id, cr, p.baseDir)), err => reject(new ReviewerError_1.ReviewerError("CheckStyle", err.msg, stderr)));
        });
    });
};
function checkstyleReviewerRegistration(considerOnlyChangedFiles) {
    return {
        pushTest: jvmPushTests_1.IsJava,
        name: "Checkstyle",
        action: (cri) => __awaiter(this, void 0, void 0, function* () { return exports.checkstyleReviewer(configuration_1.configurationValue("sdm.checkstyle.path"))(cri.project, cri.context); }),
        options: { considerOnlyChangedFiles },
    };
}
exports.checkstyleReviewerRegistration = checkstyleReviewerRegistration;
//# sourceMappingURL=checkstyleReviewer.js.map