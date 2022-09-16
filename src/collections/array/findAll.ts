/**
 * @description finds all elements that match the specified predicate
 * @template T
 * @param {Array<T>} array
 * @param {(item: T) => T} predicate
 * @returns {T[]} All matching elements in the array
 *
 * @example
 * const berries = findAll(["apple", "blueberry", "strawberry"],
 * (item) => item.includes('berry'));
 *
 * /// result: ["blueberry", "strawberry"]
 */
export function findAll<T>(array: Array<T>, predicate: (item: T) => T): T[] {
	let idx = -1;
	let curIdx = 0;
	const length = array.length;
	const result: T[] = [];

	for (; ++idx < length;) {
		if (predicate(array[idx])) {
			result[curIdx++] = array[idx];
		}
	}
	return result;
}

