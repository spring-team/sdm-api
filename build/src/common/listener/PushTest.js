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
/**
 * Convenient factory function for PushTest instances
 * @param {string} name
 * @param mapping test function
 * @return {PushTest}
 */
function pushTest(name, mapping) {
    return {
        name,
        mapping,
    };
}
exports.pushTest = pushTest;
/**
 * Convenient factory function for PushTest instances based on project predicates.
 * Also exposes project predicate
 * @param {string} name
 * @param predicate test function for projects
 * @return {PushTest}
 */
function predicatePushTest(name, predicate) {
    return {
        name,
        mapping: pli => predicate(pli.project),
        predicate,
    };
}
exports.predicatePushTest = predicatePushTest;
//# sourceMappingURL=PushTest.js.map