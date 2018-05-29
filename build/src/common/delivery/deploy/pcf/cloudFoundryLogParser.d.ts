/**
 * Use a microgrammar to parse the Cloud Foundry log to extract the endpoint
 * url if found. Look for urls: or routes: style exposure in log.
 */
export declare function parseCloudFoundryLogForEndpoint(cfLog: string): string | undefined;
