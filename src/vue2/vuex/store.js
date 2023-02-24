import ModuleCollection from './module/module-collection';
import { installModule } from './store-util';
const _bindGetter = Symbol('bindGetter');

export default class Store {
  constructor(options = {}, Vue) {
    console.log(options);
    this._mutations = Object.create(null);
    this._actions = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap =  Object.create(null);
    console.log(this._modules);

    const state = this._modules.root.state;

    const store = this;
    const { commit, dispatch } = this;
    this.commit = function (type, payload, options) {
      return commit.call(store, type, payload, options);
    };
    this.dispatch = function (type, payload) {
      return dispatch.call(store, type, payload);
    };

    installModule(this, state, [], this._modules.root);
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

// export function mapGetter(getterName, getterPath) {
//   const fn = function () {
//     console.log('mapGetter', this);
//   };
//   return {
//     fn,
//   };
// }
