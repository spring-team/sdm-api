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
const PushRules_1 = require("../../common/listener/support/PushRules");
const pushTestUtils_1 = require("../../common/listener/support/pushtest/pushTestUtils");
/**
 * Simple DSL to create a decision tree.
 * Trees and subtrees can compute variables as interim values for future use.
 * Example usage, showing computed state:
 *
 * ```
 * let count = 0;  // Initialize a counter we'll use later
 * const pm: PushMapping<Goals> = given<Goals>(TruePushTest, ...) // Use any push tests
 *    .init(() => count = 0) // Init to set state
 *    .itMeans("no frogs coming")
 *    .then(
 *        given<Goals>(TruePushTest, ...).itMeans("case1")
 *           .compute(() => count++)   // Increment the counter for this branch
 *           .then(
 *              // Compute terminal rules
 *              whenPushSatisfies(count > 0, FalsePushTest).itMeans("nope").setGoals(NoGoals),
 *              whenPushSatisfies(TruePushTest).itMeans("yes").setGoals(HttpServiceGoals),
 *           ),
 *       );
 * ```
 * @param givenPushTests PushTests
 * @return interim DSL structure
 */
function given(...givenPushTests) {
    return new TreeContext(givenPushTests);
}
exports.given = given;
class TreeContext {
    constructor(givenPushTests) {
        this.givenPushTests = givenPushTests;
    }
    /**
     * Perform any computation necessary to initialize this branch:
     * for example, setting variables in scope
     * @param {(t: this) => any} f
     * @return {any}
     */
    init(f) {
        f(this);
        return this;
    }
    itMeans(name) {
        const givenPushTest = pushTestUtils_1.allSatisfied(...this.givenPushTests);
        return new GivenTree(givenPushTest, name);
    }
}
exports.TreeContext = TreeContext;
/**
 * Tree. Can compute variables
 */
class GivenTree {
    constructor(givenPushTest, name) {
        this.givenPushTest = givenPushTest;
        this.name = name;
    }
    /**
     * Perform computation before continuing.
     * Typically used to set values that will be used in predicate expressions.
     * @param {(t: this) => any} f
     * @return {any}
     */
    compute(f) {
        f(this);
        return this;
    }
    /**
     * Set the resolution value of this tree
     * @param {V} value
     * @return {PushMapping<V>}
     */
    set(value) {
        return {
            name: this.name,
            mapping: () => __awaiter(this, void 0, void 0, function* () { return value; }),
        };
    }
    /**
     * Enter a subtree of a number of mappings. Can be use
     * to nest trees to arbitrary depth.
     * @param {PushMapping<V>} pushMappings
     * @return {PushMapping<V>}
     */
    then(...pushMappings) {
        const rules = new PushRules_1.PushRules(this.name, pushMappings);
        return {
            name: this.name,
            mapping: (pli) => __awaiter(this, void 0, void 0, function* () {
                const eligible = yield this.givenPushTest.mapping(pli);
                return eligible ? rules.mapping(pli) : undefined;
            }),
        };
    }
}
exports.GivenTree = GivenTree;
//# sourceMappingURL=decisionTree.js.map