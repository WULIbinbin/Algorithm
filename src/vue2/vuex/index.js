import Store from './store';

function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!this.$options.store) return;
      Vue.prototype.$store = this.$options.store;
    },
  });
}

export default {
  Store,
  install,
};
