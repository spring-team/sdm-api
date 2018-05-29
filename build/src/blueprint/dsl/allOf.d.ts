import { PredicateMapping } from "../../common/listener/PredicateMapping";
import { PredicateMappingTerm } from "../../common/listener/support/PredicateMappingTerm";
/**
 * Predicate mapping DSL method. Allows use of booleans and functions
 * returning boolean in predicate expressions
 * @param {PushTest} pred1
 * @param {PushTest} preds
 */
export declare function allOf<F>(pred1: PredicateMappingTerm<F>, ...preds: Array<PredicateMappingTerm<F>>): PredicateMapping<F>;
