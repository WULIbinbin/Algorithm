import { observer } from './observer';
import { Compile } from './complie';

export function Mvue(options) {
  this.$options = options;
  this.$data = options.data && options.data();
  this.$el = document.querySelector(options.el);
  this.init();
}

Mvue.prototype.init = function init() {
  observer(this.$data);
  new Compile(this);
};
