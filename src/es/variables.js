const root = 'dpab';
const panel = `${root}:panel`;
const wrapper = `${root}:wrapper`;
const marker = `${root}:marker`;
const info = `${root}:info`;
const tooltip = `${root}:tooltip`;

export default {
    selector: (className) => `.${className.replace(':', '\\:')}`,
    root,
    panel,
    wrapper,
    marker,
    info,
    tooltip,
}
