import { ProgressLog } from "../../spi/log/ProgressLog";
/**
 * Write to multiple progress logs, exposing them as one.
 */
export declare class WriteToAllProgressLog implements ProgressLog {
    name: string;
    private readonly logs;
    constructor(name: string, log1: ProgressLog, log2: ProgressLog, ...others: ProgressLog[]);
    isAvailable(): Promise<boolean>;
    write(what: string): void;
    flush(): Promise<any[]>;
    close(): Promise<any[]>;
    readonly log: string;
    readonly url: string;
}
