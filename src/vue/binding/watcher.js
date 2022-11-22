/* eslint-disable */
import { Dep, pushTarget, popTarget } from './dep';
import { isFunction } from './utils';

// 订阅者 Watcher
// 接受属性变化的通知，然后去执行更新函数去更新视图
export class Watcher {
  constructor(vm, prop, callback, options = {}) {
    this.vm = vm;
    this.prop = prop;
    this.callback = callback;
    this.deps = [];
    this.depIds = new Set();
    this.value = this.get();
  }

  update() {
    // Dep 做发布操作时会调用 watcher.update
    const value = this.vm[this.prop];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.callback(value);
    }
  }

  get() {
    // 储存订阅器
    Dep.target = this;
    let value = null;
    pushTarget(this);
    if (isFunction(this.prop)) {
      value = this.prop.call(this.vm, this.vm);
      // console.log(this.prop, value);
    } else {
      // 因为 data 中的属性被 Object.defineProperty 监听，这一步会执行监听器里的 get 方法
      value = this.vm[this.prop];
    }
    popTarget();
    Dep.target = null;
    return value;
  }

  addDep(dep) {
    console.log('addDep', dep);
    const id = dep.id;
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
      // console.log(this.depIds, id);
      // 当前watcher添加到订阅器
      dep.addSub(this);
    }
  }

  evaluate() {
    this.value = this.get();
  }

  depend() {
    let i = this.deps.length;
    console.log(this.deps, i);
    while (i--) {
      this.deps[i].depend();
    }
  }
}
