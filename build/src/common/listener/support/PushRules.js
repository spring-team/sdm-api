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
/**
 * Use to execute a rule set for any push to resolve to an object.
 */
class PushRules {
    /**
     * Return all possible values
     * @param {string} name
     * @param {Array<PushMapping<V>>} choices Array of choices.
     * Passing an empty array will result in an instance that always maps to undefined,
     * and is not an error.
     */
    constructor(name, choices = []) {
        this.name = name;
        this.choices = [];
        if (!name) {
            throw new Error("PushRule name must be specified");
        }
        this.add(choices);
    }
    /**
     * Return a PushRules with a subset of the rules of this one
     * @param {(p: PushMapping<V>) => boolean} predicate
     * @return {PushRules<V>}
     */
    filter(predicate) {
        return new PushRules("name-", this.choices.filter(predicate));
    }
    add(rules) {
        this.choices = this.choices.concat(rules);
    }
    mapping(pi) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield Promise.all(this.choices
                .map((pc) => __awaiter(this, void 0, void 0, function* () {
                const found = yield pc.mapping(pi);
                automation_client_1.logger.debug("Eligible PushRule named %s returned choice %j", pc.name, found);
                return found;
            })));
            const nonNull = results.find(p => !!p);
            const indexOfNull = results.indexOf(null);
            const value = indexOfNull > -1 && indexOfNull < results.indexOf(nonNull) ?
                undefined :
                nonNull;
            automation_client_1.logger.info("PushRules [%s]: Value for push on %j is %j", this.name, pi.id, value);
            return value;
        });
    }
}
exports.PushRules = PushRules;
//# sourceMappingURL=PushRules.js.map