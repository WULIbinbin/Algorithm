import { Canvas, Circle, Text, Line, Rect } from '@antv/g';
import { Renderer } from '@antv/g-canvas';

export async function init(tree) {
  const unit = 10;
  let canvasWidth = 800;
  const unitNum = Math.floor(canvasWidth / unit);
  console.log(unitNum)
  const canvas = new Canvas({
    container: 'container',
    width: canvasWidth,
    height: canvasWidth,
    renderer: new Renderer(),
  });

  await canvas.ready;
  

  // const len = arr.length - 1
  // function sort(left, right) {
  //   if (left >= right) return
  //   let i = left
  //   let j = right
  //   const base = arr[left]
  //   while (i < j) {
  //     while (i < j && arr[j] >= base) {
  //       j--
  //     }
  //     if (i < j) {
  //       arr[i] = arr[j]
  //       i++
  //     }
  //     while (i < j && arr[i] <= base) {
  //       i++
  //     }
  //     if (i < j) {
  //       arr[j] = arr[i]
  //       j--
  //     }
  //   }
  //   arr[i] = base
  //   sort(left, i - 1)
  //   sort(i + 1, right)
  // }
  // sort(0, len)
  // return arr
}