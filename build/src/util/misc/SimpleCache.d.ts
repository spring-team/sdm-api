export interface CacheStats {
    gets: number;
    hits: number;
}
/**
 * Simple interface for a string-keyed cache
 */
export interface SimpleCache<T> {
    put(key: string, value: T): any;
    get(key: string): T;
    evict(key: string): void;
    stats: CacheStats;
}
