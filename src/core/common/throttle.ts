import { Callback } from "$/types/callbacks";

/**
 * Limits how often the execution of `callback` can happen within
 * `interval` milliseconds
 *
 * @export
 * @param {Callback} callback
 * @param {number} interval
 * @returns {(...args: {}) => void}
 */
export function throttle(callback: Callback, interval: number) {

    let enableCall = true;

    return function (...args) {
        if (!enableCall) return;

        enableCall = false;
        callback.apply(this, args);
        setTimeout(() => (enableCall = true), interval);
    };
}