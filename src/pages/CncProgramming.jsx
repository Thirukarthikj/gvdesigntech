import React, { useState, useEffect, useRef } from 'react';
import { getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function CncProgramming({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Digital toolpath & coordinate matrix canvas
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

    const toolpaths = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      toolpaths.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(217, 70, 239, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < toolpaths.length; i++) {
        for (let j = i + 1; j < toolpaths.length; j++) {
          const dx = toolpaths[i].x - toolpaths[j].x;
          const dy = toolpaths[i].y - toolpaths[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(toolpaths[i].x, toolpaths[i].y);
            ctx.lineTo(toolpaths[j].x, toolpaths[j].y);
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

  const getCncCourses = () => {
    return getStoredCourses().filter(c =>
      !c.isDiscipline && (
        (c.department && c.department.toLowerCase().includes('cnc')) ||
        (c.category && c.category.toLowerCase().includes('cnc')) ||
        c.link === '/cnc-programming'
      )
    );
  };

  const [coursesList, setCoursesList] = useState(getCncCourses);

  useEffect(() => {
    const unsub = subscribeToContentUpdates(() => {
      setCoursesList(getCncCourses());
    });
    return () => unsub();
  }, []);

  const faqs = [
    {
      q: 'Do I need prior coding experience to learn CNC Programming?',
      a: 'No prior programming background is required! CNC G-Code & M-Code are standardized manufacturing machine codes. We start from foundational blueprint reading and machine coordinates before advancing to MasterCAM and 5-axis programming.'
    },
    {
      q: 'Will I get hands-on experience with real CNC machines and simulations?',
      a: 'Yes! You will work extensively on virtual CNC controllers (Fanuc, Siemens, Haas), MasterCAM toolpath verification, 3D tool collision simulation, and participate in real industrial manufacturing workshop sessions.'
    },
    {
      q: 'What career opportunities exist after completing the CNC Programming program?',
      a: 'Graduates enter aerospace, automotive, die & mould, and precision manufacturing industries as CNC Programmers, CAM Engineers, Machine Shop Supervisors, Quality Inspection Engineers, and Tooling Designers.'
    },
    {
      q: 'What certifications are awarded upon completion?',
      a: 'You receive industry-recognized certifications in CNC Turning & Milling Programming, MasterCAM CAM specialist, and GD&T Inspection compliance with unique credential verification IDs.'
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#04020a', color: '#f8fafc', overflowX: 'hidden' }}>
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* HERO SECTION */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: '150px', paddingBottom: '70px', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.12)', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', color: '#f472b6', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span>⚡</span>
            <span>PRECISION CNC MACHINING &amp; CAM PROGRAMMING</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 24px', background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%, #d946ef 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Master Multi-Axis CNC Turning, Milling &amp; G-Code Simulation
          </h1>

          <p style={{ maxWidth: '820px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.65, color: '#94a3b8' }}>
            Master industry-grade CNC programming, 3-axis &amp; 5-axis CAM toolpath generation, MasterCAM simulation, and precision GD&amp;T quality inspection for high-precision aerospace and automotive manufacturing.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(217, 70, 239, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Enroll in CNC Master Track
            </button>
            <a
              href="#cnc-courses"
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                color: '#f8fafc',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              Explore Curriculum ↓
            </a>
          </div>

          {/* Metric telemetry chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '980px', margin: '60px auto 0', textAlign: 'left' }}>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#c084fc' }}>0.005 mm</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Machining Tolerance Standard</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#38bdf8' }}>5-Axis</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Simultaneous Milling CAM</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#4ade80' }}>100%</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Hands-on Machine Simulation</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fbbf24' }}>MasterCAM</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Official Certified Curriculum</div>
            </div>
          </div>
        </div>
      </section>

      {/* CNC COURSES SECTION */}
      <section id="cnc-courses" style={{ position: 'relative', zIndex: 1, padding: '70px 24px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', color: '#f472b6', textTransform: 'uppercase', marginBottom: '8px' }}>
            — WHAT WE TEACH —
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', color: '#fff', margin: '0 0 12px' }}>
            CNC &amp; CAM <span style={{ color: '#ec4899' }}>COURSES</span>
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '15px', color: '#94a3b8', lineHeight: 1.6 }}>
            Hands-on, industry-aligned manufacturing programs designed to make you production-ready from day one.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {coursesList.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed rgba(217, 70, 239, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>⚡</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>
                No Courses Published Yet
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                New training programs and modules added by the administrator in the Admin Portal will appear here live.
              </p>
              <button
                type="button"
                onClick={onOpenModal}
                style={{
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #be123c, #f43f5e)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(190, 18, 60, 0.35)'
                }}
              >
                Inquire for Upcoming Batches →
              </button>
            </div>
          ) : (
            coursesList.map((c, i) => (
              <div
                key={c.id || c._id || i}
                style={{
                  background: 'rgba(15, 11, 33, 0.85)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
                  <img
                    src={c.img || c.image || '/assets/cad-card-cnc.jpg'}
                    alt={c.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: c.badgeColor || '#ef4444',
                      color: '#fff',
                      fontSize: '10.5px',
                      fontWeight: '800',
                      letterSpacing: '0.8px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {c.badge || 'POPULAR'}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      color: '#e2e8f0',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {c.tag || 'CNC'}
                  </span>
                </div>

                <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '12px' }}>
                    <span style={{ color: '#94a3b8' }}>{c.duration || 'Flexible'}</span>
                    <span style={{ color: '#ec4899', fontWeight: '700', letterSpacing: '0.5px' }}>{c.level || 'All Levels'}</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '0 0 10px', lineHeight: 1.35 }}>
                    {c.title}
                  </h3>

                  <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 22px', flex: 1 }}>
                    {c.desc}
                  </p>

                  <button
                    type="button"
                    onClick={() => onOpenModal && onOpenModal(c.title || c.department)}
                    style={{
                      width: '100%',
                      padding: '11px 0',
                      background: '#be123c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FAQS SECTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '70px 24px 90px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', margin: '0 0 10px' }}>
            Frequently Asked <span style={{ color: '#c084fc' }}>Questions</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8' }}>
            Everything you need to know about our CNC programming curriculum and industrial career paths.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 11, 33, 0.8)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '18px 22px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span>{faq.q}</span>
                <span style={{ fontSize: '20px', color: '#ec4899' }}>{activeFaq === idx ? '−' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div style={{ padding: '0 22px 20px', fontSize: '14.5px', color: '#94a3b8', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px 100px', textAlign: 'center', background: 'rgba(8, 4, 20, 0.9)' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', color: '#fff', margin: '0 0 16px' }}>
            Ready to Become a <span style={{ color: '#d946ef' }}>Master CNC Machinist?</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Join GV DesignTech's industry-led CNC &amp; CAM training today. Gain practical hands-on experience and secure your position in top manufacturing companies.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              padding: '16px 42px',
              background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(217, 70, 239, 0.4)'
            }}
          >
            Apply for CNC Training
          </button>
        </div>
      </section>
    </div>
  );
}