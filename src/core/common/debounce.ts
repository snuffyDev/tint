
/**
 * Executes a callback function `cb` only once within the amount of time specified with the `delay` parameter.
 * @export
 * @template T
 * @param {(...args: T[]) => void} cb
 * @param {number} delay
 * @return {*}
 *
 * @example
 * const typeahead = debounce<InputEvent>((evt) => {
 * /// only will fire this event once within
 * /// a 300ms period
 * }, 300);
 *
 * myInputElement.addEventListener('input', typeahead);
 */
export function debounce<T = unknown>(cb: (...args: T[]) => void, delay: number) {
	let timeout = 0;
	return (...args: any) => {
		clearTimeout(timeout);
		timeout = window.setTimeout(() => cb(...args), delay);
	};
}
