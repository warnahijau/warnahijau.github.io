! function(a) {
    if ("undefined" == typeof a) return console.error("no jquery?!"), void 0;
    "undefined" == typeof Array.prototype.indexOf && (Array.prototype.indexOf = function(a, b) {
        for (var c = b || 0, d = this.length; d > c; c++)
            if (this[c] === a) return c;
        return -1
    }), {
        chrome: /chrom(e|ium)/.test(navigator.userAgent.toLowerCase())
    };
    var b = {
            capture: function(c) {
                return a.when(b[c.type](c)).then(function(a) {
                    return a === !1 ? (c.stopPropagation(), c.preventDefault(), !1) : !0
                })
            },
            submit: function(a) {
                return a.stopPropagation(), a.preventDefault(), !1
            },
            keydown: function(b) {
                if (27 == b.keyCode) {
                    var e = a(b.target);
                    return e.data("suggest") && c.nearest_suggest_menu(e).removeClass("open"), !0
                }
                if (9 == b.keyCode || 13 == b.keyCode) {
                    var e = a(b.target),
                        f = event.shiftKey,
                        g = a(":focus");
                    return d.pause(), a.when(c.handle_element(a(b.target))).then(function(b) {
                        if (0) {
                            if (b === !1) {
                                var d = c.handle_depends(e);
                                if (e.hasClass("errored")) e.focus();
                                else if (1 != d) return c.get_depends(e).focus(), !1
                            }
                        } else {
                            var h = c.$form();
                            c.$views.length && (h = a(".active_view"));
                            for (var i = h.find("input, textarea, select"), j = !1, k = !1, l = 0; l < i.length; l++) {
                                var m = i.eq(l);
                                if ("none" != m.css("display") && "hidden" != m.attr("type")) {
                                    if (j) {
                                        "prev" == j ? k ? k.focus() : m.focus() : m.focus();
                                        break
                                    }
                                    if (m[0] != g[0]) k = m;
                                    else if (a(document).trigger("click"), j = f ? "prev" : "next", "prev" == j) l -= 1;
                                    else if ("next" == j && l >= i.length - 1) {
                                        m.focus();
                                        break
                                    }
                                }
                            }
                        }
                    }), d.queue(), !1
                }
                return !0
            },
            click: function(b) {
                var d = a(b.target);
                return d.data("finish") ? e.process_registration() : d.data("next") ? c.change_view("next") : d.data("prev") ? c.change_view("prev") : d.is("div") && d.data("suggest-value") && d.data("suggest-field") && c.handle_suggestion_selection(d), !0
            },
            html5_get_geo: function() {
                var b = function(b) {
                    var c = b.coords.latitude,
                        d = b.coords.longitude;
                    a.ajax("/main.php?a=geo.suggest_city", {
                        data: {
                            lat: c,
                            lon: d
                        },
                        success: f.geo_from_cords,
                        error: f.geo_from_cords
                    })
                };
                "undefined" != typeof navigator.geolocation && navigator.geolocation.getCurrentPosition(b)
            }
        },
        c = {
            types: "view-order suggest required validate next prev finish success depends".split(" "),
            monitor_types: "suggest required validate depends".split(" "),
            monitor_types_selector: "",
            types_selector: "",
            $views: [],
            init: function() {
                var d = a("form[data-capture]");
                if (d.length <= 0) return console.error('no captured form present, add data-capture="true" to the form you want captured'), !1;
                this.form_ref = d[0];

                c.$html5_get_geo = d.find("#html5_get_geo"), c.$zip_head = d.find("#flypaper_zip"), c.$city_head = d.find("#flypaper_city"), c.types_selector = c.types.join("^[data-"), c.types_selector = c.types_selector.split("^"), c.types_selector = c.types_selector.join("]^"), c.types_selector = c.types_selector.split("^"), c.types_selector = c.types_selector.join(", "), c.types_selector = "[data-" + c.types_selector + "]", c.monitor_types_selector = c.monitor_types.join("^[data-"), c.monitor_types_selector = c.monitor_types_selector.split("^"), c.monitor_types_selector = c.monitor_types_selector.join("]^"), c.monitor_types_selector = c.monitor_types_selector.split("^"), c.monitor_types_selector = c.monitor_types_selector.join(", "), c.monitor_types_selector = "[data-" + c.monitor_types_selector + "]";
                var g = c.$form().find("[data-view-order]");
                g.length && (g.each(function(b, d) {
                    var e = a(d),
                        f = e.find("[data-required]"),
                        g = e.find("[data-validate]");
                    c.$views.push(e), e.hide(), f.length || g.length
                }), c.$views.sort(c.sort_views), c.$views[0].addClass("active_view"));
                var h = a("[data-suggest]");
                h.length && h.each(function(b, c) {
                    var d = a(c);
                    d.offset();
                    var e = a("<div />").addClass("suggest-menu-wrap").css({
                            left: d.position().left + parseInt(d.css("margin-left")) + "px",
                            "margin-top": -1 * parseInt(d.css("margin-bottom")) + 2 + "px"
                        }),
                        f = a("<div />").addClass("suggest-menu");
                    d.after(e.append(f))
                }), c.$html5_get_geo.length && b.html5_get_geo()
            },
            $form: function() {
                return a(c.form_ref)
            },
            $raw_elem: function(a) {
                return c.$form(!0).find(a)
            },
            sort_views: function(a, b) {
                var c = Number(a.data("view-order")),
                    d = Number(b.data("view-order"));
                return d > c ? -1 : c > d ? 1 : 0
            },
            goto_errored_view: function() {
                if (c.$views.length) {
                    c.$views;
                    for (var b = 0; b < c.$views.length; b++) {
                        var d = a(c.$views[b]),
                            e = d.find(".errored");
                        if (e.length) {
                            a(".active_view").removeClass("active_view"), d.addClass("active_view"), d.find(".errored").first().focus();
                            break
                        }
                    }
                }
            },
            change_view: function(b, d) {
                var e = function(a) {
                    if (a) {
                        for (var e = !1, f = 0; f < c.$views.length; f++) {
                            var g = c.$views[f];
                            g.hasClass("active_view") && (e = f), g.removeClass("active_view")
                        }
                        if (e !== !1) {
                            var h = "prev" == b ? -1 : 1,
                                i = e + h;
                            0 > i ? i = 0 : i >= c.$views.length && (i = c.$views.length - 1), c.$views[i].addClass("active_view");
                            var j = c.$views[i].find("input, textarea, select");
                            d ? j.last().focus() : j.first().focus(), (-1 == h || d) && setTimeout(c.enable_next, 0, c.$views[i]), c.handle_suggestion_positions()
                        }
                    }
                };
                "prev" == b ? e(!0) : a.when(c.handle_validate_active_view(!0)).then(function(a) {
                    a === !0 && e(!0)
                })
            },
            find_nearest: function(a, b) {
                for (var a = c.$raw_elem(a), d = a, e = !1, f = 0; e === !1;) {
                    var g = d.find(b);
                    if (g.length) e = g.eq(0);
                    else {
                        if (d.is("body")) break;
                        if (f >= 300) break
                    }
                    d = d.parent(), f++
                }
                return e
            },
            nearest_suggest_menu: function(a) {
                return c.find_nearest(a, ".suggest-menu-wrap")
            },
            nearest_error: function(a) {
                return c.find_nearest(a, ".error")
            },
            escape_for_selector: function(a) {
                return a = a.replace("[", "\\["), a = a.replace("]", "\\]")
            },
            get_name: function(a) {
                var b = a.attr("name");
                return a.data("pretty-name") ? b = a.data("pretty-name") : a.attr("placeholder") && (b = a.attr("placeholder")), b
            },
            get_value: function(b) {
                var d = [];
                if (b.is("input") && "checkbox" === b.attr("type") || "radio" === b.attr("type")) {
                    for (var e = b.attr("name"), f = "input[name=" + c.escape_for_selector(e) + "]:checked", g = c.$form().find(f), h = 0; h < g.length; h++) d.push(g.eq(h).val());
                    d = d.join(",")
                } else if (b.is("select")) {
                    var i = b.find("option:selected")[0];
                    d = "undefined" == typeof i.attributes.value ? "" : a(i).val()
                } else d = b.val();
                return d = a.trim(d)
            },
            get_depends: function(a) {
                var b = !1;
                return a.data("depends") ? b = c.$form().find("[name=" + c.escape_for_selector(a.data("depends")) + "]") : a.attr("name") && (b = c.$form().find("[data-depends=" + c.escape_for_selector(a.attr("name")) + "]")), b.length ? b : !1
            },
            disable_next: function(a) {
                c.enable_next(a, !1)
            },
            enable_next: function(a, b) {
                return !0;
                if (c.$views.length) {
                    var b = b === !1 ? !1 : !0,
                        d = c.find_nearest(a, "[data-view-order]");
                    d.find(c.types_selector);
                    var e = c.find_nearest(a, "[data-next]");
                    if (e.length)
                        if (b === !1);
                        else {
                            c.handle_validate_active_view()
                        }
                }
            },
            handle_element_deferred: function(a) {
                var b = a.$elem,
                    f = 0,
                    h = 0,
                    i = a.skip_enable_next,
                    j = c.nearest_error(b),
                    k = c.nearest_suggest_menu(b),
                    l = c.get_depends(b);
                e.validating_field(b, !1), g.del_cache(b), l && (l.removeClass("validated errored conflicted"), g.del_cache(l));
                for (var m in a.responses)
                    if (a.responses.hasOwnProperty(m)) {
                        var n = a.responses[m];
                        switch (n) {
                            case "skip":
                                h++;
                                break;
                            case !0:
                                switch (f++, m) {
                                    case "passed_depends":
                                        l && b.data("depends") ? l.addClass("validated") : (c.get_value(l).length ? (l.val(null), g.del_cache(l), d.reset(), k && k.removeClass("open"), g.set_cache(b), i = !0) : (g.del_cache(l), i = !0), "country_code" == b.attr("name") && (c.$city_head.hide(), c.$zip_head.hide(), "US" == c.get_value(b) ? (c.$zip_head.show(), l.attr("placeholder", language.flypaper.zip_code).attr("type", "number")) : (c.$city_head.show(), l.attr("placeholder", language.flypaper.city_name).attr("type", "text"))));
                                        break;
                                    case "passed_validation":
                                        l && b.data("depends") && g.set_cache(l), k && k.removeClass("open")
                                }
                                break;
                            default:
                                switch (m) {
                                    case "passed_required":
                                        l && l.data("depends") && l.val(null), k && k.removeClass("open");
                                        break;
                                    case "passed_depends":
                                        b.data("depends") ? (l.addClass("conflicted"), b.addClass("conflicted")) : l.val(null);
                                        break;
                                    case "passed_validation":
                                        b.data("suggest") && (c.get_value(b).length >= 3 ? (c.handle_suggest(b), b.addClass("errored")) : (k.removeClass("open"), b.addClass("errored")))
                                }
                                return b.hasClass("conflicted") || (i === !1 || "show_errors" === i) && b.addClass("errored"), j && (i === !1 || "show_errors" === i) && j.html(n).addClass("error_show"), !1
                        }
                    }
                return h === a.response_count ? (b.removeClass("errored conflicted validated"), !0) : (b.removeClass("errored conflicted").addClass("validated"), g.set_cache(b), l && b.data("depends") && (l.removeClass("errored conflicted").addClass("validated"), g.set_cache(l)), j && j.html(null).removeClass("error_show"), i === !1 && c.enable_next(b), !0)
            },
            handle_element: function(b, d) {
                if (g.get_cache(b)) return !0;
                c.disable_next(b);
                var f, h, i, j;
                f = h = j = function() {
                    return "skip"
                };
                var i = d || !1;
                if (b.data("required") && (f = c.handle_requirement, "gender" === b.attr("name"))) {
                    var k = b.attr("name");
                    if ("gender" === k) {
                        var l = a("[name=seeking]");
                        l.each(function(d, e) {
                            var f = a(e),
                                g = c.get_value(b).toLowerCase(),
                                h = String(f.val()).toLowerCase();
                            f.prop("checked", !1), "man" === g || "couple" === g ? "woman" === h && f.prop("checked", !0) : "woman" === g && "man" === h && f.prop("checked", !0), "function" == typeof f.iCheck && f.iCheck("update")
                        })
                    }
                }
                return c.get_depends(b) && (j = c.handle_depends), b.data("validate") && (h = c.handle_validation), e.validating_field(b), a.when(b, i, f(b), j(b), h(b)).then(function() {
                    for (var b = ["$elem", "skip_enable_next", "passed_required", "passed_depends", "passed_validation"], d = {
                        response_count: 0,
                        responses: {}
                    }, e = 0; e < b.length; e++) {
                        var f = b[e]; - 1 == f.indexOf("passed_") ? d[f] = "$elem" == f && arguments[e].length ? a(arguments[e][0]) : arguments[e] : (d.responses[f] = arguments[e], d.response_count++)
                    }
                    return a.when(d).then(c.handle_element_deferred)
                })
            },
            handle_requirement: function(a) {
                var b = c.get_value(a);
                if (b.length <= 0) {
                    var d = a.data("required"),
                        e = c.get_name(a);
                    return d === !0 || "true" === d ? language.flypaper.required_err.replace("{name}", e) : d
                }
                return !0
            },
            handle_validate_active_view: function() {
                for (var b = function(b, d) {
                    return a.Deferred(function(e) {
                        var f = !0;
                        "undefined" != typeof d && (f = "show_errors"), g.get_cache(b.eq(0)) ? e.resolve(!0) : a.when(c.handle_element(b)).then(function(a) {
                            e.resolve(a)
                        })
                    }).promise()
                }, d = c.$form().find(".active_view"), e = d.find(c.types_selector), f = [], h = 0; h < e.length; h++) f.push(b(e.eq(h)));
                return a.when.apply(null, f).then(function() {
                    for (result in arguments)
                        if (arguments[result] === !1) return !1;
                    return !0
                })
            },
            handle_validation: function(b) {
                var d = !1;
                b.data("depends") && (d = c.get_value(c.get_depends(b)));
                var e = d ? d + "_" + c.get_value(b) : c.get_value(b),
                    h = g[b.data("validate")],
                    i = {
                        field: b.data("validate"),
                        value: e
                    };
                return a.when(h(e)).then(function(b) {
                    return b !== !0 ? b : a.when(f.validate(i)).then(function(b) {
                        return b.length && (b = a.parseJSON(b), "undefined" != typeof b.error) ? b.error : !0
                    })
                })
            },
            handle_suggest: function(b, d) {
                clearTimeout(e.suggest_timeout_ids[b.attr("name")]);
                var h = c.nearest_suggest_menu(b);
                if (h) {
                    if (d !== !0) return e.suggest_timeout_ids[b.attr("name")] = setTimeout(c.handle_suggest, 500, b, !0), void 0;
                    if (c.handle_depends(b) !== !0) return c.handle_element(b), void 0;
                    if (c.get_value(b).length <= 2) return h.removeClass("open"), c.handle_element(b), void 0;
                    h.addClass("open"), h = h.find(".suggest-menu"), h.empty(), h.html('<div class="suggest-menu-loading"></div>');
                    var i = c.get_value(b),
                        j = c.get_value(c.get_depends(b));
                    a.when(f.get_cities(j, i)).then(function(c) {
                        if (h.empty(), c.length) {
                            for (var d = 0; d < c.length; d++) {
                                var e = a("<div/>").addClass("suggest-menu-option").attr("title", c[d].label).data("suggest-field", b.attr("name")).data("suggest-value", c[d].value).html(c[d].label);
                                h.append(e)
                            }
                            g.get_cache(b) === !1 ? h.addClass("open") : h.removeClass("open")
                        } else h.append('<div class="suggest-menu-error">' + language.flypaper.no_matches + "</div>")
                    })
                }
            },
            handle_depends: function(a) {
                var b = c.get_depends(a),
                    d = c.get_value(a),
                    e = !1;
                if (b)
                    if (e = c.get_value(b), a.data("depends")) {
                        if (e.length <= 0) {
                            var f = c.get_name(a),
                                g = c.get_name(b);
                            return language.flypaper.depends_err.replace("{field_1}", f).replace("{field_2}", g)
                        }
                    } else if (d.length <= 0) {
                    var f = c.get_name(a),
                        g = c.get_name(b);
                    return language.flypaper.depends_err.replace("{field_1}", g).replace("{field_2}", f)
                }
                return !0
            },
            handle_suggestion_selection: function(a) {
                var b = c.nearest_suggest_menu(a),
                    d = c.find_nearest(a, "[name=" + c.escape_for_selector(a.data("suggest-field")) + "]");
                g.del_cache(d), d.val(a.data("suggest-value")).focus(), b.removeClass("open")
            },
            handle_suggestion_positions: function() {
                var b = c.$form().find(".suggest-menu-wrap");
                b.each(function(b, d) {
                    var e = a(d),
                        f = c.find_nearest(e, "[data-suggest]");
                    f.offset(), e.css({
                        left: f.position().left + parseInt(f.css("margin-left")) + "px",
                        "margin-top": -1 * parseInt(f.css("margin-bottom")) + 2 + "px"
                    })
                })
            }
        },
        d = {
            speed: 250,
            snapshot: !1,
            history_depth: 2,
            validation_delay: 1.5,
            validation_timers: {},
            delim: "<^>",
            geom: !1,
            timeout_id: 0,
            activity_detected: [],
            validation_required: [],
            init: function() {
                d.snapshot = d.new_snapshot();
                for (var a = d.snapshot.split(d.delim), b = 0; b < a.length; b++) {
                    var e = a[b].match(/^\(\[([0-9a-z_\s]+)\]([\w\si@.-]+)?\)$/),
                        f = e[1],
                        g = e[2];
                    if (g && g.length) {
                        var h = c.$form().find("[name=" + f + "]");
                        if ("country_code" == h.attr("name")) continue;
                        d.proceed_with_validation(h)
                    }
                }
                d.queue()
            },
            queue: function() {
                d.pause(), d.timeout_id = setTimeout(d.poll, d.speed)
            },
            pause: function() {
                clearTimeout(d.timeout_id)
            },
            reset: function() {
                d.pause(), d.snapshot = d.new_snapshot(), d.purge_validation_required(), d.queue()
            },
            stop: function() {
                clearTimeout(d.timeout_id), d.purge_validation_required()
            },
            poll: function() {
                d.pause(), d.check_positions(), d.compare_snapshots(), d.queue()
            },
            purge_validation_required: function() {
                d.validation_required = []
            },
            check_positions: function() {
                var b = a(window),
                    e = a("body"),
                    f = [b.width(), b.height(), e.prop("scrollHeight"), e.prop("scrollWidth")].join(d.delim);
                d.geom === f && (d.geom = f, c.handle_suggestion_positions())
            },
            remove_validation_required: function(a) {
                for (var b = [], c = 0; c < d.validation_required.length; c++) d.validation_required[c] !== a && b.push(d.validation_required[c]);
                d.validation_required = b
            },
            new_snapshot: function() {
                for (var a = c.$form().find(c.monitor_types_selector), b = [], e = 0; e < a.length; e++) {
                    var f = a.eq(e);
                    if ("undefined" != typeof f.attr("name")) {
                        var g = "[" + f.attr("name") + "]",
                            h = "(" + g + c.get_value(f) + ")"; - 1 == b.indexOf(h) && b.push(h)
                    }
                }
                return b.join(d.delim)
            },
            find_change: function(a, b) {
                var c = function(a, b) {
                        var a = a.split(d.delim),
                            c = Math.floor(.5 * a.length);
                        return a = b ? a.slice(c) : a.slice(0, c), a.join(d.delim)
                    },
                    e = "",
                    f = c(a),
                    g = c(b),
                    h = c(a, !0),
                    i = c(b, !0);
                if (f != g && h != i ? e = b : f != g ? (h = c(f, !0), i = c(g, !0), f = c(f), g = c(g), f != g && (e += g), h != i && (e += i)) : h != i && (f = c(h), g = c(i), h = c(h, !0), i = c(i, !0), f != g && (e += g), h != i && (e += i)), e = e.split(d.delim), e.length > 1) {
                    for (var j = [], k = 0; k < e.length; k++) - 1 == a.indexOf(e[k]) && j.push(e[k].match(/[\w]+/g)[0]);
                    e = j
                } else e = [e[0].match(/[\w]+/g)[0]];
                return e
            },
            compare_snapshots: function() {
                var a = d.new_snapshot();
                if (d.snapshot !== a) {
                    var b = d.find_change(d.snapshot, a);
                    b.length && (d.validation_required = b), d.snapshot = a
                }
                if (d.validation_required.length)
                    for (var e = 0; e < d.validation_required.length; e++) {
                        var f = d.validation_required[e],
                            g = c.$form().find("[name=" + c.escape_for_selector(f) + "]");
                        g.is("input[type=text]") || g.is("textarea") ? g.data("suggest") ? d.queue_validation(g, 250) : d.queue_validation(g) : d.proceed_with_validation(g)
                    }
            },
            queue_validation: function(a, b) {
                var e = a.attr("name"),
                    f = b ? b : 1e3 * d.validation_delay;
                d.remove_validation_required(e), "undefined" != typeof d.validation_timers[e] && clearTimeout(d.validation_timers[e]), d.validation_timers[e] = setTimeout(c.handle_element, f, a)
            },
            proceed_with_validation: function(b) {
                b = c.$raw_elem(b), d.remove_validation_required(b.attr("name")), b = a(b[0]), c.handle_element(b)
            }
        },
        e = {
            resize_throttle_id: 0,
            suggest_timeout_ids: {},
            init: function() {
                c.$form().on("submit keydown click", b.capture)
            },
            validating_field: function(a, b) {
                var c = !0;
                "undefined" != typeof b && (c = !1), c ? a.addClass("validating").removeClass("validated") : a.removeClass("validating")
            },
            process_registration: function() {
                var b = [],
                    d = c.$form().find("input, textarea, select");
                d.each(function(e, g) {
                    a.when(c.handle_element(a(g), "show_errors")).then(function(a) {
                        b.push(a), b.length == d.length && (-1 === b.indexOf(!1) ? f.process_registration(c.$form().serializeArray()) : c.goto_errored_view())
                    })
                })
            }
        },
        f = {
            get_cities: function(b, c) {
                var d = [{
                    name: "location_name",
                    value: c
                }, {
                    name: "country_code",
                    value: b
                }, {
                    name: "ajax_request",
                    value: "yes"
                }, {
                    name: "jq",
                    value: "yes"
                }];
                return a.when(a.ajax("/main.php?a=geo.suggest_city", {
                    contentType: "JSON",
                    data: d
                })).then(function(a) {
                    for (var c = [], d = 0; d < a.length; d++) {
                        var e = a[d].desc,
                            f = a[d].desc.split(",")[0];
                        "US" == b && (f = a[d].location_id), c.push({
                            label: e,
                            value: f
                        })
                    }
                    return c
                })
            },
            validate: function(b) {
                return a.when(a.ajax("/main.php?a=user.validate_data", {
                    contentType: "JSON",
                    data: b
                })).done(function(a) {
                    return a
                })
            },
            process_registration: function(b) {
                for (var c = !1, d = b.length - 1; d > 0; --d)
                    if ("mobile_reg" === b[d].name) {
                        c = !0, b.push({
                            name: "secret_key",
                            value: "_scamfree"
                        });
                        break
                    }
                b.push({
                    name: "a",
                    value: c ? "user.register" : "user.register_iframe"
                }), b.push({
                    name: "ajax_registration",
                    value: !0
                }), b.push({
                    name: "process",
                    value: "Submit"
                }), a.ajax("/main.php", {
                    type: "POST",
                    dataType: "JSON",
                    data: b,
                    success: f.registration_success,
                    error: f.registration_error
                })
            },
            registration_success: function(b) {
                if (b) {
                    var d = !1,
                        e = !1;
                    if ("undefined" != typeof b.errors)
                        if (d = b.errors, "undefined" != typeof b.errors.errors && (d = b.errors.errors), "undefined" != typeof b.errors.error_fields && null != b.errors.error_fields && b.errors.error_fields.length && (e = b.errors.error_fields), "undefined" != typeof b.error_fields && null != b.error_fields && b.error_fields.length && (e = b.error_fields), e) {
                            for (var f in d)
                                if (d.hasOwnProperty(f)) {
                                    var h = "[name=" + c.escape_for_selector(f) + "]",
                                        i = a(h);
                                    if (i.length) {
                                        var j = c.nearest_error(i.eq(0));
                                        j.html(d[f]).addClass("error_show"), g.del_cache(i), i.addClass("errored")
                                    }
                                }
                            c.goto_errored_view()
                        } else {
                            for (var k = "", l = 0; l < d.length; l++) k += d[l] + "\n\n";
                            alert(k)
                        } else if ("undefined" != typeof b.success && "undefined" != typeof b.redirect_url) {
                        var m = b.redirect_url;
                        window.location.href = m
                    }
                }
            },
            registration_error: function() {},
            geo_from_cords: function(b) {
                var e = a("[name=country_code]"),
                    f = a("[name=location_id]"),
                    g = b.desc;
                c.get_value(e) != b.country_code && show_country_options(), "US" == b.country_code && (g = b.location_id), d.pause(), e.val(b.country_code), d.proceed_with_validation(e), f.val(g), d.proceed_with_validation(f), d.reset()
            }
        },
        g = {
            processing_queue: [],
            cache: {},
            set_cache: function(a, b) {
                var e = a.attr("name");
                if (e) {
                    var f = !1;
                    b !== !0 && (f = c.get_value(a)), g.cache[e] = f, d.remove_validation_required(e)
                }
            },
            del_cache: function(a) {
                g.set_cache(a, !0)
            },
            get_cache: function(a) {
                var b = !1,
                    d = !1;
                return "undefined" != typeof g.cache[a.attr("name")] && (d = g.cache[a.attr("name")], d !== !1 && d == c.get_value(a) && (b = !0)), b
            },
            username: function(a) {
                var b = 64,
                    c = 4;
                return 0 != a.length && (a.length < c || a.length > b) ? language.flypaper.username_len_err.replace("{min}", c).replace("{max}", b) : !0
            },
            password: function(a) {
                var b = 16,
                    c = 6;
                return 0 != a.length && (a.length < c || a.length > b) ? language.flypaper.password_len_err.replace("{min}", c).replace("{max}", b) : null === a.match(/[0-9]/g) ? language.flypaper.password_num_err : !0
            },
            email: function(a) {
                var b = a.search(/^[a-z0-9\-_\.+]{1,}@[a-z0-9\-_\.+]/gi);
                return -1 == b ? language.flypaper.email_invalid : !0
            },
            location_id: function(a) {
                var b = a.substring(0, 2),
                    c = a.substring(3);
                if ("US" == b) {
                    var d = c.match(/[^0-9]/gi),
                        e = c.match(/[0-9]/gi);
                    if (d) return language.flypaper.zip_numbers_err;
                    if (null == e || 5 != e.length) return language.flypaper.zip_invalid_err
                } else {
                    var d = c.match(/[^a-z0-9-\s\']/gi);
                    if (3 > c) return language.flypaper.city_len_err;
                    if (d) return language.flypaper.city_char_err
                }
                return !0
            }
        },
        h = {
            init: function() {
                c.init(), d.init(), e.init()
            }
        };
    flypaper = {}, show_country_options = function() {
        a("#country_options").show(), a("#not_in_country_widget").hide()
    }, a(h.init), "undefined" == typeof login_display && (login_display = toggle_password_ph = hide_password_ph = show_password_ph = toggle_email = function() {})
}(jQuery);