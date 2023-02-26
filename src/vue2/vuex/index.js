import Store from './store';
import { mapMutations } from './helpers';

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
  mapMutations,
};
