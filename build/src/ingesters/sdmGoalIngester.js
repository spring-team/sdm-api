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
const sprintf_js_1 = require("sprintf-js");
exports.GoalRootType = "SdmGoal";
function mapKeyToGoal(goals) {
    return (keyToFind) => {
        const found = goals.find(g => goalKeyEquals(g, keyToFind));
        return found;
    };
}
exports.mapKeyToGoal = mapKeyToGoal;
function goalKeyEquals(a, b) {
    return a.environment === b.environment &&
        a.name === b.name;
}
exports.goalKeyEquals = goalKeyEquals;
function goalKeyString(gk) {
    return sprintf_js_1.sprintf("%s in %s", gk.name, gk.environment);
}
exports.goalKeyString = goalKeyString;
//# sourceMappingURL=sdmGoalIngester.js.map