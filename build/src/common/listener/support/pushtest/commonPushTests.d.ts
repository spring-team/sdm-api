import { PredicatePushTest, PushTest } from "../../PushTest";
export declare const ToDefaultBranch: PushTest;
/**
 * Is this a push originated by Atomist? Note that we can't look at the committer,
 * as if a user invoked a command handler, their credentials will be used
 * @param {PushListenerInvocation} p
 * @return {boolean}
 * @constructor
 */
export declare const FromAtomist: PushTest;
/**
 * Match on any push
 * @param {PushListenerInvocation} p
 * @constructor
 */
export declare const AnyPush: PushTest;
/**
 * Match only pushes on a public repo
 * @param {PushListenerInvocation} p
 * @return {Promise<boolean>}
 * @constructor
 */
export declare const ToPublicRepo: PushTest;
/**
 * Return a PushTest testing for the existence of the given file
 * @param {string} path
 * @return {PushTest}
 */
export declare function hasFile(path: string): PredicatePushTest;
/**
 * Return a PushTest testing for the existence of the given file containing the pattern
 * @param {string} path
 * @param pattern regex to look for
 * @return {PushTest}
 */
export declare function hasFileContaining(path: string, pattern: RegExp): PredicatePushTest;
/**
 * Is there at least one file with the given extension?
 * @param {string} extension
 * @return {PredicatePushTest}
 */
export declare function hasFileWithExtension(extension: string): PredicatePushTest;
