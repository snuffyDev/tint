const _pipe = (a, b) => (...arg) => a(b(...arg));
export function pipe(...fns: Array<Function>) {
    return fns.reduce(_pipe);

}

