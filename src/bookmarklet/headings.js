export default class Headings
{
    constructor() {
        this.name = "Headings";
        this.description = "Identify heading tags in the document";

        const marker = document.createElement('span');
        marker.classList.add('dpab__heading');
        this.marker = marker;
    }

    enable() {
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
            const marker = this.marker.cloneNode();
            let text = heading.tagName.toLowerCase();

            if (heading.classList.length) {
                text += ` class="${Array.from(heading.classList.values()).join(' ')}"`;
            }

            marker.textContent = `<${text}>`;
            heading.prepend(marker);
        });
    }

    disable() {
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
            heading.querySelectorAll('.dpab__heading').forEach((marker) => marker.remove());
        });
    }
}
