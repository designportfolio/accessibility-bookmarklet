import { createNode } from './helpers';
import vars from './variables';
import { createPopper } from '@popperjs/core';

export default class Popup
{
    popper;

    constructor(selector, wrapper, info) {
        this.wrapper = wrapper;
        this.info = info;
        this.tooltip = createNode(`
            <div class="${vars.tooltip}" role="tooltip">
                <div class="${vars.tooltip}__arrow" data-popper-arrow></div>
                <h2>&lt;${selector}></h2>
            </div>
        `);

        this.create();
    }

    create() {
        this.wrapper.append(this.tooltip);

        this.popper = createPopper(this.info, this.tooltip, {
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

        this.info.addEventListener('click', this.#handleTooltip.bind(this, this.tooltip, this.popper));
    }

    destroy() {
        this.info.removeEventListener('click', this.#handleTooltip.bind(this, this.tooltip, this.popper));

        this.popper.destroy();
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
