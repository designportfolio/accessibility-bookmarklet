export const createNode = (html) => new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];

export const selector = (className) => `.${className.replace(':', '\\:')}`;
