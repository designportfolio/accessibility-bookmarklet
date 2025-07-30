import './scss/index.scss';
import './demo.css';

import { createPopper } from '@popperjs/core';

import Anchors from './es/elements/anchors';
import Headings from './es/elements/headings';
import Iframe from './es/elements/iframe';
import Images from './es/elements/images';
import Lists from './es/elements/lists';
import Svg from './es/elements/svg';

import ScreenreaderText from './es/tools/screenreader-text';

const elements = [
    new Anchors(),
    new Headings(),
    new Iframe(),
    new Images(),
    new Lists(),
    new Svg(),
];

const tools = [
    new ScreenreaderText(),
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

const generateReportData = () => {
    const data = Array.from(document.querySelectorAll('.dpab__wrapper')).map((el) => {
        let validity;

        if (el.classList.contains('dpab__wrapper--valid')) {
            validity = 'Yes';
        } else if (el.classList.contains('dpab__wrapper--invalid')) {
            validity = 'No';
        } else {
            validity = 'Unknown';
        }

        return [
            el.dataset.type,
            validity,
        ];
    });
    data.unshift(['Type', 'Valid']);
    return data;
};

const prepareCsv = (data) => data.map(row => row.map((cell) => '"' + cell.toString().replaceAll('"', '""') + '"').join(',')).join('\n');

const downloadReport = (content) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `dpab-report-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// init code
(() => {
    if (import.meta.env.PROD) {
        // append stylesheet
        appendHtml(`<link rel="stylesheet" href="${import.meta.env.VITE_ASSET_URL}index.css">`);
    }

    // create panel
    appendHtml(`
        <div class="dpab__panel">
            <button type="button" class="dpab__close" aria-label="Close">✕</button>
            <h1>Accessibility bookmarklet</h1>
            <h2>Elements</h2>
            <ul class="dpab__elements"></ul>
            <h2>Tools</h2>
            <ul class="dpab__tools"></ul>
        </div>
    `);

    // attach close button
    attachHandler(document.querySelector('.dpab__close'), () => {
        document.querySelector('.dpab__panel').classList.remove('dpab__panel--open');
    });

    // attach download button
    // attachHandler(document.querySelector('.dpab__download'), () => {
    //     // Array.from(document.querySelectorAll('.dpab__wrapper')).;
    //     const data = generateReportData();
    //     console.log(data);
    //     const csvContent = prepareCsv(data);
    //     // downloadReport(csvContent);
    // });

    //
    const elementList = document.querySelector('.dpab__elements');
    elements.forEach((obj) => {
        const el = appendHtml(`<li class=""><label><input type="checkbox"> ${obj.name}</label>`, elementList);
        attachHandler(el, (e) => {
            e.target.checked ? obj.enable() : obj.disable();
        }, 'change');
    });

    //
    const toolList = document.querySelector('.dpab__tools');
    tools.forEach((obj) => {
        const el = appendHtml(`<li class=""><label><input type="checkbox"> ${obj.name}</label>`, toolList);
        attachHandler(el, (e) => {
            e.target.checked ? obj.enable() : obj.disable();
        }, 'change');
    });

    main();
})();

// attach functionality to window
window.dpab = main;
