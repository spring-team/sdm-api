import { PushListenerInvocation } from "../PushListener";
import { PushMapping } from "../PushMapping";
/**
 * Use to execute a rule set for any push to resolve to an object.
 */
export declare class PushRules<V> implements PushMapping<V> {
    readonly name: string;
    choices: Array<PushMapping<V>>;
    /**
     * Return all possible values
     * @param {string} name
     * @param {Array<PushMapping<V>>} choices Array of choices.
     * Passing an empty array will result in an instance that always maps to undefined,
     * and is not an error.
     */
    constructor(name: string, choices?: Array<PushMapping<V>>);
    /**
     * Return a PushRules with a subset of the rules of this one
     * @param {(p: PushMapping<V>) => boolean} predicate
     * @return {PushRules<V>}
     */
    filter(predicate: (p: PushMapping<V>) => boolean): PushRules<V>;
    add(rules: Array<PushMapping<V>>): void;
    mapping(pi: PushListenerInvocation): Promise<V>;
}
