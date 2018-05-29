import { SimpleCache } from "./SimpleCache";
/**
 * Simple Map-based cache.
 * Based on https://medium.com/spektrakel-blog/a-simple-lru-cache-in-typescript-cba0d9807c40
 */
export declare class LruCache<T> implements SimpleCache<T> {
    private readonly maxEntries;
    private gets;
    private hits;
    private readonly values;
    constructor(maxEntries?: number);
    readonly stats: {
        hits: number;
        gets: number;
    };
    get(key: string): T;
    put(key: string, value: T): void;
    evict(key: string): boolean;
}
