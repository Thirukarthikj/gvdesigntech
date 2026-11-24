import React, { useEffect, useRef } from 'react';
import { mouStyles as yb } from '../data/styles.js';
import { mouList } from '../data/mous.js';

export default function FlagshipMou({ onOpenModal }) {
  const canvasRef = useRef(null);

  // High-tech partnership node canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const nodes = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;

        ctx.fillStyle = `rgba(168, 85, 247, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={yb['mou-page']} style={{ position: 'relative', minHeight: '100vh', background: '#04020a', color: '#f8fafc', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 1, padding: '140px 24px 70px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1.2px', marginBottom: '20px' }}>
            OFFICIAL PARTNERSHIPS
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 20px', color: '#fff' }}>
            Memorandum of<br /><span style={{ background: 'linear-gradient(135deg, #a78bfa, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Understanding</span>
          </h1>
          <p style={{ maxWidth: '720px', margin: '0 auto 36px', fontSize: '17px', lineHeight: 1.6, color: '#94a3b8' }}>
            Bridging academia and the core CAD &amp; engineering design industry through collaborative curriculum design, certified student internships, state-of-the-art incubation labs, and dedicated campus hiring drives.
          </p>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#39d0ff' }}>500+</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Partner Institutions</div>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }}></div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#a78bfa' }}>10,000+</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Students Benefited</div>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }}></div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#d946ef' }}>100%</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Placement Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* MOU Cards Grid */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>
            Our MOUs Signed
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>
            Empowering top colleges and universities across Tamil Nadu and beyond
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {mouList.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '28px',
                background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.75), rgba(8, 6, 26, 0.85))',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                backdropFilter: 'blur(12px)',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.55)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ padding: '5px 14px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', fontSize: '12px', fontWeight: '700', color: '#f472b6' }}>
                  {item.tag || 'MOU Signed'}
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: '500' }}>{item.date}</span>
              </div>

              <div>
                <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 8px', lineHeight: 1.35 }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  {item.detail}
                </p>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '12px', color: '#c084fc', fontWeight: '600' }}>
                <span>🏛️ Official Academic MOU Partner</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
