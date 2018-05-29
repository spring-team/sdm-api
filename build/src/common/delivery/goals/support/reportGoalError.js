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
const reportFailureInterpretationToLinkedChannels_1 = require("../../../../util/slack/reportFailureInterpretationToLinkedChannels");
/**
 * Report an error executing a goal and present a retry button
 * @return {Promise<void>}
 */
function reportGoalError(parameters, err) {
    return __awaiter(this, void 0, void 0, function* () {
        const { goal, implementationName, addressChannels, progressLog, id, logInterpreter } = parameters;
        automation_client_1.logger.error("RunWithLog on goal %s with implementation name '%s' caught error: %s", goal.name, implementationName, err.message);
        automation_client_1.logger.error(err.stack);
        progressLog.write("ERROR: " + err.message + "\n");
        const interpretation = logInterpreter(progressLog.log);
        // The executor might have information about the failure; report it in the channels
        if (interpretation) {
            if (!interpretation.doNotReportToUser) {
                yield reportFailureInterpretationToLinkedChannels_1.reportFailureInterpretationToLinkedChannels(implementationName, interpretation, { url: progressLog.url, log: progressLog.log }, id, addressChannels);
            }
        }
        else {
            // We don't have an interpretation available. Just report
            yield addressChannels("Failure executing goal: " + err.message);
        }
    });
}
exports.reportGoalError = reportGoalError;
function CompositeGoalExecutor(...goalImplementations) {
    return (r) => __awaiter(this, void 0, void 0, function* () {
        let overallResult = {
            code: 0,
        };
        for (const goalImplementation of goalImplementations) {
            const result = yield goalImplementation(r);
            if (result.code !== 0) {
                return result;
            }
            else {
                overallResult = {
                    code: result.code,
                    requireApproval: result.requireApproval ? result.requireApproval : overallResult.requireApproval,
                    message: result.message ? `${overallResult.message}\n${result.message}` : overallResult.message,
                };
            }
        }
        return overallResult;
    });
}
exports.CompositeGoalExecutor = CompositeGoalExecutor;
//# sourceMappingURL=reportGoalError.js.map