import { PushMapping } from "../../common/listener/PushMapping";
import { PushTest } from "../../common/listener/PushTest";
/**
 * Simple DSL to create a decision tree.
 * Trees and subtrees can compute variables as interim values for future use.
 * Example usage, showing computed state:
 *
 * ```
 * let count = 0;  // Initialize a counter we'll use later
 * const pm: PushMapping<Goals> = given<Goals>(TruePushTest, ...) // Use any push tests
 *    .init(() => count = 0) // Init to set state
 *    .itMeans("no frogs coming")
 *    .then(
 *        given<Goals>(TruePushTest, ...).itMeans("case1")
 *           .compute(() => count++)   // Increment the counter for this branch
 *           .then(
 *              // Compute terminal rules
 *              whenPushSatisfies(count > 0, FalsePushTest).itMeans("nope").setGoals(NoGoals),
 *              whenPushSatisfies(TruePushTest).itMeans("yes").setGoals(HttpServiceGoals),
 *           ),
 *       );
 * ```
 * @param givenPushTests PushTests
 * @return interim DSL structure
 */
export declare function given<V>(...givenPushTests: PushTest[]): TreeContext<V>;
export declare class TreeContext<V> {
    private readonly givenPushTests;
    constructor(givenPushTests: PushTest[]);
    /**
     * Perform any computation necessary to initialize this branch:
     * for example, setting variables in scope
     * @param {(t: this) => any} f
     * @return {any}
     */
    init(f: (t: this) => any): any;
    itMeans(name: string): GivenTree<V>;
}
/**
 * Tree. Can compute variables
 */
export declare class GivenTree<V> {
    private readonly givenPushTest;
    private readonly name;
    constructor(givenPushTest: PushTest, name: string);
    /**
     * Perform computation before continuing.
     * Typically used to set values that will be used in predicate expressions.
     * @param {(t: this) => any} f
     * @return {any}
     */
    compute(f: (t: this) => any): any;
    /**
     * Set the resolution value of this tree
     * @param {V} value
     * @return {PushMapping<V>}
     */
    set(value: V): PushMapping<V>;
    /**
     * Enter a subtree of a number of mappings. Can be use
     * to nest trees to arbitrary depth.
     * @param {PushMapping<V>} pushMappings
     * @return {PushMapping<V>}
     */
    then(...pushMappings: Array<PushMapping<V>>): PushMapping<V>;
}
