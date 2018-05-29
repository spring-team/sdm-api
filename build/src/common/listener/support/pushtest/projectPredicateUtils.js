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
 * Return the opposite of this ProjectPredicate
 */
function notPredicate(t) {
    return (pi) => __awaiter(this, void 0, void 0, function* () { return !(yield t(pi)); });
}
exports.notPredicate = notPredicate;
/**
 * Wrap all these ProjectPredicates in a single ProjectPredicate
 * AND: Return true if all are satisfied
 * @param {ProjectPredicate} predicates
 * @return {ProjectPredicate}
 */
function allPredicatesSatisfied(...predicates) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        const allResults = yield Promise.all(predicates.map((pt) => __awaiter(this, void 0, void 0, function* () {
            const result = yield pt(p);
            automation_client_1.logger.debug(`Result of ProjectPredicate '${pt.name}' was ${result}`);
            return result;
        })));
        return !allResults.includes(false);
    });
}
exports.allPredicatesSatisfied = allPredicatesSatisfied;
/**
 * Wrap all these ProjectPredicates in a single ProjectPredicate
 * OR: Return true if any is satisfied
 * @param {ProjectPredicate} predicates
 * @return {ProjectPredicate}
 */
function anyPredicateSatisfied(...predicates) {
    return (p) => __awaiter(this, void 0, void 0, function* () {
        const allResults = yield Promise.all(predicates.map((pt) => __awaiter(this, void 0, void 0, function* () {
            const result = yield pt(p);
            automation_client_1.logger.debug(`Result of ProjectPredicate '${pt.name}' was ${result}`);
            return result;
        })));
        return allResults.includes(true);
    });
}
exports.anyPredicateSatisfied = anyPredicateSatisfied;
//# sourceMappingURL=projectPredicateUtils.js.map