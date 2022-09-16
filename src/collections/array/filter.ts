/**
 * Returns a new array that's filtered using the specified predicate function
 *
 * @export
 * @template T
 * @param {Array<T>} array
 * @param {(item: Partial<T>) => boolean} predicate
 * @returns {T[]}
 */
export function filter<T, S>(array: Array<T>, predicate: (item: Maybe<T>) => S): S[] {
	let idx = -1,
		curPos = 0;
	const result: S[] = [],
		length = array?.length ?? 0;
	for (; ++idx < length;) {
		if (predicate(array[idx])) {
			result[curPos] = (array[idx] as unknown) as S;
			curPos++;
		}
	}
	return result;
}

