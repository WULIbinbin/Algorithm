/**
 * 满足在methods对象中解耦
 * {
 *    ...mapMutations('命名空间',['mutation集合'])
 * }
 */
export const mapMutations = normalizeNamespace((namespace = '', mutations = []) => {
  console.log(namespace, mutations);
  const res = {};
  return res;
});

export const normalizeNamespace = function (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
};
