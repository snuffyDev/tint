export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
export type Ok<T> = T;
export type Err<T extends Error = Error> = T;
export type Result<T, E = Err> = Promise<T | E>;
export type SyncResult<T, E = Err> = T | E;

export type MaybeMany<T> = T | T[];
export type ObjectKey<T extends Record<string, any>, K extends keyof T = keyof T> = K;
