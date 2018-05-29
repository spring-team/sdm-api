import { ProgressLog } from "../../spi/log/ProgressLog";
/**
 * Progress log to logger, at a desired logging level
 */
export declare class LoggingProgressLog implements ProgressLog {
    name: string;
    private readonly level;
    log: string;
    constructor(name: string, level?: "debug" | "info");
    write(pWhat: string): void;
    isAvailable(): Promise<boolean>;
    flush(): Promise<void>;
    close(): Promise<void>;
}
