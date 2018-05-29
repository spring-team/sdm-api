import { PredicateMapping } from "../PredicateMapping";
/**
 * Return the opposite of this predicate mapping
 */
export declare function whenNot<F>(t: PredicateMapping<F>): PredicateMapping<F>;
/**
 * Wrap all these predicates in a single predicate
 * AND: Return true if all are satisfied
 * @param {PredicateMapping} predicates
 * @return {PredicateMapping}
 */
export declare function all<F>(...predicates: Array<PredicateMapping<F>>): PredicateMapping<F>;
/**
 * Wrap all these predicates in a single predicate
 * OR: Return true if any is satisfied
 * @param {PredicateMapping} predicates
 * @return {PredicateMapping}
 */
export declare function any<F>(...predicates: Array<PredicateMapping<F>>): PredicateMapping<F>;
