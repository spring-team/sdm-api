import { ProgressLog } from "../../spi/log/ProgressLog";
import { AxiosInstance } from "axios";
import { WrapOptions } from "retry";
/**
 * Post log to Atomist Rolar service for it to persist
 */
export declare class RolarProgressLog implements ProgressLog {
    private readonly rolarBaseUrl;
    private readonly logPath;
    private readonly bufferSizeLimit;
    private readonly logLevel;
    private readonly timestamper;
    private readonly retryOptions;
    private readonly axiosInstance;
    private localLogs;
    constructor(rolarBaseUrl: string, logPath: string[], bufferSizeLimit?: number, logLevel?: string, timestamper?: Iterator<Date>, retryOptions?: WrapOptions, axiosInstance?: AxiosInstance);
    readonly name: string;
    readonly url: string;
    isAvailable(): Promise<boolean>;
    write(what: string): void;
    flush(): Promise<any>;
    close(): Promise<any>;
    private postLogs(isClosed);
    private constructUtcTimestamp();
}
