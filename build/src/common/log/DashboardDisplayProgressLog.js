"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RolarProgressLog_1 = require("./RolarProgressLog");
/**
 * Persistent Rolar log that displays in the Dashboard
 */
class DashboardDisplayProgressLog {
    constructor(dashboardBaseUrl, rolarBaseUrl, context, sdmGoal) {
        this.dashboardBaseUrl = dashboardBaseUrl;
        this.context = context;
        this.sdmGoal = sdmGoal;
        this.rolarProgressLog = new RolarProgressLog_1.RolarProgressLog(rolarBaseUrl, constructLogPath(context, sdmGoal));
    }
    get name() {
        return this.rolarProgressLog.name;
    }
    get url() {
        if (this.dashboardBaseUrl) {
            const path = constructLogPath(this.context, this.sdmGoal);
            return `${this.dashboardBaseUrl}/workspace/${path[0]}/logs/${path.slice(1).join("/")}`;
        }
        else {
            return this.rolarProgressLog.url;
        }
    }
    isAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rolarProgressLog.isAvailable();
        });
    }
    write(what) {
        this.rolarProgressLog.write(what);
    }
    flush() {
        return this.rolarProgressLog.flush();
    }
    close() {
        return this.rolarProgressLog.close();
    }
}
exports.DashboardDisplayProgressLog = DashboardDisplayProgressLog;
function constructLogPath(context, sdmGoal) {
    return [
        context.teamId,
        sdmGoal.repo.owner,
        sdmGoal.repo.name,
        sdmGoal.sha,
        sdmGoal.environment,
        sdmGoal.name,
        sdmGoal.goalSetId,
        context.correlationId,
    ];
}
exports.constructLogPath = constructLogPath;
//# sourceMappingURL=DashboardDisplayProgressLog.js.map