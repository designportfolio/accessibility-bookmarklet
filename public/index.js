// main functionality
const main = () => {
    // open/close panel
    const panel = document.querySelector('.dpab-panel');
    panel.classList.contains('dpab-panel--open') ? panel.classList.remove('dpab-panel--open') : panel.classList.add('dpab-panel--open');

    return true;
};

const appendHtml = (html, root = null) => {
    if (root === null) root = document.body;

    const docFragment = new DOMParser().parseFromString(html, 'text/html');
    document.head.append(...docFragment.head.childNodes);
    root.append(...docFragment.body.childNodes);
};

// init code
(() => {
    // append stylesheet
    appendHtml('<link rel="stylesheet" href="http://accessibility-bookmarklet.test/index.css">');

    // create panel
    appendHtml(`
        <div class="dpab-panel">
            <p>Accessibility bookmarklet</p>
            <ol>
                <li><label><input type="checkbox"> Headings</label></li>
            </ol>
        </div>
    `);

    main();
})();

// attach functionality to window
window.dpab = main;
