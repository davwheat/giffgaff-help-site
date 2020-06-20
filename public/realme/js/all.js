!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}function d(t){return u.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})}function c(e){var t=e||window.event;return!!d(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))}function o(){setTimeout(function(){void 0!==m&&(document.body.style.paddingRight=m,m=void 0),void 0!==f&&(document.body.style.overflow=f,f=void 0)})}var a="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&1<window.navigator.maxTouchPoints),u=[],s=!1,v=-1,f=void 0,m=void 0;exports.disableBodyScroll=function(r,e){if(a){if(!r)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(r&&!u.some(function(e){return e.targetElement===r})){var t={targetElement:r,options:e||{}};u=[].concat(i(u),[t]),r.ontouchstart=function(e){1===e.targetTouches.length&&(v=e.targetTouches[0].clientY)},r.ontouchmove=function(e){var t,o,n,i;1===e.targetTouches.length&&(o=r,i=(t=e).targetTouches[0].clientY-v,d(t.target)||(o&&0===o.scrollTop&&0<i||(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&i<0?c(t):t.stopPropagation()))},s||(document.addEventListener("touchmove",c,l?{passive:!1}:void 0),s=!0)}}else{n=e,setTimeout(function(){if(void 0===m){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(m=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===f&&(f=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:r,options:e||{}};u=[].concat(i(u),[o])}var n},exports.clearAllBodyScrollLocks=function(){a?(u.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),s&&(document.removeEventListener("touchmove",c,l?{passive:!1}:void 0),s=!1),u=[],v=-1):(o(),u=[])},exports.enableBodyScroll=function(t){if(a){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,u=u.filter(function(e){return e.targetElement!==t}),s&&0===u.length&&(document.removeEventListener("touchmove",c,l?{passive:!1}:void 0),s=!1)}else(u=u.filter(function(e){return e.targetElement!==t})).length||o()}});

