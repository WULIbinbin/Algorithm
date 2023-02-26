import { forEachValue, partial } from './util';

export function installModule(store, rootState, path, module) {
  const isRoot = !path.length;
  const namespace = store._modules.getNamespace(path);
  if (module.namespaced) {
    !isRoot && (store._modulesNamespaceMap[namespace] = module);
  }

  // set state
  if (!isRoot) {
    const parentState = getNestedState(rootState, path.slice(0, -1));
    const moduleName = path[path.length - 1];
    parentState[moduleName] = module.state;
  }

  const local = (module.context = module);

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key;
    const handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child);
  });
}

function registerMutation(store, type, handler, local) {
  store._mutations[type] = function (payload) {
    handler.call(store, local.state, payload);
  };
}

function registerAction(store, type, handler, local) {
  store._actions[type] = function (payload) {
    let res = handler.call(
      store,
      {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store.getters,
        rootState: store.state,
      },
      payload,
    );
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    return res;
  };
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    return;
  }
  store._wrappedGetters[type] = function (store) {
    return rawGetter(local.state, local.getters, store.state, store.getters);
  };
}

export function resetStoreState(store, state, Vue) {
  store.getters = {};
  const wrappedGetters = store._wrappedGetters;
  const computedObj = {};
  const computedCache = {};
  forEachValue(wrappedGetters, (fn, key) => {
    computedObj[key] = partial(fn, store);
    computedCache[key] = () => computedObj[key]();
    Object.defineProperty(store.getters, key, {
      get: computedCache[key],
      enumerable: true,
    });
  });

  store.state = Vue.observable(state);
}

export function getNestedState(state, path) {
  return path.reduce((state, key) => state[key], state);
}
