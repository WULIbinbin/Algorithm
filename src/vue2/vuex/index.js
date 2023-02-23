function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!this.$options.store) return;
      Vue.prototype.$store = this.$options.store;
    },
  });
}

const _bindGetter = Symbol('bindGetter');
export class Store {
  constructor(options = {}, Vue) {
    const { state = {}, getters = {}, mutations = {}, actions = {} } = options;
    this.options = options;
    this.getters = Object.create(null);
    this._mutations = mutations;
    this._actions = actions;
    this.state = Vue.observable(state);
    this[_bindGetter](getters);
  }

  commit(type, value) {
    this._mutations[type](this.state, value);
  }

  dispatch(type, payload) {
    return this._actions[type](this, payload);
  }

  // 模拟ts私有函数，不被开发在实例调用（用Reflect.ownKeys还是能拿到）
  [_bindGetter](getters) {
    const store = this;
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](store.state);
        },
      });
    });
  }
}

export function mapGetter(getterName, getterPath) {
  const fn = function () {
    console.log('mapGetter', this);
  };
  return [fn];
}

export default {
  Store,
  install,
};
