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
const DashboardDisplayProgressLog_1 = require("../../common/log/DashboardDisplayProgressLog");
const EphemeralProgressLog_1 = require("../../common/log/EphemeralProgressLog");
const firstAvailableProgressLog_1 = require("../../common/log/firstAvailableProgressLog");
const LoggingProgressLog_1 = require("../../common/log/LoggingProgressLog");
const WriteToAllProgressLog_1 = require("../../common/log/WriteToAllProgressLog");
/**
 * Create a progress log that will use Rolar logging service if available,
 * otherwise falling back to logging.
 * @param {string} rolarBaseUrl
 * @param {string} dashboardBaseUrl
 * @return {ProgressLogFactory}
 */
function logFactory(rolarBaseUrl, dashboardBaseUrl) {
    let persistentLogFactory = (context, sdmGoal, fallback) => firstAvailableProgressLog_1.firstAvailableProgressLog(fallback);
    if (rolarBaseUrl) {
        automation_client_1.logger.info("Logging with Rolar at " + rolarBaseUrl);
        persistentLogFactory = (context, sdmGoal, fallback) => {
            return firstAvailableProgressLog_1.firstAvailableProgressLog(new DashboardDisplayProgressLog_1.DashboardDisplayProgressLog(dashboardBaseUrl, rolarBaseUrl, context, sdmGoal), fallback);
        };
    }
    return (context, sdmGoal) => __awaiter(this, void 0, void 0, function* () {
        const name = sdmGoal.name;
        const persistentLog = yield persistentLogFactory(context, sdmGoal, new LoggingProgressLog_1.LoggingProgressLog(name, "info"));
        return new WriteToAllProgressLog_1.WriteToAllProgressLog(name, yield EphemeralProgressLog_1.createEphemeralProgressLog(context, sdmGoal), persistentLog);
    });
}
exports.logFactory = logFactory;
//# sourceMappingURL=logFactory.js.map