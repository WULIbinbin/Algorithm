import { Dep, pushTarget, popTarget } from './dep';
import { isFunction, noop, parsePath } from '../utils/index.js';

// 订阅者 Watcher
// 接受属性变化的通知，然后去执行更新函数去更新视图
export class Watcher {
  constructor(vm, prop, callback) {
    this.vm = vm;
    this.prop = prop;
    this.callback = callback;
    this.deps = [];
    this.depIds = new Set();
    if (isFunction(prop)) {
      this.getter = prop;
    } else {
      // data.prop转为函数
      this.getter = parsePath(this.prop);
      console.log(this.getter)
      if (!this.getter) {
        this.getter = noop;
      }
    }
    console.log(`初始化Watcher----->来源于：${this.prop} \n`, this);
    this.value = this.get();
  }

  update() {
    // Dep 做发布操作时会调用 watcher.update
    const value = this.get();
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      console.warn(`触发了${this.prop}的watcher的回调`)
      this.callback(value);
    }
  }

  get() {
    // 储存订阅器
    Dep.target = this;
    console.warn('要储存/访问的订阅器是', this);
    pushTarget(this);
    const vm = this.vm;
    // 因为 data 和 computed 中的属性/函数被 Object.defineProperty 监听，这一步会执行监听器里的 get 方法
    let value = this.getter.call(vm, vm);
    popTarget();
    Dep.target = null;
    return value;
  }

  addDep(dep) {
    const id = dep.id;
    console.warn(id, this.depIds.has(id),dep);
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
      // 订阅器收集当前的订阅者watcher
      dep.addSub(this);
    }
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
