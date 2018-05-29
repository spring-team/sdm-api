import { ProjectPredicate, PushTest } from "../../PushTest";
import * as pred from "../predicateUtils";
/**
 * Return the opposite of this push test
 */
export declare const not: typeof pred.whenNot;
export declare type PushTestOrProjectPredicate = PushTest | ProjectPredicate;
/**
 * Wrap all these PushTests or ProjectPredicates in a single PushTest
 * AND: Return true if all are satisfied
 * @param {PushTest} pushTests
 * @return {PushTest}
 */
export declare function allSatisfied(...pushTests: PushTestOrProjectPredicate[]): PushTest;
/**
 * Wrap all these PushTests or ProjectPredicates in a single PushTest
 * OR: Return true if any is satisfied
 * @param {PushTest} pushTests
 * @return {PushTest}
 */
export declare function anySatisfied(...pushTests: PushTestOrProjectPredicate[]): PushTest;
/**
 * Cache the PushTest results for this push
 * @param {PushTest} pt
 * @return {PushTest}
 */
export declare function memoize(pt: PushTest): PushTest;
