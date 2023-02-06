import { initUse } from './use';
import { initMixin } from './mixin';

export function initGlobalAPI(Vue) {
  // Vue.options = Object.create(null)
  initUse(Vue);
  initMixin(Vue);
}
