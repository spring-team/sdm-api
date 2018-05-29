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
const PushRule_1 = require("../../common/listener/support/PushRule");
const commonPushTests_1 = require("../../common/listener/support/pushtest/commonPushTests");
function when(guard1, ...guards) {
    return new PushRule_1.PushRule(guard1, guards);
}
exports.when = when;
function setDefault(builder) {
    return new PushRule_1.PushRule(commonPushTests_1.AnyPush, [], "On any push").set(builder);
}
exports.setDefault = setDefault;
//# sourceMappingURL=buildDsl.js.map