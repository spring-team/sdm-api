import { PushMapping } from "../PushMapping";
import { PushTest } from "../PushTest";
/**
 * PushMapping that always returns the same value, guarded by a PushTest.
 * Return undefined if the PushTest doesn't match.
 */
export interface StaticPushMapping<V> extends PushMapping<V> {
    readonly pushTest: PushTest;
    /**
     * Value we always return
     */
    readonly value: V;
}
