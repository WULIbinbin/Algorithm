/* eslint-disable */
import { Dep } from './dep';

export function initState(vm) {
  let data = vm.$options.data; // 拿到配置的data属性值
  // 判断data是函数还是别的类型
  data = vm._data = typeof data === 'function' ? data.call(vm, vm) : data || {};
  const keys = Object.keys(data);
  let i = keys.length;
  while (i--) {
    // 从this上读取的数据全部拦截到this._data到里面读取
    // 例如 this.name 等同于  this._data.name
    // 以至于 data.prop 有唯一对应的 depId
    proxy(vm, '_data', keys[i]);
  }
  observe(data); // 数据观察
}

// 数据观察函数
function observe(data) {
  if (!(data !== null && typeof data === 'object')) {
    return;
  }
  return new Observer(data);
}

// 从this上读取的数据全部拦截到this._data到里面读取
// this._data里的key绑定到this上
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      return (vm[source][key] = newValue);
    },
  });
}

export function defineReactive(data, key, value) {
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      console.log(`defineProperty:::::::::，我监听的是${key}`, dep, Dep.target);
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set(newVal) {
      if (value !== newVal) {
        observe(newVal); // 给新的值设置响应式
        value = newVal;
        dep.notify(); // 通知订阅器
      }
    },
  });
  // 递归调用，监听所有属性
  observe(value);
}

// 监听器 Observer
// 使用 Object.defineProperty 去监听传入对象的每一个属性
export class Observer {
  constructor(data) {
    console.log('当前监听属性', data);
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}
