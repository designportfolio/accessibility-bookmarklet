import ReplacedElement from './replaced-element';

export default class Iframe extends ReplacedElement
{
    constructor() {
        super({
            selector: 'iframe',
            textAttribute: 'title',
        });

        this.name = "Inline frame (iframe)";
        this.description = "";

        this.textHelper = (node) => node.getAttribute('title');

        for (const [k, v] of Object.entries({
            'decorative': 'Decorative iframe',
            'empty': 'Empty (or whitespace) title attribute',
            'normal': 'Normal iframe',
        })) {
            const marker = this.markerBase.cloneNode();
            marker.textContent = v;
            this.markers[k] = marker
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
                wrapper.prepend(this.markers.empty.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--invalid');
                break;
            case 'normal':
                wrapper.prepend(this.markers.normal.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--valid');
                break;
        }
    }
}
