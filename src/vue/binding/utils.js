export function noop(a, b, c) {}

export function isFunction(value) {
  return typeof value === 'function';
}

export function hasProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}
