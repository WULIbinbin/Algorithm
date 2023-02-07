import { pushTarget, popTarget } from '../observer/dep';

export function callHook(vm, hook = '', args = []) {
  pushTarget();
  const handler = vm.$options[hook];
  if (handler) {
    args ? handler.apply(vm, args) : handler.call(vm);
  }
  popTarget();
}
