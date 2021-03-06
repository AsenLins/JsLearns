!
function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Sweetalert2 = t()
}(this, function() {
	"use strict";
	var e = {
		title: "",
		titleText: "",
		text: "",
		html: "",
		type: null,
		toast: !1,
		customClass: "",
		target: "body",
		backdrop: !0,
		animation: !0,
		allowOutsideClick: !0,
		allowEscapeKey: !0,
		allowEnterKey: !0,
		showConfirmButton: !0,
		showCancelButton: !1,
		preConfirm: null,
		confirmButtonText: "OK",
		confirmButtonAriaLabel: "",
		confirmButtonColor: null,
		confirmButtonClass: null,
		cancelButtonText: "Cancel",
		cancelButtonAriaLabel: "",
		cancelButtonColor: null,
		cancelButtonClass: null,
		buttonsStyling: !0,
		reverseButtons: !1,
		focusConfirm: !0,
		focusCancel: !1,
		showCloseButton: !1,
		closeButtonAriaLabel: "Close this dialog",
		showLoaderOnConfirm: !1,
		imageUrl: null,
		imageWidth: null,
		imageHeight: null,
		imageAlt: "",
		imageClass: null,
		timer: null,
		width: null,
		padding: null,
		background: null,
		input: null,
		inputPlaceholder: "",
		inputValue: "",
		inputOptions: {},
		inputAutoTrim: !0,
		inputClass: null,
		inputAttributes: {},
		inputValidator: null,
		grow: !1,
		position: "center",
		progressSteps: [],
		currentProgressStep: null,
		progressStepsDistance: null,
		onBeforeOpen: null,
		onOpen: null,
		onClose: null,
		useRejections: !1,
		expectRejections: !1
	},
		t = ["useRejections", "expectRejections"],
		n = function(e) {
			var t = {};
			for (var n in e) t[e[n]] = "swal2-" + e[n];
			return t
		},
		o = n(["container", "shown", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "overlay", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "icon", "image", "input", "has-input", "file", "range", "select", "radio", "checkbox", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen"]),
		i = n(["success", "warning", "info", "question", "error"]),
		r = "SweetAlert2:",
		a = function(e) {
			console.warn(r + " " + e)
		},
		s = function(e) {
			console.error(r + " " + e)
		},
		l = [],
		u = function(e) {
			-1 === l.indexOf(e) && (l.push(e), a(e))
		},
		c = function(e) {
			return "function" == typeof e ? e() : e
		},
		d = {
			previousActiveElement: null,
			previousBodyPadding: null
		},
		p = function() {
			return "undefined" == typeof window || "undefined" == typeof document
		},
		f = function(e) {
			var t = g();
			if (t && (t.parentNode.removeChild(t), O([document.documentElement, document.body], [o["no-backdrop"], o["has-input"], o["toast-shown"]])), !p()) {
				var n = document.createElement("div");
				n.className = o.container, n.innerHTML = m, ("string" == typeof e.target ? document.querySelector(e.target) : e.target).appendChild(n);
				var i = v(),
					r = y(),
					a = j(r, o.input),
					l = j(r, o.file),
					u = r.querySelector("." + o.range + " input"),
					c = r.querySelector("." + o.range + " output"),
					d = j(r, o.select),
					f = r.querySelector("." + o.checkbox + " input"),
					h = j(r, o.textarea);
				i.setAttribute("aria-live", e.toast ? "polite" : "assertive");
				var b = function() {
						$.isVisible() && $.resetValidationError()
					};
				return a.oninput = b, l.onchange = b, d.onchange = b, f.onchange = b, h.oninput = b, u.oninput = function() {
					b(), c.value = u.value
				}, u.onchange = function() {
					b(), u.previousSibling.value = u.value
				}, i
			}
			s("SweetAlert2 requires document to initialize")
		},
		m = ('\n <div role="dialog" aria-modal="true" aria-labelledby="' + o.title + '" aria-describedby="' + o.content + '" class="' + o.popup + '" tabindex="-1">\n   <div class="' + o.header + '">\n     <ul class="' + o.progresssteps + '"></ul>\n     <div class="' + o.icon + " " + i.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + o.icon + " " + i.question + '">?</div>\n     <div class="' + o.icon + " " + i.warning + '">!</div>\n     <div class="' + o.icon + " " + i.info + '">i</div>\n     <div class="' + o.icon + " " + i.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + o.image + '" />\n     <h2 class="' + o.title + '" id="' + o.title + '"></h2>\n     <button type="button" class="' + o.close + '">×</button>\n   </div>\n   <div class="' + o.content + '">\n     <div id="' + o.content + '"></div>\n     <input class="' + o.input + '" />\n     <input type="file" class="' + o.file + '" />\n     <div class="' + o.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + o.select + '"></select>\n     <div class="' + o.radio + '"></div>\n     <label for="' + o.checkbox + '" class="' + o.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + o.textarea + '"></textarea>\n     <div class="' + o.validationerror + '" id="' + o.validationerror + '"></div>\n   </div>\n   <div class="' + o.actions + '">\n     <button type="button" class="' + o.confirm + '">OK</button>\n     <button type="button" class="' + o.cancel + '">Cancel</button>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
		g = function() {
			return document.body.querySelector("." + o.container)
		},
		v = function() {
			return g() ? g().querySelector("." + o.popup) : null
		},
		h = function(e) {
			return g() ? g().querySelector("." + e) : null
		},
		b = function() {
			return h(o.title)
		},
		y = function() {
			return h(o.content)
		},
		w = function() {
			return h(o.image)
		},
		C = function() {
			return h(o.progresssteps)
		},
		x = function() {
			return h(o.validationerror)
		},
		k = function() {
			return h(o.confirm)
		},
		A = function() {
			return h(o.cancel)
		},
		S = function() {
			return h(o.actions)
		},
		B = function() {
			return h(o.close)
		},
		P = function() {
			var e = Array.prototype.slice.call(v().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(e, t) {
				return (e = parseInt(e.getAttribute("tabindex"))) > (t = parseInt(t.getAttribute("tabindex"))) ? 1 : e < t ? -1 : 0
			}),
				t = Array.prototype.slice.call(v().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));
			return function(e) {
				var t = [];
				for (var n in e) - 1 === t.indexOf(e[n]) && t.push(e[n]);
				return t
			}(e.concat(t))
		},
		E = function() {
			return !document.body.classList.contains(o["toast-shown"])
		},
		L = function(e, t) {
			return !!e.classList && e.classList.contains(t)
		},
		T = function(e) {
			if (e.focus(), "file" !== e.type) {
				var t = e.value;
				e.value = "", e.value = t
			}
		},
		q = function(e, t, n) {
			e && t && ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)), t.forEach(function(t) {
				e.forEach ? e.forEach(function(e) {
					n ? e.classList.add(t) : e.classList.remove(t)
				}) : n ? e.classList.add(t) : e.classList.remove(t)
			}))
		},
		V = function(e, t) {
			q(e, t, !0)
		},
		O = function(e, t) {
			q(e, t, !1)
		},
		j = function(e, t) {
			for (var n = 0; n < e.childNodes.length; n++) if (L(e.childNodes[n], t)) return e.childNodes[n]
		},
		N = function(e, t) {
			t || (t = e.id === o.content ? "block" : "flex"), e.style.opacity = "", e.style.display = t
		},
		R = function(e) {
			e.style.opacity = "", e.style.display = "none"
		},
		H = function(e) {
			return e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length)
		},
		I = function() {
			if (p()) return !1;
			var e = document.createElement("div"),
				t = {
					WebkitAnimation: "webkitAnimationEnd",
					OAnimation: "oAnimationEnd oanimationend",
					animation: "animationend"
				};
			for (var n in t) if (t.hasOwnProperty(n) && void 0 !== e.style[n]) return t[n];
			return !1
		}(),
		M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
	function(e) {
		return typeof e
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
	}, D = Object.assign ||
	function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
		}
		return e
	}, U = D({}, e), W = [], z = void 0, K = void 0;
	"undefined" == typeof Promise && s("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");
	var Z = function(e) {
			for (var t in e) $.isValidParameter(t) || a('Unknown parameter "' + t + '"'), $.isDeprecatedParameter(t) && u('The parameter "' + t + '" is deprecated and will be removed in the next major release.')
		},
		_ = function(e) {
			("string" == typeof e.target && !document.querySelector(e.target) || "string" != typeof e.target && !e.target.appendChild) && (a('Target parameter is not valid, defaulting to "body"'), e.target = "body");
			var t = void 0,
				n = v(),
				r = "string" == typeof e.target ? document.querySelector(e.target) : e.target;
			t = n && r && n.parentNode !== r.parentNode ? f(e) : n || f(e), e.width && (t.style.width = "number" == typeof e.width ? e.width + "px" : e.width), e.padding && (t.style.padding = "number" == typeof e.padding ? e.padding + "px" : e.padding), e.background && (t.style.background = e.background);
			for (var l = window.getComputedStyle(t).getPropertyValue("background-color"), u = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), c = 0; c < u.length; c++) u[c].style.backgroundColor = l;
			var d = g(),
				p = b(),
				m = y().querySelector("#" + o.content),
				h = S(),
				x = k(),
				P = A(),
				E = B();
			if (e.titleText ? p.innerText = e.titleText : p.innerHTML = e.title.split("\n").join("<br />"), e.backdrop || V([document.documentElement, document.body], o["no-backdrop"]), e.text || e.html) {
				if ("object" === M(e.html)) if (m.innerHTML = "", 0 in e.html) for (var L = 0; L in e.html; L++) m.appendChild(e.html[L].cloneNode(!0));
				else m.appendChild(e.html.cloneNode(!0));
				else e.html ? m.innerHTML = e.html : e.text && (m.textContent = e.text);
				N(m)
			} else R(m);
			if (e.position in o && V(d, o[e.position]), e.grow && "string" == typeof e.grow) {
				var T = "grow-" + e.grow;
				T in o && V(d, o[T])
			}
			e.showCloseButton ? (E.setAttribute("aria-label", e.closeButtonAriaLabel), N(E)) : R(E), t.className = o.popup, e.toast ? (V([document.documentElement, document.body], o["toast-shown"]), V(t, o.toast)) : V(t, o.modal), e.customClass && V(t, e.customClass);
			var q = C(),
				j = parseInt(null === e.currentProgressStep ? $.getQueueStep() : e.currentProgressStep, 10);
			e.progressSteps.length ? (N(q), function(e) {
				for (; e.firstChild;) e.removeChild(e.firstChild)
			}(q), j >= e.progressSteps.length && a("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), e.progressSteps.forEach(function(t, n) {
				var i = document.createElement("li");
				if (V(i, o.progresscircle), i.innerHTML = t, n === j && V(i, o.activeprogressstep), q.appendChild(i), n !== e.progressSteps.length - 1) {
					var r = document.createElement("li");
					V(r, o.progressline), e.progressStepsDistance && (r.style.width = e.progressStepsDistance), q.appendChild(r)
				}
			})) : R(q);
			for (var H = v().querySelectorAll("." + o.icon), I = 0; I < H.length; I++) R(H[I]);
			if (e.type) {
				var D = !1;
				for (var U in i) if (e.type === U) {
					D = !0;
					break
				}
				if (!D) return s("Unknown alert type: " + e.type), !1;
				var W = t.querySelector("." + o.icon + "." + i[e.type]);
				if (N(W), e.animation) switch (e.type) {
				case "success":
					V(W, "swal2-animate-success-icon"), V(W.querySelector(".swal2-success-line-tip"), "swal2-animate-success-line-tip"), V(W.querySelector(".swal2-success-line-long"), "swal2-animate-success-line-long");
					break;
				case "error":
					V(W, "swal2-animate-error-icon"), V(W.querySelector(".swal2-x-mark"), "swal2-animate-x-mark")
				}
			}
			var z, K, Z = w();
			if (e.imageUrl ? (Z.setAttribute("src", e.imageUrl), Z.setAttribute("alt", e.imageAlt), N(Z), e.imageWidth ? Z.setAttribute("width", e.imageWidth) : Z.removeAttribute("width"), e.imageHeight ? Z.setAttribute("height", e.imageHeight) : Z.removeAttribute("height"), Z.className = o.image, e.imageClass && V(Z, e.imageClass)) : R(Z), e.showCancelButton ? P.style.display = "inline-block" : R(P), e.showConfirmButton ? (K = "display", (z = x).style.removeProperty ? z.style.removeProperty(K) : z.style.removeAttribute(K)) : R(x), e.showConfirmButton || e.showCancelButton ? N(h) : R(h), x.innerHTML = e.confirmButtonText, P.innerHTML = e.cancelButtonText, x.setAttribute("aria-label", e.confirmButtonAriaLabel), P.setAttribute("aria-label", e.cancelButtonAriaLabel), x.className = o.confirm, V(x, e.confirmButtonClass), P.className = o.cancel, V(P, e.cancelButtonClass), e.buttonsStyling) {
				V([x, P], o.styled), e.confirmButtonColor && (x.style.backgroundColor = e.confirmButtonColor), e.cancelButtonColor && (P.style.backgroundColor = e.cancelButtonColor);
				var _ = window.getComputedStyle(x).getPropertyValue("background-color");
				x.style.borderLeftColor = _, x.style.borderRightColor = _
			} else O([x, P], o.styled), x.style.backgroundColor = x.style.borderLeftColor = x.style.borderRightColor = "", P.style.backgroundColor = P.style.borderLeftColor = P.style.borderRightColor = "";
			!0 === e.animation ? O(t, o.noanimation) : V(t, o.noanimation), e.showLoaderOnConfirm && !e.preConfirm && a("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")
		},
		Q = function() {
			null === d.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (d.previousBodyPadding = document.body.style.paddingRight, document.body.style.paddingRight = function() {
				if ("ontouchstart" in window || navigator.msMaxTouchPoints) return 0;
				var e = document.createElement("div");
				e.style.width = "50px", e.style.height = "50px", e.style.overflow = "scroll", document.body.appendChild(e);
				var t = e.offsetWidth - e.clientWidth;
				return document.body.removeChild(e), t
			}() + "px")
		},
		Y = function() {
			if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !L(document.body, o.iosfix)) {
				var e = document.body.scrollTop;
				document.body.style.top = -1 * e + "px", V(document.body, o.iosfix)
			}
		},
		$ = function e() {
			for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
			if ("undefined" != typeof window) {
				if (void 0 === n[0]) return s("SweetAlert2 expects at least 1 attribute!"), !1;
				var r = D({}, U);
				switch (M(n[0])) {
				case "string":
					r.title = n[0], r.html = n[1], r.type = n[2];
					break;
				case "object":
					if (Z(n[0]), D(r, n[0]), r.extraParams = n[0].extraParams, "email" === r.input && null === r.inputValidator) {
						var a = function(e) {
								return new Promise(function(t, n) {
									/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? t() : n("Invalid email address")
								})
							};
						r.inputValidator = r.expectRejections ? a : e.adaptInputValidator(a)
					}
					if ("url" === r.input && null === r.inputValidator) {
						var l = function(e) {
								return new Promise(function(t, n) {
									/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e) ? t() : n("Invalid URL")
								})
							};
						r.inputValidator = r.expectRejections ? l : e.adaptInputValidator(l)
					}
					break;
				default:
					return s('Unexpected type of argument! Expected "string" or "object", got ' + M(n[0])), !1
				}
				_(r);
				var p = g(),
					f = v();
				return new Promise(function(t, n) {
					var i = function(n) {
							e.closePopup(r.onClose), r.useRejections ? t(n) : t({
								value: n
							})
						},
						a = function(o) {
							e.closePopup(r.onClose), r.useRejections ? n(o) : t({
								dismiss: o
							})
						},
						l = function(t) {
							e.closePopup(r.onClose), n(t)
						};
					r.timer && (f.timeout = setTimeout(function() {
						return a("timer")
					}, r.timer));
					var m = function(e) {
							if (!(e = e || r.input)) return null;
							switch (e) {
							case "select":
							case "textarea":
							case "file":
								return j($, o[e]);
							case "checkbox":
								return f.querySelector("." + o.checkbox + " input");
							case "radio":
								return f.querySelector("." + o.radio + " input:checked") || f.querySelector("." + o.radio + " input:first-child");
							case "range":
								return f.querySelector("." + o.range + " input");
							default:
								return j($, o.input)
							}
						};
					r.input && setTimeout(function() {
						var e = m();
						e && T(e)
					}, 0);
					for (var q = function(t) {
							if (r.showLoaderOnConfirm && e.showLoading(), r.preConfirm) {
								e.resetValidationError();
								var n = Promise.resolve().then(function() {
									return r.preConfirm(t, r.extraParams)
								});
								r.expectRejections ? n.then(function(e) {
									return i(e || t)
								}, function(t) {
									e.hideLoading(), t && e.showValidationError(t)
								}) : n.then(function(n) {
									H(x()) ? e.hideLoading() : i(n || t)
								}, function(e) {
									return l(e)
								})
							} else i(t)
						}, D = function(t) {
							var n = t || window.event,
								o = n.target || n.srcElement,
								i = k(),
								s = A(),
								u = i && (i === o || i.contains(o)),
								c = s && (s === o || s.contains(o));
							switch (n.type) {
							case "click":
								if (u && e.isVisible()) if (e.disableButtons(), r.input) {
									var d = function() {
											var e = m();
											if (!e) return null;
											switch (r.input) {
											case "checkbox":
												return e.checked ? 1 : 0;
											case "radio":
												return e.checked ? e.value : null;
											case "file":
												return e.files.length ? e.files[0] : null;
											default:
												return r.inputAutoTrim ? e.value.trim() : e.value
											}
										}();
									if (r.inputValidator) {
										e.disableInput();
										var p = Promise.resolve().then(function() {
											return r.inputValidator(d, r.extraParams)
										});
										r.expectRejections ? p.then(function() {
											e.enableButtons(), e.enableInput(), q(d)
										}, function(t) {
											e.enableButtons(), e.enableInput(), t && e.showValidationError(t)
										}) : p.then(function(t) {
											e.enableButtons(), e.enableInput(), t ? e.showValidationError(t) : q(d)
										}, function(e) {
											return l(e)
										})
									} else q(d)
								} else q(!0);
								else c && e.isVisible() && (e.disableButtons(), a("cancel"))
							}
						}, U = f.querySelectorAll("button"), W = 0; W < U.length; W++) U[W].onclick = D, U[W].onmouseover = D, U[W].onmouseout = D, U[W].onmousedown = D;
					if (B().onclick = function() {
						a("close")
					}, r.toast) f.onclick = function(t) {
						t.target !== f || r.showConfirmButton || r.showCancelButton || r.allowOutsideClick && (e.closePopup(r.onClose), a("overlay"))
					};
					else {
						var Z = !1;
						f.onmousedown = function() {
							p.onmouseup = function(e) {
								p.onmouseup = void 0, e.target === p && (Z = !0)
							}
						}, p.onmousedown = function() {
							f.onmouseup = function(e) {
								f.onmouseup = void 0, (e.target === f || f.contains(e.target)) && (Z = !0)
							}
						}, p.onclick = function(e) {
							Z ? Z = !1 : e.target === p && c(r.allowOutsideClick) && a("overlay")
						}
					}
					var $ = y(),
						J = S(),
						X = k(),
						F = A();
					r.reverseButtons ? X.parentNode.insertBefore(F, X) : X.parentNode.insertBefore(X, F);
					var G = function(e, t) {
							for (var n = P(r.focusCancel), o = 0; o < n.length; o++) {
								(e += t) === n.length ? e = 0 : -1 === e && (e = n.length - 1);
								var i = n[e];
								if (H(i)) return i.focus()
							}
						};
					r.toast && K && (window.onkeydown = z, K = !1), r.toast || K || (z = window.onkeydown, K = !0, window.onkeydown = function(t) {
						var n = t || window.event;
						if ("Enter" !== n.key || n.isComposing) if ("Tab" === n.key) {
							for (var o = n.target || n.srcElement, i = P(r.focusCancel), s = -1, l = 0; l < i.length; l++) if (o === i[l]) {
								s = l;
								break
							}
							n.shiftKey ? G(s, -1) : G(s, 1), n.stopPropagation(), n.preventDefault()
						} else - 1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(n.key) ? document.activeElement === X && H(F) ? F.focus() : document.activeElement === F && H(X) && X.focus() : "Escape" !== n.key && "Esc" !== n.key || !0 !== c(r.allowEscapeKey) || a("esc");
						else if (n.target === m()) {
							if (-1 !== ["textarea", "file"].indexOf(r.input)) return;
							e.clickConfirm(), n.preventDefault()
						}
					}), e.hideLoading = e.disableLoading = function() {
						r.showConfirmButton || (R(X), r.showCancelButton || R(S())), O([f, J], o.loading), f.removeAttribute("aria-busy"), f.removeAttribute("data-loading"), X.disabled = !1, F.disabled = !1
					}, e.getTitle = function() {
						return b()
					}, e.getContent = function() {
						return y()
					}, e.getInput = function() {
						return m()
					}, e.getImage = function() {
						return w()
					}, e.getButtonsWrapper = function() {
						return u("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"), h(o.actions)
					}, e.getActions = function() {
						return S()
					}, e.getConfirmButton = function() {
						return k()
					}, e.getCancelButton = function() {
						return A()
					}, e.isLoading = function() {
						return v().hasAttribute("data-loading")
					}, e.enableButtons = function() {
						X.disabled = !1, F.disabled = !1
					}, e.disableButtons = function() {
						X.disabled = !0, F.disabled = !0
					}, e.enableConfirmButton = function() {
						X.disabled = !1
					}, e.disableConfirmButton = function() {
						X.disabled = !0
					}, e.enableInput = function() {
						var e = m();
						if (!e) return !1;
						if ("radio" === e.type) for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++) t[n].disabled = !1;
						else e.disabled = !1
					}, e.disableInput = function() {
						var e = m();
						if (!e) return !1;
						if (e && "radio" === e.type) for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++) t[n].disabled = !0;
						else e.disabled = !0
					}, e.showValidationError = function(e) {
						var t = x();
						t.innerHTML = e;
						var n = window.getComputedStyle(f);
						t.style.marginLeft = "-" + n.getPropertyValue("padding-left"), t.style.marginRight = "-" + n.getPropertyValue("padding-right"), N(t);
						var i = m();
						i && (i.setAttribute("aria-invalid", !0), i.setAttribute("aria-describedBy", o.validationerror), T(i), V(i, o.inputerror))
					}, e.resetValidationError = function() {
						var e = x();
						R(e);
						var t = m();
						t && (t.removeAttribute("aria-invalid"), t.removeAttribute("aria-describedBy"), O(t, o.inputerror))
					}, e.getProgressSteps = function() {
						return r.progressSteps
					}, e.setProgressSteps = function(e) {
						r.progressSteps = e, _(r)
					}, e.showProgressSteps = function() {
						N(C())
					}, e.hideProgressSteps = function() {
						R(C())
					}, e.enableButtons(), e.hideLoading(), e.resetValidationError(), r.input && V(document.body, o["has-input"]);
					for (var ee = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], te = void 0, ne = 0; ne < ee.length; ne++) {
						var oe = o[ee[ne]],
							ie = j($, oe);
						if (te = m(ee[ne])) {
							for (var re in te.attributes) if (te.attributes.hasOwnProperty(re)) {
								var ae = te.attributes[re].name;
								"type" !== ae && "value" !== ae && te.removeAttribute(ae)
							}
							for (var se in r.inputAttributes) te.setAttribute(se, r.inputAttributes[se])
						}
						ie.className = oe, r.inputClass && V(ie, r.inputClass), R(ie)
					}
					var le, ue, ce, de, pe, fe = void 0;
					switch (r.input) {
					case "text":
					case "email":
					case "password":
					case "number":
					case "tel":
					case "url":
						(te = j($, o.input)).value = r.inputValue, te.placeholder = r.inputPlaceholder, te.type = r.input, N(te);
						break;
					case "file":
						(te = j($, o.file)).placeholder = r.inputPlaceholder, te.type = r.input, N(te);
						break;
					case "range":
						var me = j($, o.range),
							ge = me.querySelector("input"),
							ve = me.querySelector("output");
						ge.value = r.inputValue, ge.type = r.input, ve.value = r.inputValue, N(me);
						break;
					case "select":
						var he = j($, o.select);
						if (he.innerHTML = "", r.inputPlaceholder) {
							var be = document.createElement("option");
							be.innerHTML = r.inputPlaceholder, be.value = "", be.disabled = !0, be.selected = !0, he.appendChild(be)
						}
						fe = function(e) {
							for (var t in e) {
								var n = document.createElement("option");
								n.value = t, n.innerHTML = e[t], r.inputValue.toString() === t && (n.selected = !0), he.appendChild(n)
							}
							N(he), he.focus()
						};
						break;
					case "radio":
						var ye = j($, o.radio);
						ye.innerHTML = "", fe = function(e) {
							for (var t in e) {
								var n = document.createElement("input"),
									i = document.createElement("label"),
									a = document.createElement("span");
								n.type = "radio", n.name = o.radio, n.value = t, r.inputValue.toString() === t && (n.checked = !0), a.innerHTML = e[t], i.appendChild(n), i.appendChild(a), i.
								for = n.id, ye.appendChild(i)
							}
							N(ye);
							var s = ye.querySelectorAll("input");
							s.length && s[0].focus()
						};
						break;
					case "checkbox":
						var we = j($, o.checkbox),
							Ce = m("checkbox");
						Ce.type = "checkbox", Ce.value = 1, Ce.id = o.checkbox, Ce.checked = Boolean(r.inputValue);
						var xe = we.getElementsByTagName("span");
						xe.length && we.removeChild(xe[0]), (xe = document.createElement("span")).innerHTML = r.inputPlaceholder, we.appendChild(xe), N(we);
						break;
					case "textarea":
						var ke = j($, o.textarea);
						ke.value = r.inputValue, ke.placeholder = r.inputPlaceholder, N(ke);
						break;
					case null:
						break;
					default:
						s('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + r.input + '"')
					}
					"select" !== r.input && "radio" !== r.input || (r.inputOptions instanceof Promise ? (e.showLoading(), r.inputOptions.then(function(t) {
						e.hideLoading(), fe(t)
					})) : "object" === M(r.inputOptions) ? fe(r.inputOptions) : s("Unexpected type of inputOptions! Expected object or Promise, got " + M(r.inputOptions))), le = r.animation, ue = r.onBeforeOpen, ce = r.onOpen, de = g(), pe = v(), null !== ue && "function" == typeof ue && ue(pe), le ? (V(pe, o.show), V(de, o.fade), O(pe, o.hide)) : O(pe, o.fade), N(pe), de.style.overflowY = "hidden", I && !L(pe, o.noanimation) ? pe.addEventListener(I, function e() {
						pe.removeEventListener(I, e), de.style.overflowY = "auto"
					}) : de.style.overflowY = "auto", V([document.documentElement, document.body, de], o.shown), E() && (Q(), Y()), d.previousActiveElement = document.activeElement, null !== ce && "function" == typeof ce && setTimeout(function() {
						ce(pe)
					}), r.toast || (c(r.allowEnterKey) ? r.focusCancel && H(F) ? F.focus() : r.focusConfirm && H(X) ? X.focus() : G(-1, 1) : document.activeElement && document.activeElement.blur()), g().scrollTop = 0
				})
			}
		};
	return $.isVisible = function() {
		return !!v()
	}, $.queue = function(e) {
		W = e;
		var t = function() {
				W = [], document.body.removeAttribute("data-swal2-queue-step")
			},
			n = [];
		return new Promise(function(e, o) {
			!
			function o(i, r) {
				i < W.length ? (document.body.setAttribute("data-swal2-queue-step", i), $(W[i]).then(function(a) {
					void 0 !== a.value ? (n.push(a.value), o(i + 1, r)) : (t(), e({
						dismiss: a.dismiss
					}))
				})) : (t(), e({
					value: n
				}))
			}(0)
		})
	}, $.getQueueStep = function() {
		return document.body.getAttribute("data-swal2-queue-step")
	}, $.insertQueueStep = function(e, t) {
		return t && t < W.length ? W.splice(t, 0, e) : W.push(e)
	}, $.deleteQueueStep = function(e) {
		void 0 !== W[e] && W.splice(e, 1)
	}, $.close = $.closePopup = $.closeModal = $.closeToast = function(e) {
		var t = g(),
			n = v();
		if (n) {
			O(n, o.show), V(n, o.hide), clearTimeout(n.timeout), document.body.classList.contains(o["toast-shown"]) || (!
			function() {
				if (d.previousActiveElement && d.previousActiveElement.focus) {
					var e = window.scrollX,
						t = window.scrollY;
					d.previousActiveElement.focus(), void 0 !== e && void 0 !== t && window.scrollTo(e, t)
				}
			}(), window.onkeydown = z, K = !1);
			var i = function() {
					t.parentNode && t.parentNode.removeChild(t), O([document.documentElement, document.body], [o.shown, o["no-backdrop"], o["has-input"], o["toast-shown"]]), E() && (null !== d.previousBodyPadding && (document.body.style.paddingRight = d.previousBodyPadding, d.previousBodyPadding = null), function() {
						if (L(document.body, o.iosfix)) {
							var e = parseInt(document.body.style.top, 10);
							O(document.body, o.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * e
						}
					}())
				};
			I && !L(n, o.noanimation) ? n.addEventListener(I, function e() {
				n.removeEventListener(I, e), L(n, o.hide) && i()
			}) : i(), null !== e && "function" == typeof e && setTimeout(function() {
				e(n)
			})
		}
	}, $.clickConfirm = function() {
		return k().click()
	}, $.clickCancel = function() {
		return A().click()
	}, $.showLoading = $.enableLoading = function() {
		var e = v();
		e || $(""), e = v();
		var t = S(),
			n = k(),
			i = A();
		N(t), N(n, "inline-block"), V([e, t], o.loading), n.disabled = !0, i.disabled = !0, e.setAttribute("data-loading", !0), e.setAttribute("aria-busy", !0), e.focus()
	}, $.isValidParameter = function(t) {
		return e.hasOwnProperty(t) || "extraParams" === t
	}, $.isDeprecatedParameter = function(e) {
		return -1 !== t.indexOf(e)
	}, $.setDefaults = function(e) {
		if (!e || "object" !== (void 0 === e ? "undefined" : M(e))) return s("the argument for setDefaults() is required and has to be a object");
		Z(e);
		for (var t in e) $.isValidParameter(t) && (U[t] = e[t])
	}, $.resetDefaults = function() {
		U = D({}, e)
	}, $.adaptInputValidator = function(e) {
		return function(t, n) {
			return e.call(this, t, n).then(function() {}, function(e) {
				return e
			})
		}
	}, $.noop = function() {}, $.version = "7.6.3", $.
default = $, "undefined" != typeof window && "object" === M(window._swalDefaults) && $.setDefaults(window._swalDefaults), $
}), "undefined" != typeof window && window.Sweetalert2 && (window.sweetAlert = window.swal = window.Sweetalert2);
