import { HandlerContext } from "@atomist/automation-client";
/**
 * Convenient function to allow creating fake contexts.
 * Useful for testing
 * @param {string} teamId
 * @return {any}
 */
export declare function fakeContext(teamId?: string): HandlerContext;
