import { ProjectPredicate } from "../../PushTest";
/**
 * Return the opposite of this ProjectPredicate
 */
export declare function notPredicate(t: ProjectPredicate): ProjectPredicate;
/**
 * Wrap all these ProjectPredicates in a single ProjectPredicate
 * AND: Return true if all are satisfied
 * @param {ProjectPredicate} predicates
 * @return {ProjectPredicate}
 */
export declare function allPredicatesSatisfied(...predicates: ProjectPredicate[]): ProjectPredicate;
/**
 * Wrap all these ProjectPredicates in a single ProjectPredicate
 * OR: Return true if any is satisfied
 * @param {ProjectPredicate} predicates
 * @return {ProjectPredicate}
 */
export declare function anyPredicateSatisfied(...predicates: ProjectPredicate[]): ProjectPredicate;
