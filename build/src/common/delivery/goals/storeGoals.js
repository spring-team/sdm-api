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
const MessageClient_1 = require("@atomist/automation-client/spi/message/MessageClient");
const _ = require("lodash");
const sprintf_js_1 = require("sprintf-js");
const approvalGate_1 = require("../../../handlers/events/delivery/verify/approvalGate");
const sdmGoalIngester_1 = require("../../../ingesters/sdmGoalIngester");
const Goal_1 = require("./Goal");
function environmentFromGoal(goal) {
    return goal.definition.environment.replace(/\/$/, ""); // remove trailing slash at least
}
exports.environmentFromGoal = environmentFromGoal;
function updateGoal(ctx, before, params) {
    const description = params.description;
    const approval = params.approved ? constructProvenance(ctx) :
        !!before ? before.approval : undefined;
    const data = params.data ?
        params.data :
        !!before ? before.data : undefined;
    const sdmGoal = Object.assign({}, before, { state: params.state === "success" && !!before && before.approvalRequired ? "waiting_for_approval" : params.state, description, url: params.url, approval, ts: Date.now(), provenance: [constructProvenance(ctx)].concat(!!before ? before.provenance : []), error: _.get(params, "error.message"), data });
    automation_client_1.logger.debug("Updating SdmGoal %s to %s: %j", sdmGoal.externalKey, sdmGoal.state, sdmGoal);
    return ctx.messageClient.send(sdmGoal, MessageClient_1.addressEvent(sdmGoalIngester_1.GoalRootType));
}
exports.updateGoal = updateGoal;
function goalCorrespondsToSdmGoal(goal, sdmGoal) {
    return goal.name === sdmGoal.name && environmentFromGoal(goal) === sdmGoal.environment;
}
exports.goalCorrespondsToSdmGoal = goalCorrespondsToSdmGoal;
function constructSdmGoalImplementation(gi) {
    return {
        method: "SDM fulfill on requested",
        name: gi.implementationName,
    };
}
exports.constructSdmGoalImplementation = constructSdmGoalImplementation;
function constructSdmGoal(ctx, parameters) {
    const { goalSet, goal, goalSetId, state, id, providerId, url } = parameters;
    const fulfillment = parameters.fulfillment || { method: "other", name: "unspecified" };
    if (!id.branch) {
        throw new Error(sprintf_js_1.sprintf("Please provide a branch in the RemoteRepoRef %j", parameters));
    }
    if (!id.sha) {
        throw new Error(sprintf_js_1.sprintf("Please provide a sha in the RemoteRepoRef %j", parameters));
    }
    const preConditions = [];
    const description = descriptionFromState(goal, state);
    const environment = environmentFromGoal(goal);
    if (Goal_1.hasPreconditions(goal)) {
        preConditions.push(...goal.dependsOn.map(d => ({
            goalSet,
            name: d.name,
            environment: environmentFromGoal(d),
        })));
    }
    return {
        goalSet,
        goalSetId,
        name: goal.name,
        uniqueName: goal.definition.uniqueName,
        environment,
        fulfillment,
        sha: id.sha,
        branch: id.branch,
        repo: {
            name: id.repo,
            owner: id.owner,
            providerId,
        },
        state,
        description,
        url: approvalGate_1.disregardApproval(url),
        externalKey: goal.context,
        ts: Date.now(),
        approvalRequired: goal.definition.approvalRequired ? goal.definition.approvalRequired : false,
        provenance: [constructProvenance(ctx)],
        preConditions,
    };
}
exports.constructSdmGoal = constructSdmGoal;
function storeGoal(ctx, sdmGoal) {
    automation_client_1.logger.info("Storing goal: %j", sdmGoal);
    return ctx.messageClient.send(sdmGoal, MessageClient_1.addressEvent(sdmGoalIngester_1.GoalRootType))
        .then(() => sdmGoal);
}
exports.storeGoal = storeGoal;
function constructProvenance(ctx) {
    return {
        registration: ctx.context.name,
        version: ctx.context.version,
        name: ctx.context.operation,
        correlationId: ctx.correlationId,
        ts: Date.now(),
    };
}
function descriptionFromState(goal, state) {
    switch (state) {
        case "planned":
        case "requested":
            return goal.requestedDescription;
        case "in_process":
            return goal.inProcessDescription;
        case "waiting_for_approval":
            return goal.waitingForApprovalDescription;
        case "success":
            return goal.successDescription;
        case "failure":
            return goal.failureDescription;
        case "skipped":
            return "Skipped"; // you probably want to use something that describes the reason instead. but don't error.
        default:
            throw new Error("Unknown goal state " + state);
    }
}
exports.descriptionFromState = descriptionFromState;
//# sourceMappingURL=storeGoals.js.map