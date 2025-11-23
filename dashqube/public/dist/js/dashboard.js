/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Us(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const s of t.split(",")) e[s] = 1;
  return (s) => s in e;
}
const U = {}, de = [], Dt = () => {
}, Jo = () => !1, as = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Bs = (t) => t.startsWith("onUpdate:"), at = Object.assign, Ks = (t, e) => {
  const s = t.indexOf(e);
  s > -1 && t.splice(s, 1);
}, Qo = Object.prototype.hasOwnProperty, W = (t, e) => Qo.call(t, e), R = Array.isArray, pe = (t) => He(t) === "[object Map]", cs = (t) => He(t) === "[object Set]", pn = (t) => He(t) === "[object Date]", F = (t) => typeof t == "function", ot = (t) => typeof t == "string", jt = (t) => typeof t == "symbol", J = (t) => t !== null && typeof t == "object", Un = (t) => (J(t) || F(t)) && F(t.then) && F(t.catch), Bn = Object.prototype.toString, He = (t) => Bn.call(t), zo = (t) => He(t).slice(8, -1), Kn = (t) => He(t) === "[object Object]", qs = (t) => ot(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Te = /* @__PURE__ */ Us(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), us = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (s) => e[s] || (e[s] = t(s));
}, Yo = /-(\w)/g, zt = us(
  (t) => t.replace(Yo, (e, s) => s ? s.toUpperCase() : "")
), Xo = /\B([A-Z])/g, le = us(
  (t) => t.replace(Xo, "-$1").toLowerCase()
), qn = us((t) => t.charAt(0).toUpperCase() + t.slice(1)), vs = us(
  (t) => t ? `on${qn(t)}` : ""
), Qt = (t, e) => !Object.is(t, e), Ge = (t, ...e) => {
  for (let s = 0; s < t.length; s++)
    t[s](...e);
}, Ps = (t, e, s, n = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Ze = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let hn;
const fs = () => hn || (hn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Gs(t) {
  if (R(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++) {
      const n = t[s], o = ot(n) ? sr(n) : Gs(n);
      if (o)
        for (const r in o)
          e[r] = o[r];
    }
    return e;
  } else if (ot(t) || J(t))
    return t;
}
const Zo = /;(?![^(]*\))/g, tr = /:([^]+)/, er = /\/\*[^]*?\*\//g;
function sr(t) {
  const e = {};
  return t.replace(er, "").split(Zo).forEach((s) => {
    if (s) {
      const n = s.split(tr);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function he(t) {
  let e = "";
  if (ot(t))
    e = t;
  else if (R(t))
    for (let s = 0; s < t.length; s++) {
      const n = he(t[s]);
      n && (e += n + " ");
    }
  else if (J(t))
    for (const s in t)
      t[s] && (e += s + " ");
  return e.trim();
}
const nr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", or = /* @__PURE__ */ Us(nr);
function Gn(t) {
  return !!t || t === "";
}
function rr(t, e) {
  if (t.length !== e.length) return !1;
  let s = !0;
  for (let n = 0; s && n < t.length; n++)
    s = ds(t[n], e[n]);
  return s;
}
function ds(t, e) {
  if (t === e) return !0;
  let s = pn(t), n = pn(e);
  if (s || n)
    return s && n ? t.getTime() === e.getTime() : !1;
  if (s = jt(t), n = jt(e), s || n)
    return t === e;
  if (s = R(t), n = R(e), s || n)
    return s && n ? rr(t, e) : !1;
  if (s = J(t), n = J(e), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(t).length, r = Object.keys(e).length;
    if (o !== r)
      return !1;
    for (const i in t) {
      const l = t.hasOwnProperty(i), c = e.hasOwnProperty(i);
      if (l && !c || !l && c || !ds(t[i], e[i]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function ir(t, e) {
  return t.findIndex((s) => ds(s, e));
}
const Jn = (t) => !!(t && t.__v_isRef === !0), L = (t) => ot(t) ? t : t == null ? "" : R(t) || J(t) && (t.toString === Bn || !F(t.toString)) ? Jn(t) ? L(t.value) : JSON.stringify(t, Qn, 2) : String(t), Qn = (t, e) => Jn(e) ? Qn(t, e.value) : pe(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (s, [n, o], r) => (s[_s(n, r) + " =>"] = o, s),
    {}
  )
} : cs(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((s) => _s(s))
} : jt(e) ? _s(e) : J(e) && !R(e) && !Kn(e) ? String(e) : e, _s = (t, e = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    jt(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ht;
class lr {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ht, !e && ht && (this.index = (ht.scopes || (ht.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, s;
      if (this.scopes)
        for (e = 0, s = this.scopes.length; e < s; e++)
          this.scopes[e].pause();
      for (e = 0, s = this.effects.length; e < s; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, s;
      if (this.scopes)
        for (e = 0, s = this.scopes.length; e < s; e++)
          this.scopes[e].resume();
      for (e = 0, s = this.effects.length; e < s; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const s = ht;
      try {
        return ht = this, e();
      } finally {
        ht = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ht, ht = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ht = this.prevScope, this.prevScope = void 0);
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function ar() {
  return ht;
}
let q;
const ws = /* @__PURE__ */ new WeakSet();
class zn {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ht && ht.active && ht.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ws.has(this) && (ws.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Xn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, gn(this), Zn(this);
    const e = q, s = Ct;
    q = this, Ct = !0;
    try {
      return this.fn();
    } finally {
      to(this), q = e, Ct = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        zs(e);
      this.deps = this.depsTail = void 0, gn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ws.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Fs(this) && this.run();
  }
  get dirty() {
    return Fs(this);
  }
}
let Yn = 0, Ae, Oe;
function Xn(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Oe, Oe = t;
    return;
  }
  t.next = Ae, Ae = t;
}
function Js() {
  Yn++;
}
function Qs() {
  if (--Yn > 0)
    return;
  if (Oe) {
    let e = Oe;
    for (Oe = void 0; e; ) {
      const s = e.next;
      e.next = void 0, e.flags &= -9, e = s;
    }
  }
  let t;
  for (; Ae; ) {
    let e = Ae;
    for (Ae = void 0; e; ) {
      const s = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (n) {
          t || (t = n);
        }
      e = s;
    }
  }
  if (t) throw t;
}
function Zn(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function to(t) {
  let e, s = t.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), zs(n), cr(n)) : e = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  t.deps = e, t.depsTail = s;
}
function Fs(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (eo(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function eo(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Fe) || (t.globalVersion = Fe, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Fs(t))))
    return;
  t.flags |= 2;
  const e = t.dep, s = q, n = Ct;
  q = t, Ct = !0;
  try {
    Zn(t);
    const o = t.fn(t._value);
    (e.version === 0 || Qt(o, t._value)) && (t.flags |= 128, t._value = o, e.version++);
  } catch (o) {
    throw e.version++, o;
  } finally {
    q = s, Ct = n, to(t), t.flags &= -3;
  }
}
function zs(t, e = !1) {
  const { dep: s, prevSub: n, nextSub: o } = t;
  if (n && (n.nextSub = o, t.prevSub = void 0), o && (o.prevSub = n, t.nextSub = void 0), s.subs === t && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      zs(r, !0);
  }
  !e && !--s.sc && s.map && s.map.delete(s.key);
}
function cr(t) {
  const { prevDep: e, nextDep: s } = t;
  e && (e.nextDep = s, t.prevDep = void 0), s && (s.prevDep = e, t.nextDep = void 0);
}
let Ct = !0;
const so = [];
function Ut() {
  so.push(Ct), Ct = !1;
}
function Bt() {
  const t = so.pop();
  Ct = t === void 0 ? !0 : t;
}
function gn(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const s = q;
    q = void 0;
    try {
      e();
    } finally {
      q = s;
    }
  }
}
let Fe = 0;
class ur {
  constructor(e, s) {
    this.sub = e, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ys {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!q || !Ct || q === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== q)
      s = this.activeLink = new ur(q, this), q.deps ? (s.prevDep = q.depsTail, q.depsTail.nextDep = s, q.depsTail = s) : q.deps = q.depsTail = s, no(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = q.depsTail, s.nextDep = void 0, q.depsTail.nextDep = s, q.depsTail = s, q.deps === s && (q.deps = n);
    }
    return s;
  }
  trigger(e) {
    this.version++, Fe++, this.notify(e);
  }
  notify(e) {
    Js();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Qs();
    }
  }
}
function no(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let n = e.deps; n; n = n.nextDep)
        no(n);
    }
    const s = t.dep.subs;
    s !== t && (t.prevSub = s, s && (s.nextSub = t)), t.dep.subs = t;
  }
}
const Ds = /* @__PURE__ */ new WeakMap(), ie = Symbol(
  ""
), ks = Symbol(
  ""
), De = Symbol(
  ""
);
function it(t, e, s) {
  if (Ct && q) {
    let n = Ds.get(t);
    n || Ds.set(t, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new Ys()), o.map = n, o.key = s), o.track();
  }
}
function Nt(t, e, s, n, o, r) {
  const i = Ds.get(t);
  if (!i) {
    Fe++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Js(), e === "clear")
    i.forEach(l);
  else {
    const c = R(t), h = c && qs(s);
    if (c && s === "length") {
      const d = Number(n);
      i.forEach((m, T) => {
        (T === "length" || T === De || !jt(T) && T >= d) && l(m);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && l(i.get(s)), h && l(i.get(De)), e) {
        case "add":
          c ? h && l(i.get("length")) : (l(i.get(ie)), pe(t) && l(i.get(ks)));
          break;
        case "delete":
          c || (l(i.get(ie)), pe(t) && l(i.get(ks)));
          break;
        case "set":
          pe(t) && l(i.get(ie));
          break;
      }
  }
  Qs();
}
function ce(t) {
  const e = V(t);
  return e === t ? e : (it(e, "iterate", De), wt(t) ? e : e.map(rt));
}
function ps(t) {
  return it(t = V(t), "iterate", De), t;
}
const fr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ss(this, Symbol.iterator, rt);
  },
  concat(...t) {
    return ce(this).concat(
      ...t.map((e) => R(e) ? ce(e) : e)
    );
  },
  entries() {
    return Ss(this, "entries", (t) => (t[1] = rt(t[1]), t));
  },
  every(t, e) {
    return Ht(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Ht(this, "filter", t, e, (s) => s.map(rt), arguments);
  },
  find(t, e) {
    return Ht(this, "find", t, e, rt, arguments);
  },
  findIndex(t, e) {
    return Ht(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Ht(this, "findLast", t, e, rt, arguments);
  },
  findLastIndex(t, e) {
    return Ht(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Ht(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Cs(this, "includes", t);
  },
  indexOf(...t) {
    return Cs(this, "indexOf", t);
  },
  join(t) {
    return ce(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return Cs(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Ht(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Se(this, "pop");
  },
  push(...t) {
    return Se(this, "push", t);
  },
  reduce(t, ...e) {
    return mn(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return mn(this, "reduceRight", t, e);
  },
  shift() {
    return Se(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Ht(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Se(this, "splice", t);
  },
  toReversed() {
    return ce(this).toReversed();
  },
  toSorted(t) {
    return ce(this).toSorted(t);
  },
  toSpliced(...t) {
    return ce(this).toSpliced(...t);
  },
  unshift(...t) {
    return Se(this, "unshift", t);
  },
  values() {
    return Ss(this, "values", rt);
  }
};
function Ss(t, e, s) {
  const n = ps(t), o = n[e]();
  return n !== t && !wt(t) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.value && (r.value = s(r.value)), r;
  }), o;
}
const dr = Array.prototype;
function Ht(t, e, s, n, o, r) {
  const i = ps(t), l = i !== t && !wt(t), c = i[e];
  if (c !== dr[e]) {
    const m = c.apply(t, r);
    return l ? rt(m) : m;
  }
  let h = s;
  i !== t && (l ? h = function(m, T) {
    return s.call(this, rt(m), T, t);
  } : s.length > 2 && (h = function(m, T) {
    return s.call(this, m, T, t);
  }));
  const d = c.call(i, h, n);
  return l && o ? o(d) : d;
}
function mn(t, e, s, n) {
  const o = ps(t);
  let r = s;
  return o !== t && (wt(t) ? s.length > 3 && (r = function(i, l, c) {
    return s.call(this, i, l, c, t);
  }) : r = function(i, l, c) {
    return s.call(this, i, rt(l), c, t);
  }), o[e](r, ...n);
}
function Cs(t, e, s) {
  const n = V(t);
  it(n, "iterate", De);
  const o = n[e](...s);
  return (o === -1 || o === !1) && en(s[0]) ? (s[0] = V(s[0]), n[e](...s)) : o;
}
function Se(t, e, s = []) {
  Ut(), Js();
  const n = V(t)[e].apply(t, s);
  return Qs(), Bt(), n;
}
const pr = /* @__PURE__ */ Us("__proto__,__v_isRef,__isVue"), oo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(jt)
);
function hr(t) {
  jt(t) || (t = String(t));
  const e = V(this);
  return it(e, "has", t), e.hasOwnProperty(t);
}
class ro {
  constructor(e = !1, s = !1) {
    this._isReadonly = e, this._isShallow = s;
  }
  get(e, s, n) {
    if (s === "__v_skip") return e.__v_skip;
    const o = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return n === (o ? r ? Cr : co : r ? ao : lo).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    const i = R(e);
    if (!o) {
      let c;
      if (i && (c = fr[s]))
        return c;
      if (s === "hasOwnProperty")
        return hr;
    }
    const l = Reflect.get(
      e,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      lt(e) ? e : n
    );
    return (jt(s) ? oo.has(s) : pr(s)) || (o || it(e, "get", s), r) ? l : lt(l) ? i && qs(s) ? l : l.value : J(l) ? o ? uo(l) : Zs(l) : l;
  }
}
class io extends ro {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, o) {
    let r = e[s];
    if (!this._isShallow) {
      const c = Yt(r);
      if (!wt(n) && !Yt(n) && (r = V(r), n = V(n)), !R(e) && lt(r) && !lt(n))
        return c ? !1 : (r.value = n, !0);
    }
    const i = R(e) && qs(s) ? Number(s) < e.length : W(e, s), l = Reflect.set(
      e,
      s,
      n,
      lt(e) ? e : o
    );
    return e === V(o) && (i ? Qt(n, r) && Nt(e, "set", s, n) : Nt(e, "add", s, n)), l;
  }
  deleteProperty(e, s) {
    const n = W(e, s);
    e[s];
    const o = Reflect.deleteProperty(e, s);
    return o && n && Nt(e, "delete", s, void 0), o;
  }
  has(e, s) {
    const n = Reflect.has(e, s);
    return (!jt(s) || !oo.has(s)) && it(e, "has", s), n;
  }
  ownKeys(e) {
    return it(
      e,
      "iterate",
      R(e) ? "length" : ie
    ), Reflect.ownKeys(e);
  }
}
class gr extends ro {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, s) {
    return !0;
  }
  deleteProperty(e, s) {
    return !0;
  }
}
const mr = /* @__PURE__ */ new io(), br = /* @__PURE__ */ new gr(), yr = /* @__PURE__ */ new io(!0);
const js = (t) => t, Ue = (t) => Reflect.getPrototypeOf(t);
function xr(t, e, s) {
  return function(...n) {
    const o = this.__v_raw, r = V(o), i = pe(r), l = t === "entries" || t === Symbol.iterator && i, c = t === "keys" && i, h = o[t](...n), d = s ? js : e ? ts : rt;
    return !e && it(
      r,
      "iterate",
      c ? ks : ie
    ), {
      // iterator protocol
      next() {
        const { value: m, done: T } = h.next();
        return T ? { value: m, done: T } : {
          value: l ? [d(m[0]), d(m[1])] : d(m),
          done: T
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Be(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function vr(t, e) {
  const s = {
    get(o) {
      const r = this.__v_raw, i = V(r), l = V(o);
      t || (Qt(o, l) && it(i, "get", o), it(i, "get", l));
      const { has: c } = Ue(i), h = e ? js : t ? ts : rt;
      if (c.call(i, o))
        return h(r.get(o));
      if (c.call(i, l))
        return h(r.get(l));
      r !== i && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !t && it(V(o), "iterate", ie), Reflect.get(o, "size", o);
    },
    has(o) {
      const r = this.__v_raw, i = V(r), l = V(o);
      return t || (Qt(o, l) && it(i, "has", o), it(i, "has", l)), o === l ? r.has(o) : r.has(o) || r.has(l);
    },
    forEach(o, r) {
      const i = this, l = i.__v_raw, c = V(l), h = e ? js : t ? ts : rt;
      return !t && it(c, "iterate", ie), l.forEach((d, m) => o.call(r, h(d), h(m), i));
    }
  };
  return at(
    s,
    t ? {
      add: Be("add"),
      set: Be("set"),
      delete: Be("delete"),
      clear: Be("clear")
    } : {
      add(o) {
        !e && !wt(o) && !Yt(o) && (o = V(o));
        const r = V(this);
        return Ue(r).has.call(r, o) || (r.add(o), Nt(r, "add", o, o)), this;
      },
      set(o, r) {
        !e && !wt(r) && !Yt(r) && (r = V(r));
        const i = V(this), { has: l, get: c } = Ue(i);
        let h = l.call(i, o);
        h || (o = V(o), h = l.call(i, o));
        const d = c.call(i, o);
        return i.set(o, r), h ? Qt(r, d) && Nt(i, "set", o, r) : Nt(i, "add", o, r), this;
      },
      delete(o) {
        const r = V(this), { has: i, get: l } = Ue(r);
        let c = i.call(r, o);
        c || (o = V(o), c = i.call(r, o)), l && l.call(r, o);
        const h = r.delete(o);
        return c && Nt(r, "delete", o, void 0), h;
      },
      clear() {
        const o = V(this), r = o.size !== 0, i = o.clear();
        return r && Nt(
          o,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    s[o] = xr(o, t, e);
  }), s;
}
function Xs(t, e) {
  const s = vr(t, e);
  return (n, o, r) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? n : Reflect.get(
    W(s, o) && o in n ? s : n,
    o,
    r
  );
}
const _r = {
  get: /* @__PURE__ */ Xs(!1, !1)
}, wr = {
  get: /* @__PURE__ */ Xs(!1, !0)
}, Sr = {
  get: /* @__PURE__ */ Xs(!0, !1)
};
const lo = /* @__PURE__ */ new WeakMap(), ao = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap();
function Er(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Tr(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Er(zo(t));
}
function Zs(t) {
  return Yt(t) ? t : tn(
    t,
    !1,
    mr,
    _r,
    lo
  );
}
function Ar(t) {
  return tn(
    t,
    !1,
    yr,
    wr,
    ao
  );
}
function uo(t) {
  return tn(
    t,
    !0,
    br,
    Sr,
    co
  );
}
function tn(t, e, s, n, o) {
  if (!J(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const r = Tr(t);
  if (r === 0)
    return t;
  const i = o.get(t);
  if (i)
    return i;
  const l = new Proxy(
    t,
    r === 2 ? n : s
  );
  return o.set(t, l), l;
}
function ge(t) {
  return Yt(t) ? ge(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Yt(t) {
  return !!(t && t.__v_isReadonly);
}
function wt(t) {
  return !!(t && t.__v_isShallow);
}
function en(t) {
  return t ? !!t.__v_raw : !1;
}
function V(t) {
  const e = t && t.__v_raw;
  return e ? V(e) : t;
}
function Or(t) {
  return !W(t, "__v_skip") && Object.isExtensible(t) && Ps(t, "__v_skip", !0), t;
}
const rt = (t) => J(t) ? Zs(t) : t, ts = (t) => J(t) ? uo(t) : t;
function lt(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function nt(t) {
  return Ir(t, !1);
}
function Ir(t, e) {
  return lt(t) ? t : new Mr(t, e);
}
class Mr {
  constructor(e, s) {
    this.dep = new Ys(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? e : V(e), this._value = s ? e : rt(e), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const s = this._rawValue, n = this.__v_isShallow || wt(e) || Yt(e);
    e = n ? e : V(e), Qt(e, s) && (this._rawValue = e, this._value = n ? e : rt(e), this.dep.trigger());
  }
}
function Rr(t) {
  return lt(t) ? t.value : t;
}
const Pr = {
  get: (t, e, s) => e === "__v_raw" ? t : Rr(Reflect.get(t, e, s)),
  set: (t, e, s, n) => {
    const o = t[e];
    return lt(o) && !lt(s) ? (o.value = s, !0) : Reflect.set(t, e, s, n);
  }
};
function fo(t) {
  return ge(t) ? t : new Proxy(t, Pr);
}
class Fr {
  constructor(e, s, n) {
    this.fn = e, this.setter = s, this._value = void 0, this.dep = new Ys(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Fe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    q !== this)
      return Xn(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return eo(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function Dr(t, e, s = !1) {
  let n, o;
  return F(t) ? n = t : (n = t.get, o = t.set), new Fr(n, o, s);
}
const Ke = {}, es = /* @__PURE__ */ new WeakMap();
let oe;
function kr(t, e = !1, s = oe) {
  if (s) {
    let n = es.get(s);
    n || es.set(s, n = []), n.push(t);
  }
}
function jr(t, e, s = U) {
  const { immediate: n, deep: o, once: r, scheduler: i, augmentJob: l, call: c } = s, h = (A) => o ? A : wt(A) || o === !1 || o === 0 ? $t(A, 1) : $t(A);
  let d, m, T, O, D = !1, k = !1;
  if (lt(t) ? (m = () => t.value, D = wt(t)) : ge(t) ? (m = () => h(t), D = !0) : R(t) ? (k = !0, D = t.some((A) => ge(A) || wt(A)), m = () => t.map((A) => {
    if (lt(A))
      return A.value;
    if (ge(A))
      return h(A);
    if (F(A))
      return c ? c(A, 2) : A();
  })) : F(t) ? e ? m = c ? () => c(t, 2) : t : m = () => {
    if (T) {
      Ut();
      try {
        T();
      } finally {
        Bt();
      }
    }
    const A = oe;
    oe = d;
    try {
      return c ? c(t, 3, [O]) : t(O);
    } finally {
      oe = A;
    }
  } : m = Dt, e && o) {
    const A = m, et = o === !0 ? 1 / 0 : o;
    m = () => $t(A(), et);
  }
  const Z = ar(), j = () => {
    d.stop(), Z && Z.active && Ks(Z.effects, d);
  };
  if (r && e) {
    const A = e;
    e = (...et) => {
      A(...et), j();
    };
  }
  let $ = k ? new Array(t.length).fill(Ke) : Ke;
  const G = (A) => {
    if (!(!(d.flags & 1) || !d.dirty && !A))
      if (e) {
        const et = d.run();
        if (o || D || (k ? et.some((St, gt) => Qt(St, $[gt])) : Qt(et, $))) {
          T && T();
          const St = oe;
          oe = d;
          try {
            const gt = [
              et,
              // pass undefined as the old value when it's changed for the first time
              $ === Ke ? void 0 : k && $[0] === Ke ? [] : $,
              O
            ];
            $ = et, c ? c(e, 3, gt) : (
              // @ts-expect-error
              e(...gt)
            );
          } finally {
            oe = St;
          }
        }
      } else
        d.run();
  };
  return l && l(G), d = new zn(m), d.scheduler = i ? () => i(G, !1) : G, O = (A) => kr(A, !1, d), T = d.onStop = () => {
    const A = es.get(d);
    if (A) {
      if (c)
        c(A, 4);
      else
        for (const et of A) et();
      es.delete(d);
    }
  }, e ? n ? G(!0) : $ = d.run() : i ? i(G.bind(null, !0), !0) : d.run(), j.pause = d.pause.bind(d), j.resume = d.resume.bind(d), j.stop = j, j;
}
function $t(t, e = 1 / 0, s) {
  if (e <= 0 || !J(t) || t.__v_skip || (s = s || /* @__PURE__ */ new Set(), s.has(t)))
    return t;
  if (s.add(t), e--, lt(t))
    $t(t.value, e, s);
  else if (R(t))
    for (let n = 0; n < t.length; n++)
      $t(t[n], e, s);
  else if (cs(t) || pe(t))
    t.forEach((n) => {
      $t(n, e, s);
    });
  else if (Kn(t)) {
    for (const n in t)
      $t(t[n], e, s);
    for (const n of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, n) && $t(t[n], e, s);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ve(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (o) {
    hs(o, e, s);
  }
}
function Lt(t, e, s, n) {
  if (F(t)) {
    const o = Ve(t, e, s, n);
    return o && Un(o) && o.catch((r) => {
      hs(r, e, s);
    }), o;
  }
  if (R(t)) {
    const o = [];
    for (let r = 0; r < t.length; r++)
      o.push(Lt(t[r], e, s, n));
    return o;
  }
}
function hs(t, e, s, n = !0) {
  const o = e ? e.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = e && e.appContext.config || U;
  if (e) {
    let l = e.parent;
    const c = e.proxy, h = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let m = 0; m < d.length; m++)
          if (d[m](t, c, h) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Ut(), Ve(r, null, 10, [
        t,
        c,
        h
      ]), Bt();
      return;
    }
  }
  Lr(t, s, o, n, i);
}
function Lr(t, e, s, n = !0, o = !1) {
  if (o)
    throw t;
  console.error(t);
}
const ut = [];
let Pt = -1;
const me = [];
let Gt = null, fe = 0;
const po = /* @__PURE__ */ Promise.resolve();
let ss = null;
function ho(t) {
  const e = ss || po;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Hr(t) {
  let e = Pt + 1, s = ut.length;
  for (; e < s; ) {
    const n = e + s >>> 1, o = ut[n], r = ke(o);
    r < t || r === t && o.flags & 2 ? e = n + 1 : s = n;
  }
  return e;
}
function sn(t) {
  if (!(t.flags & 1)) {
    const e = ke(t), s = ut[ut.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= ke(s) ? ut.push(t) : ut.splice(Hr(e), 0, t), t.flags |= 1, go();
  }
}
function go() {
  ss || (ss = po.then(bo));
}
function Vr(t) {
  R(t) ? me.push(...t) : Gt && t.id === -1 ? Gt.splice(fe + 1, 0, t) : t.flags & 1 || (me.push(t), t.flags |= 1), go();
}
function bn(t, e, s = Pt + 1) {
  for (; s < ut.length; s++) {
    const n = ut[s];
    if (n && n.flags & 2) {
      if (t && n.id !== t.uid)
        continue;
      ut.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function mo(t) {
  if (me.length) {
    const e = [...new Set(me)].sort(
      (s, n) => ke(s) - ke(n)
    );
    if (me.length = 0, Gt) {
      Gt.push(...e);
      return;
    }
    for (Gt = e, fe = 0; fe < Gt.length; fe++) {
      const s = Gt[fe];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    Gt = null, fe = 0;
  }
}
const ke = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function bo(t) {
  try {
    for (Pt = 0; Pt < ut.length; Pt++) {
      const e = ut[Pt];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Ve(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Pt < ut.length; Pt++) {
      const e = ut[Pt];
      e && (e.flags &= -2);
    }
    Pt = -1, ut.length = 0, mo(), ss = null, (ut.length || me.length) && bo();
  }
}
let _t = null, yo = null;
function ns(t) {
  const e = _t;
  return _t = t, yo = t && t.type.__scopeId || null, e;
}
function Wr(t, e = _t, s) {
  if (!e || t._n)
    return t;
  const n = (...o) => {
    n._d && Tn(-1);
    const r = ns(e);
    let i;
    try {
      i = t(...o);
    } finally {
      ns(r), n._d && Tn(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Vt(t, e) {
  if (_t === null)
    return t;
  const s = ys(_t), n = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [r, i, l, c = U] = e[o];
    r && (F(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && $t(i), n.push({
      dir: r,
      instance: s,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return t;
}
function se(t, e, s, n) {
  const o = t.dirs, r = e && e.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[n];
    c && (Ut(), Lt(c, s, 8, [
      t.el,
      l,
      t,
      e
    ]), Bt());
  }
}
const Nr = Symbol("_vte"), $r = (t) => t.__isTeleport;
function nn(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, nn(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ur(t, e) {
  return F(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    at({ name: t.name }, e, { setup: t })
  ) : t;
}
function xo(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Ie(t, e, s, n, o = !1) {
  if (R(t)) {
    t.forEach(
      (D, k) => Ie(
        D,
        e && (R(e) ? e[k] : e),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Me(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Ie(t, e, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? ys(n.component) : n.el, i = o ? null : r, { i: l, r: c } = t, h = e && e.r, d = l.refs === U ? l.refs = {} : l.refs, m = l.setupState, T = V(m), O = m === U ? () => !1 : (D) => W(T, D);
  if (h != null && h !== c && (ot(h) ? (d[h] = null, O(h) && (m[h] = null)) : lt(h) && (h.value = null)), F(c))
    Ve(c, l, 12, [i, d]);
  else {
    const D = ot(c), k = lt(c);
    if (D || k) {
      const Z = () => {
        if (t.f) {
          const j = D ? O(c) ? m[c] : d[c] : c.value;
          o ? R(j) && Ks(j, r) : R(j) ? j.includes(r) || j.push(r) : D ? (d[c] = [r], O(c) && (m[c] = d[c])) : (c.value = [r], t.k && (d[t.k] = c.value));
        } else D ? (d[c] = i, O(c) && (m[c] = i)) : k && (c.value = i, t.k && (d[t.k] = i));
      };
      i ? (Z.id = -1, bt(Z, s)) : Z();
    }
  }
}
fs().requestIdleCallback;
fs().cancelIdleCallback;
const Me = (t) => !!t.type.__asyncLoader, vo = (t) => t.type.__isKeepAlive;
function Br(t, e) {
  _o(t, "a", e);
}
function Kr(t, e) {
  _o(t, "da", e);
}
function _o(t, e, s = ft) {
  const n = t.__wdc || (t.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return t();
  });
  if (gs(e, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      vo(o.parent.vnode) && qr(n, e, s, o), o = o.parent;
  }
}
function qr(t, e, s, n) {
  const o = gs(
    e,
    t,
    n,
    !0
    /* prepend */
  );
  wo(() => {
    Ks(n[e], o);
  }, s);
}
function gs(t, e, s = ft, n = !1) {
  if (s) {
    const o = s[t] || (s[t] = []), r = e.__weh || (e.__weh = (...i) => {
      Ut();
      const l = We(s), c = Lt(e, s, t, i);
      return l(), Bt(), c;
    });
    return n ? o.unshift(r) : o.push(r), r;
  }
}
const Kt = (t) => (e, s = ft) => {
  (!Le || t === "sp") && gs(t, (...n) => e(...n), s);
}, Gr = Kt("bm"), Jr = Kt("m"), Qr = Kt(
  "bu"
), zr = Kt("u"), Yr = Kt(
  "bum"
), wo = Kt("um"), Xr = Kt(
  "sp"
), Zr = Kt("rtg"), ti = Kt("rtc");
function ei(t, e = ft) {
  gs("ec", t, e);
}
const si = Symbol.for("v-ndc");
function qe(t, e, s, n) {
  let o;
  const r = s, i = R(t);
  if (i || ot(t)) {
    const l = i && ge(t);
    let c = !1, h = !1;
    l && (c = !wt(t), h = Yt(t), t = ps(t)), o = new Array(t.length);
    for (let d = 0, m = t.length; d < m; d++)
      o[d] = e(
        c ? h ? ts(rt(t[d])) : rt(t[d]) : t[d],
        d,
        void 0,
        r
      );
  } else if (typeof t == "number") {
    o = new Array(t);
    for (let l = 0; l < t; l++)
      o[l] = e(l + 1, l, void 0, r);
  } else if (J(t))
    if (t[Symbol.iterator])
      o = Array.from(
        t,
        (l, c) => e(l, c, void 0, r)
      );
    else {
      const l = Object.keys(t);
      o = new Array(l.length);
      for (let c = 0, h = l.length; c < h; c++) {
        const d = l[c];
        o[c] = e(t[d], d, c, r);
      }
    }
  else
    o = [];
  return o;
}
const Ls = (t) => t ? Uo(t) ? ys(t) : Ls(t.parent) : null, Re = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ at(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ls(t.parent),
    $root: (t) => Ls(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Co(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      sn(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = ho.bind(t.proxy)),
    $watch: (t) => Ci.bind(t)
  })
), Es = (t, e) => t !== U && !t.__isScriptSetup && W(t, e), ni = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: r, accessCache: i, type: l, appContext: c } = t;
    let h;
    if (e[0] !== "$") {
      const O = i[e];
      if (O !== void 0)
        switch (O) {
          case 1:
            return n[e];
          case 2:
            return o[e];
          case 4:
            return s[e];
          case 3:
            return r[e];
        }
      else {
        if (Es(n, e))
          return i[e] = 1, n[e];
        if (o !== U && W(o, e))
          return i[e] = 2, o[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (h = t.propsOptions[0]) && W(h, e)
        )
          return i[e] = 3, r[e];
        if (s !== U && W(s, e))
          return i[e] = 4, s[e];
        Hs && (i[e] = 0);
      }
    }
    const d = Re[e];
    let m, T;
    if (d)
      return e === "$attrs" && it(t.attrs, "get", ""), d(t);
    if (
      // css module (injected by vue-loader)
      (m = l.__cssModules) && (m = m[e])
    )
      return m;
    if (s !== U && W(s, e))
      return i[e] = 4, s[e];
    if (
      // global properties
      T = c.config.globalProperties, W(T, e)
    )
      return T[e];
  },
  set({ _: t }, e, s) {
    const { data: n, setupState: o, ctx: r } = t;
    return Es(o, e) ? (o[e] = s, !0) : n !== U && W(n, e) ? (n[e] = s, !0) : W(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (r[e] = s, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: s, ctx: n, appContext: o, propsOptions: r }
  }, i) {
    let l;
    return !!s[i] || t !== U && W(t, i) || Es(e, i) || (l = r[0]) && W(l, i) || W(n, i) || W(Re, i) || W(o.config.globalProperties, i);
  },
  defineProperty(t, e, s) {
    return s.get != null ? t._.accessCache[e] = 0 : W(s, "value") && this.set(t, e, s.value, null), Reflect.defineProperty(t, e, s);
  }
};
function yn(t) {
  return R(t) ? t.reduce(
    (e, s) => (e[s] = null, e),
    {}
  ) : t;
}
let Hs = !0;
function oi(t) {
  const e = Co(t), s = t.proxy, n = t.ctx;
  Hs = !1, e.beforeCreate && xn(e.beforeCreate, t, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: c,
    inject: h,
    // lifecycle
    created: d,
    beforeMount: m,
    mounted: T,
    beforeUpdate: O,
    updated: D,
    activated: k,
    deactivated: Z,
    beforeDestroy: j,
    beforeUnmount: $,
    destroyed: G,
    unmounted: A,
    render: et,
    renderTracked: St,
    renderTriggered: gt,
    errorCaptured: Et,
    serverPrefetch: ae,
    // public API
    expose: Tt,
    inheritAttrs: Zt,
    // assets
    components: tt,
    directives: g,
    filters: S
  } = e;
  if (h && ri(h, n, null), i)
    for (const Y in i) {
      const B = i[Y];
      F(B) && (n[Y] = B.bind(s));
    }
  if (o) {
    const Y = o.call(s, s);
    J(Y) && (t.data = Zs(Y));
  }
  if (Hs = !0, r)
    for (const Y in r) {
      const B = r[Y], te = F(B) ? B.bind(s, s) : F(B.get) ? B.get.bind(s, s) : Dt, Ne = !F(B) && F(B.set) ? B.set.bind(s) : Dt, ee = Ye({
        get: te,
        set: Ne
      });
      Object.defineProperty(n, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => ee.value,
        set: (At) => ee.value = At
      });
    }
  if (l)
    for (const Y in l)
      So(l[Y], n, s, Y);
  if (c) {
    const Y = F(c) ? c.call(s) : c;
    Reflect.ownKeys(Y).forEach((B) => {
      fi(B, Y[B]);
    });
  }
  d && xn(d, t, "c");
  function z(Y, B) {
    R(B) ? B.forEach((te) => Y(te.bind(s))) : B && Y(B.bind(s));
  }
  if (z(Gr, m), z(Jr, T), z(Qr, O), z(zr, D), z(Br, k), z(Kr, Z), z(ei, Et), z(ti, St), z(Zr, gt), z(Yr, $), z(wo, A), z(Xr, ae), R(Tt))
    if (Tt.length) {
      const Y = t.exposed || (t.exposed = {});
      Tt.forEach((B) => {
        Object.defineProperty(Y, B, {
          get: () => s[B],
          set: (te) => s[B] = te,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  et && t.render === Dt && (t.render = et), Zt != null && (t.inheritAttrs = Zt), tt && (t.components = tt), g && (t.directives = g), ae && xo(t);
}
function ri(t, e, s = Dt) {
  R(t) && (t = Vs(t));
  for (const n in t) {
    const o = t[n];
    let r;
    J(o) ? "default" in o ? r = Je(
      o.from || n,
      o.default,
      !0
    ) : r = Je(o.from || n) : r = Je(o), lt(r) ? Object.defineProperty(e, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : e[n] = r;
  }
}
function xn(t, e, s) {
  Lt(
    R(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy),
    e,
    s
  );
}
function So(t, e, s, n) {
  let o = n.includes(".") ? Lo(s, n) : () => s[n];
  if (ot(t)) {
    const r = e[t];
    F(r) && As(o, r);
  } else if (F(t))
    As(o, t.bind(s));
  else if (J(t))
    if (R(t))
      t.forEach((r) => So(r, e, s, n));
    else {
      const r = F(t.handler) ? t.handler.bind(s) : e[t.handler];
      F(r) && As(o, r, t);
    }
}
function Co(t) {
  const e = t.type, { mixins: s, extends: n } = e, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = t.appContext, l = r.get(e);
  let c;
  return l ? c = l : !o.length && !s && !n ? c = e : (c = {}, o.length && o.forEach(
    (h) => os(c, h, i, !0)
  ), os(c, e, i)), J(e) && r.set(e, c), c;
}
function os(t, e, s, n = !1) {
  const { mixins: o, extends: r } = e;
  r && os(t, r, s, !0), o && o.forEach(
    (i) => os(t, i, s, !0)
  );
  for (const i in e)
    if (!(n && i === "expose")) {
      const l = ii[i] || s && s[i];
      t[i] = l ? l(t[i], e[i]) : e[i];
    }
  return t;
}
const ii = {
  data: vn,
  props: _n,
  emits: _n,
  // objects
  methods: Ee,
  computed: Ee,
  // lifecycle
  beforeCreate: ct,
  created: ct,
  beforeMount: ct,
  mounted: ct,
  beforeUpdate: ct,
  updated: ct,
  beforeDestroy: ct,
  beforeUnmount: ct,
  destroyed: ct,
  unmounted: ct,
  activated: ct,
  deactivated: ct,
  errorCaptured: ct,
  serverPrefetch: ct,
  // assets
  components: Ee,
  directives: Ee,
  // watch
  watch: ai,
  // provide / inject
  provide: vn,
  inject: li
};
function vn(t, e) {
  return e ? t ? function() {
    return at(
      F(t) ? t.call(this, this) : t,
      F(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function li(t, e) {
  return Ee(Vs(t), Vs(e));
}
function Vs(t) {
  if (R(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++)
      e[t[s]] = t[s];
    return e;
  }
  return t;
}
function ct(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Ee(t, e) {
  return t ? at(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function _n(t, e) {
  return t ? R(t) && R(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : at(
    /* @__PURE__ */ Object.create(null),
    yn(t),
    yn(e ?? {})
  ) : e;
}
function ai(t, e) {
  if (!t) return e;
  if (!e) return t;
  const s = at(/* @__PURE__ */ Object.create(null), t);
  for (const n in e)
    s[n] = ct(t[n], e[n]);
  return s;
}
function Eo() {
  return {
    app: null,
    config: {
      isNativeTag: Jo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let ci = 0;
function ui(t, e) {
  return function(n, o = null) {
    F(n) || (n = at({}, n)), o != null && !J(o) && (o = null);
    const r = Eo(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const h = r.app = {
      _uid: ci++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: qi,
      get config() {
        return r.config;
      },
      set config(d) {
      },
      use(d, ...m) {
        return i.has(d) || (d && F(d.install) ? (i.add(d), d.install(h, ...m)) : F(d) && (i.add(d), d(h, ...m))), h;
      },
      mixin(d) {
        return r.mixins.includes(d) || r.mixins.push(d), h;
      },
      component(d, m) {
        return m ? (r.components[d] = m, h) : r.components[d];
      },
      directive(d, m) {
        return m ? (r.directives[d] = m, h) : r.directives[d];
      },
      mount(d, m, T) {
        if (!c) {
          const O = h._ceVNode || kt(n, o);
          return O.appContext = r, T === !0 ? T = "svg" : T === !1 && (T = void 0), t(O, d, T), c = !0, h._container = d, d.__vue_app__ = h, ys(O.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        c && (Lt(
          l,
          h._instance,
          16
        ), t(null, h._container), delete h._container.__vue_app__);
      },
      provide(d, m) {
        return r.provides[d] = m, h;
      },
      runWithContext(d) {
        const m = be;
        be = h;
        try {
          return d();
        } finally {
          be = m;
        }
      }
    };
    return h;
  };
}
let be = null;
function fi(t, e) {
  if (ft) {
    let s = ft.provides;
    const n = ft.parent && ft.parent.provides;
    n === s && (s = ft.provides = Object.create(n)), s[t] = e;
  }
}
function Je(t, e, s = !1) {
  const n = Wi();
  if (n || be) {
    let o = be ? be._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && t in o)
      return o[t];
    if (arguments.length > 1)
      return s && F(e) ? e.call(n && n.proxy) : e;
  }
}
const To = {}, Ao = () => Object.create(To), Oo = (t) => Object.getPrototypeOf(t) === To;
function di(t, e, s, n = !1) {
  const o = {}, r = Ao();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Io(t, e, o, r);
  for (const i in t.propsOptions[0])
    i in o || (o[i] = void 0);
  s ? t.props = n ? o : Ar(o) : t.type.props ? t.props = o : t.props = r, t.attrs = r;
}
function pi(t, e, s, n) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = t, l = V(o), [c] = t.propsOptions;
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = t.vnode.dynamicProps;
      for (let m = 0; m < d.length; m++) {
        let T = d[m];
        if (ms(t.emitsOptions, T))
          continue;
        const O = e[T];
        if (c)
          if (W(r, T))
            O !== r[T] && (r[T] = O, h = !0);
          else {
            const D = zt(T);
            o[D] = Ws(
              c,
              l,
              D,
              O,
              t,
              !1
            );
          }
        else
          O !== r[T] && (r[T] = O, h = !0);
      }
    }
  } else {
    Io(t, e, o, r) && (h = !0);
    let d;
    for (const m in l)
      (!e || // for camelCase
      !W(e, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = le(m)) === m || !W(e, d))) && (c ? s && // for camelCase
      (s[m] !== void 0 || // for kebab-case
      s[d] !== void 0) && (o[m] = Ws(
        c,
        l,
        m,
        void 0,
        t,
        !0
      )) : delete o[m]);
    if (r !== l)
      for (const m in r)
        (!e || !W(e, m)) && (delete r[m], h = !0);
  }
  h && Nt(t.attrs, "set", "");
}
function Io(t, e, s, n) {
  const [o, r] = t.propsOptions;
  let i = !1, l;
  if (e)
    for (let c in e) {
      if (Te(c))
        continue;
      const h = e[c];
      let d;
      o && W(o, d = zt(c)) ? !r || !r.includes(d) ? s[d] = h : (l || (l = {}))[d] = h : ms(t.emitsOptions, c) || (!(c in n) || h !== n[c]) && (n[c] = h, i = !0);
    }
  if (r) {
    const c = V(s), h = l || U;
    for (let d = 0; d < r.length; d++) {
      const m = r[d];
      s[m] = Ws(
        o,
        c,
        m,
        h[m],
        t,
        !W(h, m)
      );
    }
  }
  return i;
}
function Ws(t, e, s, n, o, r) {
  const i = t[s];
  if (i != null) {
    const l = W(i, "default");
    if (l && n === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && F(c)) {
        const { propsDefaults: h } = o;
        if (s in h)
          n = h[s];
        else {
          const d = We(o);
          n = h[s] = c.call(
            null,
            e
          ), d();
        }
      } else
        n = c;
      o.ce && o.ce._setProp(s, n);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === le(s)) && (n = !0));
  }
  return n;
}
const hi = /* @__PURE__ */ new WeakMap();
function Mo(t, e, s = !1) {
  const n = s ? hi : e.propsCache, o = n.get(t);
  if (o)
    return o;
  const r = t.props, i = {}, l = [];
  let c = !1;
  if (!F(t)) {
    const d = (m) => {
      c = !0;
      const [T, O] = Mo(m, e, !0);
      at(i, T), O && l.push(...O);
    };
    !s && e.mixins.length && e.mixins.forEach(d), t.extends && d(t.extends), t.mixins && t.mixins.forEach(d);
  }
  if (!r && !c)
    return J(t) && n.set(t, de), de;
  if (R(r))
    for (let d = 0; d < r.length; d++) {
      const m = zt(r[d]);
      wn(m) && (i[m] = U);
    }
  else if (r)
    for (const d in r) {
      const m = zt(d);
      if (wn(m)) {
        const T = r[d], O = i[m] = R(T) || F(T) ? { type: T } : at({}, T), D = O.type;
        let k = !1, Z = !0;
        if (R(D))
          for (let j = 0; j < D.length; ++j) {
            const $ = D[j], G = F($) && $.name;
            if (G === "Boolean") {
              k = !0;
              break;
            } else G === "String" && (Z = !1);
          }
        else
          k = F(D) && D.name === "Boolean";
        O[
          0
          /* shouldCast */
        ] = k, O[
          1
          /* shouldCastTrue */
        ] = Z, (k || W(O, "default")) && l.push(m);
      }
    }
  const h = [i, l];
  return J(t) && n.set(t, h), h;
}
function wn(t) {
  return t[0] !== "$" && !Te(t);
}
const on = (t) => t === "_" || t === "__" || t === "_ctx" || t === "$stable", rn = (t) => R(t) ? t.map(Ft) : [Ft(t)], gi = (t, e, s) => {
  if (e._n)
    return e;
  const n = Wr((...o) => rn(e(...o)), s);
  return n._c = !1, n;
}, Ro = (t, e, s) => {
  const n = t._ctx;
  for (const o in t) {
    if (on(o)) continue;
    const r = t[o];
    if (F(r))
      e[o] = gi(o, r, n);
    else if (r != null) {
      const i = rn(r);
      e[o] = () => i;
    }
  }
}, Po = (t, e) => {
  const s = rn(e);
  t.slots.default = () => s;
}, Fo = (t, e, s) => {
  for (const n in e)
    (s || !on(n)) && (t[n] = e[n]);
}, mi = (t, e, s) => {
  const n = t.slots = Ao();
  if (t.vnode.shapeFlag & 32) {
    const o = e.__;
    o && Ps(n, "__", o, !0);
    const r = e._;
    r ? (Fo(n, e, s), s && Ps(n, "_", r, !0)) : Ro(e, n);
  } else e && Po(t, e);
}, bi = (t, e, s) => {
  const { vnode: n, slots: o } = t;
  let r = !0, i = U;
  if (n.shapeFlag & 32) {
    const l = e._;
    l ? s && l === 1 ? r = !1 : Fo(o, e, s) : (r = !e.$stable, Ro(e, o)), i = e;
  } else e && (Po(t, e), i = { default: 1 });
  if (r)
    for (const l in o)
      !on(l) && i[l] == null && delete o[l];
}, bt = Ri;
function yi(t) {
  return xi(t);
}
function xi(t, e) {
  const s = fs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: c,
    setText: h,
    setElementText: d,
    parentNode: m,
    nextSibling: T,
    setScopeId: O = Dt,
    insertStaticContent: D
  } = t, k = (a, f, p, x = null, b = null, y = null, C = void 0, w = null, _ = !!f.dynamicChildren) => {
    if (a === f)
      return;
    a && !Ce(a, f) && (x = $e(a), At(a, b, y, !0), a = null), f.patchFlag === -2 && (_ = !1, f.dynamicChildren = null);
    const { type: v, ref: M, shapeFlag: E } = f;
    switch (v) {
      case bs:
        Z(a, f, p, x);
        break;
      case Xt:
        j(a, f, p, x);
        break;
      case Qe:
        a == null && $(f, p, x, C);
        break;
      case yt:
        tt(
          a,
          f,
          p,
          x,
          b,
          y,
          C,
          w,
          _
        );
        break;
      default:
        E & 1 ? et(
          a,
          f,
          p,
          x,
          b,
          y,
          C,
          w,
          _
        ) : E & 6 ? g(
          a,
          f,
          p,
          x,
          b,
          y,
          C,
          w,
          _
        ) : (E & 64 || E & 128) && v.process(
          a,
          f,
          p,
          x,
          b,
          y,
          C,
          w,
          _,
          _e
        );
    }
    M != null && b ? Ie(M, a && a.ref, y, f || a, !f) : M == null && a && a.ref != null && Ie(a.ref, null, y, a, !0);
  }, Z = (a, f, p, x) => {
    if (a == null)
      n(
        f.el = l(f.children),
        p,
        x
      );
    else {
      const b = f.el = a.el;
      f.children !== a.children && h(b, f.children);
    }
  }, j = (a, f, p, x) => {
    a == null ? n(
      f.el = c(f.children || ""),
      p,
      x
    ) : f.el = a.el;
  }, $ = (a, f, p, x) => {
    [a.el, a.anchor] = D(
      a.children,
      f,
      p,
      x,
      a.el,
      a.anchor
    );
  }, G = ({ el: a, anchor: f }, p, x) => {
    let b;
    for (; a && a !== f; )
      b = T(a), n(a, p, x), a = b;
    n(f, p, x);
  }, A = ({ el: a, anchor: f }) => {
    let p;
    for (; a && a !== f; )
      p = T(a), o(a), a = p;
    o(f);
  }, et = (a, f, p, x, b, y, C, w, _) => {
    f.type === "svg" ? C = "svg" : f.type === "math" && (C = "mathml"), a == null ? St(
      f,
      p,
      x,
      b,
      y,
      C,
      w,
      _
    ) : ae(
      a,
      f,
      b,
      y,
      C,
      w,
      _
    );
  }, St = (a, f, p, x, b, y, C, w) => {
    let _, v;
    const { props: M, shapeFlag: E, transition: I, dirs: P } = a;
    if (_ = a.el = i(
      a.type,
      y,
      M && M.is,
      M
    ), E & 8 ? d(_, a.children) : E & 16 && Et(
      a.children,
      _,
      null,
      x,
      b,
      Ts(a, y),
      C,
      w
    ), P && se(a, null, x, "created"), gt(_, a, a.scopeId, C, x), M) {
      for (const K in M)
        K !== "value" && !Te(K) && r(_, K, null, M[K], y, x);
      "value" in M && r(_, "value", null, M.value, y), (v = M.onVnodeBeforeMount) && Rt(v, x, a);
    }
    P && se(a, null, x, "beforeMount");
    const H = vi(b, I);
    H && I.beforeEnter(_), n(_, f, p), ((v = M && M.onVnodeMounted) || H || P) && bt(() => {
      v && Rt(v, x, a), H && I.enter(_), P && se(a, null, x, "mounted");
    }, b);
  }, gt = (a, f, p, x, b) => {
    if (p && O(a, p), x)
      for (let y = 0; y < x.length; y++)
        O(a, x[y]);
    if (b) {
      let y = b.subTree;
      if (f === y || Vo(y.type) && (y.ssContent === f || y.ssFallback === f)) {
        const C = b.vnode;
        gt(
          a,
          C,
          C.scopeId,
          C.slotScopeIds,
          b.parent
        );
      }
    }
  }, Et = (a, f, p, x, b, y, C, w, _ = 0) => {
    for (let v = _; v < a.length; v++) {
      const M = a[v] = w ? Jt(a[v]) : Ft(a[v]);
      k(
        null,
        M,
        f,
        p,
        x,
        b,
        y,
        C,
        w
      );
    }
  }, ae = (a, f, p, x, b, y, C) => {
    const w = f.el = a.el;
    let { patchFlag: _, dynamicChildren: v, dirs: M } = f;
    _ |= a.patchFlag & 16;
    const E = a.props || U, I = f.props || U;
    let P;
    if (p && ne(p, !1), (P = I.onVnodeBeforeUpdate) && Rt(P, p, f, a), M && se(f, a, p, "beforeUpdate"), p && ne(p, !0), (E.innerHTML && I.innerHTML == null || E.textContent && I.textContent == null) && d(w, ""), v ? Tt(
      a.dynamicChildren,
      v,
      w,
      p,
      x,
      Ts(f, b),
      y
    ) : C || B(
      a,
      f,
      w,
      null,
      p,
      x,
      Ts(f, b),
      y,
      !1
    ), _ > 0) {
      if (_ & 16)
        Zt(w, E, I, p, b);
      else if (_ & 2 && E.class !== I.class && r(w, "class", null, I.class, b), _ & 4 && r(w, "style", E.style, I.style, b), _ & 8) {
        const H = f.dynamicProps;
        for (let K = 0; K < H.length; K++) {
          const N = H[K], dt = E[N], pt = I[N];
          (pt !== dt || N === "value") && r(w, N, dt, pt, b, p);
        }
      }
      _ & 1 && a.children !== f.children && d(w, f.children);
    } else !C && v == null && Zt(w, E, I, p, b);
    ((P = I.onVnodeUpdated) || M) && bt(() => {
      P && Rt(P, p, f, a), M && se(f, a, p, "updated");
    }, x);
  }, Tt = (a, f, p, x, b, y, C) => {
    for (let w = 0; w < f.length; w++) {
      const _ = a[w], v = f[w], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        _.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (_.type === yt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ce(_, v) || // - In the case of a component, it could contain anything.
        _.shapeFlag & 198) ? m(_.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      k(
        _,
        v,
        M,
        null,
        x,
        b,
        y,
        C,
        !0
      );
    }
  }, Zt = (a, f, p, x, b) => {
    if (f !== p) {
      if (f !== U)
        for (const y in f)
          !Te(y) && !(y in p) && r(
            a,
            y,
            f[y],
            null,
            b,
            x
          );
      for (const y in p) {
        if (Te(y)) continue;
        const C = p[y], w = f[y];
        C !== w && y !== "value" && r(a, y, w, C, b, x);
      }
      "value" in p && r(a, "value", f.value, p.value, b);
    }
  }, tt = (a, f, p, x, b, y, C, w, _) => {
    const v = f.el = a ? a.el : l(""), M = f.anchor = a ? a.anchor : l("");
    let { patchFlag: E, dynamicChildren: I, slotScopeIds: P } = f;
    P && (w = w ? w.concat(P) : P), a == null ? (n(v, p, x), n(M, p, x), Et(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      p,
      M,
      b,
      y,
      C,
      w,
      _
    )) : E > 0 && E & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren ? (Tt(
      a.dynamicChildren,
      I,
      p,
      b,
      y,
      C,
      w
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || b && f === b.subTree) && Do(
      a,
      f,
      !0
      /* shallow */
    )) : B(
      a,
      f,
      p,
      M,
      b,
      y,
      C,
      w,
      _
    );
  }, g = (a, f, p, x, b, y, C, w, _) => {
    f.slotScopeIds = w, a == null ? f.shapeFlag & 512 ? b.ctx.activate(
      f,
      p,
      x,
      C,
      _
    ) : S(
      f,
      p,
      x,
      b,
      y,
      C,
      _
    ) : st(a, f, _);
  }, S = (a, f, p, x, b, y, C) => {
    const w = a.component = Vi(
      a,
      x,
      b
    );
    if (vo(a) && (w.ctx.renderer = _e), Ni(w, !1, C), w.asyncDep) {
      if (b && b.registerDep(w, z, C), !a.el) {
        const _ = w.subTree = kt(Xt);
        j(null, _, f, p), a.placeholder = _.el;
      }
    } else
      z(
        w,
        a,
        f,
        p,
        b,
        y,
        C
      );
  }, st = (a, f, p) => {
    const x = f.component = a.component;
    if (Ii(a, f, p))
      if (x.asyncDep && !x.asyncResolved) {
        Y(x, f, p);
        return;
      } else
        x.next = f, x.update();
    else
      f.el = a.el, x.vnode = f;
  }, z = (a, f, p, x, b, y, C) => {
    const w = () => {
      if (a.isMounted) {
        let { next: E, bu: I, u: P, parent: H, vnode: K } = a;
        {
          const It = ko(a);
          if (It) {
            E && (E.el = K.el, Y(a, E, C)), It.asyncDep.then(() => {
              a.isUnmounted || w();
            });
            return;
          }
        }
        let N = E, dt;
        ne(a, !1), E ? (E.el = K.el, Y(a, E, C)) : E = K, I && Ge(I), (dt = E.props && E.props.onVnodeBeforeUpdate) && Rt(dt, H, E, K), ne(a, !0);
        const pt = Cn(a), Ot = a.subTree;
        a.subTree = pt, k(
          Ot,
          pt,
          // parent may have changed if it's in a teleport
          m(Ot.el),
          // anchor may have changed if it's in a fragment
          $e(Ot),
          a,
          b,
          y
        ), E.el = pt.el, N === null && Mi(a, pt.el), P && bt(P, b), (dt = E.props && E.props.onVnodeUpdated) && bt(
          () => Rt(dt, H, E, K),
          b
        );
      } else {
        let E;
        const { el: I, props: P } = f, { bm: H, m: K, parent: N, root: dt, type: pt } = a, Ot = Me(f);
        ne(a, !1), H && Ge(H), !Ot && (E = P && P.onVnodeBeforeMount) && Rt(E, N, f), ne(a, !0);
        {
          dt.ce && // @ts-expect-error _def is private
          dt.ce._def.shadowRoot !== !1 && dt.ce._injectChildStyle(pt);
          const It = a.subTree = Cn(a);
          k(
            null,
            It,
            p,
            x,
            a,
            b,
            y
          ), f.el = It.el;
        }
        if (K && bt(K, b), !Ot && (E = P && P.onVnodeMounted)) {
          const It = f;
          bt(
            () => Rt(E, N, It),
            b
          );
        }
        (f.shapeFlag & 256 || N && Me(N.vnode) && N.vnode.shapeFlag & 256) && a.a && bt(a.a, b), a.isMounted = !0, f = p = x = null;
      }
    };
    a.scope.on();
    const _ = a.effect = new zn(w);
    a.scope.off();
    const v = a.update = _.run.bind(_), M = a.job = _.runIfDirty.bind(_);
    M.i = a, M.id = a.uid, _.scheduler = () => sn(M), ne(a, !0), v();
  }, Y = (a, f, p) => {
    f.component = a;
    const x = a.vnode.props;
    a.vnode = f, a.next = null, pi(a, f.props, x, p), bi(a, f.children, p), Ut(), bn(a), Bt();
  }, B = (a, f, p, x, b, y, C, w, _ = !1) => {
    const v = a && a.children, M = a ? a.shapeFlag : 0, E = f.children, { patchFlag: I, shapeFlag: P } = f;
    if (I > 0) {
      if (I & 128) {
        Ne(
          v,
          E,
          p,
          x,
          b,
          y,
          C,
          w,
          _
        );
        return;
      } else if (I & 256) {
        te(
          v,
          E,
          p,
          x,
          b,
          y,
          C,
          w,
          _
        );
        return;
      }
    }
    P & 8 ? (M & 16 && ve(v, b, y), E !== v && d(p, E)) : M & 16 ? P & 16 ? Ne(
      v,
      E,
      p,
      x,
      b,
      y,
      C,
      w,
      _
    ) : ve(v, b, y, !0) : (M & 8 && d(p, ""), P & 16 && Et(
      E,
      p,
      x,
      b,
      y,
      C,
      w,
      _
    ));
  }, te = (a, f, p, x, b, y, C, w, _) => {
    a = a || de, f = f || de;
    const v = a.length, M = f.length, E = Math.min(v, M);
    let I;
    for (I = 0; I < E; I++) {
      const P = f[I] = _ ? Jt(f[I]) : Ft(f[I]);
      k(
        a[I],
        P,
        p,
        null,
        b,
        y,
        C,
        w,
        _
      );
    }
    v > M ? ve(
      a,
      b,
      y,
      !0,
      !1,
      E
    ) : Et(
      f,
      p,
      x,
      b,
      y,
      C,
      w,
      _,
      E
    );
  }, Ne = (a, f, p, x, b, y, C, w, _) => {
    let v = 0;
    const M = f.length;
    let E = a.length - 1, I = M - 1;
    for (; v <= E && v <= I; ) {
      const P = a[v], H = f[v] = _ ? Jt(f[v]) : Ft(f[v]);
      if (Ce(P, H))
        k(
          P,
          H,
          p,
          null,
          b,
          y,
          C,
          w,
          _
        );
      else
        break;
      v++;
    }
    for (; v <= E && v <= I; ) {
      const P = a[E], H = f[I] = _ ? Jt(f[I]) : Ft(f[I]);
      if (Ce(P, H))
        k(
          P,
          H,
          p,
          null,
          b,
          y,
          C,
          w,
          _
        );
      else
        break;
      E--, I--;
    }
    if (v > E) {
      if (v <= I) {
        const P = I + 1, H = P < M ? f[P].el : x;
        for (; v <= I; )
          k(
            null,
            f[v] = _ ? Jt(f[v]) : Ft(f[v]),
            p,
            H,
            b,
            y,
            C,
            w,
            _
          ), v++;
      }
    } else if (v > I)
      for (; v <= E; )
        At(a[v], b, y, !0), v++;
    else {
      const P = v, H = v, K = /* @__PURE__ */ new Map();
      for (v = H; v <= I; v++) {
        const mt = f[v] = _ ? Jt(f[v]) : Ft(f[v]);
        mt.key != null && K.set(mt.key, v);
      }
      let N, dt = 0;
      const pt = I - H + 1;
      let Ot = !1, It = 0;
      const we = new Array(pt);
      for (v = 0; v < pt; v++) we[v] = 0;
      for (v = P; v <= E; v++) {
        const mt = a[v];
        if (dt >= pt) {
          At(mt, b, y, !0);
          continue;
        }
        let Mt;
        if (mt.key != null)
          Mt = K.get(mt.key);
        else
          for (N = H; N <= I; N++)
            if (we[N - H] === 0 && Ce(mt, f[N])) {
              Mt = N;
              break;
            }
        Mt === void 0 ? At(mt, b, y, !0) : (we[Mt - H] = v + 1, Mt >= It ? It = Mt : Ot = !0, k(
          mt,
          f[Mt],
          p,
          null,
          b,
          y,
          C,
          w,
          _
        ), dt++);
      }
      const un = Ot ? _i(we) : de;
      for (N = un.length - 1, v = pt - 1; v >= 0; v--) {
        const mt = H + v, Mt = f[mt], fn = f[mt + 1], dn = mt + 1 < M ? (
          // #13559, fallback to el placeholder for unresolved async component
          fn.el || fn.placeholder
        ) : x;
        we[v] === 0 ? k(
          null,
          Mt,
          p,
          dn,
          b,
          y,
          C,
          w,
          _
        ) : Ot && (N < 0 || v !== un[N] ? ee(Mt, p, dn, 2) : N--);
      }
    }
  }, ee = (a, f, p, x, b = null) => {
    const { el: y, type: C, transition: w, children: _, shapeFlag: v } = a;
    if (v & 6) {
      ee(a.component.subTree, f, p, x);
      return;
    }
    if (v & 128) {
      a.suspense.move(f, p, x);
      return;
    }
    if (v & 64) {
      C.move(a, f, p, _e);
      return;
    }
    if (C === yt) {
      n(y, f, p);
      for (let E = 0; E < _.length; E++)
        ee(_[E], f, p, x);
      n(a.anchor, f, p);
      return;
    }
    if (C === Qe) {
      G(a, f, p);
      return;
    }
    if (x !== 2 && v & 1 && w)
      if (x === 0)
        w.beforeEnter(y), n(y, f, p), bt(() => w.enter(y), b);
      else {
        const { leave: E, delayLeave: I, afterLeave: P } = w, H = () => {
          a.ctx.isUnmounted ? o(y) : n(y, f, p);
        }, K = () => {
          E(y, () => {
            H(), P && P();
          });
        };
        I ? I(y, H, K) : K();
      }
    else
      n(y, f, p);
  }, At = (a, f, p, x = !1, b = !1) => {
    const {
      type: y,
      props: C,
      ref: w,
      children: _,
      dynamicChildren: v,
      shapeFlag: M,
      patchFlag: E,
      dirs: I,
      cacheIndex: P
    } = a;
    if (E === -2 && (b = !1), w != null && (Ut(), Ie(w, null, p, a, !0), Bt()), P != null && (f.renderCache[P] = void 0), M & 256) {
      f.ctx.deactivate(a);
      return;
    }
    const H = M & 1 && I, K = !Me(a);
    let N;
    if (K && (N = C && C.onVnodeBeforeUnmount) && Rt(N, f, a), M & 6)
      Go(a.component, p, x);
    else {
      if (M & 128) {
        a.suspense.unmount(p, x);
        return;
      }
      H && se(a, null, f, "beforeUnmount"), M & 64 ? a.type.remove(
        a,
        f,
        p,
        _e,
        x
      ) : v && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !v.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== yt || E > 0 && E & 64) ? ve(
        v,
        f,
        p,
        !1,
        !0
      ) : (y === yt && E & 384 || !b && M & 16) && ve(_, f, p), x && an(a);
    }
    (K && (N = C && C.onVnodeUnmounted) || H) && bt(() => {
      N && Rt(N, f, a), H && se(a, null, f, "unmounted");
    }, p);
  }, an = (a) => {
    const { type: f, el: p, anchor: x, transition: b } = a;
    if (f === yt) {
      qo(p, x);
      return;
    }
    if (f === Qe) {
      A(a);
      return;
    }
    const y = () => {
      o(p), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (a.shapeFlag & 1 && b && !b.persisted) {
      const { leave: C, delayLeave: w } = b, _ = () => C(p, y);
      w ? w(a.el, y, _) : _();
    } else
      y();
  }, qo = (a, f) => {
    let p;
    for (; a !== f; )
      p = T(a), o(a), a = p;
    o(f);
  }, Go = (a, f, p) => {
    const {
      bum: x,
      scope: b,
      job: y,
      subTree: C,
      um: w,
      m: _,
      a: v,
      parent: M,
      slots: { __: E }
    } = a;
    Sn(_), Sn(v), x && Ge(x), M && R(E) && E.forEach((I) => {
      M.renderCache[I] = void 0;
    }), b.stop(), y && (y.flags |= 8, At(C, a, f, p)), w && bt(w, f), bt(() => {
      a.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && a.asyncDep && !a.asyncResolved && a.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, ve = (a, f, p, x = !1, b = !1, y = 0) => {
    for (let C = y; C < a.length; C++)
      At(a[C], f, p, x, b);
  }, $e = (a) => {
    if (a.shapeFlag & 6)
      return $e(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const f = T(a.anchor || a.el), p = f && f[Nr];
    return p ? T(p) : f;
  };
  let xs = !1;
  const cn = (a, f, p) => {
    a == null ? f._vnode && At(f._vnode, null, null, !0) : k(
      f._vnode || null,
      a,
      f,
      null,
      null,
      null,
      p
    ), f._vnode = a, xs || (xs = !0, bn(), mo(), xs = !1);
  }, _e = {
    p: k,
    um: At,
    m: ee,
    r: an,
    mt: S,
    mc: Et,
    pc: B,
    pbc: Tt,
    n: $e,
    o: t
  };
  return {
    render: cn,
    hydrate: void 0,
    createApp: ui(cn)
  };
}
function Ts({ type: t, props: e }, s) {
  return s === "svg" && t === "foreignObject" || s === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : s;
}
function ne({ effect: t, job: e }, s) {
  s ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function vi(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Do(t, e, s = !1) {
  const n = t.children, o = e.children;
  if (R(n) && R(o))
    for (let r = 0; r < n.length; r++) {
      const i = n[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = Jt(o[r]), l.el = i.el), !s && l.patchFlag !== -2 && Do(i, l)), l.type === bs && (l.el = i.el), l.type === Xt && !l.el && (l.el = i.el);
    }
}
function _i(t) {
  const e = t.slice(), s = [0];
  let n, o, r, i, l;
  const c = t.length;
  for (n = 0; n < c; n++) {
    const h = t[n];
    if (h !== 0) {
      if (o = s[s.length - 1], t[o] < h) {
        e[n] = o, s.push(n);
        continue;
      }
      for (r = 0, i = s.length - 1; r < i; )
        l = r + i >> 1, t[s[l]] < h ? r = l + 1 : i = l;
      h < t[s[r]] && (r > 0 && (e[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, i = s[r - 1]; r-- > 0; )
    s[r] = i, i = e[i];
  return s;
}
function ko(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : ko(e);
}
function Sn(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const wi = Symbol.for("v-scx"), Si = () => Je(wi);
function As(t, e, s) {
  return jo(t, e, s);
}
function jo(t, e, s = U) {
  const { immediate: n, deep: o, flush: r, once: i } = s, l = at({}, s), c = e && n || !e && r !== "post";
  let h;
  if (Le) {
    if (r === "sync") {
      const O = Si();
      h = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!c) {
      const O = () => {
      };
      return O.stop = Dt, O.resume = Dt, O.pause = Dt, O;
    }
  }
  const d = ft;
  l.call = (O, D, k) => Lt(O, d, D, k);
  let m = !1;
  r === "post" ? l.scheduler = (O) => {
    bt(O, d && d.suspense);
  } : r !== "sync" && (m = !0, l.scheduler = (O, D) => {
    D ? O() : sn(O);
  }), l.augmentJob = (O) => {
    e && (O.flags |= 4), m && (O.flags |= 2, d && (O.id = d.uid, O.i = d));
  };
  const T = jr(t, e, l);
  return Le && (h ? h.push(T) : c && T()), T;
}
function Ci(t, e, s) {
  const n = this.proxy, o = ot(t) ? t.includes(".") ? Lo(n, t) : () => n[t] : t.bind(n, n);
  let r;
  F(e) ? r = e : (r = e.handler, s = e);
  const i = We(this), l = jo(o, r.bind(n), s);
  return i(), l;
}
function Lo(t, e) {
  const s = e.split(".");
  return () => {
    let n = t;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const Ei = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${zt(e)}Modifiers`] || t[`${le(e)}Modifiers`];
function Ti(t, e, ...s) {
  if (t.isUnmounted) return;
  const n = t.vnode.props || U;
  let o = s;
  const r = e.startsWith("update:"), i = r && Ei(n, e.slice(7));
  i && (i.trim && (o = s.map((d) => ot(d) ? d.trim() : d)), i.number && (o = s.map(Ze)));
  let l, c = n[l = vs(e)] || // also try camelCase event handler (#2249)
  n[l = vs(zt(e))];
  !c && r && (c = n[l = vs(le(e))]), c && Lt(
    c,
    t,
    6,
    o
  );
  const h = n[l + "Once"];
  if (h) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, Lt(
      h,
      t,
      6,
      o
    );
  }
}
function Ho(t, e, s = !1) {
  const n = e.emitsCache, o = n.get(t);
  if (o !== void 0)
    return o;
  const r = t.emits;
  let i = {}, l = !1;
  if (!F(t)) {
    const c = (h) => {
      const d = Ho(h, e, !0);
      d && (l = !0, at(i, d));
    };
    !s && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  return !r && !l ? (J(t) && n.set(t, null), null) : (R(r) ? r.forEach((c) => i[c] = null) : at(i, r), J(t) && n.set(t, i), i);
}
function ms(t, e) {
  return !t || !as(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), W(t, e[0].toLowerCase() + e.slice(1)) || W(t, le(e)) || W(t, e));
}
function Cn(t) {
  const {
    type: e,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: c,
    render: h,
    renderCache: d,
    props: m,
    data: T,
    setupState: O,
    ctx: D,
    inheritAttrs: k
  } = t, Z = ns(t);
  let j, $;
  try {
    if (s.shapeFlag & 4) {
      const A = o || n, et = A;
      j = Ft(
        h.call(
          et,
          A,
          d,
          m,
          O,
          T,
          D
        )
      ), $ = l;
    } else {
      const A = e;
      j = Ft(
        A.length > 1 ? A(
          m,
          { attrs: l, slots: i, emit: c }
        ) : A(
          m,
          null
        )
      ), $ = e.props ? l : Ai(l);
    }
  } catch (A) {
    Pe.length = 0, hs(A, t, 1), j = kt(Xt);
  }
  let G = j;
  if ($ && k !== !1) {
    const A = Object.keys($), { shapeFlag: et } = G;
    A.length && et & 7 && (r && A.some(Bs) && ($ = Oi(
      $,
      r
    )), G = xe(G, $, !1, !0));
  }
  return s.dirs && (G = xe(G, null, !1, !0), G.dirs = G.dirs ? G.dirs.concat(s.dirs) : s.dirs), s.transition && nn(G, s.transition), j = G, ns(Z), j;
}
const Ai = (t) => {
  let e;
  for (const s in t)
    (s === "class" || s === "style" || as(s)) && ((e || (e = {}))[s] = t[s]);
  return e;
}, Oi = (t, e) => {
  const s = {};
  for (const n in t)
    (!Bs(n) || !(n.slice(9) in e)) && (s[n] = t[n]);
  return s;
};
function Ii(t, e, s) {
  const { props: n, children: o, component: r } = t, { props: i, children: l, patchFlag: c } = e, h = r.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? En(n, i, h) : !!i;
    if (c & 8) {
      const d = e.dynamicProps;
      for (let m = 0; m < d.length; m++) {
        const T = d[m];
        if (i[T] !== n[T] && !ms(h, T))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === i ? !1 : n ? i ? En(n, i, h) : !0 : !!i;
  return !1;
}
function En(t, e, s) {
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    if (e[r] !== t[r] && !ms(s, r))
      return !0;
  }
  return !1;
}
function Mi({ vnode: t, parent: e }, s) {
  for (; e; ) {
    const n = e.subTree;
    if (n.suspense && n.suspense.activeBranch === t && (n.el = t.el), n === t)
      (t = e.vnode).el = s, e = e.parent;
    else
      break;
  }
}
const Vo = (t) => t.__isSuspense;
function Ri(t, e) {
  e && e.pendingBranch ? R(t) ? e.effects.push(...t) : e.effects.push(t) : Vr(t);
}
const yt = Symbol.for("v-fgt"), bs = Symbol.for("v-txt"), Xt = Symbol.for("v-cmt"), Qe = Symbol.for("v-stc"), Pe = [];
let xt = null;
function Q(t = !1) {
  Pe.push(xt = t ? null : []);
}
function Pi() {
  Pe.pop(), xt = Pe[Pe.length - 1] || null;
}
let je = 1;
function Tn(t, e = !1) {
  je += t, t < 0 && xt && e && (xt.hasOnce = !0);
}
function Wo(t) {
  return t.dynamicChildren = je > 0 ? xt || de : null, Pi(), je > 0 && xt && xt.push(t), t;
}
function X(t, e, s, n, o, r) {
  return Wo(
    u(
      t,
      e,
      s,
      n,
      o,
      r,
      !0
    )
  );
}
function Fi(t, e, s, n, o) {
  return Wo(
    kt(
      t,
      e,
      s,
      n,
      o,
      !0
    )
  );
}
function No(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Ce(t, e) {
  return t.type === e.type && t.key === e.key;
}
const $o = ({ key: t }) => t ?? null, ze = ({
  ref: t,
  ref_key: e,
  ref_for: s
}) => (typeof t == "number" && (t = "" + t), t != null ? ot(t) || lt(t) || F(t) ? { i: _t, r: t, k: e, f: !!s } : t : null);
function u(t, e = null, s = null, n = 0, o = null, r = t === yt ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && $o(e),
    ref: e && ze(e),
    scopeId: yo,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: _t
  };
  return l ? (ln(c, s), r & 128 && t.normalize(c)) : s && (c.shapeFlag |= ot(s) ? 8 : 16), je > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  xt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && xt.push(c), c;
}
const kt = Di;
function Di(t, e = null, s = null, n = 0, o = null, r = !1) {
  if ((!t || t === si) && (t = Xt), No(t)) {
    const l = xe(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return s && ln(l, s), je > 0 && !r && xt && (l.shapeFlag & 6 ? xt[xt.indexOf(t)] = l : xt.push(l)), l.patchFlag = -2, l;
  }
  if (Ki(t) && (t = t.__vccOpts), e) {
    e = ki(e);
    let { class: l, style: c } = e;
    l && !ot(l) && (e.class = he(l)), J(c) && (en(c) && !R(c) && (c = at({}, c)), e.style = Gs(c));
  }
  const i = ot(t) ? 1 : Vo(t) ? 128 : $r(t) ? 64 : J(t) ? 4 : F(t) ? 2 : 0;
  return u(
    t,
    e,
    s,
    n,
    o,
    i,
    r,
    !0
  );
}
function ki(t) {
  return t ? en(t) || Oo(t) ? at({}, t) : t : null;
}
function xe(t, e, s = !1, n = !1) {
  const { props: o, ref: r, patchFlag: i, children: l, transition: c } = t, h = e ? ji(o || {}, e) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: h,
    key: h && $o(h),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? R(r) ? r.concat(ze(e)) : [r, ze(e)] : ze(e)
    ) : r,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== yt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && xe(t.ssContent),
    ssFallback: t.ssFallback && xe(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return c && n && nn(
    d,
    c.clone(d)
  ), d;
}
function qt(t = " ", e = 0) {
  return kt(bs, null, t, e);
}
function Os(t, e) {
  const s = kt(Qe, null, t);
  return s.staticCount = e, s;
}
function vt(t = "", e = !1) {
  return e ? (Q(), Fi(Xt, null, t)) : kt(Xt, null, t);
}
function Ft(t) {
  return t == null || typeof t == "boolean" ? kt(Xt) : R(t) ? kt(
    yt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : No(t) ? Jt(t) : kt(bs, null, String(t));
}
function Jt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : xe(t);
}
function ln(t, e) {
  let s = 0;
  const { shapeFlag: n } = t;
  if (e == null)
    e = null;
  else if (R(e))
    s = 16;
  else if (typeof e == "object")
    if (n & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), ln(t, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = e._;
      !o && !Oo(e) ? e._ctx = _t : o === 3 && _t && (_t.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else F(e) ? (e = { default: e, _ctx: _t }, s = 32) : (e = String(e), n & 64 ? (s = 16, e = [qt(e)]) : s = 8);
  t.children = e, t.shapeFlag |= s;
}
function ji(...t) {
  const e = {};
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    for (const o in n)
      if (o === "class")
        e.class !== n.class && (e.class = he([e.class, n.class]));
      else if (o === "style")
        e.style = Gs([e.style, n.style]);
      else if (as(o)) {
        const r = e[o], i = n[o];
        i && r !== i && !(R(r) && r.includes(i)) && (e[o] = r ? [].concat(r, i) : i);
      } else o !== "" && (e[o] = n[o]);
  }
  return e;
}
function Rt(t, e, s, n = null) {
  Lt(t, e, 7, [
    s,
    n
  ]);
}
const Li = Eo();
let Hi = 0;
function Vi(t, e, s) {
  const n = t.type, o = (e ? e.appContext : t.appContext) || Li, r = {
    uid: Hi++,
    vnode: t,
    type: n,
    parent: e,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new lr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(o.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Mo(n, o),
    emitsOptions: Ho(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: U,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = e ? e.root : r, r.emit = Ti.bind(null, r), t.ce && t.ce(r), r;
}
let ft = null;
const Wi = () => ft || _t;
let rs, Ns;
{
  const t = fs(), e = (s, n) => {
    let o;
    return (o = t[s]) || (o = t[s] = []), o.push(n), (r) => {
      o.length > 1 ? o.forEach((i) => i(r)) : o[0](r);
    };
  };
  rs = e(
    "__VUE_INSTANCE_SETTERS__",
    (s) => ft = s
  ), Ns = e(
    "__VUE_SSR_SETTERS__",
    (s) => Le = s
  );
}
const We = (t) => {
  const e = ft;
  return rs(t), t.scope.on(), () => {
    t.scope.off(), rs(e);
  };
}, An = () => {
  ft && ft.scope.off(), rs(null);
};
function Uo(t) {
  return t.vnode.shapeFlag & 4;
}
let Le = !1;
function Ni(t, e = !1, s = !1) {
  e && Ns(e);
  const { props: n, children: o } = t.vnode, r = Uo(t);
  di(t, n, r, e), mi(t, o, s || e);
  const i = r ? $i(t, e) : void 0;
  return e && Ns(!1), i;
}
function $i(t, e) {
  const s = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, ni);
  const { setup: n } = s;
  if (n) {
    Ut();
    const o = t.setupContext = n.length > 1 ? Bi(t) : null, r = We(t), i = Ve(
      n,
      t,
      0,
      [
        t.props,
        o
      ]
    ), l = Un(i);
    if (Bt(), r(), (l || t.sp) && !Me(t) && xo(t), l) {
      if (i.then(An, An), e)
        return i.then((c) => {
          On(t, c);
        }).catch((c) => {
          hs(c, t, 0);
        });
      t.asyncDep = i;
    } else
      On(t, i);
  } else
    Bo(t);
}
function On(t, e, s) {
  F(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : J(e) && (t.setupState = fo(e)), Bo(t);
}
function Bo(t, e, s) {
  const n = t.type;
  t.render || (t.render = n.render || Dt);
  {
    const o = We(t);
    Ut();
    try {
      oi(t);
    } finally {
      Bt(), o();
    }
  }
}
const Ui = {
  get(t, e) {
    return it(t, "get", ""), t[e];
  }
};
function Bi(t) {
  const e = (s) => {
    t.exposed = s || {};
  };
  return {
    attrs: new Proxy(t.attrs, Ui),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function ys(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(fo(Or(t.exposed)), {
    get(e, s) {
      if (s in e)
        return e[s];
      if (s in Re)
        return Re[s](t);
    },
    has(e, s) {
      return s in e || s in Re;
    }
  })) : t.proxy;
}
function Ki(t) {
  return F(t) && "__vccOpts" in t;
}
const Ye = (t, e) => Dr(t, e, Le), qi = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let $s;
const In = typeof window < "u" && window.trustedTypes;
if (In)
  try {
    $s = /* @__PURE__ */ In.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const Ko = $s ? (t) => $s.createHTML(t) : (t) => t, Gi = "http://www.w3.org/2000/svg", Ji = "http://www.w3.org/1998/Math/MathML", Wt = typeof document < "u" ? document : null, Mn = Wt && /* @__PURE__ */ Wt.createElement("template"), Qi = {
  insert: (t, e, s) => {
    e.insertBefore(t, s || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, s, n) => {
    const o = e === "svg" ? Wt.createElementNS(Gi, t) : e === "mathml" ? Wt.createElementNS(Ji, t) : s ? Wt.createElement(t, { is: s }) : Wt.createElement(t);
    return t === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (t) => Wt.createTextNode(t),
  createComment: (t) => Wt.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Wt.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, s, n, o, r) {
    const i = s ? s.previousSibling : e.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; e.insertBefore(o.cloneNode(!0), s), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      Mn.innerHTML = Ko(
        n === "svg" ? `<svg>${t}</svg>` : n === "mathml" ? `<math>${t}</math>` : t
      );
      const l = Mn.content;
      if (n === "svg" || n === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      e.insertBefore(l, s);
    }
    return [
      // first
      i ? i.nextSibling : e.firstChild,
      // last
      s ? s.previousSibling : e.lastChild
    ];
  }
}, zi = Symbol("_vtc");
function Yi(t, e, s) {
  const n = t[zi];
  n && (e = (e ? [e, ...n] : [...n]).join(" ")), e == null ? t.removeAttribute("class") : s ? t.setAttribute("class", e) : t.className = e;
}
const Rn = Symbol("_vod"), Xi = Symbol("_vsh"), Zi = Symbol(""), tl = /(^|;)\s*display\s*:/;
function el(t, e, s) {
  const n = t.style, o = ot(s);
  let r = !1;
  if (s && !o) {
    if (e)
      if (ot(e))
        for (const i of e.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          s[l] == null && Xe(n, l, "");
        }
      else
        for (const i in e)
          s[i] == null && Xe(n, i, "");
    for (const i in s)
      i === "display" && (r = !0), Xe(n, i, s[i]);
  } else if (o) {
    if (e !== s) {
      const i = n[Zi];
      i && (s += ";" + i), n.cssText = s, r = tl.test(s);
    }
  } else e && t.removeAttribute("style");
  Rn in t && (t[Rn] = r ? n.display : "", t[Xi] && (n.display = "none"));
}
const Pn = /\s*!important$/;
function Xe(t, e, s) {
  if (R(s))
    s.forEach((n) => Xe(t, e, n));
  else if (s == null && (s = ""), e.startsWith("--"))
    t.setProperty(e, s);
  else {
    const n = sl(t, e);
    Pn.test(s) ? t.setProperty(
      le(n),
      s.replace(Pn, ""),
      "important"
    ) : t[n] = s;
  }
}
const Fn = ["Webkit", "Moz", "ms"], Is = {};
function sl(t, e) {
  const s = Is[e];
  if (s)
    return s;
  let n = zt(e);
  if (n !== "filter" && n in t)
    return Is[e] = n;
  n = qn(n);
  for (let o = 0; o < Fn.length; o++) {
    const r = Fn[o] + n;
    if (r in t)
      return Is[e] = r;
  }
  return e;
}
const Dn = "http://www.w3.org/1999/xlink";
function kn(t, e, s, n, o, r = or(e)) {
  n && e.startsWith("xlink:") ? s == null ? t.removeAttributeNS(Dn, e.slice(6, e.length)) : t.setAttributeNS(Dn, e, s) : s == null || r && !Gn(s) ? t.removeAttribute(e) : t.setAttribute(
    e,
    r ? "" : jt(s) ? String(s) : s
  );
}
function jn(t, e, s, n, o) {
  if (e === "innerHTML" || e === "textContent") {
    s != null && (t[e] = e === "innerHTML" ? Ko(s) : s);
    return;
  }
  const r = t.tagName;
  if (e === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? t.getAttribute("value") || "" : t.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in t)) && (t.value = c), s == null && t.removeAttribute(e), t._value = s;
    return;
  }
  let i = !1;
  if (s === "" || s == null) {
    const l = typeof t[e];
    l === "boolean" ? s = Gn(s) : s == null && l === "string" ? (s = "", i = !0) : l === "number" && (s = 0, i = !0);
  }
  try {
    t[e] = s;
  } catch {
  }
  i && t.removeAttribute(o || e);
}
function re(t, e, s, n) {
  t.addEventListener(e, s, n);
}
function nl(t, e, s, n) {
  t.removeEventListener(e, s, n);
}
const Ln = Symbol("_vei");
function ol(t, e, s, n, o = null) {
  const r = t[Ln] || (t[Ln] = {}), i = r[e];
  if (n && i)
    i.value = n;
  else {
    const [l, c] = rl(e);
    if (n) {
      const h = r[e] = al(
        n,
        o
      );
      re(t, l, h, c);
    } else i && (nl(t, l, i, c), r[e] = void 0);
  }
}
const Hn = /(?:Once|Passive|Capture)$/;
function rl(t) {
  let e;
  if (Hn.test(t)) {
    e = {};
    let n;
    for (; n = t.match(Hn); )
      t = t.slice(0, t.length - n[0].length), e[n[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : le(t.slice(2)), e];
}
let Ms = 0;
const il = /* @__PURE__ */ Promise.resolve(), ll = () => Ms || (il.then(() => Ms = 0), Ms = Date.now());
function al(t, e) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Lt(
      cl(n, s.value),
      e,
      5,
      [n]
    );
  };
  return s.value = t, s.attached = ll(), s;
}
function cl(t, e) {
  if (R(e)) {
    const s = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      s.call(t), t._stopped = !0;
    }, e.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return e;
}
const Vn = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, ul = (t, e, s, n, o, r) => {
  const i = o === "svg";
  e === "class" ? Yi(t, n, i) : e === "style" ? el(t, s, n) : as(e) ? Bs(e) || ol(t, e, s, n, r) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : fl(t, e, n, i)) ? (jn(t, e, n), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && kn(t, e, n, i, r, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !ot(n)) ? jn(t, zt(e), n, r, e) : (e === "true-value" ? t._trueValue = n : e === "false-value" && (t._falseValue = n), kn(t, e, n, i));
};
function fl(t, e, s, n) {
  if (n)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Vn(e) && F(s));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const o = t.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Vn(e) && ot(s) ? !1 : e in t;
}
const is = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return R(e) ? (s) => Ge(e, s) : e;
};
function dl(t) {
  t.target.composing = !0;
}
function Wn(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const ye = Symbol("_assign"), Rs = {
  created(t, { modifiers: { lazy: e, trim: s, number: n } }, o) {
    t[ye] = is(o);
    const r = n || o.props && o.props.type === "number";
    re(t, e ? "change" : "input", (i) => {
      if (i.target.composing) return;
      let l = t.value;
      s && (l = l.trim()), r && (l = Ze(l)), t[ye](l);
    }), s && re(t, "change", () => {
      t.value = t.value.trim();
    }), e || (re(t, "compositionstart", dl), re(t, "compositionend", Wn), re(t, "change", Wn));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: s, modifiers: { lazy: n, trim: o, number: r } }, i) {
    if (t[ye] = is(i), t.composing) return;
    const l = (r || t.type === "number") && !/^0\d/.test(t.value) ? Ze(t.value) : t.value, c = e ?? "";
    l !== c && (document.activeElement === t && t.type !== "range" && (n && e === s || o && t.value.trim() === c) || (t.value = c));
  }
}, ue = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(t, { value: e, modifiers: { number: s } }, n) {
    const o = cs(e);
    re(t, "change", () => {
      const r = Array.prototype.filter.call(t.options, (i) => i.selected).map(
        (i) => s ? Ze(ls(i)) : ls(i)
      );
      t[ye](
        t.multiple ? o ? new Set(r) : r : r[0]
      ), t._assigning = !0, ho(() => {
        t._assigning = !1;
      });
    }), t[ye] = is(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(t, { value: e }) {
    Nn(t, e);
  },
  beforeUpdate(t, e, s) {
    t[ye] = is(s);
  },
  updated(t, { value: e }) {
    t._assigning || Nn(t, e);
  }
};
function Nn(t, e) {
  const s = t.multiple, n = R(e);
  if (!(s && !n && !cs(e))) {
    for (let o = 0, r = t.options.length; o < r; o++) {
      const i = t.options[o], l = ls(i);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? i.selected = e.some((h) => String(h) === String(l)) : i.selected = ir(e, l) > -1;
        } else
          i.selected = e.has(l);
      else if (ds(ls(i), e)) {
        t.selectedIndex !== o && (t.selectedIndex = o);
        return;
      }
    }
    !s && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function ls(t) {
  return "_value" in t ? t._value : t.value;
}
const pl = /* @__PURE__ */ at({ patchProp: ul }, Qi);
let $n;
function hl() {
  return $n || ($n = yi(pl));
}
const gl = (...t) => {
  const e = hl().createApp(...t), { mount: s } = e;
  return e.mount = (n) => {
    const o = bl(n);
    if (!o) return;
    const r = e._component;
    !F(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = s(o, !1, ml(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, e;
};
function ml(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function bl(t) {
  return ot(t) ? document.querySelector(t) : t;
}
const yl = { class: "min-h-screen bg-gray-50 flex flex-col" }, xl = { class: "bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-cyan-500 shadow-lg" }, vl = { class: "px-6 py-4 flex items-center justify-between" }, _l = { class: "relative" }, wl = { class: "flex flex-1 overflow-hidden" }, Sl = {
  key: 0,
  class: "w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden"
}, Cl = { class: "p-4 border-b border-gray-200" }, El = { class: "relative" }, Tl = { class: "flex-1 overflow-y-auto" }, Al = {
  key: 0,
  class: "p-4 text-center text-gray-500 text-sm"
}, Ol = ["onClick"], Il = { class: "flex justify-between items-start mb-1" }, Ml = { class: "font-medium text-sm text-gray-900" }, Rl = { class: "text-xs font-semibold text-blue-600" }, Pl = { class: "flex justify-between text-xs text-gray-500" }, Fl = {
  key: 1,
  class: "flex-1 overflow-y-auto"
}, Dl = { class: "p-6" }, kl = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, jl = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4" }, Ll = {
  key: 0,
  class: "grid grid-cols-1 md:grid-cols-2 gap-4"
}, Hl = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, Vl = {
  key: 0,
  class: "text-center py-8 text-gray-500"
}, Wl = {
  key: 1,
  class: "overflow-x-auto"
}, Nl = { class: "w-full text-sm" }, $l = { class: "py-3 px-4" }, Ul = { class: "font-medium text-gray-900" }, Bl = { class: "text-xs text-gray-500" }, Kl = { class: "py-3 px-4 text-center" }, ql = { class: "py-3 px-4 text-right" }, Gl = { class: "py-3 px-4 text-right font-medium text-gray-900" }, Jl = { class: "py-3 px-4 text-center" }, Ql = ["onClick"], zl = { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, Yl = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6" }, Xl = { class: "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white border-2 border-blue-400" }, Zl = { class: "text-5xl font-bold" }, ta = { class: "text-blue-100 text-sm mt-2" }, ea = { class: "space-y-2" }, sa = ["disabled"], na = {
  key: 2,
  class: "flex-1 overflow-y-auto bg-gray-50"
}, oa = { class: "p-6" }, ra = { class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" }, ia = { class: "overflow-x-auto" }, la = { class: "w-full text-sm" }, aa = { class: "px-6 py-4 font-medium text-gray-900" }, ca = { class: "px-6 py-4 text-gray-700" }, ua = { class: "px-6 py-4 text-gray-700" }, fa = { class: "px-6 py-4 text-gray-700" }, da = { class: "px-6 py-4 text-gray-700" }, pa = { class: "px-6 py-4 text-gray-700" }, ha = { class: "px-6 py-4 text-right font-medium text-gray-900" }, ga = { class: "px-6 py-4 text-center" }, ma = { class: "px-6 py-4 text-center" }, ba = { class: "flex gap-2 justify-center" }, ya = ["onClick"], xa = ["onClick"], va = ["onClick"], _a = {
  key: 0,
  class: "text-center py-12 text-gray-500"
}, wa = {
  key: 3,
  class: "flex-1 overflow-y-auto bg-gray-50"
}, Sa = { class: "p-6" }, Ca = { class: "mb-6 flex items-center justify-between" }, Ea = { class: "text-3xl font-bold text-gray-900" }, Ta = { class: "grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6" }, Aa = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Oa = { class: "text-lg font-bold text-gray-900" }, Ia = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Ma = { class: "text-lg font-bold text-gray-900" }, Ra = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Pa = { class: "text-lg font-bold text-gray-900" }, Fa = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Da = { class: "text-lg font-bold text-gray-900" }, ka = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, ja = { class: "overflow-x-auto" }, La = { class: "w-full text-sm" }, Ha = { class: "px-6 py-4 font-medium text-gray-900" }, Va = { class: "px-6 py-4 text-center text-gray-700" }, Wa = { class: "px-6 py-4 text-center text-gray-700" }, Na = { class: "px-6 py-4 text-right text-gray-700" }, $a = { class: "px-6 py-4 text-right font-medium text-gray-900" }, Ua = { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, Ba = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6" }, Ka = { class: "space-y-2" }, qa = { class: "flex justify-between" }, Ga = { class: "font-bold text-gray-900" }, Ja = { class: "flex justify-between text-sm" }, Qa = { class: "font-semibold text-gray-900" }, za = { class: "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white border-2 border-blue-400 flex flex-col justify-between" }, Ya = { class: "text-5xl font-bold" }, Xa = { class: "text-blue-100 text-sm mt-4" }, Za = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6" }, tc = { class: "space-y-2" }, ec = {
  key: 2,
  disabled: "",
  class: "w-full px-4 py-2 bg-gray-400 text-gray-100 font-bold rounded-lg cursor-not-allowed"
}, sc = /* @__PURE__ */ Ur({
  __name: "App",
  setup(t) {
    const e = nt("form"), s = nt(null), n = [
      { id: "1", name: "Wheat Flour", code: "WF001", rate: 35, availableQty: 150, unit: "kg" },
      { id: "2", name: "Rice", code: "RICE001", rate: 45, availableQty: 200, unit: "kg" },
      { id: "3", name: "Sugar", code: "SG001", rate: 52, availableQty: 100, unit: "kg" },
      { id: "4", name: "Oil", code: "OIL001", rate: 120, availableQty: 50, unit: "ltr" },
      { id: "5", name: "Salt", code: "SALT001", rate: 25, availableQty: 300, unit: "kg" },
      { id: "6", name: "Spices Mix", code: "SPICE001", rate: 250, availableQty: 20, unit: "kg" }
    ], o = {
      SE001: [
        { id: "1", name: "Wheat Flour", code: "WF001", qty: 50, rate: 35, amount: 1750 },
        { id: "2", name: "Rice", code: "RICE001", qty: 30, rate: 45, amount: 1350 },
        { id: "3", name: "Sugar", code: "SG001", qty: 40, rate: 52, amount: 2080 },
        { id: "4", name: "Oil", code: "OIL001", qty: 10, rate: 120, amount: 1200 },
        { id: "5", name: "Salt", code: "SALT001", qty: 20, rate: 25, amount: 500 },
        { id: "6", name: "Spices Mix", code: "SPICE001", qty: 5, rate: 250, amount: 1250 },
        { id: "7", name: "Flour", code: "FL001", qty: 25, rate: 40, amount: 1e3 },
        { id: "8", name: "Pulses", code: "PUL001", qty: 15, rate: 110, amount: 1650 }
      ],
      SE002: [
        { id: "1", name: "Rice", code: "RICE001", qty: 20, rate: 45, amount: 900 },
        { id: "2", name: "Oil", code: "OIL001", qty: 15, rate: 120, amount: 1800 },
        { id: "3", name: "Salt", code: "SALT001", qty: 5, rate: 25, amount: 125 }
      ],
      SE003: [
        { id: "1", name: "Sugar", code: "SG001", qty: 60, rate: 52, amount: 3120 },
        { id: "2", name: "Wheat Flour", code: "WF001", qty: 40, rate: 35, amount: 1400 },
        { id: "3", name: "Spices Mix", code: "SPICE001", qty: 8, rate: 250, amount: 2e3 },
        { id: "4", name: "Pulses", code: "PUL001", qty: 10, rate: 110, amount: 1100 },
        { id: "5", name: "Oil", code: "OIL001", qty: 5, rate: 120, amount: 600 }
      ],
      SE004: [
        { id: "1", name: "Wheat Flour", code: "WF001", qty: 35, rate: 35, amount: 1225 },
        { id: "2", name: "Rice", code: "RICE001", qty: 25, rate: 45, amount: 1125 },
        { id: "3", name: "Sugar", code: "SG001", qty: 20, rate: 52, amount: 1040 },
        { id: "4", name: "Oil", code: "OIL001", qty: 8, rate: 120, amount: 960 }
      ]
    }, r = nt([
      {
        id: "SE001",
        company: "Main Company",
        type: "Purchase",
        date: "2025-11-20",
        targetWarehouse: "Main Warehouse",
        totalAmount: 10780,
        itemCount: 8,
        status: "submitted"
      },
      {
        id: "SE002",
        company: "Main Company",
        type: "Material Transfer",
        date: "2025-11-21",
        targetWarehouse: "Distribution Center",
        totalAmount: 2825,
        itemCount: 3,
        status: "submitted"
      },
      {
        id: "SE003",
        company: "Branch A",
        type: "Manufacture",
        date: "2025-11-22",
        targetWarehouse: "Regional Store",
        totalAmount: 8220,
        itemCount: 5,
        status: "submitted"
      },
      {
        id: "SE004",
        company: "Main Company",
        type: "Purchase",
        date: "2025-11-23",
        targetWarehouse: "Main Warehouse",
        totalAmount: 4350,
        itemCount: 4,
        status: "draft"
      }
    ]), i = nt(""), l = nt(""), c = nt(""), h = nt((/* @__PURE__ */ new Date()).toISOString().split("T")[0]), d = nt([]), m = nt("");
    nt("");
    const T = nt(""), O = nt("0"), D = nt(""), k = nt(""), Z = nt(""), j = nt(""), $ = nt("");
    nt(null), nt(null), nt("");
    const G = Ye(() => n.filter(
      (tt) => tt.name.toLowerCase().includes(i.value.toLowerCase()) || tt.code.toLowerCase().includes(i.value.toLowerCase())
    )), A = Ye(() => r.value.find((tt) => tt.id === s.value)), et = (tt) => {
      s.value = tt, e.value = "detail";
    }, St = () => {
      e.value = "list", s.value = null;
    }, gt = Ye(() => d.value.reduce((g, S) => g + S.amount, 0) + (parseFloat(O.value) || 0)), Et = (tt) => {
      d.value = d.value.filter((g) => g.id !== tt);
    }, ae = () => {
      const tt = j.value === "manufacture" || j.value === "material_transfer_for_manufacture";
      if (!D.value || !j.value || !Z.value || d.value.length === 0) {
        alert("Please fill all required fields and add items");
        return;
      }
      if (tt && !$.value) {
        alert("Work Order is required for this stock entry type");
        return;
      }
      const g = {
        id: "SE" + String(r.value.length + 1).padStart(3, "0"),
        company: D.value,
        type: j.value,
        date: h.value,
        targetWarehouse: Z.value,
        totalAmount: gt.value,
        itemCount: d.value.length,
        status: "submitted"
      };
      r.value.unshift(g), alert("Stock entry saved and submitted successfully!"), Tt(), e.value = "list";
    }, Tt = () => {
      d.value = [], l.value = "", c.value = "", h.value = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], O.value = "0", i.value = "", D.value = "", k.value = "", Z.value = "", j.value = "", $.value = "";
    }, Zt = (tt) => {
      const g = n.find((st) => st.id === tt);
      if (!g) return;
      const S = d.value.find((st) => st.id === tt);
      if (S)
        S.qty += 1, S.amount = S.qty * S.rate;
      else {
        const st = {
          id: tt,
          name: g.name,
          code: g.code,
          qty: 1,
          rate: g.rate,
          amount: g.rate
        };
        d.value.push(st);
      }
      m.value = tt, T.value = g.rate.toString();
    };
    return (tt, g) => (Q(), X("div", yl, [
      u("header", xl, [
        u("div", vl, [
          g[13] || (g[13] = Os('<div class="flex items-center gap-3" data-v-5498286c><div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center" data-v-5498286c><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5498286c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m0 0h6M6 12h6m0 0H6" data-v-5498286c></path></svg></div><div data-v-5498286c><h1 class="text-2xl font-bold text-white" data-v-5498286c>Stock Entry</h1><p class="text-xs text-blue-100" data-v-5498286c>Inventory Management System</p></div></div>', 1)),
          u("div", _l, [
            Vt(u("select", {
              "onUpdate:modelValue": g[0] || (g[0] = (S) => e.value = S),
              class: "px-4 py-2 rounded-lg font-medium transition duration-200 appearance-none bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer pr-10 text-base"
            }, g[11] || (g[11] = [
              u("option", { value: "form" }, "📝 New Entry", -1),
              u("option", { value: "list" }, "📋 View Entries", -1)
            ]), 512), [
              [ue, e.value]
            ]),
            g[12] || (g[12] = u("svg", {
              class: "w-5 h-5 text-blue-600 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              u("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 14l-7 7m0 0l-7-7m7 7V3"
              })
            ], -1))
          ])
        ])
      ]),
      u("div", wl, [
        e.value === "form" ? (Q(), X("div", Sl, [
          u("div", Cl, [
            u("div", El, [
              g[14] || (g[14] = u("svg", {
                class: "w-4 h-4 absolute left-3 top-3 text-gray-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                u("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                })
              ], -1)),
              Vt(u("input", {
                "onUpdate:modelValue": g[1] || (g[1] = (S) => i.value = S),
                type: "text",
                placeholder: "Search items...",
                class: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              }, null, 512), [
                [Rs, i.value]
              ])
            ])
          ]),
          u("div", Tl, [
            G.value.length === 0 ? (Q(), X("div", Al, " No items found ")) : vt("", !0),
            (Q(!0), X(yt, null, qe(G.value, (S) => (Q(), X("div", {
              key: S.id,
              onClick: (st) => Zt(S.id),
              class: he([
                "px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition",
                m.value === S.id ? "bg-blue-100 border-l-4 border-l-blue-600" : ""
              ])
            }, [
              u("div", Il, [
                u("span", Ml, L(S.name), 1),
                u("span", Rl, "₹" + L(S.rate.toFixed(2)), 1)
              ]),
              u("div", Pl, [
                u("span", null, L(S.code), 1),
                u("span", null, L(S.availableQty) + " " + L(S.unit), 1)
              ])
            ], 10, Ol))), 128))
          ])
        ])) : vt("", !0),
        e.value === "form" ? (Q(), X("div", Fl, [
          u("div", Dl, [
            u("div", kl, [
              g[26] || (g[26] = u("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Entry Details", -1)),
              u("div", jl, [
                u("div", null, [
                  g[16] || (g[16] = u("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    qt("Company "),
                    u("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  Vt(u("select", {
                    "onUpdate:modelValue": g[2] || (g[2] = (S) => D.value = S),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, g[15] || (g[15] = [
                    u("option", { value: "" }, "Select Company", -1),
                    u("option", { value: "company1" }, "Main Company", -1),
                    u("option", { value: "company2" }, "Branch A", -1),
                    u("option", { value: "company3" }, "Branch B", -1)
                  ]), 512), [
                    [ue, D.value]
                  ])
                ]),
                u("div", null, [
                  g[18] || (g[18] = u("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    qt("Stock Entry Type "),
                    u("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  Vt(u("select", {
                    "onUpdate:modelValue": g[3] || (g[3] = (S) => j.value = S),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, g[17] || (g[17] = [
                    Os('<option value="" data-v-5498286c>Select Type</option><option value="purchase" data-v-5498286c>Purchase</option><option value="material_transfer" data-v-5498286c>Material Transfer</option><option value="manufacture" data-v-5498286c>Manufacture</option><option value="material_transfer_for_manufacture" data-v-5498286c> Material Transfer for Manufacture </option>', 5)
                  ]), 512), [
                    [ue, j.value]
                  ])
                ]),
                u("div", null, [
                  g[19] || (g[19] = u("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Entry Date", -1)),
                  Vt(u("input", {
                    "onUpdate:modelValue": g[4] || (g[4] = (S) => h.value = S),
                    type: "date",
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, null, 512), [
                    [Rs, h.value]
                  ])
                ]),
                u("div", null, [
                  g[21] || (g[21] = u("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Source Warehouse", -1)),
                  Vt(u("select", {
                    "onUpdate:modelValue": g[5] || (g[5] = (S) => k.value = S),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, g[20] || (g[20] = [
                    u("option", { value: "" }, "Select Source Warehouse", -1),
                    u("option", { value: "warehouse1" }, "Main Warehouse", -1),
                    u("option", { value: "warehouse2" }, "Distribution Center", -1),
                    u("option", { value: "warehouse3" }, "Regional Store", -1)
                  ]), 512), [
                    [ue, k.value]
                  ])
                ]),
                u("div", null, [
                  g[23] || (g[23] = u("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    qt("Target Warehouse "),
                    u("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  Vt(u("select", {
                    "onUpdate:modelValue": g[6] || (g[6] = (S) => Z.value = S),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, g[22] || (g[22] = [
                    u("option", { value: "" }, "Select Target Warehouse", -1),
                    u("option", { value: "warehouse1" }, "Main Warehouse", -1),
                    u("option", { value: "warehouse2" }, "Distribution Center", -1),
                    u("option", { value: "warehouse3" }, "Regional Store", -1)
                  ]), 512), [
                    [ue, Z.value]
                  ])
                ])
              ]),
              j.value === "manufacture" || j.value === "material_transfer_for_manufacture" ? (Q(), X("div", Ll, [
                u("div", null, [
                  g[25] || (g[25] = u("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    qt("Work Order "),
                    u("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  Vt(u("select", {
                    "onUpdate:modelValue": g[7] || (g[7] = (S) => $.value = S),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, g[24] || (g[24] = [
                    u("option", { value: "" }, "Select Work Order", -1),
                    u("option", { value: "wo001" }, "WO-001-2025", -1),
                    u("option", { value: "wo002" }, "WO-002-2025", -1),
                    u("option", { value: "wo003" }, "WO-003-2025", -1)
                  ]), 512), [
                    [ue, $.value]
                  ])
                ])
              ])) : vt("", !0)
            ]),
            u("div", Hl, [
              g[29] || (g[29] = u("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Items in Entry", -1)),
              d.value.length === 0 ? (Q(), X("div", Vl, g[27] || (g[27] = [
                u("svg", {
                  class: "w-12 h-12 mx-auto mb-2 text-gray-300",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1),
                u("p", null, "No items added yet. Add items to create an entry.", -1)
              ]))) : (Q(), X("div", Wl, [
                u("table", Nl, [
                  g[28] || (g[28] = u("thead", null, [
                    u("tr", { class: "border-b-2 border-gray-200" }, [
                      u("th", { class: "text-left py-2 px-4 font-semibold text-gray-700" }, "Item Name"),
                      u("th", { class: "text-center py-2 px-4 font-semibold text-gray-700" }, "Qty"),
                      u("th", { class: "text-right py-2 px-4 font-semibold text-gray-700" }, "Rate (₹)"),
                      u("th", { class: "text-right py-2 px-4 font-semibold text-gray-700" }, "Amount (₹)"),
                      u("th", { class: "text-center py-2 px-4 font-semibold text-gray-700" }, "Action")
                    ])
                  ], -1)),
                  u("tbody", null, [
                    (Q(!0), X(yt, null, qe(d.value, (S) => (Q(), X("tr", {
                      key: S.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      u("td", $l, [
                        u("div", Ul, L(S.name), 1),
                        u("div", Bl, L(S.code), 1)
                      ]),
                      u("td", Kl, L(S.qty), 1),
                      u("td", ql, L(S.rate.toFixed(2)), 1),
                      u("td", Gl, L(S.amount.toFixed(2)), 1),
                      u("td", Jl, [
                        u("button", {
                          onClick: (st) => Et(S.id),
                          class: "text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition"
                        }, " Delete ", 8, Ql)
                      ])
                    ]))), 128))
                  ])
                ])
              ]))
            ]),
            u("div", zl, [
              u("div", Yl, [
                g[31] || (g[31] = u("h3", { class: "font-semibold text-gray-900 mb-4" }, "Additional Charges", -1)),
                u("div", null, [
                  g[30] || (g[30] = u("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Delivery Charges (₹)", -1)),
                  Vt(u("input", {
                    "onUpdate:modelValue": g[8] || (g[8] = (S) => O.value = S),
                    type: "number",
                    placeholder: "0.00",
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, null, 512), [
                    [Rs, O.value]
                  ])
                ])
              ]),
              u("div", Xl, [
                g[32] || (g[32] = u("h3", { class: "font-semibold mb-2 text-lg" }, "💰 Total Amount", -1)),
                u("div", Zl, "₹" + L(gt.value.toFixed(2)), 1),
                u("p", ta, "📦 " + L(d.value.length) + " items", 1)
              ]),
              u("div", ea, [
                u("button", {
                  onClick: ae,
                  disabled: d.value.length === 0,
                  class: "w-full px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, g[33] || (g[33] = [
                  u("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1),
                  qt(" 💾 SAVE & SUBMIT ", -1)
                ]), 8, sa),
                u("button", {
                  onClick: Tt,
                  class: "w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, g[34] || (g[34] = [
                  u("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ], -1),
                  qt(" 🗑️ CLEAR ", -1)
                ]))
              ])
            ])
          ])
        ])) : vt("", !0),
        e.value === "list" ? (Q(), X("div", na, [
          u("div", oa, [
            g[37] || (g[37] = Os('<div class="mb-6" data-v-5498286c><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-5498286c>Stock Entry List</h2><p class="text-gray-600" data-v-5498286c>Manage and track all stock entries</p></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6" data-v-5498286c><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-5498286c><div data-v-5498286c><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5498286c>Filter by Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-5498286c><option data-v-5498286c>All Entries</option><option data-v-5498286c>Submitted</option><option data-v-5498286c>Draft</option><option data-v-5498286c>Cancelled</option></select></div><div data-v-5498286c><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5498286c>Filter by Type</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-5498286c><option data-v-5498286c>All Types</option><option data-v-5498286c>Purchase</option><option data-v-5498286c>Material Transfer</option><option data-v-5498286c>Manufacture</option></select></div><div data-v-5498286c><label class="block text-sm font-medium text-gray-700 mb-1" data-v-5498286c>Search</label><input type="text" placeholder="Search by ID or Company..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-5498286c></div><div class="flex items-end" data-v-5498286c><button class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 text-base" data-v-5498286c> 🔍 SEARCH </button></div></div></div>', 2)),
            u("div", ra, [
              u("div", ia, [
                u("table", la, [
                  g[35] || (g[35] = u("thead", null, [
                    u("tr", { class: "bg-gray-50 border-b border-gray-200" }, [
                      u("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Entry ID"),
                      u("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Company"),
                      u("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Type"),
                      u("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Date"),
                      u("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Warehouse"),
                      u("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Items"),
                      u("th", { class: "px-6 py-3 text-right font-semibold text-gray-700" }, "Amount (₹)"),
                      u("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Status"),
                      u("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Actions")
                    ])
                  ], -1)),
                  u("tbody", null, [
                    (Q(!0), X(yt, null, qe(r.value, (S) => (Q(), X("tr", {
                      key: S.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      u("td", aa, L(S.id), 1),
                      u("td", ca, L(S.company), 1),
                      u("td", ua, L(S.type), 1),
                      u("td", fa, L(S.date), 1),
                      u("td", da, L(S.targetWarehouse), 1),
                      u("td", pa, L(S.itemCount), 1),
                      u("td", ha, L(S.totalAmount.toFixed(2)), 1),
                      u("td", ga, [
                        u("span", {
                          class: he([
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            S.status === "submitted" ? "bg-green-100 text-green-800" : S.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          ])
                        }, L(S.status.charAt(0).toUpperCase() + S.status.slice(1)), 3)
                      ]),
                      u("td", ma, [
                        u("div", ba, [
                          S.status === "submitted" ? (Q(), X("button", {
                            key: 0,
                            onClick: (st) => r.value = r.value.map(
                              (z) => z.id === S.id ? { ...z, status: "cancelled" } : z
                            ),
                            class: "px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition text-xs font-bold"
                          }, " ❌ Cancel ", 8, ya)) : vt("", !0),
                          S.status === "draft" ? (Q(), X("button", {
                            key: 1,
                            onClick: (st) => r.value = r.value.map(
                              (z) => z.id === S.id ? { ...z, status: "submitted" } : z
                            ),
                            class: "px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition text-xs font-bold"
                          }, " ✅ Submit ", 8, xa)) : vt("", !0),
                          u("button", {
                            onClick: (st) => et(S.id),
                            class: "px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-xs font-bold"
                          }, " 👁️ View ", 8, va)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ]),
              r.value.length === 0 ? (Q(), X("div", _a, g[36] || (g[36] = [
                u("svg", {
                  class: "w-12 h-12 mx-auto mb-2 text-gray-300",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1),
                u("p", { class: "text-lg" }, "No entries found", -1)
              ]))) : vt("", !0)
            ])
          ])
        ])) : vt("", !0),
        e.value === "detail" && A.value ? (Q(), X("div", wa, [
          u("div", Sa, [
            u("div", Ca, [
              u("div", null, [
                u("button", {
                  onClick: St,
                  class: "flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold mb-4 hover:bg-blue-50 rounded-lg transition"
                }, g[38] || (g[38] = [
                  u("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 19l-7-7 7-7"
                    })
                  ], -1),
                  qt(" Back to Entries ", -1)
                ])),
                u("h2", Ea, "Entry " + L(A.value?.id), 1),
                g[39] || (g[39] = u("p", { class: "text-gray-600 mt-1" }, "View and manage stock entry details", -1))
              ]),
              u("span", {
                class: he([
                  "px-4 py-2 rounded-full text-sm font-bold",
                  A.value.status === "submitted" ? "bg-green-100 text-green-800" : A.value.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                ])
              }, L(A.value.status.toUpperCase()), 3)
            ]),
            u("div", Ta, [
              u("div", Aa, [
                g[40] || (g[40] = u("p", { class: "text-sm text-gray-600 mb-1" }, "Company", -1)),
                u("p", Oa, L(A.value.company), 1)
              ]),
              u("div", Ia, [
                g[41] || (g[41] = u("p", { class: "text-sm text-gray-600 mb-1" }, "Entry Type", -1)),
                u("p", Ma, L(A.value.type), 1)
              ]),
              u("div", Ra, [
                g[42] || (g[42] = u("p", { class: "text-sm text-gray-600 mb-1" }, "Date", -1)),
                u("p", Pa, L(A.value.date), 1)
              ]),
              u("div", Fa, [
                g[43] || (g[43] = u("p", { class: "text-sm text-gray-600 mb-1" }, "Warehouse", -1)),
                u("p", Da, L(A.value.targetWarehouse), 1)
              ])
            ]),
            u("div", ka, [
              g[45] || (g[45] = u("h3", { class: "text-xl font-bold text-gray-900 mb-4" }, "📦 Items", -1)),
              u("div", ja, [
                u("table", La, [
                  g[44] || (g[44] = u("thead", null, [
                    u("tr", { class: "bg-gray-50 border-b border-gray-200" }, [
                      u("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Item Name"),
                      u("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Code"),
                      u("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Qty"),
                      u("th", { class: "px-6 py-3 text-right font-semibold text-gray-700" }, "Rate (₹)"),
                      u("th", { class: "px-6 py-3 text-right font-semibold text-gray-700" }, "Amount (₹)")
                    ])
                  ], -1)),
                  u("tbody", null, [
                    (Q(!0), X(yt, null, qe(o[A.value?.id], (S) => (Q(), X("tr", {
                      key: S.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      u("td", Ha, L(S.name), 1),
                      u("td", Va, L(S.code), 1),
                      u("td", Wa, L(S.qty), 1),
                      u("td", Na, L(S.rate.toFixed(2)), 1),
                      u("td", $a, L(S.amount.toFixed(2)), 1)
                    ]))), 128))
                  ])
                ])
              ])
            ]),
            u("div", Ua, [
              u("div", Ba, [
                g[48] || (g[48] = u("h4", { class: "font-semibold text-gray-900 mb-3" }, "Entry Summary", -1)),
                u("div", Ka, [
                  u("div", qa, [
                    g[46] || (g[46] = u("span", { class: "text-gray-600" }, "Items Count:", -1)),
                    u("span", Ga, L(A.value.itemCount), 1)
                  ]),
                  u("div", Ja, [
                    g[47] || (g[47] = u("span", { class: "text-gray-600" }, "Entry Date:", -1)),
                    u("span", Qa, L(A.value.date), 1)
                  ])
                ])
              ]),
              u("div", za, [
                u("div", null, [
                  g[49] || (g[49] = u("h3", { class: "font-semibold mb-2 text-lg" }, "💰 Total Amount", -1)),
                  u("div", Ya, "₹" + L(A.value.totalAmount.toFixed(2)), 1)
                ]),
                u("p", Xa, L(A.value.itemCount) + " items • " + L(A.value.company), 1)
              ]),
              u("div", Za, [
                g[50] || (g[50] = u("h4", { class: "font-semibold text-gray-900 mb-3" }, "Actions", -1)),
                u("div", tc, [
                  A.value.status === "draft" ? (Q(), X("button", {
                    key: 0,
                    onClick: g[9] || (g[9] = (S) => r.value = r.value.map(
                      (st) => st.id === A.value?.id ? { ...st, status: "submitted" } : st
                    )),
                    class: "w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition duration-200"
                  }, " ✅ Submit Entry ")) : vt("", !0),
                  A.value.status === "submitted" ? (Q(), X("button", {
                    key: 1,
                    onClick: g[10] || (g[10] = (S) => r.value = r.value.map(
                      (st) => st.id === A.value?.id ? { ...st, status: "cancelled" } : st
                    )),
                    class: "w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-200"
                  }, " ❌ Cancel Entry ")) : vt("", !0),
                  A.value.status === "cancelled" ? (Q(), X("button", ec, " 🔒 Entry Cancelled ")) : vt("", !0),
                  u("button", {
                    onClick: St,
                    class: "w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-200"
                  }, " ← Back to List ")
                ])
              ])
            ])
          ])
        ])) : vt("", !0)
      ])
    ]));
  }
}), nc = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, o] of e)
    s[n] = o;
  return s;
}, oc = /* @__PURE__ */ nc(sc, [["__scopeId", "data-v-5498286c"]]);
function rc(t) {
  const e = gl(oc);
  return e.mount(t), e;
}
typeof window < "u" && (window.Dashboard = {
  initDashboard: rc
});
export {
  rc as initDashboard
};
