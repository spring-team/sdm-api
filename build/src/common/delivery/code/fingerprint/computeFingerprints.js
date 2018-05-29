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
const _ = require("lodash");
/**
 * Compute fingerprints on this invocation with the given fingerprinters
 * @param {PushImpactListenerInvocation} pli
 * @param {Array<PushReaction<FingerprinterResult>>} fingerprinters
 * @return {Promise<Fingerprint[]>}
 */
function computeFingerprints(pli, fingerprinters) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield Promise.all(fingerprinters.map((fp) => __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.info("Using fingerprinter %s to fingerprint %j", fp.name, pli.id);
            const f = yield fp(pli);
            return isFingerprint(f) ? [f] : f;
        })));
        return _.flatten(results);
    });
}
exports.computeFingerprints = computeFingerprints;
function isFingerprint(a) {
    const fq = a;
    return !!fq.sha && !!fq.version;
}
exports.isFingerprint = isFingerprint;
//# sourceMappingURL=computeFingerprints.js.map