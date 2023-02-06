import { initState } from './state';

export default function MyVue(opts) {
  this.$options = opts;
  this.$data = opts.data && opts.data();
  this.$computed = opts.computed;
  this.$el = document.querySelector(opts.el);
  initState(this, opts);
}
