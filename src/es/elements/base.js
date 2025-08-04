import { createNode, selector as selectorMaker } from '../helpers';
import vars from '../variables';
import Popup from '../popup';

export default class Base
{
    name;
    selectors;
    elements = {};
    popups = [];

    constructor() {
        this.elements = {
            wrapper: createNode(`<div class="${vars.wrapper}"></div>`),
            marker: createNode(`<span class="${vars.marker}"></span>`),
            info: createNode(`<button type="button" class="${vars.info}">i</button>`),
        };
    }

    enable(callback) {
        this.selectors.forEach((selector) => {
            const marker = this.elements.marker.cloneNode(true);
            marker.innerHTML = `&lt;${selector}>`;

            this.#lookup(selector).forEach((node) => {
                // wrap each element
                const wrapper = this.elements.wrapper.cloneNode();
                const displayClass = window.getComputedStyle(node).display.includes('inline') ? 'inline-block' : 'block';
                wrapper.classList.add(`${vars.wrapper}--${displayClass}`);

                // insert marker into wrapper
                node.parentNode.insertBefore(wrapper, node);
                wrapper.appendChild(node);
                wrapper.prepend(marker.cloneNode(true));

                // element specific code
                // callback(wrapper, node);

                // add info button
                const info = this.elements.info.cloneNode(true);
                wrapper.append(info);

                // create popup
                const popup = new Popup(selector, wrapper, info);
                this.popups.push(popup);
            });
        });
    }

    disable() {
        // destroy tooltips and reset array
        this.popups.forEach((popup) => popup.destroy());
        this.popups = [];

        this.#lookup(this.selectors.join(',')).forEach((node) => {
            const wrapper = node.parentNode;

            // move node back to original position
            wrapper.parentNode.insertBefore(node, wrapper);

            // delete wrapper, marker and all other created nodes
            wrapper.remove();
        });
    }

    #lookup(selector) {
        let results = [...document.querySelectorAll(selector)];

        // don't test the panel
        results = results.filter((node) => !node.closest(selectorMaker(vars.panel)));

        // don't test the tooltip
        results = results.filter((node) => !node.closest(selectorMaker(vars.tooltip)));

        return results;
    }
}
