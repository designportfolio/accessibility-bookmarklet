import ReplacedElement from './replaced-element';

export default class Iframe extends ReplacedElement
{
    constructor() {
        super({
            markers: {
                'decorative': 'Decorative',
                'empty': 'Empty title attribute',
                'whitespace': 'Whitespace title attribute',
                'normal': 'Accessible',
            },
            selector: 'iframe',
            type: 'Iframe',
        });

        this.name = "Inline frame (iframe)";
        this.description = "";

        this.textHelper = (node) => node.getAttribute('title');
    }

    action(state, wrapper) {
        switch (state) {
            case 'null':
                wrapper.prepend(this.markers.decorative.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--valid');
                break;
            case 'empty':
                wrapper.prepend(this.markers.empty.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--invalid');
                break;
            case 'whitespace':
                wrapper.prepend(this.markers.whitespace.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--invalid');
                break;
            case 'normal':
                wrapper.prepend(this.markers.normal.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--valid');
                break;
        }
    }
}
