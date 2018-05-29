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
const LoggingProgressLog_1 = require("../../common/log/LoggingProgressLog");
const types_1 = require("../../typings/types");
const fakeContext_1 = require("./fakeContext");
/**
 * Useful testing support
 * @param {RemoteRepoRef} id
 * @return {RunWithLogContext}
 */
function fakeRunWithLogContext(id) {
    return {
        credentials: { token: "foobar" },
        context: fakeContext_1.fakeContext("T1111"),
        id,
        addressChannels: (m) => __awaiter(this, void 0, void 0, function* () {
            automation_client_1.logger.info("channels > " + m);
        }),
        status: fakeStatus(id),
        progressLog: new LoggingProgressLog_1.LoggingProgressLog("fake"),
    };
}
exports.fakeRunWithLogContext = fakeRunWithLogContext;
function fakeStatus(id) {
    return {
        context: "fake",
        state: types_1.StatusState.pending,
        commit: {
            repo: {
                org: {
                    owner: id.owner,
                },
                name: id.repo,
                channels: [{
                        name: "foo",
                        id: "1",
                        team: {
                            id: "T357",
                        },
                    },
                ],
            },
            pushes: [
                {
                    id: "121",
                    branch: "foo",
                },
            ],
        },
    };
}
exports.fakeStatus = fakeStatus;
//# sourceMappingURL=fakeRunWithLogContext.js.map