/** Neat Complete v1.5.10 (c) 2019 AddressFinder https://addressfinder.nz https://addressfinder.com.au https://github.com/AbleTech/neat-complete/blob/develop/LICENSE.md */
(function () { var t = [].slice, e = function (t, e) { return function () { return t.apply(e, arguments) } }, i = function (t, e) { function i() { this.constructor = t } for (var n in e) s.call(e, n) && (t[n] = e[n]); return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t }, s = {}.hasOwnProperty; !function (t, e) { "function" == typeof define && define.amd ? define(function () { return e(t) }) : t.NeatComplete = e(t) }(this, function (s) { var n; return n = {}, n.VERSION = "1.5.10", n.addDomEvent = function (t, e, i) { var s; return t.addEventListener ? t.addEventListener(e, i, !1) : (s = function () { return i.apply(t, arguments) }, t.attachEvent("on" + e, s)) }, n.removeDomEvent = function (t, e, i) { t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, null) }, n.addClass = function (t, e) { return n.classNameExists(t, e) || (e = " " + e, t.className += e), t }, n.removeClass = function (t, e) { var i, s, n, o, r; for (r = [], s = t.className.split(" "), n = 0, o = s.length; n < o; n++)(i = s[n]) !== e && r.push(i); return t.className = r.join(" "), t }, n.classNameExists = function (t, e) { var i, s, n; for (i = t.className.split(" "), s = 0, n = i.length; s < n; s++)if (i[s] === e) return !0; return !1 }, Array.prototype.indexOf || (Array.prototype.indexOf = function (t) { var e, i, s, n; if (null == this) throw new TypeError; if (n = Object(this), 0 === (i = n.length >>> 0)) return -1; if (s = 0, arguments.length > 0 && (s = Number(arguments[1]), s !== s ? s = 0 : 0 !== s && Infinity !== s && -Infinity !== s && (s = (s > 0 || -1) * Math.floor(Math.abs(s)))), s >= i) return -1; for (e = s >= 0 ? s : Math.max(i - Math.abs(s), 0); e < i;) { if (e in n && n[e] === t) return e; e++ } return -1 }), n.Dispatch = function () { function e() { } return e.prototype.setOption = function (t, e) { return this.options[t] = e, this }, e.prototype.getOption = function (t) { return this.options[t] }, e.prototype.on = function (t, e) { var i; return null == this.subs && (this.subs = {}), null == (i = this.subs)[t] && (i[t] = []), this.subs[t].push(e), this }, e.prototype.trigger = function () { var e, i, s, n, o, r, h; if (s = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], null != (null != (r = this.subs) ? r[s] : void 0)) for (h = this.subs[s], n = 0, o = h.length; n < o; n++)i = h[n], i.apply(this, e); return this }, e }(), n.Widget = function (t) { function s(t, i) { this.element = t, this.options = null != i ? i : {}, this._onPaste = e(this._onPaste, this), this._onBlur = e(this._onBlur, this), this._onKeyDown = e(this._onKeyDown, this), this._onKeyPress = e(this._onKeyPress, this), this._onFocus = e(this._onFocus, this), this.enabled = !0, this.searchQueued = !1, this.element.getAttribute("autocomplete") || this.element.setAttribute("autocomplete", "off"), this.services = [], this._applyDefaults(), null == this.getOption("container") && this.setOption("container", window.document.body), this._addListeners(), this.output = document.createElement("ul"), this.output.className = this.options.list_class, this._applyStyle("display", "none"), this._applyStyle("position", this.options.position), this.options.container.appendChild(this.output) } return i(s, t), s.prototype.defaults = { max_results: 10, list_class: "nc_list", item_class: "nc_item", hover_class: "nc_hover", footer_class: "nc_footer", empty_class: "nc_empty", error_class: "nc_error", icon_class: "nc_icon", hidden_icon_class: "nc_hidden", position: "absolute", timeout: 400, ignore_returns: !0 }, s.prototype.addService = function (t, e, i) { var s; return null == i && (i = {}), this.services.push(s = new n.Service(this, t, e, i)), s }, s.prototype.disable = function () { return this.enabled = !1, this.icon && n.addClass(this.icon, this.options.hidden_icon_class), this.output.innerHTML = "", this }, s.prototype.enable = function () { return this.enabled = !0, this.icon && n.removeClass(this.icon, this.options.hidden_icon_class), this }, s.prototype.destroy = function () { document.body.removeChild(this.output), this.element.removeAttribute("autocomplete"), this.icon && (document.body.removeChild(this.icon), window.removeEventListener("resize", this._resetIconPosition)) }, s.prototype._applyDefaults = function () { var t, e, i, s; e = this.defaults, i = []; for (t in e) s = e[t], null == this.getOption(t) ? i.push(this.setOption(t, s)) : i.push(void 0); return i }, s.prototype._addListeners = function () { return n.addDomEvent(this.element, "focus", this._onFocus), n.addDomEvent(this.element, "keypress", this._onKeyPress), n.addDomEvent(this.element, "keydown", this._onKeyDown), n.addDomEvent(this.element, "blur", this._onBlur), n.addDomEvent(this.element, "paste", this._onPaste) }, s.prototype._removeListeners = function () { return n.removeDomEvent(this.element, "focus", this._onFocus), n.removeDomEvent(this.element, "keypress", this._onKeyPress), n.removeDomEvent(this.element, "keydown", this._onKeyDown), n.removeDomEvent(this.element, "blur", this._onBlur), n.removeDomEvent(this.element, "paste", this._onPaste) }, s.prototype._onFocus = function (t) { return this.focused = !0 }, s.prototype._onKeyPress = function (t) { var e, i, s; if (i = t.which || t.keyCode, this.visible && 13 === i) return null != (s = this.highlighted) && s.selectItem(), e = this.getOption("ignore_returns"), e && t.preventDefault ? t.preventDefault() : e && (t.returnValue = !1), this.highlighted = null }, s.prototype._onKeyDown = function (t) { var e; switch (t.which || t.keyCode) { case 38: return this.visible && this._moveHighlight(-1), !1; case 40: return this.visible && this._moveHighlight(1), !1; case 9: if (this.visible) return null != (e = this.highlighted) ? e.selectItem() : void 0; break; case 27: return this._hideResults(); case 37: case 39: case 13: break; default: return this._getSuggestionsWithTimeout() } }, s.prototype._onBlur = function (t) { if (!this.mouseDownOnSelect) return this.focused = !1, this._hideResults() }, s.prototype._onPaste = function (t) { return this._getSuggestionsWithTimeout() }, s.prototype._moveHighlight = function (t) { var e, i, s, n; return e = null != this.highlighted ? this.results.indexOf(this.highlighted) : -1, null != (s = this.highlighted) && s.unhighlight(), e += t, e < -1 ? e = this.results.length - 1 : e >= this.results.length && (e = -1), null != (n = this.results[e]) && n.highlight(), i = void 0 !== this._val ? this._val : "", this.element.value = null != this.highlighted ? this.highlighted.value : i }, s.prototype._getSuggestionsWithTimeout = function () { return null != this._timeout && clearTimeout(this._timeout), this._timeout = setTimeout(function (t) { return function () { return t._getSuggestions() } }(this), this.options.timeout) }, s.prototype._getSuggestions = function () { var t, e, i, s, n; if (this.enabled) { if (!this._servicesReady()) return void (this.searchQueued = !0); if (this._val = this.element.value, this.error_content = null, "" !== this._val) { for (i = this.services, s = [], t = 0, e = i.length; t < e; t++)n = i[t], s.push(n.search(this._val)); return s } return this._hideResults() } }, s.prototype._applyStyle = function (t, e) { return this.output.style[t] = e }, s.prototype._getVerticalOffset = function () { return window.pageYOffset || document.documentElement && document.documentElement.scrollTop }, s.prototype._getPosition = function () { var t, e; return t = this.element, e = this._getVerticalOffset(), { top: e + t.getBoundingClientRect().top + t.offsetHeight, left: t.getBoundingClientRect().left } }, s.prototype._hideResults = function () { var t, e, i, s, n; for (this.visible = !1, this._applyStyle("display", "none"), this.results = [], i = this.services, s = [], t = 0, e = i.length; t < e; t++)n = i[t], s.push(n.results = []); return s }, s.prototype._displayResults = function () { var t; return this.visible = !0, t = this._getPosition(), this.options.container === document.body && (this._applyStyle("left", t.left + "px"), this._applyStyle("top", t.top + "px")), this._applyStyle("display", "block") }, s.prototype._renderItem = function (t, e) { var i; return i = document.createElement("li"), i.innerHTML = t, null != e && (i.className = e), n.addDomEvent(i, "mousedown", function (t) { return function () { return t.mouseDownOnSelect = !0 } }(this)), n.addDomEvent(i, "mouseup", function (t) { return function () { return t.mouseDownOnSelect = !1 } }(this)), i }, s.prototype._renderFooter = function () { return this._renderItem(this.options.footer_content, this.options.footer_class) }, s.prototype._renderEmpty = function () { return this._renderItem(this.options.empty_content, this.options.empty_class) }, s.prototype._servicesReady = function () { var t, e, i, s, n; for (n = [], i = this.services, t = 0, e = i.length; t < e; t++)s = i[t], n.push(s.ready()); return n.indexOf(!1) < 0 }, s.prototype.showResults = function () { var t, e, i, s, n, o, r, h, u; if (this._servicesReady()) { for (this.searchQueued && (this._getSuggestions(), this.searchQueued = !1), this.results = [], this.output.innerHTML = "", o = this.services, e = 0, s = o.length; e < s; e++)u = o[e], this.results = this.results.concat(u.results); if (this.results.length) { for (this.results = this.results.sort(function (t, e) { return e.score - t.score }), this.results = this.results.slice(0, +(this.getOption("max_results") - 1) + 1 || 9e9), r = this.results, i = 0, n = r.length; i < n; i++)h = r[i], this.output.appendChild(h.render()); null != this.options.footer_content && "" !== (t = this._renderFooter()) && this.output.appendChild(t), this._displayResults() } else this.error_content ? (this.output.appendChild(this._renderItem(this.error_content, this.options.error_class)), this._displayResults()) : (null != this.options.empty_content ? (this.output.appendChild(this._renderEmpty()), this._displayResults()) : this._hideResults(), this.trigger("results:empty")); this.trigger("results:update") } }, s.prototype.selectHighlighted = function () { this.element.value = this.highlighted.value, this._hideResults(), this.trigger("result:select", this.highlighted.value, this.highlighted.data), this._dispatchDOMChangeEvent() }, s.prototype._dispatchDOMChangeEvent = function () { var t; if ("function" == typeof Event) t = new Event("change", { bubbles: !0, cancellable: !0 }); else { if (void 0 === document.createEvent) return; t = document.createEvent("Event"), t.initEvent("change", !0, !0) } return this.element.dispatchEvent(t) }, s.prototype.setIcon = function (t, e) { var i, s, o; return this.removeIcon(t), s = t.class || "nc_icon", i = document.createElement("a"), n.addClass(i, s), o = this._calculateIconPosition(), i.style.top = o.coords.top + "px", i.style.left = o.coords.left + "px", i.style.height = o.size + "px", i.style.width = o.size + "px", i.addEventListener("click", e), this._resetIconPosition = this.setIcon.bind(this, t, e), window.addEventListener("resize", this._resetIconPosition), this.options.container.appendChild(i), this.icon = i }, s.prototype.removeIcon = function (t) { return this.icon && (this.icon.parentNode.removeChild(this.icon), window.removeEventListener("resize", this._resetIconPosition)), this.icon = null }, s.prototype._calculateIconPosition = function () { var t, e, i, s, n; return n = this.element.offsetWidth, i = this.element.offsetHeight, s = this._getPosition(), e = i / 2, t = e / 2.4, { coords: { top: s.top - e - t, left: s.left + n - e - t }, size: e } }, s.prototype.setInfoPanel = function (t, e) { var i, s; return e = e || {}, i = e.class || "af_info_panel", !1 === e.persistant ? (this.output.innerHTML = "", s = this._renderItem(t, i), e.cancellable && this._addCancelButton(s, e), this.output.appendChild(s), this._displayResults()) : (this.infoPanel = {}, this.infoPanel.content = t, this.infoPanel.options = e) }, s.prototype._addCancelButton = function (t, e) { var i, s, o; return o = navigator.userAgent, i = o.indexOf("MSIE ") > -1 || o.indexOf("Trident/") > -1, s = document.createElement("span"), n.addClass(s, "cancel_button"), i && n.addClass(s, "IE"), s.addEventListener("click", function () { return this.output.innerHTML = "", e.cancelHandler() }.bind(this)), t.appendChild(s) }, s }(n.Dispatch), n.Service = function (t) { function s(t, i, s, n) { this.widget = t, this.name = i, this.search_fn = s, this.options = null != n ? n : {}, this._response = e(this._response, this), this.ready = e(this.ready, this), this.results = [], this._ready = !0, this.response = function (t) { return function (e, i) { return t._response.apply(t, arguments) } }(this) } return i(s, t), s.prototype.ready = function () { return this._ready }, s.prototype.search = function (t) { return this.last_query = t, this._ready = !1, this.search_fn(t, this.response) }, s.prototype._response = function (t, e) { var i, s, o; if (this.results = [], this.last_query === t) { for (this.results = [], s = 0, o = e.length; s < o; s++)i = e[s], this.results.push(new n._Result(this, i)); return this._ready = !0, this.widget.showResults() } }, s }(n.Dispatch), n._Result = function () { function t(t, e) { var i, s, n, o; this.service = t, this.options = e, this.widget = this.service.widget, this.renderer = this.service.options.renderer || this.widget.options.renderer, this.value = null != (i = this.options) ? i.value : void 0, this.score = (null != (s = this.options) ? s.score : void 0) || 0, this.identifier = null != (n = this.options) ? n.identifier : void 0, this.data = (null != (o = this.options) ? o.data : void 0) || {} } return t.prototype.render = function () { return this.li = document.createElement("li"), this.li.innerHTML = null != this.renderer ? this.renderer(this.value, this.data) : this.value, this.li.className = this.widget.options.item_class, this.addEvents(), this.li }, t.prototype.addEvents = function () { return n.addDomEvent(this.li, "click", function (t) { return function (e) { return t.selectItem(), e.preventDefault ? e.preventDefault() : e.returnValue = !1 } }(this)), n.addDomEvent(this.li, "mouseover", function (t) { return function () { return t.highlight() } }(this)), n.addDomEvent(this.li, "mouseout", function (t) { return function () { return t.unhighlight() } }(this)), n.addDomEvent(this.li, "mousedown", function (t) { return function () { return t.widget.mouseDownOnSelect = !0 } }(this)), n.addDomEvent(this.li, "mouseup", function (t) { return function () { return t.widget.mouseDownOnSelect = !1 } }(this)) }, t.prototype.selectItem = function () { return this.service.trigger("result:select", this.value, this.data), this.widget.highlighted = this, this.widget.selectHighlighted() }, t.prototype.highlight = function () { var t; return null != (t = this.widget.highlighted) && t.unhighlight(), this.li.className = this.li.className + " " + this.widget.options.hover_class, this.widget.highlighted = this }, t.prototype.unhighlight = function () { return this.widget.highlighted = null, this.li.className = this.li.className.replace(new RegExp(this.widget.options.hover_class, "gi"), "") }, t }(), n }) }).call(this);

