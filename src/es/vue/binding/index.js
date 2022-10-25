import { observer } from './observer';
import { Watcher } from './watcher';
import { Compile } from './complie';

function Mvue(options) {
  this.$options = options;
  this.$data = options.data;
  this.$el = document.querySelector(options.el);
  this.init();
}
Mvue.prototype.init = function () {
  observer(this.$data);
  new Compile(this);
};
