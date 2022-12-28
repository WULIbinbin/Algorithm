/* eslint-disable */
// 订阅器 Dep
let uid = 0;
export class Dep {
  constructor() {
    // 每个 data.prop 都有唯一对应的 depId
    this.id = uid++;
    this.subs = [];
  }

  // 添加订阅者
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知订阅者
  notify() {
    console.log('属性变化通知 Watcher 执行更新视图函数');
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }

  depend() {
    console.warn('dep.depend', Dep.target, this);
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}

Dep.target = null;

const targetStack = [];

export function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
