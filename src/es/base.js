export default class Base
{
    #selectors;
    wrapper;

    constructor(props) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('dpab__wrapper');
        wrapper.dataset.type = props.type;
        this.wrapper = wrapper;

        this.#selectors = props.selectors;
    }

    enable(callback) {
        this.#selectors.forEach((selector) => {
            const marker = document.createElement('span');
            marker.classList.add('dpab__marker');
            marker.innerHTML = `&lt;${selector}>`;

            document.querySelectorAll(selector).forEach((node) => {
                // wrap each element
                const wrapper = this.wrapper.cloneNode();
                const displayClass = window.getComputedStyle(node).display.includes('inline') ? 'inline-block' : 'block';
                wrapper.classList.add(`dpab__wrapper--${displayClass}`);

                // insert marker into wrapper
                node.parentNode.insertBefore(wrapper, node);
                wrapper.appendChild(node);
                wrapper.prepend(marker.cloneNode(true));

                // element specific code
                // callback(wrapper, node);
            });
        });
    }

    disable() {
        this.#selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((node) => {
                const wrapper = node.parentNode;

                // move node back to original position
                wrapper.parentNode.insertBefore(node, wrapper);

                // delete wrapper, marker and all other created nodes
                wrapper.remove();
            });
        });
    }
}
