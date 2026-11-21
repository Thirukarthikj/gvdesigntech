import React, { useEffect, useRef } from 'react';

export default function BrainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    let animId;

    const resize = () => {
      const parent = canvas.parentElement;
      const size = window.innerWidth <= 480
        ? Math.min(window.innerWidth - 40, 320)
        : window.innerWidth <= 768
        ? Math.min(window.innerWidth - 60, 420)
        : Math.min(parent ? parent.clientWidth : 650, 650);
      canvas.width = size;
      canvas.height = size;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const count = window.innerWidth < 768 ? 30 : 42;
    const points = Array.from({ length: count }, () => ({
      a: Math.random() * Math.PI * 2,
      r: window.innerWidth < 768 ? 80 + Math.random() * 100 : 120 + Math.random() * 180,
      va: (Math.random() - 0.5) * 0.008,
      vr: (Math.random() - 0.5) * 0.5
    }));

    const lines = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (Math.random() < 0.25) {
          lines.push([i, j, Math.random()]);
        }
      }
    }

    const render = () => {
      t += 0.012;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Center radial glow
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.55);
      bgGrad.addColorStop(0, 'rgba(111, 45, 255, 0.15)');
      bgGrad.addColorStop(0.6, 'rgba(139, 92, 246, 0.05)');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Update points
      points.forEach((p) => {
        p.a += p.va;
        p.r = Math.max(20, Math.min(260, p.r + p.vr));
        p.vr *= 0.99;
      });

      const xs = points.map((p) => w * 0.5 + Math.cos(p.a) * p.r * 0.9);
      const ys = points.map((p) => h * 0.5 + Math.sin(p.a) * p.r * 0.6);

      // Draw connecting lines with dynamic pulse
      lines.forEach(([i, j, phase]) => {
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 + Math.sin(t * 2 + phase * 10) * 0.08})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(xs[i], ys[i]);
        ctx.lineTo(xs[j], ys[j]);
        ctx.stroke();

        // Traveling pulse photon
        const progress = Math.sin(t * 1.5 + phase * 7) * 0.5 + 0.5;
        const px = xs[i] + (xs[j] - xs[i]) * progress;
        const py = ys[i] + (ys[j] - ys[i]) * progress;
        ctx.fillStyle = 'rgba(192, 132, 252, 0.7)';
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      points.forEach((_, idx) => {
        const x = xs[idx];
        const y = ys[idx];
        const nodeGrad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        nodeGrad.addColorStop(0, 'rgba(192, 132, 252, 0.9)');
        nodeGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(224, 195, 252, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="brain-canvas" ref={canvasRef} width={650} height={650} />;
}
