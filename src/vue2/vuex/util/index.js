/**
 * 遍历对象，在回调返回对应key值和key名
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach((key) => fn(obj[key], key));
}

export function partial(fn, arg) {
  return function () {
    return fn(arg);
  };
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function isPromise(res) {
  return !!res && typeof res.then === 'function';
}
