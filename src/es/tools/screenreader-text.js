export default class ScreenreaderText
{
    name = "Show screenreader-only text";
    selectors = [
        '.visually-hidden',
        '.sr-only',
    ];

    enable() {
        document.querySelectorAll(this.selectors.join(',')).forEach((node) => {
            node.classList.add('dpab-visually-hidden-preview');
        });
    }

    disable() {
        document.querySelectorAll(this.selectors.join(',')).forEach((node) => {
            node.classList.remove('dpab-visually-hidden-preview');
        });
    }
}
