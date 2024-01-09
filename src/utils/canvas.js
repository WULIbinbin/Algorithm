import { Canvas, Rect } from '@antv/g';

export function drawUnit(
  canvas,
  { unit = 50, canvasWidth = 1000, fill = '#f7f7f7', stroke = '#e2e2e2', lineWidth = 1, radius = 0 },
) {
  const unitNum = canvasWidth / unit
  // 构建网格
  const unitRect = (x, y) =>
    new Rect({
      style: {
        x,
        y,
        width: unit,
        height: unit,
        fill,
        stroke,
        lineWidth,
        radius,
      },
    });

  for (let row = 0; row < unitNum; row++) {
    for (let col = 0; col < unitNum; col++) {
      canvas.appendChild(unitRect(col * unit, row * unit));
    }
  }
}
