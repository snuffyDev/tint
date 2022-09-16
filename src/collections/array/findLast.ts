/**
 * Returns the last matching item in the array.
 *
 * @export
 * @template T
 * @param {Array<T>} array
 * @param {(item: T) => T} predicate
 * @returns {Maybe<T>}
 */
export function findLast<T>(array: Array<T>, predicate: (item: T) => T): Maybe<T> {
	let len = array.length;
	for (; len--;) {
		if (predicate(array[len])) {
			return array[len];
		}
	}
	return undefined;
}
