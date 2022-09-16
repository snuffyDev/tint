/**
* Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
*
* @export
* @template T
* @param {Array<T>} array
* @param {(previousValue: T, currentValue: T, index: number, array: Array<T>) => T} callback
* @param {T} thisArg
* @returns {T, thisArg: T) => T}
*/
export function reduce<T, U>(
	array: Array<T>,
	callback: (previousValue: T, currentValue: T, index: number, array: Array<T>) => T
): T;
export function reduce<T>(
	array: Array<T>,
	callback: (previousValue: T, currentValue: T, index: number, array: Array<T>) => T,
	initialValue: T
): T;
export function reduce<T, U>(
	array: Array<T>,
	callback: (previousValue: U, currentValue: T, index: number, array: Array<T>) => U,
	initialValue?: U): U {

	let result = initialValue,
		idx = -1;
	const length = array.length;
	while (++idx < length) {
		result = callback(result, array[idx], idx, array);
	}
	return result;
}