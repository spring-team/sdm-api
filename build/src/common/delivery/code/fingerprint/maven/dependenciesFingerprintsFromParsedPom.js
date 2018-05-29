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
const sha_1 = require("../../../../../util/misc/sha");
const artifact_1 = require("../../../build/local/maven/artifact");
/**
 * Don't call except via mavenFingerprinter
 * @param epom xml2js parsed form
 * @return {Promise<Fingerprint>}
 */
function dependenciesFingerprintsFromParsedPom(epom) {
    return __awaiter(this, void 0, void 0, function* () {
        const dependencies = epom.project.dependencies[0].dependency.map(artifact_1.toVersionedArtifact);
        const sorted = dependencies
            .sort((d1, d2) => artifact_1.coordinates(d1) > artifact_1.coordinates(d2) ? 1 : -1);
        const json = JSON.stringify(sorted);
        return {
            name: "dependencies",
            abbreviation: "deps",
            version: "0.1",
            sha: sha_1.computeShaOf(json),
            data: json,
        };
    });
}
exports.dependenciesFingerprintsFromParsedPom = dependenciesFingerprintsFromParsedPom;
//# sourceMappingURL=dependenciesFingerprintsFromParsedPom.js.map