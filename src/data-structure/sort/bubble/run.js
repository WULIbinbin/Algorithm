import render from '../../utils/renderArray';
import bubbleSearch from './index';

const random = (i) => {
  const r = [];
  let k = 0;
  while (i >= ++k) {
    r.push(Math.ceil(Math.random() * 100));
  }
  return r;
};

const unit = 16;
const num = 20;
const li = random(num);
console.log('原数组:', li);

render(li, {
  unit,
  canvasWidth: num * unit,
  func: bubbleSearch,
});
