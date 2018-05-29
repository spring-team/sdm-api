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
const util_1 = require("util");
const xml2js = require("xml2js");
exports.MavenProjectIdentifier = (p) => __awaiter(this, void 0, void 0, function* () {
    const pom = yield p.getFile("pom.xml");
    if (!pom) {
        return undefined;
    }
    const content = yield pom.getContent();
    const ident = yield identification(content);
    return { name: ident.artifact, version: ident.version };
});
/**
 * Return version info from the POM using xml2j XML parser
 * @param {string} pom
 * @return {Promise<VersionedArtifact>}
 */
function identification(pom) {
    const parser = new xml2js.Parser();
    return util_1.promisify(parser.parseString)(pom)
        .then((parsed) => {
        if (!!parsed.project) {
            return {
                group: parsed.project.groupId[0],
                artifact: parsed.project.artifactId[0],
                version: parsed.project.version[0],
            };
        }
        else {
            return Promise.reject("Pom is invalid");
        }
    });
}
exports.identification = identification;
//# sourceMappingURL=pomParser.js.map