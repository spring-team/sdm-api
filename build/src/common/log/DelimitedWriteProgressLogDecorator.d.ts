import { ProgressLog } from "../../spi/log/ProgressLog";
/**
 * Sometimes new log lines are separated by a character rather than a call to write.
 * For example, when receiving data events from a child process newlines delimit log lines.
 */
export declare class DelimitedWriteProgressLogDecorator implements ProgressLog {
    private readonly delegate;
    private readonly lineDelimiter;
    private lineBuffer;
    constructor(delegate: ProgressLog, lineDelimiter: string);
    readonly name: string;
    readonly url: string;
    isAvailable(): Promise<boolean>;
    write(what: string): void;
    flush(): Promise<any>;
    close(): Promise<any>;
    private writeRemainder();
}
