import Bookmarklet from './bookmarklet';

export default class ReplacedElement extends Bookmarklet
{
    markers = {};
    textHelper;

    constructor(props) {
        super(props);

        this.markerBase = document.createElement('span');
        this.markerBase.classList.add('dpab__marker');

        for (const [k, v] of Object.entries(props.markers)) {
            const marker = this.markerBase.cloneNode();
            marker.innerHTML = `<b>&lt;${props.selector}></b> ${v}`;
            this.markers[k] = marker
        }
    }

    enable(textHelper) {
        super.enable((wrapper, node) => {
            const text = this.textHelper(node);

            if (text === null) {
                this.action('null', wrapper);
            } else if (text.length === 0) {
                this.action('empty', wrapper);
            } else if (text.trim().length === 0) {
                this.action('whitespace', wrapper);
            } else {
                this.action('normal', wrapper);

                const accessibleContent = document.createElement('span');
                accessibleContent.classList.add('dpab__accessible-content');
                accessibleContent.innerHTML = `<strong>Accessible content:</strong> ${text}`;
                wrapper.append(accessibleContent);
            }
        });
    }
}
