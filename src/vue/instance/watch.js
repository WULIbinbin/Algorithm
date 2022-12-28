import { Watcher } from '../observer/watcher';
import { isPlainObject } from '../utils/index';

export function initWatch(vm, watch) {
  for (const key in watch) {
    const handler = watch[key];
    createWatcher(vm, key, handler);
  }
}

export function createWatcher(vm, key, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return new Watcher(vm, key, handler);
}
