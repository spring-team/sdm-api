import { PushListenerInvocation } from "../PushListener";
import { PushTest } from "../PushTest";
import { StaticPushMapping } from "./StaticPushMapping";
/**
 * Generic DSL for returning an object on a push
 */
export declare class PushRule<V = any> implements StaticPushMapping<V> {
    protected guard1: PushTest;
    protected guards: PushTest[];
    private staticValue;
    readonly value: V;
    readonly name: string;
    readonly pushTest: PushTest;
    private reason;
    constructor(guard1: PushTest, guards: PushTest[], reason?: string);
    /**
     * Set an additional reason if we want to add information to that which is
     * available from the push tests themselves
     * @param {string} reason
     * @return {this}
     */
    itMeans(reason: string): this;
    /**
     * Set the value that will be resolved from this rule
     * @param {V} value
     * @return {this}
     */
    set(value: V): this;
    mapping(p: PushListenerInvocation): Promise<V | undefined>;
}