(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
      ? (module.exports = factory())
      : typeof define === "function" && define.amd
      ? define(factory)
      : ((global = global || self), (global.dialogPolyfill = factory()));
  })(this, function () {
    "use strict";
  
    // nb. This is for IE10 and lower _only_.
    var supportCustomEvent = window.CustomEvent;
    if (!supportCustomEvent || typeof supportCustomEvent === "object") {
      supportCustomEvent = function CustomEvent(event, x) {
        x = x || {};
        var ev = document.createEvent("CustomEvent");
        ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
        return ev;
      };
      supportCustomEvent.prototype = window.Event.prototype;
    }
  
    /**
     * @param {Element} el to check for stacking context
     * @return {boolean} whether this el or its parents creates a stacking context
     */
    function createsStackingContext(el) {
      while (el && el !== document.body) {
        var s = window.getComputedStyle(el);
        var invalid = function (k, ok) {
          return !(s[k] === undefined || s[k] === ok);
        };
  
        if (
          s.opacity < 1 ||
          invalid("zIndex", "auto") ||
          invalid("transform", "none") ||
          invalid("mixBlendMode", "normal") ||
          invalid("filter", "none") ||
          invalid("perspective", "none") ||
          s["isolation"] === "isolate" ||
          s.position === "fixed" ||
          s.webkitOverflowScrolling === "touch"
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    }
  
    /**
     * Finds the nearest <dialog> from the passed element.
     *
     * @param {Element} el to search from
     * @return {HTMLDialogElement} dialog found
     */
    function findNearestDialog(el) {
      while (el) {
        if (el.localName === "dialog") {
          return /** @type {HTMLDialogElement} */ (el);
        }
        el = el.parentElement;
      }
      return null;
    }
  
    /**
     * Blur the specified element, as long as it's not the HTML body element.
     * This works around an IE9/10 bug - blurring the body causes Windows to
     * blur the whole application.
     *
     * @param {Element} el to blur
     */
    function safeBlur(el) {
      if (el && el.blur && el !== document.body) {
        el.blur();
      }
    }
  
    /**
     * @param {!NodeList} nodeList to search
     * @param {Node} node to find
     * @return {boolean} whether node is inside nodeList
     */
    function inNodeList(nodeList, node) {
      for (var i = 0; i < nodeList.length; ++i) {
        if (nodeList[i] === node) {
          return true;
        }
      }
      return false;
    }
  
    /**
     * @param {HTMLFormElement} el to check
     * @return {boolean} whether this form has method="dialog"
     */
    function isFormMethodDialog(el) {
      if (!el || !el.hasAttribute("method")) {
        return false;
      }
      return el.getAttribute("method").toLowerCase() === "dialog";
    }
  
    /**
     * @param {!HTMLDialogElement} dialog to upgrade
     * @constructor
     */
    function dialogPolyfillInfo(dialog) {
      this.dialog_ = dialog;
      this.replacedStyleTop_ = false;
      this.openAsModal_ = false;
  
      // Set a11y role. Browsers that support dialog implicitly know this already.
      if (!dialog.hasAttribute("role")) {
        dialog.setAttribute("role", "dialog");
      }
  
      dialog.show = this.show.bind(this);
      dialog.showModal = this.showModal.bind(this);
      dialog.close = this.close.bind(this);
  
      if (!("returnValue" in dialog)) {
        dialog.returnValue = "";
      }
  
      if ("MutationObserver" in window) {
        var mo = new MutationObserver(this.maybeHideModal.bind(this));
        mo.observe(dialog, { attributes: true, attributeFilter: ["open"] });
      } else {
        // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
        // seem to fire even if the element was removed as part of a parent removal. Use the removed
        // events to force downgrade (useful if removed/immediately added).
        var removed = false;
        var cb = function () {
          removed ? this.downgradeModal() : this.maybeHideModal();
          removed = false;
        }.bind(this);
        var timeout;
        var delayModel = function (ev) {
          if (ev.target !== dialog) {
            return;
          } // not for a child element
          var cand = "DOMNodeRemoved";
          removed |= ev.type.substr(0, cand.length) === cand;
          window.clearTimeout(timeout);
          timeout = window.setTimeout(cb, 0);
        };
        [
          "DOMAttrModified",
          "DOMNodeRemoved",
          "DOMNodeRemovedFromDocument",
        ].forEach(function (name) {
          dialog.addEventListener(name, delayModel);
        });
      }
      // Note that the DOM is observed inside DialogManager while any dialog
      // is being displayed as a modal, to catch modal removal from the DOM.
  
      Object.defineProperty(dialog, "open", {
        set: this.setOpen.bind(this),
        get: dialog.hasAttribute.bind(dialog, "open"),
      });
  
      this.backdrop_ = document.createElement("div");
      this.backdrop_.className = "backdrop";
      this.backdrop_.addEventListener("click", this.backdropClick_.bind(this));
    }
  
    dialogPolyfillInfo.prototype = {
      get dialog() {
        return this.dialog_;
      },
  
      /**
       * Maybe remove this dialog from the modal top layer. This is called when
       * a modal dialog may no longer be tenable, e.g., when the dialog is no
       * longer open or is no longer part of the DOM.
       */
      maybeHideModal: function () {
        if (
          this.dialog_.hasAttribute("open") &&
          document.body.contains(this.dialog_)
        ) {
          return;
        }
        this.downgradeModal();
      },
  
      /**
       * Remove this dialog from the modal top layer, leaving it as a non-modal.
       */
      downgradeModal: function () {
        if (!this.openAsModal_) {
          return;
        }
        this.openAsModal_ = false;
        this.dialog_.style.zIndex = "";
  
        // This won't match the native <dialog> exactly because if the user set top on a centered
        // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
        // possible to polyfill this perfectly.
        if (this.replacedStyleTop_) {
          this.dialog_.style.top = "";
          this.replacedStyleTop_ = false;
        }
  
        // Clear the backdrop and remove from the manager.
        this.backdrop_.parentNode &&
          this.backdrop_.parentNode.removeChild(this.backdrop_);
        dialogPolyfill.dm.removeDialog(this);
      },
  
      /**
       * @param {boolean} value whether to open or close this dialog
       */
      setOpen: function (value) {
        if (value) {
          this.dialog_.hasAttribute("open") ||
            this.dialog_.setAttribute("open", "");
        } else {
          this.dialog_.removeAttribute("open");
          this.maybeHideModal(); // nb. redundant with MutationObserver
        }
      },
  
      /**
       * Handles clicks on the fake .backdrop element, redirecting them as if
       * they were on the dialog itself.
       *
       * @param {!Event} e to redirect
       */
      backdropClick_: function (e) {
        if (!this.dialog_.hasAttribute("tabindex")) {
          // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
          // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
          // would not be needed - clicks would move the implicit cursor there.
          var fake = document.createElement("div");
          this.dialog_.insertBefore(fake, this.dialog_.firstChild);
          fake.tabIndex = -1;
          fake.focus();
          this.dialog_.removeChild(fake);
        } else {
          this.dialog_.focus();
        }
  
        var redirectedEvent = document.createEvent("MouseEvents");
        redirectedEvent.initMouseEvent(
          e.type,
          e.bubbles,
          e.cancelable,
          window,
          e.detail,
          e.screenX,
          e.screenY,
          e.clientX,
          e.clientY,
          e.ctrlKey,
          e.altKey,
          e.shiftKey,
          e.metaKey,
          e.button,
          e.relatedTarget
        );
        this.dialog_.dispatchEvent(redirectedEvent);
        e.stopPropagation();
      },
  
      /**
       * Focuses on the first focusable element within the dialog. This will always blur the current
       * focus, even if nothing within the dialog is found.
       */
      focus_: function () {
        // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
        var target = this.dialog_.querySelector("[autofocus]:not([disabled])");
        if (!target && this.dialog_.tabIndex >= 0) {
          target = this.dialog_;
        }
        if (!target) {
          // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
          // alternative involves stepping through and trying to focus everything.
          var opts = ["button", "input", "keygen", "select", "textarea"];
          var query = opts.map(function (el) {
            return el + ":not([disabled])";
          });
          // TODO(samthor): tabindex values that are not numeric are not focusable.
          query.push('[tabindex]:not([disabled]):not([tabindex=""])'); // tabindex != "", not disabled
          target = this.dialog_.querySelector(query.join(", "));
        }
        safeBlur(document.activeElement);
        target && target.focus();
      },
  
      /**
       * Sets the zIndex for the backdrop and dialog.
       *
       * @param {number} dialogZ
       * @param {number} backdropZ
       */
      updateZIndex: function (dialogZ, backdropZ) {
        if (dialogZ < backdropZ) {
          throw new Error("dialogZ should never be < backdropZ");
        }
        this.dialog_.style.zIndex = dialogZ;
        this.backdrop_.style.zIndex = backdropZ;
      },
  
      /**
       * Shows the dialog. If the dialog is already open, this does nothing.
       */
      show: function () {
        if (!this.dialog_.open) {
          this.setOpen(true);
          this.focus_();
        }
      },
  
      /**
       * Show this dialog modally.
       */
      showModal: function () {
        if (this.dialog_.hasAttribute("open")) {
          throw new Error(
            "Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally."
          );
        }
        if (!document.body.contains(this.dialog_)) {
          throw new Error(
            "Failed to execute 'showModal' on dialog: The element is not in a Document."
          );
        }
        if (!dialogPolyfill.dm.pushDialog(this)) {
          throw new Error(
            "Failed to execute 'showModal' on dialog: There are too many open modal dialogs."
          );
        }
  
        if (createsStackingContext(this.dialog_.parentElement)) {
          console.warn(
            "A dialog is being shown inside a stacking context. " +
              "This may cause it to be unusable. For more information, see this link: " +
              "https://github.com/GoogleChrome/dialog-polyfill/#stacking-context"
          );
        }
  
        this.setOpen(true);
        this.openAsModal_ = true;
  
        // Optionally center vertically, relative to the current viewport.
        if (dialogPolyfill.needsCentering(this.dialog_)) {
          dialogPolyfill.reposition(this.dialog_);
          this.replacedStyleTop_ = true;
        } else {
          this.replacedStyleTop_ = false;
        }
  
        // Insert backdrop.
        this.dialog_.parentNode.insertBefore(
          this.backdrop_,
          this.dialog_.nextSibling
        );
  
        // Focus on whatever inside the dialog.
        this.focus_();
      },
  
      /**
       * Closes this HTMLDialogElement. This is optional vs clearing the open
       * attribute, however this fires a 'close' event.
       *
       * @param {string=} opt_returnValue to use as the returnValue
       */
      close: function (opt_returnValue) {
        if (!this.dialog_.hasAttribute("open")) {
          throw new Error(
            "Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed."
          );
        }
        this.setOpen(false);
  
        // Leave returnValue untouched in case it was set directly on the element
        if (opt_returnValue !== undefined) {
          this.dialog_.returnValue = opt_returnValue;
        }
  
        // Triggering "close" event for any attached listeners on the <dialog>.
        var closeEvent = new supportCustomEvent("close", {
          bubbles: false,
          cancelable: false,
        });
  
        // If we have an onclose handler assigned and it's a function, call it
        if (this.dialog_.onclose instanceof Function) {
          this.dialog_.onclose(closeEvent);
        }
  
        // Dispatch the event as normal
        this.dialog_.dispatchEvent(closeEvent);
      },
    };
  
    var dialogPolyfill = {};
  
    dialogPolyfill.reposition = function (element) {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
      element.style.top = Math.max(scrollTop, topValue) + "px";
    };
  
    dialogPolyfill.isInlinePositionSetByStylesheet = function (element) {
      for (var i = 0; i < document.styleSheets.length; ++i) {
        var styleSheet = document.styleSheets[i];
        var cssRules = null;
        // Some browsers throw on cssRules.
        try {
          cssRules = styleSheet.cssRules;
        } catch (e) {}
        if (!cssRules) {
          continue;
        }
        for (var j = 0; j < cssRules.length; ++j) {
          var rule = cssRules[j];
          var selectedNodes = null;
          // Ignore errors on invalid selector texts.
          try {
            selectedNodes = document.querySelectorAll(rule.selectorText);
          } catch (e) {}
          if (!selectedNodes || !inNodeList(selectedNodes, element)) {
            continue;
          }
          var cssTop = rule.style.getPropertyValue("top");
          var cssBottom = rule.style.getPropertyValue("bottom");
          if (
            (cssTop && cssTop !== "auto") ||
            (cssBottom && cssBottom !== "auto")
          ) {
            return true;
          }
        }
      }
      return false;
    };
  
    dialogPolyfill.needsCentering = function (dialog) {
      var computedStyle = window.getComputedStyle(dialog);
      if (computedStyle.position !== "absolute") {
        return false;
      }
  
      // We must determine whether the top/bottom specified value is non-auto.  In
      // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
      // Firefox returns the used value. So we do this crazy thing instead: check
      // the inline style and then go through CSS rules.
      if (
        (dialog.style.top !== "auto" && dialog.style.top !== "") ||
        (dialog.style.bottom !== "auto" && dialog.style.bottom !== "")
      ) {
        return false;
      }
      return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
    };
  
    /**
     * @param {!Element} element to force upgrade
     */
    dialogPolyfill.forceRegisterDialog = function (element) {
      if (window.HTMLDialogElement || element.showModal) {
        console.warn(
          "This browser already supports <dialog>, the polyfill " +
            "may not work correctly",
          element
        );
      }
      if (element.localName !== "dialog") {
        throw new Error(
          "Failed to register dialog: The element is not a dialog."
        );
      }
      new dialogPolyfillInfo(/** @type {!HTMLDialogElement} */ (element));
    };
  
    /**
     * @param {!Element} element to upgrade, if necessary
     */
    dialogPolyfill.registerDialog = function (element) {
      if (!element.showModal) {
        dialogPolyfill.forceRegisterDialog(element);
      }
    };
  
    /**
     * @constructor
     */
    dialogPolyfill.DialogManager = function () {
      /** @type {!Array<!dialogPolyfillInfo>} */
      this.pendingDialogStack = [];
  
      var checkDOM = this.checkDOM_.bind(this);
  
      // The overlay is used to simulate how a modal dialog blocks the document.
      // The blocking dialog is positioned on top of the overlay, and the rest of
      // the dialogs on the pending dialog stack are positioned below it. In the
      // actual implementation, the modal dialog stacking is controlled by the
      // top layer, where z-index has no effect.
      this.overlay = document.createElement("div");
      this.overlay.className = "_dialog_overlay";
      this.overlay.addEventListener(
        "click",
        function (e) {
          this.forwardTab_ = undefined;
          e.stopPropagation();
          checkDOM([]); // sanity-check DOM
        }.bind(this)
      );
  
      this.handleKey_ = this.handleKey_.bind(this);
      this.handleFocus_ = this.handleFocus_.bind(this);
  
      this.zIndexLow_ = 100000;
      this.zIndexHigh_ = 100000 + 150;
  
      this.forwardTab_ = undefined;
  
      if ("MutationObserver" in window) {
        this.mo_ = new MutationObserver(function (records) {
          var removed = [];
          records.forEach(function (rec) {
            for (var i = 0, c; (c = rec.removedNodes[i]); ++i) {
              if (!(c instanceof Element)) {
                continue;
              } else if (c.localName === "dialog") {
                removed.push(c);
              }
              removed = removed.concat(c.querySelectorAll("dialog"));
            }
          });
          removed.length && checkDOM(removed);
        });
      }
    };
  
    /**
     * Called on the first modal dialog being shown. Adds the overlay and related
     * handlers.
     */
    dialogPolyfill.DialogManager.prototype.blockDocument = function () {
      document.documentElement.addEventListener("focus", this.handleFocus_, true);
      document.addEventListener("keydown", this.handleKey_);
      this.mo_ && this.mo_.observe(document, { childList: true, subtree: true });
    };
  
    /**
     * Called on the first modal dialog being removed, i.e., when no more modal
     * dialogs are visible.
     */
    dialogPolyfill.DialogManager.prototype.unblockDocument = function () {
      document.documentElement.removeEventListener(
        "focus",
        this.handleFocus_,
        true
      );
      document.removeEventListener("keydown", this.handleKey_);
      this.mo_ && this.mo_.disconnect();
    };
  
    /**
     * Updates the stacking of all known dialogs.
     */
    dialogPolyfill.DialogManager.prototype.updateStacking = function () {
      var zIndex = this.zIndexHigh_;
  
      for (var i = 0, dpi; (dpi = this.pendingDialogStack[i]); ++i) {
        dpi.updateZIndex(--zIndex, --zIndex);
        if (i === 0) {
          this.overlay.style.zIndex = --zIndex;
        }
      }
  
      // Make the overlay a sibling of the dialog itself.
      var last = this.pendingDialogStack[0];
      if (last) {
        var p = last.dialog.parentNode || document.body;
        p.appendChild(this.overlay);
      } else if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
    };
  
    /**
     * @param {Element} candidate to check if contained or is the top-most modal dialog
     * @return {boolean} whether candidate is contained in top dialog
     */
    dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function (
      candidate
    ) {
      while ((candidate = findNearestDialog(candidate))) {
        for (var i = 0, dpi; (dpi = this.pendingDialogStack[i]); ++i) {
          if (dpi.dialog === candidate) {
            return i === 0; // only valid if top-most
          }
        }
        candidate = candidate.parentElement;
      }
      return false;
    };
  
    dialogPolyfill.DialogManager.prototype.handleFocus_ = function (event) {
      if (this.containedByTopDialog_(event.target)) {
        return;
      }
  
      if (document.activeElement === document.documentElement) {
        return;
      }
  
      event.preventDefault();
      event.stopPropagation();
      safeBlur(/** @type {Element} */ (event.target));
  
      if (this.forwardTab_ === undefined) {
        return;
      } // move focus only from a tab key
  
      var dpi = this.pendingDialogStack[0];
      var dialog = dpi.dialog;
      var position = dialog.compareDocumentPosition(event.target);
      if (position & Node.DOCUMENT_POSITION_PRECEDING) {
        if (this.forwardTab_) {
          // forward
          dpi.focus_();
        } else if (event.target !== document.documentElement) {
          // backwards if we're not already focused on <html>
          document.documentElement.focus();
        }
      }
  
      return false;
    };
  
    dialogPolyfill.DialogManager.prototype.handleKey_ = function (event) {
      this.forwardTab_ = undefined;
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        var cancelEvent = new supportCustomEvent("cancel", {
          bubbles: false,
          cancelable: true,
        });
        var dpi = this.pendingDialogStack[0];
        if (dpi && dpi.dialog.dispatchEvent(cancelEvent)) {
          dpi.dialog.close();
        }
      } else if (event.keyCode === 9) {
        this.forwardTab_ = !event.shiftKey;
      }
    };
  
    /**
     * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
     * removed and immediately readded don't stay modal, they become normal.
     *
     * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
     */
    dialogPolyfill.DialogManager.prototype.checkDOM_ = function (removed) {
      // This operates on a clone because it may cause it to change. Each change also calls
      // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
      // at a time?!
      var clone = this.pendingDialogStack.slice();
      clone.forEach(function (dpi) {
        if (removed.indexOf(dpi.dialog) !== -1) {
          dpi.downgradeModal();
        } else {
          dpi.maybeHideModal();
        }
      });
    };
  
    /**
     * @param {!dialogPolyfillInfo} dpi
     * @return {boolean} whether the dialog was allowed
     */
    dialogPolyfill.DialogManager.prototype.pushDialog = function (dpi) {
      var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
      if (this.pendingDialogStack.length >= allowed) {
        return false;
      }
      if (this.pendingDialogStack.unshift(dpi) === 1) {
        this.blockDocument();
      }
      this.updateStacking();
      return true;
    };
  
    /**
     * @param {!dialogPolyfillInfo} dpi
     */
    dialogPolyfill.DialogManager.prototype.removeDialog = function (dpi) {
      var index = this.pendingDialogStack.indexOf(dpi);
      if (index === -1) {
        return;
      }
  
      this.pendingDialogStack.splice(index, 1);
      if (this.pendingDialogStack.length === 0) {
        this.unblockDocument();
      }
      this.updateStacking();
    };
  
    dialogPolyfill.dm = new dialogPolyfill.DialogManager();
    dialogPolyfill.formSubmitter = null;
    dialogPolyfill.useValue = null;
  
    /**
     * Installs global handlers, such as click listers and native method overrides. These are needed
     * even if a no dialog is registered, as they deal with <form method="dialog">.
     */
    if (window.HTMLDialogElement === undefined) {
      /**
       * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
       * one that returns the correct value.
       */
      var testForm = document.createElement("form");
      testForm.setAttribute("method", "dialog");
      if (testForm.method !== "dialog") {
        var methodDescriptor = Object.getOwnPropertyDescriptor(
          HTMLFormElement.prototype,
          "method"
        );
        if (methodDescriptor) {
          // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
          // and don't bother to update the element.
          var realGet = methodDescriptor.get;
          methodDescriptor.get = function () {
            if (isFormMethodDialog(this)) {
              return "dialog";
            }
            return realGet.call(this);
          };
          var realSet = methodDescriptor.set;
          methodDescriptor.set = function (v) {
            if (typeof v === "string" && v.toLowerCase() === "dialog") {
              return this.setAttribute("method", v);
            }
            return realSet.call(this, v);
          };
          Object.defineProperty(
            HTMLFormElement.prototype,
            "method",
            methodDescriptor
          );
        }
      }
  
      /**
       * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
       * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
       * document.activeElement.
       */
      document.addEventListener(
        "click",
        function (ev) {
          dialogPolyfill.formSubmitter = null;
          dialogPolyfill.useValue = null;
          if (ev.defaultPrevented) {
            return;
          } // e.g. a submit which prevents default submission
  
          var target = /** @type {Element} */ (ev.target);
          if (!target || !isFormMethodDialog(target.form)) {
            return;
          }
  
          var valid =
            target.type === "submit" &&
            ["button", "input"].indexOf(target.localName) > -1;
          if (!valid) {
            if (!(target.localName === "input" && target.type === "image")) {
              return;
            }
            // this is a <input type="image">, which can submit forms
            dialogPolyfill.useValue = ev.offsetX + "," + ev.offsetY;
          }
  
          var dialog = findNearestDialog(target);
          if (!dialog) {
            return;
          }
  
          dialogPolyfill.formSubmitter = target;
        },
        false
      );
  
      /**
       * Replace the native HTMLFormElement.submit() method, as it won't fire the
       * submit event and give us a chance to respond.
       */
      var nativeFormSubmit = HTMLFormElement.prototype.submit;
      var replacementFormSubmit = function () {
        if (!isFormMethodDialog(this)) {
          return nativeFormSubmit.call(this);
        }
        var dialog = findNearestDialog(this);
        dialog && dialog.close();
      };
      HTMLFormElement.prototype.submit = replacementFormSubmit;
  
      /**
       * Global form 'dialog' method handler. Closes a dialog correctly on submit
       * and possibly sets its return value.
       */
      document.addEventListener(
        "submit",
        function (ev) {
          if (ev.defaultPrevented) {
            return;
          } // e.g. a submit which prevents default submission
  
          var form = /** @type {HTMLFormElement} */ (ev.target);
          if (!isFormMethodDialog(form)) {
            return;
          }
          ev.preventDefault();
  
          var dialog = findNearestDialog(form);
          if (!dialog) {
            return;
          }
  
          // Forms can only be submitted via .submit() or a click (?), but anyway: sanity-check that
          // the submitter is correct before using its value as .returnValue.
          var s = dialogPolyfill.formSubmitter;
          if (s && s.form === form) {
            dialog.close(dialogPolyfill.useValue || s.value);
          } else {
            dialog.close();
          }
          dialogPolyfill.formSubmitter = null;
        },
        false
      );
    }
  
    return dialogPolyfill;
  });
  
  function makeModal(modal) {
    if (typeof HTMLDialogElement !== "function") {
      // doesn't support modal element so use polyfill
      dialogPolyfill.registerDialog(modal);
    }
    modal
      .querySelector(".gg-c-modal__close-button")
      .addEventListener("click", function () {
        modal.close();
      });
    modal.addEventListener("close", function () {
      document.body.style.overflow = "";
    });
  
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.close();
      }
    });
  }
  
  const buttonToShowModal = document.querySelector('[data-target="showModal"]');
  
  function showModal(modal) {
    makeModal(modal);
    document.body.style.overflow = "hidden";
    modal.showModal();
  }
  
  document.querySelectorAll("[data-modal]").forEach(function (n) {
    n.addEventListener("click", function () {
      showModal(document.querySelector(`dialog#${n.getAttribute("data-modal")}`));
    });
  });

  /* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=bash+batch&plugins=line-numbers */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var c=/\blang(?:uage)?-([\w-]+)\b/i,n=0,C={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof _?new _(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n,l=C.util.type(e);switch(r=r||{},l){case"Object":if(n=C.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=C.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r)}),a);default:return e}},getLanguage:function(e){for(;e&&!c.test(e.className);)e=e.parentElement;return e?(e.className.match(c)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}}},languages:{extend:function(e,n){var t=C.util.clone(C.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||C.languages)[t],l={};for(var i in a)if(a.hasOwnProperty(i)){if(i==e)for(var o in n)n.hasOwnProperty(o)&&(l[o]=n[o]);n.hasOwnProperty(i)||(l[i]=a[i])}var s=r[t];return r[t]=l,C.languages.DFS(C.languages,function(e,n){n===s&&e!=t&&(this[e]=l)}),l},DFS:function e(n,t,r,a){a=a||{};var l=C.util.objId;for(var i in n)if(n.hasOwnProperty(i)){t.call(n,i,n[i],r||i);var o=n[i],s=C.util.type(o);"Object"!==s||a[l(o)]?"Array"!==s||a[l(o)]||(a[l(o)]=!0,e(o,t,i,a)):(a[l(o)]=!0,e(o,t,null,a))}}},plugins:{},highlightAll:function(e,n){C.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};C.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),C.hooks.run("before-all-elements-highlight",r);for(var a,l=0;a=r.elements[l++];)C.highlightElement(a,!0===n,r.callback)},highlightElement:function(e,n,t){var r=C.util.getLanguage(e),a=C.languages[r];e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+r;var l=e.parentNode;l&&"pre"===l.nodeName.toLowerCase()&&(l.className=l.className.replace(c,"").replace(/\s+/g," ")+" language-"+r);var i={element:e,language:r,grammar:a,code:e.textContent};function o(e){i.highlightedCode=e,C.hooks.run("before-insert",i),i.element.innerHTML=i.highlightedCode,C.hooks.run("after-highlight",i),C.hooks.run("complete",i),t&&t.call(i.element)}if(C.hooks.run("before-sanity-check",i),!i.code)return C.hooks.run("complete",i),void(t&&t.call(i.element));if(C.hooks.run("before-highlight",i),i.grammar)if(n&&u.Worker){var s=new Worker(C.filename);s.onmessage=function(e){o(e.data)},s.postMessage(JSON.stringify({language:i.language,code:i.code,immediateClose:!0}))}else o(C.highlight(i.code,i.grammar,i.language));else o(C.util.encode(i.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};return C.hooks.run("before-tokenize",r),r.tokens=C.tokenize(r.code,r.grammar),C.hooks.run("after-tokenize",r),_.stringify(C.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new l;return M(a,a.head,e),function e(n,t,r,a,l,i,o){for(var s in r)if(r.hasOwnProperty(s)&&r[s]){var u=r[s];u=Array.isArray(u)?u:[u];for(var c=0;c<u.length;++c){if(o&&o==s+","+c)return;var g=u[c],f=g.inside,h=!!g.lookbehind,d=!!g.greedy,v=0,p=g.alias;if(d&&!g.pattern.global){var m=g.pattern.toString().match(/[imsuy]*$/)[0];g.pattern=RegExp(g.pattern.source,m+"g")}g=g.pattern||g;for(var y=a.next,k=l;y!==t.tail;k+=y.value.length,y=y.next){var b=y.value;if(t.length>n.length)return;if(!(b instanceof _)){var x=1;if(d&&y!=t.tail.prev){g.lastIndex=k;var w=g.exec(n);if(!w)break;var A=w.index+(h&&w[1]?w[1].length:0),P=w.index+w[0].length,S=k;for(S+=y.value.length;S<=A;)y=y.next,S+=y.value.length;if(S-=y.value.length,k=S,y.value instanceof _)continue;for(var O=y;O!==t.tail&&(S<P||"string"==typeof O.value&&!O.prev.value.greedy);O=O.next)x++,S+=O.value.length;x--,b=n.slice(k,S),w.index-=k}else{g.lastIndex=0;var w=g.exec(b)}if(w){h&&(v=w[1]?w[1].length:0);var A=w.index+v,w=w[0].slice(v),P=A+w.length,E=b.slice(0,A),N=b.slice(P),j=y.prev;E&&(j=M(t,j,E),k+=E.length),W(t,j,x);var L=new _(s,f?C.tokenize(w,f):w,p,w,d);if(y=M(t,j,L),N&&M(t,y,N),1<x&&e(n,t,r,y.prev,k,!0,s+","+c),i)break}else if(i)break}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=C.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=C.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n)}},Token:_};function _(e,n,t,r,a){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length,this.greedy=!!a}function l(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function M(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function W(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a}if(u.Prism=C,_.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t)}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},l=e.alias;l&&(Array.isArray(l)?Array.prototype.push.apply(a.classes,l):a.classes.push(l)),C.hooks.run("wrap",a);var i="";for(var o in a.attributes)i+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+i+">"+a.content+"</"+a.tag+">"},!u.document)return u.addEventListener&&(C.disableWorkerMessageHandler||u.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;u.postMessage(C.highlight(r,C.languages[t],t)),a&&u.close()},!1)),C;var e=C.util.currentScript();function t(){C.manual||C.highlightAll()}if(e&&(C.filename=e.src,e.hasAttribute("data-manual")&&(C.manual=!0)),!C.manual){var r=document.readyState;"loading"===r||"interactive"===r&&e&&e.defer?document.addEventListener("DOMContentLoaded",t):window.requestAnimationFrame?window.requestAnimationFrame(t):window.setTimeout(t,16)}return C}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
