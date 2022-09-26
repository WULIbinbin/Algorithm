function f(o, e = "undefined") {
  return Object.prototype.toString.call(o) === `[object ${e[0].toUpperCase()}${e.substring(1)}]`;
}
const c = {
  Pending: "pending",
  Fulfilled: "fulfilled",
  Rejected: "rejected"
};
function r(o) {
  const e = this;
  this.PromiseState = c.Pending, this.PromiseResult = void 0, this.onFulfilledCallBack = [], this.onRejectedCallBack = [];
  try {
    if (!f(o, "function"))
      throw new Error("\u8BF7\u6DFB\u52A0\u56DE\u8C03\u51FD\u6570");
    o(i, n);
  } catch (t) {
    n(t);
  }
  function i(t) {
    e.PromiseState === c.Pending && (e.PromiseState = c.Fulfilled, e.PromiseResult = t, e.onFulfilledCallBack.forEach((s) => s(t)));
  }
  function n(t) {
    e.PromiseState === c.Pending && (e.PromiseState = c.Rejected, e.PromiseResult = t, e.onRejectedCallBack.forEach((s) => s(t)));
  }
}
r.prototype.then = function(e, i) {
  f(e, "function") || (e = (t) => t), f(i, "function") || (i = (t) => t);
  const n = new r((t, s) => {
    const a = () => {
      try {
        setTimeout(() => {
          const l = e(this.PromiseResult);
          h(n, l, t, s);
        });
      } catch (l) {
        s(l);
      }
    }, u = () => {
      try {
        setTimeout(() => {
          const l = i(this.PromiseResult);
          h(n, l, t, s);
        });
      } catch (l) {
        s(l);
      }
    };
    this.PromiseState === c.Pending && (this.onFulfilledCallBack.push(a), this.onRejectedCallBack.push(u)), this.PromiseState === c.Fulfilled && a(), this.PromiseState === c.Rejected && u();
  });
  return n;
};
function h(o, e, i, n) {
  if (o === e)
    throw new Error("\u4E0D\u80FD\u8FD4\u56DE\u81EA\u8EAB");
  e instanceof r ? e.then(i, n) : i(e);
}
r.resolve = function(e) {
  return e instanceof r ? e : new r((i) => {
    i(e);
  });
};
r.reject = function(e) {
  return new r((i, n) => {
    n(e);
  });
};
const P = r;
export {
  P as MyPromise
};
