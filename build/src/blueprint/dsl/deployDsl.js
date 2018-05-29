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
class DeployPushRule extends PushRule_1.PushRule {
    constructor(guard1, guards, reason) {
        super(guard1, guards, reason);
    }
    deployTo(deployGoal, endpointGoal, undeployGoal) {
        const outer = this;
        return {
            using(t) {
                outer.set(Object.assign({}, t, { deployGoal,
                    endpointGoal,
                    undeployGoal }));
                return outer;
            },
        };
    }
}
exports.DeployPushRule = DeployPushRule;
function when(guard1, ...guards) {
    return new DeployPushRule(guard1, guards);
}
exports.when = when;
//# sourceMappingURL=deployDsl.js.map