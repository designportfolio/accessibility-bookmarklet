export default class Images
{
    constructor() {
        this.name = "Images";
        this.description = "";

        const wrapper = document.createElement('div');
        wrapper.classList.add('dpab__image');
        this.wrapper = wrapper;

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
        document.querySelectorAll('img').forEach((img) => {
            const wrapper = this.wrapper.cloneNode();
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            if (!img.hasAttribute('alt')) {
                wrapper.prepend(this.markers.missing.cloneNode(true));
                wrapper.classList.add('dpab__image--invalid');
            } else {
                const alt = img.getAttribute('alt');

                if (alt.length === 0) {
                    wrapper.prepend(this.markers.decorative.cloneNode(true));
                    wrapper.classList.add('dpab__image--valid');
                } else if (alt.trim().length === 0) {
                    wrapper.prepend(this.markers.incorrect.cloneNode(true));
                    wrapper.classList.add('dpab__image--invalid');
                } else {
                    wrapper.prepend(this.markers.normal.cloneNode(true));
                    wrapper.classList.add('dpab__image--valid');

                    const altText = document.createElement('span');
                    altText.textContent = `alt: ${alt}`;
                    wrapper.append(altText);
                }
            }
        });
    }

    disable() {
        document.querySelectorAll('img').forEach((img) => {
            const wrapper = img.parentNode;
            wrapper.parentNode.appendChild(img);
            wrapper.remove();
        });
    }
}
