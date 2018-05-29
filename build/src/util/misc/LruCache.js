"use strict";
/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple Map-based cache.
 * Based on https://medium.com/spektrakel-blog/a-simple-lru-cache-in-typescript-cba0d9807c40
 */
class LruCache {
    constructor(maxEntries = 200) {
        this.maxEntries = maxEntries;
        this.gets = 0;
        this.hits = 0;
        this.values = new Map();
    }
    get stats() {
        return { hits: this.hits, gets: this.gets };
    }
    get(key) {
        ++this.gets;
        const hasKey = this.values.has(key);
        let entry;
        if (hasKey) {
            ++this.hits;
            // Peek the entry, re-insert for LRU strategy
            entry = this.values.get(key);
            this.values.delete(key);
            this.values.set(key, entry);
        }
        return entry;
    }
    put(key, value) {
        if (this.values.size >= this.maxEntries) {
            // least-recently used cache eviction strategy
            const keyToDelete = this.values.keys().next().value;
            this.values.delete(keyToDelete);
        }
        this.values.set(key, value);
    }
    evict(key) {
        return this.values.delete(key);
    }
}
exports.LruCache = LruCache;
//# sourceMappingURL=LruCache.js.map