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
const _ = require("lodash");
const axios_1 = require("axios");
const automation_client_1 = require("@atomist/automation-client");
const retry_1 = require("@atomist/automation-client/util/retry");
const os = require("os");
function* timestampGenerator() {
    while (true) {
        yield new Date();
    }
}
/**
 * Post log to Atomist Rolar service for it to persist
 */
class RolarProgressLog {
    constructor(rolarBaseUrl, logPath, bufferSizeLimit = 10000, logLevel = "info", timestamper = timestampGenerator(), retryOptions = {}, axiosInstance = axios_1.default) {
        this.rolarBaseUrl = rolarBaseUrl;
        this.logPath = logPath;
        this.bufferSizeLimit = bufferSizeLimit;
        this.logLevel = logLevel;
        this.timestamper = timestamper;
        this.retryOptions = retryOptions;
        this.axiosInstance = axiosInstance;
        this.localLogs = [];
    }
    get name() {
        return this.logPath.join("/");
    }
    get url() {
        return `${this.rolarBaseUrl}/logs/${this.name}`;
    }
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.rolarBaseUrl}/api/logs`;
            try {
                yield retry_1.doWithRetry(() => this.axiosInstance.head(url), `check if Rolar service is available`, this.retryOptions);
                return true;
            }
            catch (e) {
                automation_client_1.logger.warn(`Rolar logger is NOT available at ${url}: ${e}`);
                return false;
            }
        });
    }
    write(what) {
        const line = what;
        this.localLogs.push({
            level: this.logLevel,
            message: line,
            timestamp: this.constructUtcTimestamp(),
        });
        const bufferSize = this.localLogs.reduce((acc, logData) => acc + logData.message.length, 0);
        if (bufferSize > this.bufferSizeLimit) {
            // tslint:disable-next-line:no-floating-promises
            this.flush();
        }
    }
    flush() {
        return this.postLogs(false);
    }
    close() {
        return this.postLogs(true);
    }
    postLogs(isClosed) {
        return __awaiter(this, void 0, void 0, function* () {
            const closedRequestParam = isClosed ? "?closed=true" : "";
            const url = `${this.rolarBaseUrl}/api/logs/${this.logPath.join("/")}${closedRequestParam}`;
            const postingLogs = this.localLogs;
            this.localLogs = [];
            const result = yield retry_1.doWithRetry(() => this.axiosInstance.post(url, {
                host: os.hostname(),
                content: postingLogs,
            }, {
                headers: { "Content-Type": "application/json" },
            }), `post log to Rolar`, this.retryOptions).catch(e => {
                this.localLogs = postingLogs.concat(this.localLogs);
                automation_client_1.logger.error(e);
            });
            return result;
        });
    }
    constructUtcTimestamp() {
        if (!this.timestamper) {
            return "";
        }
        const now = this.timestamper.next().value;
        const date = [now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCFullYear()]
            .map(t => _.padStart(t.toString(), 2, "0"));
        const time = [now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()]
            .map(t => _.padStart(t.toString(), 2, "0"));
        return `${date.join("/")} ${time.join(":")}.${_.padStart(now.getUTCMilliseconds().toString(), 3, "0")}`;
    }
}
exports.RolarProgressLog = RolarProgressLog;
//# sourceMappingURL=RolarProgressLog.js.map