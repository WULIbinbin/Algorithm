function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!this.$options.store) return;
      Vue.prototype.$store = this.$options.store;
    },
  });
}

export class Store {
  constructor(options, Vue) {
    this.options = options;
    console.log(this.options);
    console.log('Store',Vue)
  }

  get state() {
    return this.options.state;
  }
}

export default {
  Store,
  install,
};
