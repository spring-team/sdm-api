export interface TestStatus {
    passingTests: number;
    pendingTests: number;
    failingTests: number;
    errors: number;
}
/**
 * Data common to all builds
 */
export interface BuildInfo {
    timeMillis?: number;
    success: boolean;
    testInfo?: TestStatus;
}
