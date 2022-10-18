function f(n, t = "undefined") {
  return Object.prototype.toString.call(n) === `[object ${t[0].toUpperCase()}${t.substring(1)}]`;
}
const u = "pending", P = "fulfilled", d = "rejected";
function s(n) {
  const t = this;
  this.PromiseState = u, this.PromiseResult = void 0, this.onFulfilledCallBack = [], this.onRejectedCallBack = [];
  try {
    if (!f(n, "function"))
      throw new Error("\u8BF7\u6DFB\u52A0\u56DE\u8C03\u51FD\u6570");
    n(r, i);
  } catch (e) {
    i(e);
  }
  function r(e) {
    t.PromiseState === u && (t.PromiseState = P, t.PromiseResult = e, t.onFulfilledCallBack.forEach((o) => o(e)));
  }
  function i(e) {
    t.PromiseState === u && (t.PromiseState = d, t.PromiseResult = e, t.onRejectedCallBack.forEach((o) => o(e)));
  }
}
s.prototype.then = function(t, r) {
  f(t, "function") || (t = (e) => e), f(r, "function") || (r = (e) => {
    throw e;
  });
  const i = new s((e, o) => {
    const l = () => {
      setTimeout(() => {
        try {
          const c = t(this.PromiseResult);
          h(i, c, e, o);
        } catch (c) {
          o(c);
        }
      });
    }, m = () => {
      setTimeout(() => {
        try {
          const c = r(this.PromiseResult);
          h(i, c, e, o);
        } catch (c) {
          o(c);
        }
      });
    };
    this.PromiseState === u && (this.onFulfilledCallBack.push(l), this.onRejectedCallBack.push(m)), this.PromiseState === P && l(), this.PromiseState === d && m();
  });
  return i;
};
function h(n, t, r, i) {
  if (n === t)
    throw new TypeError("Chaining cycle:\u4E0D\u80FD\u8FD4\u56DE\u81EA\u8EAB");
  if (t && (f(t, "object") || f(t, "function"))) {
    let e = !1;
    try {
      const { then: o } = t;
      if (f(o, "function"))
        o.call(
          t,
          (l) => {
            e || (e = !0, h(n, l, r, i));
          },
          (l) => {
            e || (e = !0, i(l));
          }
        );
      else {
        if (e)
          return;
        e = !0, r(t);
      }
    } catch (o) {
      if (e)
        return;
      e = !0, i(o);
    }
  } else
    r(t);
}
s.resolve = function(t) {
  return t instanceof s ? t : new s((r) => {
    r(t);
  });
};
s.reject = function(t) {
  return new s((r, i) => {
    i(t);
  });
};
const a = s;
a.resolve().then(() => (console.log(0), a.resolve(4))).then((n) => {
  console.log(n);
});
a.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() => {
  console.log(6);
});
export {
  a as MyPromise
};
