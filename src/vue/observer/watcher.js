import { pushTarget, popTarget } from './dep';
import { isFunction, noop, parsePath } from '../utils/index.js';

// 订阅者 Watcher
// 接受属性变化的通知，然后去执行更新函数去更新视图
export class Watcher {
  constructor(vm, prop, cb) {
    this.vm = vm;
    this.prop = prop;
    this.cb = cb;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    if (isFunction(prop)) {
      this.getter = prop;
    } else {
      // data.prop转为函数
      this.getter = parsePath(this.prop);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    console.warn(`创建依赖项Watcher----->来源于：${isFunction(this.prop) ? `${this.prop.name}()` : this.prop} \n`, this);
    this.value = this.get();
  }

  update() {
    // Dep 做发布操作时会调用 watcher.update
    const value = this.get();
    if (value !== this.value) {
      const oldVal = this.value;
      this.value = value;
      console.warn(`触发了${this.prop}的watcher的回调`);
      this.cb.call(this.vm, value, oldVal);
    }
  }

  get() {
    // 评估getter，重新收集依赖项（订阅器）
    pushTarget(this);
    let value;
    const vm = this.vm;
    try {
      // 因为 data 和 computed 中的属性/函数被 Object.defineProperty 监听，这一步会执行监听器里的 get 方法
      value = this.getter.call(vm, vm);
    } catch (e) {
      throw e;
    } finally {
      popTarget();
      this.cleanupDeps();
    }
    return value;
  }

  // 收集依赖项（订阅者）
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }

  evaluate() {
    this.value = this.get();
  }

  depend() {
    console.warn('wacther.depend', this.deps, this);
    // 从 computedGetter 里调用 computed 的订阅器，当前 computed 订阅器中 deps 已经包含了依赖的 data.prop 的订阅器，
    // 然后对应的 data.prop 的订阅器也去添加 computed 的订阅者
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}
