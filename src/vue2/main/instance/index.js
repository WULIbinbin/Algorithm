import { initState } from './state';
import { mergeOptions } from '../utils/options';

export default function MyVue(opts) {
  this.$options = opts// mergeOptions(MyVue.prototype.options, opts, this);
  // console.log(1111,this.$options)
  this.$data = opts.data && opts.data();
  this.$computed = opts.computed;
  this.$el = document.querySelector(opts.el);
  initState(this, opts);
  console.log(this);
}
