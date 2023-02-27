import { isObject } from './util';
/**
 * 满足在methods对象中解耦
 * {
 *    ...mapMutations('命名空间',['mutation集合'])
 * }
 */
export const mapMutations = normalizeNamespace((namespace = '', mutations = []) => {
  const res = {};
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function (...args) {
      const type = namespace + val;
      try {
        this.$store.commit.apply(this.$store, [type].concat(args));
      } catch (e) {
        console.error(`mutation ${type} is not exist`);
      }
    };
  });
  return res;
});

export const mapActions = normalizeNamespace((namespace = '', actions = []) => {
  const res = {};
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function (payload) {
      const type = namespace + val;
      try {
        return this.$store.dispatch(type, payload);
      } catch (e) {
        console.error(`action ${type} is not exist`);
      }
    };
  });
  return res;
});

export const mapGetters = normalizeNamespace((namespace = '', getters = []) => {
  const res = {};
  normalizeMap(getters).forEach(({ key, val }) => {
    res[key] = function () {
      const type = namespace + val;
      try {
        return this.$store.getters[type];
      } catch (e) {
        console.error(`getter ${type} is not exist`);
      }
    };
  });
  return res;
});

export function normalizeNamespace(fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

// 把传入的对象或数组都转换为统一格式数组
export function normalizeMap(map) {
  if (!isValidMap(map)) return;
  return Array.isArray(map)
    ? map.map((key) => ({ key, val: key }))
    : Object.keys(map).map((key) => ({ key, val: map[key] }));
}

export function isValidMap(map) {
  return Array.isArray(map) || isObject(map);
}
