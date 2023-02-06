import { initUse } from './use';
import { initMixin } from './mixin';

export function initGlobalAPI(Vue) {
  initUse(Vue);
  initMixin(Vue);
}
