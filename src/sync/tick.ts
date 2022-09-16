// import { noop } from "$/core/common/noop";
// import { Callback } from "$/types";

import { noop } from "$/core/common/noop";
import { Callback } from "$/types";

// const $$PROMISE = Promise.resolve();
// const defer = $$PROMISE.then.bind($$PROMISE);
// export function tick<T>(promise: Promise<T> | T) {
//     console.log(promise);
//     if (promise instanceof Promise) {

//         console.log(promise instanceof Promise);
//         console.log('before', promise);
//         (promise.then((val) => val)).then((val) => {
//             promise = val;
//             // ((promise as Promise<T>)).then.apply(val);
//         }).finally(() => {
//             // promise = promise;
//         });
//         defer(() => {
//             setTimeout()
//         })
//         console.log('after', promise);
//         return promise;

//     }
//     console.log(promise instanceof Promise);
//     return promise;
// }

export function tick(...args) {
    args.splice(1, 0, 0);
    setTimeout(...args);
}