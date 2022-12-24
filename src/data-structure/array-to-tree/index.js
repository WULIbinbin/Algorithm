export default function arrayToTree(target, parent) {
  const gather = {};
  let result = null;
  let idx = 0;
  const len = target.length;
  while (idx < len) {
    const { id } = target[idx];
    if (!gather[id]) {
      gather[id] = target[idx];
    }
    gather[id] = {
      ...target[idx],
      children: gather[id].children || [],
    };

    const item = gather[id];
    if (id === parent) {
      result = item;
    } else {
      const { pid } = item;
      if (!gather[pid]) {
        gather[pid] = {
          children: [],
        };
      }
      gather[pid].children.push(item);
    }
    idx++;
  }

  return result;
}
