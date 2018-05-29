import { HandlerContext } from "@atomist/automation-client";
import { SdmGoal } from "../../ingesters/sdmGoalIngester";
/**
 * Log abstraction for output of a specific activity. Not intended as a long-running log
 * but for a short-lived activity.
 * Not a technical log of this project but a log of meaningful activity
 * on behalf of users.
 */
export interface ProgressLog {
    /**
     * Name. Should relate to the immediate activity we're logging.
     */
    readonly name: string;
    write(what: string): void;
    flush(): Promise<any>;
    close(): Promise<any>;
    /**
     * Some implementations expose their log as a string.
     * Others may not, as it could be too long etc.
     */
    log?: string;
    /**
     * Return the url of the log if it is persisted
     */
    url?: string;
    /**
     * Is this logger available at this point in time?
     * E.g. if it's backed by a service, is that service up?
     */
    isAvailable(): Promise<boolean>;
}
/**
 * Function to create a ProgressLog for a given goal execution
 */
export declare type ProgressLogFactory = (context: HandlerContext, sdmGoal: SdmGoal) => Promise<ProgressLog>;
