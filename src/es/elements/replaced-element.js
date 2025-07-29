import Base from './base';

export default class ReplacedElement extends Base
{
    markers = {};
    textHelper;

    constructor(props) {
        super(props);

        this.markerBase = document.createElement('span');
        this.markerBase.classList.add('dpab__marker');

        for (const [k, v] of Object.entries(props.markers)) {
            const marker = this.markerBase.cloneNode();
            marker.innerHTML = `<strong>&lt;${props.selector}></strong> ${v}`;
            this.markers[k] = marker;
        }
    }

    enable(textHelper) {
        super.enable((wrapper, node) => {
            const text = this.textHelper(node);

            if (text === null) {
                this.action('null', wrapper);
            } else {
                const processedText = this.#processText(text);

                if (text.length === 0) {
                    this.action('empty', wrapper);
                } else if (text.trim().length === 0) {
                    this.action('whitespace', wrapper);
                    this.#addAccessibleContent(wrapper, processedText);
                } else {
                    this.action('normal', wrapper);
                    this.#addAccessibleContent(wrapper, processedText);
                }
            }
        });
    }

    #addAccessibleContent(wrapper, text) {
        const accessibleContent = document.createElement('span');
        accessibleContent.classList.add('dpab__accessible-content');
        accessibleContent.innerHTML = `<strong>Text alternative:</strong> ${text}`;
        wrapper.append(accessibleContent);
    }

    #processText(text) {
        return text.replace(/\s/g, (m) => {
            const mapped = {
                ' ': '·',
                '\t': '\\t',
                '\n': '\\n',
                '\r': '\\r',
            }[m];

            return mapped || m;
        });
    }
}
