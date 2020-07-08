/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-customelements-setclasses !*/
!(function (e, n, s) {
  function o(e) {
    var n = r.className,
      s = Modernizr._config.classPrefix || '';
    if ((c && (n = n.baseVal), Modernizr._config.enableJSClass)) {
      var o = new RegExp('(^|\\s)' + s + 'no-js(\\s|$)');
      n = n.replace(o, '$1' + s + 'js$2');
    }
    Modernizr._config.enableClasses && ((n += ' ' + s + e.join(' ' + s)), c ? (r.className.baseVal = n) : (r.className = n));
  }
  function a(e, n) {
    return typeof e === n;
  }
  function t() {
    var e, n, s, o, t, f, r;
    for (var c in l)
      if (l.hasOwnProperty(c)) {
        if (((e = []), (n = l[c]), n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)))
          for (s = 0; s < n.options.aliases.length; s++) e.push(n.options.aliases[s].toLowerCase());
        for (o = a(n.fn, 'function') ? n.fn() : n.fn, t = 0; t < e.length; t++)
          (f = e[t]),
            (r = f.split('.')),
            1 === r.length
              ? (Modernizr[r[0]] = o)
              : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])),
                (Modernizr[r[0]][r[1]] = o)),
            i.push((o ? '' : 'no-') + r.join('-'));
      }
  }
  var i = [],
    l = [],
    f = {
      _version: '3.6.0',
      _config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
      _q: [],
      on: function (e, n) {
        var s = this;
        setTimeout(function () {
          n(s[e]);
        }, 0);
      },
      addTest: function (e, n, s) {
        l.push({ name: e, fn: n, options: s });
      },
      addAsyncTest: function (e) {
        l.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = f), (Modernizr = new Modernizr()), Modernizr.addTest('customelements', 'customElements' in e);
  var r = n.documentElement,
    c = 'svg' === r.nodeName.toLowerCase();
  t(), o(i), delete f.addTest, delete f.addAsyncTest;
  for (var u = 0; u < Modernizr._q.length; u++) Modernizr._q[u]();
  e.Modernizr = Modernizr;
})(window, document);
