import Base from './base';

export default class Headings extends Base
{
    name = "Headings";
    selectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    enable() {
        super.enable(((wrapper, heading) => {
            const marker = this.marker.cloneNode();
            let text = heading.tagName.toLowerCase();

            if (heading.classList.length) {
                wrapper.classList.add(`dpab__wrapper--valid`);
                text += ` class="${Array.from(heading.classList.values()).join(' ')}"`;
            } else {
                wrapper.classList.add(`dpab__wrapper--invalid`);
            }

            marker.textContent = `<${text}>`;
            wrapper.prepend(marker);
        }));
    }
}
