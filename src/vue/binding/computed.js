/* eslint-disable */
import { Watcher } from './watcher';
import { Dep } from './dep';
import { noop } from './utils';

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};

export function initComputed(vm, computed = {}) {
  const watchers = Object.create(null);
  vm._computedWatchers = watchers;
  for (const key in computed) {
    const userDef = computed[key];
    console.log('userDef', userDef);
    watchers[key] = new Watcher(vm, userDef, noop, { lazy: true });
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

export function defineComputed(vm, key, userDef) {
  sharedPropertyDefinition.get = createComputedGetter(key);
  sharedPropertyDefinition.set = noop;
  Object.defineProperty(vm, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      console.log('createComputedGetter', Dep.target, watcher);
      watcher.evaluate();
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
