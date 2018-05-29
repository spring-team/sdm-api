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
const Goal_1 = require("../Goal");
const gitHubContext_1 = require("../support/github/gitHubContext");
/**
 * Generic goal. Used when creating use-case specific specific goals.
 */
class GenericGoal extends Goal_1.Goal {
    constructor(params, description) {
        super(Object.assign({ uniqueName: params.uniqueName, environment: gitHubContext_1.IndependentOfEnvironment, orderedName: `99-${params.uniqueName}`, workingDescription: `Working: ${description}`, completedDescription: `${description} succeeded`, failedDescription: `${description} failed` }, params));
    }
}
exports.GenericGoal = GenericGoal;
//# sourceMappingURL=GenericGoal.js.map