import { initData } from '../observer/index';
import { initComputed } from './computed';
import { initWatch } from './watch';
import { Compile } from './complie';

export function initState(vm, opts) {
  if (vm.$data) initData(vm);
  if (vm.$computed) initComputed(vm);
  if (opts.watch) initWatch(vm, opts.watch);
  new Compile(vm);
}
