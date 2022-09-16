import type { Maybe } from "$/types";

/**
 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
 *
 * @export
 * @template T
 * @param {Array<T>} array
 * @param {number} spliceIndex
 * @param {number} itemsToRemove
 * @param {...unknown[]} items
 * @returns {Maybe<T[]>}
 */
export function splice<T>(
	array: Array<T>,
	spliceIndex: number,
	itemsToRemove: number,
	...items: unknown[]
): Maybe<T[]> {
	const deleted = array.slice(spliceIndex, spliceIndex + itemsToRemove);
	let inserted: Array<unknown> = [];
	if (!items) {
		inserted = [...array.slice(0, spliceIndex), ...array.slice(spliceIndex + itemsToRemove)];
	} else {
		inserted = [...array.slice(0, spliceIndex), ...items, ...array.slice(spliceIndex + itemsToRemove)];
	}
	array.length = 0;
	array.push.apply(array, inserted);
	return deleted;
}
