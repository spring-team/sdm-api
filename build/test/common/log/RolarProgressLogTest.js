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
const axios_1 = require("axios");
const axios_mock_adapter_1 = require("axios-mock-adapter");
const assert = require("power-assert");
const RolarProgressLog_1 = require("../../../src/common/log/RolarProgressLog");
describe("RolarProgressLog", () => {
    function* fakeTimestampGenerator() {
        let index = 0;
        while (true) {
            yield new Date(index++);
        }
    }
    it("should be available if returning http 200", () => __awaiter(this, void 0, void 0, function* () {
        const axiosInstance = axios_1.default.create();
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "info", fakeTimestampGenerator(), { retries: 0 }, axiosInstance);
        const mockAxios = new axios_mock_adapter_1.default(axiosInstance);
        mockAxios.onHead("http://fakehost/api/logs").replyOnce(200);
        assert.equal(yield log.isAvailable(), true);
    }));
    it("should not be available if returning http 404", () => __awaiter(this, void 0, void 0, function* () {
        const axiosInstance = axios_1.default.create();
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "info", fakeTimestampGenerator(), { retries: 0 }, axiosInstance);
        const mockAxios = new axios_mock_adapter_1.default(axiosInstance);
        mockAxios.onHead("http://fakehost/api/logs").replyOnce(404);
        assert.equal(yield log.isAvailable(), false);
    }));
    it("should write logs to memory", () => __awaiter(this, void 0, void 0, function* () {
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "info", fakeTimestampGenerator());
        log.write("I'm a lumberjack and I'm OK");
        log.write("I sleep all night and I work all day");
        assert.deepEqual(log.localLogs, [
            {
                level: "info",
                message: "I'm a lumberjack and I'm OK",
                timestamp: "01/01/1970 00:00:00.000",
            },
            {
                level: "info",
                message: "I sleep all night and I work all day",
                timestamp: "01/01/1970 00:00:00.001",
            },
        ]);
    }));
    it("should flush logs", () => __awaiter(this, void 0, void 0, function* () {
        const axiosInstance = axios_1.default.create();
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "info", fakeTimestampGenerator(), { retries: 0 }, axiosInstance);
        const mockAxios = new axios_mock_adapter_1.default(axiosInstance);
        mockAxios.onPost("http://fakehost/api/logs/test")
            .replyOnce(config => {
            const expectedRequest = [
                {
                    level: "info",
                    message: "He's a lumberjack and he's OK",
                    timestamp: "01/01/1970 00:00:00.000",
                },
                {
                    level: "info",
                    message: "He sleeps all night and he works all day",
                    timestamp: "01/01/1970 00:00:00.001",
                },
            ];
            const actualRequest = JSON.parse(config.data).content;
            assert.deepEqual(actualRequest, expectedRequest);
            return [200];
        });
        log.write("He's a lumberjack and he's OK");
        log.write("He sleeps all night and he works all day");
        yield log.flush();
        assert.deepEqual(log.localLogs, []);
    }));
    it("should not clear logs if flush fails", () => __awaiter(this, void 0, void 0, function* () {
        const axiosInstance = axios_1.default.create();
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "info", fakeTimestampGenerator(), { retries: 0 }, axiosInstance);
        const mockAxios = new axios_mock_adapter_1.default(axiosInstance);
        mockAxios.onPost("http://fakehost/api/logs/test")
            .replyOnce(404);
        log.write("I cut down trees, I eat my lunch");
        log.write("I go to the lavatory");
        yield log.flush();
        assert.deepEqual(log.localLogs, [
            {
                level: "info",
                message: "I cut down trees, I eat my lunch",
                timestamp: "01/01/1970 00:00:00.000",
            },
            {
                level: "info",
                message: "I go to the lavatory",
                timestamp: "01/01/1970 00:00:00.001",
            },
        ]);
    }));
    it("should close logs", () => __awaiter(this, void 0, void 0, function* () {
        const axiosInstance = axios_1.default.create();
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "info", fakeTimestampGenerator(), { retries: 0 }, axiosInstance);
        const mockAxios = new axios_mock_adapter_1.default(axiosInstance);
        mockAxios.onPost("http://fakehost/api/logs/test?closed=true")
            .replyOnce(config => {
            const expectedRequest = [
                {
                    level: "info",
                    message: "On Wednesdays I go shopping and have buttered scones for tea",
                    timestamp: "01/01/1970 00:00:00.000",
                },
            ];
            const actualRequest = JSON.parse(config.data).content;
            assert.deepEqual(actualRequest, expectedRequest);
            return [200];
        });
        log.write("On Wednesdays I go shopping and have buttered scones for tea");
        yield log.close();
        assert.deepEqual(log.localLogs, []);
    }));
    it("should flush logs automatically", () => __awaiter(this, void 0, void 0, function* () {
        const axiosInstance = axios_1.default.create();
        const smallBufferLog = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 50, "info", fakeTimestampGenerator(), { retries: 0 }, axiosInstance);
        const mockAxios = new axios_mock_adapter_1.default(axiosInstance);
        mockAxios.onPost("http://fakehost/api/logs/test")
            .replyOnce(config => {
            const expectedRequest = [
                {
                    level: "info",
                    message: "He cuts down trees, he eats his lunch",
                    timestamp: "01/01/1970 00:00:00.000",
                },
                {
                    level: "info",
                    message: "He goes to the lavatory",
                    timestamp: "01/01/1970 00:00:00.001",
                },
            ];
            const actualRequest = JSON.parse(config.data).content;
            assert.deepEqual(actualRequest, expectedRequest);
            return [200];
        });
        smallBufferLog.write("He cuts down trees, he eats his lunch");
        smallBufferLog.write("He goes to the lavatory");
        smallBufferLog.write("On Wednesdays he goes shopping and has buttered scones for tea");
        assert.deepEqual(smallBufferLog.localLogs, []);
    }));
    it("should provide a link to the log", () => __awaiter(this, void 0, void 0, function* () {
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test", "it"], 10000, "info", fakeTimestampGenerator());
        assert.equal(log.url, "http://fakehost/logs/test/it");
    }));
    it("should log as debug", () => __awaiter(this, void 0, void 0, function* () {
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "debug", fakeTimestampGenerator());
        log.write("I'm a lumberjack and I'm OK");
        log.write("I sleep all night and I work all day");
        assert.deepEqual(log.localLogs, [
            {
                level: "debug",
                message: "I'm a lumberjack and I'm OK",
                timestamp: "01/01/1970 00:00:00.000",
            },
            {
                level: "debug",
                message: "I sleep all night and I work all day",
                timestamp: "01/01/1970 00:00:00.001",
            },
        ]);
    }));
    it("should log without timestamp", () => __awaiter(this, void 0, void 0, function* () {
        const log = new RolarProgressLog_1.RolarProgressLog("http://fakehost", ["test"], 10000, "", null);
        log.write("I'm a lumberjack and I'm OK");
        log.write("I sleep all night and I work all day");
        assert.deepEqual(log.localLogs, [
            {
                level: "",
                message: "I'm a lumberjack and I'm OK",
                timestamp: "",
            },
            {
                level: "",
                message: "I sleep all night and I work all day",
                timestamp: "",
            },
        ]);
    }));
});
//# sourceMappingURL=RolarProgressLogTest.js.map