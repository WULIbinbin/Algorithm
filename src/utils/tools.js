export function isTypeOf(value, type = 'undefined') {
  return Object.prototype.toString.call(value) === `[object ${type[0].toUpperCase()}${type.substring(1)}]`;
}

export function isFunction(value) {
  return typeof value === 'function';
}
