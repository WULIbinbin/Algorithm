import ModuleCollection from './module/module-collection';
import { installModule, resetStoreState } from './store-util';

export default class Store {
  constructor(options = {}, Vue) {
    this._mutations = Object.create(null);
    this._actions = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = Object.create(null);
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

    resetStoreState(this, state, Vue);
  }

  commit(type, payload) {
    this._mutations[type](payload);
  }

  dispatch(type, payload) {
    return this._actions[type](payload);
  }
}
