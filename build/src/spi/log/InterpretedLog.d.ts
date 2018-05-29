/**
 * Log from which we've been able to glean further information
 * @type D type of additional structured data, if available
 */
export interface InterpretedLog<D = any> {
    /**
     * Relevant part of log to display in UX, if we were able to identify it
     */
    relevantPart: string;
    message: string;
    /**
     * Should the UX include the full log, or is it too long or ugly?
     */
    includeFullLog?: boolean;
    /**
     * Additional structured information from the log, if specified
     */
    data?: D;
    /**
     * Set to true only if we should not bother to report this log to the user
     */
    doNotReportToUser?: boolean;
}
/**
 * Function that can try to interpret a log for display to a user.
 * Return undefined if the log cannot be interpreted.
 */
export declare type InterpretLog<D = any> = (log: string) => InterpretedLog<D> | undefined;
/**
 * Implemented by types that have the ability to interpret the logs they generate
 */
export interface LogInterpretation {
    logInterpreter: InterpretLog;
}
