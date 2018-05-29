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
function isGoalImplementation(f) {
    return !!f && !!f.implementationName && true;
}
exports.isGoalImplementation = isGoalImplementation;
function isSideEffect(f) {
    return !!f && f.sideEffectName && true;
}
exports.isSideEffect = isSideEffect;
class SdmGoalImplementationMapper {
    constructor(goalLauncher) {
        this.goalLauncher = goalLauncher;
        this.implementations = [];
        this.sideEffects = [];
        this.callbacks = [];
    }
    findImplementationBySdmGoal(goal) {
        const matchedNames = this.implementations.filter(m => m.implementationName === goal.fulfillment.name &&
            m.goal.context === goal.externalKey);
        if (matchedNames.length > 1) {
            throw new Error("Multiple mappings for name " + goal.fulfillment.name);
        }
        if (matchedNames.length === 0) {
            throw new Error("No implementation found with name " + goal.fulfillment.name);
        }
        return matchedNames[0];
    }
    addImplementation(implementation) {
        this.implementations.push(implementation);
        return this;
    }
    addSideEffect(sideEffect) {
        this.sideEffects.push(sideEffect);
        return this;
    }
    addFullfillmentCallback(callback) {
        this.callbacks.push(callback);
        return this;
    }
    findFulfillmentByPush(goal, inv) {
        return __awaiter(this, void 0, void 0, function* () {
            const implementationsForGoal = this.implementations.filter(m => m.goal.name === goal.name
                && m.goal.environment === goal.environment);
            for (const implementation of implementationsForGoal) {
                if (yield implementation.pushTest.mapping(inv)) {
                    return implementation;
                }
            }
            const knownSideEffects = this.sideEffects.filter(m => m.goal.name === goal.name
                && m.goal.environment === goal.environment);
            for (const sideEffect of knownSideEffects) {
                if (yield sideEffect.pushTest.mapping(inv)) {
                    return sideEffect;
                }
            }
            return undefined;
        });
    }
    findFullfillmentCallbackForGoal(g) {
        return this.callbacks.filter(c => c.goal.name === g.name &&
            // This slice is required because environment is suffixed with /
            (c.goal.definition.environment.slice(0, -1) === g.environment
                || c.goal.definition.environment === g.environment));
    }
    getIsolatedGoalLauncher() {
        return this.goalLauncher;
    }
}
exports.SdmGoalImplementationMapper = SdmGoalImplementationMapper;
//# sourceMappingURL=SdmGoalImplementationMapper.js.map