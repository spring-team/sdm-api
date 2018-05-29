import { ProjectOperationCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
/**
 * Convert the given credentials or token string to a token string
 * if possible. Otherwise throw an exception.
 * @param {ProjectOperationCredentials | string} credentials
 * @return {string}
 */
export declare function toToken(credentials: ProjectOperationCredentials | string): string;