/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2015
  * https://github.com/ded/reqwest
  */
!function (e, t, n) { typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define(n) : t[e] = n() }("reqwest", this, function () { function succeed(e) { var t = protocolRe.exec(e.url); return t = t && t[1] || context.location.protocol, httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response } function handleReadyState(e, t, n) { return function () { if (e._aborted) return n(e.request); if (e._timedOut) return n(e.request, "Request is aborted: timeout"); e.request && e.request[readyState] == 4 && (e.request.onreadystatechange = noop, succeed(e) ? t(e.request) : n(e.request)) } } function setHeaders(e, t) { var n = t.headers || {}, r; n.Accept = n.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"]; var i = typeof FormData != "undefined" && t.data instanceof FormData; !t.crossOrigin && !n[requestedWith] && (n[requestedWith] = defaultHeaders.requestedWith), !n[contentType] && !i && (n[contentType] = t.contentType || defaultHeaders.contentType); for (r in n) n.hasOwnProperty(r) && "setRequestHeader" in e && e.setRequestHeader(r, n[r]) } function setCredentials(e, t) { typeof t.withCredentials != "undefined" && typeof e.withCredentials != "undefined" && (e.withCredentials = !!t.withCredentials) } function generalCallback(e) { lastValue = e } function urlappend(e, t) { return e + (/\?/.test(e) ? "&" : "?") + t } function handleJsonp(e, t, n, r) { var i = uniqid++, s = e.jsonpCallback || "callback", o = e.jsonpCallbackName || reqwest.getcallbackPrefix(i), u = new RegExp("((^|\\?|&)" + s + ")=([^&]+)"), a = r.match(u), f = doc.createElement("script"), l = 0, c = navigator.userAgent.indexOf("MSIE 10.0") !== -1; return a ? a[3] === "?" ? r = r.replace(u, "$1=" + o) : o = a[3] : r = urlappend(r, s + "=" + o), context[o] = generalCallback, f.type = "text/javascript", f.src = r, f.async = !0, typeof f.onreadystatechange != "undefined" && !c && (f.htmlFor = f.id = "_reqwest_" + i), f.onload = f.onreadystatechange = function () { if (f[readyState] && f[readyState] !== "complete" && f[readyState] !== "loaded" || l) return !1; f.onload = f.onreadystatechange = null, f.onclick && f.onclick(), t(lastValue), lastValue = undefined, head.removeChild(f), l = 1 }, head.appendChild(f), { abort: function () { f.onload = f.onreadystatechange = null, n({}, "Request is aborted: timeout", {}), lastValue = undefined, head.removeChild(f), l = 1 } } } function getRequest(e, t) { var n = this.o, r = (n.method || "GET").toUpperCase(), i = typeof n == "string" ? n : n.url, s = n.processData !== !1 && n.data && typeof n.data != "string" ? reqwest.toQueryString(n.data) : n.data || null, o, u = !1; return (n["type"] == "jsonp" || r == "GET") && s && (i = urlappend(i, s), s = null), n["type"] == "jsonp" ? handleJsonp(n, e, t, i) : (o = n.xhr && n.xhr(n) || xhr(n), o.open(r, i, n.async === !1 ? !1 : !0), setHeaders(o, n), setCredentials(o, n), context[xDomainRequest] && o instanceof context[xDomainRequest] ? (o.onload = e, o.onerror = t, o.onprogress = function () { }, u = !0) : o.onreadystatechange = handleReadyState(this, e, t), n.before && n.before(o), u ? setTimeout(function () { o.send(s) }, 200) : o.send(s), o) } function Reqwest(e, t) { this.o = e, this.fn = t, init.apply(this, arguments) } function setType(e) { if (e === null) return undefined; if (e.match("json")) return "json"; if (e.match("javascript")) return "js"; if (e.match("text")) return "html"; if (e.match("xml")) return "xml" } function init(o, fn) { function complete(e) { o.timeout && clearTimeout(self.timeout), self.timeout = null; while (self._completeHandlers.length > 0) self._completeHandlers.shift()(e) } function success(resp) { var type = o.type || resp && setType(resp.getResponseHeader("Content-Type")); resp = type !== "jsonp" ? self.request : resp; var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type), r = filteredResponse; try { resp.responseText = r } catch (e) { } if (r) switch (type) { case "json": try { resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")") } catch (err) { return error(resp, "Could not parse JSON in response", err) } break; case "js": resp = eval(r); break; case "html": resp = r; break; case "xml": resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML } self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp), self._successHandler(resp); while (self._fulfillmentHandlers.length > 0) resp = self._fulfillmentHandlers.shift()(resp); complete(resp) } function timedOut() { self._timedOut = !0, self.request.abort() } function error(e, t, n) { e = self.request, self._responseArgs.resp = e, self._responseArgs.msg = t, self._responseArgs.t = n, self._erred = !0; while (self._errorHandlers.length > 0) self._errorHandlers.shift()(e, t, n); complete(e) } this.url = typeof o == "string" ? o : o.url, this.timeout = null, this._fulfilled = !1, this._successHandler = function () { }, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {}; var self = this; fn = fn || function () { }, o.timeout && (this.timeout = setTimeout(function () { timedOut() }, o.timeout)), o.success && (this._successHandler = function () { o.success.apply(o, arguments) }), o.error && this._errorHandlers.push(function () { o.error.apply(o, arguments) }), o.complete && this._completeHandlers.push(function () { o.complete.apply(o, arguments) }), this.request = getRequest.call(this, success, error) } function reqwest(e, t) { return new Reqwest(e, t) } function normalize(e) { return e ? e.replace(/\r?\n/g, "\r\n") : "" } function serial(e, t) { var n = e.name, r = e.tagName.toLowerCase(), i = function (e) { e && !e.disabled && t(n, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text)) }, s, o, u, a; if (e.disabled || !n) return; switch (r) { case "input": /reset|button|image|file/i.test(e.type) || (s = /checkbox/i.test(e.type), o = /radio/i.test(e.type), u = e.value, (!s && !o || e.checked) && t(n, normalize(s && u === "" ? "on" : u))); break; case "textarea": t(n, normalize(e.value)); break; case "select": if (e.type.toLowerCase() === "select-one") i(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null); else for (a = 0; e.length && a < e.length; a++) e.options[a].selected && i(e.options[a]) } } function eachFormElement() { var e = this, t, n, r = function (t, n) { var r, i, s; for (r = 0; r < n.length; r++) { s = t[byTag](n[r]); for (i = 0; i < s.length; i++) serial(s[i], e) } }; for (n = 0; n < arguments.length; n++) t = arguments[n], /input|select|textarea/i.test(t.tagName) && serial(t, e), r(t, ["input", "select", "textarea"]) } function serializeQueryString() { return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments)) } function serializeHash() { var e = {}; return eachFormElement.apply(function (t, n) { t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(n)) : e[t] = n }, arguments), e } function buildParams(e, t, n, r) { var i, s, o, u = /\[\]$/; if (isArray(t)) for (s = 0; t && s < t.length; s++) o = t[s], n || u.test(e) ? r(e, o) : buildParams(e + "[" + (typeof o == "object" ? s : "") + "]", o, n, r); else if (t && t.toString() === "[object Object]") for (i in t) buildParams(e + "[" + i + "]", t[i], n, r); else r(e, t) } var context = this; if ("window" in context) var doc = document, byTag = "getElementsByTagName", head = doc[byTag]("head")[0]; else { var XHR2; try { XHR2 = require("xhr2") } catch (ex) { throw new Error("Peer dependency `xhr2` required! Please npm install xhr2") } } var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState", contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0, callbackPrefix = "reqwest_" + +(new Date), lastValue, xmlHttpRequest = "XMLHttpRequest", xDomainRequest = "XDomainRequest", noop = function () { }, isArray = typeof Array.isArray == "function" ? Array.isArray : function (e) { return e instanceof Array }, defaultHeaders = { contentType: "application/x-www-form-urlencoded", requestedWith: xmlHttpRequest, accept: { "*": "text/javascript, text/html, application/xml, text/xml, */*", xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", js: "application/javascript, text/javascript" } }, xhr = function (e) { if (e.crossOrigin === !0) { var t = context[xmlHttpRequest] ? new XMLHttpRequest : null; if (t && "withCredentials" in t) return t; if (context[xDomainRequest]) return new XDomainRequest; throw new Error("Browser does not support cross-origin requests") } return context[xmlHttpRequest] ? new XMLHttpRequest : XHR2 ? new XHR2 : new ActiveXObject("Microsoft.XMLHTTP") }, globalSetupOptions = { dataFilter: function (e) { return e } }; return Reqwest.prototype = { abort: function () { this._aborted = !0, this.request.abort() }, retry: function () { init.call(this, this.o, this.fn) }, then: function (e, t) { return e = e || function () { }, t = t || function () { }, this._fulfilled ? this._responseArgs.resp = e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e), this._errorHandlers.push(t)), this }, always: function (e) { return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e), this }, fail: function (e) { return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e), this }, "catch": function (e) { return this.fail(e) } }, reqwest.serializeArray = function () { var e = []; return eachFormElement.apply(function (t, n) { e.push({ name: t, value: n }) }, arguments), e }, reqwest.serialize = function () { if (arguments.length === 0) return ""; var e, t, n = Array.prototype.slice.call(arguments, 0); return e = n.pop(), e && e.nodeType && n.push(e) && (e = null), e && (e = e.type), e == "map" ? t = serializeHash : e == "array" ? t = reqwest.serializeArray : t = serializeQueryString, t.apply(null, n) }, reqwest.toQueryString = function (e, t) { var n, r, i = t || !1, s = [], o = encodeURIComponent, u = function (e, t) { t = "function" == typeof t ? t() : t == null ? "" : t, s[s.length] = o(e) + "=" + o(t) }; if (isArray(e)) for (r = 0; e && r < e.length; r++) u(e[r].name, e[r].value); else for (n in e) e.hasOwnProperty(n) && buildParams(n, e[n], i, u); return s.join("&").replace(/%20/g, "+") }, reqwest.getcallbackPrefix = function () { return callbackPrefix }, reqwest.compat = function (e, t) { return e && (e.type && (e.method = e.type) && delete e.type, e.dataType && (e.type = e.dataType), e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback, e.jsonp && (e.jsonpCallback = e.jsonp)), new Reqwest(e, t) }, reqwest.ajaxSetup = function (e) { e = e || {}; for (var t in e) globalSetupOptions[t] = e[t] }, reqwest })

// AddyComplete - https://www.addy.co.nz
// NOTE: Update /scripts/addy.js

// Settings factory to retrieve options from scripts src URL
function AddyUrlSettingFactory(scriptName) {
    function getParameterByName(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(src);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function getScriptSrc() {
        var scripts = document.getElementsByTagName("script");
        scriptName = scriptName.toLowerCase();
        var scriptNames = ["/" + scriptName + ".js", "/addycomplete.js", scriptName];

        for (var j = 0; j < scriptNames.length; j++) {
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src && scripts[i].src.toLowerCase().indexOf("/" + scriptNames[j] + ".js") !== -1) {
                    return scripts[i].src;
                }
            }
        }

        console.warn("Script source not found. Name: ", scriptName);
        return "";
    }

    // Create the options to be modified per control
    this.createOptions = function () {
        var options = {};

        // Set default options
        options.excludePostBox = getParameterByName("excludePostBox") || false;
        options.exRural = getParameterByName("excludeRural") || false;
        options.exUndeliver = getParameterByName("excludeUndeliver") || false;
        options.exSpelling = getParameterByName("excludeSpelling") || false;
        options.exWord = getParameterByName("excludeWord") || false;
        options.exIp = getParameterByName("excludeIp") || false;
        options.exPostcodes = getParameterByName("excludePostcodes") || "";
        options.inPostcode = getParameterByName("includePostcode") || "";
        options.exRegion = getParameterByName("excludeRegion") || "";
        options.inRegion = getParameterByName("includeRegion") || "";
        options.exTerritory = getParameterByName("excludeTerritory") || "";
        options.inTerritory = getParameterByName("includeTerritory") || "";
        options.tag = getParameterByName("tag") || "";
        options.uniqueId = getParameterByName("uniqueid") || "";
        options.maxItems = getParameterByName("maxItems") || 10;
        options.enableLocation = (getParameterByName("enableLocation") || false) && navigator.geolocation;
        return options;
    }

    // Get the API key
    this.getKey = function () {
        var key = getParameterByName("key");
        return key;
    }

    // Create the callback variable
    this.createCallback = function () {
        var callback = getParameterByName("callback");
        if (callback && typeof window[callback] === 'function') return callback;
        return null;
    }

    this.getLoadCssEnabled = function () {
        var loadCss = getParameterByName("loadcss");
        return (loadCss && loadCss === "true");
    }

    this.createGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var src = getScriptSrc(scriptName);
}

// Create a global / singleton settings factory by looking for a script with the name addycomplete
var addySettingsFactory = new AddyUrlSettingFactory("addy");

// AddyComplete is responsible for adding autocomplete functionality to the input field
function AddyComplete(input, fields) {
    if (!input) {
        console.warn("Input field is missing");
        return;
    }
    var me = this;
    me.urlBase = "https://api.addy.co.nz/";
    me.searchSuffix = "";
    me.requestSuffix = "";
    me.fields = fields ? fields : {};
    me.mode = 'address';

    me.options = addySettingsFactory.createOptions();
    me.key = addySettingsFactory.getKey();
    var sessionId = addySettingsFactory.createGuid();
    var placeholder = input.placeholder;

    me.makeRequest = function (path, params, successCallback, errorCallback) {
        reqwest({
            url: me.urlBase + path + '?key=' + me.key + me.requestSuffix + '&v=neat_2_2_0&session=' + sessionId + params,
            crossOrigin: true,
            success: function (data) {
                if (successCallback) {
                    successCallback(data);
                }
            },
            error: function (err) {
                console.warn("Request failed: ", err);
                if (errorCallback) {
                    errorCallback(err);
                }
            }
        });
    }

    me.searchRequest = function (path, params, successCallback) {
        me.makeRequest(path, params, function (data) {
            successCallback(data);
            me.service.endSearch();
        }, function (err) {
            if (me.widget) {
                me.widget.error_content = "\"Request Failed:\n" + (err.message || err);
                me.service.endSearch();
            }
        });
    }

    me.widget = new NeatComplete.Widget(input,
        {
            empty_content: "<b>Address not found.</b> Please verify the spelling.<br />For brand new addresses, please type it in manually.",
            location_content: "Addresses near me",
            location_unavailable: "Location information unavailable. Please type in your address.",
            location_not_found: "No nearby addresses found. Please type in your address.",
            location_loading: "Loading your location...",
            max_results: me.options.maxItems,
            timeout: 50
        });

    var highLightRegEx = null;

    function formatHighlight(query) {
        return query.replace(/\\/gi, "/").replace(/[^0-9a-z' /]/gi, '').trim();
    }

    me.service = me.widget.addService("addy", function (query, callback) {
        try {
            highLightRegEx = new RegExp("(" + formatHighlight(query).split(' ').join('|') + ")", "gi");
        } catch (ex) {
            highLightRegEx = null;
        }

        if (me.mode === 'address') {
            me.searchRequest('search', me.searchSuffix + '&s=' + query, function (data) {
                var results = new Array();

                if (data) {
                    for (var i = 0; i < data.addresses.length; i++) {
                        results.push({ value: data.addresses[i].a, data: data.addresses[i] });
                    }
                }

                callback(query, results);
            });
        } else {
            me.searchRequest('postcode', '&max=' + me.getMaxResults() + '&s=' + query, function (data) {
                var results = new Array();

                if (data) {
                    for (var i = 0; i < data.postcodes.length; i++) {
                        var result = data.postcodes[i];
                        results.push({ value: result.suburb + (result.suburb === "" ? "" : ", ") + result.city + (result.city === "" ? "" : ", ") + result.postcode, data: result });
                    }
                }

                callback(query, results);
            });
        }
    }, {
            renderer: function (display, item) {
                var highlightClass = me.widget.getOption('highlight_class');
                return highLightRegEx === null ? display : display.replace(highLightRegEx, '<span class="' + (highlightClass === undefined ? 'nc_highlight' : highlightClass) + '">$1</span>');
            }
        });

    me.service.timer = null;

    me.service.endSearch = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this._ready = true;
    }

    me.service.search = function (query) {
        if (query.length < 3) {
            return;
        }
        me.widget.error_content = null;
        this.last_query = query;
        this._ready = false;
        this.timer = setTimeout(function () { this._ready = true; }, 3200);
        return this.search_fn(query, this.response);
    }

    function setSuffix() {
        me.searchSuffix = "&max=" + me.getMaxResults();

        if (me.options.excludePostBox) me.searchSuffix += "&expostbox=true";
        if (me.options.exUndeliver) me.searchSuffix += "&exundeliver=true";
        if (me.options.exRural) me.searchSuffix += "&exrural=true";
        if (me.options.exSpelling) me.searchSuffix += "&exspelling=true";
        if (me.options.exWord) me.searchSuffix += "&exword=true";
        if (me.options.exIp) me.searchSuffix += "&exip=true";

        if (me.options.exPostcodes && me.options.exPostcodes !== "") me.searchSuffix += "&expostcode=" + me.options.exPostcodes;
        if (me.options.inPostcode && me.options.inPostcode !== "") me.searchSuffix += "&inpostcode=" + me.options.inPostcode;
        if (me.options.exRegion && me.options.exRegion !== "") me.searchSuffix += "&exregion=" + me.options.exRegion;
        if (me.options.inRegion && me.options.inRegion !== "") me.searchSuffix += "&inregion=" + me.options.inRegion;
        if (me.options.exTerritory && me.options.exTerritory !== "") me.searchSuffix += "&exterritory=" + me.options.exTerritory;
        if (me.options.inTerritory && me.options.inTerritory !== "") me.searchSuffix += "&interritory=" + me.options.inTerritory;

        me.requestSuffix = "";
        if (me.options.tag && me.options.tag !== "") me.requestSuffix += "&tag=" + me.options.tag;
        if (me.options.uniqueId && me.options.uniqueId !== "") me.requestSuffix += "&uniqueid=" + me.options.uniqueId;
    }

    me.setOption = function (key, value) {
        if (key && key === "exclude_postbox") {
            me.options.excludePostBox = value;
        } else {
            me.widget.setOption(key, value);
        }
        setSuffix();
    }

    me.setExcludeRural = function (value) {
        me.options.exRural = value;
        setSuffix();
    }
    me.setExcludePostbox = function (value) {
        me.options.excludePostBox = value;
        setSuffix();
    }
    me.setExcludeUndeliverable = function (value) {
        me.options.exUndeliver = value;
        setSuffix();
    }
    me.setExcludeSpelling = function (value) {
        me.options.exSpelling = value;
        setSuffix();
    }
    me.setExcludeWordRemoval = function (value) {
        me.options.exWord = value;
        setSuffix();
    }
    me.setExcludeIpOrder = function (value) {
        me.options.exIp = value;
        setSuffix();
    }
    me.setExcludePostcodes = function (postcodes) {
        me.options.exPostcodes = Array.isArray(postcodes) ? postcodes.join("-") : postcodes;
        setSuffix();
    }
    me.setIncludePostcodes = function (postcodes) {
        me.options.inPostcode = Array.isArray(postcodes) ? postcodes.join("-") : postcodes;
        setSuffix();
    }
    me.setExcludeRegions = function (regions) {
        me.options.exRegion = Array.isArray(regions) ? regions.join("-") : regions;
        setSuffix();
    }
    me.setIncludeRegions = function (regions) {
        me.options.inRegion = Array.isArray(regions) ? regions.join("-") : regions;
        setSuffix();
    }
    me.setExcludeTerritories = function (territories) {
        me.options.exTerritory = Array.isArray(territories) ? territories.join("-") : territories;
        setSuffix();
    }
    me.setIncludeTerritories = function (territories) {
        me.options.inTerritory = Array.isArray(territories) ? territories.join("-") : territories;
        setSuffix();
    }
    me.setTag = function (tag) {
        me.options.tag = tag;
        setSuffix();
    }
    me.setUniqueId = function (uniqueid) {
        me.options.uniqueId = uniqueid;
        setSuffix();
    }

    me.getOption = function (key) {
        return me.widget.getOption(key);
    }

    me.getMaxResults = function () {
        return me.widget.getOption("max_results");
    }

    me.enableLocation = function () {
        me.options.enableLocation = true;
    }
    me.disableLocation = function () {
        me.options.enableLocation = false;
    }

    me.enable = function () {
        me.widget.enable();
    }
    me.disable = function () {
        me.widget.disable();
    }

    me.setPostcodeMode = function (enabled) {
        me.mode = 'postcode';
        me.setOption('empty_content', 'Postcode not found. Please verify the spelling.');
    }

    var onFocus = function (e) {
        if (!me.options.enableLocation || input.value !== "") return;
        me.service._response(me.service.last_query, [{ value: me.getOption("location_content"), data: { id: "location" } }]);
    }

    NeatComplete.addDomEvent(input, "focus", onFocus);

    me._onLocationResultsEmpty = function (message) {
        var emptyContent = me.widget.getOption("empty_content");
        me.options.enableLocation = false;
        me.setOption('empty_content', message);
        // Revert back to the original content message
        setTimeout(function () { me.setOption('empty_content', emptyContent); }, 2000);
    }

    me.handleLocationError = function (error) {
        me.makeRequest('errorlog', '&message=GeoFailCode:' + error.code + ':' + error.message, function (data) { });
        me._onLocationResultsEmpty(me.getOption("location_unavailable"));
        me.service._response(me.service.last_query, []);
        input.placeholder = placeholder;
    }

    me.reverseGeocode = function (position) {
        me.makeRequest('geocode', '&x=' + position.coords.longitude + '&y=' + position.coords.latitude + '&limit=' + me.getMaxResults(), function (data) {
            var results = new Array();

            if (data) {
                for (var i = 0; i < data.addresses.length; i++) {
                    results.push({ value: data.addresses[i].displayname, data: data.addresses[i] });
                }
            }

            if (results.length === 0) {
                me._onLocationResultsEmpty(me.getOption("location_not_found"));
            }

            input.placeholder = placeholder;
            me.service._response(me.service.last_query, results);
        }.bind(this));
    }

    // Allow notification of when an address is selected for custom behaviour
    me.addressSelected = function (address) {

    }
    me.postcodeSelected = function (postcode) {

    }

    me.assignAddressFields = function (address) {
        if (me.fields.address) me.fields.address.value = address.displayline;
        if (me.fields.suburb) me.fields.suburb.value = address.suburb === "" ? (address.mailtown === "" ? address.city : address.mailtown) : address.suburb;
        if (me.fields.city) me.fields.city.value = address.mailtown === "" ? address.city : address.mailtown;
        if (me.fields.territory) me.fields.territory.value = address.territory;
        if (me.fields.x) me.fields.x.value = address.x;
        if (me.fields.y) me.fields.y.value = address.y;
        if (me.fields.dpid) me.fields.dpid.value = address.dpid;
        if (me.fields.id) me.fields.id.value = address.id;
        if (me.fields.postcode) me.fields.postcode.value = address.postcode;
        if (me.fields.rdnumber) me.fields.rdnumber.value = address.rdnumber;
        if (me.fields.line1) me.fields.line1.value = address.address1;
        if (me.fields.line2) me.fields.line2.value = address.address2;
        if (me.fields.line3) me.fields.line3.value = address.address3;
        if (me.fields.line4) me.fields.line4.value = address.address4;

        if (!me.fields.city && me.fields.suburb && address.suburb === "" && (address.city !== "" || address.mailtown !== "")) {
            me.fields.suburb.value = address.mailtown === "" ? address.city : address.mailtown;
        }

        if (me.fields.address1 && me.fields.address2) {
            if (address.address4 || address.address2.indexOf("RD ") === 0) {
                me.fields.address1.value = address.address1;
                me.fields.address2.value = address.address2;
            } else {
                me.fields.address1.value = address.displayline;
                me.fields.address2.value = '';
            }

            // Combine address 1 with address 2 and use address 2 as the suburb
            if (!me.fields.suburb && address.suburb && address.suburb !== "") {
                if (me.fields.address2.value !== "") {
                    me.fields.address1.value += ", " + me.fields.address2.value;
                }
                me.fields.address2.value = address.suburb;
            }
        } else if (me.fields.address1 && !me.fields.address2) {
            me.fields.address1.value = address.displayline;
        }
    }

    me.assignRegion = function (address) {
        var region = me.fields.region;
        if (!region) return;

        if (region.options) {
            address.region = address.region.toUpperCase();
            var regions = [address.region, address.region.replace("'", ""), address.region.replace("-", " - "), address.region.replace("-", " / "), address.region.replace("-", "/")];

            for (var i = 0; i < region.options.length; i++) {
                if (regions.indexOf(region.options[i].text.toUpperCase()) > -1 ||
                    regions.indexOf(region.options[i].value.toUpperCase()) > -1) {
                    region.selectedIndex = i;
                    break;
                }
            }
        } else {
            region.value = address.region;
        }
    }

    me.loadAddress = function (id) {
        me.makeRequest('address/' + id, '', function (address) {
            if (!address) return;
            me.assignAddressFields(address);
            me.assignRegion(address);
            me.addressSelected(address);
        }.bind(this));
    }

    me.loadLocation = function () {
        input.value = "";
        input.placeholder = me.getOption("location_loading");
        navigator.geolocation.getCurrentPosition(me.reverseGeocode, me.handleLocationError);
    }

    me.widget.on('result:select', function (display, item) {
        if (me.mode === 'address') {
            if (item.id === 'location') {
                me.loadLocation();
            } else {
                me.loadAddress(item.id);
            }
        } else {
            me.postcodeSelected(item);
        }
    });

    me.checkDemo = function () {
        if (me.key && me.key.toLowerCase() === "demo-api-key") {
            me.setOption('footer_content', '<b>Demo Mode:</b> Create a free account at <a href="https://www.addy.co.nz/" class="link-active">addy.co.nz</a>');
            return true;
        }
        return false;
    }

    me.checkDemo();
    setSuffix();
    me.makeRequest('searchwarmup', '');
}

// Initialise Addy by CSS class Names
function initAddyByCss() {
    var addressFieldPrefixes = ["", "2-", "3-", "4-"];
    var prefix = "addy-";

    function getByName(name) {
        var item = document.getElementsByClassName(prefix + name);
        return item.length === 1 ? item[0] : null;
    }

    for (var i = 0; i < addressFieldPrefixes.length; i++) {
        var line1 = getByName(addressFieldPrefixes[i] + "line1");

        if (line1 !== null) {
            var fields = {
                address1: line1,
                address2: getByName(addressFieldPrefixes[i] + "line2"),
                suburb: getByName(addressFieldPrefixes[i] + "suburb"),
                city: getByName(addressFieldPrefixes[i] + "city"),
                region: getByName(addressFieldPrefixes[i] + "region"),
                rdnumber: getByName(addressFieldPrefixes[i] + "rdnumber"),
                territory: getByName(addressFieldPrefixes[i] + "territory"),
                postcode: getByName(addressFieldPrefixes[i] + "postcode"),
                dpid: getByName(addressFieldPrefixes[i] + "dpid"),
                id: getByName(addressFieldPrefixes[i] + "id"),
                x: getByName(addressFieldPrefixes[i] + "x"),
                y: getByName(addressFieldPrefixes[i] + "y"),
            }
            var addyComplete = new AddyComplete(line1, fields);
        }
    }
}

// Execute the callback function if it is defined
function callAddyInit() {
    var addyInitCallback = addySettingsFactory.createCallback();
    var initCalled = false;

    if (addyInitCallback) {
        window[addyInitCallback]();
        initCalled = true;
    } else if (typeof initAddy === "function") {
        initAddy();
        initCalled = true;
    }
    if (!initCalled) initAddyByCss();

    if (addySettingsFactory.getLoadCssEnabled()) {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "https://www.addy.co.nz/css/addy.css");
        document.getElementsByTagName("head")[0].appendChild(link);
    }
}

callAddyInit();
