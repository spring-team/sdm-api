import { Mapper } from "../Mapping";
import { PredicateMapping } from "../PredicateMapping";
/**
 * Predicate that can be used in predicate DSL.
 * Can be a PredicateMapping, a function or computed boolean
 */
export declare type PredicateMappingTerm<F> = PredicateMapping<F> | Mapper<F, boolean> | boolean | (() => (boolean | Promise<boolean>));
/**
 * Convert a PredicateMapping term to a PredicateMapping
 * @param {PredicateMappingTerm<F>} p
 * @return {PredicateMapping<F>}
 */
export declare function toPredicateMapping<F>(p: PredicateMappingTerm<F>): PredicateMapping<F>;
