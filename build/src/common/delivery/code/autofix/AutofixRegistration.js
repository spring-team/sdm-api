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
const projectEditor_1 = require("@atomist/automation-client/operations/edit/projectEditor");
/**
 * Create an autofix from an existing editor. An editor for autofix
 * should not rely on parameters being passed in. An existing editor can be wrapped
 * to use predefined parameters.
 * Any use of MessageClient.respond in an editor used in an autofix will be redirected to
 * linked channels as autofixes are normally invoked in an EventHandler and EventHandlers
 * do not support respond. Be sure to set parameters if they are required by your editor.
 */
function editorAutofixRegistration(use) {
    const editorToUse = projectEditor_1.toEditor(use.editor);
    return {
        name: use.name,
        pushTest: use.pushTest,
        options: use.options,
        action: (cri) => __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.debug("About to edit using autofix editor %s", use.editor.toString());
            return editorToUse(cri.project, cri.context, use.parameters);
        }),
    };
}
exports.editorAutofixRegistration = editorAutofixRegistration;
//# sourceMappingURL=AutofixRegistration.js.map