import { Dep } from './observer';

// 订阅者 Watcher
// 接受属性变化的通知，然后去执行更新函数去更新视图
export function Watcher(vm, prop, callback) {
  this.vm = vm;
  this.prop = prop;
  this.callback = callback;
  this.value = this.get();
}

Watcher.prototype = {
  update() {
    // Dep 做发布操作时会调用 watcher.update
    const value = this.vm.$data[this.prop];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.callback(value);
    }
  },
  get() {
    // 储存订阅器
    Dep.target = this;
    // 因为 data 中的属性被 Object.defineProperty 监听，这一步会执行监听器里的 get 方法
    const value = this.vm.$data[this.prop];
    Dep.target = null;
    return value;
  },
};
