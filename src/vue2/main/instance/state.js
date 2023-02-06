import { initData } from '../observer/index';
import { initComputed } from './computed';
import { initWatch } from './watch';
import { initMethods } from './methods';
import { Compile } from './complie';
import { callHook } from './lifecycle';

export function initState(vm, opts) {
  callHook(vm, 'beforeCreate',[vm]);
  if (vm.$data) initData(vm);
  if (vm.$computed) initComputed(vm);
  if (opts.watch) initWatch(vm, opts.watch);
  callHook(vm, 'created');
  if (opts.methods) initMethods(vm, opts.methods);
  callHook(vm, 'beforeMount');
  new Compile(vm);
  callHook(vm, 'mounted');
}
