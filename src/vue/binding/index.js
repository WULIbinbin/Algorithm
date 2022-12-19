import { initData } from './observer';
import { initComputed } from './computed';
import { initWatch } from './watch';
import { Compile } from './complie';

export function Mvue(opts) {
  this.$options = opts;
  this.$data = opts.data && opts.data();
  this.$computed = opts.computed;
  this.$el = document.querySelector(opts.el);
  this.initState(opts);
}

Mvue.prototype.initState = function initState(opts) {
  if (this.$data) initData(this);
  if (this.$computed) initComputed(this);
  if (opts.watch) initWatch(this, opts.watch);
  new Compile(this);
};
