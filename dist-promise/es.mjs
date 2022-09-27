function f(t, e = "undefined") {
  return Object.prototype.toString.call(t) === `[object ${e[0].toUpperCase()}${e.substring(1)}]`;
}
const l = "pending", m = "fulfilled", P = "rejected";
function r(t) {
  const e = this;
  this.PromiseState = l, this.PromiseResult = void 0, this.onFulfilledCallBack = [], this.onRejectedCallBack = [];
  try {
    if (!f(t, "function"))
      throw new Error("\u8BF7\u6DFB\u52A0\u56DE\u8C03\u51FD\u6570");
    t(s, n);
  } catch (o) {
    n(o);
  }
  function s(o) {
    e.PromiseState === l && (e.PromiseState = m, e.PromiseResult = o, e.onFulfilledCallBack.forEach((i) => i(o)));
  }
  function n(o) {
    e.PromiseState === l && (e.PromiseState = P, e.PromiseResult = o, e.onRejectedCallBack.forEach((i) => i(o)));
  }
}
r.prototype.then = function(e, s) {
  f(e, "function") || (e = (o) => o), f(s, "function") || (s = (o) => o);
  const n = new r((o, i) => {
    const a = () => {
      try {
        setTimeout(() => {
          const c = e(this.PromiseResult);
          h(n, c, o, i);
        });
      } catch (c) {
        i(c);
      }
    }, u = () => {
      try {
        setTimeout(() => {
          const c = s(this.PromiseResult);
          h(n, c, o, i);
        });
      } catch (c) {
        i(c);
      }
    };
    this.PromiseState === l && (this.onFulfilledCallBack.push(a), this.onRejectedCallBack.push(u)), this.PromiseState === m && a(), this.PromiseState === P && u();
  });
  return n;
};
function h(t, e, s, n) {
  if (t === e)
    throw new Error("\u4E0D\u80FD\u8FD4\u56DE\u81EA\u8EAB");
  e instanceof r ? e.then(s, n) : s(e);
}
r.resolve = function(e) {
  return e instanceof r ? e : new r((s) => {
    s(e);
  });
};
r.reject = function(e) {
  return new r((s, n) => {
    n(e);
  });
};
const p = new r((t, e) => {
  setTimeout(() => {
    t("promise------1");
  }, 2e3);
}), d = new r((t, e) => {
  try {
    setTimeout(() => {
      console.log(that.add()), t("promise------2");
    }, 2e3);
  } catch (s) {
    e(s);
  }
}), w = () => new r((t, e) => {
  setTimeout(() => {
    t("promise------3");
  }, 1e3);
});
p.then((t) => (console.log("res1", t), w())).then((t) => {
  console.log("res1_1", t);
});
d.then(
  (t) => {
    console.log("res2", t);
  },
  (t) => {
    console.log("err2", t);
  }
);
const C = r;
export {
  C as MyPromise
};
