export default class Bookmarklet {
    #selector;
    wrapper;

    constructor(props) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('dpab__wrapper');
        this.wrapper = wrapper;

        this.#selector = props.selector;
    }

    enable(callback) {
        document.querySelectorAll(this.#selector).forEach((node) => {
            const wrapper = this.wrapper.cloneNode();
            node.parentNode.insertBefore(wrapper, node);
            wrapper.appendChild(node);

            callback(wrapper, node);
        });
    }

    disable() {
        document.querySelectorAll(this.#selector).forEach((node) => {
            const wrapper = node.parentNode;

            // move node back to original position
            wrapper.parentNode.appendChild(node);

            // delete wrapper and all other created nodes
            wrapper.remove();
        });
    }
}
