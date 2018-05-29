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
const NpmDetectBuildMapping_1 = require("../../../../delivery/build/local/npm/NpmDetectBuildMapping");
const PushTest_1 = require("../../../PushTest");
const commonPushTests_1 = require("../commonPushTests");
exports.IsNode = PushTest_1.predicatePushTest("Is Node", (p) => __awaiter(this, void 0, void 0, function* () {
    try {
        const f = yield p.findFile("package.json");
        const contents = yield f.getContent();
        JSON.parse(contents);
        return true;
    }
    catch (err) {
        return false;
    }
}));
exports.IsAtomistAutomationClient = commonPushTests_1.hasFile("src/atomist.config.ts");
exports.HasAtomistBuildFile = commonPushTests_1.hasFile(NpmDetectBuildMapping_1.AtomistBuildFile);
//# sourceMappingURL=nodePushTests.js.map