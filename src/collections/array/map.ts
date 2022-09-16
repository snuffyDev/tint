/**
 * Runs the specified callback for each item in the array,
 * and returns the results in a new array.
 * @export
 * @template T
 * @template U
 * @param {Array<T>} array
 * @param {ItemCallback<T, U>} cb
 * @returns {U[]}
 */
export function map<T, U>(array: Array<T>, cb: ItemCallback<T, U>): U[] {
	let idx = -1;
	const length = array.length;
	const newArray: U[] = Array(length);
	for (; ++idx < length;) {
		newArray[idx] = cb(array[idx], idx, array);
	}
	idx = null;
	return newArray;
}

