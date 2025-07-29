import ReplacedElement from './replaced-element';

export default class Images extends ReplacedElement
{
    constructor() {
        super({
            markers: {
                'missing': 'Missing alt attribute',
                'decorative': 'Decorative',
                'incorrect': 'Whitespace alt attribute',
                'normal': 'Accessible',
            },
            selectors: ['img'],
            type: 'Image',
        });

        this.name = "Images";
        this.description = "";

        this.textHelper = (node) => node.getAttribute('alt');
    }

    action(state, wrapper) {
        switch (state) {
            case 'null':
                wrapper.prepend(this.markers.missing.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--invalid');
                break;
            case 'empty':
                wrapper.prepend(this.markers.decorative.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--valid');
                break;
            case 'whitespace':
                wrapper.prepend(this.markers.incorrect.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--invalid');
                break;
            case 'normal':
                wrapper.prepend(this.markers.normal.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--valid');
                break;
        }
    }
}
