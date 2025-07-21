# accessibility-bookmarklet

```javascript
javascript:((w, d) => {
    if (w.dpab) w.dpab();
    else d.body.appendChild(d.createElement('script')).src = 'https://raw.githubusercontent.com/designportfolio/accessibility-bookmarklet/refs/heads/main/public/index.js';
})(window, document);
```
