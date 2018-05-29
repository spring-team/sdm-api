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
const astUtils_1 = require("@atomist/automation-client/tree/ast/astUtils");
const CFamilyLangHelper_1 = require("@atomist/microgrammar/matchers/lang/cfamily/CFamilyLangHelper");
const sha_1 = require("../misc/sha");
const JavaScriptElementRequest_1 = require("./JavaScriptElementRequest");
/**
 * Request the given elements in a language
 * @param {Project} p
 * @param {Partial<ElementRequest>} opts
 * @return {Promise<Element[]>}
 */
function findElements(p, opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const optsToUse = Object.assign({}, JavaScriptElementRequest_1.JavaScriptElementRequest, opts);
        const matches = yield astUtils_1.findMatches(p, optsToUse.fileParser, optsToUse.globPattern, optsToUse.pathExpression);
        const helper = new CFamilyLangHelper_1.CFamilyLangHelper();
        return matches.map(m => {
            const identifier = optsToUse.extractIdentifier(m);
            const body = m.$value;
            const canonicalBody = !!optsToUse.canonicalize ? optsToUse.canonicalize(m) : helper.canonicalize(body);
            return {
                node: m,
                path: m.sourceLocation.path,
                identifier,
                body,
                canonicalBody,
                sha: sha_1.computeShaOf(canonicalBody),
            };
        }).filter(sig => !optsToUse.identifierPattern || optsToUse.identifierPattern.test(sig.identifier));
    });
}
exports.findElements = findElements;
//# sourceMappingURL=elementRequest.js.map