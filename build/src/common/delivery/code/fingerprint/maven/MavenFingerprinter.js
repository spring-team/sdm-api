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
const dependenciesFingerprintsFromParsedPom_1 = require("./dependenciesFingerprintsFromParsedPom");
const effectivePomExtractor_1 = require("./effectivePomExtractor");
/**
 * Public entry point for all Maven fingerprints. Use mvn help:effective-pom
 * to generic effective POM then parse it and turn it into fingerprints.
 * @param {GitProject} p
 * @return {Promise<Fingerprint[]>}
 */
class MavenFingerprinter {
    constructor() {
        this.name = "MavenFingerprinter";
    }
    action(cri) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cri.project.findFile("pom.xml");
                const epom = yield effectivePomExtractor_1.extractEffectivePom(cri.project);
                return Promise.all([
                    dependenciesFingerprintsFromParsedPom_1.dependenciesFingerprintsFromParsedPom,
                ].map(fp => fp(epom)));
            }
            catch (_a) {
                // If we can't find a pom, just exit
                return [];
            }
        });
    }
}
exports.MavenFingerprinter = MavenFingerprinter;
//# sourceMappingURL=MavenFingerprinter.js.map