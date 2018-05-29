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
const projectEditorOps_1 = require("@atomist/automation-client/operations/edit/projectEditorOps");
const _ = require("lodash");
const sprintf_js_1 = require("sprintf-js");
const confirmEditedness_1 = require("../../../../util/git/confirmEditedness");
const repoRef_1 = require("../../../../util/git/repoRef");
const createPushImpactListenerInvocation_1 = require("../createPushImpactListenerInvocation");
const PushReactionRegistration_1 = require("../PushReactionRegistration");
/**
 * Execute autofixes against this push
 * Throw an error on failure
 * @param projectLoader use to load projects
 * @param {AutofixRegistration[]} registrations
 * @return GoalExecutor
 */
function executeAutofixes(projectLoader, registrations) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { credentials, context, status, progressLog } = rwlc;
        progressLog.write(sprintf_js_1.sprintf("Executing %d autofixes", registrations.length));
        try {
            const commit = status.commit;
            if (registrations.length === 0) {
                return automation_client_1.Success;
            }
            const push = commit.pushes[0];
            const editableRepoRef = repoRef_1.toRemoteRepoRef(commit.repo, { branch: push.branch });
            const editResult = yield projectLoader.doWithProject({
                credentials,
                id: editableRepoRef,
                context,
                readOnly: false,
            }, (project) => __awaiter(this, void 0, void 0, function* () {
                const cri = yield createPushImpactListenerInvocation_1.createPushImpactListenerInvocation(rwlc, project);
                const relevantAutofixes = yield PushReactionRegistration_1.relevantCodeActions(registrations, cri);
                progressLog.write(sprintf_js_1.sprintf("Will apply %d relevant autofixes of %d to %j: [%s] of [%s]", relevantAutofixes.length, registrations.length, cri.id, relevantAutofixes.map(a => a.name).join(), registrations.map(a => a.name).join()));
                let cumulativeResult = {
                    target: cri.project,
                    success: true,
                    edited: false,
                };
                for (const autofix of _.flatten(relevantAutofixes)) {
                    const thisEdit = yield runOne(cri, autofix, progressLog);
                    cumulativeResult = projectEditorOps_1.combineEditResults(cumulativeResult, thisEdit);
                }
                if (cumulativeResult.edited) {
                    yield cri.project.push();
                }
                return cumulativeResult;
            }));
            if (editResult.edited) {
                // Send back an error code, because we want to stop execution of goals after this
                return { code: 1, message: "Edited" };
            }
            return automation_client_1.Success;
        }
        catch (err) {
            automation_client_1.logger.warn("Autofixes failed with %s: Ignoring failure", err.message);
            progressLog.write(sprintf_js_1.sprintf("Autofixes failed with %s: Ignoring failure", err.message));
            return automation_client_1.Success;
        }
    });
}
exports.executeAutofixes = executeAutofixes;
function runOne(cri, autofix, progressLog) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = cri.project;
        progressLog.write(sprintf_js_1.sprintf("About to edit %s with autofix %s", project.id.url, autofix.name));
        try {
            const tentativeEditResult = yield autofix.action(cri);
            const editResult = yield confirmEditedness_1.confirmEditedness(tentativeEditResult);
            if (!editResult.success) {
                yield project.revert();
                automation_client_1.logger.warn("Edited %s with autofix %s and success=false, edited=%d", project.id.url, autofix.name, editResult.edited);
                progressLog.write(sprintf_js_1.sprintf("Edited %s with autofix %s and success=false, edited=%d", project.id.url, autofix.name, editResult.edited));
                if (!!autofix.options && autofix.options.ignoreFailure) {
                    // Say we didn't edit and can keep going
                    return { target: project, edited: false, success: false };
                }
            }
            else if (editResult.edited) {
                yield project.commit(`Autofix: ${autofix.name}\n\n[atomist:generated]`);
            }
            else {
                automation_client_1.logger.debug("No changes were made by autofix %s", autofix.name);
            }
            return editResult;
        }
        catch (err) {
            if (!autofix.options || !autofix.options.ignoreFailure) {
                throw err;
            }
            yield project.revert();
            automation_client_1.logger.warn("Ignoring editor failure %s on %s with autofix %s", err.message, project.id.url, autofix.name);
            progressLog.write(sprintf_js_1.sprintf("Ignoring editor failure %s on %s with autofix %s", err.message, project.id.url, autofix.name));
            return { target: project, success: false, edited: false };
        }
    });
}
//# sourceMappingURL=executeAutofixes.js.map