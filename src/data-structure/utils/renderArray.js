import { Canvas, Circle, Text, CanvasEvent, Rect } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { drawUnit } from '@/utils/canvas';
import cloneDeep from '@/common/cloneDeep';
import sleep from '@/common/promiseSleep';

export default async function init(li, { unit = 20, canvasWidth = 400, func = () => {} }) {
  const canvas = new Canvas({
    container: 'container',
    width: canvasWidth,
    height: canvasWidth,
    renderer: new Renderer(),
  });

  await canvas.ready;

  drawUnit(canvas, {
    unit,
    canvasWidth,
  });

  // 构建数组
  const arrayItem = (x, y, height) =>
    new Rect({
      style: {
        x,
        y,
        width: unit,
        height: height,
        fill: '#6ca9ff',
        stroke: '#0060f0',
        lineWidth: 1,
        radius: 0,
        transformOrigin: 'top',
      },
    });

  let arrayQueue = [];
  let renderedItems = [];
  const promiseToRender = (list) =>
    new Promise(async (resolve) => {
      for (let col = 0; col < list.length; col++) {
        const itemH = list[col] * unit * 0.2;
        const item = arrayItem(col * unit, Math.abs(itemH - unit * list.length), itemH);
        canvas.appendChild(item);
        renderedItems.push(item);
      }

      resolve(renderedItems);
    });

  const result =
    (func &&
      func(li, (items) => {
        arrayQueue.push(cloneDeep(items));
      })) ||
    [];

  const promiseClearRendered = async () => {
    if (renderedItems.length) {
      renderedItems.forEach((oit, i) => {
        canvas.removeChild(oit);
      });
      renderedItems = [];
    }
    return renderedItems;
  };

  for (const list of arrayQueue) {
    await promiseToRender(list);
    await sleep(60);
    await promiseClearRendered(renderedItems);
  }

  await promiseToRender(result);

  console.log('result', result);
}
