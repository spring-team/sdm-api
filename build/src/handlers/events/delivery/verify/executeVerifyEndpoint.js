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
const sprintf_js_1 = require("sprintf-js");
const fetchGoalsOnCommit_1 = require("../../../../common/delivery/goals/support/fetchGoalsOnCommit");
const repoRef_1 = require("../../../../util/git/repoRef");
function executeVerifyEndpoint(sdm) {
    return (r) => __awaiter(this, void 0, void 0, function* () {
        const { context, id, status } = r;
        const sdmGoals = yield fetchGoalsOnCommit_1.fetchGoalsForCommit(context, id, repoRef_1.providerIdFromStatus(status));
        const endpointGoal = sdmGoals.find(sg => sg.externalKey === sdm.endpointGoal.context);
        if (!endpointGoal) {
            r.progressLog.write(sprintf_js_1.sprintf("Did not find endpoint goal. Looking for context %s", sdm.endpointGoal.context));
            throw new Error("Endpoint goal unfound");
        }
        if (!endpointGoal.url) {
            r.progressLog.write(sprintf_js_1.sprintf("Did not find endpoint url: %j", endpointGoal));
            throw new Error("Endpoint goal has no URL");
        }
        const inv = {
            id: r.id,
            url: endpointGoal.url,
            addressChannels: r.addressChannels,
            context: r.context,
            credentials: r.credentials,
        };
        yield Promise.all(sdm.verifiers.map(verifier => verifier(inv).catch(err => {
            r.progressLog.write("A verifier threw: " + err.message);
            r.progressLog.write("stack: " + err.stack);
            throw err;
        })));
        return { code: 0, requireApproval: sdm.requestApproval, targetUrl: endpointGoal.url };
    });
}
exports.executeVerifyEndpoint = executeVerifyEndpoint;
//# sourceMappingURL=executeVerifyEndpoint.js.map