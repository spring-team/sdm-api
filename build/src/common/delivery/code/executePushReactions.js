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
const createPushImpactListenerInvocation_1 = require("./createPushImpactListenerInvocation");
const PushReactionRegistration_1 = require("./PushReactionRegistration");
/**
 * Execute arbitrary code reactions against a codebase
 * @param {ProjectLoader} projectLoader
 * @param {PushReactionRegistration[]} registrations
 * @return {ExecuteGoalWithLog}
 */
function executePushReactions(projectLoader, registrations) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        if (registrations.length === 0) {
            return automation_client_1.Success;
        }
        const { credentials, id, context } = rwlc;
        return projectLoader.doWithProject({ credentials, id, context, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
            const cri = yield createPushImpactListenerInvocation_1.createPushImpactListenerInvocation(rwlc, project);
            const regs = registrations.map(PushReactionRegistration_1.toPushReactionRegistration);
            const relevantCodeReactions = yield PushReactionRegistration_1.relevantCodeActions(regs, cri);
            automation_client_1.logger.info("Will invoke %d eligible code reactions of %d to %j: [%s] of [%s]", relevantCodeReactions.length, registrations.length, cri.id, relevantCodeReactions.map(a => a.name).join(), regs.map(a => a.name).join());
            const allReactions = yield Promise.all(relevantCodeReactions
                .map(reactionReg => reactionReg.action(cri)));
            const result = {
                code: allReactions.includes(PushReactionRegistration_1.PushReactionResponse.failGoals) ? 1 : 0,
                requireApproval: allReactions.includes(PushReactionRegistration_1.PushReactionResponse.requireApprovalToProceed),
            };
            automation_client_1.logger.info("Code reaction responses are %j, result=%j", allReactions, result);
            return result;
        }));
    });
}
exports.executePushReactions = executePushReactions;
//# sourceMappingURL=executePushReactions.js.map