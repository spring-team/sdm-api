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
const spawned_1 = require("../../../../../util/misc/spawned");
const commonPushTests_1 = require("../../../../listener/support/pushtest/commonPushTests");
const nodePushTests_1 = require("../../../../listener/support/pushtest/node/nodePushTests");
const tsPushTests_1 = require("../../../../listener/support/pushtest/node/tsPushTests");
const pushTestUtils_1 = require("../../../../listener/support/pushtest/pushTestUtils");
const npmBuilder_1 = require("../../../build/local/npm/npmBuilder");
const spawnedCommandAutofix_1 = require("../spawnedCommandAutofix");
exports.tslintFix = spawnedCommandAutofix_1.spawnedCommandAutofix("tslint", pushTestUtils_1.allSatisfied(tsPushTests_1.IsTypeScript, nodePushTests_1.IsNode, commonPushTests_1.hasFile("tslint.json")), { ignoreFailure: true, considerOnlyChangedFiles: false }, npmBuilder_1.Install, spawned_1.asSpawnCommand("npm run lint:fix", npmBuilder_1.DevelopmentEnvOptions));
//# sourceMappingURL=tslint.js.map