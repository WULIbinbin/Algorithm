export function installModule(store, rootState, path, module) {
  const isRoot = !path.length;
  const namespace = store._modules.getNamespace(path);
  if (module.namespaced) {
    !isRoot && (store._modulesNamespaceMap[namespace] = module);
  }

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key;
    console.log('forEachMutation', namespace, namespacedType);
    registerMutation(store, namespacedType, mutation, rootState);
  });

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child);
  });
}

function registerMutation(store, type, handler, state) {
  const fn = store._mutations[type];
  // console.log(store,type)
  handler.call(store, state, fn);
}
