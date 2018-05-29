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
const PredicateMappingTerm_1 = require("../../common/listener/support/PredicateMappingTerm");
const PushRule_1 = require("../../common/listener/support/PushRule");
const commonPushTests_1 = require("../../common/listener/support/pushtest/commonPushTests");
const GoalComponent_1 = require("./GoalComponent");
class GoalSetterMapping extends PushRule_1.PushRule {
    constructor(guard1, guards, reason) {
        super(guard1, guards, reason);
    }
    setGoals(goals) {
        if (!goals) {
            return this.set(goals);
        }
        return this.set(GoalComponent_1.toGoals(goals));
    }
}
exports.GoalSetterMapping = GoalSetterMapping;
/**
 * Simple GoalSetter DSL. Allows use of booleans and functions
 * returning boolean in predicate expressions
 * @param {PushTest} guard1
 * @param {PushTest} guards
 */
function whenPushSatisfies(guard1, ...guards) {
    return new GoalSetterMapping(PredicateMappingTerm_1.toPredicateMapping(guard1), guards.map(PredicateMappingTerm_1.toPredicateMapping));
}
exports.whenPushSatisfies = whenPushSatisfies;
/**
 * PushRule that matches every push
 * @type {GoalSetterMapping}
 */
exports.onAnyPush = new GoalSetterMapping(commonPushTests_1.AnyPush, [], "On any push");
//# sourceMappingURL=goalDsl.js.map