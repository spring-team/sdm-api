import { Project } from "@atomist/automation-client/project/Project";
import { PushListenerInvocation } from "./PushListener";
import { PushMapping } from "./PushMapping";
/**
 * Special PushMapping. Return true if we like this push. Used in goal setting etc.
 */
export declare type PushTest = PushMapping<boolean>;
/**
 * Test against a project
 */
export declare type ProjectPredicate = (p: Project) => Promise<boolean>;
/**
 * Convenient factory function for PushTest instances
 * @param {string} name
 * @param mapping test function
 * @return {PushTest}
 */
export declare function pushTest(name: string, mapping: (p: PushListenerInvocation) => Promise<boolean>): PushTest;
/**
 * PushTest that also exposes the ProjectPredicate it is
 * based on
 */
export interface PredicatePushTest extends PushTest {
    predicate: ProjectPredicate;
}
/**
 * Convenient factory function for PushTest instances based on project predicates.
 * Also exposes project predicate
 * @param {string} name
 * @param predicate test function for projects
 * @return {PushTest}
 */
export declare function predicatePushTest(name: string, predicate: ProjectPredicate): PredicatePushTest;
