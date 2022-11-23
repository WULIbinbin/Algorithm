import { initState } from './observer';
import { initComputed } from './computed';
import { Watcher } from './watcher';
import { Compile } from './complie';

export function Mvue(options) {
  this.$options = options;
  this.$data = options.data && options.data();
  this.$computed = options.computed;
  this.$el = document.querySelector(options.el);
  this.init();
}

Mvue.prototype.init = function init() {
  if (this.$data) initState(this);
  if (this.$computed) initComputed(this);
  new Compile(this);
};
