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
const approvalGate_1 = require("../../../handlers/events/delivery/verify/approvalGate");
const gitHubContext_1 = require("./support/github/gitHubContext");
const ValidGoalName = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
/**
 * Represents a delivery action, such as Build or Deploy.
 */
class Goal {
    get environment() {
        return this.definition.environment;
    }
    get successDescription() {
        return this.definition.completedDescription || ("Complete: " + this.name);
    }
    get inProcessDescription() {
        return this.definition.workingDescription || ("Working: " + this.name);
    }
    get failureDescription() {
        return this.definition.failedDescription || ("Failed: " + this.name);
    }
    get requestedDescription() {
        return "Planned: " + this.name;
    }
    get waitingForApprovalDescription() {
        return this.definition.waitingForApprovalDescription || (this.successDescription + "(but needs approval)");
    }
    get retryIntent() {
        return "trigger " + this.name;
    }
    constructor(definition) {
        if (!ValidGoalName.test(definition.uniqueName)) {
            throw new Error(`${definition.uniqueName} is not a valid goal name: Must be camel case`);
        }
        this.definition = definition;
        this.context = gitHubContext_1.BaseContext + definition.environment + definition.orderedName;
        this.uniqueCamelCaseName = definition.uniqueName;
        const numberAndName = /([0-9\.]+)-(.*)/;
        const matchGoal = definition.orderedName.match(numberAndName);
        if (!matchGoal) {
            automation_client_1.logger.debug(`Ordered name was not '#-name'. Did not find number and name in ${definition.orderedName}`);
        }
        this.name = definition.displayName || (matchGoal && matchGoal[2]) || definition.orderedName;
    }
    // TODO decouple from github statuses
    preconditionsStatus(id, sub) {
        return __awaiter(this, void 0, void 0, function* () {
            return "success";
        });
    }
}
exports.Goal = Goal;
class GoalWithPrecondition extends Goal {
    constructor(definition, ...dependsOn) {
        super(definition);
        this.dependsOn = dependsOn;
    }
    preconditionsStatus(idForLogging, sub) {
        return __awaiter(this, void 0, void 0, function* () {
            const checks = this.dependsOn.map(pg => checkPreconditionStatus(sub, pg));
            automation_client_1.logger.debug("Preconditions: %j", checks);
            const errors = checks.filter(r => r.error !== undefined)
                .map(r => r.error);
            const reasonsToWait = checks.filter(r => r.wait !== undefined).map(r => r.wait);
            errors.forEach(e => automation_client_1.logger.debug("Could not establish preconditions for " + this.name + ": " + e));
            reasonsToWait.forEach(e => automation_client_1.logger.debug("Not triggering " + this.name + ": " + e));
            if (errors.length > 0) {
                automation_client_1.logger.info("Preconditions failed on goal %s with dependencies '%s' on %j: Errors=[%s]; reasons to wait=[%s]", this.name, this.dependsOn.map(g => g.name), idForLogging, errors.join(","), reasonsToWait.join(","));
                return "failure";
            }
            if (reasonsToWait.length > 0) {
                automation_client_1.logger.debug("Preconditions not yet met on goal %s with dependencies '%s' on %j: Errors=[%s]; reasons to wait=[%s]", this.name, this.dependsOn.map(g => g.name), idForLogging, errors.join(","), reasonsToWait.join(","));
                return "waiting";
            }
            return "success";
        });
    }
}
exports.GoalWithPrecondition = GoalWithPrecondition;
function hasPreconditions(goal) {
    return !!goal.dependsOn;
}
exports.hasPreconditions = hasPreconditions;
function checkPreconditionStatus(sub, pg) {
    const detectedStatus = sub.siblings.find(gs => gs.context === pg.context);
    if (!detectedStatus) {
        return { wait: "Did not find a status for " + pg.context };
    }
    if (detectedStatus.state === "pending") {
        return { wait: "Precondition '" + pg.name + "' not yet successful" };
    }
    if (detectedStatus.state !== "success") {
        return { error: "Precondition '" + pg.name + `' in state [${detectedStatus.state}]` };
    }
    if (approvalGate_1.requiresApproval(detectedStatus)) {
        return { wait: "Precondition '" + pg.name + "' requires approval" };
    }
    return {};
}
function currentGoalIsStillPending(currentGoal, status) {
    const myStatus = status.siblings.find(s => s.context === currentGoal);
    if (!myStatus) {
        automation_client_1.logger.debug("Status.context is %s but there is nothing with this context", currentGoal);
        return false;
    }
    if (myStatus.state === "pending" && myStatus.description.startsWith("Planning")) {
        return true;
    }
    if (myStatus.state === "failure" && myStatus.description.startsWith("Skip")) {
        return true;
    }
    automation_client_1.logger.debug(`${currentGoal} is not still planned or skipped, so I'm not running it.
    State: ${myStatus.state} Description: ${myStatus.description}`);
    return false;
}
exports.currentGoalIsStillPending = currentGoalIsStillPending;
//# sourceMappingURL=Goal.js.map