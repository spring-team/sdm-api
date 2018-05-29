import { ProgressLog } from "../../spi/log/ProgressLog";
/**
 * ProgressLog implementation that captures the log into a string and makes it
 * available from the log field
 */
export declare class StringCapturingProgressLog implements ProgressLog {
    readonly name: string;
    log: string;
    close(): Promise<any>;
    flush(): Promise<any>;
    write(what: string): void;
    isAvailable(): Promise<boolean>;
}
