/** 
 * Addy autocomplete v1.6.1 
 * 
 * Neat Complete v1.5.10 (c) 2019 AddressFinder https://addressfinder.nz https://addressfinder.com.au https://github.com/AbleTech/neat-complete/blob/develop/LICENSE.md 
 * 
*/
const jsVersion = '1.6.0';
function AddyUrlSettingFactory(e) {
  function t(e) {
    e = e.replace(/[\[\]]/g, "\\$&");
    var t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
      s = t.exec(n);
    return s
      ? s[2]
        ? decodeURIComponent(s[2].replace(/\+/g, " "))
        : ""
      : null;
  }
  function s() {
    var t = document.getElementsByTagName("script");
    e = e.toLowerCase();
    for (
      var s = ["/addy.js", "/addy.min.js"],
        n = 0;
      n < s.length;
      n++
    )
      for (var i = 0; i < t.length; i++)
        if (t[i].src && -1 !== t[i].src.toLowerCase().indexOf(s[n]))
          return t[i].src;
    return console.warn("Script source not found. Name: ", e), "";
  }
  (this.createOptions = function () {
    var e = {};
    return (
      (e.excludePostBox = t("excludePostBox") || !1),
      (e.exRural = t("excludeRural") || !1),
      (e.exUndeliver = t("excludeUndeliver") || !1),
      (e.exSpelling = t("excludeSpelling") || !1),
      (e.exWord = t("excludeWord") || !1),
      (e.exIp = t("excludeIp") || !1),
      (e.exPostcodes = t("excludePostcodes") || ""),
      (e.inPostcode = t("includePostcode") || ""),
      (e.exRegion = t("excludeRegion") || ""),
      (e.inRegion = t("includeRegion") || ""),
      (e.exTerritory = t("excludeTerritory") || ""),
      (e.inTerritory = t("includeTerritory") || ""),
      (e.tag = t("tag") || ""),
      (e.uniqueId = t("uniqueid") || ""),
      (e.maxItems = t("maxItems") || 10),
      (e.enableLocation = !!t("enableLocation") && navigator.geolocation),
      e
    );
  }),
    (this.getCountries = function () {
      var e = t("key") || t("nzKey"),
        s = t("auKey"),
        n = {};
      return (
        e && (n.nz = { urlBase: "https://api-nz.addysolutions.com/", key: e }),
        s && (n.au = { urlBase: "https://api-au.addysolutions.com/", key: s }),
        n
      );
    }),
    (this.getCountryCode = function () {
      return t("country");
    }),
    (this.countryTranslator = function (e) {
      return e
        ? ((e = e.toLowerCase()),
          "nz" === e || "nzl" === e
            ? "nz"
            : "au" === e || "aus" === e
            ? "au"
            : e)
        : "nz";
    }),
    (this.createCallback = function () {
      var e = t("callback");
      return e && "function" == typeof window[e] ? e : null;
    }),
    (this.getLoadCssEnabled = function () {
      var e = t("loadcss");
      return e && "true" === e;
    }),
    (this.createGuid = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (e) {
          var t = (16 * Math.random()) | 0,
            s = "x" == e ? t : (3 & t) | 8;
          return s.toString(16);
        }
      );
    });
  var n = s(e);
}
function AddyComplete(e, t) {
  function s(e) {
    return e
      .replace(/\\/gi, "/")
      .replace(/[^0-9a-z' /]/gi, "")
      .trim();
  }
  function n() {
    (i.searchSuffix = "&max=" + i.getMaxResults()),
      i.options.excludePostBox && (i.searchSuffix += "&expostbox=true"),
      i.options.exUndeliver && (i.searchSuffix += "&exundeliver=true"),
      i.options.exRural && (i.searchSuffix += "&exrural=true"),
      i.options.exSpelling && (i.searchSuffix += "&exspelling=true"),
      i.options.exWord && (i.searchSuffix += "&exword=true"),
      i.options.exIp && (i.searchSuffix += "&exip=true"),
      i.options.exPostcodes &&
        "" !== i.options.exPostcodes &&
        (i.searchSuffix += "&expostcode=" + i.options.exPostcodes),
      i.options.inPostcode &&
        "" !== i.options.inPostcode &&
        (i.searchSuffix += "&inpostcode=" + i.options.inPostcode),
      i.options.exRegion &&
        "" !== i.options.exRegion &&
        (i.searchSuffix += "&exregion=" + i.options.exRegion),
      i.options.inRegion &&
        "" !== i.options.inRegion &&
        (i.searchSuffix += "&inregion=" + i.options.inRegion),
      i.options.exTerritory &&
        "" !== i.options.exTerritory &&
        (i.searchSuffix += "&exterritory=" + i.options.exTerritory),
      i.options.inTerritory &&
        "" !== i.options.inTerritory &&
        (i.searchSuffix += "&interritory=" + i.options.inTerritory),
      (i.requestSuffix = ""),
      i.options.tag &&
        "" !== i.options.tag &&
        (i.requestSuffix += "&tag=" + i.options.tag),
      i.options.uniqueId &&
        "" !== i.options.uniqueId &&
        (i.requestSuffix += "&uniqueid=" + i.options.uniqueId);
  }
  if (e) {
    var i = this;
    (i.searchSuffix = ""),
      (i.requestSuffix = ""),
      (i.fields = t || {}),
      (i.mode = "address"),
      (i.options = addySettingsFactory.createOptions()),
      (i.countries = addySettingsFactory.getCountries()),
      (i.country =
        i.countries[
          addySettingsFactory.countryTranslator(
            addySettingsFactory.getCountryCode()
          )
        ]);
    var o = addySettingsFactory.createGuid(),
      r = e.placeholder;
    (i.makeRequest = function (e, t, s, n) {
      i.country
        ? reqwest({
            url:
              i.country.urlBase +
              e +
              "?key=" +
              i.country.key +
              i.requestSuffix +
              "&v=neat_2_3_0&session=" +
              o +
              t,
            crossOrigin: !0,
            success: function (e) {
              s && s(e);
            },
            error: function (e) {
              console.warn("Request failed: ", e), n && n(e);
            },
          })
        : console.warn("An API key in URL query attribute 'nzKey' for 'country=nz' or 'auKey' for 'country=au' must be specified.");
    }),
      (i.searchRequest = function (e, t, s) {
        i.makeRequest(
          e,
          t,
          function (e) {
            s(e), i.service.endSearch();
          },
          function (e) {
            i.widget &&
              ((i.widget.error_content =
                '"Request Failed:\n' + (e.message || e)),
              i.service.endSearch());
          }
        );
      }),
      (i.widget = new NeatComplete.Widget(e, {
        empty_content:
          "<b>Address not found.</b> Please verify the spelling.<br />For brand new addresses, please type it in manually.",
        location_content: "Addresses near me",
        location_unavailable:
          "Location information unavailable. Please type in your address.",
        location_not_found:
          "No nearby addresses found. Please type in your address.",
        location_loading: "Loading your location...",
        max_results: i.options.maxItems,
        timeout: 50,
      }));
    var a = null;
    (i.service = i.widget.addService(
      "addy",
      function (e, t) {
        try {
          a = new RegExp("(" + s(e).split(" ").join("|") + ")", "gi");
        } catch (e) {
          a = null;
        }
        "address" === i.mode
          ? i.searchRequest("search", i.searchSuffix + "&s=" + e, function (s) {
              var n = new Array();
              if (s)
                for (var i = 0; i < s.addresses.length; i++)
                  n.push({ value: s.addresses[i].a, data: s.addresses[i] });
              t(e, n);
            })
          : i.searchRequest(
              "postcode",
              "&max=" + i.getMaxResults() + "&s=" + e,
              function (s) {
                var n = new Array();
                if (s)
                  for (var i = 0; i < s.postcodes.length; i++) {
                    var o = s.postcodes[i];
                    n.push({
                      value:
                        o.suburb +
                        ("" === o.suburb ? "" : ", ") +
                        o.city +
                        ("" === o.city ? "" : ", ") +
                        o.postcode,
                      data: o,
                    });
                  }
                t(e, n);
              }
            );
      },
      {
        renderer: function (e, t) {
          var s = i.widget.getOption("highlight_class");
          return null === a
            ? e
            : e.replace(
                a,
                '<span class="' +
                  (void 0 === s ? "nc_highlight" : s) +
                  '">$1</span>'
              );
        },
      }
    )),
      (i.service.timer = null),
      (i.service.endSearch = function () {
        this.timer && clearTimeout(this.timer), (this._ready = !0);
      }),
      (i.service.search = function (e) {
        if (!(e.length < 3))
          return (
            (i.widget.error_content = null),
            (this.last_query = e),
            (this._ready = !1),
            (this.timer = setTimeout(function () {
              this._ready = !0;
            }, 3200)),
            this.search_fn(e, this.response)
          );
      }),
      (i.setOption = function (e, t) {
        e && "exclude_postbox" === e
          ? (i.options.excludePostBox = t)
          : i.widget.setOption(e, t),
          n();
      }),
      (i.setExcludeRural = function (e) {
        (i.options.exRural = e), n();
      }),
      (i.setExcludePostbox = function (e) {
        (i.options.excludePostBox = e), n();
      }),
      (i.setExcludeUndeliverable = function (e) {
        (i.options.exUndeliver = e), n();
      }),
      (i.setExcludeSpelling = function (e) {
        (i.options.exSpelling = e), n();
      }),
      (i.setExcludeWordRemoval = function (e) {
        (i.options.exWord = e), n();
      }),
      (i.setExcludeIpOrder = function (e) {
        (i.options.exIp = e), n();
      }),
      (i.setExcludePostcodes = function (e) {
        (i.options.exPostcodes = Array.isArray(e) ? e.join("-") : e), n();
      }),
      (i.setIncludePostcodes = function (e) {
        (i.options.inPostcode = Array.isArray(e) ? e.join("-") : e), n();
      }),
      (i.setExcludeRegions = function (e) {
        (i.options.exRegion = Array.isArray(e) ? e.join("-") : e), n();
      }),
      (i.setIncludeRegions = function (e) {
        (i.options.inRegion = Array.isArray(e) ? e.join("-") : e), n();
      }),
      (i.setExcludeTerritories = function (e) {
        (i.options.exTerritory = Array.isArray(e) ? e.join("-") : e), n();
      }),
      (i.setIncludeTerritories = function (e) {
        (i.options.inTerritory = Array.isArray(e) ? e.join("-") : e), n();
      }),
      (i.setTag = function (e) {
        (i.options.tag = e), n();
      }),
      (i.setUniqueId = function (e) {
        (i.options.uniqueId = e), n();
      }),
      (i.getOption = function (e) {
        return i.widget.getOption(e);
      }),
      (i.getMaxResults = function () {
        return i.widget.getOption("max_results");
      }),
      (i.enableLocation = function () {
        i.options.enableLocation = !0;
      }),
      (i.disableLocation = function () {
        i.options.enableLocation = !1;
      }),
      (i.enable = function () {
        i.widget.enable();
      }),
      (i.disable = function () {
        i.widget.disable();
      }),
      (i.setCountry = function (e) {
        (i.country = i.countries[addySettingsFactory.countryTranslator(e)]),
          i.country ? i.enable() : i.disable();
      }),
      (i.setPostcodeMode = function (e) {
        (i.mode = "postcode"),
          i.setOption(
            "empty_content",
            "Postcode not found. Please verify the spelling."
          );
      });
    var l = function (t) {
      i.options.enableLocation &&
        "" === e.value &&
        i.service._response(i.service.last_query, [
          { value: i.getOption("location_content"), data: { id: "location" } },
        ]);
    };
    NeatComplete.addDomEvent(e, "focus", l),
      (i._onLocationResultsEmpty = function (e) {
        var t = i.widget.getOption("empty_content");
        (i.options.enableLocation = !1),
          i.setOption("empty_content", e),
          setTimeout(function () {
            i.setOption("empty_content", t);
          }, 2e3);
      }),
      (i.handleLocationError = function (t) {
        i.makeRequest(
          "errorlog",
          "&message=GeoFailCode:" + t.code + ":" + t.message,
          function (e) {}
        ),
          i._onLocationResultsEmpty(i.getOption("location_unavailable")),
          i.service._response(i.service.last_query, []),
          (e.placeholder = r);
      }),
      (i.reverseGeocode = function (t) {
        i.makeRequest(
          "geocode",
          "&x=" +
            t.coords.longitude +
            "&y=" +
            t.coords.latitude +
            "&limit=" +
            i.getMaxResults(),
          function (t) {
            var s = new Array();
            if (t)
              for (var n = 0; n < t.addresses.length; n++)
                s.push({
                  value: t.addresses[n].displayname,
                  data: t.addresses[n],
                });
            0 === s.length &&
              i._onLocationResultsEmpty(i.getOption("location_not_found")),
              (e.placeholder = r),
              i.service._response(i.service.last_query, s);
          }.bind(this)
        );
      }),
      (i.addressSelected = function (e) {}),
      (i.postcodeSelected = function (e) {}),
      (i.assignAddressFields = function (e) {
        (e.displayline = e.displayline || e.address1),
          i.fields.address && (i.fields.address.value = e.displayline),
          i.fields.suburb &&
            (i.fields.suburb.value = e.suburb),
          i.fields.city &&
            (i.fields.city.value =
              ("" === e.mailtown ? e.city : e.mailtown) || e.state),
          i.fields.state && (i.fields.state.value = e.state),
          i.fields.region && (i.fields.region.value = e.region),
          i.fields.territory && (i.fields.territory.value = e.territory),
          i.fields.x && (i.fields.x.value = e.x),
          i.fields.y && (i.fields.y.value = e.y),
          i.fields.dpid && (i.fields.dpid.value = e.dpid),
          i.fields.id && (i.fields.id.value = e.id),
          i.fields.postcode && (i.fields.postcode.value = e.postcode),
          i.fields.rdnumber && (i.fields.rdnumber.value = e.rdnumber),
          i.fields.line1 && (i.fields.line1.value = e.address1),
          i.fields.line2 && (i.fields.line2.value = e.address2),
          i.fields.line3 && (i.fields.line3.value = e.address3),
          i.fields.line4 && (i.fields.line4.value = e.address4),
          i.fields.city ||
            !i.fields.suburb ||
            "" !== e.suburb ||
            ("" === e.city && "" === e.mailtown)
             ,
          i.fields.address1 && i.fields.address2
            ? (e.address4 || 0 === e.address2.indexOf("RD ")
                ? ((i.fields.address1.value = e.address1),
                  (i.fields.address2.value = e.address2))
                : ((i.fields.address1.value = e.displayline),
                  (i.fields.address2.value = "")),
              !i.fields.suburb &&
                e.suburb &&
                "" !== e.suburb &&
                ("" !== i.fields.address2.value &&
                  (i.fields.address1.value += ", " + i.fields.address2.value),
                (i.fields.address2.value = e.suburb)))
            : i.fields.address1 &&
              !i.fields.address2 &&
              (i.fields.address1.value = e.displayline);
      }),
      (i.assignRegion = function (e) {
        var t = i.fields.region;
        if (t)
          if (t.options) {
            e.region = e.region.toUpperCase();
            for (
              var s = [
                  e.region,
                  e.region.replace("'", ""),
                  e.region.replace("-", " - "),
                  e.region.replace("-", " / "),
                  e.region.replace("-", "/"),
                ],
                n = 0;
              n < t.options.length;
              n++
            )
              if (
                s.indexOf(t.options[n].text.toUpperCase()) > -1 ||
                s.indexOf(t.options[n].value.toUpperCase()) > -1
              ) {
                t.selectedIndex = n;
                break;
              }
          } else t.value = e.region;
      }),
      (i.loadAddress = function (e) {
        i.makeRequest(
          "address/" + e,
          "",
          function (e) {
            e &&
              (i.assignAddressFields(e),
              i.assignRegion(e),
              i.addressSelected(e));
          }.bind(this)
        );
      }),
      (i.loadLocation = function () {
        (e.value = ""),
          (e.placeholder = i.getOption("location_loading")),
          navigator.geolocation.getCurrentPosition(
            i.reverseGeocode,
            i.handleLocationError
          );
      }),
      i.widget.on("result:select", function (e, t) {
        "address" === i.mode
          ? "location" === t.id
            ? i.loadLocation()
            : i.loadAddress(t.id)
          : i.postcodeSelected(t);
      }),
      (i.checkDemo = function () {
        return (
          !(
            !i.country ||
            !i.country.key ||
            "demo-api-key" !== i.country.key.toLowerCase()
          ) &&
          (i.setOption(
            "footer_content",
            '<b>Demo Mode:</b> Create a free account at <a href="https://www.addysolutions.com/" class="link-active">addysolutions.com</a>'
          ),
          !0)
        );
      }),
      i.checkDemo(),
      n(),
      i.makeRequest("searchwarmup", "");
  } else console.warn("Input field is missing");
}
function initAddyByCss() {
  function e(e) {
    var t = document.getElementsByClassName(s + e);
    return 1 === t.length ? t[0] : null;
  }
  for (var t = ["", "2-", "3-", "4-"], s = "addy-", n = 0; n < t.length; n++) {
    var i = e(t[n] + "line1");
    if (null !== i) {
      var o = {
        address1: i,
        address2: e(t[n] + "line2"),
        suburb: e(t[n] + "suburb"),
        city: e(t[n] + "city"),
        state: e(t[n] + "state"),
        region: e(t[n] + "region"),
        territory: e(t[n] + "territory"),
        postcode: e(t[n] + "postcode"),
        rdnumber: e(t[n] + "rdnumber"),
        dpid: e(t[n] + "dpid"),
        id: e(t[n] + "id"),
        x: e(t[n] + "x"),
        y: e(t[n] + "y"),
      };
      new AddyComplete(i, o);
    }
  }
}
function callAddyInit() {
  var e = addySettingsFactory.createCallback(),
    t = !1;
  if (
    (e
      ? (window[e](), (t = !0))
      : "function" == typeof initAddy && (initAddy(), (t = !0)),
    t || initAddyByCss(),
    addySettingsFactory.getLoadCssEnabled())
  ) {
    var s = document.createElement("link");
    s.setAttribute("rel", "stylesheet"),
      s.setAttribute("type", "text/css"),      
      s.setAttribute("href", "https://www.addysolutions.com/address-lookup/"+jsVersion+"/css/addy.min.css"),
      document.getElementsByTagName("head")[0].appendChild(s);
  }
}
(function () {
  var e = [].slice,
    t = function (e, t) {
      return function () {
        return e.apply(t, arguments);
      };
    },
    s = function (e, t) {
      function s() {
        this.constructor = e;
      }
      for (var i in t) n.call(t, i) && (e[i] = t[i]);
      return (
        (s.prototype = t.prototype),
        (e.prototype = new s()),
        (e.__super__ = t.prototype),
        e
      );
    },
    n = {}.hasOwnProperty;
  !(function (e, t) {
    "function" == typeof define && define.amd
      ? define(function () {
          return t(e);
        })
      : (e.NeatComplete = t(e));
  })(this, function (n) {
    var i;
    return (
      (i = {}),
      (i.VERSION = "1.5.10"),
      (i.addDomEvent = function (e, t, s) {
        var n;
        return e.addEventListener
          ? e.addEventListener(t, s, !1)
          : ((n = function () {
              return s.apply(e, arguments);
            }),
            e.attachEvent("on" + t, n));
      }),
      (i.removeDomEvent = function (e, t, s) {
        e.removeEventListener
          ? e.removeEventListener(t, s, !1)
          : e.detachEvent && e.detachEvent("on" + t, null);
      }),
      (i.addClass = function (e, t) {
        return (
          i.classNameExists(e, t) || ((t = " " + t), (e.className += t)), e
        );
      }),
      (i.removeClass = function (e, t) {
        var s, n, i, o, r;
        for (
          r = [], n = e.className.split(" "), i = 0, o = n.length;
          i < o;
          i++
        )
          (s = n[i]) !== t && r.push(s);
        return (e.className = r.join(" ")), e;
      }),
      (i.classNameExists = function (e, t) {
        var s, n, i;
        for (s = e.className.split(" "), n = 0, i = s.length; n < i; n++)
          if (s[n] === t) return !0;
        return !1;
      }),
      Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (e) {
          var t, s, n, i;
          if (null == this) throw new TypeError();
          if (((i = Object(this)), 0 == (s = i.length >>> 0))) return -1;
          if (
            ((n = 0),
            arguments.length > 0 &&
              ((n = Number(arguments[1])),
              n != n
                ? (n = 0)
                : 0 !== n &&
                  1 / 0 !== n &&
                  -1 / 0 !== n &&
                  (n = (n > 0 || -1) * Math.floor(Math.abs(n)))),
            n >= s)
          )
            return -1;
          for (t = n >= 0 ? n : Math.max(s - Math.abs(n), 0); t < s; ) {
            if (t in i && i[t] === e) return t;
            t++;
          }
          return -1;
        }),
      (i.Dispatch = (function () {
        function t() {}
        return (
          (t.prototype.setOption = function (e, t) {
            return (this.options[e] = t), this;
          }),
          (t.prototype.getOption = function (e) {
            return this.options[e];
          }),
          (t.prototype.on = function (e, t) {
            var s;
            return (
              null == this.subs && (this.subs = {}),
              null == (s = this.subs)[e] && (s[e] = []),
              this.subs[e].push(t),
              this
            );
          }),
          (t.prototype.trigger = function () {
            var t, s, n, i, o, r, a;
            if (
              ((n = arguments[0]),
              (t = 2 <= arguments.length ? e.call(arguments, 1) : []),
              null != (null != (r = this.subs) ? r[n] : void 0))
            )
              for (a = this.subs[n], i = 0, o = a.length; i < o; i++)
                (s = a[i]), s.apply(this, t);
            return this;
          }),
          t
        );
      })()),
      (i.Widget = (function (e) {
        function n(e, s) {
          (this.element = e),
            (this.options = null != s ? s : {}),
            (this._onPaste = t(this._onPaste, this)),
            (this._onBlur = t(this._onBlur, this)),
            (this._onKeyDown = t(this._onKeyDown, this)),
            (this._onKeyPress = t(this._onKeyPress, this)),
            (this._onFocus = t(this._onFocus, this)),
            (this.enabled = !0),
            (this.searchQueued = !1),
            this.element.getAttribute("autocomplete") ||
              this.element.setAttribute("autocomplete", "off"),
            (this.services = []),
            this._applyDefaults(),
            null == this.getOption("container") &&
              this.setOption("container", window.document.body),
            this._addListeners(),
            (this.output = document.createElement("ul")),
            (this.output.className = this.options.list_class),
            this._applyStyle("display", "none"),
            this._applyStyle("position", this.options.position),
            this.options.container.appendChild(this.output);
        }
        return (
          s(n, e),
          (n.prototype.defaults = {
            max_results: 10,
            list_class: "nc_list",
            item_class: "nc_item",
            hover_class: "nc_hover",
            footer_class: "nc_footer",
            empty_class: "nc_empty",
            error_class: "nc_error",
            icon_class: "nc_icon",
            hidden_icon_class: "nc_hidden",
            position: "absolute",
            timeout: 400,
            ignore_returns: !0,
          }),
          (n.prototype.addService = function (e, t, s) {
            var n;
            return (
              null == s && (s = {}),
              this.services.push((n = new i.Service(this, e, t, s))),
              n
            );
          }),
          (n.prototype.disable = function () {
            return (
              (this.enabled = !1),
              this.icon &&
                i.addClass(this.icon, this.options.hidden_icon_class),
              (this.output.innerHTML = ""),
              this
            );
          }),
          (n.prototype.enable = function () {
            return (
              (this.enabled = !0),
              this.icon &&
                i.removeClass(this.icon, this.options.hidden_icon_class),
              this
            );
          }),
          (n.prototype.destroy = function () {
            document.body.removeChild(this.output),
              this.element.removeAttribute("autocomplete"),
              this.icon &&
                (document.body.removeChild(this.icon),
                window.removeEventListener("resize", this._resetIconPosition));
          }),
          (n.prototype._applyDefaults = function () {
            var e, t, s, n;
            for (e in ((t = this.defaults), (s = []), t))
              (n = t[e]),
                null == this.getOption(e)
                  ? s.push(this.setOption(e, n))
                  : s.push(void 0);
            return s;
          }),
          (n.prototype._addListeners = function () {
            return (
              i.addDomEvent(this.element, "focus", this._onFocus),
              i.addDomEvent(this.element, "keypress", this._onKeyPress),
              i.addDomEvent(this.element, "keydown", this._onKeyDown),
              i.addDomEvent(this.element, "blur", this._onBlur),
              i.addDomEvent(this.element, "paste", this._onPaste)
            );
          }),
          (n.prototype._removeListeners = function () {
            return (
              i.removeDomEvent(this.element, "focus", this._onFocus),
              i.removeDomEvent(this.element, "keypress", this._onKeyPress),
              i.removeDomEvent(this.element, "keydown", this._onKeyDown),
              i.removeDomEvent(this.element, "blur", this._onBlur),
              i.removeDomEvent(this.element, "paste", this._onPaste)
            );
          }),
          (n.prototype._onFocus = function (e) {
            return (this.focused = !0);
          }),
          (n.prototype._onKeyPress = function (e) {
            var t, s, n;
            if (((s = e.which || e.keyCode), this.visible && 13 === s))
              return (
                null != (n = this.highlighted) && n.selectItem(),
                (t = this.getOption("ignore_returns")),
                t && e.preventDefault
                  ? e.preventDefault()
                  : t && (e.returnValue = !1),
                (this.highlighted = null)
              );
          }),
          (n.prototype._onKeyDown = function (e) {
            var t;
            switch (e.which || e.keyCode) {
              case 38:
                return this.visible && this._moveHighlight(-1), !1;
              case 40:
                return this.visible && this._moveHighlight(1), !1;
              case 9:
                if (this.visible)
                  return null != (t = this.highlighted)
                    ? t.selectItem()
                    : void 0;
                break;
              case 27:
                return this._hideResults();
              case 37:
              case 39:
              case 13:
                break;
              default:
                return this._getSuggestionsWithTimeout();
            }
          }),
          (n.prototype._onBlur = function (e) {
            if (!this.mouseDownOnSelect)
              return (this.focused = !1), this._hideResults();
          }),
          (n.prototype._onPaste = function (e) {
            return this._getSuggestionsWithTimeout();
          }),
          (n.prototype._moveHighlight = function (e) {
            var t, s, n, i;
            return (
              (t =
                null != this.highlighted
                  ? this.results.indexOf(this.highlighted)
                  : -1),
              null != (n = this.highlighted) && n.unhighlight(),
              (t += e),
              t < -1
                ? (t = this.results.length - 1)
                : t >= this.results.length && (t = -1),
              null != (i = this.results[t]) && i.highlight(),
              (s = void 0 !== this._val ? this._val : ""),
              (this.element.value =
                null != this.highlighted ? this.highlighted.value : s)
            );
          }),
          (n.prototype._getSuggestionsWithTimeout = function () {
            return (
              null != this._timeout && clearTimeout(this._timeout),
              (this._timeout = setTimeout(
                ((e = this),
                function () {
                  return e._getSuggestions();
                }),
                this.options.timeout
              ))
            );
          }),
          (n.prototype._getSuggestions = function () {
            var e, t, s, n, i;
            if (this.enabled) {
              if (!this._servicesReady()) return void (this.searchQueued = !0);
              if (
                ((this._val = this.element.value),
                (this.error_content = null),
                "" !== this._val)
              ) {
                for (s = this.services, n = [], e = 0, t = s.length; e < t; e++)
                  (i = s[e]), n.push(i.search(this._val));
                return n;
              }
              return this._hideResults();
            }
          }),
          (n.prototype._applyStyle = function (e, t) {
            return (this.output.style[e] = t);
          }),
          (n.prototype._getVerticalOffset = function () {
            return (
              window.pageYOffset ||
              (document.documentElement && document.documentElement.scrollTop)
            );
          }),
          (n.prototype._getPosition = function () {
            var e, t;
            return (
              (e = this.element),
              (t = this._getVerticalOffset()),
              {
                top: t + e.getBoundingClientRect().top + e.offsetHeight,
                left: e.getBoundingClientRect().left,
              }
            );
          }),
          (n.prototype._hideResults = function () {
            var e, t, s, n, i;
            for (
              this.visible = !1,
                this._applyStyle("display", "none"),
                this.results = [],
                s = this.services,
                n = [],
                e = 0,
                t = s.length;
              e < t;
              e++
            )
              (i = s[e]), n.push((i.results = []));
            return n;
          }),
          (n.prototype._displayResults = function () {
            var e;
            return (
              (this.visible = !0),
              (e = this._getPosition()),
              this.options.container === document.body &&
                (this._applyStyle("left", e.left + "px"),
                this._applyStyle("top", e.top + "px")),
              this._applyStyle("display", "block")
            );
          }),
          (n.prototype._renderItem = function (e, t) {
            var s;
            return (
              (s = document.createElement("li")),
              (s.innerHTML = e),
              null != t && (s.className = t),
              i.addDomEvent(
                s,
                "mousedown",
                (function (e) {
                  return function () {
                    return (e.mouseDownOnSelect = !0);
                  };
                })(this)
              ),
              i.addDomEvent(
                s,
                "mouseup",
                (function (e) {
                  return function () {
                    return (e.mouseDownOnSelect = !1);
                  };
                })(this)
              ),
              s
            );
          }),
          (n.prototype._renderFooter = function () {
            return this._renderItem(
              this.options.footer_content,
              this.options.footer_class
            );
          }),
          (n.prototype._renderEmpty = function () {
            return this._renderItem(
              this.options.empty_content,
              this.options.empty_class
            );
          }),
          (n.prototype._servicesReady = function () {
            var e, t, s, n, i;
            for (i = [], s = this.services, e = 0, t = s.length; e < t; e++)
              (n = s[e]), i.push(n.ready());
            return i.indexOf(!1) < 0;
          }),
          (n.prototype.showResults = function () {
            var e, t, s, n, i, o, r, a, l;
            if (this._servicesReady()) {
              for (
                this.searchQueued &&
                  (this._getSuggestions(), (this.searchQueued = !1)),
                  this.results = [],
                  this.output.innerHTML = "",
                  o = this.services,
                  t = 0,
                  n = o.length;
                t < n;
                t++
              )
                (l = o[t]), (this.results = this.results.concat(l.results));
              if (this.results.length) {
                for (
                  this.results = this.results.sort(function (e, t) {
                    return t.score - e.score;
                  }),
                    this.results = this.results.slice(
                      0,
                      +(this.getOption("max_results") - 1) + 1 || 9e9
                    ),
                    r = this.results,
                    s = 0,
                    i = r.length;
                  s < i;
                  s++
                )
                  (a = r[s]), this.output.appendChild(a.render());
                null != this.options.footer_content &&
                  "" !== (e = this._renderFooter()) &&
                  this.output.appendChild(e),
                  this._displayResults();
              } else
                this.error_content
                  ? (this.output.appendChild(
                      this._renderItem(
                        this.error_content,
                        this.options.error_class
                      )
                    ),
                    this._displayResults())
                  : (null != this.options.empty_content
                      ? (this.output.appendChild(this._renderEmpty()),
                        this._displayResults())
                      : this._hideResults(),
                    this.trigger("results:empty"));
              this.trigger("results:update");
            }
          }),
          (n.prototype.selectHighlighted = function () {
            (this.element.value = this.highlighted.value),
              this._hideResults(),
              this.trigger(
                "result:select",
                this.highlighted.value,
                this.highlighted.data
              ),
              this._dispatchDOMChangeEvent();
          }),
          (n.prototype._dispatchDOMChangeEvent = function () {
            var e;
            if ("function" == typeof Event)
              e = new Event("change", { bubbles: !0, cancellable: !0 });
            else {
              if (void 0 === document.createEvent) return;
              (e = document.createEvent("Event")),
                e.initEvent("change", !0, !0);
            }
            return this.element.dispatchEvent(e);
          }),
          (n.prototype.setIcon = function (e, t) {
            var s, n, o;
            return (
              this.removeIcon(e),
              (n = e.class || "nc_icon"),
              (s = document.createElement("a")),
              i.addClass(s, n),
              (o = this._calculateIconPosition()),
              (s.style.top = o.coords.top + "px"),
              (s.style.left = o.coords.left + "px"),
              (s.style.height = o.size + "px"),
              (s.style.width = o.size + "px"),
              s.addEventListener("click", t),
              (this._resetIconPosition = this.setIcon.bind(this, e, t)),
              window.addEventListener("resize", this._resetIconPosition),
              this.options.container.appendChild(s),
              (this.icon = s)
            );
          }),
          (n.prototype.removeIcon = function (e) {
            return (
              this.icon &&
                (this.icon.parentNode.removeChild(this.icon),
                window.removeEventListener("resize", this._resetIconPosition)),
              (this.icon = null)
            );
          }),
          (n.prototype._calculateIconPosition = function () {
            var e, t, s, n, i;
            return (
              (i = this.element.offsetWidth),
              (s = this.element.offsetHeight),
              (n = this._getPosition()),
              (t = s / 2),
              (e = t / 2.4),
              {
                coords: { top: n.top - t - e, left: n.left + i - t - e },
                size: t,
              }
            );
          }),
          (n.prototype.setInfoPanel = function (e, t) {
            var s, n;
            return (
              (t = t || {}),
              (s = t.class || "af_info_panel"),
              !1 === t.persistant
                ? ((this.output.innerHTML = ""),
                  (n = this._renderItem(e, s)),
                  t.cancellable && this._addCancelButton(n, t),
                  this.output.appendChild(n),
                  this._displayResults())
                : ((this.infoPanel = {}),
                  (this.infoPanel.content = e),
                  (this.infoPanel.options = t))
            );
          }),
          (n.prototype._addCancelButton = function (e, t) {
            var s, n, o;
            return (
              (o = navigator.userAgent),
              (s = o.indexOf("MSIE ") > -1 || o.indexOf("Trident/") > -1),
              (n = document.createElement("span")),
              i.addClass(n, "cancel_button"),
              s && i.addClass(n, "IE"),
              n.addEventListener(
                "click",
                function () {
                  return (this.output.innerHTML = ""), t.cancelHandler();
                }.bind(this)
              ),
              e.appendChild(n)
            );
          }),
          n
        );
      })(i.Dispatch)),
      (i.Service = (function (e) {
        function n(e, s, n, i) {
          (this.widget = e),
            (this.name = s),
            (this.search_fn = n),
            (this.options = null != i ? i : {}),
            (this._response = t(this._response, this)),
            (this.ready = t(this.ready, this)),
            (this.results = []),
            (this._ready = !0),
            (this.response = (function (e) {
              return function (t, s) {
                return e._response.apply(e, arguments);
              };
            })(this));
        }
        return (
          s(n, e),
          (n.prototype.ready = function () {
            return this._ready;
          }),
          (n.prototype.search = function (e) {
            return (
              (this.last_query = e),
              (this._ready = !1),
              this.search_fn(e, this.response)
            );
          }),
          (n.prototype._response = function (e, t) {
            var s, n, o;
            if (((this.results = []), this.last_query === e)) {
              for (this.results = [], n = 0, o = t.length; n < o; n++)
                (s = t[n]), this.results.push(new i._Result(this, s));
              return (this._ready = !0), this.widget.showResults();
            }
          }),
          n
        );
      })(i.Dispatch)),
      (i._Result = (function () {
        function e(e, t) {
          var s, n, i, o;
          (this.service = e),
            (this.options = t),
            (this.widget = this.service.widget),
            (this.renderer =
              this.service.options.renderer || this.widget.options.renderer),
            (this.value = null != (s = this.options) ? s.value : void 0),
            (this.score = (null != (n = this.options) ? n.score : void 0) || 0),
            (this.identifier =
              null != (i = this.options) ? i.identifier : void 0),
            (this.data = (null != (o = this.options) ? o.data : void 0) || {});
        }
        return (
          (e.prototype.render = function () {
            return (
              (this.li = document.createElement("li")),
              (this.li.innerHTML =
                null != this.renderer
                  ? this.renderer(this.value, this.data)
                  : this.value),
              (this.li.className = this.widget.options.item_class),
              this.addEvents(),
              this.li
            );
          }),
          (e.prototype.addEvents = function () {
            return (
              i.addDomEvent(
                this.li,
                "click",
                ((e = this),
                function (t) {
                  return (
                    e.selectItem(),
                    t.preventDefault ? t.preventDefault() : (t.returnValue = !1)
                  );
                })
              ),
              i.addDomEvent(
                this.li,
                "mouseover",
                (function (e) {
                  return function () {
                    return e.highlight();
                  };
                })(this)
              ),
              i.addDomEvent(
                this.li,
                "mouseout",
                (function (e) {
                  return function () {
                    return e.unhighlight();
                  };
                })(this)
              ),
              i.addDomEvent(
                this.li,
                "mousedown",
                (function (e) {
                  return function () {
                    return (e.widget.mouseDownOnSelect = !0);
                  };
                })(this)
              ),
              i.addDomEvent(
                this.li,
                "mouseup",
                (function (e) {
                  return function () {
                    return (e.widget.mouseDownOnSelect = !1);
                  };
                })(this)
              )
            );
          }),
          (e.prototype.selectItem = function () {
            return (
              this.service.trigger("result:select", this.value, this.data),
              (this.widget.highlighted = this),
              this.widget.selectHighlighted()
            );
          }),
          (e.prototype.highlight = function () {
            var e;
            return (
              null != (e = this.widget.highlighted) && e.unhighlight(),
              (this.li.className =
                this.li.className + " " + this.widget.options.hover_class),
              (this.widget.highlighted = this)
            );
          }),
          (e.prototype.unhighlight = function () {
            return (
              (this.widget.highlighted = null),
              (this.li.className = this.li.className.replace(
                new RegExp(this.widget.options.hover_class, "gi"),
                ""
              ))
            );
          }),
          e
        );
      })()),
      i
    );
  });
}.call(this),
  (function (e, t, s) {
    "undefined" != typeof module && module.exports
      ? (module.exports = s())
      : "function" == typeof define && define.amd
      ? define(s)
      : (t[e] = s());
  })("reqwest", this, function () {
    function succeed(e) {
      var t = protocolRe.exec(e.url);
      return (
        (t = (t && t[1]) || context.location.protocol),
        httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response
      );
    }
    function handleReadyState(e, t, s) {
      return function () {
        return e._aborted
          ? s(e.request)
          : e._timedOut
          ? s(e.request, "Request is aborted: timeout")
          : void (
              e.request &&
              4 == e.request[readyState] &&
              ((e.request.onreadystatechange = noop),
              succeed(e) ? t(e.request) : s(e.request))
            );
      };
    }
    function setHeaders(e, t) {
      var s,
        n = t.headers || {};
      n.Accept =
        n.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"];
      var i = "undefined" != typeof FormData && t.data instanceof FormData;
      for (s in (!t.crossOrigin &&
        !n[requestedWith] &&
        (n[requestedWith] = defaultHeaders.requestedWith),
      !n[contentType] &&
        !i &&
        (n[contentType] = t.contentType || defaultHeaders.contentType),
      n))
        n.hasOwnProperty(s) &&
          "setRequestHeader" in e &&
          e.setRequestHeader(s, n[s]);
    }
    function setCredentials(e, t) {
      void 0 !== t.withCredentials &&
        void 0 !== e.withCredentials &&
        (e.withCredentials = !!t.withCredentials);
    }
    function generalCallback(e) {
      lastValue = e;
    }
    function urlappend(e, t) {
      return e + (/\?/.test(e) ? "&" : "?") + t;
    }
    function handleJsonp(e, t, s, n) {
      var i = uniqid++,
        o = e.jsonpCallback || "callback",
        r = e.jsonpCallbackName || reqwest.getcallbackPrefix(i),
        a = new RegExp("((^|\\?|&)" + o + ")=([^&]+)"),
        l = n.match(a),
        u = doc.createElement("script"),
        c = 0,
        d = -1 !== navigator.userAgent.indexOf("MSIE 10.0");
      return (
        l
          ? "?" === l[3]
            ? (n = n.replace(a, "$1=" + r))
            : (r = l[3])
          : (n = urlappend(n, o + "=" + r)),
        (context[r] = generalCallback),
        (u.type = "text/javascript"),
        (u.src = n),
        (u.async = !0),
        void 0 !== u.onreadystatechange &&
          !d &&
          (u.htmlFor = u.id = "_reqwest_" + i),
        (u.onload = u.onreadystatechange =
          function () {
            if (
              (u[readyState] &&
                "complete" !== u[readyState] &&
                "loaded" !== u[readyState]) ||
              c
            )
              return !1;
            (u.onload = u.onreadystatechange = null),
              u.onclick && u.onclick(),
              t(lastValue),
              (lastValue = void 0),
              head.removeChild(u),
              (c = 1);
          }),
        head.appendChild(u),
        {
          abort: function () {
            (u.onload = u.onreadystatechange = null),
              s({}, "Request is aborted: timeout", {}),
              (lastValue = void 0),
              head.removeChild(u),
              (c = 1);
          },
        }
      );
    }
    function getRequest(e, t) {
      var s,
        n = this.o,
        i = (n.method || "GET").toUpperCase(),
        o = "string" == typeof n ? n : n.url,
        r =
          !1 !== n.processData && n.data && "string" != typeof n.data
            ? reqwest.toQueryString(n.data)
            : n.data || null,
        a = !1;
      return (
        ("jsonp" == n.type || "GET" == i) &&
          r &&
          ((o = urlappend(o, r)), (r = null)),
        "jsonp" == n.type
          ? handleJsonp(n, e, t, o)
          : ((s = (n.xhr && n.xhr(n)) || xhr(n)),
            s.open(i, o, !1 !== n.async),
            setHeaders(s, n),
            setCredentials(s, n),
            context[xDomainRequest] && s instanceof context[xDomainRequest]
              ? ((s.onload = e),
                (s.onerror = t),
                (s.onprogress = function () {}),
                (a = !0))
              : (s.onreadystatechange = handleReadyState(this, e, t)),
            n.before && n.before(s),
            a
              ? setTimeout(function () {
                  s.send(r);
                }, 200)
              : s.send(r),
            s)
      );
    }
    function Reqwest(e, t) {
      (this.o = e), (this.fn = t), init.apply(this, arguments);
    }
    function setType(e) {
      if (null !== e)
        return e.match("json")
          ? "json"
          : e.match("javascript")
          ? "js"
          : e.match("text")
          ? "html"
          : e.match("xml")
          ? "xml"
          : void 0;
    }
    function init(o, fn) {
      function complete(e) {
        for (
          o.timeout && clearTimeout(self.timeout), self.timeout = null;
          self._completeHandlers.length > 0;

        )
          self._completeHandlers.shift()(e);
      }
      function success(resp) {
        var type =
          o.type || (resp && setType(resp.getResponseHeader("Content-Type")));
        resp = "jsonp" !== type ? self.request : resp;
        var filteredResponse = globalSetupOptions.dataFilter(
            resp.responseText,
            type
          ),
          r = filteredResponse;
        try {
          resp.responseText = r;
        } catch (e) {}
        if (r)
          switch (type) {
            case "json":
              try {
                resp = context.JSON
                  ? context.JSON.parse(r)
                  : eval("(" + r + ")");
              } catch (e) {
                return error(resp, "Could not parse JSON in response", e);
              }
              break;
            case "js":
              resp = eval(r);
              break;
            case "html":
              resp = r;
              break;
            case "xml":
              resp =
                resp.responseXML &&
                resp.responseXML.parseError &&
                resp.responseXML.parseError.errorCode &&
                resp.responseXML.parseError.reason
                  ? null
                  : resp.responseXML;
          }
        for (
          self._responseArgs.resp = resp,
            self._fulfilled = !0,
            fn(resp),
            self._successHandler(resp);
          self._fulfillmentHandlers.length > 0;

        )
          resp = self._fulfillmentHandlers.shift()(resp);
        complete(resp);
      }
      function timedOut() {
        (self._timedOut = !0), self.request.abort();
      }
      function error(e, t, s) {
        for (
          e = self.request,
            self._responseArgs.resp = e,
            self._responseArgs.msg = t,
            self._responseArgs.t = s,
            self._erred = !0;
          self._errorHandlers.length > 0;

        )
          self._errorHandlers.shift()(e, t, s);
        complete(e);
      }
      (this.url = "string" == typeof o ? o : o.url),
        (this.timeout = null),
        (this._fulfilled = !1),
        (this._successHandler = function () {}),
        (this._fulfillmentHandlers = []),
        (this._errorHandlers = []),
        (this._completeHandlers = []),
        (this._erred = !1),
        (this._responseArgs = {});
      var self = this;
      (fn = fn || function () {}),
        o.timeout &&
          (this.timeout = setTimeout(function () {
            timedOut();
          }, o.timeout)),
        o.success &&
          (this._successHandler = function () {
            o.success.apply(o, arguments);
          }),
        o.error &&
          this._errorHandlers.push(function () {
            o.error.apply(o, arguments);
          }),
        o.complete &&
          this._completeHandlers.push(function () {
            o.complete.apply(o, arguments);
          }),
        (this.request = getRequest.call(this, success, error));
    }
    function reqwest(e, t) {
      return new Reqwest(e, t);
    }
    function normalize(e) {
      return e ? e.replace(/\r?\n/g, "\r\n") : "";
    }
    function serial(e, t) {
      var s,
        n,
        i,
        o,
        r = e.name,
        a = e.tagName.toLowerCase(),
        l = function (e) {
          e &&
            !e.disabled &&
            t(
              r,
              normalize(
                e.attributes.value && e.attributes.value.specified
                  ? e.value
                  : e.text
              )
            );
        };
      if (!e.disabled && r)
        switch (a) {
          case "input":
            /reset|button|image|file/i.test(e.type) ||
              ((s = /checkbox/i.test(e.type)),
              (n = /radio/i.test(e.type)),
              (i = e.value),
              ((!s && !n) || e.checked) &&
                t(r, normalize(s && "" === i ? "on" : i)));
            break;
          case "textarea":
            t(r, normalize(e.value));
            break;
          case "select":
            if ("select-one" === e.type.toLowerCase())
              l(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null);
            else
              for (o = 0; e.length && o < e.length; o++)
                e.options[o].selected && l(e.options[o]);
        }
    }
    function eachFormElement() {
      var e,
        t,
        s = this,
        n = function (e, t) {
          var n, i, o;
          for (n = 0; n < t.length; n++)
            for (o = e[byTag](t[n]), i = 0; i < o.length; i++) serial(o[i], s);
        };
      for (t = 0; t < arguments.length; t++)
        (e = arguments[t]),
          /input|select|textarea/i.test(e.tagName) && serial(e, s),
          n(e, ["input", "select", "textarea"]);
    }
    function serializeQueryString() {
      return reqwest.toQueryString(
        reqwest.serializeArray.apply(null, arguments)
      );
    }
    function serializeHash() {
      var e = {};
      return (
        eachFormElement.apply(function (t, s) {
          t in e
            ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(s))
            : (e[t] = s);
        }, arguments),
        e
      );
    }
    function buildParams(e, t, s, n) {
      var i,
        o,
        r,
        a = /\[\]$/;
      if (isArray(t))
        for (o = 0; t && o < t.length; o++)
          (r = t[o]),
            s || a.test(e)
              ? n(e, r)
              : buildParams(
                  e + "[" + ("object" == typeof r ? o : "") + "]",
                  r,
                  s,
                  n
                );
      else if (t && "[object Object]" === t.toString())
        for (i in t) buildParams(e + "[" + i + "]", t[i], s, n);
      else n(e, t);
    }
    var context = this,
      XHR2;
    if ("window" in context)
      var doc = document,
        byTag = "getElementsByTagName",
        head = doc[byTag]("head")[0];
    else
      try {
        XHR2 = require("xhr2");
      } catch (e) {
        throw new Error(
          "Peer dependency `xhr2` required! Please npm install xhr2"
        );
      }
    var httpsRe = /^http/,
      protocolRe = /(^\w+):\/\//,
      twoHundo = /^(20\d|1223)$/,
      readyState = "readyState",
      contentType = "Content-Type",
      requestedWith = "X-Requested-With",
      uniqid = 0,
      callbackPrefix = "reqwest_" + +new Date(),
      lastValue,
      xmlHttpRequest = "XMLHttpRequest",
      xDomainRequest = "XDomainRequest",
      noop = function () {},
      isArray =
        "function" == typeof Array.isArray
          ? Array.isArray
          : function (e) {
              return e instanceof Array;
            },
      defaultHeaders = {
        contentType: "application/x-www-form-urlencoded",
        requestedWith: xmlHttpRequest,
        accept: {
          "*": "text/javascript, text/html, application/xml, text/xml, */*",
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          js: "application/javascript, text/javascript",
        },
      },
      xhr = function (e) {
        if (!0 === e.crossOrigin) {
          var t = context[xmlHttpRequest] ? new XMLHttpRequest() : null;
          if (t && "withCredentials" in t) return t;
          if (context[xDomainRequest]) return new XDomainRequest();
          throw new Error("Browser does not support cross-origin requests");
        }
        return context[xmlHttpRequest]
          ? new XMLHttpRequest()
          : XHR2
          ? new XHR2()
          : new ActiveXObject("Microsoft.XMLHTTP");
      },
      globalSetupOptions = {
        dataFilter: function (e) {
          return e;
        },
      };
    return (
      (Reqwest.prototype = {
        abort: function () {
          (this._aborted = !0), this.request.abort();
        },
        retry: function () {
          init.call(this, this.o, this.fn);
        },
        then: function (e, t) {
          return (
            (e = e || function () {}),
            (t = t || function () {}),
            this._fulfilled
              ? (this._responseArgs.resp = e(this._responseArgs.resp))
              : this._erred
              ? t(
                  this._responseArgs.resp,
                  this._responseArgs.msg,
                  this._responseArgs.t
                )
              : (this._fulfillmentHandlers.push(e),
                this._errorHandlers.push(t)),
            this
          );
        },
        always: function (e) {
          return (
            this._fulfilled || this._erred
              ? e(this._responseArgs.resp)
              : this._completeHandlers.push(e),
            this
          );
        },
        fail: function (e) {
          return (
            this._erred
              ? e(
                  this._responseArgs.resp,
                  this._responseArgs.msg,
                  this._responseArgs.t
                )
              : this._errorHandlers.push(e),
            this
          );
        },
        catch: function (e) {
          return this.fail(e);
        },
      }),
      (reqwest.serializeArray = function () {
        var e = [];
        return (
          eachFormElement.apply(function (t, s) {
            e.push({ name: t, value: s });
          }, arguments),
          e
        );
      }),
      (reqwest.serialize = function () {
        if (0 === arguments.length) return "";
        var e,
          t,
          s = Array.prototype.slice.call(arguments, 0);
        return (
          (e = s.pop()),
          e && e.nodeType && s.push(e) && (e = null),
          e && (e = e.type),
          (t =
            "map" == e
              ? serializeHash
              : "array" == e
              ? reqwest.serializeArray
              : serializeQueryString),
          t.apply(null, s)
        );
      }),
      (reqwest.toQueryString = function (e, t) {
        var s,
          n,
          i = t || !1,
          o = [],
          r = encodeURIComponent,
          a = function (e, t) {
            (t = "function" == typeof t ? t() : null == t ? "" : t),
              (o[o.length] = r(e) + "=" + r(t));
          };
        if (isArray(e))
          for (n = 0; e && n < e.length; n++) a(e[n].name, e[n].value);
        else for (s in e) e.hasOwnProperty(s) && buildParams(s, e[s], i, a);
        return o.join("&").replace(/%20/g, "+");
      }),
      (reqwest.getcallbackPrefix = function () {
        return callbackPrefix;
      }),
      (reqwest.compat = function (e, t) {
        return (
          e &&
            (e.type && (e.method = e.type) && delete e.type,
            e.dataType && (e.type = e.dataType),
            e.jsonpCallback &&
              (e.jsonpCallbackName = e.jsonpCallback) &&
              delete e.jsonpCallback,
            e.jsonp && (e.jsonpCallback = e.jsonp)),
          new Reqwest(e, t)
        );
      }),
      (reqwest.ajaxSetup = function (e) {
        for (var t in ((e = e || {}), e)) globalSetupOptions[t] = e[t];
      }),
      reqwest
    );
  }));
var addySettingsFactory = new AddyUrlSettingFactory("addy");
callAddyInit();
