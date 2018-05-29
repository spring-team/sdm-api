import { AbstractFingerprint } from "./AbstractFingerprint";
/**
 * Typed fingerprint. Takes care of serializing the passed in data structure.
 */
export declare class TypedFingerprint<T> extends AbstractFingerprint {
    private readonly t;
    constructor(name: string, abbreviation: string, version: string, t: T);
    readonly data: string;
    /**
     * Return the fingerprint as a JSON object
     * @return {T}
     */
    readonly object: T;
}
