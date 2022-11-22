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
  this.$mount();
}

Mvue.prototype.init = function init() {
  if (this.$data) initState(this);
  if (this.$computed) initComputed(this, this.$computed);
  new Compile(this);
};

Mvue.prototype.$mount = function mount() {
  const vm = this;
  new Watcher(vm, vm.$el, () => {}, true);
};
