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
const globals_1 = require("@atomist/automation-client/globals");
const path = require("path");
const reportGoalError_1 = require("../../../../common/delivery/goals/support/reportGoalError");
const storeGoals_1 = require("../../../../common/delivery/goals/support/storeGoals");
const spawned_1 = require("../../../../util/misc/spawned");
const sprintf_js_1 = require("sprintf-js");
const stringify = require("json-stringify-safe");
const toToken_1 = require("../../../../util/credentials/toToken");
/**
 * Central function to execute a goal with progress logging
 * @param {{projectLoader: ProjectLoader}} rules
 * @param {ExecuteGoalWithLog} execute
 * @param {RunWithLogContext} rwlc
 * @param {SdmGoal} sdmGoal
 * @param {Goal} goal
 * @param {InterpretLog} logInterpreter
 * @return {Promise<ExecuteGoalResult>}
 */
function executeGoal(rules, execute, rwlc, sdmGoal, goal, logInterpreter) {
    return __awaiter(this, void 0, void 0, function* () {
        const ctx = rwlc.context;
        const { addressChannels, progressLog, id } = rwlc;
        const implementationName = sdmGoal.fulfillment.name;
        automation_client_1.logger.info(`Running ${sdmGoal.name}. Triggered by ${sdmGoal.state} status: ${sdmGoal.externalKey}: ${sdmGoal.description}`);
        yield markGoalInProcess({ ctx, sdmGoal, goal, progressLogUrl: progressLog.url });
        try {
            // execute pre hook
            let result = yield executeHook(rules, rwlc, sdmGoal, "pre");
            // TODO CD is there a isSuccess(result) method somewhere
            if (result.code === 0) {
                // execute the actual goal
                let goalResult = yield execute(rwlc)
                    .catch(err => {
                    progressLog.write("ERROR caught: " + err.message + "\n");
                    progressLog.write(err.stack);
                    progressLog.write(sprintf_js_1.sprintf("Full error object: [%s]", stringify(err)));
                    return reportGoalError_1.reportGoalError({
                        goal, implementationName, addressChannels, progressLog, id, logInterpreter,
                    }, err)
                        .then(() => Promise.reject(err));
                });
                if (!goalResult) {
                    automation_client_1.logger.error("Execute method for %s of %s returned undefined", implementationName, sdmGoal.name);
                    goalResult = automation_client_1.Success;
                }
                result = Object.assign({}, result, goalResult);
            }
            // execute post hook
            if (result.code === 0) {
                let hookResult = yield executeHook(rules, rwlc, sdmGoal, "post");
                if (!hookResult) {
                    hookResult = automation_client_1.Success;
                }
                result = Object.assign({}, result, hookResult);
            }
            else {
                yield reportGoalError_1.reportGoalError({ goal, implementationName, addressChannels, progressLog, id, logInterpreter }, new Error("Failure reported: " + result.message));
            }
            automation_client_1.logger.info("ExecuteGoal: result of %s: %j", implementationName, result);
            yield markStatus({ ctx, sdmGoal, goal, result, progressLogUrl: progressLog.url });
            return automation_client_1.Success;
        }
        catch (err) {
            automation_client_1.logger.warn("Error executing %s on %s: %s", implementationName, sdmGoal.sha, err.message);
            automation_client_1.logger.warn(err.stack);
            yield markStatus({ ctx, sdmGoal, goal, result: { code: 1 }, error: err, progressLogUrl: progressLog.url });
            return automation_client_1.failure(err);
        }
    });
}
exports.executeGoal = executeGoal;
function executeHook(rules, rwlc, sdmGoal, stage) {
    return __awaiter(this, void 0, void 0, function* () {
        const { projectLoader } = rules;
        const { credentials, id, context, progressLog } = rwlc;
        return projectLoader.doWithProject({ credentials, id, context, readOnly: true }, (p) => __awaiter(this, void 0, void 0, function* () {
            const hook = goalToHookFile(sdmGoal, stage);
            if (p.fileExistsSync(`.atomist/hooks/${hook}`)) {
                automation_client_1.logger.info("Invoking goal %s hook '%s'", stage, hook);
                const opts = {
                    cwd: path.join(p.baseDir, ".atomist", "hooks"),
                    env: Object.assign({}, process.env, { 
                        // TODO cd do we need more variables to pass over?
                        // jess: I vote for passing the fewest possible -- like just correlation ID maybe, to show it
                        // can be done.
                        // This is an interface that is easy to expand and very hard to contract.
                        // plus, this is secure information; must we provide it to a script in any repo?
                        GITHUB_TOKEN: toToken_1.toToken(credentials), ATOMIST_TEAM: context.teamId, ATOMIST_CORRELATION_ID: context.correlationId, ATOMIST_JWT: globals_1.jwtToken() }),
                };
                let result = yield spawned_1.spawnAndWatch({ command: path.join(p.baseDir, ".atomist", "hooks", hook), args: [] }, opts, progressLog, {
                    errorFinder: code => code !== 0,
                });
                if (!result) {
                    result = automation_client_1.Success;
                }
                automation_client_1.logger.info("Goal %s hook returned: %j", stage, result);
                return result;
            }
            return automation_client_1.Success;
        }));
    });
}
exports.executeHook = executeHook;
function goalToHookFile(sdmGoal, prefix) {
    return `${prefix}-${sdmGoal.environment.slice(2)}-${sdmGoal.name}`;
}
function markStatus(parameters) {
    const { ctx, sdmGoal, goal, result, error, progressLogUrl } = parameters;
    const newState = result.code !== 0 ? "failure" :
        result.requireApproval ? "waiting_for_approval" : "success";
    // Currently, the goals tend to have a single url so it seems safe to use whichever of these we have.
    // Going forward it may make sense to have both a logging and a result URL.
    const url = result.targetUrl || progressLogUrl;
    return storeGoals_1.updateGoal(ctx, sdmGoal, {
        url,
        state: newState,
        description: storeGoals_1.descriptionFromState(goal, newState),
        error,
    });
}
exports.markStatus = markStatus;
function markGoalInProcess(parameters) {
    const { ctx, sdmGoal, goal, progressLogUrl } = parameters;
    return storeGoals_1.updateGoal(ctx, sdmGoal, {
        url: progressLogUrl,
        description: goal.inProcessDescription,
        state: "in_process",
    }).catch(err => automation_client_1.logger.warn("Failed to update %s goal to tell people we are working on it", goal.name));
}
//# sourceMappingURL=executeGoal.js.map