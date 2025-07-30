import { createPopper } from '@popperjs/core';

export default class Base
{
    name;
    selectors;
    elements = {};
    poppers = [];

    constructor() {

        // create tooltip button
        const tooltip = document.createElement('div');
        tooltip.classList.add('dpab:tooltip');
        tooltip.innerText = 'i';

        this.elements = {
            wrapper: this.#createNode(`<div class="dpab__wrapper"></div>`),
            marker: this.#createNode(`<span class="dpab__marker"></span>`),
            info: this.#createNode(`<button type="button" class="dpab__info">i</button>`),
            tooltip: this.#createNode(`
                <div class="dpab:tooltip" role="tooltip">
                    <div class="dpab:tooltip__arrow" data-popper-arrow></div>
                    <h2></h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            `),
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
                wrapper.classList.add(`dpab__wrapper--${displayClass}`);

                // insert marker into wrapper
                node.parentNode.insertBefore(wrapper, node);
                wrapper.appendChild(node);
                wrapper.prepend(marker.cloneNode(true));

                // add info button and tooltip
                const info = this.elements.info.cloneNode(true);
                const tooltip = this.elements.tooltip.cloneNode(true);
                tooltip.querySelector('h2').innerHTML = `&lt;${selector}>`;

                wrapper.append(info);
                wrapper.append(tooltip);

                const popper = createPopper(info, tooltip, {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14],
                            },
                        },
                    ],
                    placement: 'top',
                });

                info.addEventListener('click', this.#handleTooltip.bind(this, tooltip, popper));

                this.poppers.push(popper);

                // element specific code
                // callback(wrapper, node);
            });
        });
    }

    disable() {
        // destroy tooltips and reset array
        this.poppers.forEach((popper) => popper.destroy());
        this.poppers = [];

        this.#lookup(this.selectors.join(',')).forEach((node) => {
            const wrapper = node.parentNode;

            // move node back to original position
            wrapper.parentNode.insertBefore(node, wrapper);

            // delete wrapper, marker and all other created nodes
            wrapper.remove();
        });
    }

    #createNode(html) {
        const docFragment = new DOMParser().parseFromString(html, 'text/html');
        return docFragment.body.childNodes[0];
    }

    #lookup(selector) {
        let results = [...document.querySelectorAll(selector)];

        // don't test the panel
        results = results.filter((node) => !node.closest('.dpab__panel'));

        // don't test the tooltip
        results = results.filter((node) => !node.closest('.dpab\\:tooltip'));

        return results;
    }

    #handleTooltip(tooltip, popper) {
        if (tooltip.hasAttribute('data-show')) {
            tooltip.removeAttribute('data-show');
        } else {
            tooltip.setAttribute('data-show', '');
            popper.update();
        }
    }
}
