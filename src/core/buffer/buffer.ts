import { StreamingDecoder } from "$/core/streamingDecoder";

let textDecoder: TextDecoder;
type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "base64url" | "latin1" | "binary" | "hex";
export interface IBuffer {
	readonly buffer: Uint8Array;
	readonly byteLength: number;
}

///@ts-expect-error 'from' method override
export class Buffer extends Uint8Array implements IBuffer {

	constructor(buffer: ArrayBufferLike) {
		super(buffer);
	}
	/*
	  * Creates a new Buffer instance from an existing Buffer or Uint8Array.
	  *
	  * @param buffer Buffer to use as the source for a new Buffer
	  */
	static from<T extends ArrayBuffer | Buffer | Uint8Array>(buffer: T, byteOffset?: number, length?: number): Buffer;
	/**
	 * Creates a new Buffer from a given string using the character
	 * encoding designated with `encoding`. If `encoding` is not provided,
	 * `utf-8` will be used as default.
	 *
	 * @param data string to use as the source for the Buffer
	 * @param encoding
	 */
	static from(str: string, encoding?: BufferEncoding): Buffer;
	static from(value: unknown, encodingOrOffset?: unknown, length?: unknown): Buffer {
		if (typeof value === 'string') {
			if (!encodingOrOffset || typeof encodingOrOffset !== 'string') encodingOrOffset = 'utf-8';
			const stringBuf = new TextEncoder().encode(value);
			const buffer = new Buffer(stringBuf);
			return buffer;
		}
		if (value instanceof ArrayBuffer || value instanceof Buffer) {
			if (value instanceof Uint8Array) value = value.buffer
			const buffer = new Buffer(value as Uint8Array);
			return buffer;
		}
	}
	static alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): Buffer {
		const buffer = new Uint8Array(size);

		if (fill !== undefined) {
			if (typeof encoding === 'string')
				return new Buffer(buffer.fill(size));
			else return new Buffer(buffer);
		}
		else return new Buffer(buffer);
	};

	toString(): string {
		if (!textDecoder) {
			textDecoder = new TextDecoder();
		}
		return textDecoder.decode(this);
	}

	*[Symbol.iterator]() {
		const length = this.length;
		let idx = -1;
		while (++idx < length) {

			yield this[idx];
		}
	};

	static [Symbol.hasInstance](instance: unknown) {
		return instance[Symbol.toStringTag] !== "Buffer";
	}
}
