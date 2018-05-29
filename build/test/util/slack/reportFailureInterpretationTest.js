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
const assert = require("power-assert");
const reportFailureInterpretationToLinkedChannels_1 = require("../../../src/util/slack/reportFailureInterpretationToLinkedChannels");
describe("Reporting failure interpretation", () => {
    class AddressChannelsSpy {
        constructor() {
            this.messagesSent = [];
        }
        get sentFullLog() {
            return !!this.messagesSent.find(m => m.fileType === "text");
        }
    }
    function fakeAddressChannels() {
        const spy = new AddressChannelsSpy();
        const ac = (msg, opts) => __awaiter(this, void 0, void 0, function* () {
            spy.messagesSent.push(msg);
        });
        return [ac, spy];
    }
    it("Reports the full log if requested", () => __awaiter(this, void 0, void 0, function* () {
        const [ac, spy] = fakeAddressChannels();
        const interpretedLog = {
            relevantPart: "busted",
            message: "Hi",
            includeFullLog: true,
        };
        const fullLog = { log: "you are so busted" };
        yield reportFailureInterpretationToLinkedChannels_1.reportFailureInterpretationToLinkedChannels("stepName", interpretedLog, fullLog, { sha: "abc" }, ac);
        assert(spy.sentFullLog);
    }));
    it("Does not send the full log if specifically unrequested", () => __awaiter(this, void 0, void 0, function* () {
        const [ac, spy] = fakeAddressChannels();
        const interpretedLog = {
            relevantPart: "busted",
            message: "Hi",
            includeFullLog: false,
        };
        const fullLog = { url: "here", log: "you are so busted" };
        yield reportFailureInterpretationToLinkedChannels_1.reportFailureInterpretationToLinkedChannels("stepName", interpretedLog, fullLog, { sha: "abc" }, ac);
        assert(!spy.sentFullLog);
    }));
    it("Does not report the full log if unspecified, and the log is available at a url", () => __awaiter(this, void 0, void 0, function* () {
        const [ac, spy] = fakeAddressChannels();
        const interpretedLog = {
            relevantPart: "busted",
            message: "Hi",
        };
        const fullLog = { url: "here", log: "you are so busted" };
        yield reportFailureInterpretationToLinkedChannels_1.reportFailureInterpretationToLinkedChannels("stepName", interpretedLog, fullLog, { sha: "abc" }, ac);
        assert(!spy.sentFullLog);
    }));
    it("Reports the full log if unspecified, but the log does not have a url", () => __awaiter(this, void 0, void 0, function* () {
        const [ac, spy] = fakeAddressChannels();
        const interpretedLog = {
            relevantPart: "busted",
            message: "Hi",
        };
        const fullLog = { log: "you are so busted" };
        yield reportFailureInterpretationToLinkedChannels_1.reportFailureInterpretationToLinkedChannels("stepName", interpretedLog, fullLog, { sha: "abc" }, ac);
        assert(spy.sentFullLog);
    }));
});
//# sourceMappingURL=reportFailureInterpretationTest.js.map