import './index.css';
import Headings from './bookmarklet/headings';
import Images from './bookmarklet/images';

const bookmarklets = [
    new Headings(),
    new Images(),
];

// main functionality
const main = () => {
    // open/close panel
    const panel = document.querySelector('.dpab__panel');
    panel.classList.contains('dpab__panel--open') ? panel.classList.remove('dpab__panel--open') : panel.classList.add('dpab__panel--open');

    return true;
};

const appendHtml = (html, root = null) => {
    if (root === null) root = document.body;

    const docFragment = new DOMParser().parseFromString(html, 'text/html');
    document.head.append(...docFragment.head.childNodes);

    const bodyNodes = docFragment.body.childNodes;
    if (bodyNodes.length === 1) {
        return root.appendChild(bodyNodes[0]);
    }

    root.append(...bodyNodes);
};

const attachHandler = (node, callback, eventType = 'click') => {
    node.addEventListener(eventType, callback);
};

// init code
(() => {
    // append stylesheet
    // appendHtml('<link rel="stylesheet" href="http://accessibility-bookmarklet.test/index.css">');

    // create panel
    appendHtml(`
        <div class="dpab__panel">
            <button type="button" class="dpab__close" aria-label="Close">✕</button>
            <p>Accessibility bookmarklet</p>
            <ol></ol>
        </div>
    `);

    // attach close button
    attachHandler(document.querySelector('.dpab__close'), () => {
        document.querySelector('.dpab__panel').classList.remove('dpab__panel--open');
    });

    //
    const bookmarkList = document.querySelector('.dpab__panel ol');
    bookmarklets.forEach((obj) => {
        const el = appendHtml(`<li class=""><label title="${obj.description}"><input type="checkbox"> ${obj.name}</label>`, bookmarkList);
        attachHandler(el, (e) => {
            e.target.checked ? obj.enable() : obj.disable();
        }, 'change');
    });

    main();
})();

// attach functionality to window
window.dpab = main;
