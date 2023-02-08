import { observe } from '../observer/index';
import { initUse } from './use';
import { initMixin } from './mixin';

export function initGlobalAPI(Vue) {
  
  Vue.observable = (obj) => {
    observe(obj);
    return obj;
  };

  initUse(Vue);
  initMixin(Vue);
}
