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
const projectUtils_1 = require("@atomist/automation-client/project/util/projectUtils");
const PushTest_1 = require("../../../PushTest");
const commonPushTests_1 = require("../commonPushTests");
/**
 * Is this a Maven project
 * @constructor
 */
exports.IsMaven = PushTest_1.predicatePushTest("Is Maven", (p) => __awaiter(this, void 0, void 0, function* () { return !!(yield p.getFile("pom.xml")); }));
exports.IsJava = PushTest_1.predicatePushTest("Is Java", (p) => __awaiter(this, void 0, void 0, function* () { return projectUtils_1.fileExists(p, "**/*.java", () => true); }));
exports.IsClojure = commonPushTests_1.hasFileWithExtension("clj");
exports.IsLein = commonPushTests_1.hasFile("project.clj");
//# sourceMappingURL=jvmPushTests.js.map