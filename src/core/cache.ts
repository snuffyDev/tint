import { Maybe } from "$/types";

/**
 * A key-value cache that will delete the least-recently used item.
 * @export
 * @class LRUCache
 * @template T
 */
export class LRUCache<T = unknown> {
    private _: Map<string, T>;
    /**
     * Creates a new LRU (Least Recently Used) Cache.
     * @param {number} [maxEntries=50] Maximum number of items to store in the cache
     * @memberof LRUCache
     */
    public constructor(private maxEntries = 50) {
        this._ = new Map<string, T>();

    }
    /**
     * Adds a new entry into the cache.
     * @param {string} id - an identifier for the item
     * @param {T} entry - the item to store
     * @memberof LRUCache
     */
    public set(id: string, entry: T): void {
        if (this._.size >= this.maxEntries) {
            const itemToDelete = this._.keys().next().value;
            this._.delete(itemToDelete);
        }
        this._.set(id, entry);
    }
    /**
     * Returns `true` if an item with the provided `id` is found in the cache. If the id is not in the cache, it will return `false`.
     * @param {string} id  -  an identifier
     * @return {*}  {boolean}
     * @memberof LRUCache
     */
    public has(id: string): boolean {
        return this._.has(id);
    }
    /**
     * Removes all items that are currently stored in the cache
     * @memberof LRUCache
     */
    public clear(): void {
        this._.clear();
    }
    /**
     * Retrieves an item from the cache using the provided `id`. If the item is found in the cache, it will be returned. If not found, `undefined` will be returned.
     * @param id  -  an identifier
     * @returns
     */
    public get(id: string): Maybe<T> {
        const hasEntry = this._.has(id);
        let entry: Maybe<T> = undefined;
        if (hasEntry) {
            entry = this._.get(id) as T;
            this._.delete(id);
            this._.set(id, entry);

        }
        return entry;
    }
}
