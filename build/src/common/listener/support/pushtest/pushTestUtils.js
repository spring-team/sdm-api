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
const LruCache_1 = require("../../../../util/misc/LruCache");
const Mapping_1 = require("../../Mapping");
const PushTest_1 = require("../../PushTest");
const pred = require("../predicateUtils");
/**
 * Return the opposite of this push test
 */
exports.not = pred.whenNot;
/**
 * Wrap all these PushTests or ProjectPredicates in a single PushTest
 * AND: Return true if all are satisfied
 * @param {PushTest} pushTests
 * @return {PushTest}
 */
function allSatisfied(...pushTests) {
    const asPushTests = pushTests.map(p => Mapping_1.isMapping(p) ? p : PushTest_1.predicatePushTest(p.name, p));
    return pred.all(...asPushTests);
}
exports.allSatisfied = allSatisfied;
/**
 * Wrap all these PushTests or ProjectPredicates in a single PushTest
 * OR: Return true if any is satisfied
 * @param {PushTest} pushTests
 * @return {PushTest}
 */
function anySatisfied(...pushTests) {
    const asPushTests = pushTests.map(p => Mapping_1.isMapping(p) ? p : PushTest_1.predicatePushTest(p.name, p));
    return pred.any(...asPushTests);
}
exports.anySatisfied = anySatisfied;
const pushTestResultMemory = new LruCache_1.LruCache(1000);
/**
 * Cache the PushTest results for this push
 * @param {PushTest} pt
 * @return {PushTest}
 */
function memoize(pt) {
    return {
        name: pt.name,
        mapping: (pti) => __awaiter(this, void 0, void 0, function* () {
            const key = ptCacheKey(pt, pti);
            let result = pushTestResultMemory.get(key);
            if (result === undefined) {
                result = yield pt.mapping(pti);
                automation_client_1.logger.info(`Evaluated push test [%s] to ${result}: cache stats=%j`, pt.name, pushTestResultMemory.stats);
                pushTestResultMemory.put(key, result);
            }
            return result;
        }),
    };
}
exports.memoize = memoize;
function ptCacheKey(pt, pti) {
    return pti.push.id + "_" + pt.name;
}
//# sourceMappingURL=pushTestUtils.js.map