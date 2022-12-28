export default function cloneDeep(target) {
  if (!target) return target;
  const newTarget = target.constructor === Array ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      if (typeof target[key] === 'object') {
        newTarget[key] = cloneDeep(target[key]);
      } else {
        newTarget[key] = target[key];
      }
    }
  }
  return newTarget;
}
