/**
 * Returns the first matching element in the array.
 *
 * @export
 * @template T
 * @param {Array<T>} array
 * @param {(item: T) => T} predicate
 * @returns {(T | undefined)}
 */
export function findFirst<T>(array: Array<T>, predicate: (item: T) => T): T | undefined {
	const length = array.length;
	let idx = -1;
	for (; ++idx < length;) {
		if (predicate(array[idx])) {
			return array[idx];
		}
	}
	return undefined;
}

