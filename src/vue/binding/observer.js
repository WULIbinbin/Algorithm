export function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.notify = function notify() {
  console.log('属性变化通知 Watcher 执行更新视图函数');
  this.subs.forEach((sub) => {
    sub.update();
  });
};

Dep.target = null;

export function defineReactive(data, key, value) {
  // 递归调用，监听所有属性
  observer(value);
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newVal) {
      if (value !== newVal) {
        value = newVal;
        dep.notify(); // 通知订阅器
      }
    },
  });
}

// 监听器 Observer
// 作用就是去监听传入对象的每一个属性
export function observer(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  console.log('当前监听属性', data);
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}
