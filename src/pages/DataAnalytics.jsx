import React, { useState, useEffect, useRef } from 'react';

export default function DataAnalytics({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

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

    // Grid points and pulses
    const cols = 20;
    const rows = 12;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW + cellW / 2;
          const y = j * cellH + cellH / 2;
          const dist = Math.sin(t + i * 0.3 + j * 0.2);
          const alpha = Math.max(0.04, 0.15 + dist * 0.1);

          ctx.fillStyle = `rgba(57, 208, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
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

  const stats = [
    { value: '500+', label: 'Dashboards Built' },
    { value: '98%', label: 'Decision Accuracy' },
    { value: '10M+', label: 'Rows Visualized' },
    { value: '150+', label: 'Hiring Partners' }
  ];

  const tools = ['Power BI', 'Advanced Excel', 'SQL Server', 'Tableau', 'Python for Analytics', 'ETL Pipelines', 'DAX & Power Query', 'Statistical Modeling'];

  const faqs = [
    { q: 'Is coding necessary for Data Analytics?', a: 'No prior coding experience is required! Data Analytics emphasizes business logic, SQL databases, Advanced Excel, and visualization tools like Power BI and Tableau.' },
    { q: 'What job profiles can I target?', a: 'Graduates enter roles like Business Intelligence (BI) Analyst, Data Analyst, Financial Analyst, Operations Analyst, and Reporting Specialist.' },
    { q: 'Do you provide real-world project portfolios?', a: 'Yes! Every student completes 5+ real enterprise dashboard projects spanning retail, healthcare, fintech, and supply chain telemetry.' }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#f8fafc', color: '#fff', overflow: 'hidden' }}>
      <canvas className="da-canvas" ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div className="da-nebula" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="da-stars" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}></div>

      {/* Telemetry Panels */}
      <div className="da-hud da-hud-tl">
        ▸ ANALYTICS ENGINE Mode: LIVE<br />
        <span style={{ color: '#22d3ee' }}>Acc: 99.10% · Dashboards: 150+</span>
      </div>
      <div className="da-hud da-hud-tr">
        DATA PIPELINE ◂<br />
        9,812,000 records · Lat: 0.8ms<br />
        <span style={{ color: '#a78bfa' }}>Node: Cloud ✓</span>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(57, 208, 255, 0.12)', border: '1px solid rgba(57, 208, 255, 0.4)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: '#39d0ff', marginBottom: '20px' }}>
            <span>⚡</span> DATA ANALYTICS &amp; BUSINESS INTELLIGENCE
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 20px', background: 'linear-gradient(135deg, #0f172a 40%, #0284c7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Transform Data Into Business Growth
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto 32px', fontSize: '17px', lineHeight: 1.6, color: '#475569' }}>
            Master Power BI, SQL, Advanced Excel, and Predictive Analytics. Turn raw transaction streams into actionable intelligence that drives enterprise growth.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{ padding: '14px 36px', background: 'linear-gradient(135deg, #39d0ff, #8b5cf6)', border: 'none', borderRadius: '12px', color: '#020412', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(57, 208, 255, 0.35)' }}
            >
              Enroll in Analytics Track
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '80px' }}>
          {stats.map((s, idx) => (
            <div key={idx} style={{ padding: '24px', textAlign: 'center', background: 'rgba(30, 22, 68, 0.6)', border: '1px solid rgba(57, 208, 255, 0.25)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#39d0ff', margin: '0 0 6px' }}>{s.value}</h3>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tools */}
        <section style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>Industry Analytics Tools You'll Master</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {tools.map((t, idx) => (
              <span key={idx} style={{ padding: '10px 22px', background: '#ffffff', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '999px', fontSize: '14.5px', fontWeight: '600', color: '#e879f9' }}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: '800px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '32px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid rgba(57, 208, 255, 0.25)', borderRadius: '12px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ width: '100%', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#39d0ff', transform: activeFaq === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 24px 20px', color: '#475569', fontSize: '14.5px', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
