function u(o, t = "undefined") {
  return Object.prototype.toString.call(o) === `[object ${t[0].toUpperCase()}${t.substring(1)}]`;
}
const l = "pending", m = "fulfilled", P = "rejected";
function c(o) {
  const t = this;
  this.PromiseState = l, this.PromiseResult = void 0, this.onFulfilledCallBack = [], this.onRejectedCallBack = [];
  try {
    if (!u(o, "function"))
      throw new Error("\u8BF7\u6DFB\u52A0\u56DE\u8C03\u51FD\u6570");
    o(r, n);
  } catch (e) {
    n(e);
  }
  function r(e) {
    t.PromiseState === l && (t.PromiseState = m, t.PromiseResult = e, t.onFulfilledCallBack.forEach((i) => i(e)));
  }
  function n(e) {
    t.PromiseState === l && (t.PromiseState = P, t.PromiseResult = e, t.onRejectedCallBack.forEach((i) => i(e)));
  }
}
c.prototype.then = function(t, r) {
  u(t, "function") || (t = (e) => e), u(r, "function") || (r = (e) => {
    throw e;
  });
  const n = new c((e, i) => {
    const f = () => {
      setTimeout(() => {
        try {
          const s = t(this.PromiseResult);
          a(n, s, e, i);
        } catch (s) {
          i(s);
        }
      });
    }, h = () => {
      setTimeout(() => {
        try {
          const s = r(this.PromiseResult);
          a(n, s, e, i);
        } catch (s) {
          i(s);
        }
      });
    };
    this.PromiseState === l && (this.onFulfilledCallBack.push(f), this.onRejectedCallBack.push(h)), this.PromiseState === m && f(), this.PromiseState === P && h();
  });
  return n;
};
function a(o, t, r, n) {
  if (o === t)
    throw new TypeError("Chaining cycle:\u4E0D\u80FD\u8FD4\u56DE\u81EA\u8EAB");
  if (t && (u(t, "object") || u(t, "function"))) {
    let e = !1;
    try {
      const { then: i } = t;
      if (u(i, "function"))
        i.call(
          t,
          (f) => {
            e || (e = !0, a(o, f, r, n));
          },
          (f) => {
            e || (e = !0, n(f));
          }
        );
      else {
        if (e)
          return;
        e = !0, r(t);
      }
    } catch (i) {
      if (e)
        return;
      e = !0, n(i);
    }
  } else
    r(t);
}
c.resolve = function(t) {
  return t instanceof c ? t : new c((r) => {
    r(t);
  });
};
c.reject = function(t) {
  return new c((r, n) => {
    n(t);
  });
};
export {
  c as default
};
