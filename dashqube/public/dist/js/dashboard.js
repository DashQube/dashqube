/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Gs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const J = {}, Ct = [], Ue = () => {
}, er = () => !1, ms = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ys = (e) => e.startsWith("onUpdate:"), de = Object.assign, Qs = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, tr = Object.prototype.hasOwnProperty, B = (e, t) => tr.call(e, t), D = Array.isArray, kt = (e) => Qt(e) === "[object Map]", Ot = (e) => Qt(e) === "[object Set]", yn = (e) => Qt(e) === "[object Date]", j = (e) => typeof e == "function", oe = (e) => typeof e == "string", We = (e) => typeof e == "symbol", X = (e) => e !== null && typeof e == "object", Gn = (e) => (X(e) || j(e)) && j(e.then) && j(e.catch), Yn = Object.prototype.toString, Qt = (e) => Yn.call(e), sr = (e) => Qt(e).slice(8, -1), Qn = (e) => Qt(e) === "[object Object]", Xs = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nt = /* @__PURE__ */ Gs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ys = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, nr = /-(\w)/g, dt = ys(
  (e) => e.replace(nr, (t, s) => s ? s.toUpperCase() : "")
), or = /\B([A-Z])/g, ht = ys(
  (e) => e.replace(or, "-$1").toLowerCase()
), Xn = ys((e) => e.charAt(0).toUpperCase() + e.slice(1)), As = ys(
  (e) => e ? `on${Xn(e)}` : ""
), ct = (e, t) => !Object.is(e, t), rs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Ns = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, cs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let xn;
const xs = () => xn || (xn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Zs(e) {
  if (D(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = oe(n) ? ar(n) : Zs(n);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (oe(e) || X(e))
    return e;
}
const rr = /;(?![^(]*\))/g, lr = /:([^]+)/, ir = /\/\*[^]*?\*\//g;
function ar(e) {
  const t = {};
  return e.replace(ir, "").split(rr).forEach((s) => {
    if (s) {
      const n = s.split(lr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function vt(e) {
  let t = "";
  if (oe(e))
    t = e;
  else if (D(e))
    for (let s = 0; s < e.length; s++) {
      const n = vt(e[s]);
      n && (t += n + " ");
    }
  else if (X(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const ur = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", cr = /* @__PURE__ */ Gs(ur);
function Zn(e) {
  return !!e || e === "";
}
function dr(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = Xt(e[n], t[n]);
  return s;
}
function Xt(e, t) {
  if (e === t) return !0;
  let s = yn(e), n = yn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = We(e), n = We(t), s || n)
    return e === t;
  if (s = D(e), n = D(t), s || n)
    return s && n ? dr(e, t) : !1;
  if (s = X(e), n = X(t), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(e).length, r = Object.keys(t).length;
    if (o !== r)
      return !1;
    for (const l in e) {
      const u = e.hasOwnProperty(l), f = t.hasOwnProperty(l);
      if (u && !f || !u && f || !Xt(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function en(e, t) {
  return e.findIndex((s) => Xt(s, t));
}
const eo = (e) => !!(e && e.__v_isRef === !0), O = (e) => oe(e) ? e : e == null ? "" : D(e) || X(e) && (e.toString === Yn || !j(e.toString)) ? eo(e) ? O(e.value) : JSON.stringify(e, to, 2) : String(e), to = (e, t) => eo(t) ? to(e, t.value) : kt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], r) => (s[Ts(n, r) + " =>"] = o, s),
    {}
  )
} : Ot(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Ts(s))
} : We(t) ? Ts(t) : X(t) && !D(t) && !Qn(t) ? String(t) : t, Ts = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    We(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ye;
class fr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ye, !t && ye && (this.index = (ye.scopes || (ye.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = ye;
      try {
        return ye = this, t();
      } finally {
        ye = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ye, ye = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ye = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
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
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function pr() {
  return ye;
}
let Y;
const Ms = /* @__PURE__ */ new WeakSet();
class so {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ye && ye.active && ye.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ms.has(this) && (Ms.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || oo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vn(this), ro(this);
    const t = Y, s = Re;
    Y = this, Re = !0;
    try {
      return this.fn();
    } finally {
      lo(this), Y = t, Re = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        nn(t);
      this.deps = this.depsTail = void 0, vn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ms.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ls(this) && this.run();
  }
  get dirty() {
    return Ls(this);
  }
}
let no = 0, Lt, Ht;
function oo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ht, Ht = e;
    return;
  }
  e.next = Lt, Lt = e;
}
function tn() {
  no++;
}
function sn() {
  if (--no > 0)
    return;
  if (Ht) {
    let t = Ht;
    for (Ht = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Lt; ) {
    let t = Lt;
    for (Lt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function ro(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function lo(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), nn(n), hr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function Ls(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (io(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function io(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Kt) || (e.globalVersion = Kt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ls(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = Y, n = Re;
  Y = e, Re = !0;
  try {
    ro(e);
    const o = e.fn(e._value);
    (t.version === 0 || ct(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Y = s, Re = n, lo(e), e.flags &= -3;
  }
}
function nn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      nn(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function hr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Re = !0;
const ao = [];
function et() {
  ao.push(Re), Re = !1;
}
function tt() {
  const e = ao.pop();
  Re = e === void 0 ? !0 : e;
}
function vn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Y;
    Y = void 0;
    try {
      t();
    } finally {
      Y = s;
    }
  }
}
let Kt = 0;
class gr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class on {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Y || !Re || Y === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Y)
      s = this.activeLink = new gr(Y, this), Y.deps ? (s.prevDep = Y.depsTail, Y.depsTail.nextDep = s, Y.depsTail = s) : Y.deps = Y.depsTail = s, uo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Y.depsTail, s.nextDep = void 0, Y.depsTail.nextDep = s, Y.depsTail = s, Y.deps === s && (Y.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Kt++, this.notify(t);
  }
  notify(t) {
    tn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      sn();
    }
  }
}
function uo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        uo(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Hs = /* @__PURE__ */ new WeakMap(), _t = Symbol(
  ""
), $s = Symbol(
  ""
), qt = Symbol(
  ""
);
function ue(e, t, s) {
  if (Re && Y) {
    let n = Hs.get(e);
    n || Hs.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new on()), o.map = n, o.key = s), o.track();
  }
}
function Qe(e, t, s, n, o, r) {
  const l = Hs.get(e);
  if (!l) {
    Kt++;
    return;
  }
  const u = (f) => {
    f && f.trigger();
  };
  if (tn(), t === "clear")
    l.forEach(u);
  else {
    const f = D(e), b = f && Xs(s);
    if (f && s === "length") {
      const h = Number(n);
      l.forEach((x, C) => {
        (C === "length" || C === qt || !We(C) && C >= h) && u(x);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && u(l.get(s)), b && u(l.get(qt)), t) {
        case "add":
          f ? b && u(l.get("length")) : (u(l.get(_t)), kt(e) && u(l.get($s)));
          break;
        case "delete":
          f || (u(l.get(_t)), kt(e) && u(l.get($s)));
          break;
        case "set":
          kt(e) && u(l.get(_t));
          break;
      }
  }
  sn();
}
function wt(e) {
  const t = U(e);
  return t === e ? t : (ue(t, "iterate", qt), Te(e) ? t : t.map(ie));
}
function vs(e) {
  return ue(e = U(e), "iterate", qt), e;
}
const br = {
  __proto__: null,
  [Symbol.iterator]() {
    return Is(this, Symbol.iterator, ie);
  },
  concat(...e) {
    return wt(this).concat(
      ...e.map((t) => D(t) ? wt(t) : t)
    );
  },
  entries() {
    return Is(this, "entries", (e) => (e[1] = ie(e[1]), e));
  },
  every(e, t) {
    return Je(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Je(this, "filter", e, t, (s) => s.map(ie), arguments);
  },
  find(e, t) {
    return Je(this, "find", e, t, ie, arguments);
  },
  findIndex(e, t) {
    return Je(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Je(this, "findLast", e, t, ie, arguments);
  },
  findLastIndex(e, t) {
    return Je(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Je(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Os(this, "includes", e);
  },
  indexOf(...e) {
    return Os(this, "indexOf", e);
  },
  join(e) {
    return wt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Os(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Pt(this, "pop");
  },
  push(...e) {
    return Pt(this, "push", e);
  },
  reduce(e, ...t) {
    return _n(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return _n(this, "reduceRight", e, t);
  },
  shift() {
    return Pt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Pt(this, "splice", e);
  },
  toReversed() {
    return wt(this).toReversed();
  },
  toSorted(e) {
    return wt(this).toSorted(e);
  },
  toSpliced(...e) {
    return wt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Pt(this, "unshift", e);
  },
  values() {
    return Is(this, "values", ie);
  }
};
function Is(e, t, s) {
  const n = vs(e), o = n[t]();
  return n !== e && !Te(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.value && (r.value = s(r.value)), r;
  }), o;
}
const mr = Array.prototype;
function Je(e, t, s, n, o, r) {
  const l = vs(e), u = l !== e && !Te(e), f = l[t];
  if (f !== mr[t]) {
    const x = f.apply(e, r);
    return u ? ie(x) : x;
  }
  let b = s;
  l !== e && (u ? b = function(x, C) {
    return s.call(this, ie(x), C, e);
  } : s.length > 2 && (b = function(x, C) {
    return s.call(this, x, C, e);
  }));
  const h = f.call(l, b, n);
  return u && o ? o(h) : h;
}
function _n(e, t, s, n) {
  const o = vs(e);
  let r = s;
  return o !== e && (Te(e) ? s.length > 3 && (r = function(l, u, f) {
    return s.call(this, l, u, f, e);
  }) : r = function(l, u, f) {
    return s.call(this, l, ie(u), f, e);
  }), o[t](r, ...n);
}
function Os(e, t, s) {
  const n = U(e);
  ue(n, "iterate", qt);
  const o = n[t](...s);
  return (o === -1 || o === !1) && un(s[0]) ? (s[0] = U(s[0]), n[t](...s)) : o;
}
function Pt(e, t, s = []) {
  et(), tn();
  const n = U(e)[t].apply(e, s);
  return sn(), tt(), n;
}
const yr = /* @__PURE__ */ Gs("__proto__,__v_isRef,__isVue"), co = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(We)
);
function xr(e) {
  We(e) || (e = String(e));
  const t = U(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
class fo {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return n === (o ? r ? Mr : bo : r ? go : ho).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const l = D(t);
    if (!o) {
      let f;
      if (l && (f = br[s]))
        return f;
      if (s === "hasOwnProperty")
        return xr;
    }
    const u = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ce(t) ? t : n
    );
    return (We(s) ? co.has(s) : yr(s)) || (o || ue(t, "get", s), r) ? u : ce(u) ? l && Xs(s) ? u : u.value : X(u) ? o ? mo(u) : ln(u) : u;
  }
}
class po extends fo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let r = t[s];
    if (!this._isShallow) {
      const f = ft(r);
      if (!Te(n) && !ft(n) && (r = U(r), n = U(n)), !D(t) && ce(r) && !ce(n))
        return f ? !1 : (r.value = n, !0);
    }
    const l = D(t) && Xs(s) ? Number(s) < t.length : B(t, s), u = Reflect.set(
      t,
      s,
      n,
      ce(t) ? t : o
    );
    return t === U(o) && (l ? ct(n, r) && Qe(t, "set", s, n) : Qe(t, "add", s, n)), u;
  }
  deleteProperty(t, s) {
    const n = B(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && Qe(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!We(s) || !co.has(s)) && ue(t, "has", s), n;
  }
  ownKeys(t) {
    return ue(
      t,
      "iterate",
      D(t) ? "length" : _t
    ), Reflect.ownKeys(t);
  }
}
class vr extends fo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const _r = /* @__PURE__ */ new po(), wr = /* @__PURE__ */ new vr(), Sr = /* @__PURE__ */ new po(!0);
const Us = (e) => e, ss = (e) => Reflect.getPrototypeOf(e);
function Cr(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, r = U(o), l = kt(r), u = e === "entries" || e === Symbol.iterator && l, f = e === "keys" && l, b = o[e](...n), h = s ? Us : t ? ds : ie;
    return !t && ue(
      r,
      "iterate",
      f ? $s : _t
    ), {
      // iterator protocol
      next() {
        const { value: x, done: C } = b.next();
        return C ? { value: x, done: C } : {
          value: u ? [h(x[0]), h(x[1])] : h(x),
          done: C
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ns(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function kr(e, t) {
  const s = {
    get(o) {
      const r = this.__v_raw, l = U(r), u = U(o);
      e || (ct(o, u) && ue(l, "get", o), ue(l, "get", u));
      const { has: f } = ss(l), b = t ? Us : e ? ds : ie;
      if (f.call(l, o))
        return b(r.get(o));
      if (f.call(l, u))
        return b(r.get(u));
      r !== l && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ue(U(o), "iterate", _t), Reflect.get(o, "size", o);
    },
    has(o) {
      const r = this.__v_raw, l = U(r), u = U(o);
      return e || (ct(o, u) && ue(l, "has", o), ue(l, "has", u)), o === u ? r.has(o) : r.has(o) || r.has(u);
    },
    forEach(o, r) {
      const l = this, u = l.__v_raw, f = U(u), b = t ? Us : e ? ds : ie;
      return !e && ue(f, "iterate", _t), u.forEach((h, x) => o.call(r, b(h), b(x), l));
    }
  };
  return de(
    s,
    e ? {
      add: ns("add"),
      set: ns("set"),
      delete: ns("delete"),
      clear: ns("clear")
    } : {
      add(o) {
        !t && !Te(o) && !ft(o) && (o = U(o));
        const r = U(this);
        return ss(r).has.call(r, o) || (r.add(o), Qe(r, "add", o, o)), this;
      },
      set(o, r) {
        !t && !Te(r) && !ft(r) && (r = U(r));
        const l = U(this), { has: u, get: f } = ss(l);
        let b = u.call(l, o);
        b || (o = U(o), b = u.call(l, o));
        const h = f.call(l, o);
        return l.set(o, r), b ? ct(r, h) && Qe(l, "set", o, r) : Qe(l, "add", o, r), this;
      },
      delete(o) {
        const r = U(this), { has: l, get: u } = ss(r);
        let f = l.call(r, o);
        f || (o = U(o), f = l.call(r, o)), u && u.call(r, o);
        const b = r.delete(o);
        return f && Qe(r, "delete", o, void 0), b;
      },
      clear() {
        const o = U(this), r = o.size !== 0, l = o.clear();
        return r && Qe(
          o,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    s[o] = Cr(o, e, t);
  }), s;
}
function rn(e, t) {
  const s = kr(e, t);
  return (n, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    B(s, o) && o in n ? s : n,
    o,
    r
  );
}
const Er = {
  get: /* @__PURE__ */ rn(!1, !1)
}, Ar = {
  get: /* @__PURE__ */ rn(!1, !0)
}, Tr = {
  get: /* @__PURE__ */ rn(!0, !1)
};
const ho = /* @__PURE__ */ new WeakMap(), go = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap();
function Ir(e) {
  switch (e) {
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
function Or(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ir(sr(e));
}
function ln(e) {
  return ft(e) ? e : an(
    e,
    !1,
    _r,
    Er,
    ho
  );
}
function Rr(e) {
  return an(
    e,
    !1,
    Sr,
    Ar,
    go
  );
}
function mo(e) {
  return an(
    e,
    !0,
    wr,
    Tr,
    bo
  );
}
function an(e, t, s, n, o) {
  if (!X(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Or(e);
  if (r === 0)
    return e;
  const l = o.get(e);
  if (l)
    return l;
  const u = new Proxy(
    e,
    r === 2 ? n : s
  );
  return o.set(e, u), u;
}
function Et(e) {
  return ft(e) ? Et(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
function Te(e) {
  return !!(e && e.__v_isShallow);
}
function un(e) {
  return e ? !!e.__v_raw : !1;
}
function U(e) {
  const t = e && e.__v_raw;
  return t ? U(t) : e;
}
function Dr(e) {
  return !B(e, "__v_skip") && Object.isExtensible(e) && Ns(e, "__v_skip", !0), e;
}
const ie = (e) => X(e) ? ln(e) : e, ds = (e) => X(e) ? mo(e) : e;
function ce(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function $(e) {
  return Pr(e, !1);
}
function Pr(e, t) {
  return ce(e) ? e : new Fr(e, t);
}
class Fr {
  constructor(t, s) {
    this.dep = new on(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : U(t), this._value = s ? t : ie(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || Te(t) || ft(t);
    t = n ? t : U(t), ct(t, s) && (this._rawValue = t, this._value = n ? t : ie(t), this.dep.trigger());
  }
}
function jr(e) {
  return ce(e) ? e.value : e;
}
const Vr = {
  get: (e, t, s) => t === "__v_raw" ? e : jr(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return ce(o) && !ce(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function yo(e) {
  return Et(e) ? e : new Proxy(e, Vr);
}
class Nr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new on(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Kt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Y !== this)
      return oo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return io(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Lr(e, t, s = !1) {
  let n, o;
  return j(e) ? n = e : (n = e.get, o = e.set), new Nr(n, o, s);
}
const os = {}, fs = /* @__PURE__ */ new WeakMap();
let xt;
function Hr(e, t = !1, s = xt) {
  if (s) {
    let n = fs.get(s);
    n || fs.set(s, n = []), n.push(e);
  }
}
function $r(e, t, s = J) {
  const { immediate: n, deep: o, once: r, scheduler: l, augmentJob: u, call: f } = s, b = (E) => o ? E : Te(E) || o === !1 || o === 0 ? Xe(E, 1) : Xe(E);
  let h, x, C, T, F = !1, R = !1;
  if (ce(e) ? (x = () => e.value, F = Te(e)) : Et(e) ? (x = () => b(e), F = !0) : D(e) ? (R = !0, F = e.some((E) => Et(E) || Te(E)), x = () => e.map((E) => {
    if (ce(E))
      return E.value;
    if (Et(E))
      return b(E);
    if (j(E))
      return f ? f(E, 2) : E();
  })) : j(e) ? t ? x = f ? () => f(e, 2) : e : x = () => {
    if (C) {
      et();
      try {
        C();
      } finally {
        tt();
      }
    }
    const E = xt;
    xt = h;
    try {
      return f ? f(e, 3, [T]) : e(T);
    } finally {
      xt = E;
    }
  } : x = Ue, t && o) {
    const E = x, ee = o === !0 ? 1 / 0 : o;
    x = () => Xe(E(), ee);
  }
  const ne = pr(), W = () => {
    h.stop(), ne && ne.active && Qs(ne.effects, h);
  };
  if (r && t) {
    const E = t;
    t = (...ee) => {
      E(...ee), W();
    };
  }
  let z = R ? new Array(e.length).fill(os) : os;
  const H = (E) => {
    if (!(!(h.flags & 1) || !h.dirty && !E))
      if (t) {
        const ee = h.run();
        if (o || F || (R ? ee.some((De, Z) => ct(De, z[Z])) : ct(ee, z))) {
          C && C();
          const De = xt;
          xt = h;
          try {
            const Z = [
              ee,
              // pass undefined as the old value when it's changed for the first time
              z === os ? void 0 : R && z[0] === os ? [] : z,
              T
            ];
            z = ee, f ? f(t, 3, Z) : (
              // @ts-expect-error
              t(...Z)
            );
          } finally {
            xt = De;
          }
        }
      } else
        h.run();
  };
  return u && u(H), h = new so(x), h.scheduler = l ? () => l(H, !1) : H, T = (E) => Hr(E, !1, h), C = h.onStop = () => {
    const E = fs.get(h);
    if (E) {
      if (f)
        f(E, 4);
      else
        for (const ee of E) ee();
      fs.delete(h);
    }
  }, t ? n ? H(!0) : z = h.run() : l ? l(H.bind(null, !0), !0) : h.run(), W.pause = h.pause.bind(h), W.resume = h.resume.bind(h), W.stop = W, W;
}
function Xe(e, t = 1 / 0, s) {
  if (t <= 0 || !X(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Set(), s.has(e)))
    return e;
  if (s.add(e), t--, ce(e))
    Xe(e.value, t, s);
  else if (D(e))
    for (let n = 0; n < e.length; n++)
      Xe(e[n], t, s);
  else if (Ot(e) || kt(e))
    e.forEach((n) => {
      Xe(n, t, s);
    });
  else if (Qn(e)) {
    for (const n in e)
      Xe(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Xe(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Zt(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    _s(o, t, s);
  }
}
function Ke(e, t, s, n) {
  if (j(e)) {
    const o = Zt(e, t, s, n);
    return o && Gn(o) && o.catch((r) => {
      _s(r, t, s);
    }), o;
  }
  if (D(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(Ke(e[r], t, s, n));
    return o;
  }
}
function _s(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: l } = t && t.appContext.config || J;
  if (t) {
    let u = t.parent;
    const f = t.proxy, b = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; u; ) {
      const h = u.ec;
      if (h) {
        for (let x = 0; x < h.length; x++)
          if (h[x](e, f, b) === !1)
            return;
      }
      u = u.parent;
    }
    if (r) {
      et(), Zt(r, null, 10, [
        e,
        f,
        b
      ]), tt();
      return;
    }
  }
  Ur(e, s, o, n, l);
}
function Ur(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const pe = [];
let He = -1;
const At = [];
let it = null, St = 0;
const xo = /* @__PURE__ */ Promise.resolve();
let ps = null;
function vo(e) {
  const t = ps || xo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Br(e) {
  let t = He + 1, s = pe.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = pe[n], r = Jt(o);
    r < e || r === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function cn(e) {
  if (!(e.flags & 1)) {
    const t = Jt(e), s = pe[pe.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Jt(s) ? pe.push(e) : pe.splice(Br(t), 0, e), e.flags |= 1, _o();
  }
}
function _o() {
  ps || (ps = xo.then(So));
}
function Wr(e) {
  D(e) ? At.push(...e) : it && e.id === -1 ? it.splice(St + 1, 0, e) : e.flags & 1 || (At.push(e), e.flags |= 1), _o();
}
function wn(e, t, s = He + 1) {
  for (; s < pe.length; s++) {
    const n = pe[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      pe.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function wo(e) {
  if (At.length) {
    const t = [...new Set(At)].sort(
      (s, n) => Jt(s) - Jt(n)
    );
    if (At.length = 0, it) {
      it.push(...t);
      return;
    }
    for (it = t, St = 0; St < it.length; St++) {
      const s = it[St];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    it = null, St = 0;
  }
}
const Jt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function So(e) {
  try {
    for (He = 0; He < pe.length; He++) {
      const t = pe[He];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Zt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; He < pe.length; He++) {
      const t = pe[He];
      t && (t.flags &= -2);
    }
    He = -1, pe.length = 0, wo(), ps = null, (pe.length || At.length) && So();
  }
}
let Ae = null, Co = null;
function hs(e) {
  const t = Ae;
  return Ae = e, Co = e && e.type.__scopeId || null, t;
}
function Kr(e, t = Ae, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && On(-1);
    const r = hs(t);
    let l;
    try {
      l = e(...o);
    } finally {
      hs(r), n._d && On(1);
    }
    return l;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function re(e, t) {
  if (Ae === null)
    return e;
  const s = ks(Ae), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, l, u, f = J] = t[o];
    r && (j(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Xe(l), n.push({
      dir: r,
      instance: s,
      value: l,
      oldValue: void 0,
      arg: u,
      modifiers: f
    }));
  }
  return e;
}
function mt(e, t, s, n) {
  const o = e.dirs, r = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const u = o[l];
    r && (u.oldValue = r[l].value);
    let f = u.dir[n];
    f && (et(), Ke(f, s, 8, [
      e.el,
      u,
      e,
      t
    ]), tt());
  }
}
const qr = Symbol("_vte"), Jr = (e) => e.__isTeleport;
function dn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, dn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
  return j(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    de({ name: e.name }, t, { setup: e })
  ) : e;
}
function ko(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function $t(e, t, s, n, o = !1) {
  if (D(e)) {
    e.forEach(
      (F, R) => $t(
        F,
        t && (D(t) ? t[R] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Ut(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && $t(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? ks(n.component) : n.el, l = o ? null : r, { i: u, r: f } = e, b = t && t.r, h = u.refs === J ? u.refs = {} : u.refs, x = u.setupState, C = U(x), T = x === J ? () => !1 : (F) => B(C, F);
  if (b != null && b !== f && (oe(b) ? (h[b] = null, T(b) && (x[b] = null)) : ce(b) && (b.value = null)), j(f))
    Zt(f, u, 12, [l, h]);
  else {
    const F = oe(f), R = ce(f);
    if (F || R) {
      const ne = () => {
        if (e.f) {
          const W = F ? T(f) ? x[f] : h[f] : f.value;
          o ? D(W) && Qs(W, r) : D(W) ? W.includes(r) || W.push(r) : F ? (h[f] = [r], T(f) && (x[f] = h[f])) : (f.value = [r], e.k && (h[e.k] = f.value));
        } else F ? (h[f] = l, T(f) && (x[f] = l)) : R && (f.value = l, e.k && (h[e.k] = l));
      };
      l ? (ne.id = -1, Se(ne, s)) : ne();
    }
  }
}
xs().requestIdleCallback;
xs().cancelIdleCallback;
const Ut = (e) => !!e.type.__asyncLoader, Eo = (e) => e.type.__isKeepAlive;
function Gr(e, t) {
  Ao(e, "a", t);
}
function Yr(e, t) {
  Ao(e, "da", t);
}
function Ao(e, t, s = he) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (ws(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      Eo(o.parent.vnode) && Qr(n, t, s, o), o = o.parent;
  }
}
function Qr(e, t, s, n) {
  const o = ws(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Mo(() => {
    Qs(n[t], o);
  }, s);
}
function ws(e, t, s = he, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...l) => {
      et();
      const u = es(s), f = Ke(t, s, e, l);
      return u(), tt(), f;
    });
    return n ? o.unshift(r) : o.push(r), r;
  }
}
const st = (e) => (t, s = he) => {
  (!Gt || e === "sp") && ws(e, (...n) => t(...n), s);
}, Xr = st("bm"), To = st("m"), Zr = st(
  "bu"
), el = st("u"), tl = st(
  "bum"
), Mo = st("um"), sl = st(
  "sp"
), nl = st("rtg"), ol = st("rtc");
function rl(e, t = he) {
  ws("ec", e, t);
}
const ll = Symbol.for("v-ndc");
function we(e, t, s, n) {
  let o;
  const r = s, l = D(e);
  if (l || oe(e)) {
    const u = l && Et(e);
    let f = !1, b = !1;
    u && (f = !Te(e), b = ft(e), e = vs(e)), o = new Array(e.length);
    for (let h = 0, x = e.length; h < x; h++)
      o[h] = t(
        f ? b ? ds(ie(e[h])) : ie(e[h]) : e[h],
        h,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let u = 0; u < e; u++)
      o[u] = t(u + 1, u, void 0, r);
  } else if (X(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (u, f) => t(u, f, void 0, r)
      );
    else {
      const u = Object.keys(e);
      o = new Array(u.length);
      for (let f = 0, b = u.length; f < b; f++) {
        const h = u[f];
        o[f] = t(e[h], h, f, r);
      }
    }
  else
    o = [];
  return o;
}
const Bs = (e) => e ? Yo(e) ? ks(e) : Bs(e.parent) : null, Bt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ de(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Bs(e.parent),
    $root: (e) => Bs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Oo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      cn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = vo.bind(e.proxy)),
    $watch: (e) => Tl.bind(e)
  })
), Rs = (e, t) => e !== J && !e.__isScriptSetup && B(e, t), il = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: r, accessCache: l, type: u, appContext: f } = e;
    let b;
    if (t[0] !== "$") {
      const T = l[t];
      if (T !== void 0)
        switch (T) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (Rs(n, t))
          return l[t] = 1, n[t];
        if (o !== J && B(o, t))
          return l[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (b = e.propsOptions[0]) && B(b, t)
        )
          return l[t] = 3, r[t];
        if (s !== J && B(s, t))
          return l[t] = 4, s[t];
        Ws && (l[t] = 0);
      }
    }
    const h = Bt[t];
    let x, C;
    if (h)
      return t === "$attrs" && ue(e.attrs, "get", ""), h(e);
    if (
      // css module (injected by vue-loader)
      (x = u.__cssModules) && (x = x[t])
    )
      return x;
    if (s !== J && B(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      C = f.config.globalProperties, B(C, t)
    )
      return C[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: r } = e;
    return Rs(o, t) ? (o[t] = s, !0) : n !== J && B(n, t) ? (n[t] = s, !0) : B(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, propsOptions: r }
  }, l) {
    let u;
    return !!s[l] || e !== J && B(e, l) || Rs(t, l) || (u = r[0]) && B(u, l) || B(n, l) || B(Bt, l) || B(o.config.globalProperties, l);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : B(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Sn(e) {
  return D(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Ws = !0;
function al(e) {
  const t = Oo(e), s = e.proxy, n = e.ctx;
  Ws = !1, t.beforeCreate && Cn(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: l,
    watch: u,
    provide: f,
    inject: b,
    // lifecycle
    created: h,
    beforeMount: x,
    mounted: C,
    beforeUpdate: T,
    updated: F,
    activated: R,
    deactivated: ne,
    beforeDestroy: W,
    beforeUnmount: z,
    destroyed: H,
    unmounted: E,
    render: ee,
    renderTracked: De,
    renderTriggered: Z,
    errorCaptured: xe,
    serverPrefetch: Me,
    // public API
    expose: te,
    inheritAttrs: Pe,
    // assets
    components: qe,
    directives: ge,
    filters: nt
  } = t;
  if (b && ul(b, n, null), l)
    for (const N in l) {
      const V = l[N];
      j(V) && (n[N] = V.bind(s));
    }
  if (o) {
    const N = o.call(s, s);
    X(N) && (e.data = ln(N));
  }
  if (Ws = !0, r)
    for (const N in r) {
      const V = r[N], Oe = j(V) ? V.bind(s, s) : j(V.get) ? V.get.bind(s, s) : Ue, gt = !j(V) && j(V.set) ? V.set.bind(s) : Ue, q = Vt({
        get: Oe,
        set: gt
      });
      Object.defineProperty(n, N, {
        enumerable: !0,
        configurable: !0,
        get: () => q.value,
        set: (ke) => q.value = ke
      });
    }
  if (u)
    for (const N in u)
      Io(u[N], n, s, N);
  if (f) {
    const N = j(f) ? f.call(s) : f;
    Reflect.ownKeys(N).forEach((V) => {
      gl(V, N[V]);
    });
  }
  h && Cn(h, e, "c");
  function Q(N, V) {
    D(V) ? V.forEach((Oe) => N(Oe.bind(s))) : V && N(V.bind(s));
  }
  if (Q(Xr, x), Q(To, C), Q(Zr, T), Q(el, F), Q(Gr, R), Q(Yr, ne), Q(rl, xe), Q(ol, De), Q(nl, Z), Q(tl, z), Q(Mo, E), Q(sl, Me), D(te))
    if (te.length) {
      const N = e.exposed || (e.exposed = {});
      te.forEach((V) => {
        Object.defineProperty(N, V, {
          get: () => s[V],
          set: (Oe) => s[V] = Oe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  ee && e.render === Ue && (e.render = ee), Pe != null && (e.inheritAttrs = Pe), qe && (e.components = qe), ge && (e.directives = ge), Me && ko(e);
}
function ul(e, t, s = Ue) {
  D(e) && (e = Ks(e));
  for (const n in e) {
    const o = e[n];
    let r;
    X(o) ? "default" in o ? r = ls(
      o.from || n,
      o.default,
      !0
    ) : r = ls(o.from || n) : r = ls(o), ce(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (l) => r.value = l
    }) : t[n] = r;
  }
}
function Cn(e, t, s) {
  Ke(
    D(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Io(e, t, s, n) {
  let o = n.includes(".") ? Wo(s, n) : () => s[n];
  if (oe(e)) {
    const r = t[e];
    j(r) && Ps(o, r);
  } else if (j(e))
    Ps(o, e.bind(s));
  else if (X(e))
    if (D(e))
      e.forEach((r) => Io(r, t, s, n));
    else {
      const r = j(e.handler) ? e.handler.bind(s) : t[e.handler];
      j(r) && Ps(o, r, e);
    }
}
function Oo(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: l }
  } = e.appContext, u = r.get(t);
  let f;
  return u ? f = u : !o.length && !s && !n ? f = t : (f = {}, o.length && o.forEach(
    (b) => gs(f, b, l, !0)
  ), gs(f, t, l)), X(t) && r.set(t, f), f;
}
function gs(e, t, s, n = !1) {
  const { mixins: o, extends: r } = t;
  r && gs(e, r, s, !0), o && o.forEach(
    (l) => gs(e, l, s, !0)
  );
  for (const l in t)
    if (!(n && l === "expose")) {
      const u = cl[l] || s && s[l];
      e[l] = u ? u(e[l], t[l]) : t[l];
    }
  return e;
}
const cl = {
  data: kn,
  props: En,
  emits: En,
  // objects
  methods: jt,
  computed: jt,
  // lifecycle
  beforeCreate: fe,
  created: fe,
  beforeMount: fe,
  mounted: fe,
  beforeUpdate: fe,
  updated: fe,
  beforeDestroy: fe,
  beforeUnmount: fe,
  destroyed: fe,
  unmounted: fe,
  activated: fe,
  deactivated: fe,
  errorCaptured: fe,
  serverPrefetch: fe,
  // assets
  components: jt,
  directives: jt,
  // watch
  watch: fl,
  // provide / inject
  provide: kn,
  inject: dl
};
function kn(e, t) {
  return t ? e ? function() {
    return de(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function dl(e, t) {
  return jt(Ks(e), Ks(t));
}
function Ks(e) {
  if (D(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function jt(e, t) {
  return e ? de(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function En(e, t) {
  return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : de(
    /* @__PURE__ */ Object.create(null),
    Sn(e),
    Sn(t ?? {})
  ) : t;
}
function fl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = de(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = fe(e[n], t[n]);
  return s;
}
function Ro() {
  return {
    app: null,
    config: {
      isNativeTag: er,
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
let pl = 0;
function hl(e, t) {
  return function(n, o = null) {
    j(n) || (n = de({}, n)), o != null && !X(o) && (o = null);
    const r = Ro(), l = /* @__PURE__ */ new WeakSet(), u = [];
    let f = !1;
    const b = r.app = {
      _uid: pl++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Yl,
      get config() {
        return r.config;
      },
      set config(h) {
      },
      use(h, ...x) {
        return l.has(h) || (h && j(h.install) ? (l.add(h), h.install(b, ...x)) : j(h) && (l.add(h), h(b, ...x))), b;
      },
      mixin(h) {
        return r.mixins.includes(h) || r.mixins.push(h), b;
      },
      component(h, x) {
        return x ? (r.components[h] = x, b) : r.components[h];
      },
      directive(h, x) {
        return x ? (r.directives[h] = x, b) : r.directives[h];
      },
      mount(h, x, C) {
        if (!f) {
          const T = b._ceVNode || Be(n, o);
          return T.appContext = r, C === !0 ? C = "svg" : C === !1 && (C = void 0), e(T, h, C), f = !0, b._container = h, h.__vue_app__ = b, ks(T.component);
        }
      },
      onUnmount(h) {
        u.push(h);
      },
      unmount() {
        f && (Ke(
          u,
          b._instance,
          16
        ), e(null, b._container), delete b._container.__vue_app__);
      },
      provide(h, x) {
        return r.provides[h] = x, b;
      },
      runWithContext(h) {
        const x = Tt;
        Tt = b;
        try {
          return h();
        } finally {
          Tt = x;
        }
      }
    };
    return b;
  };
}
let Tt = null;
function gl(e, t) {
  if (he) {
    let s = he.provides;
    const n = he.parent && he.parent.provides;
    n === s && (s = he.provides = Object.create(n)), s[e] = t;
  }
}
function ls(e, t, s = !1) {
  const n = Wl();
  if (n || Tt) {
    let o = Tt ? Tt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && j(t) ? t.call(n && n.proxy) : t;
  }
}
const Do = {}, Po = () => Object.create(Do), Fo = (e) => Object.getPrototypeOf(e) === Do;
function bl(e, t, s, n = !1) {
  const o = {}, r = Po();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), jo(e, t, o, r);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  s ? e.props = n ? o : Rr(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function ml(e, t, s, n) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: l }
  } = e, u = U(o), [f] = e.propsOptions;
  let b = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const h = e.vnode.dynamicProps;
      for (let x = 0; x < h.length; x++) {
        let C = h[x];
        if (Ss(e.emitsOptions, C))
          continue;
        const T = t[C];
        if (f)
          if (B(r, C))
            T !== r[C] && (r[C] = T, b = !0);
          else {
            const F = dt(C);
            o[F] = qs(
              f,
              u,
              F,
              T,
              e,
              !1
            );
          }
        else
          T !== r[C] && (r[C] = T, b = !0);
      }
    }
  } else {
    jo(e, t, o, r) && (b = !0);
    let h;
    for (const x in u)
      (!t || // for camelCase
      !B(t, x) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = ht(x)) === x || !B(t, h))) && (f ? s && // for camelCase
      (s[x] !== void 0 || // for kebab-case
      s[h] !== void 0) && (o[x] = qs(
        f,
        u,
        x,
        void 0,
        e,
        !0
      )) : delete o[x]);
    if (r !== u)
      for (const x in r)
        (!t || !B(t, x)) && (delete r[x], b = !0);
  }
  b && Qe(e.attrs, "set", "");
}
function jo(e, t, s, n) {
  const [o, r] = e.propsOptions;
  let l = !1, u;
  if (t)
    for (let f in t) {
      if (Nt(f))
        continue;
      const b = t[f];
      let h;
      o && B(o, h = dt(f)) ? !r || !r.includes(h) ? s[h] = b : (u || (u = {}))[h] = b : Ss(e.emitsOptions, f) || (!(f in n) || b !== n[f]) && (n[f] = b, l = !0);
    }
  if (r) {
    const f = U(s), b = u || J;
    for (let h = 0; h < r.length; h++) {
      const x = r[h];
      s[x] = qs(
        o,
        f,
        x,
        b[x],
        e,
        !B(b, x)
      );
    }
  }
  return l;
}
function qs(e, t, s, n, o, r) {
  const l = e[s];
  if (l != null) {
    const u = B(l, "default");
    if (u && n === void 0) {
      const f = l.default;
      if (l.type !== Function && !l.skipFactory && j(f)) {
        const { propsDefaults: b } = o;
        if (s in b)
          n = b[s];
        else {
          const h = es(o);
          n = b[s] = f.call(
            null,
            t
          ), h();
        }
      } else
        n = f;
      o.ce && o.ce._setProp(s, n);
    }
    l[
      0
      /* shouldCast */
    ] && (r && !u ? n = !1 : l[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === ht(s)) && (n = !0));
  }
  return n;
}
const yl = /* @__PURE__ */ new WeakMap();
function Vo(e, t, s = !1) {
  const n = s ? yl : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const r = e.props, l = {}, u = [];
  let f = !1;
  if (!j(e)) {
    const h = (x) => {
      f = !0;
      const [C, T] = Vo(x, t, !0);
      de(l, C), T && u.push(...T);
    };
    !s && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !f)
    return X(e) && n.set(e, Ct), Ct;
  if (D(r))
    for (let h = 0; h < r.length; h++) {
      const x = dt(r[h]);
      An(x) && (l[x] = J);
    }
  else if (r)
    for (const h in r) {
      const x = dt(h);
      if (An(x)) {
        const C = r[h], T = l[x] = D(C) || j(C) ? { type: C } : de({}, C), F = T.type;
        let R = !1, ne = !0;
        if (D(F))
          for (let W = 0; W < F.length; ++W) {
            const z = F[W], H = j(z) && z.name;
            if (H === "Boolean") {
              R = !0;
              break;
            } else H === "String" && (ne = !1);
          }
        else
          R = j(F) && F.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = R, T[
          1
          /* shouldCastTrue */
        ] = ne, (R || B(T, "default")) && u.push(x);
      }
    }
  const b = [l, u];
  return X(e) && n.set(e, b), b;
}
function An(e) {
  return e[0] !== "$" && !Nt(e);
}
const fn = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", pn = (e) => D(e) ? e.map($e) : [$e(e)], xl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Kr((...o) => pn(t(...o)), s);
  return n._c = !1, n;
}, No = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (fn(o)) continue;
    const r = e[o];
    if (j(r))
      t[o] = xl(o, r, n);
    else if (r != null) {
      const l = pn(r);
      t[o] = () => l;
    }
  }
}, Lo = (e, t) => {
  const s = pn(t);
  e.slots.default = () => s;
}, Ho = (e, t, s) => {
  for (const n in t)
    (s || !fn(n)) && (e[n] = t[n]);
}, vl = (e, t, s) => {
  const n = e.slots = Po();
  if (e.vnode.shapeFlag & 32) {
    const o = t.__;
    o && Ns(n, "__", o, !0);
    const r = t._;
    r ? (Ho(n, t, s), s && Ns(n, "_", r, !0)) : No(t, n);
  } else t && Lo(e, t);
}, _l = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let r = !0, l = J;
  if (n.shapeFlag & 32) {
    const u = t._;
    u ? s && u === 1 ? r = !1 : Ho(o, t, s) : (r = !t.$stable, No(t, o)), l = t;
  } else t && (Lo(e, t), l = { default: 1 });
  if (r)
    for (const u in o)
      !fn(u) && l[u] == null && delete o[u];
}, Se = Fl;
function wl(e) {
  return Sl(e);
}
function Sl(e, t) {
  const s = xs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: r,
    createElement: l,
    createText: u,
    createComment: f,
    setText: b,
    setElementText: h,
    parentNode: x,
    nextSibling: C,
    setScopeId: T = Ue,
    insertStaticContent: F
  } = e, R = (d, p, y, w = null, g = null, i = null, c = void 0, m = null, S = !!p.dynamicChildren) => {
    if (d === p)
      return;
    d && !Ft(d, p) && (w = ve(d), ke(d, g, i, !0), d = null), p.patchFlag === -2 && (S = !1, p.dynamicChildren = null);
    const { type: _, ref: k, shapeFlag: v } = p;
    switch (_) {
      case Cs:
        ne(d, p, y, w);
        break;
      case pt:
        W(d, p, y, w);
        break;
      case is:
        d == null && z(p, y, w, c);
        break;
      case se:
        qe(
          d,
          p,
          y,
          w,
          g,
          i,
          c,
          m,
          S
        );
        break;
      default:
        v & 1 ? ee(
          d,
          p,
          y,
          w,
          g,
          i,
          c,
          m,
          S
        ) : v & 6 ? ge(
          d,
          p,
          y,
          w,
          g,
          i,
          c,
          m,
          S
        ) : (v & 64 || v & 128) && _.process(
          d,
          p,
          y,
          w,
          g,
          i,
          c,
          m,
          S,
          rt
        );
    }
    k != null && g ? $t(k, d && d.ref, i, p || d, !p) : k == null && d && d.ref != null && $t(d.ref, null, i, d, !0);
  }, ne = (d, p, y, w) => {
    if (d == null)
      n(
        p.el = u(p.children),
        y,
        w
      );
    else {
      const g = p.el = d.el;
      p.children !== d.children && b(g, p.children);
    }
  }, W = (d, p, y, w) => {
    d == null ? n(
      p.el = f(p.children || ""),
      y,
      w
    ) : p.el = d.el;
  }, z = (d, p, y, w) => {
    [d.el, d.anchor] = F(
      d.children,
      p,
      y,
      w,
      d.el,
      d.anchor
    );
  }, H = ({ el: d, anchor: p }, y, w) => {
    let g;
    for (; d && d !== p; )
      g = C(d), n(d, y, w), d = g;
    n(p, y, w);
  }, E = ({ el: d, anchor: p }) => {
    let y;
    for (; d && d !== p; )
      y = C(d), o(d), d = y;
    o(p);
  }, ee = (d, p, y, w, g, i, c, m, S) => {
    p.type === "svg" ? c = "svg" : p.type === "math" && (c = "mathml"), d == null ? De(
      p,
      y,
      w,
      g,
      i,
      c,
      m,
      S
    ) : Me(
      d,
      p,
      g,
      i,
      c,
      m,
      S
    );
  }, De = (d, p, y, w, g, i, c, m) => {
    let S, _;
    const { props: k, shapeFlag: v, transition: A, dirs: P } = d;
    if (S = d.el = l(
      d.type,
      i,
      k && k.is,
      k
    ), v & 8 ? h(S, d.children) : v & 16 && xe(
      d.children,
      S,
      null,
      w,
      g,
      Ds(d, i),
      c,
      m
    ), P && mt(d, null, w, "created"), Z(S, d, d.scopeId, c, w), k) {
      for (const G in k)
        G !== "value" && !Nt(G) && r(S, G, null, k[G], i, w);
      "value" in k && r(S, "value", null, k.value, i), (_ = k.onVnodeBeforeMount) && Le(_, w, d);
    }
    P && mt(d, null, w, "beforeMount");
    const L = Cl(g, A);
    L && A.beforeEnter(S), n(S, p, y), ((_ = k && k.onVnodeMounted) || L || P) && Se(() => {
      _ && Le(_, w, d), L && A.enter(S), P && mt(d, null, w, "mounted");
    }, g);
  }, Z = (d, p, y, w, g) => {
    if (y && T(d, y), w)
      for (let i = 0; i < w.length; i++)
        T(d, w[i]);
    if (g) {
      let i = g.subTree;
      if (p === i || qo(i.type) && (i.ssContent === p || i.ssFallback === p)) {
        const c = g.vnode;
        Z(
          d,
          c,
          c.scopeId,
          c.slotScopeIds,
          g.parent
        );
      }
    }
  }, xe = (d, p, y, w, g, i, c, m, S = 0) => {
    for (let _ = S; _ < d.length; _++) {
      const k = d[_] = m ? at(d[_]) : $e(d[_]);
      R(
        null,
        k,
        p,
        y,
        w,
        g,
        i,
        c,
        m
      );
    }
  }, Me = (d, p, y, w, g, i, c) => {
    const m = p.el = d.el;
    let { patchFlag: S, dynamicChildren: _, dirs: k } = p;
    S |= d.patchFlag & 16;
    const v = d.props || J, A = p.props || J;
    let P;
    if (y && yt(y, !1), (P = A.onVnodeBeforeUpdate) && Le(P, y, p, d), k && mt(p, d, y, "beforeUpdate"), y && yt(y, !0), (v.innerHTML && A.innerHTML == null || v.textContent && A.textContent == null) && h(m, ""), _ ? te(
      d.dynamicChildren,
      _,
      m,
      y,
      w,
      Ds(p, g),
      i
    ) : c || V(
      d,
      p,
      m,
      null,
      y,
      w,
      Ds(p, g),
      i,
      !1
    ), S > 0) {
      if (S & 16)
        Pe(m, v, A, y, g);
      else if (S & 2 && v.class !== A.class && r(m, "class", null, A.class, g), S & 4 && r(m, "style", v.style, A.style, g), S & 8) {
        const L = p.dynamicProps;
        for (let G = 0; G < L.length; G++) {
          const K = L[G], be = v[K], me = A[K];
          (me !== be || K === "value") && r(m, K, be, me, g, y);
        }
      }
      S & 1 && d.children !== p.children && h(m, p.children);
    } else !c && _ == null && Pe(m, v, A, y, g);
    ((P = A.onVnodeUpdated) || k) && Se(() => {
      P && Le(P, y, p, d), k && mt(p, d, y, "updated");
    }, w);
  }, te = (d, p, y, w, g, i, c) => {
    for (let m = 0; m < p.length; m++) {
      const S = d[m], _ = p[m], k = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        S.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (S.type === se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ft(S, _) || // - In the case of a component, it could contain anything.
        S.shapeFlag & 198) ? x(S.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      R(
        S,
        _,
        k,
        null,
        w,
        g,
        i,
        c,
        !0
      );
    }
  }, Pe = (d, p, y, w, g) => {
    if (p !== y) {
      if (p !== J)
        for (const i in p)
          !Nt(i) && !(i in y) && r(
            d,
            i,
            p[i],
            null,
            g,
            w
          );
      for (const i in y) {
        if (Nt(i)) continue;
        const c = y[i], m = p[i];
        c !== m && i !== "value" && r(d, i, m, c, g, w);
      }
      "value" in y && r(d, "value", p.value, y.value, g);
    }
  }, qe = (d, p, y, w, g, i, c, m, S) => {
    const _ = p.el = d ? d.el : u(""), k = p.anchor = d ? d.anchor : u("");
    let { patchFlag: v, dynamicChildren: A, slotScopeIds: P } = p;
    P && (m = m ? m.concat(P) : P), d == null ? (n(_, y, w), n(k, y, w), xe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      y,
      k,
      g,
      i,
      c,
      m,
      S
    )) : v > 0 && v & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (te(
      d.dynamicChildren,
      A,
      y,
      g,
      i,
      c,
      m
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || g && p === g.subTree) && $o(
      d,
      p,
      !0
      /* shallow */
    )) : V(
      d,
      p,
      y,
      k,
      g,
      i,
      c,
      m,
      S
    );
  }, ge = (d, p, y, w, g, i, c, m, S) => {
    p.slotScopeIds = m, d == null ? p.shapeFlag & 512 ? g.ctx.activate(
      p,
      y,
      w,
      c,
      S
    ) : nt(
      p,
      y,
      w,
      g,
      i,
      c,
      S
    ) : Ie(d, p, S);
  }, nt = (d, p, y, w, g, i, c) => {
    const m = d.component = Bl(
      d,
      w,
      g
    );
    if (Eo(d) && (m.ctx.renderer = rt), Kl(m, !1, c), m.asyncDep) {
      if (g && g.registerDep(m, Q, c), !d.el) {
        const S = m.subTree = Be(pt);
        W(null, S, p, y), d.placeholder = S.el;
      }
    } else
      Q(
        m,
        d,
        p,
        y,
        g,
        i,
        c
      );
  }, Ie = (d, p, y) => {
    const w = p.component = d.component;
    if (Dl(d, p, y))
      if (w.asyncDep && !w.asyncResolved) {
        N(w, p, y);
        return;
      } else
        w.next = p, w.update();
    else
      p.el = d.el, w.vnode = p;
  }, Q = (d, p, y, w, g, i, c) => {
    const m = () => {
      if (d.isMounted) {
        let { next: v, bu: A, u: P, parent: L, vnode: G } = d;
        {
          const Ve = Uo(d);
          if (Ve) {
            v && (v.el = G.el, N(d, v, c)), Ve.asyncDep.then(() => {
              d.isUnmounted || m();
            });
            return;
          }
        }
        let K = v, be;
        yt(d, !1), v ? (v.el = G.el, N(d, v, c)) : v = G, A && rs(A), (be = v.props && v.props.onVnodeBeforeUpdate) && Le(be, L, v, G), yt(d, !0);
        const me = Mn(d), je = d.subTree;
        d.subTree = me, R(
          je,
          me,
          // parent may have changed if it's in a teleport
          x(je.el),
          // anchor may have changed if it's in a fragment
          ve(je),
          d,
          g,
          i
        ), v.el = me.el, K === null && Pl(d, me.el), P && Se(P, g), (be = v.props && v.props.onVnodeUpdated) && Se(
          () => Le(be, L, v, G),
          g
        );
      } else {
        let v;
        const { el: A, props: P } = p, { bm: L, m: G, parent: K, root: be, type: me } = d, je = Ut(p);
        yt(d, !1), L && rs(L), !je && (v = P && P.onVnodeBeforeMount) && Le(v, K, p), yt(d, !0);
        {
          be.ce && // @ts-expect-error _def is private
          be.ce._def.shadowRoot !== !1 && be.ce._injectChildStyle(me);
          const Ve = d.subTree = Mn(d);
          R(
            null,
            Ve,
            y,
            w,
            d,
            g,
            i
          ), p.el = Ve.el;
        }
        if (G && Se(G, g), !je && (v = P && P.onVnodeMounted)) {
          const Ve = p;
          Se(
            () => Le(v, K, Ve),
            g
          );
        }
        (p.shapeFlag & 256 || K && Ut(K.vnode) && K.vnode.shapeFlag & 256) && d.a && Se(d.a, g), d.isMounted = !0, p = y = w = null;
      }
    };
    d.scope.on();
    const S = d.effect = new so(m);
    d.scope.off();
    const _ = d.update = S.run.bind(S), k = d.job = S.runIfDirty.bind(S);
    k.i = d, k.id = d.uid, S.scheduler = () => cn(k), yt(d, !0), _();
  }, N = (d, p, y) => {
    p.component = d;
    const w = d.vnode.props;
    d.vnode = p, d.next = null, ml(d, p.props, w, y), _l(d, p.children, y), et(), wn(d), tt();
  }, V = (d, p, y, w, g, i, c, m, S = !1) => {
    const _ = d && d.children, k = d ? d.shapeFlag : 0, v = p.children, { patchFlag: A, shapeFlag: P } = p;
    if (A > 0) {
      if (A & 128) {
        gt(
          _,
          v,
          y,
          w,
          g,
          i,
          c,
          m,
          S
        );
        return;
      } else if (A & 256) {
        Oe(
          _,
          v,
          y,
          w,
          g,
          i,
          c,
          m,
          S
        );
        return;
      }
    }
    P & 8 ? (k & 16 && Fe(_, g, i), v !== _ && h(y, v)) : k & 16 ? P & 16 ? gt(
      _,
      v,
      y,
      w,
      g,
      i,
      c,
      m,
      S
    ) : Fe(_, g, i, !0) : (k & 8 && h(y, ""), P & 16 && xe(
      v,
      y,
      w,
      g,
      i,
      c,
      m,
      S
    ));
  }, Oe = (d, p, y, w, g, i, c, m, S) => {
    d = d || Ct, p = p || Ct;
    const _ = d.length, k = p.length, v = Math.min(_, k);
    let A;
    for (A = 0; A < v; A++) {
      const P = p[A] = S ? at(p[A]) : $e(p[A]);
      R(
        d[A],
        P,
        y,
        null,
        g,
        i,
        c,
        m,
        S
      );
    }
    _ > k ? Fe(
      d,
      g,
      i,
      !0,
      !1,
      v
    ) : xe(
      p,
      y,
      w,
      g,
      i,
      c,
      m,
      S,
      v
    );
  }, gt = (d, p, y, w, g, i, c, m, S) => {
    let _ = 0;
    const k = p.length;
    let v = d.length - 1, A = k - 1;
    for (; _ <= v && _ <= A; ) {
      const P = d[_], L = p[_] = S ? at(p[_]) : $e(p[_]);
      if (Ft(P, L))
        R(
          P,
          L,
          y,
          null,
          g,
          i,
          c,
          m,
          S
        );
      else
        break;
      _++;
    }
    for (; _ <= v && _ <= A; ) {
      const P = d[v], L = p[A] = S ? at(p[A]) : $e(p[A]);
      if (Ft(P, L))
        R(
          P,
          L,
          y,
          null,
          g,
          i,
          c,
          m,
          S
        );
      else
        break;
      v--, A--;
    }
    if (_ > v) {
      if (_ <= A) {
        const P = A + 1, L = P < k ? p[P].el : w;
        for (; _ <= A; )
          R(
            null,
            p[_] = S ? at(p[_]) : $e(p[_]),
            y,
            L,
            g,
            i,
            c,
            m,
            S
          ), _++;
      }
    } else if (_ > A)
      for (; _ <= v; )
        ke(d[_], g, i, !0), _++;
    else {
      const P = _, L = _, G = /* @__PURE__ */ new Map();
      for (_ = L; _ <= A; _++) {
        const _e = p[_] = S ? at(p[_]) : $e(p[_]);
        _e.key != null && G.set(_e.key, _);
      }
      let K, be = 0;
      const me = A - L + 1;
      let je = !1, Ve = 0;
      const Dt = new Array(me);
      for (_ = 0; _ < me; _++) Dt[_] = 0;
      for (_ = P; _ <= v; _++) {
        const _e = d[_];
        if (be >= me) {
          ke(_e, g, i, !0);
          continue;
        }
        let Ne;
        if (_e.key != null)
          Ne = G.get(_e.key);
        else
          for (K = L; K <= A; K++)
            if (Dt[K - L] === 0 && Ft(_e, p[K])) {
              Ne = K;
              break;
            }
        Ne === void 0 ? ke(_e, g, i, !0) : (Dt[Ne - L] = _ + 1, Ne >= Ve ? Ve = Ne : je = !0, R(
          _e,
          p[Ne],
          y,
          null,
          g,
          i,
          c,
          m,
          S
        ), be++);
      }
      const gn = je ? kl(Dt) : Ct;
      for (K = gn.length - 1, _ = me - 1; _ >= 0; _--) {
        const _e = L + _, Ne = p[_e], bn = p[_e + 1], mn = _e + 1 < k ? (
          // #13559, fallback to el placeholder for unresolved async component
          bn.el || bn.placeholder
        ) : w;
        Dt[_] === 0 ? R(
          null,
          Ne,
          y,
          mn,
          g,
          i,
          c,
          m,
          S
        ) : je && (K < 0 || _ !== gn[K] ? q(Ne, y, mn, 2) : K--);
      }
    }
  }, q = (d, p, y, w, g = null) => {
    const { el: i, type: c, transition: m, children: S, shapeFlag: _ } = d;
    if (_ & 6) {
      q(d.component.subTree, p, y, w);
      return;
    }
    if (_ & 128) {
      d.suspense.move(p, y, w);
      return;
    }
    if (_ & 64) {
      c.move(d, p, y, rt);
      return;
    }
    if (c === se) {
      n(i, p, y);
      for (let v = 0; v < S.length; v++)
        q(S[v], p, y, w);
      n(d.anchor, p, y);
      return;
    }
    if (c === is) {
      H(d, p, y);
      return;
    }
    if (w !== 2 && _ & 1 && m)
      if (w === 0)
        m.beforeEnter(i), n(i, p, y), Se(() => m.enter(i), g);
      else {
        const { leave: v, delayLeave: A, afterLeave: P } = m, L = () => {
          d.ctx.isUnmounted ? o(i) : n(i, p, y);
        }, G = () => {
          v(i, () => {
            L(), P && P();
          });
        };
        A ? A(i, L, G) : G();
      }
    else
      n(i, p, y);
  }, ke = (d, p, y, w = !1, g = !1) => {
    const {
      type: i,
      props: c,
      ref: m,
      children: S,
      dynamicChildren: _,
      shapeFlag: k,
      patchFlag: v,
      dirs: A,
      cacheIndex: P
    } = d;
    if (v === -2 && (g = !1), m != null && (et(), $t(m, null, y, d, !0), tt()), P != null && (p.renderCache[P] = void 0), k & 256) {
      p.ctx.deactivate(d);
      return;
    }
    const L = k & 1 && A, G = !Ut(d);
    let K;
    if (G && (K = c && c.onVnodeBeforeUnmount) && Le(K, p, d), k & 6)
      ot(d.component, y, w);
    else {
      if (k & 128) {
        d.suspense.unmount(y, w);
        return;
      }
      L && mt(d, null, p, "beforeUnmount"), k & 64 ? d.type.remove(
        d,
        p,
        y,
        rt,
        w
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (i !== se || v > 0 && v & 64) ? Fe(
        _,
        p,
        y,
        !1,
        !0
      ) : (i === se && v & 384 || !g && k & 16) && Fe(S, p, y), w && Rt(d);
    }
    (G && (K = c && c.onVnodeUnmounted) || L) && Se(() => {
      K && Le(K, p, d), L && mt(d, null, p, "unmounted");
    }, y);
  }, Rt = (d) => {
    const { type: p, el: y, anchor: w, transition: g } = d;
    if (p === se) {
      ts(y, w);
      return;
    }
    if (p === is) {
      E(d);
      return;
    }
    const i = () => {
      o(y), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (d.shapeFlag & 1 && g && !g.persisted) {
      const { leave: c, delayLeave: m } = g, S = () => c(y, i);
      m ? m(d.el, i, S) : S();
    } else
      i();
  }, ts = (d, p) => {
    let y;
    for (; d !== p; )
      y = C(d), o(d), d = y;
    o(p);
  }, ot = (d, p, y) => {
    const {
      bum: w,
      scope: g,
      job: i,
      subTree: c,
      um: m,
      m: S,
      a: _,
      parent: k,
      slots: { __: v }
    } = d;
    Tn(S), Tn(_), w && rs(w), k && D(v) && v.forEach((A) => {
      k.renderCache[A] = void 0;
    }), g.stop(), i && (i.flags |= 8, ke(c, d, p, y)), m && Se(m, p), Se(() => {
      d.isUnmounted = !0;
    }, p), p && p.pendingBranch && !p.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve());
  }, Fe = (d, p, y, w = !1, g = !1, i = 0) => {
    for (let c = i; c < d.length; c++)
      ke(d[c], p, y, w, g);
  }, ve = (d) => {
    if (d.shapeFlag & 6)
      return ve(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const p = C(d.anchor || d.el), y = p && p[qr];
    return y ? C(y) : p;
  };
  let Ee = !1;
  const bt = (d, p, y) => {
    d == null ? p._vnode && ke(p._vnode, null, null, !0) : R(
      p._vnode || null,
      d,
      p,
      null,
      null,
      null,
      y
    ), p._vnode = d, Ee || (Ee = !0, wn(), wo(), Ee = !1);
  }, rt = {
    p: R,
    um: ke,
    m: q,
    r: Rt,
    mt: nt,
    mc: xe,
    pc: V,
    pbc: te,
    n: ve,
    o: e
  };
  return {
    render: bt,
    hydrate: void 0,
    createApp: hl(bt)
  };
}
function Ds({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function yt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Cl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function $o(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (D(n) && D(o))
    for (let r = 0; r < n.length; r++) {
      const l = n[r];
      let u = o[r];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = o[r] = at(o[r]), u.el = l.el), !s && u.patchFlag !== -2 && $o(l, u)), u.type === Cs && (u.el = l.el), u.type === pt && !u.el && (u.el = l.el);
    }
}
function kl(e) {
  const t = e.slice(), s = [0];
  let n, o, r, l, u;
  const f = e.length;
  for (n = 0; n < f; n++) {
    const b = e[n];
    if (b !== 0) {
      if (o = s[s.length - 1], e[o] < b) {
        t[n] = o, s.push(n);
        continue;
      }
      for (r = 0, l = s.length - 1; r < l; )
        u = r + l >> 1, e[s[u]] < b ? r = u + 1 : l = u;
      b < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, l = s[r - 1]; r-- > 0; )
    s[r] = l, l = t[l];
  return s;
}
function Uo(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Uo(t);
}
function Tn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const El = Symbol.for("v-scx"), Al = () => ls(El);
function Ps(e, t, s) {
  return Bo(e, t, s);
}
function Bo(e, t, s = J) {
  const { immediate: n, deep: o, flush: r, once: l } = s, u = de({}, s), f = t && n || !t && r !== "post";
  let b;
  if (Gt) {
    if (r === "sync") {
      const T = Al();
      b = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!f) {
      const T = () => {
      };
      return T.stop = Ue, T.resume = Ue, T.pause = Ue, T;
    }
  }
  const h = he;
  u.call = (T, F, R) => Ke(T, h, F, R);
  let x = !1;
  r === "post" ? u.scheduler = (T) => {
    Se(T, h && h.suspense);
  } : r !== "sync" && (x = !0, u.scheduler = (T, F) => {
    F ? T() : cn(T);
  }), u.augmentJob = (T) => {
    t && (T.flags |= 4), x && (T.flags |= 2, h && (T.id = h.uid, T.i = h));
  };
  const C = $r(e, t, u);
  return Gt && (b ? b.push(C) : f && C()), C;
}
function Tl(e, t, s) {
  const n = this.proxy, o = oe(e) ? e.includes(".") ? Wo(n, e) : () => n[e] : e.bind(n, n);
  let r;
  j(t) ? r = t : (r = t.handler, s = t);
  const l = es(this), u = Bo(o, r.bind(n), s);
  return l(), u;
}
function Wo(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const Ml = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${dt(t)}Modifiers`] || e[`${ht(t)}Modifiers`];
function Il(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || J;
  let o = s;
  const r = t.startsWith("update:"), l = r && Ml(n, t.slice(7));
  l && (l.trim && (o = s.map((h) => oe(h) ? h.trim() : h)), l.number && (o = s.map(cs)));
  let u, f = n[u = As(t)] || // also try camelCase event handler (#2249)
  n[u = As(dt(t))];
  !f && r && (f = n[u = As(ht(t))]), f && Ke(
    f,
    e,
    6,
    o
  );
  const b = n[u + "Once"];
  if (b) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, Ke(
      b,
      e,
      6,
      o
    );
  }
}
function Ko(e, t, s = !1) {
  const n = t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let l = {}, u = !1;
  if (!j(e)) {
    const f = (b) => {
      const h = Ko(b, t, !0);
      h && (u = !0, de(l, h));
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !u ? (X(e) && n.set(e, null), null) : (D(r) ? r.forEach((f) => l[f] = null) : de(l, r), X(e) && n.set(e, l), l);
}
function Ss(e, t) {
  return !e || !ms(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), B(e, t[0].toLowerCase() + t.slice(1)) || B(e, ht(t)) || B(e, t));
}
function Mn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [r],
    slots: l,
    attrs: u,
    emit: f,
    render: b,
    renderCache: h,
    props: x,
    data: C,
    setupState: T,
    ctx: F,
    inheritAttrs: R
  } = e, ne = hs(e);
  let W, z;
  try {
    if (s.shapeFlag & 4) {
      const E = o || n, ee = E;
      W = $e(
        b.call(
          ee,
          E,
          h,
          x,
          T,
          C,
          F
        )
      ), z = u;
    } else {
      const E = t;
      W = $e(
        E.length > 1 ? E(
          x,
          { attrs: u, slots: l, emit: f }
        ) : E(
          x,
          null
        )
      ), z = t.props ? u : Ol(u);
    }
  } catch (E) {
    Wt.length = 0, _s(E, e, 1), W = Be(pt);
  }
  let H = W;
  if (z && R !== !1) {
    const E = Object.keys(z), { shapeFlag: ee } = H;
    E.length && ee & 7 && (r && E.some(Ys) && (z = Rl(
      z,
      r
    )), H = Mt(H, z, !1, !0));
  }
  return s.dirs && (H = Mt(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(s.dirs) : s.dirs), s.transition && dn(H, s.transition), W = H, hs(ne), W;
}
const Ol = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || ms(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Rl = (e, t) => {
  const s = {};
  for (const n in e)
    (!Ys(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Dl(e, t, s) {
  const { props: n, children: o, component: r } = e, { props: l, children: u, patchFlag: f } = t, b = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return n ? In(n, l, b) : !!l;
    if (f & 8) {
      const h = t.dynamicProps;
      for (let x = 0; x < h.length; x++) {
        const C = h[x];
        if (l[C] !== n[C] && !Ss(b, C))
          return !0;
      }
    }
  } else
    return (o || u) && (!u || !u.$stable) ? !0 : n === l ? !1 : n ? l ? In(n, l, b) : !0 : !!l;
  return !1;
}
function In(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    if (t[r] !== e[r] && !Ss(s, r))
      return !0;
  }
  return !1;
}
function Pl({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const qo = (e) => e.__isSuspense;
function Fl(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Wr(e);
}
const se = Symbol.for("v-fgt"), Cs = Symbol.for("v-txt"), pt = Symbol.for("v-cmt"), is = Symbol.for("v-stc"), Wt = [];
let Ce = null;
function M(e = !1) {
  Wt.push(Ce = e ? null : []);
}
function jl() {
  Wt.pop(), Ce = Wt[Wt.length - 1] || null;
}
let zt = 1;
function On(e, t = !1) {
  zt += e, e < 0 && Ce && t && (Ce.hasOnce = !0);
}
function Jo(e) {
  return e.dynamicChildren = zt > 0 ? Ce || Ct : null, jl(), zt > 0 && Ce && Ce.push(e), e;
}
function I(e, t, s, n, o, r) {
  return Jo(
    a(
      e,
      t,
      s,
      n,
      o,
      r,
      !0
    )
  );
}
function Vl(e, t, s, n, o) {
  return Jo(
    Be(
      e,
      t,
      s,
      n,
      o,
      !0
    )
  );
}
function zo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Go = ({ key: e }) => e ?? null, as = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || ce(e) || j(e) ? { i: Ae, r: e, k: t, f: !!s } : e : null);
function a(e, t = null, s = null, n = 0, o = null, r = e === se ? 0 : 1, l = !1, u = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Go(t),
    ref: t && as(t),
    scopeId: Co,
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
    ctx: Ae
  };
  return u ? (hn(f, s), r & 128 && e.normalize(f)) : s && (f.shapeFlag |= oe(s) ? 8 : 16), zt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && Ce.push(f), f;
}
const Be = Nl;
function Nl(e, t = null, s = null, n = 0, o = null, r = !1) {
  if ((!e || e === ll) && (e = pt), zo(e)) {
    const u = Mt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && hn(u, s), zt > 0 && !r && Ce && (u.shapeFlag & 6 ? Ce[Ce.indexOf(e)] = u : Ce.push(u)), u.patchFlag = -2, u;
  }
  if (Gl(e) && (e = e.__vccOpts), t) {
    t = Ll(t);
    let { class: u, style: f } = t;
    u && !oe(u) && (t.class = vt(u)), X(f) && (un(f) && !D(f) && (f = de({}, f)), t.style = Zs(f));
  }
  const l = oe(e) ? 1 : qo(e) ? 128 : Jr(e) ? 64 : X(e) ? 4 : j(e) ? 2 : 0;
  return a(
    e,
    t,
    s,
    n,
    o,
    l,
    r,
    !0
  );
}
function Ll(e) {
  return e ? un(e) || Fo(e) ? de({}, e) : e : null;
}
function Mt(e, t, s = !1, n = !1) {
  const { props: o, ref: r, patchFlag: l, children: u, transition: f } = e, b = t ? Hl(o || {}, t) : o, h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: b,
    key: b && Go(b),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? D(r) ? r.concat(as(t)) : [r, as(t)] : as(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== se ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: f,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Mt(e.ssContent),
    ssFallback: e.ssFallback && Mt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return f && n && dn(
    h,
    f.clone(h)
  ), h;
}
function ae(e = " ", t = 0) {
  return Be(Cs, null, e, t);
}
function Fs(e, t) {
  const s = Be(is, null, e);
  return s.staticCount = t, s;
}
function le(e = "", t = !1) {
  return t ? (M(), Vl(pt, null, e)) : Be(pt, null, e);
}
function $e(e) {
  return e == null || typeof e == "boolean" ? Be(pt) : D(e) ? Be(
    se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : zo(e) ? at(e) : Be(Cs, null, String(e));
}
function at(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Mt(e);
}
function hn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (D(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), hn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !Fo(t) ? t._ctx = Ae : o === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else j(t) ? (t = { default: t, _ctx: Ae }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [ae(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Hl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = vt([t.class, n.class]));
      else if (o === "style")
        t.style = Zs([t.style, n.style]);
      else if (ms(o)) {
        const r = t[o], l = n[o];
        l && r !== l && !(D(r) && r.includes(l)) && (t[o] = r ? [].concat(r, l) : l);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Le(e, t, s, n = null) {
  Ke(e, t, 7, [
    s,
    n
  ]);
}
const $l = Ro();
let Ul = 0;
function Bl(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || $l, r = {
    uid: Ul++,
    vnode: e,
    type: n,
    parent: t,
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
    scope: new fr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Vo(n, o),
    emitsOptions: Ko(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: J,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: J,
    data: J,
    props: J,
    attrs: J,
    slots: J,
    refs: J,
    setupState: J,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Il.bind(null, r), e.ce && e.ce(r), r;
}
let he = null;
const Wl = () => he || Ae;
let bs, Js;
{
  const e = xs(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (r) => {
      o.length > 1 ? o.forEach((l) => l(r)) : o[0](r);
    };
  };
  bs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => he = s
  ), Js = t(
    "__VUE_SSR_SETTERS__",
    (s) => Gt = s
  );
}
const es = (e) => {
  const t = he;
  return bs(e), e.scope.on(), () => {
    e.scope.off(), bs(t);
  };
}, Rn = () => {
  he && he.scope.off(), bs(null);
};
function Yo(e) {
  return e.vnode.shapeFlag & 4;
}
let Gt = !1;
function Kl(e, t = !1, s = !1) {
  t && Js(t);
  const { props: n, children: o } = e.vnode, r = Yo(e);
  bl(e, n, r, t), vl(e, o, s || t);
  const l = r ? ql(e, t) : void 0;
  return t && Js(!1), l;
}
function ql(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, il);
  const { setup: n } = s;
  if (n) {
    et();
    const o = e.setupContext = n.length > 1 ? zl(e) : null, r = es(e), l = Zt(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), u = Gn(l);
    if (tt(), r(), (u || e.sp) && !Ut(e) && ko(e), u) {
      if (l.then(Rn, Rn), t)
        return l.then((f) => {
          Dn(e, f);
        }).catch((f) => {
          _s(f, e, 0);
        });
      e.asyncDep = l;
    } else
      Dn(e, l);
  } else
    Qo(e);
}
function Dn(e, t, s) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : X(t) && (e.setupState = yo(t)), Qo(e);
}
function Qo(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Ue);
  {
    const o = es(e);
    et();
    try {
      al(e);
    } finally {
      tt(), o();
    }
  }
}
const Jl = {
  get(e, t) {
    return ue(e, "get", ""), e[t];
  }
};
function zl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Jl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ks(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(yo(Dr(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Bt)
        return Bt[s](e);
    },
    has(t, s) {
      return s in t || s in Bt;
    }
  })) : e.proxy;
}
function Gl(e) {
  return j(e) && "__vccOpts" in e;
}
const Vt = (e, t) => Lr(e, t, Gt), Yl = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let zs;
const Pn = typeof window < "u" && window.trustedTypes;
if (Pn)
  try {
    zs = /* @__PURE__ */ Pn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Xo = zs ? (e) => zs.createHTML(e) : (e) => e, Ql = "http://www.w3.org/2000/svg", Xl = "http://www.w3.org/1998/Math/MathML", Ye = typeof document < "u" ? document : null, Fn = Ye && /* @__PURE__ */ Ye.createElement("template"), Zl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? Ye.createElementNS(Ql, e) : t === "mathml" ? Ye.createElementNS(Xl, e) : s ? Ye.createElement(e, { is: s }) : Ye.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => Ye.createTextNode(e),
  createComment: (e) => Ye.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ye.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, o, r) {
    const l = s ? s.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), s), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      Fn.innerHTML = Xo(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const u = Fn.content;
      if (n === "svg" || n === "mathml") {
        const f = u.firstChild;
        for (; f.firstChild; )
          u.appendChild(f.firstChild);
        u.removeChild(f);
      }
      t.insertBefore(u, s);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, ei = Symbol("_vtc");
function ti(e, t, s) {
  const n = e[ei];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const jn = Symbol("_vod"), si = Symbol("_vsh"), ni = Symbol(""), oi = /(^|;)\s*display\s*:/;
function ri(e, t, s) {
  const n = e.style, o = oe(s);
  let r = !1;
  if (s && !o) {
    if (t)
      if (oe(t))
        for (const l of t.split(";")) {
          const u = l.slice(0, l.indexOf(":")).trim();
          s[u] == null && us(n, u, "");
        }
      else
        for (const l in t)
          s[l] == null && us(n, l, "");
    for (const l in s)
      l === "display" && (r = !0), us(n, l, s[l]);
  } else if (o) {
    if (t !== s) {
      const l = n[ni];
      l && (s += ";" + l), n.cssText = s, r = oi.test(s);
    }
  } else t && e.removeAttribute("style");
  jn in e && (e[jn] = r ? n.display : "", e[si] && (n.display = "none"));
}
const Vn = /\s*!important$/;
function us(e, t, s) {
  if (D(s))
    s.forEach((n) => us(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = li(e, t);
    Vn.test(s) ? e.setProperty(
      ht(n),
      s.replace(Vn, ""),
      "important"
    ) : e[n] = s;
  }
}
const Nn = ["Webkit", "Moz", "ms"], js = {};
function li(e, t) {
  const s = js[t];
  if (s)
    return s;
  let n = dt(t);
  if (n !== "filter" && n in e)
    return js[t] = n;
  n = Xn(n);
  for (let o = 0; o < Nn.length; o++) {
    const r = Nn[o] + n;
    if (r in e)
      return js[t] = r;
  }
  return t;
}
const Ln = "http://www.w3.org/1999/xlink";
function Hn(e, t, s, n, o, r = cr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Ln, t.slice(6, t.length)) : e.setAttributeNS(Ln, t, s) : s == null || r && !Zn(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : We(s) ? String(s) : s
  );
}
function $n(e, t, s, n, o) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Xo(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const u = r === "OPTION" ? e.getAttribute("value") || "" : e.value, f = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (u !== f || !("_value" in e)) && (e.value = f), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let l = !1;
  if (s === "" || s == null) {
    const u = typeof e[t];
    u === "boolean" ? s = Zn(s) : s == null && u === "string" ? (s = "", l = !0) : u === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function ut(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function ii(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Un = Symbol("_vei");
function ai(e, t, s, n, o = null) {
  const r = e[Un] || (e[Un] = {}), l = r[t];
  if (n && l)
    l.value = n;
  else {
    const [u, f] = ui(t);
    if (n) {
      const b = r[t] = fi(
        n,
        o
      );
      ut(e, u, b, f);
    } else l && (ii(e, u, l, f), r[t] = void 0);
  }
}
const Bn = /(?:Once|Passive|Capture)$/;
function ui(e) {
  let t;
  if (Bn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Bn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ht(e.slice(2)), t];
}
let Vs = 0;
const ci = /* @__PURE__ */ Promise.resolve(), di = () => Vs || (ci.then(() => Vs = 0), Vs = Date.now());
function fi(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Ke(
      pi(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = di(), s;
}
function pi(e, t) {
  if (D(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const Wn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, hi = (e, t, s, n, o, r) => {
  const l = o === "svg";
  t === "class" ? ti(e, n, l) : t === "style" ? ri(e, s, n) : ms(t) ? Ys(t) || ai(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : gi(e, t, n, l)) ? ($n(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Hn(e, t, n, l, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !oe(n)) ? $n(e, dt(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Hn(e, t, n, l));
};
function gi(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Wn(t) && j(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Wn(t) && oe(s) ? !1 : t in e;
}
const It = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return D(t) ? (s) => rs(t, s) : t;
};
function bi(e) {
  e.target.composing = !0;
}
function Kn(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ze = Symbol("_assign"), ze = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
    e[Ze] = It(o);
    const r = n || o.props && o.props.type === "number";
    ut(e, t ? "change" : "input", (l) => {
      if (l.target.composing) return;
      let u = e.value;
      s && (u = u.trim()), r && (u = cs(u)), e[Ze](u);
    }), s && ut(e, "change", () => {
      e.value = e.value.trim();
    }), t || (ut(e, "compositionstart", bi), ut(e, "compositionend", Kn), ut(e, "change", Kn));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: o, number: r } }, l) {
    if (e[Ze] = It(l), e.composing) return;
    const u = (r || e.type === "number") && !/^0\d/.test(e.value) ? cs(e.value) : e.value, f = t ?? "";
    u !== f && (document.activeElement === e && e.type !== "range" && (n && t === s || o && e.value.trim() === f) || (e.value = f));
  }
}, mi = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, s) {
    e[Ze] = It(s), ut(e, "change", () => {
      const n = e._modelValue, o = Yt(e), r = e.checked, l = e[Ze];
      if (D(n)) {
        const u = en(n, o), f = u !== -1;
        if (r && !f)
          l(n.concat(o));
        else if (!r && f) {
          const b = [...n];
          b.splice(u, 1), l(b);
        }
      } else if (Ot(n)) {
        const u = new Set(n);
        r ? u.add(o) : u.delete(o), l(u);
      } else
        l(Zo(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: qn,
  beforeUpdate(e, t, s) {
    e[Ze] = It(s), qn(e, t, s);
  }
};
function qn(e, { value: t, oldValue: s }, n) {
  e._modelValue = t;
  let o;
  if (D(t))
    o = en(t, n.props.value) > -1;
  else if (Ot(t))
    o = t.has(n.props.value);
  else {
    if (t === s) return;
    o = Xt(t, Zo(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
const Ge = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const o = Ot(t);
    ut(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (l) => l.selected).map(
        (l) => s ? cs(Yt(l)) : Yt(l)
      );
      e[Ze](
        e.multiple ? o ? new Set(r) : r : r[0]
      ), e._assigning = !0, vo(() => {
        e._assigning = !1;
      });
    }), e[Ze] = It(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Jn(e, t);
  },
  beforeUpdate(e, t, s) {
    e[Ze] = It(s);
  },
  updated(e, { value: t }) {
    e._assigning || Jn(e, t);
  }
};
function Jn(e, t) {
  const s = e.multiple, n = D(t);
  if (!(s && !n && !Ot(t))) {
    for (let o = 0, r = e.options.length; o < r; o++) {
      const l = e.options[o], u = Yt(l);
      if (s)
        if (n) {
          const f = typeof u;
          f === "string" || f === "number" ? l.selected = t.some((b) => String(b) === String(u)) : l.selected = en(t, u) > -1;
        } else
          l.selected = t.has(u);
      else if (Xt(Yt(l), t)) {
        e.selectedIndex !== o && (e.selectedIndex = o);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Yt(e) {
  return "_value" in e ? e._value : e.value;
}
function Zo(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
const yi = ["ctrl", "shift", "alt", "meta"], xi = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => yi.some((s) => e[`${s}Key`] && !t.includes(s))
}, vi = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = (o, ...r) => {
    for (let l = 0; l < t.length; l++) {
      const u = xi[t[l]];
      if (u && u(o, t)) return;
    }
    return e(o, ...r);
  });
}, _i = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, lt = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return s[n] || (s[n] = (o) => {
    if (!("key" in o))
      return;
    const r = ht(o.key);
    if (t.some(
      (l) => l === r || _i[l] === r
    ))
      return e(o);
  });
}, wi = /* @__PURE__ */ de({ patchProp: hi }, Zl);
let zn;
function Si() {
  return zn || (zn = wl(wi));
}
const Ci = (...e) => {
  const t = Si().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = Ei(n);
    if (!o) return;
    const r = t._component;
    !j(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = s(o, !1, ki(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function ki(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ei(e) {
  return oe(e) ? document.querySelector(e) : e;
}
function Ai() {
  const e = $(!1), t = $(null), s = async (f, b = {}) => {
    if (typeof window > "u" || !window.frappe)
      throw new Error("Frappe is not available");
    e.value = !0, t.value = null;
    try {
      const h = await window.frappe.call({
        method: f,
        args: b
      });
      return h?.message !== void 0 ? h.message : h;
    } catch (h) {
      let x = h?.message;
      if (!x && h?._server_messages)
        try {
          const C = JSON.parse(h._server_messages);
          Array.isArray(C) && C.length && (x = C.join(`
`));
        } catch {
        }
      throw !x && h?.exception && (x = h.exception), x = x || "An error occurred", t.value = x, new Error(x);
    } finally {
      e.value = !1;
    }
  }, n = async (f, b = {}) => {
    const {
      fields: h = ["name"],
      filters: x = {},
      orderBy: C = "modified desc",
      limitStart: T = 0,
      limitPageLength: F = 20
    } = b;
    console.log(`useFrappe.getList: Fetching ${f} with options:`, {
      fields: h,
      filters: x,
      orderBy: C,
      limitStart: T,
      limitPageLength: F
    });
    try {
      const R = await s("frappe.client.get_list", {
        doctype: f,
        fields: JSON.stringify(h),
        filters: JSON.stringify(x),
        order_by: C,
        limit_start: T,
        limit_page_length: F,
        as_dict: 1,
        _cache: Date.now()
        // Cache-busting parameter
      });
      return console.log(`useFrappe.getList: Received ${f} data:`, {
        count: Array.isArray(R) ? R.length : "not an array",
        firstItem: Array.isArray(R) && R.length > 0 ? R[0] : null
      }), R;
    } catch (R) {
      throw console.error(`useFrappe.getList: Error fetching ${f}:`, R), R;
    }
  }, o = async (f, b) => {
    if (typeof window > "u" || !window.frappe)
      throw new Error("Frappe is not available");
    e.value = !0, t.value = null;
    try {
      const h = await window.frappe.call({
        method: "frappe.client.get",
        args: {
          doctype: f,
          name: b,
          _cache: Date.now()
          // Cache-busting parameter
        }
      });
      return h?.message !== void 0 ? h.message : h;
    } catch (h) {
      throw t.value = h.message || "An error occurred", h;
    } finally {
      e.value = !1;
    }
  };
  return {
    isLoading: e,
    error: t,
    call: s,
    getList: n,
    getDoc: o,
    saveDoc: async (f, b) => {
      if (typeof window > "u" || !window.frappe)
        throw new Error("Frappe is not available");
      e.value = !0, t.value = null;
      try {
        const { doctype: h, ...x } = b, C = await window.frappe.call({
          method: "frappe.client.save",
          args: {
            doc: {
              doctype: f,
              ...x
            }
          }
        });
        return C?.message !== void 0 ? C.message : C;
      } catch (h) {
        throw t.value = h.message || "An error occurred", h;
      } finally {
        e.value = !1;
      }
    },
    submitDoc: async (f, b) => {
      const h = await o(f, b);
      return s("frappe.client.submit", { doc: h });
    },
    cancelDoc: async (f, b) => s("frappe.client.cancel", {
      doctype: f,
      name: b
    })
  };
}
const Ti = { class: "min-h-screen bg-gray-50 flex flex-col" }, Mi = { class: "bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-cyan-500 shadow-lg" }, Ii = { class: "px-6 py-4 flex items-center justify-between" }, Oi = { class: "relative" }, Ri = { class: "flex flex-1 overflow-hidden" }, Di = {
  key: 0,
  class: "w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden"
}, Pi = { class: "p-4 border-b border-gray-200" }, Fi = { class: "relative" }, ji = { class: "flex-1 overflow-y-auto" }, Vi = {
  key: 0,
  class: "p-4 text-center text-gray-500 text-sm"
}, Ni = ["onClick"], Li = { class: "flex justify-between items-start mb-1" }, Hi = { class: "flex items-center gap-2" }, $i = ["value"], Ui = { class: "font-medium text-sm text-gray-900" }, Bi = { class: "text-xs font-semibold text-blue-600" }, Wi = { class: "flex justify-between text-xs text-gray-500" }, Ki = { class: "p-3 border-t border-gray-200" }, qi = ["disabled"], Ji = {
  key: 0,
  class: "text-[11px] bg-white/20 px-2 py-0.5 rounded-full"
}, zi = {
  key: 1,
  class: "flex-1 overflow-y-auto"
}, Gi = { class: "p-6" }, Yi = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, Qi = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4" }, Xi = ["value"], Zi = ["value"], ea = ["value"], ta = ["value"], sa = { key: 0 }, na = {
  key: 0,
  class: "grid grid-cols-1 md:grid-cols-2 gap-4"
}, oa = ["value"], ra = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, la = {
  key: 0,
  class: "text-center py-8 text-gray-500"
}, ia = {
  key: 1,
  class: "overflow-x-auto"
}, aa = { class: "w-full text-sm" }, ua = { class: "py-3 px-4" }, ca = { class: "font-medium text-gray-900" }, da = { class: "text-xs text-gray-500" }, fa = ["onDblclick"], pa = {
  key: 0,
  class: "flex gap-2"
}, ha = { key: 1 }, ga = ["onDblclick"], ba = {
  key: 0,
  class: "flex gap-2 justify-end"
}, ma = { key: 1 }, ya = { class: "py-3 px-4 text-right font-medium text-gray-900" }, xa = { class: "py-3 px-4 text-center" }, va = ["onClick"], _a = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, wa = { class: "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white border-2 border-blue-400" }, Sa = { class: "text-5xl font-bold" }, Ca = { class: "text-blue-100 text-sm mt-2" }, ka = { class: "space-y-2" }, Ea = ["disabled"], Aa = {
  key: 2,
  class: "flex-1 overflow-y-auto"
}, Ta = { class: "p-6" }, Ma = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, Ia = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4" }, Oa = ["value"], Ra = ["value"], Da = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, Pa = {
  key: 0,
  class: "text-center py-8 text-gray-500"
}, Fa = {
  key: 1,
  class: "overflow-x-auto"
}, ja = { class: "w-full text-sm" }, Va = { class: "py-3 px-4" }, Na = { class: "font-medium text-gray-900" }, La = { class: "text-xs text-gray-500" }, Ha = ["onDblclick"], $a = {
  key: 0,
  class: "flex gap-2"
}, Ua = { key: 1 }, Ba = ["onDblclick"], Wa = {
  key: 0,
  class: "flex gap-2 justify-end"
}, Ka = { key: 1 }, qa = { class: "py-3 px-4 text-right font-medium text-gray-900" }, Ja = { class: "py-3 px-4 text-center" }, za = ["onClick"], Ga = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, Ya = { class: "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white border-2 border-blue-400" }, Qa = { class: "text-5xl font-bold" }, Xa = { class: "text-blue-100 text-sm mt-2" }, Za = { class: "space-y-2" }, eu = ["disabled"], tu = {
  key: 3,
  class: "flex-1 overflow-y-auto bg-gray-50"
}, su = { class: "p-6" }, nu = { class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" }, ou = { class: "overflow-x-auto" }, ru = { class: "w-full text-sm" }, lu = { class: "px-6 py-4 font-medium text-gray-900" }, iu = { class: "px-6 py-4 text-gray-700" }, au = { class: "px-6 py-4 text-gray-700" }, uu = { class: "px-6 py-4 text-gray-700" }, cu = { class: "px-6 py-4 text-gray-700" }, du = { class: "px-6 py-4 text-gray-700" }, fu = { class: "px-6 py-4 text-right font-medium text-gray-900" }, pu = { class: "px-6 py-4 text-center" }, hu = { class: "px-6 py-4 text-center" }, gu = { class: "flex gap-2 justify-center" }, bu = ["onClick"], mu = ["onClick"], yu = ["onClick"], xu = {
  key: 0,
  class: "text-center py-12 text-gray-500"
}, vu = {
  key: 4,
  class: "flex-1 overflow-y-auto bg-gray-50"
}, _u = { class: "p-6" }, wu = { class: "mb-6 flex items-center justify-between" }, Su = { class: "text-3xl font-bold text-gray-900" }, Cu = { class: "grid grid-cols-4 gap-4 mb-6" }, ku = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Eu = { class: "text-lg font-bold text-gray-900" }, Au = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Tu = { class: "text-lg font-bold text-gray-900" }, Mu = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Iu = { class: "text-lg font-bold text-gray-900" }, Ou = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4" }, Ru = { class: "text-lg font-bold text-gray-900" }, Du = { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" }, Pu = { class: "overflow-x-auto" }, Fu = { class: "w-full text-sm" }, ju = { class: "px-6 py-4 font-medium text-gray-900" }, Vu = { class: "px-6 py-4 text-center text-gray-700" }, Nu = { class: "px-6 py-4 text-center text-gray-700" }, Lu = { class: "px-6 py-4 text-right text-gray-700" }, Hu = { class: "px-6 py-4 text-right font-medium text-gray-900" }, $u = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, Uu = { class: "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white border-2 border-blue-400 flex flex-col justify-between" }, Bu = { class: "text-5xl font-bold" }, Wu = { class: "text-blue-100 text-sm mt-4" }, Ku = { class: "space-y-2" }, qu = {
  key: 2,
  disabled: "",
  class: "w-full px-4 py-3 bg-gray-400 text-gray-100 font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2 text-base"
}, Ju = {
  key: 5,
  class: "flex-1 overflow-y-auto bg-gray-50"
}, zu = { class: "p-6" }, Gu = { class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" }, Yu = { class: "overflow-x-auto" }, Qu = { class: "w-full text-sm" }, Xu = { class: "px-6 py-4 font-medium text-gray-900" }, Zu = { class: "px-6 py-4 text-gray-700" }, ec = { class: "px-6 py-4 text-gray-700" }, tc = { class: "px-6 py-4 text-gray-700" }, sc = { class: "px-6 py-4 text-gray-700" }, nc = { class: "px-6 py-4 text-right font-medium text-gray-900" }, oc = { class: "px-6 py-4 text-center" }, rc = { class: "px-6 py-4 text-center" }, lc = { class: "flex gap-2 justify-center" }, ic = ["onClick"], ac = ["onClick"], uc = ["onClick"], cc = {
  key: 0,
  class: "text-center py-12 text-gray-500"
}, dc = /* @__PURE__ */ zr({
  __name: "App",
  setup(e) {
    const { saveDoc: t, submitDoc: s, cancelDoc: n, getList: o, getDoc: r } = Ai(), l = $(
      "form"
    ), u = $(null), f = $([]), b = $([]), h = $([]), x = $([]), C = $([]), T = $({}), F = $([]), R = $([]), ne = $(""), W = $(""), z = $(""), H = $((/* @__PURE__ */ new Date()).toISOString().split("T")[0]), E = $([]), ee = $("");
    $("");
    const De = $(""), Z = $(""), xe = $(""), Me = $(""), te = $(""), Pe = $(""), qe = $("00:00"), ge = $(""), nt = $(""), Ie = $([]), Q = $(null), N = $(null), V = $(""), Oe = Vt(() => Z.value ? h.value.filter((g) => g.company === Z.value) : h.value), gt = Vt(() => {
      const g = f.value, i = ne.value.trim().toLowerCase();
      let c = g;
      return i && (c = g.filter(
        (m) => m.name.toLowerCase().includes(i) || m.code.toLowerCase().includes(i)
      )), c.slice(0, 10);
    }), q = Vt(() => {
      const g = F.value.find((i) => i.id === u.value);
      return g || R.value.find((i) => i.id === u.value);
    }), ke = async (g) => {
      const i = R.value.some((m) => m.id === g), c = i ? "Stock Reconciliation" : "Stock Entry";
      try {
        const m = await r(c, g), _ = (Array.isArray(m.items) ? m.items : []).map((k, v) => {
          const A = Number(k.qty ?? k.transfer_qty ?? 0), P = Number(
            i ? k.valuation_rate ?? 0 : k.basic_rate ?? k.rate ?? 0
          );
          return {
            id: k.name || String(k.idx || v + 1),
            name: k.item_name || k.item_code || "Item",
            code: k.item_code,
            qty: A,
            rate: P,
            amount: A * P
          };
        });
        T.value[g] = _;
      } catch (m) {
        console.error("Failed to load entry items", m), alert("Failed to load entry items from server");
      }
    }, Rt = async (g) => {
      u.value = g, await ke(g), l.value = "detail";
    }, ts = async () => {
      if (l.value === "detail") {
        const g = q.value, i = !!g && R.value.some((c) => c.id === g.id);
        l.value = i ? "reconciliation" : "list", await w();
      }
      u.value = null;
    }, ot = async (g, i) => {
      const m = R.value.some((S) => S.id === g) ? "Stock Reconciliation" : "Stock Entry";
      try {
        i === "submitted" ? await s(m, g) : i === "cancelled" && await n(m, g), delete T.value[g], await w();
      } catch (S) {
        alert(S?.message || "Failed to update entry status");
      }
    }, Fe = (g, i, c) => {
      Q.value = g, N.value = i, V.value = c.toString();
    }, ve = () => {
      if (!Q.value || !N.value) return;
      const g = E.value.findIndex((m) => m.id === Q.value);
      if (g === -1) return;
      const i = E.value[g], c = parseFloat(V.value) || 0;
      N.value === "rate" ? i.rate = c : N.value === "qty" && (i.qty = c), i.amount = i.qty * i.rate, Q.value = null, N.value = null, V.value = "";
    }, Ee = () => {
      Q.value = null, N.value = null, V.value = "";
    }, bt = Vt(() => E.value.reduce((g, i) => g + i.amount, 0)), rt = (g) => {
      E.value = E.value.filter((i) => i.id !== g);
    }, Es = async () => {
      const g = l.value === "reconciliation-form", i = g || te.value === "reconciliation", c = te.value === "manufacture" || te.value === "material_transfer_for_manufacture";
      if (g) {
        if (!Z.value || !ge.value || E.value.length === 0) {
          alert("Please fill all required fields and add items");
          return;
        }
        if (!ge.value || typeof ge.value != "string") {
          alert("Please select a valid warehouse");
          return;
        }
        try {
          const m = String(ge.value).trim(), S = {
            company: Z.value,
            posting_date: H.value,
            posting_time: qe.value,
            set_warehouse: m,
            expense_account: nt.value || void 0,
            // Field name is expense_account, not difference_account
            purpose: "Stock Reconciliation",
            items: E.value.filter((A) => A.code && A.code.trim()).map((A) => ({
              item_code: String(A.code).trim(),
              warehouse: m,
              // Warehouse is required for each item - must be a valid string
              qty: Number(A.qty) || 0,
              valuation_rate: Number(A.rate) || 0
            }))
          }, _ = await t("Stock Reconciliation", S), k = _?.name || _?.id || _?.name;
          k && await s("Stock Reconciliation", k);
          const v = {
            id: k || "SR" + String(R.value.length + 1).padStart(3, "0"),
            company: Z.value,
            type: "Stock Reconciliation",
            date: H.value,
            targetWarehouse: ge.value,
            totalAmount: bt.value,
            itemCount: E.value.length,
            status: "submitted"
          };
          R.value.unshift(v), T.value[v.id] = [...E.value], alert("Stock reconciliation saved and submitted successfully!"), d(), l.value = "reconciliation";
        } catch (m) {
          alert(m?.message || "Failed to save stock reconciliation");
        }
      } else {
        if (!Z.value || !te.value) {
          alert("Please select Company and Stock Entry Type");
          return;
        }
        if (i) {
          if (!ge.value || E.value.length === 0) {
            alert("Please select Warehouse and add items for Stock Reconciliation");
            return;
          }
        } else if (!Me.value || E.value.length === 0) {
          alert("Please fill all required fields and add items");
          return;
        }
        if (c && !Pe.value) {
          alert("Work Order is required for this stock entry type");
          return;
        }
        try {
          const m = {
            company: Z.value,
            stock_entry_type: te.value === "material_transfer_for_manufacture" ? "Material Transfer for Manufacture" : te.value === "material_transfer" ? "Material Transfer" : te.value === "manufacture" ? "Manufacture" : "Material Receipt",
            from_warehouse: xe.value || void 0,
            to_warehouse: Me.value || void 0,
            posting_date: H.value,
            items: E.value.map((v) => ({
              item_code: v.code,
              qty: v.qty,
              basic_rate: v.rate
            }))
          }, S = await t("Stock Entry", m), _ = S?.name || S?.id || S?.name;
          _ && await s("Stock Entry", _);
          const k = {
            id: _ || "SE" + String(F.value.length + 1).padStart(3, "0"),
            company: Z.value,
            type: te.value,
            date: H.value,
            targetWarehouse: Me.value,
            totalAmount: bt.value,
            itemCount: E.value.length,
            status: "submitted"
          };
          F.value.unshift(k), T.value[k.id] = [...E.value], alert("Stock entry saved and submitted successfully!"), d(), l.value = "list";
        } catch (m) {
          alert(m?.message || "Failed to save stock entry");
        }
      }
    }, d = () => {
      E.value = [], W.value = "", z.value = "", H.value = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], ne.value = "", Z.value = "", xe.value = "", Me.value = "", te.value = "", Pe.value = "", qe.value = "00:00", ge.value = "", nt.value = "";
    }, p = (g) => {
      const i = f.value.find((m) => m.id === g);
      if (!i) return;
      const c = E.value.find((m) => m.id === g);
      if (c)
        c.qty += 1, c.amount = c.qty * c.rate;
      else {
        const m = {
          id: g,
          name: i.name,
          code: i.code,
          qty: 1,
          rate: i.rate,
          amount: i.rate
        };
        E.value.push(m);
      }
      ee.value = g, De.value = i.rate.toString();
    }, y = () => {
      Ie.value.length && (Ie.value.forEach((g) => {
        p(g);
      }), Ie.value = []);
    }, w = async () => {
      try {
        const [g, i, c, m, S] = await Promise.all([
          // Items (for sidebar picker)
          o("Item", {
            fields: ["name", "item_name", "item_code", "standard_rate", "stock_uom"],
            orderBy: "modified desc",
            limitPageLength: 200
          }),
          // Companies
          o("Company", {
            fields: ["name", "company_name"],
            orderBy: "name asc",
            limitPageLength: 200
          }),
          // Warehouses (exclude disabled and group warehouses)
          o("Warehouse", {
            fields: ["name", "warehouse_name", "company"],
            filters: {
              disabled: 0,
              is_group: 0
            },
            orderBy: "name asc",
            limitPageLength: 500
          }),
          // Work Orders
          o("Work Order", {
            fields: ["name"],
            orderBy: "modified desc",
            limitPageLength: 50
          }),
          // Stock Entry Types (ERPNext has this doctype)
          o("Stock Entry Type", {
            fields: ["name"],
            orderBy: "name asc",
            limitPageLength: 50
          })
        ]);
        f.value = g.map((v) => ({
          id: v.name,
          name: v.item_name || v.name,
          code: v.item_code || v.name,
          rate: Number(v.standard_rate ?? 0),
          // For now, available quantity is not computed from stock ledger; set 0
          availableQty: 0,
          unit: v.stock_uom || ""
        })), b.value = i, h.value = c, x.value = m, C.value = S;
        const _ = await o("Stock Entry", {
          fields: ["name", "company", "stock_entry_type", "posting_date", "to_warehouse", "docstatus"],
          orderBy: "modified desc",
          limitPageLength: 50
        });
        F.value = _.map((v) => {
          const A = v.docstatus === 1 ? "submitted" : v.docstatus === 0 ? "draft" : "cancelled";
          return {
            id: v.name,
            company: v.company,
            type: v.stock_entry_type,
            date: v.posting_date,
            targetWarehouse: v.to_warehouse || "",
            totalAmount: Number(
              v.total_amount ?? v.total_incoming_value ?? v.total_outgoing_value ?? 0
            ),
            itemCount: Array.isArray(v.items) ? v.items.length : 0,
            status: A
          };
        });
        const k = await o("Stock Reconciliation", {
          fields: ["name", "company", "posting_date", "set_warehouse", "docstatus"],
          orderBy: "modified desc",
          limitPageLength: 50
        });
        R.value = k.map((v) => {
          const A = v.docstatus === 1 ? "submitted" : v.docstatus === 0 ? "draft" : "cancelled";
          return {
            id: v.name,
            company: v.company,
            type: "Stock Reconciliation",
            date: v.posting_date,
            targetWarehouse: v.set_warehouse || "",
            totalAmount: Number(v.total_amount ?? 0),
            itemCount: 0,
            status: A
          };
        });
      } catch (g) {
        console.error("Failed to load entries from server", g), alert("Failed to load entries from server. Check console for details.");
      }
    };
    return To(() => {
      w();
    }), (g, i) => (M(), I("div", Ti, [
      a("header", Mi, [
        a("div", Ii, [
          i[24] || (i[24] = Fs('<div class="flex items-center gap-3" data-v-d2b5856f><div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center" data-v-d2b5856f><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2b5856f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m0 0h6M6 12h6m0 0H6" data-v-d2b5856f></path></svg></div><div data-v-d2b5856f><h1 class="text-2xl font-bold text-white" data-v-d2b5856f>Stock Entry</h1><p class="text-xs text-blue-100" data-v-d2b5856f>Inventory Management System</p></div></div>', 1)),
          a("div", Oi, [
            re(a("select", {
              "onUpdate:modelValue": i[0] || (i[0] = (c) => l.value = c),
              class: "px-4 py-2 rounded-lg font-medium transition duration-200 appearance-none bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer pr-10 text-base"
            }, i[22] || (i[22] = [
              a("option", { value: "form" }, "📝 New Stock", -1),
              a("option", { value: "reconciliation-form" }, "🔍 New Stock Reconciliation", -1),
              a("option", { value: "list" }, "📋 View Stock Entry", -1),
              a("option", { value: "reconciliation" }, "📊 View Reconciliation", -1)
            ]), 512), [
              [Ge, l.value]
            ]),
            i[23] || (i[23] = a("svg", {
              class: "w-5 h-5 text-blue-600 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              a("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 14l-7 7m0 0l-7-7m7 7V3"
              })
            ], -1))
          ])
        ])
      ]),
      a("div", Ri, [
        l.value === "form" || l.value === "reconciliation-form" ? (M(), I("div", Di, [
          a("div", Pi, [
            a("div", Fi, [
              i[25] || (i[25] = a("svg", {
                class: "w-4 h-4 absolute left-3 top-3 text-gray-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                a("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                })
              ], -1)),
              re(a("input", {
                "onUpdate:modelValue": i[1] || (i[1] = (c) => ne.value = c),
                type: "text",
                placeholder: "Search items...",
                class: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              }, null, 512), [
                [ze, ne.value]
              ])
            ])
          ]),
          a("div", ji, [
            gt.value.length === 0 ? (M(), I("div", Vi, " No items found ")) : le("", !0),
            (M(!0), I(se, null, we(gt.value, (c) => (M(), I("div", {
              key: c.id,
              onClick: (m) => p(c.id),
              class: vt([
                "px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition",
                ee.value === c.id ? "bg-blue-100 border-l-4 border-l-blue-600" : ""
              ])
            }, [
              a("div", Li, [
                a("div", Hi, [
                  re(a("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": i[2] || (i[2] = (m) => Ie.value = m),
                    value: c.id,
                    onClick: i[3] || (i[3] = vi(() => {
                    }, ["stop"])),
                    class: "h-4 w-4 text-blue-600 border-gray-300 rounded"
                  }, null, 8, $i), [
                    [mi, Ie.value]
                  ]),
                  a("span", Ui, O(c.name), 1)
                ]),
                a("span", Bi, "₹" + O(c.rate.toFixed(2)), 1)
              ]),
              a("div", Wi, [
                a("span", null, O(c.code), 1),
                a("span", null, O(c.availableQty) + " " + O(c.unit), 1)
              ])
            ], 10, Ni))), 128))
          ]),
          a("div", Ki, [
            a("button", {
              onClick: y,
              disabled: Ie.value.length === 1,
              class: "w-full px-3 py-2 text-xs font-semibold rounded-md bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            }, [
              i[26] || (i[26] = a("span", null, "➕ Add Selected Items", -1)),
              Ie.value.length ? (M(), I("span", Ji, O(Ie.value.length) + " selected ", 1)) : le("", !0)
            ], 8, qi)
          ])
        ])) : le("", !0),
        l.value === "form" ? (M(), I("div", zi, [
          a("div", Gi, [
            a("div", Yi, [
              i[39] || (i[39] = a("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Entry Details", -1)),
              a("div", Qi, [
                a("div", null, [
                  i[28] || (i[28] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    ae("Company "),
                    a("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[4] || (i[4] = (c) => Z.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, [
                    i[27] || (i[27] = a("option", { value: "" }, "Select Company", -1)),
                    (M(!0), I(se, null, we(b.value, (c) => (M(), I("option", {
                      key: c.name,
                      value: c.name
                    }, O(c.company_name || c.name), 9, Xi))), 128))
                  ], 512), [
                    [Ge, Z.value]
                  ])
                ]),
                a("div", null, [
                  i[30] || (i[30] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    ae("Stock Entry Type "),
                    a("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[5] || (i[5] = (c) => te.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, [
                    i[29] || (i[29] = a("option", { value: "" }, "Select Type", -1)),
                    (M(!0), I(se, null, we(C.value, (c) => (M(), I("option", {
                      key: c.name,
                      value: c.name
                    }, O(c.name), 9, Zi))), 128))
                  ], 512), [
                    [Ge, te.value]
                  ])
                ]),
                a("div", null, [
                  i[31] || (i[31] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Entry Date", -1)),
                  re(a("input", {
                    "onUpdate:modelValue": i[6] || (i[6] = (c) => H.value = c),
                    type: "date",
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, null, 512), [
                    [ze, H.value]
                  ])
                ]),
                a("div", null, [
                  i[33] || (i[33] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Source Warehouse", -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[7] || (i[7] = (c) => xe.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, [
                    i[32] || (i[32] = a("option", { value: "" }, "Select Source Warehouse", -1)),
                    (M(!0), I(se, null, we(Oe.value, (c) => (M(), I("option", {
                      key: c.name + "-source",
                      value: c.name
                    }, O(c.warehouse_name || c.name), 9, ea))), 128))
                  ], 512), [
                    [Ge, xe.value]
                  ])
                ]),
                a("div", null, [
                  i[35] || (i[35] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    ae("Target Warehouse "),
                    a("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[8] || (i[8] = (c) => Me.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, [
                    i[34] || (i[34] = a("option", { value: "" }, "Select Target Warehouse", -1)),
                    (M(!0), I(se, null, we(Oe.value, (c) => (M(), I("option", {
                      key: c.name + "-target",
                      value: c.name
                    }, O(c.warehouse_name || c.name), 9, ta))), 128))
                  ], 512), [
                    [Ge, Me.value]
                  ])
                ]),
                te.value !== "reconciliation" ? (M(), I("div", sa, [
                  i[36] || (i[36] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Reference No", -1)),
                  re(a("input", {
                    "onUpdate:modelValue": i[9] || (i[9] = (c) => z.value = c),
                    type: "text",
                    placeholder: "Invoice/PO Number",
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, null, 512), [
                    [ze, z.value]
                  ])
                ])) : le("", !0)
              ]),
              te.value === "manufacture" || te.value === "material_transfer_for_manufacture" ? (M(), I("div", na, [
                a("div", null, [
                  i[38] || (i[38] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    ae("Work Order "),
                    a("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[10] || (i[10] = (c) => Pe.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, [
                    i[37] || (i[37] = a("option", { value: "" }, "Select Work Order", -1)),
                    (M(!0), I(se, null, we(x.value, (c) => (M(), I("option", {
                      key: c.name,
                      value: c.name
                    }, O(c.name), 9, oa))), 128))
                  ], 512), [
                    [Ge, Pe.value]
                  ])
                ])
              ])) : le("", !0)
            ]),
            a("div", ra, [
              i[42] || (i[42] = a("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Items in Entry", -1)),
              E.value.length === 0 ? (M(), I("div", la, i[40] || (i[40] = [
                a("svg", {
                  class: "w-12 h-12 mx-auto mb-2 text-gray-300",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1),
                a("p", null, "No items added yet. Add items to create an entry.", -1)
              ]))) : (M(), I("div", ia, [
                a("table", aa, [
                  i[41] || (i[41] = a("thead", null, [
                    a("tr", { class: "border-b-2 border-gray-200" }, [
                      a("th", { class: "text-left py-2 px-4 font-semibold text-gray-700" }, "Item Name"),
                      a("th", { class: "text-center py-2 px-4 font-semibold text-gray-700" }, "Qty"),
                      a("th", { class: "text-right py-2 px-4 font-semibold text-gray-700" }, "Rate (₹)"),
                      a("th", { class: "text-right py-2 px-4 font-semibold text-gray-700" }, "Amount (₹)"),
                      a("th", { class: "text-center py-2 px-4 font-semibold text-gray-700" }, "Action")
                    ])
                  ], -1)),
                  a("tbody", null, [
                    (M(!0), I(se, null, we(E.value, (c) => (M(), I("tr", {
                      key: c.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      a("td", ua, [
                        a("div", ca, O(c.name), 1),
                        a("div", da, O(c.code), 1)
                      ]),
                      a("td", {
                        class: "py-3 px-4 text-center cursor-pointer hover:bg-blue-100 rounded transition",
                        onDblclick: (m) => Fe(c.id, "qty", c.qty)
                      }, [
                        Q.value === c.id && N.value === "qty" ? (M(), I("div", pa, [
                          re(a("input", {
                            "onUpdate:modelValue": i[11] || (i[11] = (m) => V.value = m),
                            type: "number",
                            min: "0",
                            step: "0.01",
                            onKeyup: [
                              lt(ve, ["enter"]),
                              lt(Ee, ["escape"])
                            ],
                            class: "w-16 px-2 py-1 border border-blue-500 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                            autofocus: ""
                          }, null, 544), [
                            [ze, V.value]
                          ]),
                          a("button", {
                            onClick: ve,
                            class: "px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition"
                          }, " ✓ "),
                          a("button", {
                            onClick: Ee,
                            class: "px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition"
                          }, " ✕ ")
                        ])) : (M(), I("div", ha, O(c.qty), 1))
                      ], 40, fa),
                      a("td", {
                        class: "py-3 px-4 text-right cursor-pointer hover:bg-blue-100 rounded transition",
                        onDblclick: (m) => Fe(c.id, "rate", c.rate)
                      }, [
                        Q.value === c.id && N.value === "rate" ? (M(), I("div", ba, [
                          re(a("input", {
                            "onUpdate:modelValue": i[12] || (i[12] = (m) => V.value = m),
                            type: "number",
                            min: "0",
                            step: "0.01",
                            onKeyup: [
                              lt(ve, ["enter"]),
                              lt(Ee, ["escape"])
                            ],
                            class: "w-20 px-2 py-1 border border-blue-500 rounded text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                            autofocus: ""
                          }, null, 544), [
                            [ze, V.value]
                          ]),
                          a("button", {
                            onClick: ve,
                            class: "px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition"
                          }, " ✓ "),
                          a("button", {
                            onClick: Ee,
                            class: "px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition"
                          }, " ✕ ")
                        ])) : (M(), I("div", ma, O(c.rate.toFixed(2)), 1))
                      ], 40, ga),
                      a("td", ya, O(c.amount.toFixed(2)), 1),
                      a("td", xa, [
                        a("button", {
                          onClick: (m) => rt(c.id),
                          class: "text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition"
                        }, " Delete ", 8, va)
                      ])
                    ]))), 128))
                  ])
                ])
              ]))
            ]),
            a("div", _a, [
              a("div", wa, [
                i[43] || (i[43] = a("h3", { class: "font-semibold mb-2 text-lg" }, "💰 Total Amount", -1)),
                a("div", Sa, "₹" + O(bt.value.toFixed(2)), 1),
                a("p", Ca, "📦 " + O(E.value.length) + " items", 1)
              ]),
              a("div", ka, [
                a("button", {
                  onClick: Es,
                  disabled: E.value.length === 0,
                  class: "w-full px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, i[44] || (i[44] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1),
                  ae(" 💾 SAVE & SUBMIT ", -1)
                ]), 8, Ea),
                a("button", {
                  onClick: d,
                  class: "w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, i[45] || (i[45] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ], -1),
                  ae(" 🗑️ CLEAR ", -1)
                ]))
              ])
            ])
          ])
        ])) : le("", !0),
        l.value === "reconciliation-form" ? (M(), I("div", Aa, [
          a("div", Ta, [
            a("div", Ma, [
              i[54] || (i[54] = a("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Stock Reconciliation Details", -1)),
              a("div", Ia, [
                a("div", null, [
                  i[47] || (i[47] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    ae("Company "),
                    a("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[13] || (i[13] = (c) => Z.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, [
                    i[46] || (i[46] = a("option", { value: "" }, "Select Company", -1)),
                    (M(!0), I(se, null, we(b.value, (c) => (M(), I("option", {
                      key: c.name + "-recon",
                      value: c.name
                    }, O(c.company_name || c.name), 9, Oa))), 128))
                  ], 512), [
                    [Ge, Z.value]
                  ])
                ]),
                a("div", null, [
                  i[48] || (i[48] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Posting Date", -1)),
                  re(a("input", {
                    "onUpdate:modelValue": i[14] || (i[14] = (c) => H.value = c),
                    type: "date",
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, null, 512), [
                    [ze, H.value]
                  ])
                ]),
                a("div", null, [
                  i[49] || (i[49] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Posting Time", -1)),
                  re(a("input", {
                    "onUpdate:modelValue": i[15] || (i[15] = (c) => qe.value = c),
                    type: "time",
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, null, 512), [
                    [ze, qe.value]
                  ])
                ]),
                a("div", null, [
                  i[51] || (i[51] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                    ae("Default Warehouse "),
                    a("span", { class: "text-red-500" }, "*")
                  ], -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[16] || (i[16] = (c) => ge.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, [
                    i[50] || (i[50] = a("option", { value: "" }, "Select Warehouse", -1)),
                    (M(!0), I(se, null, we(Oe.value, (c) => (M(), I("option", {
                      key: c.name + "-default",
                      value: c.name
                    }, O(c.warehouse_name || c.name), 9, Ra))), 128))
                  ], 512), [
                    [Ge, ge.value]
                  ])
                ]),
                a("div", null, [
                  i[53] || (i[53] = a("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Difference Account", -1)),
                  re(a("select", {
                    "onUpdate:modelValue": i[17] || (i[17] = (c) => nt.value = c),
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  }, i[52] || (i[52] = [
                    a("option", { value: "" }, "Select Account", -1),
                    a("option", { value: "account1" }, "Inventory Variance", -1),
                    a("option", { value: "account2" }, "Stock Adjustment", -1),
                    a("option", { value: "account3" }, "Difference Account", -1)
                  ]), 512), [
                    [Ge, nt.value]
                  ])
                ])
              ])
            ]),
            a("div", Da, [
              i[57] || (i[57] = a("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Items in Entry", -1)),
              E.value.length === 0 ? (M(), I("div", Pa, i[55] || (i[55] = [
                a("svg", {
                  class: "w-12 h-12 mx-auto mb-2 text-gray-300",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1),
                a("p", null, "No items added yet. Add items to create a reconciliation.", -1)
              ]))) : (M(), I("div", Fa, [
                a("table", ja, [
                  i[56] || (i[56] = a("thead", null, [
                    a("tr", { class: "border-b-2 border-gray-200" }, [
                      a("th", { class: "text-left py-2 px-4 font-semibold text-gray-700" }, "Item Name"),
                      a("th", { class: "text-center py-2 px-4 font-semibold text-gray-700" }, "Qty"),
                      a("th", { class: "text-right py-2 px-4 font-semibold text-gray-700" }, "Rate (₹)"),
                      a("th", { class: "text-right py-2 px-4 font-semibold text-gray-700" }, "Amount (₹)"),
                      a("th", { class: "text-center py-2 px-4 font-semibold text-gray-700" }, "Action")
                    ])
                  ], -1)),
                  a("tbody", null, [
                    (M(!0), I(se, null, we(E.value, (c) => (M(), I("tr", {
                      key: c.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      a("td", Va, [
                        a("div", Na, O(c.name), 1),
                        a("div", La, O(c.code), 1)
                      ]),
                      a("td", {
                        class: "py-3 px-4 text-center cursor-pointer hover:bg-blue-100 rounded transition",
                        onDblclick: (m) => Fe(c.id, "qty", c.qty)
                      }, [
                        Q.value === c.id && N.value === "qty" ? (M(), I("div", $a, [
                          re(a("input", {
                            "onUpdate:modelValue": i[18] || (i[18] = (m) => V.value = m),
                            type: "number",
                            min: "0",
                            step: "0.01",
                            onKeyup: [
                              lt(ve, ["enter"]),
                              lt(Ee, ["escape"])
                            ],
                            class: "w-16 px-2 py-1 border border-blue-500 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                            autofocus: ""
                          }, null, 544), [
                            [ze, V.value]
                          ]),
                          a("button", {
                            onClick: ve,
                            class: "px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition"
                          }, " ✓ "),
                          a("button", {
                            onClick: Ee,
                            class: "px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition"
                          }, " ✕ ")
                        ])) : (M(), I("div", Ua, O(c.qty), 1))
                      ], 40, Ha),
                      a("td", {
                        class: "py-3 px-4 text-right cursor-pointer hover:bg-blue-100 rounded transition",
                        onDblclick: (m) => Fe(c.id, "rate", c.rate)
                      }, [
                        Q.value === c.id && N.value === "rate" ? (M(), I("div", Wa, [
                          re(a("input", {
                            "onUpdate:modelValue": i[19] || (i[19] = (m) => V.value = m),
                            type: "number",
                            min: "0",
                            step: "0.01",
                            onKeyup: [
                              lt(ve, ["enter"]),
                              lt(Ee, ["escape"])
                            ],
                            class: "w-20 px-2 py-1 border border-blue-500 rounded text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                            autofocus: ""
                          }, null, 544), [
                            [ze, V.value]
                          ]),
                          a("button", {
                            onClick: ve,
                            class: "px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition"
                          }, " ✓ "),
                          a("button", {
                            onClick: Ee,
                            class: "px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition"
                          }, " ✕ ")
                        ])) : (M(), I("div", Ka, O(c.rate.toFixed(2)), 1))
                      ], 40, Ba),
                      a("td", qa, O(c.amount.toFixed(2)), 1),
                      a("td", Ja, [
                        a("button", {
                          onClick: (m) => rt(c.id),
                          class: "text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition"
                        }, " Delete ", 8, za)
                      ])
                    ]))), 128))
                  ])
                ])
              ]))
            ]),
            a("div", Ga, [
              a("div", Ya, [
                i[58] || (i[58] = a("h3", { class: "font-semibold mb-2 text-lg" }, "💰 Total Amount", -1)),
                a("div", Qa, "₹" + O(bt.value.toFixed(2)), 1),
                a("p", Xa, "📦 " + O(E.value.length) + " items", 1)
              ]),
              a("div", Za, [
                a("button", {
                  onClick: Es,
                  disabled: E.value.length === 0,
                  class: "w-full px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, i[59] || (i[59] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1),
                  ae(" 💾 SAVE & SUBMIT ", -1)
                ]), 8, eu),
                a("button", {
                  onClick: d,
                  class: "w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, i[60] || (i[60] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ], -1),
                  ae(" 🗑️ CLEAR ", -1)
                ]))
              ])
            ])
          ])
        ])) : le("", !0),
        l.value === "list" ? (M(), I("div", tu, [
          a("div", su, [
            i[63] || (i[63] = Fs('<div class="mb-6" data-v-d2b5856f><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-d2b5856f>Stock Entry List</h2><p class="text-gray-600" data-v-d2b5856f>Manage and track all stock entries</p></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6" data-v-d2b5856f><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-d2b5856f><div data-v-d2b5856f><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d2b5856f>Filter by Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-d2b5856f><option data-v-d2b5856f>All Entries</option><option data-v-d2b5856f>Submitted</option><option data-v-d2b5856f>Draft</option><option data-v-d2b5856f>Cancelled</option></select></div><div data-v-d2b5856f><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d2b5856f>Filter by Type</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-d2b5856f><option data-v-d2b5856f>All Types</option><option data-v-d2b5856f>Purchase</option><option data-v-d2b5856f>Material Transfer</option><option data-v-d2b5856f>Manufacture</option></select></div><div data-v-d2b5856f><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d2b5856f>Search</label><input type="text" placeholder="Search by ID or Company..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-d2b5856f></div><div class="flex items-end" data-v-d2b5856f><button class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 text-base" data-v-d2b5856f> 🔍 SEARCH </button></div></div></div>', 2)),
            a("div", nu, [
              a("div", ou, [
                a("table", ru, [
                  i[61] || (i[61] = a("thead", null, [
                    a("tr", { class: "bg-gray-50 border-b border-gray-200" }, [
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Entry ID"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Company"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Type"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Date"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Warehouse"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Items"),
                      a("th", { class: "px-6 py-3 text-right font-semibold text-gray-700" }, "Amount (₹)"),
                      a("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Status"),
                      a("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Actions")
                    ])
                  ], -1)),
                  a("tbody", null, [
                    (M(!0), I(se, null, we(F.value, (c) => (M(), I("tr", {
                      key: c.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      a("td", lu, O(c.id), 1),
                      a("td", iu, O(c.company), 1),
                      a("td", au, O(c.type), 1),
                      a("td", uu, O(c.date), 1),
                      a("td", cu, O(c.targetWarehouse), 1),
                      a("td", du, O(c.itemCount), 1),
                      a("td", fu, O(c.totalAmount.toFixed(2)), 1),
                      a("td", pu, [
                        a("span", {
                          class: vt([
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            c.status === "submitted" ? "bg-green-100 text-green-800" : c.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          ])
                        }, O(c.status.charAt(0).toUpperCase() + c.status.slice(1)), 3)
                      ]),
                      a("td", hu, [
                        a("div", gu, [
                          c.status === "submitted" ? (M(), I("button", {
                            key: 0,
                            onClick: (m) => ot(c.id, "cancelled"),
                            class: "px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition text-xs font-bold"
                          }, " ❌ Cancel ", 8, bu)) : le("", !0),
                          c.status === "draft" ? (M(), I("button", {
                            key: 1,
                            onClick: (m) => ot(c.id, "submitted"),
                            class: "px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition text-xs font-bold"
                          }, " ✅ Submit ", 8, mu)) : le("", !0),
                          a("button", {
                            onClick: (m) => Rt(c.id),
                            class: "px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-xs font-bold"
                          }, " 👁️ View ", 8, yu)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ]),
              F.value.length === 0 ? (M(), I("div", xu, i[62] || (i[62] = [
                a("svg", {
                  class: "w-12 h-12 mx-auto mb-2 text-gray-300",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1),
                a("p", { class: "text-lg" }, "No entries found", -1)
              ]))) : le("", !0)
            ])
          ])
        ])) : le("", !0),
        l.value === "detail" && q.value ? (M(), I("div", vu, [
          a("div", _u, [
            a("div", wu, [
              a("div", null, [
                a("button", {
                  onClick: ts,
                  class: "flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold mb-4 hover:bg-blue-50 rounded-lg transition"
                }, i[64] || (i[64] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 19l-7-7 7-7"
                    })
                  ], -1),
                  ae(" Back to Entries ", -1)
                ])),
                a("h2", Su, "Entry " + O(q.value.id), 1),
                i[65] || (i[65] = a("p", { class: "text-gray-600 mt-1" }, "View and manage stock entry details", -1))
              ]),
              a("span", {
                class: vt([
                  "px-4 py-2 rounded-full text-sm font-bold",
                  q.value.status === "submitted" ? "bg-green-100 text-green-800" : q.value.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                ])
              }, O(q.value.status.toUpperCase()), 3)
            ]),
            a("div", Cu, [
              a("div", ku, [
                i[66] || (i[66] = a("p", { class: "text-sm text-gray-600 mb-1" }, "Company", -1)),
                a("p", Eu, O(q.value.company), 1)
              ]),
              a("div", Au, [
                i[67] || (i[67] = a("p", { class: "text-sm text-gray-600 mb-1" }, "Entry Type", -1)),
                a("p", Tu, O(q.value.type), 1)
              ]),
              a("div", Mu, [
                i[68] || (i[68] = a("p", { class: "text-sm text-gray-600 mb-1" }, "Date", -1)),
                a("p", Iu, O(q.value.date), 1)
              ]),
              a("div", Ou, [
                i[69] || (i[69] = a("p", { class: "text-sm text-gray-600 mb-1" }, "Warehouse", -1)),
                a("p", Ru, O(q.value.targetWarehouse), 1)
              ])
            ]),
            a("div", Du, [
              i[71] || (i[71] = a("h3", { class: "text-xl font-bold text-gray-900 mb-4" }, "📦 Items", -1)),
              a("div", Pu, [
                a("table", Fu, [
                  i[70] || (i[70] = a("thead", null, [
                    a("tr", { class: "bg-gray-50 border-b border-gray-200" }, [
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Item Name"),
                      a("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Code"),
                      a("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Qty"),
                      a("th", { class: "px-6 py-3 text-right font-semibold text-gray-700" }, "Rate (₹)"),
                      a("th", { class: "px-6 py-3 text-right font-semibold text-gray-700" }, "Amount (₹)")
                    ])
                  ], -1)),
                  a("tbody", null, [
                    (M(!0), I(se, null, we(T.value[q.value.id], (c) => (M(), I("tr", {
                      key: c.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      a("td", ju, O(c.name), 1),
                      a("td", Vu, O(c.code), 1),
                      a("td", Nu, O(c.qty), 1),
                      a("td", Lu, O(c.rate.toFixed(2)), 1),
                      a("td", Hu, O(c.amount.toFixed(2)), 1)
                    ]))), 128))
                  ])
                ])
              ])
            ]),
            a("div", $u, [
              a("div", Uu, [
                a("div", null, [
                  i[72] || (i[72] = a("h3", { class: "font-semibold mb-2 text-lg" }, "💰 Total Amount", -1)),
                  a("div", Bu, "₹" + O(q.value.totalAmount.toFixed(2)), 1)
                ]),
                a("p", Wu, O(q.value.itemCount) + " items • " + O(q.value.company), 1)
              ]),
              a("div", Ku, [
                q.value.status === "draft" ? (M(), I("button", {
                  key: 0,
                  onClick: i[20] || (i[20] = (c) => ot(q.value.id, "submitted")),
                  class: "w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, i[73] || (i[73] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1),
                  ae(" ✅ Submit Entry ", -1)
                ]))) : le("", !0),
                q.value.status === "submitted" ? (M(), I("button", {
                  key: 1,
                  onClick: i[21] || (i[21] = (c) => ot(q.value.id, "cancelled")),
                  class: "w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, i[74] || (i[74] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1),
                  ae(" ❌ Cancel Entry ", -1)
                ]))) : le("", !0),
                q.value.status === "cancelled" ? (M(), I("button", qu, i[75] || (i[75] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4h12V7z"
                    })
                  ], -1),
                  ae(" 🔒 Entry Cancelled ", -1)
                ]))) : le("", !0),
                a("button", {
                  onClick: ts,
                  class: "w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                }, i[76] || (i[76] = [
                  a("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 19l-7-7 7-7"
                    })
                  ], -1),
                  ae(" ← Back to List ", -1)
                ]))
              ])
            ])
          ])
        ])) : le("", !0),
        l.value === "reconciliation" ? (M(), I("div", Ju, [
          a("div", zu, [
            i[79] || (i[79] = Fs('<div class="mb-6" data-v-d2b5856f><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-d2b5856f>Stock Reconciliation</h2><p class="text-gray-600" data-v-d2b5856f>Manage and track all stock reconciliation entries</p></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6" data-v-d2b5856f><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-d2b5856f><div data-v-d2b5856f><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d2b5856f>Filter by Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-d2b5856f><option data-v-d2b5856f>All Entries</option><option data-v-d2b5856f>Submitted</option><option data-v-d2b5856f>Draft</option><option data-v-d2b5856f>Cancelled</option></select></div><div data-v-d2b5856f><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d2b5856f>Filter by Warehouse</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-d2b5856f><option data-v-d2b5856f>All Warehouses</option><option data-v-d2b5856f>Main Warehouse</option><option data-v-d2b5856f>Distribution Center</option><option data-v-d2b5856f>Regional Store</option></select></div><div data-v-d2b5856f><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d2b5856f>Search</label><input type="text" placeholder="Search by ID or Company..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-v-d2b5856f></div><div class="flex items-end" data-v-d2b5856f><button class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 text-base" data-v-d2b5856f> 🔍 SEARCH </button></div></div></div>', 2)),
            a("div", Gu, [
              a("div", Yu, [
                a("table", Qu, [
                  i[77] || (i[77] = a("thead", null, [
                    a("tr", { class: "bg-gray-50 border-b border-gray-200" }, [
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Entry ID"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Company"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Warehouse"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Date"),
                      a("th", { class: "px-6 py-3 text-left font-semibold text-gray-700" }, "Items"),
                      a("th", { class: "px-6 py-3 text-right font-semibold text-gray-700" }, "Total (₹)"),
                      a("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Status"),
                      a("th", { class: "px-6 py-3 text-center font-semibold text-gray-700" }, "Actions")
                    ])
                  ], -1)),
                  a("tbody", null, [
                    (M(!0), I(se, null, we(R.value, (c) => (M(), I("tr", {
                      key: c.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      a("td", Xu, O(c.id), 1),
                      a("td", Zu, O(c.company), 1),
                      a("td", ec, O(c.targetWarehouse), 1),
                      a("td", tc, O(c.date), 1),
                      a("td", sc, O(c.itemCount), 1),
                      a("td", nc, O(c.totalAmount.toFixed(2)), 1),
                      a("td", oc, [
                        a("span", {
                          class: vt([
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            c.status === "submitted" ? "bg-green-100 text-green-800" : c.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          ])
                        }, O(c.status.charAt(0).toUpperCase() + c.status.slice(1)), 3)
                      ]),
                      a("td", rc, [
                        a("div", lc, [
                          c.status === "submitted" ? (M(), I("button", {
                            key: 0,
                            onClick: (m) => ot(c.id, "cancelled"),
                            class: "px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition text-xs font-bold"
                          }, " ❌ Cancel ", 8, ic)) : le("", !0),
                          c.status === "draft" ? (M(), I("button", {
                            key: 1,
                            onClick: (m) => ot(c.id, "submitted"),
                            class: "px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition text-xs font-bold"
                          }, " ✅ Submit ", 8, ac)) : le("", !0),
                          a("button", {
                            onClick: (m) => Rt(c.id),
                            class: "px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-xs font-bold"
                          }, " 👁️ View ", 8, uc)
                        ])
                      ])
                    ]))), 128))
                  ])
                ])
              ]),
              R.value.length === 0 ? (M(), I("div", cc, i[78] || (i[78] = [
                a("svg", {
                  class: "w-12 h-12 mx-auto mb-2 text-gray-300",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  })
                ], -1),
                a("p", { class: "text-lg" }, "No reconciliation entries found", -1)
              ]))) : le("", !0)
            ])
          ])
        ])) : le("", !0)
      ])
    ]));
  }
}), fc = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, pc = /* @__PURE__ */ fc(dc, [["__scopeId", "data-v-d2b5856f"]]);
function hc(e) {
  const t = Ci(pc);
  return t.mount(e), t;
}
typeof window < "u" && (window.Dashboard = {
  initDashboard: hc
});
export {
  hc as initDashboard
};
