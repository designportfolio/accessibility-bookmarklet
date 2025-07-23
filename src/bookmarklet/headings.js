import Bookmarklet from './bookmarklet';

export default class Headings extends Bookmarklet
{
    constructor() {
        super({
            selector: 'h1, h2, h3, h4, h5, h6',
            type: 'Heading',
        });

        this.name = "Headings";
        this.description = "Identify heading tags in the document";

        const marker = document.createElement('span');
        marker.classList.add('dpab__marker');
        this.marker = marker;
    }

    enable() {
        super.enable(((wrapper, heading) => {
            const marker = this.marker.cloneNode();
            let text = heading.tagName.toLowerCase();

            if (heading.classList.length) {
                text += ` class="${Array.from(heading.classList.values()).join(' ')}"`;
            }

            marker.textContent = `<${text}>`;
            wrapper.prepend(marker);
        }));
    }
}
