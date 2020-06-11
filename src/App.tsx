import React, { useRef, useLayoutEffect } from 'react';
import './App.css';

const size = 500;
class P {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
const p0 = new P(0, 0);
const p1 = new P(0, size / 2);
const p2 = new P(size, size / 2);
const p3 = new P(size, 0);
enum key {
  x = "x",
  y = "y",
}
function cubic_bezier(t: number, key: key): number {
  const t0 = p0[key] * Math.pow(1 - t, 3);
  const t1 = p1[key] * Math.pow(1 - t, 2) * 3 * t;
  const t2 = p2[key] * Math.pow(1 - t, 1) * 3 * Math.pow(t, 2);
  const t3 = p3[key] * Math.pow(t, 3);
  return t0 + t1 + t2 + t3
}
function cb_x(T: number) {
  return cubic_bezier(T, key.x);
}
function cb_y(T: number) {
  return cubic_bezier(T, key.y);
}

function App() {
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (!ctx) return;
      const margin = size * 0.05;
      const base_x = margin;
      const base_y = size * 1.1 - margin;

      // 画标尺
      ctx.beginPath();
      ctx.moveTo(base_x, base_x);
      ctx.lineTo(base_x, base_y);
      ctx.lineTo(base_y, base_y);
      ctx.strokeStyle = 'green';
      ctx.stroke();
      ctx.closePath();

      // 画刻度
      const fontWidth = size / 100;
      ctx.font = "10px serif";
      ctx.fillText("0", base_x - 2 * fontWidth, base_y + 2 * fontWidth);
      for (let index = 1; index <= 10; index++) {
        ctx.fillText(index + "", base_x + index * size / 10, base_y + 2 * fontWidth);
      }
      for (let index = 1; index <= 10; index++) {
        ctx.fillText(index + "", base_x - 2 * fontWidth, base_y - index * size / 10);
      }

      // 画参考线
      ctx.beginPath();
      ctx.moveTo(base_x + p0.x, base_y - p0.y);
      ctx.lineTo(base_x + p1.x, base_y - p1.y);
      ctx.strokeStyle = '#000';
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(base_x + p3.x, base_y - p3.y);
      ctx.lineTo(base_x + p2.x, base_y - p2.y);
      ctx.strokeStyle = '#000';
      ctx.stroke();
      ctx.closePath();

      // 画曲线
      ctx.beginPath();
      ctx.moveTo(base_x, base_y);
      for (let index = 0; index < size; index++) {
        const x0 = base_x;
        const y0 = base_y;

        const t = index / size;

        const x1 = x0 + cb_x(t);
        const y1 = y0 - cb_y(t);

        ctx.lineTo(x1, y1);
      }
      ctx.strokeStyle = 'blue';
      ctx.stroke();
      ctx.closePath();
    }
  })
  return (
    <div className="App">
      <canvas ref={ref} width={size * 1.1} height={size * 1.1} style={{ margin: 200, border: '1px solid red' }}></canvas>
    </div>
  );
}

export default App;
