import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function DataScienceInternship({ onOpenModal }) {
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

    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
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

        ctx.fillStyle = `rgba(16, 185, 129, ${n.alpha})`;
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
            ctx.strokeStyle = `rgba(5, 150, 105, ${0.18 * (1 - dist / 120)})`;
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

  const modules = [
    { title: 'Python for Data Science', desc: 'Syntax fundamentals, Jupyter notebooks, list comprehensions, functional programming, and data engineering fundamentals.' },
    { title: 'Data Cleaning and Processing', desc: 'Handling missing values, outlier detection, deduplication, string parsing, categorical encoding, and feature scaling.' },
    { title: 'NumPy and Pandas', desc: 'High-performance n-dimensional arrays, vectorized mathematical computation, DataFrame indexing, grouping, pivoting, and merging.' },
    { title: 'Data Visualization', desc: 'Crafting expressive analytical plots, distribution graphs, correlation heatmaps, and interactive charts using Matplotlib and Seaborn.' },
    { title: 'Statistical Analysis', desc: 'Hypothesis testing, p-values, confidence intervals, A/B testing methodologies, probability distributions, and inferential analytics.' },
    { title: 'Machine Learning Fundamentals', desc: 'Introduction to predictive modeling, regression analysis, classification metrics, confusion matrices, and model validation.' },
    { title: 'Real-Time Data Projects', desc: 'End-to-end data pipelines analyzing real industry datasets, customer churn prediction, sales forecasting, and interactive BI dashboards.' }
  ];

  const benefits = [
    { icon: '💻', title: 'Practical Training', desc: 'Hands-on technical learning.' },
    { icon: '🚀', title: 'Live Projects', desc: 'Work on practical projects.' },
    { icon: '👨‍🏫', title: 'Expert Guidance', desc: 'Learn with mentor support.' },
    { icon: '📜', title: 'Internship Certificate', desc: 'Certificate upon meeting program requirements.' }
  ];

  const faqs = [
    { q: 'Do I need advanced mathematics or coding experience before starting?', a: 'Basic familiarity with math and computer concepts is helpful, but our curriculum begins with Python basics and foundational statistics before moving to advanced data wrangling.' },
    { q: 'What is the primary target outcome?', a: 'Develop practical data analysis skills and work with real-world datasets, enabling you to build data pipelines and showcase analytical reports.' },
    { q: 'Will I work on real industry datasets?', a: 'Yes! You will work with real datasets from e-commerce, healthcare, finance, and manufacturing, preparing you for corporate analytics roles.' }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#04020a', color: '#f8fafc', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* HERO SECTION */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: '150px', paddingBottom: '70px', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 20px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', color: '#34d399', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span>📊</span>
            <span>PROGRAM 04 • DATA SCIENCE INTERNSHIP</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 30%, #34d399 70%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Data Science Internship
          </h1>

          <div style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: '700', color: '#f8fafc', marginBottom: '20px' }}>
            Data Science Internship
          </div>

          <p style={{ maxWidth: '820px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.65, color: '#94a3b8' }}>
            Learn how to collect, process, analyze, and visualize data to discover meaningful insights and support business decisions.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('Data Science & Analytics Internship')}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #059669, #047857)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(5, 150, 105, 0.35)',
                transition: 'transform 0.2s'
              }}
            >
              Apply for DS Internship
            </button>
            <Link
              to="/internship"
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                color: '#f8fafc',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              All Internship Tracks ←
            </Link>
          </div>

          {/* Outcome Highlight Box */}
          <div style={{ maxWidth: '840px', margin: '50px auto 0', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '16px', padding: '24px 30px', textAlign: 'left', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>🎯</span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#34d399', letterSpacing: '1px', textTransform: 'uppercase' }}>Program Outcome</span>
            </div>
            <p style={{ margin: 0, fontSize: '16px', color: '#f8fafc', fontWeight: '600', lineHeight: 1.6 }}>
              Outcome: Develop practical data analysis skills and work with real-world datasets.
            </p>
          </div>
        </div>
      </section>

      {/* CURRICULUM MODULES */}
      <section style={{ position: 'relative', zIndex: 1, padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ color: '#34d399', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — SYLLABUS &amp; CORE TOPICS —
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            WHAT YOU WILL <span style={{ color: '#34d399' }}>LEARN</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '12px auto 0' }}>
            End-to-end data analytics workflow from raw data ingestion to actionable predictive insights.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {modules.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 11, 33, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                gap: '18px',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.25s ease, border-color 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.25)';
              }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', fontWeight: '800', fontSize: '15px', flexShrink: 0 }}>
                0{idx + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc', margin: '0 0 8px' }}>
                  {m.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMON INTERNSHIP BENEFITS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '70px 24px', background: 'rgba(10, 8, 26, 0.7)', borderTop: '1px solid rgba(16, 185, 129, 0.15)', borderBottom: '1px solid rgba(16, 185, 129, 0.15)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: '800', margin: '0 0 12px' }}>
              Common Internship Benefits
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px' }}>
              Guaranteed advantages included across our internship programs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {benefits.map((b, idx) => (
              <div key={idx} style={{ background: 'rgba(15, 11, 33, 0.85)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '16px', padding: '28px 24px', textAlign: 'left' }}>
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{b.icon}</div>
                <h4 style={{ fontSize: '19px', fontWeight: '700', color: '#f8fafc', margin: '0 0 8px' }}>{b.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '70px 24px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px' }}>
            Frequently Asked Questions
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>
            Have questions about the Data Science Internship?
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ background: 'rgba(15, 11, 33, 0.8)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{ width: '100%', textAlign: 'left', padding: '18px 22px', background: 'none', border: 'none', color: '#f8fafc', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#34d399', fontSize: '20px', transition: 'transform 0.2s', transform: activeFaq === idx ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {activeFaq === idx && (
                <div style={{ padding: '0 22px 18px', color: '#94a3b8', fontSize: '14px', lineHeight: 1.65 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px 120px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(15, 11, 33, 0.9))', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '24px', padding: '60px 32px', boxShadow: '0 24px 60px rgba(16, 185, 129, 0.2)', backdropFilter: 'blur(16px)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: '800', margin: '0 0 16px', color: '#f8fafc' }}>
            Start Your Internship Journey Today!
          </h2>
          <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: '700', color: '#34d399', marginBottom: '24px', letterSpacing: '1px' }}>
            Learn. Practice. Build. Grow.
          </div>
          <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '640px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Develop practical data analysis skills and work with real-world datasets under experienced data science mentors.
          </p>
          <button
            type="button"
            onClick={() => onOpenModal && onOpenModal('Data Science & Analytics Internship')}
            style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #059669, #047857)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)', transition: 'transform 0.2s' }}
          >
            Apply for Data Science Internship →
          </button>
        </div>
      </section>
    </div>
  );
}
