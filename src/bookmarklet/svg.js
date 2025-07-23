import ReplacedElement from './replaced-element';

export default class Svg extends ReplacedElement
{
    constructor() {
        super({
            selector: 'svg',
            markers: {
                'decorative': 'Decorative',
                'empty': 'Empty title tag',
                'whitespace': 'Whitespace title tag',
                'normal': 'Accessible',
            },
        });

        this.name = "Inline SVG";
        this.description = "";

        this.textHelper = (node) => {
            const titleNode = Array.from(node.children).find((node) => node.tagName === 'title');

            if (titleNode === undefined) {
                return null;
            } else {
                return titleNode.textContent;
            }
        }
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
