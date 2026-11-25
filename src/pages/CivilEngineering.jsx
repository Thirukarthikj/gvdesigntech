import React, { useState, useEffect, useRef } from 'react';
import { getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function CivilEngineering({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Structural coordinate matrix canvas
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

    // Grid coordinates
    const cols = 22;
    const rows = 14;
    let t = 0;

    const render = () => {
      t += 0.018;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW + cellW / 2;
          const y = j * cellH + cellH / 2;
          const dist = Math.sin(t + i * 0.28 + j * 0.22);
          const alpha = Math.max(0.03, 0.14 + dist * 0.09);

          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
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

  const getCivilCourses = () => {
    return getStoredCourses().filter(c =>
      !c.isDiscipline && (
        (c.department && c.department.toLowerCase().includes('civil')) ||
        (c.category && c.category.toLowerCase().includes('civil')) ||
        c.link === '/civil-engineering'
      )
    );
  };

  const [coursesList, setCoursesList] = useState(getCivilCourses);

  useEffect(() => {
    const unsub = subscribeToContentUpdates(() => {
      setCoursesList(getCivilCourses());
    });
    return () => unsub();
  }, []);

  const faqs = [
    {
      q: 'Who is this Civil Engineering & BIM track designed for?',
      a: 'This track is tailored for Civil, Structural, Architecture, and Construction engineering students, fresh graduates, and site engineers looking to master digital drafting, 3D BIM, structural analysis, and quantity estimation.'
    },
    {
      q: 'What certifications are awarded upon completion?',
      a: 'Graduates receive authorized certifications for AutoCAD Civil 2D/3D, Revit BIM Architecture & Structure, STAAD.Pro Structural Design, and 3ds Max Architectural Visualization.'
    },
    {
      q: 'How does 100% placement support work for civil engineering firms?',
      a: 'Our placement team coordinates directly with over 150+ infrastructure conglomerates, structural design consultancies, and BIM modeling firms. We provide technical interview preparation, drawing portfolio creation, and direct placement drives.'
    },
    {
      q: 'Are courses available in offline classroom and online modes?',
      a: 'Yes! We conduct hands-on studio workstation training at our center with real project drawing sets, as well as live online interactive batches with 24/7 digital lab access.'
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0d1e', color: '#fff', overflow: 'hidden' }}>
      {/* Background Matrix Canvas & Nebula Glow */}
      <canvas className="da-canvas" ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div className="da-nebula" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="da-stars" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}></div>

      {/* Hero Header */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '100px 24px 36px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: '#c084fc', marginBottom: '22px', boxShadow: '0 0 16px rgba(139, 92, 246, 0.2)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 8px #22d3ee' }}></span>
          GV DESIGNTECH · CIVIL ENGINEERING &amp; BIM
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 20px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master Civil Engineering, BIM<br />&amp; Structural Design
        </h1>

        <p style={{ maxWidth: '780px', margin: '0 auto 34px', fontSize: '17px', lineHeight: 1.6, color: '#94a3b8' }}>
          Industry-aligned curriculum covering AutoCAD Civil, Revit BIM, STAAD.Pro, Quantity Surveying, 3ds Max Architectural Visualization, and Structural FEA. Build real-world portfolio drawing sets and secure premier engineering placements.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 36px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)', transition: 'all 0.25s ease' }}
          >
            Apply for Next Batch
          </button>
          <a
            href="#civil-courses"
            style={{ padding: '14px 32px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '12px', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: '600', backdropFilter: 'blur(10px)' }}
          >
            Explore Courses ↓
          </a>
        </div>
      </div>

      {/* =========================================================================
          Civil Courses & Software Programs (Cohesive Cosmic Dark Theme)
          ========================================================================= */}
      <div className="mech-page-container" id="civil-courses">

        {/* Section 1: Civil Courses (Image 1) */}
        <section className="mech-courses-section">
          <div className="mech-courses-header">
            <span className="mech-eyebrow">
              <span className="mech-eyebrow-dot"></span>
              WHAT WE TEACH
            </span>
            <h2 className="mech-title">
              CIVIL &amp; STRUCTURAL <span className="highlight-red">COURSES</span>
            </h2>
            <p className="mech-subtitle">
              Hands-on, industry-aligned programs designed to make you job-ready from day one. Click any card to explore the curriculum.
            </p>
          </div>

          <div className="mech-grid">
            {coursesList.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px dashed rgba(139, 92, 246, 0.3)',
                borderRadius: '16px'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>🏛️</div>
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
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(217, 70, 239, 0.35)'
                  }}
                >
                  Inquire for Upcoming Batches →
                </button>
              </div>
            ) : (
              coursesList.map((c) => (
                <div key={c.id || c._id} className="mech-card" onClick={() => onOpenModal && onOpenModal(c.title || c.department)}>
                  <div className="mech-card-media">
                    <span className="mech-badge-popular">{c.badge || 'POPULAR'}</span>
                    <img className="mech-card-img" alt={c.title} src={c.image || c.img || '/assets/civil-structural-design.jpg'} />
                    <span className="civil-scale-badge">{c.scale || c.tag || '1:100'}</span>
                  </div>
                  <div className="mech-card-body">
                    <div className="mech-meta-row">
                      <span className="mech-duration">⏱ {c.duration || 'Flexible'}</span>
                      <span className="mech-level">{c.level || 'All Levels'}</span>
                    </div>
                    <h3 className="mech-card-heading">{c.title}</h3>
                    <p className="mech-card-desc">{c.desc}</p>
                    <button
                      type="button"
                      className="mech-btn-learn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenModal) onOpenModal(c.title || c.department);
                      }}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>

      {/* Main Container Continued: 6-Month Roadmap & FAQs */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '10px 24px 60px' }}>
        
        {/* 6-Month Career Roadmap */}
        <section style={{ marginBottom: '50px', padding: '40px 32px', background: 'rgba(20, 14, 52, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '36px', color: '#fff' }}>
            Your 6-Month Civil Engineering Roadmap
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ color: '#22d3ee', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 1–2</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>2D Drafting &amp; Estimation</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                Master AutoCAD Civil 2D, municipal approval drawings, BOQ estimation, and topographic site surveys.
              </p>
            </div>
            <div>
              <div style={{ color: '#a78bfa', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 3–4</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>3D BIM Modeling</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                Revit Architecture, Structural BIM, MEP services coordination, families creation, and Navisworks clash detection.
              </p>
            </div>
            <div>
              <div style={{ color: '#e879f9', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 5</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Structural Analysis &amp; FEA</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                STAAD.Pro &amp; ETABS concrete/steel framing, dead/live/wind loads, seismic analysis, and ANSYS structural simulation.
              </p>
            </div>
            <div>
              <div style={{ color: '#34d399', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 6</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Visualization &amp; Placement</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                Photorealistic walkthroughs with 3ds Max &amp; SketchUp, comprehensive drawing portfolio, and corporate interview drives.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section style={{ maxWidth: '820px', margin: '0 auto 70px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '32px', color: '#fff' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
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
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#c084fc', transform: activeFaq === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>
                    +
                  </span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 24px 20px', color: '#94a3b8', fontSize: '14.5px', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div style={{ textAlign: 'center', padding: '52px 32px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.22), rgba(217, 70, 239, 0.22))', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '24px', backdropFilter: 'blur(10px)', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '12px', color: '#fff' }}>
            Your Civil Engineering &amp; BIM Career Starts Today
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '26px', fontSize: '16px', maxWidth: '640px', margin: '0 auto 26px' }}>
            Limited seats per batch to guarantee hands-on live project training with certified industry BIM experts.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)', transition: 'all 0.25s ease' }}
          >
            Enroll in Civil &amp; BIM Track
          </button>
        </div>

      </div>
    </div>
  );
}
