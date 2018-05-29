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
const Handlers_1 = require("@atomist/automation-client/Handlers");
const sendFingerprint_1 = require("../../../../util/webhook/sendFingerprint");
const createPushImpactListenerInvocation_1 = require("../createPushImpactListenerInvocation");
const PushReactionRegistration_1 = require("../PushReactionRegistration");
const computeFingerprints_1 = require("./computeFingerprints");
/**
 * Execute fingerprinting
 * @param projectLoader project loader
 * @param {FingerprinterRegistration} fingerprinters
 * @param listeners listeners to fingerprints
 */
function executeFingerprinting(projectLoader, fingerprinters, listeners) {
    return (rwlc) => __awaiter(this, void 0, void 0, function* () {
        const { id, credentials, context } = rwlc;
        if (fingerprinters.length === 0) {
            return Handlers_1.Success;
        }
        automation_client_1.logger.debug("About to fingerprint %j using %d fingerprinters", id, fingerprinters.length);
        yield projectLoader.doWithProject({ credentials, id, readOnly: true }, (project) => __awaiter(this, void 0, void 0, function* () {
            const cri = yield createPushImpactListenerInvocation_1.createPushImpactListenerInvocation(rwlc, project);
            const relevantFingerprinters = yield PushReactionRegistration_1.relevantCodeActions(fingerprinters, cri);
            automation_client_1.logger.info("Will invoke %d eligible fingerprinters of %d to %j", relevantFingerprinters.length, fingerprinters.length, cri.project.id);
            const fingerprints = yield computeFingerprints_1.computeFingerprints(cri, relevantFingerprinters.map(fp => fp.action));
            fingerprints.map(fingerprint => sendFingerprint_1.sendFingerprint(id, fingerprint, context.teamId));
            yield Promise.all(listeners.map(l => Promise.all(fingerprints.map(fingerprint => l({
                id,
                context,
                credentials,
                addressChannels: cri.addressChannels,
                fingerprint,
            })))));
        }));
        return Handlers_1.Success;
    });
}
exports.executeFingerprinting = executeFingerprinting;
//# sourceMappingURL=executeFingerprinting.js.map