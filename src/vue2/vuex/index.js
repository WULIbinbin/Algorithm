function install(Vue) {
  console.log('install', this);
  Vue.mixin({
    beforeCreate() {
      console.log('beforeCreate', this);
      if (!this.$options.store) return;
      Vue.prototype.$store = this.$options.store;
    },
  });
}

export class Store {
  constructor(options, Vue) {
    this.options = options;
    console.log(this.options);

    console.log(Vue);
  }

  get state() {
    return this.options.state;
  }
}

export default {
  Store,
  install,
};
