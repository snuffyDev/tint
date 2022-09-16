/**
 * Runs the first specified callback for each item in the array,
 * and uses the second predicate callback to filter the results.
 * Returns the results in a new array.
 *
 * @export
 * @template T
 * @template U
 * @param {Array<T>} array
 * @param {ItemCallback<T, U>} cb
 * @param {(item: Partial<T>) => boolean} predicate
 * @returns {T[]}
 */
export function filterMap<T, U>(
	array: Array<T>,
	cb: ItemCallback<T, U>,
	predicate: (item: Partial<T>) => boolean,
): T[] {
	let idx = -1;
	const length = array.length;
	const result: Partial<T>[] = [];
	for (; ++idx < length;) {
		const res = cb(array[idx], idx, array);
		if (predicate(res)) {
			result[idx] = res;
		}
	}
	idx = null;
	return result as T[];
}
