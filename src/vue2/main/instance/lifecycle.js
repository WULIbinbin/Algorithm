import { pushTarget, popTarget } from '../observer/dep';

// 调用生命周期
export function callHook(vm, hook = '', args = []) {
  pushTarget();
  const handler = vm.$options[hook];
  if (handler) {
    args ? handler.apply(vm, args) : handler.call(vm);
  }
  popTarget();
}
