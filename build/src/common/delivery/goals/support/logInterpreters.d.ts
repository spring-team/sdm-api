import { InterpretLog } from "../../../../spi/log/InterpretedLog";
/**
 * Generally useful InterpretLog that takes the last n logs of the log
 * @param {string} message
 * @param lines number of lines to take
 * @return {InterpretLog}
 */
export declare function lastLinesLogInterpreter(message: string, lines?: number): InterpretLog;
/**
 * Use when we don't want to report the log to the user under
 * any circumstances
 * @return {InterpretedLog}
 * @constructor
 */
export declare const LogSuppressor: InterpretLog;
