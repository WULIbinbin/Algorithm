const _toString = Object.prototype.toString;

export const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

export function noop(a, b, c) {}

export function toStringCall(v, t) {
  return _toString.call(v) === `[object ${t}]`;
}

export function isFunction(value) {
  return toStringCall(value, 'Function');
}

export function isPlainObject(value) {
  return toStringCall(value, 'Object');
}

export function hasProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

/**
 * Parse simple path.
 */
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`);
export function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
