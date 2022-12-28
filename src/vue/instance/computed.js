/* eslint-disable */
import { Watcher } from '../observer/watcher';
import { Dep } from '../observer/dep';
import { noop } from '../utils/index';

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};

export function initComputed(vm) {
  const watchers = Object.create(null);
  const computed = vm.$computed;
  vm._computedWatchers = watchers;
  for (const key in computed) {
    const userDef = computed[key];
    watchers[key] = new Watcher(vm, userDef, noop, { lazy: true });
    if (!(key in vm)) {
      defineComputed(vm, key);
    }
  }
}

export function defineComputed(vm, key) {
  sharedPropertyDefinition.get = createComputedGetter(key);
  sharedPropertyDefinition.set = noop;
  Object.defineProperty(vm, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      // watcher.evaluate();
      // 此处的 target 是 computed 的订阅者（initComputed 里的 watcher），将要通知其依赖的 data.prop 订阅器去添加这个订阅者
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
