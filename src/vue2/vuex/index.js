import Store from './store';
export { mapMutations, mapActions,mapGetters } from './helpers';

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
