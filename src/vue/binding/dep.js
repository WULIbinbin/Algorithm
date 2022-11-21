// 发布订阅
export function Dep() {
  this.subs = [];
}
Dep.target = null;
// 添加订阅者
Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};
// 通知订阅者
Dep.prototype.notify = function notify() {
  console.log('属性变化通知 Watcher 执行更新视图函数');
  this.subs.forEach((sub) => {
    sub.update();
  });
};