import { noop } from '../utils/index';

export function initMethods(vm, methods) {
  for (const key in methods) {
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function bind(fn, ctx) {
  return fn.bind(ctx);
}
