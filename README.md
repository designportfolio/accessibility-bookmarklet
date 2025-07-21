# accessibility-bookmarklet

```javascript
javascript:((w, d) => {
    if (w.dpab) w.dpab();
    else d.body.appendChild(d.createElement('script')).src = 'http://accessibility-bookmarklet.test/index.js';
})(window, document);
```
