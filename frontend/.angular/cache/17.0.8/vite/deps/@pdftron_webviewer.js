import {
  __commonJS
} from "./chunk-OXCW2X5T.js";

// node_modules/@pdftron/webviewer/webviewer.min.js
var require_webviewer_min = __commonJS({
  "node_modules/@pdftron/webviewer/webviewer.min.js"(exports, module) {
    !function(e, t) {
      if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
      else if ("function" == typeof define && define.amd)
        define([], t);
      else {
        var n = t();
        for (var o in n)
          ("object" == typeof exports ? exports : e)[o] = n[o];
      }
    }(window, function() {
      return function(e) {
        var t = {};
        function n(o) {
          if (t[o])
            return t[o].exports;
          var i = t[o] = { i: o, l: false, exports: {} };
          return e[o].call(i.exports, i, i.exports, n), i.l = true, i.exports;
        }
        return n.m = e, n.c = t, n.d = function(e2, t2, o) {
          n.o(e2, t2) || Object.defineProperty(e2, t2, { enumerable: true, get: o });
        }, n.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, n.t = function(e2, t2) {
          if (1 & t2 && (e2 = n(e2)), 8 & t2)
            return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule)
            return e2;
          var o = /* @__PURE__ */ Object.create(null);
          if (n.r(o), Object.defineProperty(o, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2)
            for (var i in e2)
              n.d(o, i, (function(t3) {
                return e2[t3];
              }).bind(null, i));
          return o;
        }, n.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return n.d(t2, "a", t2), t2;
        }, n.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, n.p = "/", n(n.s = 1);
      }([function(e, t) {
        var n;
        n = function() {
          return this;
        }();
        try {
          n = n || new Function("return this")();
        } catch (e2) {
          "object" == typeof window && (n = window);
        }
        e.exports = n;
      }, function(e, t, n) {
        n(2), e.exports = n(6);
      }, function(e, t, n) {
        (function(o, i) {
          var r, a;
          function s(e2) {
            return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
              return typeof e3;
            } : function(e3) {
              return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
            })(e2);
          }
          !function(o2, i2) {
            "object" == s(t) && void 0 !== e ? i2() : void 0 === (a = "function" == typeof (r = i2) ? r.call(t, n, t, e) : r) || (e.exports = a);
          }(0, function() {
            "use strict";
            function e2(e3) {
              var t3 = this.constructor;
              return this.then(function(n3) {
                return t3.resolve(e3()).then(function() {
                  return n3;
                });
              }, function(n3) {
                return t3.resolve(e3()).then(function() {
                  return t3.reject(n3);
                });
              });
            }
            function t2() {
            }
            function n2(e3) {
              if (!(this instanceof n2))
                throw new TypeError("Promises must be constructed via new");
              if ("function" != typeof e3)
                throw new TypeError("not a function");
              this._state = 0, this._handled = false, this._value = void 0, this._deferreds = [], u(e3, this);
            }
            function r2(e3, t3) {
              for (; 3 === e3._state; )
                e3 = e3._value;
              0 !== e3._state ? (e3._handled = true, n2._immediateFn(function() {
                var n3 = 1 === e3._state ? t3.onFulfilled : t3.onRejected;
                if (null !== n3) {
                  var o2;
                  try {
                    o2 = n3(e3._value);
                  } catch (e4) {
                    return void c(t3.promise, e4);
                  }
                  a2(t3.promise, o2);
                } else
                  (1 === e3._state ? a2 : c)(t3.promise, e3._value);
              })) : e3._deferreds.push(t3);
            }
            function a2(e3, t3) {
              try {
                if (t3 === e3)
                  throw new TypeError("A promise cannot be resolved with itself.");
                if (t3 && ("object" == s(t3) || "function" == typeof t3)) {
                  var o2 = t3.then;
                  if (t3 instanceof n2)
                    return e3._state = 3, e3._value = t3, void l(e3);
                  if ("function" == typeof o2)
                    return void u(function(e4, t4) {
                      return function() {
                        e4.apply(t4, arguments);
                      };
                    }(o2, t3), e3);
                }
                e3._state = 1, e3._value = t3, l(e3);
              } catch (t4) {
                c(e3, t4);
              }
            }
            function c(e3, t3) {
              e3._state = 2, e3._value = t3, l(e3);
            }
            function l(e3) {
              2 === e3._state && 0 === e3._deferreds.length && n2._immediateFn(function() {
                e3._handled || n2._unhandledRejectionFn(e3._value);
              });
              for (var t3 = 0, o2 = e3._deferreds.length; o2 > t3; t3++)
                r2(e3, e3._deferreds[t3]);
              e3._deferreds = null;
            }
            function u(e3, t3) {
              var n3 = false;
              try {
                e3(function(e4) {
                  n3 || (n3 = true, a2(t3, e4));
                }, function(e4) {
                  n3 || (n3 = true, c(t3, e4));
                });
              } catch (e4) {
                if (n3)
                  return;
                n3 = true, c(t3, e4);
              }
            }
            var d = setTimeout;
            n2.prototype.catch = function(e3) {
              return this.then(null, e3);
            }, n2.prototype.then = function(e3, n3) {
              var o2 = new this.constructor(t2);
              return r2(this, new function(e4, t3, n4) {
                this.onFulfilled = "function" == typeof e4 ? e4 : null, this.onRejected = "function" == typeof t3 ? t3 : null, this.promise = n4;
              }(e3, n3, o2)), o2;
            }, n2.prototype.finally = e2, n2.all = function(e3) {
              return new n2(function(t3, n3) {
                function o2(e4, a4) {
                  try {
                    if (a4 && ("object" == s(a4) || "function" == typeof a4)) {
                      var c2 = a4.then;
                      if ("function" == typeof c2)
                        return void c2.call(a4, function(t4) {
                          o2(e4, t4);
                        }, n3);
                    }
                    i2[e4] = a4, 0 == --r3 && t3(i2);
                  } catch (e5) {
                    n3(e5);
                  }
                }
                if (!e3 || void 0 === e3.length)
                  throw new TypeError("Promise.all accepts an array");
                var i2 = Array.prototype.slice.call(e3);
                if (0 === i2.length)
                  return t3([]);
                for (var r3 = i2.length, a3 = 0; i2.length > a3; a3++)
                  o2(a3, i2[a3]);
              });
            }, n2.resolve = function(e3) {
              return e3 && "object" == s(e3) && e3.constructor === n2 ? e3 : new n2(function(t3) {
                t3(e3);
              });
            }, n2.reject = function(e3) {
              return new n2(function(t3, n3) {
                n3(e3);
              });
            }, n2.race = function(e3) {
              return new n2(function(t3, n3) {
                for (var o2 = 0, i2 = e3.length; i2 > o2; o2++)
                  e3[o2].then(t3, n3);
              });
            }, n2._immediateFn = "function" == typeof o && function(e3) {
              o(e3);
            } || function(e3) {
              d(e3, 0);
            }, n2._unhandledRejectionFn = function(e3) {
              void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e3);
            };
            var f = function() {
              if ("undefined" != typeof self)
                return self;
              if ("undefined" != typeof window)
                return window;
              if (void 0 !== i)
                return i;
              throw Error("unable to locate global object");
            }();
            "Promise" in f ? f.Promise.prototype.finally || (f.Promise.prototype.finally = e2) : f.Promise = n2;
          });
        }).call(this, n(3).setImmediate, n(0));
      }, function(e, t, n) {
        (function(e2) {
          var o = void 0 !== e2 && e2 || "undefined" != typeof self && self || window, i = Function.prototype.apply;
          function r(e3, t2) {
            this._id = e3, this._clearFn = t2;
          }
          t.setTimeout = function() {
            return new r(i.call(setTimeout, o, arguments), clearTimeout);
          }, t.setInterval = function() {
            return new r(i.call(setInterval, o, arguments), clearInterval);
          }, t.clearTimeout = t.clearInterval = function(e3) {
            e3 && e3.close();
          }, r.prototype.unref = r.prototype.ref = function() {
          }, r.prototype.close = function() {
            this._clearFn.call(o, this._id);
          }, t.enroll = function(e3, t2) {
            clearTimeout(e3._idleTimeoutId), e3._idleTimeout = t2;
          }, t.unenroll = function(e3) {
            clearTimeout(e3._idleTimeoutId), e3._idleTimeout = -1;
          }, t._unrefActive = t.active = function(e3) {
            clearTimeout(e3._idleTimeoutId);
            var t2 = e3._idleTimeout;
            t2 >= 0 && (e3._idleTimeoutId = setTimeout(function() {
              e3._onTimeout && e3._onTimeout();
            }, t2));
          }, n(4), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e2 && e2.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e2 && e2.clearImmediate || this && this.clearImmediate;
        }).call(this, n(0));
      }, function(e, t, n) {
        (function(e2, t2) {
          !function(e3, n2) {
            "use strict";
            if (!e3.setImmediate) {
              var o, i, r, a, s, c = 1, l = {}, u = false, d = e3.document, f = Object.getPrototypeOf && Object.getPrototypeOf(e3);
              f = f && f.setTimeout ? f : e3, "[object process]" === {}.toString.call(e3.process) ? o = function(e4) {
                t2.nextTick(function() {
                  m(e4);
                });
              } : !function() {
                if (e3.postMessage && !e3.importScripts) {
                  var t3 = true, n3 = e3.onmessage;
                  return e3.onmessage = function() {
                    t3 = false;
                  }, e3.postMessage("", "*"), e3.onmessage = n3, t3;
                }
              }() ? e3.MessageChannel ? ((r = new MessageChannel()).port1.onmessage = function(e4) {
                m(e4.data);
              }, o = function(e4) {
                r.port2.postMessage(e4);
              }) : d && "onreadystatechange" in d.createElement("script") ? (i = d.documentElement, o = function(e4) {
                var t3 = d.createElement("script");
                t3.onreadystatechange = function() {
                  m(e4), t3.onreadystatechange = null, i.removeChild(t3), t3 = null;
                }, i.appendChild(t3);
              }) : o = function(e4) {
                setTimeout(m, 0, e4);
              } : (a = "setImmediate$" + Math.random() + "$", s = function(t3) {
                t3.source === e3 && "string" == typeof t3.data && 0 === t3.data.indexOf(a) && m(+t3.data.slice(a.length));
              }, e3.addEventListener ? e3.addEventListener("message", s, false) : e3.attachEvent("onmessage", s), o = function(t3) {
                e3.postMessage(a + t3, "*");
              }), f.setImmediate = function(e4) {
                "function" != typeof e4 && (e4 = new Function("" + e4));
                for (var t3 = new Array(arguments.length - 1), n3 = 0; n3 < t3.length; n3++)
                  t3[n3] = arguments[n3 + 1];
                var i2 = { callback: e4, args: t3 };
                return l[c] = i2, o(c), c++;
              }, f.clearImmediate = p;
            }
            function p(e4) {
              delete l[e4];
            }
            function m(e4) {
              if (u)
                setTimeout(m, 0, e4);
              else {
                var t3 = l[e4];
                if (t3) {
                  u = true;
                  try {
                    !function(e5) {
                      var t4 = e5.callback, n3 = e5.args;
                      switch (n3.length) {
                        case 0:
                          t4();
                          break;
                        case 1:
                          t4(n3[0]);
                          break;
                        case 2:
                          t4(n3[0], n3[1]);
                          break;
                        case 3:
                          t4(n3[0], n3[1], n3[2]);
                          break;
                        default:
                          t4.apply(void 0, n3);
                      }
                    }(t3);
                  } finally {
                    p(e4), u = false;
                  }
                }
              }
            }
          }("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
        }).call(this, n(0), n(5));
      }, function(e, t) {
        var n, o, i = e.exports = {};
        function r() {
          throw new Error("setTimeout has not been defined");
        }
        function a() {
          throw new Error("clearTimeout has not been defined");
        }
        function s(e2) {
          if (n === setTimeout)
            return setTimeout(e2, 0);
          if ((n === r || !n) && setTimeout)
            return n = setTimeout, setTimeout(e2, 0);
          try {
            return n(e2, 0);
          } catch (t2) {
            try {
              return n.call(null, e2, 0);
            } catch (t3) {
              return n.call(this, e2, 0);
            }
          }
        }
        !function() {
          try {
            n = "function" == typeof setTimeout ? setTimeout : r;
          } catch (e2) {
            n = r;
          }
          try {
            o = "function" == typeof clearTimeout ? clearTimeout : a;
          } catch (e2) {
            o = a;
          }
        }();
        var c, l = [], u = false, d = -1;
        function f() {
          u && c && (u = false, c.length ? l = c.concat(l) : d = -1, l.length && p());
        }
        function p() {
          if (!u) {
            var e2 = s(f);
            u = true;
            for (var t2 = l.length; t2; ) {
              for (c = l, l = []; ++d < t2; )
                c && c[d].run();
              d = -1, t2 = l.length;
            }
            c = null, u = false, function(e3) {
              if (o === clearTimeout)
                return clearTimeout(e3);
              if ((o === a || !o) && clearTimeout)
                return o = clearTimeout, clearTimeout(e3);
              try {
                o(e3);
              } catch (t3) {
                try {
                  return o.call(null, e3);
                } catch (t4) {
                  return o.call(this, e3);
                }
              }
            }(e2);
          }
        }
        function m(e2, t2) {
          this.fun = e2, this.array = t2;
        }
        function h() {
        }
        i.nextTick = function(e2) {
          var t2 = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var n2 = 1; n2 < arguments.length; n2++)
              t2[n2 - 1] = arguments[n2];
          l.push(new m(e2, t2)), 1 !== l.length || u || s(p);
        }, m.prototype.run = function() {
          this.fun.apply(null, this.array);
        }, i.title = "browser", i.browser = true, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.prependListener = h, i.prependOnceListener = h, i.listeners = function(e2) {
          return [];
        }, i.binding = function(e2) {
          throw new Error("process.binding is not supported");
        }, i.cwd = function() {
          return "/";
        }, i.chdir = function(e2) {
          throw new Error("process.chdir is not supported");
        }, i.umask = function() {
          return 0;
        };
      }, function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getInstance", function() {
          return M;
        });
        var o = { ASM: "asm", WASM: "ems", JS_WORKER: "jsworker", THREADED_WASM: "wasm-threads" };
        function i(e2, t2) {
          if ("string" != typeof e2 || !t2)
            return e2;
          var n2 = t2.substr(0, t2.lastIndexOf("/"));
          return /^(\/|%2F|[a-z0-9-]+:)/i.test(e2) ? e2 : n2 + "/" + e2;
        }
        function r(e2) {
          return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function a(e2, t2) {
          if (!(e2 instanceof t2))
            throw new TypeError("Cannot call a class as a function");
        }
        function s(e2, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2];
            o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(e2, (i2 = o2.key, a2 = void 0, a2 = function(e3, t3) {
              if ("object" !== r(e3) || null === e3)
                return e3;
              var n3 = e3[Symbol.toPrimitive];
              if (void 0 !== n3) {
                var o3 = n3.call(e3, t3 || "default");
                if ("object" !== r(o3))
                  return o3;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === t3 ? String : Number)(e3);
            }(i2, "string"), "symbol" === r(a2) ? a2 : String(a2)), o2);
          }
          var i2, a2;
        }
        function c(e2, t2) {
          if (t2 && ("object" === r(t2) || "function" == typeof t2))
            return t2;
          if (void 0 !== t2)
            throw new TypeError("Derived constructors may only return object or undefined");
          return function(e3) {
            if (void 0 === e3)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e3;
          }(e2);
        }
        function l(e2) {
          var t2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return (l = function(e3) {
            if (null === e3 || (n2 = e3, -1 === Function.toString.call(n2).indexOf("[native code]")))
              return e3;
            var n2;
            if ("function" != typeof e3)
              throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t2) {
              if (t2.has(e3))
                return t2.get(e3);
              t2.set(e3, o2);
            }
            function o2() {
              return u(e3, arguments, p(this).constructor);
            }
            return o2.prototype = Object.create(e3.prototype, { constructor: { value: o2, enumerable: false, writable: true, configurable: true } }), f(o2, e3);
          })(e2);
        }
        function u(e2, t2, n2) {
          return (u = d() ? Reflect.construct.bind() : function(e3, t3, n3) {
            var o2 = [null];
            o2.push.apply(o2, t3);
            var i2 = new (Function.bind.apply(e3, o2))();
            return n3 && f(i2, n3.prototype), i2;
          }).apply(null, arguments);
        }
        function d() {
          if ("undefined" == typeof Reflect || !Reflect.construct)
            return false;
          if (Reflect.construct.sham)
            return false;
          if ("function" == typeof Proxy)
            return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), true;
          } catch (e2) {
            return false;
          }
        }
        function f(e2, t2) {
          return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
            return e3.__proto__ = t3, e3;
          })(e2, t2);
        }
        function p(e2) {
          return (p = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
            return e3.__proto__ || Object.getPrototypeOf(e3);
          })(e2);
        }
        var m = 0, h = function(e2) {
          !function(e3, t3) {
            if ("function" != typeof t3 && null !== t3)
              throw new TypeError("Super expression must either be null or a function");
            e3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e3, writable: true, configurable: true } }), Object.defineProperty(e3, "prototype", { writable: false }), t3 && f(e3, t3);
          }(u2, e2);
          var t2, n2, o2, i2, r2, l2 = (t2 = u2, n2 = d(), function() {
            var e3, o3 = p(t2);
            if (n2) {
              var i3 = p(this).constructor;
              e3 = Reflect.construct(o3, arguments, i3);
            } else
              e3 = o3.apply(this, arguments);
            return c(this, e3);
          });
          function u2() {
            return a(this, u2), l2.apply(this, arguments);
          }
          return o2 = u2, (i2 = [{ key: "connectedCallback", value: function() {
            var e3 = this.attachShadow({ mode: "open" }), t3 = this.getAttribute("path");
            window.isApryseWebViewerWebComponent = true, window.webViewerPath = t3, this.id = this.getAttribute("id") || function e4() {
              var t4 = localStorage.getItem("wv_instanceIds");
              if ((t4 = t4 ? t4.split(",") : []).length && t4[m]) {
                var n3 = t4[m];
                return m++, n3;
              }
              var o3 = Math.random().toString(36).slice(-6);
              return -1 === t4.findIndex(function(e5) {
                return e5 === o3;
              }) ? (t4.push(o3), localStorage.setItem("wv_instanceIds", t4), m++, o3) : e4();
            }() || "default", fetch("".concat(t3, "/ui/index-wc.html")).then(function(e4) {
              return e4.text();
            }).then(function(n3) {
              e3.innerHTML = n3, function e4(t4, n4) {
                if (true === function(e5) {
                  return "SCRIPT" === e5.tagName;
                }(t4))
                  t4.parentNode.replaceChild(function(e5, t5) {
                    var n5 = document.createElement("script");
                    n5.text = e5.innerHTML;
                    for (var o4, i4 = -1, r3 = e5.attributes; ++i4 < r3.length; )
                      "src" === r3[i4].name ? n5.setAttribute("src", "".concat(t5).concat(r3[i4].value)) : n5.setAttribute((o4 = r3[i4]).name, o4.value);
                    return n5;
                  }(t4, n4), t4);
                else
                  for (var o3 = -1, i3 = t4.childNodes; ++o3 < i3.length; )
                    e4(i3[o3], n4);
                return t4;
              }(e3, t3), window.dispatchEvent(new Event("webviewerloaded"));
            });
          } }]) && s(o2.prototype, i2), r2 && s(o2, r2), Object.defineProperty(o2, "prototype", { writable: false }), u2;
        }(l(HTMLElement));
        try {
          customElements.define("apryse-webviewer", h);
        } catch (e2) {
          console.warn("This environment does not allow for usage of the WebComponent version of WebViewer: ".concat(e2));
        }
        var v = function(e2, t2) {
          return new Promise(function(n2, o2) {
            var i2 = document.createElement("apryse-webviewer");
            i2.setAttribute("id", "wc-".concat(t2.id)), e2.l = e2.l || e2.licenseKey, e2.azureWorkaround = e2.azureWorkaround || e2.enableAzureWorkaround, e2.annotationAdmin = e2.annotationAdmin || e2.isAdminUser, e2.enableReadOnlyMode = e2.enableReadOnlyMode || e2.isReadOnly, e2.showLocalFilePicker = e2.showLocalFilePicker || e2.enableFilePicker, e2.useSharedWorker = e2.workerTransportPromise ? "true" : "false", e2.path = e2.path || "/lib", e2.workerTransportPromise && (window.apryseWorkerTransportPromise = e2.workerTransportPromise), e2.l && (window.apryse_l = btoa(e2.l));
            var r2 = ["disableLogs", "highContrastMode"];
            for (var a2 in ["autoCreate", "autoFocusNoteOnAnnotationSelection", "enableOptimizedWorkers", "enableAnnotations", "preloadPDFWorker", "useDownloader"].forEach(function(t3) {
              void 0 === (null == e2 ? void 0 : e2[t3]) && (e2[t3] = true);
            }), e2)
              void 0 !== (null == e2 ? void 0 : e2[a2]) && null !== (null == e2 ? void 0 : e2[a2]) && (r2.includes(a2) && false === e2[a2] ? i2.removeAttribute(a2) : e2.encryption ? i2.setAttribute("auto_load", false) : "licenseKey" !== a2 && "l" !== a2 && i2.setAttribute(a2, e2[a2]));
            i2.setAttribute("webviewerjsversion", "10.6.0");
            t2.appendChild(i2), i2.addEventListener("ready", function() {
              n2(i2.instance);
            }), window.addEventListener("message", function(t3) {
              "requestl" === t3.data && t3.source && t3.source.postMessage({ type: "responsel", value: e2.l || e2.licenseKey }, "*");
            }, false);
          });
        };
        function b(e2) {
          return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function w(e2, t2) {
          var n2 = Object.keys(e2);
          if (Object.getOwnPropertySymbols) {
            var o2 = Object.getOwnPropertySymbols(e2);
            t2 && (o2 = o2.filter(function(t3) {
              return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
            })), n2.push.apply(n2, o2);
          }
          return n2;
        }
        function y(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? w(Object(n2), true).forEach(function(t3) {
              g(e2, t3, n2[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : w(Object(n2)).forEach(function(t3) {
              Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
            });
          }
          return e2;
        }
        function g(e2, t2, n2) {
          return (t2 = function(e3) {
            var t3 = function(e4, t4) {
              if ("object" !== b(e4) || null === e4)
                return e4;
              var n3 = e4[Symbol.toPrimitive];
              if (void 0 !== n3) {
                var o2 = n3.call(e4, t4 || "default");
                if ("object" !== b(o2))
                  return o2;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === t4 ? String : Number)(e4);
            }(e3, "string");
            return "symbol" === b(t3) ? t3 : String(t3);
          }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
        }
        window.WebViewerWebComponent = v;
        var T = {}, P = 0;
        "undefined" == typeof console && (window.console = { log: function() {
        }, warn: function() {
        }, error: function() {
        } });
        var O = function() {
          for (var e2 = 1; e2 < arguments.length; e2++)
            for (var t2 = Object.keys(arguments[e2]), n2 = 0; n2 < t2.length; n2++)
              arguments[0][t2[n2]] = arguments[e2][t2[n2]];
          return arguments[0];
        }, _ = function(e2) {
          var t2 = [];
          return e2.forEach(function(e3) {
            t2.push(e3);
          }), t2;
        }, A = function(e2, t2) {
          var n2;
          try {
            n2 = new CustomEvent(e2, { detail: t2, bubbles: true, cancelable: true });
          } catch (o2) {
            (n2 = document.createEvent("Event")).initEvent(e2, true, true), n2.detail = t2;
          }
          return n2;
        };
        window.PDFNet && !T.skipPDFNetWebViewerWarning && console.warn("PDFNet.js and WebViewer.js have been included in the same context. See https://community.apryse.com/t/what-is-the-best-location-to-call-pdfnet-apis-when-used-in-conjunction-with-webviewer/5210 for an explanation of why this could be an error in your application.");
        var I = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map();
        T.WebViewer = function(e2, t2) {
          var n2 = this;
          if (S.get(t2))
            throw new Error("Two instances of WebViewer were created on the same HTML element. Please create a new element for each instance of WebViewer");
          S.set(t2, true);
          t2.addEventListener("ready", function e3() {
            I.get(t2).instance = n2.getCompleteInstance(), t2.removeEventListener("ready", e3);
          }), this._validateOptions(e2);
          var o2 = e2.webviewerServerURL || e2.pdftronServer;
          e2.fullAPI && o2 && (e2.forceClientSideInit || console.warn("The fullAPI and webviewerServerURL options have both been set so the forceClientSideInit option is now enabled. This means that WebViewer will switch to client side rendering and processing to allow use of the full API."), e2.forceClientSideInit = true), this.options = O({}, T.WebViewer.Options, e2);
          var i2 = this.options.path.length - 1;
          i2 > 0 && "/" !== this.options.path[i2] && (this.options.path += "/"), this.options.uiPath = this.options.path + this.options.uiPath, t2 || console.error("ViewerElement is not defined. This may be caused by calling the WebViewer constructor before the DOM is loaded, or an invalid selector. Please see https://docs.apryse.com/documentation/web/get-started/ for an example."), this.element = t2, this.element.style.overflow = "hidden";
          var r2 = this;
          this.messageHandler = function(t3) {
            if ("requestl" === t3.data && t3.source && t3.source.postMessage({ type: "responsel", value: e2.l || e2.licenseKey }, "*"), "requestConfig" === t3.data.type && t3.data.id === r2.id && t3.source) {
              var n3 = e2.config ? r2._correctRelativePath(e2.config) : "";
              t3.source.postMessage({ type: "responseConfig", value: n3 }, "*");
            }
          }, window.addEventListener("message", this.messageHandler, false), this.options.autoCreate && this.create();
        };
        var E = { licenseKey: void 0, enableAzureWorkaround: false, isAdminUser: false, isReadOnly: false };
        T.WebViewer.prototype = { version: "10.6.0", create: function() {
          if (this.options.initialDoc) {
            var e2 = this._correctRelativePath(this.options.initialDoc);
            e2 = encodeURIComponent(JSON.stringify(e2)), this.options.initialDoc = e2;
          }
          this._create();
        }, _create: function() {
          this.id = ++P, void 0 === this._trigger && (this._trigger = function(e3, t2) {
            var n2 = A(e3, t2);
            this.element.dispatchEvent(n2);
          });
          var e2 = this.options.type.replace(" ", "").split(",");
          e2.length < 1 && (e2[0] = "html5"), this._createViewer(e2);
        }, _validateOptions: function(e2) {
          for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2];
            o2 in O({}, E, T.WebViewer.Options) || console.warn("".concat(o2, " is not a valid option name. See https://docs.apryse.com/api/web/global.html#WebViewerOptions for all available options."));
          }
          var i2 = e2.webviewerServerURL || e2.pdftronServer;
          !e2.enableRedaction || e2.fullAPI || i2 || console.warn("FullAPI or WebViewer Server is needed to apply redactions");
        }, _notSupportedMobile: function() {
          var e2 = document.createElement("div");
          e2.id = "webviewer-browser-unsupported", e2.textContent = "PDF document viewing is not supported by this browser.", this.element.appendChild(e2);
        }, _createViewer: function(e2) {
          var t2, n2 = this;
          if (n2.selectedType = null, this.isMobileDevice()) {
            if (this.options.documentType && "xod" !== this.options.documentType && !this._testWebAssembly())
              return void this._notSupportedMobile();
            if (e2 = Array("html5Mobile"), n2.selectedType = "html5Mobile", this.options.mobileRedirect)
              return t2 = this.options.uiPath + this._getHTML5OptionsURL(), void (window.location = t2);
          }
          for (var o2 = false, i2 = false, r2 = 0; r2 < e2.length; r2++) {
            if ("html5mobile" === e2[r2].toLowerCase()) {
              if (this.options.documentType && "xod" !== this.options.documentType && !this._testWebAssembly())
                continue;
              if (o2 = true, n2._testHTML5()) {
                if (this.options.mobileRedirect)
                  return n2.selectedType = "html5Mobile", t2 = this.options.uiPath + this._getHTML5OptionsURL(), void (window.location = t2);
                if (this.options.xdomainProxyUrl || n2.isSameOrigin(decodeURIComponent(n2.options.initialDoc)) || n2._testCORS()) {
                  n2.selectedType = "html5Mobile";
                  break;
                }
                i2 = true;
              }
            }
            if ("html5" === e2[r2].toLowerCase() && (o2 = true, n2._testHTML5())) {
              var a2 = n2.isSameOrigin(decodeURIComponent(n2.options.initialDoc));
              if (this.options.xdomainProxyUrl || a2 || n2._testCORS()) {
                n2.selectedType = "html5";
                break;
              }
              i2 = true;
            }
          }
          if ("html5" === n2.selectedType)
            n2._createHTML5();
          else if ("html5Mobile" === n2.selectedType)
            n2._createHTML5Mobile();
          else {
            var s2;
            if (i2 ? s2 = "This browser does not support cross origin requests. Please configure xdomain to support CORS." : o2 && (s2 = "Please use an HTML5 compatible browser."), s2) {
              var c2 = document.createElement("div");
              c2.id = "webviewer-browser-unsupported", c2.textContent = s2, n2.element.appendChild(c2);
            }
          }
        }, _viewerLoaded: function(e2) {
          this._trigger("ready");
          try {
            var t2 = e2.contentWindow;
            if (t2.postMessage({ type: "viewerLoaded" }, "*"), void 0 !== this.options.encryption) {
              var n2 = decodeURIComponent(this.options.initialDoc);
              this.options.initialDoc && (n2 = JSON.parse(n2));
              var o2 = { decrypt: t2.Core.Encryption.decrypt, decryptOptions: this.options.encryption, documentId: this.options.documentId, extension: "xod" };
              this.getInstance().UI.loadDocument(n2, o2);
            }
          } catch (e3) {
            console.warn("Viewer is on a different domain, the promise from WebViewer function is rejected and API functions will not work because of cross domain permissions. See https://docs.apryse.com/documentation/web/guides/wv-inside/#loading-webviewer-from-another-domain for more information.");
          }
        }, _getHTML5OptionsURL: function() {
          var e2, t2, n2, o2 = this.options, i2 = o2.webviewerServerURL || o2.pdftronServer, r2 = "";
          if (o2.initialDoc && (r2 += "#d=".concat(o2.initialDoc)), void 0 === o2.backendType && (o2.backendType = o2.pdfBackend), o2.documentType && "xod" === o2.documentType && (e2 = o2.documentType), o2.preloadWorker && "xod" === o2.preloadWorker && (e2 = o2.preloadWorker), o2.extension && (e2 = o2.extension), e2 && (r2 += "&extension=".concat(e2)), o2.documentType && "xod" !== o2.documentType && (t2 = o2.documentType), o2.preloadWorker && "xod" !== o2.preloadWorker && (t2 = o2.preloadWorker), t2 && (r2 += "&preloadWorker=".concat(t2)), o2.backendType && (r2 += "&pdf=".concat(o2.backendType, "&office=").concat(o2.backendType, "&legacyOffice=").concat(o2.backendType)), o2.filename && (r2 += "&filename=".concat(o2.filename)), void 0 !== o2.streaming && (r2 += "&streaming=".concat(o2.streaming)), o2.externalPath) {
            var a2 = this._correctRelativePath(o2.externalPath);
            a2 = encodeURIComponent(a2), r2 += "&p=".concat(a2);
          }
          if (o2.encryption && (r2 += "&auto_load=false"), o2.enableAnnotations && (r2 += "&a=1"), o2.disabledElements) {
            var s2 = encodeURIComponent(o2.disabledElements.join(","));
            r2 += "&disabledElements=".concat(s2);
          }
          if (o2.serverUrl) {
            var c2 = this._correctRelativePath(o2.serverUrl);
            c2 = encodeURIComponent(c2), r2 += "&server_url=".concat(c2);
          }
          if (o2.serverUrlHeaders && (r2 += "&serverUrlHeaders=".concat(JSON.stringify(o2.serverUrlHeaders))), o2.documentId && (r2 += "&did=".concat(o2.documentId)), o2.css) {
            var l2 = this._correctRelativePath(o2.css);
            l2 = encodeURIComponent(l2), r2 += "&css=".concat(l2);
          }
          (o2.disableI18n && (r2 += "&disableI18n=1"), o2.enableOfflineMode && (r2 += "&offline=1"), o2.startOffline && (r2 += "&startOffline=1"), (o2.enableReadOnlyMode || o2.isReadOnly) && (r2 += "&readonly=1"), o2.hideAnnotationPanel && (r2 += "&hideAnnotationPanel=1"), o2.disableToolGroupReordering && (r2 += "&disableToolGroupReordering=1"), void 0 !== o2.annotationUser && (r2 += "&user=".concat(o2.annotationUser)), void 0 === o2.annotationAdmin && void 0 === o2.isAdminUser || (r2 += "&admin=".concat(o2.annotationAdmin || o2.isAdminUser ? 1 : 0)), void 0 !== o2.custom && (r2 += "&custom=".concat(encodeURIComponent(o2.custom))), void 0 === o2.showLocalFilePicker && void 0 === o2.enableFilePicker || (r2 += "&filepicker=".concat(o2.showLocalFilePicker || o2.enableFilePicker ? 1 : 0)), void 0 !== o2.fullAPI && (r2 += "&pdfnet=".concat(o2.fullAPI ? 1 : 0)), void 0 !== o2.enableRedaction && (r2 += "&enableRedaction=".concat(o2.enableRedaction ? 1 : 0)), void 0 !== o2.disableVirtualDisplayMode && (r2 += "&disableVirtualDisplayMode=".concat(o2.disableVirtualDisplayMode ? 1 : 0)), void 0 !== o2.hideDetachedReplies && (r2 += "&hideDetachedReplies=".concat(o2.hideDetachedReplies ? 1 : 0)), void 0 !== o2.enableMeasurement && (r2 += "&enableMeasurement=".concat(o2.enableMeasurement ? 1 : 0)), void 0 !== o2.showToolbarControl && (r2 += "&toolbar=".concat(o2.showToolbarControl ? "true" : "false")), void 0 !== o2.notesInLeftPanel && (r2 += "&notesInLeftPanel=".concat(o2.notesInLeftPanel ? 1 : 0)), void 0 !== o2.autoExpandOutlines && (r2 += "&autoExpandOutlines=".concat(o2.autoExpandOutlines ? 1 : 0)), void 0 !== o2.enableAnnotationNumbering && (r2 += "&enableAnnotationNumbering=".concat(o2.enableAnnotationNumbering ? 1 : 0)), void 0 !== o2.enableOfficeEditing && (r2 += "&enableOfficeEditing=".concat(o2.enableOfficeEditing ? 1 : 0)), void 0 !== o2.xdomainProxyUrl) && (n2 = "string" == typeof o2.xdomainProxyUrl ? { url: o2.xdomainProxyUrl } : o2.xdomainProxyUrl, r2 += "&xdomain_urls=".concat(encodeURIComponent(JSON.stringify(n2))));
          return (o2.azureWorkaround || o2.enableAzureWorkaround) && (r2 += "&azureWorkaround=1"), o2.enableOptimizedWorkers || (r2 += "&enableOptimizedWorkers=0"), o2.useDownloader || (r2 += "&useDownloader=0"), o2.disableWebsockets && (r2 += "&disableWebsockets=1"), o2.disableStreaming && (r2 += "&disableStreaming=1"), o2.forceClientSideInit && (r2 += "&forceClientSideInit=1"), o2.loadAsPDF && (r2 += "&loadAsPDF=1"), void 0 !== o2.workerTransportPromise && (r2 += "&useSharedWorker=".concat(o2.workerTransportPromise ? "true" : "false")), void 0 !== i2 && i2 && (r2 += "&webviewerServerURL=".concat(encodeURIComponent(i2))), o2.fallbackToClientSide && (r2 += "&fallbackToClientSide=1"), void 0 !== o2.singleServerMode && (r2 += "&singleServerMode=".concat(o2.singleServerMode ? "true" : "false")), void 0 !== o2.accessibleMode && (r2 += "&accessibleMode=".concat(o2.accessibleMode ? 1 : 0)), o2.disableLogs && (r2 += "&disableLogs=1"), o2.enableViewStateAnnotations && (r2 += "&enableViewStateAnnotations=1"), o2.disableFlattenedAnnotations && (r2 += "&disableFlattenedAnnotations=1"), o2.highContrastMode && (r2 += "&highContrastMode=1"), void 0 !== o2.selectAnnotationOnCreation && (r2 += "&selectAnnotationOnCreation=".concat(o2.selectAnnotationOnCreation ? 1 : 0)), void 0 !== o2.autoFocusNoteOnAnnotationSelection && (r2 += "&autoFocusNoteOnAnnotationSelection=".concat(o2.autoFocusNoteOnAnnotationSelection ? 1 : 0)), o2.disableIndexedDB && (r2 += "&disableIndexedDB=1"), o2.disableMultiViewerComparison && (r2 += "&disableMultiViewerComparison=1"), o2.showInvalidBookmarks && (r2 += "&showInvalidBookmarks=1"), o2.disableObjectURLBlobs && (r2 += "&disableObjectURLBlobs=".concat(o2.disableObjectURLBlobs)), r2 += "&id=".concat(this.id), (r2 += "&basePath=".concat(encodeURIComponent(window.location.pathname))).length > 0 && "&" === r2[0] && (r2 = "#".concat(r2.slice(1))), r2 += "&webViewerJSVersion=".concat(this.version);
        }, setInstanceData: function(e2) {
          I.set(this.element, { iframe: e2, l: this.options.l || this.options.licenseKey, workerTransportPromise: this.options.workerTransportPromise });
        }, _createHTML5: function() {
          var e2 = this, t2 = this.options.uiPath + this._getHTML5OptionsURL(), n2 = document.createElement("iframe");
          this.setInstanceData(n2), n2.id = "webviewer-".concat(this.id), n2.src = t2, n2.title = "webviewer", n2.frameBorder = 0, n2.width = "100%", n2.height = "100%", n2.setAttribute("allowfullscreen", true), n2.setAttribute("webkitallowfullscreen", true), n2.setAttribute("mozallowfullscreen", true), this.iframe = n2, this.options.backgroundColor && n2.setAttribute("data-bgcolor", this.options.backgroundColor), this.options.assetPath && n2.setAttribute("data-assetpath", encodeURIComponent(this.options.assetPath)), this.element.appendChild(n2);
          window.addEventListener("message", function t3(n3) {
            if ("viewerLoaded" === n3.data.type && n3.data.id === e2.id)
              try {
                e2.instance = e2.iframe.contentWindow.instance;
              } catch (e3) {
              } finally {
                window.removeEventListener("message", t3), e2._viewerLoaded(e2.iframe);
              }
          });
        }, _createHTML5Mobile: function() {
          var e2 = this, t2 = this.options.uiPath + this._getHTML5OptionsURL(), n2 = document.createElement("iframe");
          this.setInstanceData(n2), n2.id = "webviewer-".concat(this.id), n2.src = t2, n2.frameborder = 0, this.options.assetPath && n2.setAttribute("data-assetpath", encodeURIComponent(this.options.assetPath)), n2.style.width = "100%", n2.style.height = "100%", this.iframe = n2, this.element.appendChild(n2);
          window.addEventListener("message", function t3(n3) {
            if ("viewerLoaded" === n3.data.type && n3.data.id === e2.id)
              try {
                e2.instance = e2.iframe.contentWindow.instance;
              } catch (e3) {
              } finally {
                window.removeEventListener("message", t3), e2._viewerLoaded(e2.iframe);
              }
          });
        }, dispose: function() {
          var e2 = this;
          return new Promise(function(t2) {
            I.delete(e2.element), S.delete(e2.element), window.removeEventListener("message", e2.messageHandler), e2.iframe = null, console.clear(), e2.instance.Core.documentViewer.closeDocument().then(function() {
              t2();
            });
          });
        }, getInstance: function() {
          return this.instance;
        }, setCompleteInstance: function(e2) {
          this.completeInstance = e2;
        }, getCompleteInstance: function() {
          return this.completeInstance;
        }, _correctRelativePath: function(e2) {
          var t2 = window.location.pathname;
          return Array.isArray(e2) ? e2.map(function(e3) {
            return i(e3, t2);
          }) : i(e2, t2);
        }, _testHTML5: function() {
          try {
            var e2 = document.createElement("canvas");
            return e2 && e2.getContext("2d");
          } catch (e3) {
            return false;
          }
        }, _testWebAssembly: function() {
          return !(!window.WebAssembly || !window.WebAssembly.validate);
        }, _testCORS: function() {
          return "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest();
        }, isIE: function() {
          var e2 = navigator.userAgent.toLowerCase(), t2 = /(msie) ([\w.]+)/.exec(e2) || /(trident)(?:.*? rv:([\w.]+)|)/.exec(e2);
          return t2 ? parseInt(t2[2], 10) : t2;
        }, isMobileDevice: function() {
          return !this.isIE() && (0 === this.scrollbarWidth() && navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Touch/i) || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/Silk/i));
        }, scrollbarWidth: function() {
          var e2 = document.createElement("div");
          e2.style.cssText = "width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px", document.body.appendChild(e2);
          var t2 = e2.offsetWidth - e2.clientWidth;
          return document.body.removeChild(e2), t2;
        }, isSameOrigin: function(e2) {
          var t2 = window.location, n2 = document.createElement("a");
          n2.href = e2, "" === n2.host && (n2.href = n2.href);
          var o2 = window.location.port, i2 = n2.port;
          return "http:" === n2.protocol ? (i2 = i2 || "80", o2 = o2 || "80") : "https:" === n2.protocol && (i2 = i2 || "443", o2 = o2 || "443"), n2.hostname === t2.hostname && n2.protocol === t2.protocol && i2 === o2;
        } }, T.WebViewer.Options = { initialDoc: void 0, annotationAdmin: void 0, isAdminUser: void 0, annotationUser: void 0, assetPath: void 0, autoCreate: true, autoFocusNoteOnAnnotationSelection: true, azureWorkaround: false, additionalTranslations: void 0, enableAzureWorkaround: false, enableOptimizedWorkers: true, backgroundColor: void 0, backendType: void 0, css: void 0, config: void 0, custom: void 0, documentId: void 0, documentType: void 0, preloadWorker: void 0, extension: void 0, enableAnnotations: true, filename: void 0, disableI18n: false, disabledElements: void 0, disableWebsockets: false, enableOfflineMode: false, enableReadOnlyMode: false, isReadOnly: false, enableRedaction: false, disableVirtualDisplayMode: false, enableMeasurement: false, encryption: void 0, externalPath: void 0, hideAnnotationPanel: false, disableToolGroupReordering: false, uiPath: "./ui/index.html", l: void 0, licenseKey: void 0, mobileRedirect: false, path: "", pdfBackend: void 0, webviewerServerURL: void 0, fallbackToClientSide: false, singleServerMode: false, fullAPI: false, preloadPDFWorker: true, serverUrl: void 0, serverUrlHeaders: void 0, showLocalFilePicker: false, enableFilePicker: false, showToolbarControl: void 0, startOffline: false, streaming: void 0, type: "html5", useDownloader: true, workerTransportPromise: void 0, xdomainProxyUrl: void 0, ui: void 0, forceClientSideInit: false, loadAsPDF: false, accessibleMode: void 0, disableLogs: false, enableViewStateAnnotations: false, highContrastMode: false, selectAnnotationOnCreation: false, notesInLeftPanel: false, autoExpandOutlines: false, enableAnnotationNumbering: false, enableOfficeEditing: false, documentXFDFRetriever: void 0, disableMultiViewerComparison: void 0, showInvalidBookmarks: true, disableObjectURLBlobs: false, disableFlattenedAnnotations: false, disableStreaming: false };
        var k = function(e2, t2) {
          return new Promise(function(n2, o2) {
            e2.l = e2.l || e2.licenseKey, e2.azureWorkaround = e2.azureWorkaround || e2.enableAzureWorkaround, e2.annotationAdmin = e2.annotationAdmin || e2.isAdminUser, e2.enableReadOnlyMode = e2.enableReadOnlyMode || e2.isReadOnly, e2.showLocalFilePicker = e2.showLocalFilePicker || e2.enableFilePicker;
            t2.addEventListener("ready", function r2() {
              t2.removeEventListener("ready", r2);
              try {
                var a2 = t2.querySelector("iframe").contentWindow;
                if (void 0 === a2.Core.Tools)
                  throw new Error("Viewer isn't instantiated correctly. It could be caused by the 'path' option in the WebViewer constructor not being defined correctly. The 'path' option should be relative to the HTML file you're loading the script on and the lib folder needs to be publicly accessible.");
                var s2 = i2.getInstance(), c2 = { iframeWindow: a2, dispose: i2.dispose.bind(i2) }, l2 = O({}, s2, g({}, s2.UI_NAMESPACE_KEY, y(y({}, s2[s2.UI_NAMESPACE_KEY]), c2)));
                i2.setCompleteInstance(l2);
                var u2 = Promise.resolve();
                if (e2.documentXFDFRetriever && (u2 = l2[s2.CORE_NAMESPACE_KEY].documentViewer.setDocumentXFDFRetriever(e2.documentXFDFRetriever)), e2.additionalTranslations) {
                  var d2 = e2.additionalTranslations;
                  l2[s2.UI_NAMESPACE_KEY].setTranslations(d2.language, d2.translations);
                }
                u2.then(function() {
                  n2(l2);
                });
              } catch (t3) {
                if ("config" in e2 && "" !== e2.config)
                  return n2();
                o2("Viewer is on a different domain, the promise from WebViewer function is rejected and API functions will not work because of cross domain permissions. See https://docs.apryse.com/documentation/web/guides/wv-inside/#loading-webviewer-from-another-domain for more information.");
              }
            });
            var i2 = new T.WebViewer(e2, t2);
          });
        }, C = function(e2) {
          for (var t2 = _(I), n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2];
            if (o2.iframe === e2)
              return o2;
          }
          return null;
        };
        k.l = function(e2) {
          var t2 = C(e2);
          return t2 && t2.l;
        }, k.workerTransportPromise = function(e2) {
          var t2 = C(e2);
          return t2 && t2.workerTransportPromise;
        }, k.WorkerTypes = { ALL: "all", OFFICE: "office", LEGACY_OFFICE: "legacyOffice", PDF: "pdf", CONTENT_EDIT: "contentEdit", OFFICE_EDITOR: "officeEditor" }, k.BackendTypes = o;
        var M = function(e2) {
          var t2 = _(I);
          if (!t2.length || !t2.filter(function(e3) {
            return e3.instance;
          }).length)
            return console.warn("WebViewer.getInstance() was called before any instances were available"), null;
          if (t2.length > 1 && !e2)
            throw new Error("More than one instance of WebViewer was found, and no element was passed into getInstance(). Please specify which instance you want to get.");
          return e2 ? (I.get(e2) || {}).instance : (t2[0] || {}).instance;
        };
        k.getInstance = M, window.WebViewer = k, k.WebComponent = v, k.Iframe = k;
        t.default = k;
      }]);
    });
  }
});
export default require_webviewer_min();
//# sourceMappingURL=@pdftron_webviewer.js.map
