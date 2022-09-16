// from https://developer.mozilla.org/en-US/docs/Web/API/TransformStream#polyfilling_textencoderstream_and_textdecoderstream
const methods = {
    start() {
        this.decoder = new TextDecoder(this.encoding, this.options);
    },
    transform(chunk, controller){
        controller.enqueue(this.decoder.decode(chunk, {stream: true}));
    }
}
let __wm = new WeakMap()
export class StreamingDecoder extends TransformStream {
    constructor(_encoding = "utf-8", {...options}: TextDecoderOptions = {}){
        let obj = {...methods, encoding: _encoding, options}
        super(obj);
        __wm.set(this,obj);
    }

    get encoding() {return __wm.get(this).decoder.encoding}
    get fatal() {return __wm.get(this).decoder.fatal}
    get ignoreBOM() {return __wm.get(this).decoder.ignoreBOM}

}
