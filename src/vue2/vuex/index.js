function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!this.$options.store) return;
      Vue.prototype.$store = this.$options.store;
    },
  });
}

const _bindGetter = Symbol('bindGetter');
const _registryModules = Symbol('registryModules');
const _mapModules = Symbol('mapModules');

export class Store {
  constructor(options = {}, Vue) {
    const { state = {}, getters = {}, mutations = {}, actions = {} } = options;
    console.log(options);
    this.options = options;
    this.getters = Object.create(null);
    this._mutations = {};
    this._actions = {};
    this.state = {};
    this[_registryModules](options);
    this[_bindGetter](getters);
    Vue.observable(this.state);
  }

  commit(type, value) {
    this._mutations[type](this.state, value);
  }

  dispatch(type, payload) {
    return this._actions[type](this, payload);
  }
  // 递归子modules，注册所有modules
  [_registryModules](modules, path = '') {
    const { _mutations, _actions, state: _state } = this;
    console.log('curModule', modules);
    if (modules.modules) {
      const { modules: childModules } = modules;
      Object.keys(childModules).forEach((key) => {
        const { mutations, actions, state } = childModules[key];
        const moduleName = `${path}${path ? '/' : ''}${key}`;
        forEachState(state, _state, key);
        registryMutations(mutations, _mutations, moduleName);
        registryActions(actions, _actions, moduleName);
        this[_registryModules](childModules[key], moduleName);
      });
    }
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

function forEachObj(obj = {}, path = '', cb) {
  Object.keys(obj).forEach((key) => {
    cb(`${path}/${key}`, obj[key]);
  });
}

function registryMutations(resource, target, key) {
  forEachObj(resource, key, (funcName, fn) => {
    target[funcName] = fn;
  });
}

function registryActions(resource, target, key) {
  forEachObj(resource, key, (funcName, fn) => {
    target[funcName] = fn;
  });
}

function forEachState(obj, targetObj, targetKey) {
  targetObj[targetKey] = obj
}

export function mapGetter(getterName, getterPath) {
  const fn = function () {
    console.log('mapGetter', this);
  };
  return {
    fn,
  };
}

export default {
  Store,
  install,
};
