// import { Maybe } from "$/types";



// export interface IDisposable<T = unknown> {
//     dispose(): void;
// }

// export interface IDisposableTracker extends IDisposable{
//     isDisposed: boolean;
//     clear(): void;
//     add<T extends IDisposable>(val: T): T;
// }

// let disposableTracker: Maybe<DisposableTracker>;




// export class DisposableTracker implements IDisposableTracker{
//     private _trackedValues = new Set<IDisposable>();
//     private _isDisposed = false;
//     public get isDisposed(): boolean {
//         return this._isDisposed;
//     }
//     clear(): void {
//         this._trackedValues.clear();
//     }
//     add<T extends IDisposable>(val: T): T {

//         if (!val) {
//             return val;
//         }
//         if (this._isDisposed) {
//         console.error(new Error("Cannot add an already disposed of value to the DisposableTracker.").stack)

//         } else {

//             this._trackedValues.add(val)
//         }
//         return val;

//     }
//     dispose(): void {
//         if (this._isDisposed) return;

//         this._isDisposed = true;
//         this.clear();
//     }

// }


// export class Disposable<T> implements IDisposable<T> {
//     private $$_value?: T;
//     private $$_isDisposed = false;
//     protected readonly $store = new DisposableTracker();
//     public constructor() {

//     }

//     public get value(): Maybe<T> {
//         return this.$$_value;
//     }
//     public set value(value: Maybe<T>) {
//         if (this.$$_isDisposed || value === this.$$_value) return;

//         this.$store.
//     }
// }