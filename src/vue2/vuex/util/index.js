/**
 * 遍历对象，在回调返回对应key值和key名
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}