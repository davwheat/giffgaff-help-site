// Custom components polyfill
(function () {
  if (window['force-no-ce-shim']) {
    return;
  }
  var supportsV1 = 'customElements' in window;
  var nativeShimBase64 =
    'ZnVuY3Rpb24gbmF0aXZlU2hpbSgpeygoKT0+eyd1c2Ugc3RyaWN0JztpZighd2luZG93LmN1c3RvbUVsZW1lbnRzKXJldHVybjtjb25zdCBhPXdpbmRvdy5IVE1MRWxlbWVudCxiPXdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUsYz13aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0LGQ9bmV3IE1hcCxlPW5ldyBNYXA7bGV0IGY9ITEsZz0hMTt3aW5kb3cuSFRNTEVsZW1lbnQ9ZnVuY3Rpb24oKXtpZighZil7Y29uc3Qgaj1kLmdldCh0aGlzLmNvbnN0cnVjdG9yKSxrPWMuY2FsbCh3aW5kb3cuY3VzdG9tRWxlbWVudHMsaik7Zz0hMDtjb25zdCBsPW5ldyBrO3JldHVybiBsfWY9ITE7fSx3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlPWEucHJvdG90eXBlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csJ2N1c3RvbUVsZW1lbnRzJyx7dmFsdWU6d2luZG93LmN1c3RvbUVsZW1lbnRzLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuY3VzdG9tRWxlbWVudHMsJ2RlZmluZScse3ZhbHVlOihqLGspPT57Y29uc3QgbD1rLnByb3RvdHlwZSxtPWNsYXNzIGV4dGVuZHMgYXtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsbCksZ3x8KGY9ITAsay5jYWxsKHRoaXMpKSxnPSExO319LG49bS5wcm90b3R5cGU7bS5vYnNlcnZlZEF0dHJpYnV0ZXM9ay5vYnNlcnZlZEF0dHJpYnV0ZXMsbi5jb25uZWN0ZWRDYWxsYmFjaz1sLmNvbm5lY3RlZENhbGxiYWNrLG4uZGlzY29ubmVjdGVkQ2FsbGJhY2s9bC5kaXNjb25uZWN0ZWRDYWxsYmFjayxuLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaz1sLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayxuLmFkb3B0ZWRDYWxsYmFjaz1sLmFkb3B0ZWRDYWxsYmFjayxkLnNldChrLGopLGUuc2V0KGosayksYi5jYWxsKHdpbmRvdy5jdXN0b21FbGVtZW50cyxqLG0pO30sY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5jdXN0b21FbGVtZW50cywnZ2V0Jyx7dmFsdWU6KGopPT5lLmdldChqKSxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTt9KSgpO30=';

  if (supportsV1 && !window['force-ce-shim']) {
    var noNativeShim = typeof NO_NATIVE_SHIM !== 'undefined' ? NO_NATIVE_SHIM : window['no-native-shim'];
    if (!noNativeShim) {
      eval(window.atob(nativeShimBase64));
      nativeShim();
    }
  } else {
    customElements();
  }

  function customElements() {
    (function () {
      // @license Polymer Project Authors. http://polymer.github.io/LICENSE.txt
      'use strict';
      var g = new (function () {})();
      var aa = new Set(
        'annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph'.split(' ')
      );
      function k(b) {
        var a = aa.has(b);
        b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);
        return !a && b;
      }
      function l(b) {
        var a = b.isConnected;
        if (void 0 !== a) return a;
        for (; b && !(b.__CE_isImportDocument || b instanceof Document); )
          b = b.parentNode || (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);
        return !(!b || !(b.__CE_isImportDocument || b instanceof Document));
      }
      function m(b, a) {
        for (; a && a !== b && !a.nextSibling; ) a = a.parentNode;
        return a && a !== b ? a.nextSibling : null;
      }
      function n(b, a, e) {
        e = e ? e : new Set();
        for (var c = b; c; ) {
          if (c.nodeType === Node.ELEMENT_NODE) {
            var d = c;
            a(d);
            var h = d.localName;
            if ('link' === h && 'import' === d.getAttribute('rel')) {
              c = d.import;
              if (c instanceof Node && !e.has(c)) for (e.add(c), c = c.firstChild; c; c = c.nextSibling) n(c, a, e);
              c = m(b, d);
              continue;
            } else if ('template' === h) {
              c = m(b, d);
              continue;
            }
            if ((d = d.__CE_shadowRoot)) for (d = d.firstChild; d; d = d.nextSibling) n(d, a, e);
          }
          c = c.firstChild ? c.firstChild : m(b, c);
        }
      }
      function q(b, a, e) {
        b[a] = e;
      }
      function r() {
        this.a = new Map();
        this.f = new Map();
        this.c = [];
        this.b = !1;
      }
      function ba(b, a, e) {
        b.a.set(a, e);
        b.f.set(e.constructor, e);
      }
      function t(b, a) {
        b.b = !0;
        b.c.push(a);
      }
      function v(b, a) {
        b.b &&
          n(a, function (a) {
            return w(b, a);
          });
      }
      function w(b, a) {
        if (b.b && !a.__CE_patched) {
          a.__CE_patched = !0;
          for (var e = 0; e < b.c.length; e++) b.c[e](a);
        }
      }
      function x(b, a) {
        var e = [];
        n(a, function (b) {
          return e.push(b);
        });
        for (a = 0; a < e.length; a++) {
          var c = e[a];
          1 === c.__CE_state ? b.connectedCallback(c) : y(b, c);
        }
      }
      function z(b, a) {
        var e = [];
        n(a, function (b) {
          return e.push(b);
        });
        for (a = 0; a < e.length; a++) {
          var c = e[a];
          1 === c.__CE_state && b.disconnectedCallback(c);
        }
      }
      function A(b, a, e) {
        e = e ? e : new Set();
        var c = [];
        n(
          a,
          function (d) {
            if ('link' === d.localName && 'import' === d.getAttribute('rel')) {
              var a = d.import;
              a instanceof Node && 'complete' === a.readyState
                ? ((a.__CE_isImportDocument = !0), (a.__CE_hasRegistry = !0))
                : d.addEventListener('load', function () {
                    var a = d.import;
                    a.__CE_documentLoadHandled ||
                      ((a.__CE_documentLoadHandled = !0),
                      (a.__CE_isImportDocument = !0),
                      (a.__CE_hasRegistry = !0),
                      new Set(e),
                      e.delete(a),
                      A(b, a, e));
                  });
            } else c.push(d);
          },
          e
        );
        if (b.b) for (a = 0; a < c.length; a++) w(b, c[a]);
        for (a = 0; a < c.length; a++) y(b, c[a]);
      }
      function y(b, a) {
        if (void 0 === a.__CE_state) {
          var e = b.a.get(a.localName);
          if (e) {
            e.constructionStack.push(a);
            var c = e.constructor;
            try {
              try {
                if (new c() !== a) throw Error('The custom element constructor did not produce the element being upgraded.');
              } finally {
                e.constructionStack.pop();
              }
            } catch (f) {
              throw ((a.__CE_state = 2), f);
            }
            a.__CE_state = 1;
            a.__CE_definition = e;
            if (e.attributeChangedCallback)
              for (e = e.observedAttributes, c = 0; c < e.length; c++) {
                var d = e[c],
                  h = a.getAttribute(d);
                null !== h && b.attributeChangedCallback(a, d, null, h, null);
              }
            l(a) && b.connectedCallback(a);
          }
        }
      }
      r.prototype.connectedCallback = function (b) {
        var a = b.__CE_definition;
        a.connectedCallback && a.connectedCallback.call(b);
      };
      r.prototype.disconnectedCallback = function (b) {
        var a = b.__CE_definition;
        a.disconnectedCallback && a.disconnectedCallback.call(b);
      };
      r.prototype.attributeChangedCallback = function (b, a, e, c, d) {
        var h = b.__CE_definition;
        h.attributeChangedCallback && -1 < h.observedAttributes.indexOf(a) && h.attributeChangedCallback.call(b, a, e, c, d);
      };
      function B(b, a) {
        this.c = b;
        this.a = a;
        this.b = void 0;
        A(this.c, this.a);
        'loading' === this.a.readyState &&
          ((this.b = new MutationObserver(this.f.bind(this))), this.b.observe(this.a, { childList: !0, subtree: !0 }));
      }
      function C(b) {
        b.b && b.b.disconnect();
      }
      B.prototype.f = function (b) {
        var a = this.a.readyState;
        ('interactive' !== a && 'complete' !== a) || C(this);
        for (a = 0; a < b.length; a++) for (var e = b[a].addedNodes, c = 0; c < e.length; c++) A(this.c, e[c]);
      };
      function ca() {
        var b = this;
        this.b = this.a = void 0;
        this.c = new Promise(function (a) {
          b.b = a;
          b.a && a(b.a);
        });
      }
      function D(b) {
        if (b.a) throw Error('Already resolved.');
        b.a = void 0;
        b.b && b.b(void 0);
      }
      function E(b) {
        this.f = !1;
        this.a = b;
        this.h = new Map();
        this.g = function (b) {
          return b();
        };
        this.b = !1;
        this.c = [];
        this.j = new B(b, document);
      }
      E.prototype.l = function (b, a) {
        var e = this;
        if (!(a instanceof Function)) throw new TypeError('Custom element constructors must be functions.');
        if (!k(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
        if (this.a.a.get(b)) throw Error("A custom element with name '" + b + "' has already been defined.");
        if (this.f) throw Error('A custom element is already being defined.');
        this.f = !0;
        var c, d, h, f, u;
        try {
          var p = function (b) {
              var a = P[b];
              if (void 0 !== a && !(a instanceof Function)) throw Error("The '" + b + "' callback must be a function.");
              return a;
            },
            P = a.prototype;
          if (!(P instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
          c = p('connectedCallback');
          d = p('disconnectedCallback');
          h = p('adoptedCallback');
          f = p('attributeChangedCallback');
          u = a.observedAttributes || [];
        } catch (va) {
          return;
        } finally {
          this.f = !1;
        }
        ba(this.a, b, {
          localName: b,
          constructor: a,
          connectedCallback: c,
          disconnectedCallback: d,
          adoptedCallback: h,
          attributeChangedCallback: f,
          observedAttributes: u,
          constructionStack: [],
        });
        this.c.push(b);
        this.b ||
          ((this.b = !0),
          this.g(function () {
            if (!1 !== e.b)
              for (e.b = !1, A(e.a, document); 0 < e.c.length; ) {
                var b = e.c.shift();
                (b = e.h.get(b)) && D(b);
              }
          }));
      };
      E.prototype.get = function (b) {
        if ((b = this.a.a.get(b))) return b.constructor;
      };
      E.prototype.o = function (b) {
        if (!k(b)) return Promise.reject(new SyntaxError("'" + b + "' is not a valid custom element name."));
        var a = this.h.get(b);
        if (a) return a.c;
        a = new ca();
        this.h.set(b, a);
        this.a.a.get(b) && -1 === this.c.indexOf(b) && D(a);
        return a.c;
      };
      E.prototype.m = function (b) {
        C(this.j);
        var a = this.g;
        this.g = function (e) {
          return b(function () {
            return a(e);
          });
        };
      };
      window.CustomElementRegistry = E;
      E.prototype.define = E.prototype.l;
      E.prototype.get = E.prototype.get;
      E.prototype.whenDefined = E.prototype.o;
      E.prototype.polyfillWrapFlushCallback = E.prototype.m;
      var F = window.Document.prototype.createElement,
        da = window.Document.prototype.createElementNS,
        ea = window.Document.prototype.importNode,
        fa = window.Document.prototype.prepend,
        ga = window.Document.prototype.append,
        G = window.Node.prototype.cloneNode,
        H = window.Node.prototype.appendChild,
        I = window.Node.prototype.insertBefore,
        J = window.Node.prototype.removeChild,
        K = window.Node.prototype.replaceChild,
        L = Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
        M = window.Element.prototype.attachShadow,
        N = Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
        O = window.Element.prototype.getAttribute,
        Q = window.Element.prototype.setAttribute,
        R = window.Element.prototype.removeAttribute,
        S = window.Element.prototype.getAttributeNS,
        T = window.Element.prototype.setAttributeNS,
        U = window.Element.prototype.removeAttributeNS,
        V = window.Element.prototype.insertAdjacentElement,
        ha = window.Element.prototype.prepend,
        ia = window.Element.prototype.append,
        ja = window.Element.prototype.before,
        ka = window.Element.prototype.after,
        la = window.Element.prototype.replaceWith,
        ma = window.Element.prototype.remove,
        na = window.HTMLElement,
        W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML'),
        X = window.HTMLElement.prototype.insertAdjacentElement;
      function oa() {
        var b = Y;
        window.HTMLElement = (function () {
          function a() {
            var a = this.constructor,
              c = b.f.get(a);
            if (!c) throw Error('The custom element being constructed was not registered with `customElements`.');
            var d = c.constructionStack;
            if (!d.length)
              return (
                (d = F.call(document, c.localName)),
                Object.setPrototypeOf(d, a.prototype),
                (d.__CE_state = 1),
                (d.__CE_definition = c),
                w(b, d),
                d
              );
            var c = d.length - 1,
              h = d[c];
            if (h === g) throw Error('The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.');
            d[c] = g;
            Object.setPrototypeOf(h, a.prototype);
            w(b, h);
            return h;
          }
          a.prototype = na.prototype;
          return a;
        })();
      }
      function pa(b, a, e) {
        a.prepend = function (a) {
          for (var d = [], c = 0; c < arguments.length; ++c) d[c - 0] = arguments[c];
          c = d.filter(function (b) {
            return b instanceof Node && l(b);
          });
          e.i.apply(this, d);
          for (var f = 0; f < c.length; f++) z(b, c[f]);
          if (l(this)) for (c = 0; c < d.length; c++) (f = d[c]), f instanceof Element && x(b, f);
        };
        a.append = function (a) {
          for (var d = [], c = 0; c < arguments.length; ++c) d[c - 0] = arguments[c];
          c = d.filter(function (b) {
            return b instanceof Node && l(b);
          });
          e.append.apply(this, d);
          for (var f = 0; f < c.length; f++) z(b, c[f]);
          if (l(this)) for (c = 0; c < d.length; c++) (f = d[c]), f instanceof Element && x(b, f);
        };
      }
      function qa() {
        var b = Y;
        q(Document.prototype, 'createElement', function (a) {
          if (this.__CE_hasRegistry) {
            var e = b.a.get(a);
            if (e) return new e.constructor();
          }
          a = F.call(this, a);
          w(b, a);
          return a;
        });
        q(Document.prototype, 'importNode', function (a, e) {
          a = ea.call(this, a, e);
          this.__CE_hasRegistry ? A(b, a) : v(b, a);
          return a;
        });
        q(Document.prototype, 'createElementNS', function (a, e) {
          if (this.__CE_hasRegistry && (null === a || 'http://www.w3.org/1999/xhtml' === a)) {
            var c = b.a.get(e);
            if (c) return new c.constructor();
          }
          a = da.call(this, a, e);
          w(b, a);
          return a;
        });
        pa(b, Document.prototype, { i: fa, append: ga });
      }
      function ra() {
        var b = Y;
        function a(a, c) {
          Object.defineProperty(a, 'textContent', {
            enumerable: c.enumerable,
            configurable: !0,
            get: c.get,
            set: function (a) {
              if (this.nodeType === Node.TEXT_NODE) c.set.call(this, a);
              else {
                var d = void 0;
                if (this.firstChild) {
                  var e = this.childNodes,
                    u = e.length;
                  if (0 < u && l(this)) for (var d = Array(u), p = 0; p < u; p++) d[p] = e[p];
                }
                c.set.call(this, a);
                if (d) for (a = 0; a < d.length; a++) z(b, d[a]);
              }
            },
          });
        }
        q(Node.prototype, 'insertBefore', function (a, c) {
          if (a instanceof DocumentFragment) {
            var d = Array.prototype.slice.apply(a.childNodes);
            a = I.call(this, a, c);
            if (l(this)) for (c = 0; c < d.length; c++) x(b, d[c]);
            return a;
          }
          d = l(a);
          c = I.call(this, a, c);
          d && z(b, a);
          l(this) && x(b, a);
          return c;
        });
        q(Node.prototype, 'appendChild', function (a) {
          if (a instanceof DocumentFragment) {
            var c = Array.prototype.slice.apply(a.childNodes);
            a = H.call(this, a);
            if (l(this)) for (var d = 0; d < c.length; d++) x(b, c[d]);
            return a;
          }
          c = l(a);
          d = H.call(this, a);
          c && z(b, a);
          l(this) && x(b, a);
          return d;
        });
        q(Node.prototype, 'cloneNode', function (a) {
          a = G.call(this, a);
          this.ownerDocument.__CE_hasRegistry ? A(b, a) : v(b, a);
          return a;
        });
        q(Node.prototype, 'removeChild', function (a) {
          var c = l(a),
            d = J.call(this, a);
          c && z(b, a);
          return d;
        });
        q(Node.prototype, 'replaceChild', function (a, c) {
          if (a instanceof DocumentFragment) {
            var d = Array.prototype.slice.apply(a.childNodes);
            a = K.call(this, a, c);
            if (l(this)) for (z(b, c), c = 0; c < d.length; c++) x(b, d[c]);
            return a;
          }
          var d = l(a),
            e = K.call(this, a, c),
            f = l(this);
          f && z(b, c);
          d && z(b, a);
          f && x(b, a);
          return e;
        });
        L && L.get
          ? a(Node.prototype, L)
          : t(b, function (b) {
              a(b, {
                enumerable: !0,
                configurable: !0,
                get: function () {
                  for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);
                  return a.join('');
                },
                set: function (a) {
                  for (; this.firstChild; ) J.call(this, this.firstChild);
                  H.call(this, document.createTextNode(a));
                },
              });
            });
      }
      function sa(b) {
        var a = Element.prototype;
        a.before = function (a) {
          for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
          d = c.filter(function (a) {
            return a instanceof Node && l(a);
          });
          ja.apply(this, c);
          for (var e = 0; e < d.length; e++) z(b, d[e]);
          if (l(this)) for (d = 0; d < c.length; d++) (e = c[d]), e instanceof Element && x(b, e);
        };
        a.after = function (a) {
          for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
          d = c.filter(function (a) {
            return a instanceof Node && l(a);
          });
          ka.apply(this, c);
          for (var e = 0; e < d.length; e++) z(b, d[e]);
          if (l(this)) for (d = 0; d < c.length; d++) (e = c[d]), e instanceof Element && x(b, e);
        };
        a.replaceWith = function (a) {
          for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
          var d = c.filter(function (a) {
              return a instanceof Node && l(a);
            }),
            e = l(this);
          la.apply(this, c);
          for (var f = 0; f < d.length; f++) z(b, d[f]);
          if (e) for (z(b, this), d = 0; d < c.length; d++) (e = c[d]), e instanceof Element && x(b, e);
        };
        a.remove = function () {
          var a = l(this);
          ma.call(this);
          a && z(b, this);
        };
      }
      function ta() {
        var b = Y;
        function a(a, c) {
          Object.defineProperty(a, 'innerHTML', {
            enumerable: c.enumerable,
            configurable: !0,
            get: c.get,
            set: function (a) {
              var d = this,
                e = void 0;
              l(this) &&
                ((e = []),
                n(this, function (a) {
                  a !== d && e.push(a);
                }));
              c.set.call(this, a);
              if (e)
                for (var f = 0; f < e.length; f++) {
                  var h = e[f];
                  1 === h.__CE_state && b.disconnectedCallback(h);
                }
              this.ownerDocument.__CE_hasRegistry ? A(b, this) : v(b, this);
              return a;
            },
          });
        }
        function e(a, c) {
          q(a, 'insertAdjacentElement', function (a, d) {
            var e = l(d);
            a = c.call(this, a, d);
            e && z(b, d);
            l(a) && x(b, d);
            return a;
          });
        }
        M
          ? q(Element.prototype, 'attachShadow', function (a) {
              return (this.__CE_shadowRoot = a = M.call(this, a));
            })
          : null;
        if (N && N.get) a(Element.prototype, N);
        else if (W && W.get) a(HTMLElement.prototype, W);
        else {
          var c = F.call(document, 'div');
          t(b, function (b) {
            a(b, {
              enumerable: !0,
              configurable: !0,
              get: function () {
                return G.call(this, !0).innerHTML;
              },
              set: function (a) {
                var b = 'template' === this.localName ? this.content : this;
                for (c.innerHTML = a; 0 < b.childNodes.length; ) J.call(b, b.childNodes[0]);
                for (; 0 < c.childNodes.length; ) H.call(b, c.childNodes[0]);
              },
            });
          });
        }
        q(Element.prototype, 'setAttribute', function (a, c) {
          if (1 !== this.__CE_state) return Q.call(this, a, c);
          var d = O.call(this, a);
          Q.call(this, a, c);
          c = O.call(this, a);
          d !== c && b.attributeChangedCallback(this, a, d, c, null);
        });
        q(Element.prototype, 'setAttributeNS', function (a, c, e) {
          if (1 !== this.__CE_state) return T.call(this, a, c, e);
          var d = S.call(this, a, c);
          T.call(this, a, c, e);
          e = S.call(this, a, c);
          d !== e && b.attributeChangedCallback(this, c, d, e, a);
        });
        q(Element.prototype, 'removeAttribute', function (a) {
          if (1 !== this.__CE_state) return R.call(this, a);
          var c = O.call(this, a);
          R.call(this, a);
          null !== c && b.attributeChangedCallback(this, a, c, null, null);
        });
        q(Element.prototype, 'removeAttributeNS', function (a, c) {
          if (1 !== this.__CE_state) return U.call(this, a, c);
          var d = S.call(this, a, c);
          U.call(this, a, c);
          var e = S.call(this, a, c);
          d !== e && b.attributeChangedCallback(this, c, d, e, a);
        });
        X
          ? e(HTMLElement.prototype, X)
          : V
          ? e(Element.prototype, V)
          : console.warn('Custom Elements: `Element#insertAdjacentElement` was not patched.');
        pa(b, Element.prototype, { i: ha, append: ia });
        sa(b);
      }
      var Z = window.customElements;
      if (!Z || Z.forcePolyfill || 'function' != typeof Z.define || 'function' != typeof Z.get) {
        var Y = new r();
        oa();
        qa();
        ra();
        ta();
        document.__CE_hasRegistry = !0;
        var ua = new E(Y);
        Object.defineProperty(window, 'customElements', { configurable: !0, enumerable: !0, value: ua });
      }
    }.call(self));
  }
})();

const externalLinkSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" style="vertical-align:middle;margin-right:6px;margin-left:-1px;" fill="#fff"><path d="M20 11.3c0 2.4 0 5.9.1 8.8 0 .2-.1.4-.2.5-.1.2-.3.2-.5.2-5.1 0-10.4 0-15.4.1-.2 0-.3-.1-.5-.2-.1-.1-.2-.3-.2-.5v-4.1c0-3.6.1-7.3-.1-11 0-.2.1-.4.2-.5.2-.2.3-.3.6-.3h8.5c.2 0 .5.1.7.1h.1l.1.2v.5c0 .2-.2.4-.5.4H5.4c-.3 0-.5.1-.8.1v1c0 .9.1 1.9.1 3.1v6.9c0 .3-.1.6-.1 1v1.8h14.2v-8.5c0-.2.1-.4.2-.5h.5c.3.2.4.4.5.7v.2z"/><path d="M20.3 2.8h-4.7c-.2.1-.5.1-.5.4v.5c.1.2.2.3.3.4.1 0 .1 0 .2.1 0 0 .1 0 .2.1h2.6C15 7.9 11.4 11.5 7.9 15c-.1.1-.2.3-.2.5v.2c.1.2.2.4.4.5.1 0 .2 0 .3.1.2 0 .3 0 .5-.2L19.6 5.3v.6c0 .3-.1.7-.1.9v1.8l.1.1c.3.3.6.3.8.3.2 0 .4-.1.5-.3.1-.1.1-.3.1-.4V3.6c.1-.4-.3-.8-.7-.8z"/></svg>';

const menuItems = [
  {
    title: 'giffgaff Status',
    link: 'https://giffgaffstatus.com',
  },
  {
    title: 'Handy Guides',
    link: '/kb',
    items: [
      {
        link: '/kb#roaming',
        title: 'Roaming with giffgaff',
      },
    ],
  },
  {
    title: 'Helper tools',
    link: '/helper-tools',
    items: [
      {
        link: '/helper-tools/community-images',
        title: 'Community images',
      },
      {
        link: '/helper-tools/information/number-checker',
        title: 'Number pricing calculator',
      },
      {
        link: '/helper-tools/responses/buttons',
        title: 'Button generator',
      },
    ],
  },
];

function ggHeader() {
  return Reflect.construct(HTMLElement, [], this.constructor);
}

ggHeader.prototype = Object.create(HTMLElement.prototype);
ggHeader.prototype.constructor = ggHeader;
Object.setPrototypeOf(ggHeader, HTMLElement);

ggHeader.prototype.connectedCallback = function () {
  this.innerHTML =
    '<nav> <ul class="gg-c-skip-links"> <li> <a class="gg-c-skip-links__link gg-u-screen-reader-only" href="#main-content" >Skip to main content</a > </li> </ul> </nav> <header class="gg-c-website-header"> <div class="gg-c-website-header__bar"> <a class="gg-c-website-header__logo" href="/"> <svg viewBox="0 0 256 56" height="56px" xmlns="http://www.w3.org/2000/svg" > <title>giffgaff community</title> <path d="M0 0h256v56H0z" /> <path fill="none" stroke="#fff" stroke-miterlimit="10" d="M98 0v56" /> <path fill="#fff" d="M83.8 17a9.2 9.2 0 00-1.1 0 6.7 6.7 0 00-3.6.8 4.6 4.6 0 00-2 4.2v.4h-4.4V22c0-1.5.8-2.2 2.6-2.2h.7v-2.8a8.6 8.6 0 00-1.2-.1 6.4 6.4 0 00-3.4.8 4.4 4.4 0 00-2 4.2v11H67c-.4 0-.6-.2-.6-.6v-5c0-3.6-2-5.4-5.8-5.4a7.8 7.8 0 00-3 .5 2.4 2.4 0 00-2 2.3v1.4h3v-.7c0-.3.3-.6.8-.7a2.5 2.5 0 011-.2 2.6 2.6 0 012 .6 3 3 0 01.6 2v.2h-.4a14.5 14.5 0 00-4.9.7c-2 .7-3 2-3 3.8A3.7 3.7 0 0056 35a4.8 4.8 0 003.2 1 4.5 4.5 0 003.2-1 4.1 4.1 0 00.9-1.2v.6a1.4 1.4 0 00.4 1 1.7 1.7 0 001.3.5h7.6V25h4.5v10.7h3.3V25.1h3v-2.8h-3v-.2c0-1.5.8-2.3 2.6-2.3l.7.1zM62.6 29.8h.6v.3a3.4 3.4 0 01-.9 2.3 2.7 2.7 0 01-2.1 1.2 2.2 2.2 0 01-1.6-.5 1.8 1.8 0 01-.5-1.2q0-2.2 4.5-2.2M49.7 23.6v.4a3 3 0 00-.9-1 5 5 0 00-3.2-1 5.5 5.5 0 00-4.5 2 7.2 7.2 0 00-1.5 4.8 7.2 7.2 0 001.6 4.8 5.5 5.5 0 004.4 2 4.5 4.5 0 003.8-1.8v1.4a3 3 0 01-1.1 2.6 4.3 4.3 0 01-2.7.7A8.4 8.4 0 0143 38l-1-.5-1 2.7a10.6 10.6 0 004.7 1.2 8 8 0 005-1.5 5.7 5.7 0 002.1-4.9v-9.2c0-.4.2-.6.6-.6h1v-2.8h-3.1a1.5 1.5 0 00-1.1.4 1.1 1.1 0 00-.4.8m-6 2.3a2.9 2.9 0 012.3-1c2.3 0 3.4 1.3 3.4 3.9a4.5 4.5 0 01-1 3.1 3.2 3.2 0 01-4.7-.4 4.6 4.6 0 01-.9-2.9 4.2 4.2 0 01.9-2.7M39.1 25v-2.6h-3V22c0-1.5 1-2.3 2.7-2.3h.7V17a9.2 9.2 0 00-1.2 0 7 7 0 00-3.5.8 4.6 4.6 0 00-2 4.2v.4h-4.4V22c0-1.5.8-2.2 2.6-2.2h.7V17a10 10 0 00-1.2 0 6.8 6.8 0 00-3.4.8A4.5 4.5 0 0025 22v11h-2.5c-.4 0-.5-.2-.5-.6v-8.3a1.8 1.8 0 00-.5-1.4 1.8 1.8 0 00-1.3-.3H14a1.6 1.6 0 00-1.1.4 1.1 1.1 0 00-.3.8.4.4 0 000 .3h-.1a3.7 3.7 0 00-1-1 5.5 5.5 0 00-3.1-.9 5.5 5.5 0 00-4.5 2 7.4 7.4 0 00-1.5 4.7A7.8 7.8 0 004 33.5a5.5 5.5 0 004.5 2 4.3 4.3 0 003.7-1.7v1.3a3 3 0 01-1.1 2.6 4.5 4.5 0 01-2.7.8 8.3 8.3 0 01-2.6-.5l-1.1-.5-1 2.7a10.7 10.7 0 004.8 1.2 8 8 0 004.8-1.5 5.8 5.8 0  002.3-4.9v-9.3c0-.3.2-.5.5-.5h2c.4 0 .5.2.5.6V34a1.8 1.8 0 00.5 1.4 1.6 1.6 0 001.3.4h8V25h4.4v10.8h3.4V25zm-32.5.9a3 3 0 012.4-1c2.2 0 3.3 1.3 3.3 3.9a4.4 4.4 0 01-1 3.2 3 3 0 01-2.2.8 3 3 0 01-2.4-1.2 4.6 4.6 0 01-1-3 4.1 4.1 0 01.9-2.7"/> <path fill="#fff" d="M18.6 17H22v3.4h-3.4z" /> <text x="110" y="34" fill="#fff" font-size="20px"> unofficial help </text> </svg> </a> <button type="button" class="gg-c-website-header__sm-nav-trigger"> <span class="gg-c-website-header__sm-nav-trigger-icon"></span ><span class="gg-u-screen-reader-only">Menu</span> </button> <nav class="gg-c-website-header__lrg-screen-nav"> <ul class="gg-c-website-header__lrg-screen-list">' +
    menuItems
      .map(function (item) {
        return (
          '<li class="gg-c-website-header__lrg-screen-item"><a href="' +
          item.link +
          '" class="gg-c-website-header__lrg-screen-link"><span>' +
          item.title +
          '</span></a>' +
          (item.items
            ? '<div class="gg-c-website-header__lrg-screen-menu"><div class="gg-c-website-header__lrg-screen-menu-content"><ul class="website-header-large-screen__major-menu">' +
              item.items
                .map(function (item) {
                  return '<li><a href="' + item.link + '" class="website-header-large-screen__link">' + item.title + '</a></li>';
                })
                .join('') +
              '</ul></div></div>'
            : '') +
          '</li>'
        );
      })
      .join('') +
    ' </ul></nav></div><nav class="gg-c-website-header__sm-screen-nav"><ul>' +
    menuItems
      .map(function (item) {
        return (
          '<li class="gg-c-website-header__sm-screen-item">' +
          (item.items
            ? '<details class="gg-c-website-header__sm-screen-accordion"><summary class="gg-c-website-header__sm-screen-category"><span class="gg-c-website-header__sm-screen-category-icon"></span>'
            : '<span style="height:48px;margin-top:16px;display:block;">' + externalLinkSvg + '<a href="' + item.link + '">') +
          item.title +
          (item.items ? '</summary>' : '</a></span>') +
          (item.items
            ? '<ul class="gg-c-website-header__sm-screen-sub-menu"> ' +
              item.items
                .map(function (item) {
                  return (
                    '<li class="gg-c-website-header__sm-screen-sub-menu-item"><a href="' +
                    item.link +
                    '" class="gg-c-website-header__sm-screen-sub-menu-link">' +
                    item.title +
                    '</a></li>'
                  );
                })
                .join('') +
              '</ul>'
            : '') +
          (item.items ? '</details>' : '') +
          '</li>'
        );
      })
      .join('') +
    '</ul></nav></header><section id="unofficial"><div class="gg-o-page-section"><strong>Please note:</strong> this website is run by a member of the giffgaff community and is not to be confused with <a class="gg-u-link" href="https://giffgaff.com/" target="_blank" rel="noreferrer noopener">giffgaff.com</a></div></section>';
};

function ggFooter() {
  return Reflect.construct(HTMLElement, [], this.constructor);
}

ggFooter.prototype = Object.create(HTMLElement.prototype);
ggFooter.prototype.constructor = ggFooter;
Object.setPrototypeOf(ggFooter, HTMLElement);

// async support detection
document.createElement('div').innerHTML =
  '<img src="data:image/svg+xml,%3C%3Fxml version=\'1.0\'%3F%3E%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E%0A" onload="async ()=>{};window.__isAsyncAvailable=true">';

if (window.__isAsyncAvailable) {
  ggFooter.prototype.connectedCallback = function () {
    this.innerHTML =
      '<footer class="gg-t-black"><div class="gg-o-page-section"><p class="gg-u-text-speak-up" style="padding-bottom: 0px">&copy; 2020 David Wheatley</p>' +
      '<p class="gg-u-text-whisper">The community website run by <a class="gg-u-link" href="https://community.giffgaff.com/u/mrjeeves?utm_source=mrjeeves" target="_blank" rel="noopener noreferrer">mrjeeves</a></p>' +
      '<p class="gg-u-text-whisper">This page is run by a member of the giffgaff community and does not represent the views or opinions of giffgaff Limited, nor its staff. giffgaff is the registered trademark of giffgaff&nbsp;Limited.</p>' +
      '<a href="https://bit.ly/giffgaffmrjeeves" class="footer-img" title="Get a giffgaff SIM with £5 free credit" target="_blank" rel="noopener noreferrer"><picture class="gg-b128-n256-r512"><source media="(min-width: 728px)" srcset="/img/gg-img/aff-large.png"><source media="(min-width: 550px and max-width: 727px)" srcset="/img/gg-img/aff-med.png"><source media="(max-width: 549px)" srcset="/img/gg-img/aff-small.png"><img src="/img/gg-img/aff-large.png" alt="Get 80 gigabytes data for just £20 per month."></picture></a></div></footer>';

    const websiteHeader = document.querySelector('.gg-c-website-header');
    const smNavTrigger = websiteHeader.querySelector('.gg-c-website-header__sm-nav-trigger');
    const smNav = websiteHeader.querySelector('.gg-c-website-header__sm-screen-nav');

    smNavTrigger.onclick = function () {
      smNavTrigger.classList.toggle('gg-c-website-header__sm-nav-trigger--active');
      smNav.classList.toggle('gg-c-website-header__sm-screen-nav--open');
    };
  };
} else {
  ggFooter.prototype.connectedCallback = async function () {
    const versionInfo = await (await fetch('/version-info.json')).json();

    const code = versionInfo.version;

    const date = new Date(versionInfo.date);
    var dd = String(date.getDate());
    var mm = String(date.getMonth() + 1);
    var yy = String(date.getFullYear()).substr(2); // last 2 year digits

    const dateString = dd + '/' + mm + '/' + yy;

    this.innerHTML =
      '<footer class="gg-t-black"><div class="gg-o-page-section"><p class="gg-u-text-speak-up" style="padding-bottom: 0px">&copy; 2020 David Wheatley</p>' +
      '<p class="gg-u-text-whisper">Version ' +
      code +
      ' - Last updated ' +
      dateString +
      '</p>' +
      '<p class="gg-u-text-whisper">This page is run by a member of the giffgaff community and does not represent the views or opinions of giffgaff Limited, nor its staff. giffgaff is the registered trademark of giffgaff&nbsp;Limited.</p>' +
      '<a href="https://bit.ly/giffgaffmrjeeves" class="footer-img" title="Get a giffgaff SIM with £5 free credit" target="_blank" rel="noopener noreferrer"><picture class="gg-b128-n256-r512"><source media="(min-width: 728px)" srcset="/img/gg-img/aff-large.png"><source media="(min-width: 550px and max-width: 727px)" srcset="/img/gg-img/aff-med.png"><source media="(max-width: 549px)" srcset="/img/gg-img/aff-small.png"><img src="/img/gg-img/aff-large.png" alt="Get 80 gigabytes data for just £20 per month."></picture></a></div></footer>';

    const websiteHeader = document.querySelector('.gg-c-website-header');
    const smNavTrigger = websiteHeader.querySelector('.gg-c-website-header__sm-nav-trigger');
    const smNav = websiteHeader.querySelector('.gg-c-website-header__sm-screen-nav');

    smNavTrigger.onclick = function () {
      smNavTrigger.classList.toggle('gg-c-website-header__sm-nav-trigger--active');
      smNav.classList.toggle('gg-c-website-header__sm-screen-nav--open');
    };
  };
}

window.customElements.define('gg-header', ggHeader);
window.customElements.define('gg-footer', ggFooter);