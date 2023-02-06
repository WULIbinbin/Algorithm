import { isFunction, toArray } from '../utils/index';

export function initUse(Vue) {
  Vue.use = function (plugin) {
    console.log(plugin)
    const installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    const args = toArray(arguments, 1);
    args.unshift(this);
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args);
    } else if (isFunction(plugin)) {
      plugin.install.apply(null, args);
    }

    installedPlugins.push(this);
    return this;
  };
}
