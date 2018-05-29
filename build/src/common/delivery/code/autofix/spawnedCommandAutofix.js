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
const editorWrappers_1 = require("../../../command/editor/editorWrappers");
const AutofixRegistration_1 = require("./AutofixRegistration");
/**
 * Register an autofix based on spawned local shell commands.
 * For example, could wrap a linter
 */
function spawnedCommandAutofix(name, pushTest, options, command1, ...additionalCommands) {
    return AutofixRegistration_1.editorAutofixRegistration({
        name,
        editor: editorWrappers_1.localCommandsEditor([command1].concat(additionalCommands)),
        pushTest,
        options,
    });
}
exports.spawnedCommandAutofix = spawnedCommandAutofix;
//# sourceMappingURL=spawnedCommandAutofix.js.map