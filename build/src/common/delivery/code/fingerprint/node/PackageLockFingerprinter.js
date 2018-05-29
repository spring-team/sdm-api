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
const sha_1 = require("../../../../../util/misc/sha");
const nodePushTests_1 = require("../../../../listener/support/pushtest/node/nodePushTests");
/**
 * Compute a fingerprint from a package-lock.json file.
 * Unlike a Maven POM, we can rely on ordering in a package lock file
 * so do not need to sort the data ourselves before sha-ing.
 */
class PackageLockFingerprinter {
    constructor() {
        this.name = "PackageLockFingerprinter";
        this.pushTest = nodePushTests_1.IsNode;
    }
    action(cri) {
        return __awaiter(this, void 0, void 0, function* () {
            const lockFile = yield cri.project.getFile("package-lock.json");
            if (!lockFile) {
                return [];
            }
            try {
                const content = yield lockFile.getContent();
                const json = JSON.parse(content);
                const deps = json.dependencies;
                const dstr = JSON.stringify(deps);
                return {
                    name: "dependencies",
                    abbreviation: "deps",
                    version: "0.1",
                    sha: sha_1.computeShaOf(dstr),
                    data: json,
                };
            }
            catch (err) {
                automation_client_1.logger.warn("Unable to compute package-lock.json fingerprint: %s", err.message);
                return [];
            }
        });
    }
}
exports.PackageLockFingerprinter = PackageLockFingerprinter;
//# sourceMappingURL=PackageLockFingerprinter.js.map