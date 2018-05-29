import { ProgressLog } from "../../spi/log/ProgressLog";
/**
 * Return the first available progress log.
 * Error if none is available: Pass in a fallback that's always available.
 * @param log first log
 * @param {ProgressLog} moreLogs
 * @return {Promise<ProgressLog>}
 */
export declare function firstAvailableProgressLog(log: ProgressLog, ...moreLogs: ProgressLog[]): Promise<ProgressLog>;