!function(e){var t="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",n={environment:{pattern:RegExp("\\$"+t),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+t),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/};e.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b\w+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+t),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:n},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,lookbehind:!0,greedy:!0,inside:n}],environment:{pattern:RegExp("\\$?"+t),alias:"constant"},variable:n.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}};for(var a=["comment","function-name","for-or-select","assign-left","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],r=n.variable[1].inside,s=0;s<a.length;s++)r[a[s]]=e.languages.bash[a[s]];e.languages.shell=e.languages.bash}(Prism);
!function(e){var r=/%%?[~:\w]+%?|!\S+!/,t={pattern:/\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,alias:"attr-name",inside:{punctuation:/:/}},n=/"[^"]*"/,i=/(?:\b|-)\d+\b/;Prism.languages.batch={comment:[/^::.*/m,{pattern:/((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,lookbehind:!0}],label:{pattern:/^:.*/m,alias:"property"},command:[{pattern:/((?:^|[&(])[ \t]*)for(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* \S+ in \([^)]+\) do/im,lookbehind:!0,inside:{keyword:/^for\b|\b(?:in|do)\b/i,string:n,parameter:t,variable:r,number:i,punctuation:/[()',]/}},{pattern:/((?:^|[&(])[ \t]*)if(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|\S+)?(?:==| (?:equ|neq|lss|leq|gtr|geq) )(?:"[^"]*"|\S+))/im,lookbehind:!0,inside:{keyword:/^if\b|\b(?:not|cmdextversion|defined|errorlevel|exist)\b/i,string:n,parameter:t,variable:r,number:i,operator:/\^|==|\b(?:equ|neq|lss|leq|gtr|geq)\b/i}},{pattern:/((?:^|[&()])[ \t]*)else\b/im,lookbehind:!0,inside:{keyword:/^else\b/i}},{pattern:/((?:^|[&(])[ \t]*)set(?: ?\/[a-z](?:[ :](?:"[^"]*"|\S+))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,lookbehind:!0,inside:{keyword:/^set\b/i,string:n,parameter:t,variable:[r,/\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],number:i,operator:/[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,punctuation:/[()',]/}},{pattern:/((?:^|[&(])[ \t]*@?)\w+\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,lookbehind:!0,inside:{keyword:/^\w+\b/i,string:n,parameter:t,label:{pattern:/(^\s*):\S+/m,lookbehind:!0,alias:"property"},variable:r,number:i,operator:/\^/}}],operator:/[&@]/,punctuation:/[()']/}}();
!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var l="line-numbers",c=/\n(?!$)/g,m=function(e){var t=a(e)["white-space"];if("pre-wrap"===t||"pre-line"===t){var n=e.querySelector("code"),r=e.querySelector(".line-numbers-rows");if(!n||!r)return;var s=e.querySelector(".line-numbers-sizer"),i=n.textContent.split(c);s||((s=document.createElement("span")).className="line-numbers-sizer",n.appendChild(s)),s.style.display="block",i.forEach(function(e,t){s.textContent=e||"\n";var n=s.getBoundingClientRect().height;r.children[t].style.height=n+"px"}),s.textContent="",s.style.display="none"}},a=function(e){return e?window.getComputedStyle?getComputedStyle(e):e.currentStyle||null:null};window.addEventListener("resize",function(){Array.prototype.forEach.call(document.querySelectorAll("pre."+l),m)}),Prism.hooks.add("complete",function(e){if(e.code){var t=e.element,n=t.parentNode;if(n&&/pre/i.test(n.nodeName)&&!t.querySelector(".line-numbers-rows")){for(var r=!1,s=/(?:^|\s)line-numbers(?:\s|$)/,i=t;i;i=i.parentNode)if(s.test(i.className)){r=!0;break}if(r){t.className=t.className.replace(s," "),s.test(n.className)||(n.className+=" line-numbers");var l,a=e.code.match(c),o=a?a.length+1:1,u=new Array(o+1).join("<span></span>");(l=document.createElement("span")).setAttribute("aria-hidden","true"),l.className="line-numbers-rows",l.innerHTML=u,n.hasAttribute("data-start")&&(n.style.counterReset="linenumber "+(parseInt(n.getAttribute("data-start"),10)-1)),e.element.appendChild(l),m(n),Prism.hooks.run("line-numbers",e)}}}}),Prism.hooks.add("line-numbers",function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0}),Prism.plugins.lineNumbers={getLine:function(e,t){if("PRE"===e.tagName&&e.classList.contains(l)){var n=e.querySelector(".line-numbers-rows"),r=parseInt(e.getAttribute("data-start"),10)||1,s=r+(n.children.length-1);t<r&&(t=r),s<t&&(t=s);var i=t-r;return n.children[i]}},resize:function(e){m(e)}}}}();

let chosenVersion = null;

document
  .getElementById("version--color-os")
  .addEventListener("input", function () {
    chosenVersion = 9;
    document.body.setAttribute("data-version", "9");
    UpdateVersionInfoMessages();
  });

document
  .getElementById("version--realme-ui")
  .addEventListener("input", function () {
    chosenVersion = 10;
    document.body.setAttribute("data-version", "10");
    UpdateVersionInfoMessages();
  });

function UpdateVersionInfoMessages() {
  document.querySelectorAll(".version-info").forEach(function (n) {
    n.querySelector(
      ".version-info__title"
    ).innerHTML = `You're running Android ${chosenVersion} (${
      chosenVersion === 9 ? "ColorOS 6" : "realme UI 1.0"
    })`;
  });
}

// --------------------------------------------------------------

document
  .getElementById("windows-platform-tools")
  .addEventListener("click", function () {
    window.open(
      "https://dl.google.com/android/repository/platform-tools-latest-windows.zip"
    );
  });

document
  .getElementById("mac-platform-tools")
  .addEventListener("click", function () {
    window.open(
      "https://dl.google.com/android/repository/platform-tools-latest-darwin.zip"
    );
  });

document
  .getElementById("linux-platform-tools")
  .addEventListener("click", function () {
    window.open(
      "https://dl.google.com/android/repository/platform-tools-latest-linux.zip"
    );
  });

function randomiseDownloadLink(linkArray) {
  const index = Math.floor(Math.random() * linkArray.length);

  return linkArray[index];
}

// ColorOS China A.15
document.querySelectorAll(".ozip-download--coloros__cn").forEach((link) => {
  link.setAttribute(
    "href",
    randomiseDownloadLink([
      "https://mega.nz/file/6MQSVaoI#uM-PVn1r570URXfGuJ73HGaWyLDVj9g-w7W7bcSfx4I",
      "https://drive.google.com/file/d/1R7PlVbnmzUwclQR9-XM9McbuYWyMIdva/view?usp=sharing",
    ])
  );
});

// ColorOS Global A.10
document.querySelectorAll(".ozip-download--coloros__global").forEach((link) => {
  link.setAttribute(
    "href",
    randomiseDownloadLink([
      "https://mega.nz/file/ORRWWSTL#McNOMXRBS8T3wiUuTaiwxFm4jKHfVa6_vgCE8rzDr-w",
      "https://drive.google.com/file/d/1qWv1UsrVocCgMqvK2EbqMO11u34Rve7W/view?usp=sharing",
    ])
  );
});

// realmeme UI China C.25
document.querySelectorAll(".ozip-download--realmemeui__cn").forEach((link) => {
  link.setAttribute(
    "href",
    randomiseDownloadLink([
      "https://mega.nz/file/aFR2QAaB#TvFkHoraHrxXdIxSEvaZwpZTpLjimV2oC0bTsAq-9II",
      "https://drive.google.com/file/d/1iZG1QP9ix_av9vTD5GgjCgeSywTN9tWb/view?usp=sharing",
    ])
  );
});

// realmeme UI Global C.27
document
  .querySelectorAll(".ozip-download--realmemeui__global")
  .forEach((link) => {
    link.setAttribute(
      "href",
      randomiseDownloadLink([
        "https://mega.nz/file/CAB2SYLQ#Q_EXGe1apsUkYLPy_FzVumlI1x6hDPDweAOHHT_LO6U",
        "https://drive.google.com/file/d/1S8WcOvgnLzTxgu6UZ0h2cJyKoQ6s0X7Z/view?usp=sharing",
      ])
    );
  });

function ToggleNav() {
  const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  const enableBodyScroll = bodyScrollLock.enableBodyScroll;

  const nav = document.getElementById("contents");

  if (nav.classList.contains("in")) {
    nav.classList.remove("in");
    nav.classList.add("out");
    enableBodyScroll(nav);
  } else {
    nav.classList.remove("out");
    nav.classList.add("in");
    disableBodyScroll(nav);
  }
}

document.getElementById("toggle-contents").addEventListener("click", ToggleNav);

document
  .querySelectorAll("#contents li a")
  .forEach((heading) => heading.addEventListener("click", ToggleNav));
