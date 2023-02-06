import { initData } from '../observer/index';
import { initComputed } from './computed';
import { initWatch } from './watch';
import { initMethods } from './methods';
import { Compile } from './complie';

export function initState(vm, opts) {
  if (vm.$data) initData(vm);
  if (vm.$computed) initComputed(vm);
  if (opts.watch) initWatch(vm, opts.watch);
  if (opts.methods) initMethods(vm, opts.methods);
  new Compile(vm);
}
