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
/**
 * A code action response that affects delivery:
 * failing the current goal or requiring approval,
 * causing dependent goals to fail or wait.
 */
var PushReactionResponse;
(function (PushReactionResponse) {
    /**
     * Fail execution of the present goalset. Any dependent goals will stop.
     * Will not stop execution of non-dependent goals.
     */
    PushReactionResponse["failGoals"] = "fail";
    /**
     * Require approval to proceed to dependent goals in the present goalset.
     */
    PushReactionResponse["requireApprovalToProceed"] = "requireApproval";
})(PushReactionResponse = exports.PushReactionResponse || (exports.PushReactionResponse = {}));
function isPushReactionRegistration(a) {
    const maybe = a;
    return !!maybe.name && !!maybe.action;
}
/**
 * Convert an action function to a PushReaction if necessary
 * @param {PushReactionRegisterable<any>} prr
 * @return {PushReactionRegistration}
 */
function toPushReactionRegistration(prr) {
    return isPushReactionRegistration(prr) ? prr : {
        name: "Raw push reaction",
        action: prr,
    };
}
exports.toPushReactionRegistration = toPushReactionRegistration;
/**
 * Compute the relevant actions for this push. Some may be filtered out
 * by their push tests.
 */
function relevantCodeActions(registrations, pli) {
    return Promise.all(registrations.map((t) => __awaiter(this, void 0, void 0, function* () { return (!t.pushTest || (yield t.pushTest.mapping(pli))) ? t : undefined; })))
        .then(elts => elts.filter(x => !!x));
}
exports.relevantCodeActions = relevantCodeActions;
//# sourceMappingURL=PushReactionRegistration.js.map