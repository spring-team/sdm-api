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
const _ = require("lodash");
function checkstyleReportToReview(repoId, cr, baseDir) {
    return {
        repoId,
        comments: _.flatten(cr.files.map(f => fileComments(f, baseDir))),
    };
}
exports.checkstyleReportToReview = checkstyleReportToReview;
function fileComments(file, baseDir) {
    // This is a bit complex but necessary as we can get some content before baseDir
    const path = file.name.substr(file.name.indexOf(baseDir) + baseDir.length);
    automation_client_1.logger.debug("Processing file comments for [%s], baseDir=[%s], path=[%s]", file.name, baseDir, path);
    return file.errors.map(e => ({
        category: "checkstyle",
        severity: e.severity,
        detail: e.message,
        sourceLocation: {
            path,
            lineFrom1: e.line > 0 ? e.line : 0,
            offset: -1,
        },
    }));
}
//# sourceMappingURL=checkStyleReportToReview.js.map