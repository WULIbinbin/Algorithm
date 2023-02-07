import { initState } from './state';
import { callHook } from './lifecycle';
import { Compile } from './complie';
import { mergeOptions } from '../utils/options';

export function initMixin(MyVue) {
  MyVue.prototype._init = function (opts) {
    const vm = this;
    vm.$options = mergeOptions(vm.constructor.options, opts, vm);
    vm.$data = opts.data && opts.data();
    vm.$computed = opts.computed;
    vm.$el = document.querySelector(opts.el);
    callHook(vm, 'beforeCreate', [vm]);
    initState(vm, opts);
    callHook(vm, 'created');
    new Compile(vm);
  };
}

