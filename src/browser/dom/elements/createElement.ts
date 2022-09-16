import { forEach } from "$/collections";
import { pipe } from "$/core";

export interface CreateElementOptions {
    /** CSS Class names to apply to the element.
     * @example
     * /// a string of many:
     * createElement('div', {class: "btn outlined primary"});
     * /// a string:
     * createElement('div', {class: "btn"})
     * /// array of strings:
     * createElement('div', {class: ["btn", "outlined", "primary"]})
     */
    class?: string | string[];
    /** Inline CSS Styles */
    style?: string;
    /** Attributes to set on the element.
     * @example
     * createElement('audio', {attrs: [['autoplay', 'true'], ['controls', 'true']]});
     */
    attrs?: [string, string][];
}
export function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, options: CreateElementOptions = {}) {
    const _class = Array.isArray(options?.class) && options?.class.join(' ');
    const elm = document.createElement(tag);
    elm.className = _class;
    elm.style.cssText = options?.style as string;
    if (Array.isArray(options?.attrs)) {

        forEach(options?.attrs, ([k, v]) => {
            elm.setAttribute(k, v);
        });
    }
    return elm;

}

export function createElementString<K extends keyof HTMLElementTagNameMap>(tag: K, options: CreateElementOptions = {}) {
    const _class = Array.isArray(options?.class) ? options?.class.join(' ') : (options?.class ?? '');
    const hasAttributes = Array.isArray(options?.attrs);
    let str = `<${tag} class="${_class}" style="${options?.style || ""}" `;


    if (hasAttributes) {

        forEach(options?.attrs, ([k, v]) => {
            str += `${k}="${v}" `;
        });
    }

    str += `></${tag}>`;

    return str;


}
