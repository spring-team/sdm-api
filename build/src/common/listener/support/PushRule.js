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
const pushTestUtils_1 = require("./pushtest/pushTestUtils");
/**
 * Generic DSL for returning an object on a push
 */
class PushRule {
    constructor(guard1, guards, reason) {
        this.guard1 = guard1;
        this.guards = guards;
        this.pushTest = pushTestUtils_1.allSatisfied(pushTestUtils_1.memoize(guard1), ...guards.map(pushTestUtils_1.memoize));
        this.reason = reason || this.pushTest.name;
    }
    get value() {
        return this.staticValue;
    }
    get name() {
        return this.reason;
    }
    /**
     * Set an additional reason if we want to add information to that which is
     * available from the push tests themselves
     * @param {string} reason
     * @return {this}
     */
    itMeans(reason) {
        this.reason = reason;
        return this;
    }
    /**
     * Set the value that will be resolved from this rule
     * @param {V} value
     * @return {this}
     */
    set(value) {
        this.staticValue = value;
        return this;
    }
    mapping(p) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.pushTest.mapping(p)) {
                return this.staticValue;
            }
        });
    }
}
exports.PushRule = PushRule;
//# sourceMappingURL=PushRule.js.map