import Module from './module';
import { forEachValue } from '../util';

export default class ModuleCollection {
  constructor(rawRootModule) {
    // register root module (Vuex.Store options)
    this.root = null;
    this.register([], rawRootModule);
  }
  // 根据path获取深层子module
  get(path = []) {
    return path.reduce((module, key) => {
      return module.getChild(key);
    }, this.root);
  }
  // 根据path获取子模块路径
  getNamespace(path = []) {
    let module = this.root;
    return path.reduce((namespace, key) => {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + '/' : '');
    }, '');
  }

  // 递归注册子module
  register(path = [], rawModule) {
    const newModule = new Module(rawModule);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      const parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }

    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        console.log(rawChildModule, key, path);
        this.register(path.concat(key), rawChildModule);
      });
    }
  }
}
