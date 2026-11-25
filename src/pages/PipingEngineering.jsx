import React, { useState, useEffect, useRef } from 'react';
import { getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function PipingEngineering({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Industrial piping network canvas
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

    const nodes = Array.from({ length: 34 }, () => ({
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

        ctx.fillStyle = `rgba(20, 184, 166, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 125) {
            ctx.strokeStyle = `rgba(13, 148, 136, ${0.2 * (1 - dist / 125)})`;
            ctx.lineWidth = 0.8;
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

  const getPipingCourses = () => {
    return getStoredCourses().filter(c =>
      !c.isDiscipline && (
        (c.department && c.department.toLowerCase().includes('piping')) ||
        (c.category && c.category.toLowerCase().includes('piping')) ||
        c.link === '/piping-engineering'
      )
    );
  };

  const [coursesList, setCoursesList] = useState(getPipingCourses);

  useEffect(() => {
    const unsub = subscribeToContentUpdates(() => {
      setCoursesList(getPipingCourses());
    });
    return () => unsub();
  }, []);

  const faqs = [
    {
      q: 'Who is eligible to join the Piping Engineering (Oil & Gas) program?',
      a: 'Mechanical, Chemical, Civil, and Petroleum engineering students and working professionals looking to build high-demand careers in oil & gas, petrochemical, refinery, power plant, and EPC consulting firms.'
    },
    {
      q: 'Which international design codes and standards are covered?',
      a: 'Our curriculum strictly follows ASME B31.3 (Process Piping), ASME B31.1 (Power Piping), ASME B16.5 (Pipe Flanges), API standards, and ASTM material designations used by major global EPC contractors.'
    },
    {
      q: 'What is the difference between Piping Drafting and Pipe Stress Analysis?',
      a: 'Piping Drafting focuses on 2D/3D modeling of layouts, P&IDs, and isometric drawings using Plant 3D, SP3D, or E3D. Pipe Stress Analysis uses CAESAR II to evaluate thermal stresses, seismic loads, and nozzle loads against code allowable stresses.'
    },
    {
      q: 'Do you provide EPC project drawings and placement support?',
      a: 'Yes, each student works directly on real-world industrial refinery plot plans, P&IDs, 3D plant models, and CAESAR II stress reports, backed by interview preparation and resume marketing to leading EPC firms.'
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.35)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', color: '#14b8a6', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span>🛢️</span>
            <span>OIL &amp; GAS, REFINERY &amp; EPC ENGINEERING</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 24px', background: 'linear-gradient(135deg, #ffffff 30%, #14b8a6 70%, #0d9488 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Master Piping Design, SP3D, E3D &amp; CAESAR II
          </h1>

          <p style={{ maxWidth: '820px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.65, color: '#94a3b8' }}>
            Comprehensive hands-on training in AutoCAD Plant 3D, AVEVA E3D, SP3D, PDMS, Pipe Stress Analysis (CAESAR II), Isometric Drafting, and ASME Piping Material Specifications.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(13, 148, 136, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Enroll in Piping Engineering
            </button>
            <a
              href="#piping-courses"
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(20, 184, 166, 0.3)',
                borderRadius: '12px',
                color: '#f8fafc',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              Explore Courses ↓
            </a>
          </div>

          {/* Metric Telemetry Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '980px', margin: '60px auto 0', textAlign: 'left' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(20, 184, 166, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#14b8a6', fontSize: '28px', fontWeight: '800' }}>8</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Dedicated Modules</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Plant 3D, E3D, SP3D &amp; CAESAR II</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(20, 184, 166, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#14b8a6', fontSize: '28px', fontWeight: '800' }}>ASME</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>B31.3 &amp; B31.1 Codes</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>International Process Standards</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(20, 184, 166, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#14b8a6', fontSize: '28px', fontWeight: '800' }}>100%</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Real EPC Plant Projects</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>P&amp;ID to Isometric Spools</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(20, 184, 166, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#14b8a6', fontSize: '28px', fontWeight: '800' }}>Gulf &amp; Global</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>EPC Placement Reach</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Refineries, Offshore &amp; Power</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE COURSES GRID */}
      <section id="piping-courses" style={{ position: 'relative', zIndex: 1, padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ color: '#14b8a6', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — WHAT WE TEACH —
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            PIPING <span style={{ color: '#14b8a6' }}>ENGINEERING COURSES</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '12px auto 0' }}>
            Hands-on plant design and piping engineering curricula designed to make you EPC job-ready.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '28px' }}>
          {coursesList.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed rgba(20, 184, 166, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>🛢️</div>
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
                  background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(13, 148, 136, 0.35)'
                }}
              >
                Inquire for Upcoming Batches →
              </button>
            </div>
          ) : (
            coursesList.map((c, idx) => (
              <div
                key={c.id || c._id || idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.6)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(13, 148, 136, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Card Image with badges */}
                <div style={{ position: 'relative', width: '100%', height: '210px', background: '#0b1120', overflow: 'hidden' }}>
                  <img
                    src={c.img || c.image || '/assets/cad-card-mechanical.jpg'}
                    alt={c.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/assets/cad-card-mechanical.jpg';
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: c.badgeColor || '#0ea5e9',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '800',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {c.badge || 'POPULAR'}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      right: '14px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      color: '#14b8a6',
                      border: '1px solid rgba(20, 184, 166, 0.4)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1px'
                    }}
                  >
                    {c.tag || c.category || 'Piping'}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>
                    <span>⏱ {c.duration || 'Flexible'}</span>
                    <span style={{ color: '#14b8a6', fontWeight: '700' }}>{c.level || 'All Levels'}</span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#f8fafc', margin: '0 0 12px', lineHeight: 1.3 }}>
                    {c.title}
                  </h3>

                  <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: '0 0 24px', flex: 1 }}>
                    {c.desc}
                  </p>

                  <button
                    type="button"
                    onClick={() => onOpenModal && onOpenModal(c.title || c.department)}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      background: 'rgba(20, 184, 166, 0.1)',
                      border: '1px solid rgba(20, 184, 166, 0.4)',
                      borderRadius: '10px',
                      color: '#14b8a6',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0d9488';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#0d9488';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(20, 184, 166, 0.1)';
                      e.currentTarget.style.color = '#14b8a6';
                      e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.4)';
                    }}
                  >
                    Learn More &amp; Enroll →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* WHY CHOOSE GV PIPING ACADEMY */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 12px' }}>
            Why Master Piping Engineering at GV DesignTech?
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Learn real plant design procedures used by major engineering, procurement, and construction contractors.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>🏭</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 10px', color: '#f8fafc' }}>Real EPC Plant Deliverables</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              Draft and engineer complete equipment layouts, piping arrangements, P&amp;IDs, valve schedules, and isometrics for refinery units.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>📐</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 10px', color: '#f8fafc' }}>Stress &amp; Flexibility Rigor</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              Run comprehensive thermal expansion simulations, pipe support optimization, nozzle check compliance, and seismic evaluations in CAESAR II.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>🌍</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 10px', color: '#f8fafc' }}>International Career Opportunities</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              Piping engineers command premium roles across Middle East Oil &amp; Gas, Singapore Petrochemicals, European Energy, and Indian EPC consultants.
            </p>
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
            Frequently asked questions about Piping Engineering &amp; EPC training programs.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(20, 184, 166, 0.2)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 22px',
                  background: 'none',
                  border: 'none',
                  color: '#f8fafc',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#14b8a6', fontSize: '20px', transition: 'transform 0.2s', transform: activeFaq === idx ? 'rotate(45deg)' : 'none' }}>
                  +
                </span>
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

      {/* BOTTOM CTA */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px 120px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.25), rgba(15, 23, 42, 0.9))',
            border: '1px solid rgba(20, 184, 166, 0.4)',
            borderRadius: '24px',
            padding: '60px 32px',
            boxShadow: '0 24px 60px rgba(13, 148, 136, 0.2)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: '800', margin: '0 0 16px', color: '#f8fafc' }}>
            Ready to Build a High-Growth Career in Piping &amp; EPC Design?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '640px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Enroll today for hands-on project training in SP3D, AVEVA E3D, and CAESAR II with certified expert mentors and direct placement support.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #0d9488, #0f766e)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(13, 148, 136, 0.4)',
              transition: 'transform 0.2s'
            }}
          >
            Apply for Piping Engineering →
          </button>
        </div>
      </section>
    </div>
  );
}
