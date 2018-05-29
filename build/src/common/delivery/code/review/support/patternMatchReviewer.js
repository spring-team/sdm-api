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
const projectUtils_1 = require("@atomist/automation-client/project/util/projectUtils");
const _ = require("lodash");
/**
 * Return a ReviewerRegistration that objects to the given antipatterns and looks in the specified files
 * @param {string} name
 * @param opts targeting options
 * @param {AntiPattern} antiPatterns
 * @return {ReviewerRegistration}
 */
function patternMatchReviewer(name, opts, ...antiPatterns) {
    return {
        name,
        pushTest: opts.pushTest,
        action: (cri) => __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.debug("Running regexp review '%s' on %s against %j", name, opts.globPattern, antiPatterns);
            const project = cri.project;
            const result = { repoId: project.id, comments: [] };
            yield projectUtils_1.doWithFiles(project, opts.globPattern, (f) => __awaiter(this, void 0, void 0, function* () {
                const content = yield f.getContent();
                antiPatterns.forEach(problem => {
                    const rex = typeof problem.antiPattern === "string" ?
                        new RegExp(_.escapeRegExp(problem.antiPattern)) :
                        problem.antiPattern;
                    if (rex.test(content)) {
                        automation_client_1.logger.info("%s: Antipattern %s found in %s", name, problem.antiPattern, f.path);
                        result.comments.push({
                            severity: opts.severity || "error",
                            detail: problem.comment,
                            category: opts.category || name,
                            sourceLocation: {
                                path: f.path,
                                offset: undefined,
                                lineFrom1: findLineNumber(content, rex),
                            },
                        });
                    }
                });
            }));
            return result;
        }),
    };
}
exports.patternMatchReviewer = patternMatchReviewer;
function findLineNumber(source, regex) {
    const lines = source.split("\n");
    const lineFrom0 = lines.findIndex(l => regex.test(l));
    return lineFrom0 + 1;
}
//# sourceMappingURL=patternMatchReviewer.js.map