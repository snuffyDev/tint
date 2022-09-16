/**
 * Runs the specified callback for each item in the array
 *
 * @export
 * @template T
 * @param {Array<T>} array
 * @param {VoidCallback<T>} cb
 */
export function forEach<T>(array: Array<T>, cb: VoidCallback<T>): void {
	const len = array.length;
	let idx = -1;
	for (; ++idx < len;) {
		cb(array[idx], idx, array);
	}
	idx = null;
}

