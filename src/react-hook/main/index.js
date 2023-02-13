const HOOKS = [];
let currentIndex = 0;
// 1、函数式组件初始化调用时，会把组件中所有的hook函数按调用顺序保存到链表中（react源码用的是链表，这里用数组模拟）。
// 2、每个hook函数在调用前，都会保存本次自己在链表中的下标。
// 3、链表用来保存hook的存取值，比如useState是保存state，useEffect是保存回调函数和依赖。
const Tick = {
  render: null,
  queue: [],
  push: function (task) {
    this.queue.push(task);
  },
  nextTick: function (update) {
    this.push(update);
    Promise.resolve().then(() => {
      if (this.queue.length) {
        // 一次循环后，全部出栈，确保单次事件循环不会重复渲染
        this.queue.forEach((f) => f()); // 依次执行队列中所有任务
        currentIndex = 0; // 重置计数
        this.queue = []; // 清空队列
        this.render && this.render(); // 更新dom
      }
    });
  },
};

function useState(initialState) {
  HOOKS[currentIndex] = HOOKS[currentIndex] || (typeof initialState === 'function' ? initialState() : initialState);
  const memoryCurrentIndex = currentIndex; // currentIndex 是全局可变的，需要保存本次的
  const setState = (p) => {
    let newState = p;
    // setCount(count => count + 1)  判断这种用法
    if (typeof p === 'function') {
      newState = p(HOOKS[memoryCurrentIndex]);
    }
    // 如果设置前后的值一样，就不更新了
    if (newState === HOOKS[memoryCurrentIndex]) return;
    Tick.nextTick(() => {
      HOOKS[memoryCurrentIndex] = newState;
    });
  };
  return [HOOKS[currentIndex++], setState];
}
function useEffect(fn, deps) {
  const hook = HOOKS[currentIndex];
  const _deps = hook && hook._deps;
  const hasChange = _deps ? !deps.every((v, i) => _deps[i] === v) : true;
  const memoryCurrentIndex = currentIndex; // currentIndex 是全局可变的
  if (hasChange) {
    const _effect = hook && hook._effect;
    setTimeout(() => {
      typeof _effect === 'function' && _effect(); // 每次先判断一下有没有上一次的副作用需要卸载
      const ef = fn();
      HOOKS[memoryCurrentIndex] = { ...HOOKS[memoryCurrentIndex], _effect: ef }; // 更新effects
    });
  }
  HOOKS[currentIndex++] = { _deps: deps, _effect: null };
}
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);
  const update = (state, action) => {
    const result = reducer(state, action);
    setState(result);
  };
  const dispatch = update.bind(null, state);
  return [state, dispatch];
}
function useMemo(fn, deps) {
  const hook = HOOKS[currentIndex];
  const _deps = hook && hook._deps;
  const hasChange = _deps ? !deps.every((v, i) => _deps[i] === v) : true;
  const memo = hasChange ? fn() : hook.memo;
  HOOKS[currentIndex++] = { _deps: deps, memo };
  return memo;
}
function useCallback(fn, deps) {
  return useMemo(() => fn, deps);
}

export default {
  Tick,
  HOOKS,
  useState,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
};
