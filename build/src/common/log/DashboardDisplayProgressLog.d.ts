import { HandlerContext } from "@atomist/automation-client";
import { SdmGoal } from "../../ingesters/sdmGoalIngester";
import { ProgressLog } from "../../spi/log/ProgressLog";
/**
 * Persistent Rolar log that displays in the Dashboard
 */
export declare class DashboardDisplayProgressLog implements ProgressLog {
    private readonly dashboardBaseUrl;
    private readonly context;
    private readonly sdmGoal;
    private readonly rolarProgressLog;
    constructor(dashboardBaseUrl: string, rolarBaseUrl: string, context: HandlerContext, sdmGoal: SdmGoal);
    readonly name: string;
    readonly url: string;
    isAvailable(): Promise<boolean>;
    write(what: string): void;
    flush(): Promise<any>;
    close(): Promise<any>;
}
export declare function constructLogPath(context: HandlerContext, sdmGoal: SdmGoal): string[];
