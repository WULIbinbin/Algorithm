import { Dep } from './dep';

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
// 使用 Object.defineProperty 去监听传入对象的每一个属性
export function observer(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  console.log('当前监听属性', data);
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}
