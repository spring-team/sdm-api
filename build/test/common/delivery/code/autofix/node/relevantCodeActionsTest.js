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
const InMemoryProject_1 = require("@atomist/automation-client/project/mem/InMemoryProject");
const axios_1 = require("axios");
const assert = require("power-assert");
const AutofixRegistration_1 = require("../../../../../../src/common/delivery/code/autofix/AutofixRegistration");
const tslint_1 = require("../../../../../../src/common/delivery/code/autofix/node/tslint");
const PushReactionRegistration_1 = require("../../../../../../src/common/delivery/code/PushReactionRegistration");
describe("relevantCodeActions", () => {
    it("should match action without push test", () => __awaiter(this, void 0, void 0, function* () {
        const pti = null;
        const autofixes = AutofixRegistration_1.editorAutofixRegistration({
            name: "License Fix",
            editor: (p) => __awaiter(this, void 0, void 0, function* () {
                const license = yield axios_1.default.get("https://www.apache.org/licenses/LICENSE-2.0.txt");
                return p.addFile("LICENSE", license.data);
            }),
        });
        const relevant = yield PushReactionRegistration_1.relevantCodeActions([autofixes], pti);
        assert.equal(relevant.length, 1);
    }));
    it("should ignore irrelevant", () => __awaiter(this, void 0, void 0, function* () {
        const pti = {
            project: new InMemoryProject_1.InMemoryProject(),
            push: {
                id: "x",
            },
        };
        const relevant = yield PushReactionRegistration_1.relevantCodeActions([tslint_1.tslintFix], pti);
        assert.equal(relevant.length, 0);
    }));
});
//# sourceMappingURL=relevantCodeActionsTest.js.map