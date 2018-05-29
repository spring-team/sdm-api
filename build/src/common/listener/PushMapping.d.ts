import { Mapping, NeverMatch } from "./Mapping";
import { PushListenerInvocation } from "./PushListener";
/**
 * Constant to indicate we should never match
 * @type {any}
 */
export declare const DoNotSetAnyGoals: NeverMatch;
/**
 * Mapper from push to value, id it can be resolved.
 * This is a central interface used throughout the SDM.
 */
export declare type PushMapping<V> = Mapping<PushListenerInvocation, V>;
