// 利用表达式设置对象的值

export function _set(obj, exp, val) {
  const keys = exp.split('.');

  const len = keys.length;
  let lastIndex = len - 1,
    index = -1,
    nested = obj;

  while (++index <= lastIndex) {
    const key = keys[index];
    if (index === lastIndex) {
      nested[key] = val;
    }
    nested = nested[key];
  }

  return obj;
}
