import Bookmarklet from './bookmarklet';

export default class Images extends Bookmarklet
{
    constructor() {
        super({
            selector: 'img',
        });

        this.name = "Images";
        this.description = "";

        this.markers = {};
        const markerBase = document.createElement('span');
        markerBase.classList.add('dpab__marker');

        for (const [k, v] of Object.entries({
            'missing': 'Missing alt attribute',
            'decorative': 'Decorative image',
            'incorrect': 'Whitespace content',
            'normal': 'Normal image',
        })) {
            const marker = markerBase.cloneNode();
            marker.textContent = v;
            this.markers[k] = marker
        }
    }

    enable() {
        super.enable((wrapper, img) => {
            if (!img.hasAttribute('alt')) {
                wrapper.prepend(this.markers.missing.cloneNode(true));
                wrapper.classList.add('dpab__wrapper--invalid');
            } else {
                const alt = img.getAttribute('alt');

                if (alt.length === 0) {
                    wrapper.prepend(this.markers.decorative.cloneNode(true));
                    wrapper.classList.add('dpab__wrapper--valid');
                } else if (alt.trim().length === 0) {
                    wrapper.prepend(this.markers.incorrect.cloneNode(true));
                    wrapper.classList.add('dpab__wrapper--invalid');
                } else {
                    wrapper.prepend(this.markers.normal.cloneNode(true));
                    wrapper.classList.add('dpab__wrapper--valid');

                    const altText = document.createElement('span');
                    altText.textContent = `alt: ${alt}`;
                    wrapper.append(altText);
                }
            }
        });
    }
}
