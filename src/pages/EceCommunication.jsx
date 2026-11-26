import React, { useState, useEffect, useRef } from 'react';
import { getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function EceCommunication({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // High-tech semiconductor & signal pulse canvas
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

    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.7,
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

        ctx.fillStyle = `rgba(56, 189, 248, ${n.alpha})`;
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
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.18 * (1 - dist / 120)})`;
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

  const getEceCourses = () => {
    return getStoredCourses().filter(c =>
      !c.isDiscipline && (
        (c.department && c.department.toLowerCase().includes('ece')) ||
        (c.category && c.category.toLowerCase().includes('electronics')) ||
        c.link === '/ece'
      )
    );
  };

  const [coursesList, setCoursesList] = useState(getEceCourses);

  useEffect(() => {
    const unsub = subscribeToContentUpdates(() => {
      setCoursesList(getEceCourses());
    });
    return () => unsub();
  }, []);

  const faqs = [
    {
      q: 'Do I need prior coding knowledge before starting ECE courses?',
      a: 'Basic C programming knowledge is beneficial for Embedded Systems and Microcontroller Programming, but our curriculum starts from foundational syntax, memory models, and electronics principles before writing hardware code.'
    },
    {
      q: 'Will I get physical hardware kits to practice during the course?',
      a: 'Yes! Students receive lab access with Arduino boards, ESP32 IoT kits, microcontrollers, sensor modules, breadboards, and logic analyzers, alongside industry software simulators like Proteus and Keil.'
    },
    {
      q: 'What career opportunities are available after completing ECE & Embedded training?',
      a: 'Graduates enter high-growth careers as Embedded Software Engineers, PCB Design Engineers, IoT Systems Developers, Firmware Engineers, VLSI Verification Engineers, and Hardware Validation Specialists.'
    },
    {
      q: 'Does GV DesignTech offer verifiable certificates and placement assistance?',
      a: 'Yes, each certification comes with a secure QR code and verification ID registered in our portal, backed by dedicated placement assistance, resume reviews, and technical interview preparation.'
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span>📡</span>
            <span>ELECTRONICS &amp; COMMUNICATION ENGINEERING</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 24px', background: 'linear-gradient(135deg, #ffffff 30%, #38bdf8 70%, #0284c7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Master Embedded Systems, PCB Design &amp; VLSI
          </h1>

          <p style={{ maxWidth: '820px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.65, color: '#94a3b8' }}>
            Hands-on training in PCB Design, Embedded Firmware, MATLAB Simulation, VLSI Architectures, IoT Cloud Integration, Microcontroller Programming, and Arduino Prototyping.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('ECE Embedded & IoT')}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(2, 132, 199, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Enroll in ECE Programs
            </button>
            <a
              href="#ece-courses"
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
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
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#38bdf8', fontSize: '28px', fontWeight: '800' }}>7+</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Specialized Tracks</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>PCB, Embedded, IoT &amp; VLSI</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#38bdf8', fontSize: '28px', fontWeight: '800' }}>100%</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Hardware Kits &amp; Sim</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Physical Labs &amp; Proteus/Keil</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#38bdf8', fontSize: '28px', fontWeight: '800' }}>15+</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Live Capstone Projects</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Edge IoT, CAN Bus &amp; Sensors</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#38bdf8', fontSize: '28px', fontWeight: '800' }}>ISO &amp; IPC</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Industry Compliance</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>IPC-2221 PCB &amp; MISRA C</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE COURSES GRID */}
      <section id="ece-courses" style={{ position: 'relative', zIndex: 1, padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ color: '#38bdf8', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — WHAT WE TEACH —
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            ECE <span style={{ color: '#38bdf8' }}>COURSES</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '12px auto 0' }}>
            Industry-aligned electronics, embedded systems, and communication tracks designed to make you engineering job-ready.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '28px' }}>
          {coursesList.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed rgba(56, 189, 248, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>📡</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>
                No Courses Published Yet
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                New training programs and modules added by the administrator in the Admin Portal will appear here live.
              </p>
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('ECE Embedded & IoT')}
                style={{
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)'
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
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(2, 132, 199, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Card Image with badges */}
                <div style={{ position: 'relative', width: '100%', height: '210px', background: '#0b1120', overflow: 'hidden' }}>
                  <img
                    src={c.img || c.image || '/assets/eee-sw-proteus.jpg'}
                    alt={c.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/assets/eee-sw-proteus.jpg';
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
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1px'
                    }}
                  >
                    {c.tag || c.category || 'ECE'}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>
                    <span>⏱ {c.duration || 'Flexible'}</span>
                    <span style={{ color: '#38bdf8', fontWeight: '700' }}>{c.level || 'All Levels'}</span>
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
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '10px',
                      color: '#38bdf8',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0284c7';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#0284c7';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                      e.currentTarget.style.color = '#38bdf8';
                      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
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

      {/* WHY CHOOSE GV ECE ACADEMY */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 12px' }}>
            Why Master Electronics &amp; Embedded Systems at GV DesignTech?
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Bridging semiconductor theory with practical hardware, debugging, and industrial firmware engineering.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>🔬</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 10px', color: '#f8fafc' }}>Physical Lab Workbenches</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              Hands-on oscilloscopes, logic analyzers, soldering stations, multimeters, and high-precision SMD prototyping equipment.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>⚙️</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 10px', color: '#f8fafc' }}>Industry Protocols</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              Deep dive into automotive and industrial communication standards including CAN Bus, RS-485, Modbus, I2C, and SPI.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>🚀</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 10px', color: '#f8fafc' }}>100% Placement Support</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              Dedicated recruitment drives connecting skilled students directly to tier-1 automotive, electronics, and semiconductor firms.
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
            Everything you need to know about our ECE &amp; Embedded training programs.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
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
                <span style={{ color: '#38bdf8', fontSize: '20px', transition: 'transform 0.2s', transform: activeFaq === idx ? 'rotate(45deg)' : 'none' }}>
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
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25), rgba(15, 23, 42, 0.9))',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '24px',
            padding: '60px 32px',
            boxShadow: '0 24px 60px rgba(2, 132, 199, 0.2)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: '800', margin: '0 0 16px', color: '#f8fafc' }}>
            Ready to Build Next-Generation Hardware &amp; Embedded Systems?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '640px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Enroll today for hands-on mentorship, hardware prototyping kits, and direct placement opportunities in top tech and core automotive industries.
          </p>
          <button
            type="button"
            onClick={() => onOpenModal && onOpenModal('ECE Embedded & IoT')}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #0284c7, #0369a1)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(2, 132, 199, 0.4)',
              transition: 'transform 0.2s'
            }}
          >
            Apply for ECE Programs →
          </button>
        </div>
      </section>
    </div>
  );
}
