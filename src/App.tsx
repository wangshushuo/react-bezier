import React, { useRef, useLayoutEffect } from 'react';
import './App.css';

/**
 * 相对于坐标系而不是canvase的坐标。
 */
class P {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
enum key {
  x = "x",
  y = "y",
}

const size = 500;

const p0 = new P(10, 10);
const p1 = new P(100, 300);
const p2 = new P(200, 20);
const p3 = new P(250, 400)
const p4 = new P(500, 20);

const p = [p0, p1, p2, p3, p4]

function 阶乘(n: number): number {
  if (n === 0) return 1;
  return n * 阶乘(n - 1)
}
function 组合(n: number, i: number): number {
  return 阶乘(n) / (阶乘(i) * 阶乘(n - i))
}
/**
 * 计算白塞尔曲线
 * @param t [0,1] 0-1之间的小数
 * @param n 几项白塞尔曲线，默认3项
 * @param key 控制点对象P的key，也就是x或y字符串
 */
function cubic_bezier(t: number, n: number, key: key): number {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    const tn = 组合(n, i) * p[i][key] * Math.pow(1 - t, n - i) * Math.pow(t, i);
    sum += tn;
  }
  return sum
}
function cb_x(T: number) {
  return cubic_bezier(T, p.length - 1, key.x);
}
function cb_y(T: number) {
  return cubic_bezier(T, p.length - 1, key.y);
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
      ctx.strokeStyle = 'darkred';
      ctx.stroke();
      ctx.closePath();

      // 画刻度
      const fontWidth = size / 100;
      ctx.font = "20px serif";
      ctx.fillText("0", base_x - 2 * fontWidth, base_y + 2 * fontWidth);
      ctx.fillStyle = 'darkred';
      for (let index = 1; index <= 10; index++) {
        ctx.fillText(index + "", base_x + index * size / 10, base_y + 2 * fontWidth);
      }
      for (let index = 1; index <= 10; index++) {
        ctx.fillText(index + "", base_x - 2 * fontWidth, base_y - index * size / 10);
      }

      // 画参考线
      ctx.beginPath();
      for (let i = 0; i < p.length; i++) {
        const point = p[i];
        if (i === 0) ctx.moveTo(base_x + point.x, base_y - point.y);
        ctx.lineTo(base_x + point.x, base_y - point.y);
      }
      ctx.strokeStyle = 'darkgreen';
      ctx.stroke();
      ctx.closePath();

      // 画控制点
      for (let i = 0; i < p.length; i++) {
        const element = p[i];
        const x = base_x + element.x;
        const y = base_y - element.y;
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.arc(x, y, fontWidth, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle="darkgreen"
        ctx.fill()
        ctx.fillText(i + "", x + 5, y + 2);
      }
      ctx.strokeStyle = 'darkgreen'
      ctx.stroke();

      // 画曲线
      ctx.beginPath();
      ctx.moveTo(base_x + p[0].x, base_y - p[0].y);
      ctx.lineWidth = 2;
      for (let index = 1; index < size; index++) {
        const x0 = base_x;
        const y0 = base_y;

        const t = index / size;

        // 画贝塞尔曲线
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
      <h1>贝塞尔曲线</h1>
      <canvas ref={ref} width={size * 1.1} height={size * 1.1} style={{ margin: 0, border: '1px solid #000' }}></canvas>
    </div>
  );
}

export default App;
