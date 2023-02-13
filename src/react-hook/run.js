import hooks from './main/index';

const { Tick, useState, useEffect, useReducer, useMemo, useCallback } = hooks;
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { total: state.total + 1 };
    case 'decrement':
      return { total: state.total - 1 };
    default:
      throw new Error();
  }
};
function render() {
  let time = null;
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  useEffect(() => {
    console.log('count 改变了');
    // 清除副作用、支持回调
    time = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      time && clearInterval(time);
    };
  }, [count]);
  document.querySelector('.add').onclick = () => {
    setCount(count + 1);
  };
  document.querySelector('.stopCount').onclick = () => {
    time && clearInterval(time);
  };
  document.querySelector('#count').innerHTML = count;
  console.log(this)
}
Tick.render = render;
render();
