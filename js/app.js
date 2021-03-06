(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector(".wrapper")) setTimeout((function() {
            document.querySelector(".wrapper").classList.add("_loaded");
        }), 200);
    }));
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    const choice = document.querySelector(".choice");
    const game = document.querySelector(".game");
    const darts = document.querySelector(".darts");
    const main = document.querySelector(".main");
    const dart = document.querySelector(".darts__dart-single");
    const dart_img = document.querySelector(".darts__dart-single img");
    const shop = document.querySelector(".shop");
    const bingo = document.querySelector(".game__bingo");
    const preloader = document.querySelector(".preloader");
    document.querySelector(".acces-preloader");
    const dart_box = document.querySelectorAll(".darts__dart");
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    let count = 3;
    let unlock = true;
    document.addEventListener("click", (e => {
        const targetElement = e.target;
        if (targetElement.closest(".header-main__item_home")) if (!darts.classList.contains("_hide")) {
            darts.classList.add("_hide");
            choice.classList.remove("_hide");
            document.querySelector(".header-main__item_home").style.display = "none";
        }
        if (targetElement.closest(".acces-preloader__play")) {
            preloader.classList.add("_hide");
            sessionStorage.setItem("preloader", true);
        }
        if (targetElement.closest(".choice__item_darts")) {
            choice.classList.add("_hide");
            darts.classList.remove("_hide");
            document.querySelector(".header-main__item_home").style.display = "block";
        }
        if (targetElement.closest(".darts__body-target")) {
            let delay = 3e3;
            if (unlock) {
                body_lock(delay);
                setTimeout(moveDartNull, 500);
                setTimeout(moveDarts, 1e3);
            }
        }
        if (targetElement.closest(".darts__btn-yes")) {
            count = 3;
            dart_box.forEach((el => {
                el.style.opacity = "1";
            }));
            document.querySelector(".darts__try").classList.add("_hide");
            dart.style.top = `260px`;
            dart.style.left = `-200px`;
            dart.style.transitionDuration = "0.1s";
            dart_img.style.transform = "rotateY(0deg)";
        } else if (targetElement.closest(".darts__btn-no")) {
            darts.classList.add("_hide");
            choice.classList.remove("_hide");
            count = 3;
            dart_box.forEach((el => {
                el.style.opacity = "1";
            }));
            dart.style.top = `260px`;
            dart.style.left = `-200px`;
            dart.style.transitionDuration = "0.1s";
            dart_img.style.transform = "rotateY(0deg)";
            document.querySelector(".header-main__item_home").style.display = "none";
            document.querySelector(".darts__try").classList.add("_hide");
        }
    }));
    function body_lock(delay) {
        let body = document.querySelector("body");
        if (body.classList.contains("_lock")) body_lock_remove(delay); else body_lock_add(delay);
    }
    function body_lock_remove(delay) {
        let body = document.querySelector("body");
        if (unlock) {
            setTimeout((() => {
                body.classList.remove("_lock");
            }), delay);
            unlock = false;
            setTimeout((function() {
                unlock = true;
            }), delay);
        }
    }
    function body_lock_add(delay) {
        let body = document.querySelector("body");
        if (unlock) {
            body.classList.add("_lock");
            unlock = false;
            setTimeout((function() {
                unlock = true;
            }), delay);
        }
    }
    var slot_a, slot_b, slot_c;
    var minTime = 500;
    var maxTime = 2e3;
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    var casino1 = document.querySelector("#game1");
    var casino2 = document.querySelector("#game2");
    var casino3 = document.querySelector("#game3");
    if (casino1 && casino2 && casino3) {
        var mcasino1 = new SlotMachine(casino1, {
            active: 0,
            delay: 100,
            onComplete: function(active) {
                slot_a = this.active;
                console.log(slot_a);
                if (slot_a == slot_b && slot_b == slot_c && slot_a == slot_c && void 0 != slot_a) {
                    bingo.classList.add("_visible");
                    setTimeout((function() {
                        shop.classList.remove("_hide");
                        game.classList.add("_hide");
                        main.classList.remove("_bg-game");
                    }), 1500);
                }
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 100,
            onComplete: function(active) {
                slot_b = this.active;
                console.log(slot_b);
                if (slot_a == slot_b && slot_b == slot_c && slot_a == slot_c && void 0 != slot_a) {
                    bingo.classList.add("_visible");
                    setTimeout((function() {
                        shop.classList.remove("_hide");
                        game.classList.add("_hide");
                        main.classList.remove("_bg-game");
                    }), 1500);
                }
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 1,
            delay: 100,
            onComplete: function(active) {
                slot_c = this.active;
                console.log(slot_c);
                if (slot_a == slot_b && slot_b == slot_c && slot_a == slot_c && void 0 != slot_a) {
                    bingo.classList.add("_visible");
                    setTimeout((function() {
                        shop.classList.remove("_hide");
                        game.classList.add("_hide");
                        main.classList.remove("_bg-game");
                    }), 1500);
                }
            }
        });
    }
    var casinoAutoSpin;
    if (document.querySelector("#spin")) document.querySelector("#spin").addEventListener("click", (e => {
        if (casino1 && casino2 && casino3) {
            clearInterval(casinoAutoSpin);
            mcasino1.shuffle(9999);
            mcasino2.shuffle(9999);
            mcasino3.shuffle(9999);
            setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
        }
        slot_a = 9;
        slot_b = 87;
        slot_c = 56;
    }));
    function addHide() {
        document.querySelector(".darts__try").classList.remove("_hide");
    }
    function moveDartNull() {
        dart.style.transitionTimingFunction = "ease";
        dart.style.transitionDuration = "1s";
        dart.style.top = `260px`;
        dart.style.left = `-200px`;
        dart_img.style.transform = "rotateY(0deg)";
        dart_img.style.transitionDuration = "0.1s";
    }
    function moveDarts() {
        count--;
        dart.style.transitionTimingFunction = "cubic-bezier(1, -0.82, 0.65, 1.67)";
        dart.style.top = `${getRandomArbitrary(50, 240)}px`;
        dart.style.left = `${getRandomArbitrary(-65, 110)}px`;
        dart.style.transitionDuration = "0.6s";
        dart_img.style.transform = "rotateY(45deg)";
        dart_img.style.transitionDuration = "0.6s";
        dart_box.forEach((el => {
            el.style.opacity = "0.2";
        }));
        for (let i = 0; i < count; i++) dart_box[i].style.opacity = "1";
        if (0 == count) setTimeout(addHide, 2e3);
    }
    window["FLS"] = true;
    isWebp();
})();