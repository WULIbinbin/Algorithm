import { mergeOptions } from '../utils/options';

export function initMixin(Vue) {
  Vue.mixin = function (mixin = {}) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
