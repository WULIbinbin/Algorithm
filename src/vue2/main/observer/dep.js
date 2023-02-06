/* eslint-disable */
// 订阅器 Dep
let uid = 0;
export class Dep {
  constructor() {
    // 每个 data.prop 都有唯一对应的 depId
    this.id = uid++;
    this.subs = [];
  }

  // 收集依赖项（订阅者）
  addSub(watcher) {
    // console.warn(`Dep${this.id}要收集的依赖项：`, watcher);
    this.subs.push(watcher);
  }

  removeSub(sub) {
    this.subs[this.subs.indexOf(sub)] = null;
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

   // 通知订阅者
   notify() {
    // console.log('属性变化通知 Watcher 执行更新视图函数');
    const subs = this.subs.filter((s) => s);
    subs.forEach((watcher) => {
      watcher.update();
    });
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
