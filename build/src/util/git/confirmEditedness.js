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
const stringify = require("json-stringify-safe");
/**
 * Try to work out whether a project was edited, looking at git status
 * if we can't find out from the edit result
 * @param {EditResult} editResult
 * @return {Promise<EditResult>}
 */
function confirmEditedness(editResult) {
    return __awaiter(this, void 0, void 0, function* () {
        if (editResult.edited === undefined) {
            const gs = yield editResult.target.gitStatus();
            automation_client_1.logger.debug("Git status: " + stringify(gs));
            return Object.assign({}, editResult, { edited: !gs.isClean });
        }
        else {
            return editResult;
        }
    });
}
exports.confirmEditedness = confirmEditedness;
//# sourceMappingURL=confirmEditedness.js.map