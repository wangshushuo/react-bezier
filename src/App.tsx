import React, { useRef, useLayoutEffect } from 'react';
import './App.css';
import Bezier from '@wangshushuo/bezierjs'

const winWidth = window.innerWidth;
const maxWidth = 720;
const scale = winWidth >= maxWidth ? 1 : winWidth / maxWidth;

const size = 500 * scale;

const bezier = new Bezier();
bezier.addPoint(10 * scale, 10 * scale)
bezier.addPoint(100 * scale, 300 * scale)
bezier.addPoint(200 * scale, 20 * scale)
bezier.addPoint(350 * scale, 400 * scale)
bezier.addPoint(500 * scale, 20 * scale)

function App() {
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (!ctx) return;
      const p = bezier.getPointArray();

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
      ctx.font = `${20 * scale}px serif`;
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
        const x1 = x0 + bezier.bezier_x(t);
        const y1 = y0 - bezier.bezier_y(t);

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
