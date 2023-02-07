function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!this.$options.store) return;
      Vue.prototype.$store = this.$options.store;
    },
  });
}

export class Store {
  constructor(options = {}) {
    const { state = {}, getters = {}, mutations = {}, actions = {} } = options;
    this.options = options;
    this.getters = Object.create(null);
    this._mutations = {};
    this._actions = {};
    this.state = state
    this.bindGetter(getters);
  }

  commit(type, payload) {
    this._mutations[type].call(this, payload);
  }

  dispatch(type, payload) {
    return this._actions[type].call(this, payload);
  }

  bindGetter(getters) {
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        },
      });
    });
  }
}

export default {
  Store,
  install,
};
