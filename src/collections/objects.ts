/* eslint-disable @typescript-eslint/ban-types */

type IndexableObject<T> = {
	[Property in keyof T]: T[Property];
};
type IsObject<T> = T extends object ? (T extends any[] ? false : true) : false;
type MergedObject<T, U> = IsObject<T> & IsObject<U> extends true
	? {
			[K in keyof T]: K extends keyof U ? MergedObject<T[K], U[K]> : T[K];
	  } & U
	: U;

/**
 * @typedef {VoidCallback}
 * @template T extends IndexableObject<T>
 * @template K extends keyof T
 */
type VoidCallback<T extends IndexableObject<T>, K extends keyof T> = (
	item: [string, T[K]],
	index: number,
	object: T,
) => void;
/**
 * Runs a function for each property of an object.
 * @param object source object to iterate over
 * @param cb callback that runs on each property
 */
export function iterObj<T extends IndexableObject<T>, K extends keyof T>(object: T, cb: VoidCallback<T, K>): void {
	if (object instanceof Object === false) throw new Error("Provided parameter `object` is not a valid object.");
	const keys: Array<string> = Object.keys(object);
	const length = keys.length;

	let idx = -1;
	for (; ++idx < length; ) {
		cb.apply(this, [[keys[idx], object[keys[idx]]] as [string, T[K]], idx, object]);
	}
}
/**
 * Performs a shallow copy of `source` object into `target` object.
 * This function will overwrite any
 * @param target target object to copy to
 * @param source source object to copy from
 * @returns {object} merged object
 */
export function mergeObjects<Target, Source>(target: Target, source: Source): MergedObject<Target, Source> {
	const keys: Array<string> = Object.keys(source);
	const length = keys.length;
	let idx = -1;
	for (; ++idx < length; ) {
		const key = keys[idx];
		target[key] = source[key];
		if (target[key] === undefined) delete target[key];
	}
	return target as MergedObject<Target, Source>;
}

/**
 * Recursively merges all properties from `source` into `target`.
 *
 * @export
 * @template Target
 * @template Source
 * @param {Target} target
 * @param {Source} source
 * @returns {MergedObject<Target, Source>}
 */
export function mergeObjectsRec<Target, Source>(
	target: IndexableObject<Target>,
	source: IndexableObject<Source>,
): MergedObject<Target, Source> {
	if ((typeof target || typeof source) !== "object") throw new Error("Both provided parameters are not valid objects.");

	const keys: Array<string> = Object.keys(source);
	const length = keys.length;
	let idx = -1;
	for (; ++idx < length; ) {
		const key = keys[idx];
		if (Array.isArray(source[key]) && Array.isArray(target[key])) {
			target[key].push.apply(target[key], source[key]);
		} else if (source[key] instanceof Object && Object.hasOwn(target, key)) {
			target[key] = mergeObjectsRec(source[key], target[key]);
		} else {
			target[key] = source[key] ? source[key] : target[key];
		}
	}
	return target as MergedObject<Target, Source>;
}
