import React, { useState, useEffect, useRef } from 'react';

export default function EeeInstrumentation({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Electrical circuit node & pulse canvas
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
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.2
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

        ctx.fillStyle = `rgba(251, 191, 36, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.strokeStyle = `rgba(234, 179, 8, ${0.16 * (1 - dist / 115)})`;
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

  const eeeCourses = [
    {
      badge: 'ESSENTIAL',
      badgeColor: '#10b981',
      tag: 'CAD',
      duration: '2 Months',
      level: 'ALL LEVELS',
      title: 'AutoCAD Electrical',
      desc: 'Electrical schematic drafting, wiring diagrams, circuit design, component tagging, PLC I/O module drawings, and automated terminal strip generation.',
      img: '/assets/eee-sw-autocad-elec.jpg'
    },
    {
      badge: 'IN DEMAND',
      badgeColor: '#f97316',
      tag: 'CAE',
      duration: '2.5 Months',
      level: 'INTERMEDIATE',
      title: 'EPLAN Electric P8',
      desc: 'Standardized electrical CAE project engineering, macro management, cross-referencing, multi-line schematics, 3D panel layout, and BOM reporting.',
      img: '/assets/eee-sw-etap.jpg'
    },
    {
      badge: 'MOST POPULAR',
      badgeColor: '#ef4444',
      tag: 'PLC',
      duration: '3 Months',
      level: 'BEGINNER → ADVANCED',
      title: 'PLC Programming',
      desc: 'Ladder Logic (LD), Functional Block Diagrams (FBD), timers, counters, analog scaling on Siemens S7-1200, Allen-Bradley, and Delta PLCs.',
      img: '/assets/eee-course-plc.jpg'
    },
    {
      badge: 'HIGH VALUE',
      badgeColor: '#eab308',
      tag: 'SCADA',
      duration: '2 Months',
      level: 'INTERMEDIATE',
      title: 'SCADA Systems',
      desc: 'Industrial supervisory control and data acquisition, Wonderware InTouch, Siemens WinCC, real-time tag communication, alarm logging, and trend graphics.',
      img: '/assets/eee-course-scada.jpg'
    },
    {
      badge: 'SPECIALISED',
      badgeColor: '#06b6d4',
      tag: 'HMI',
      duration: '1.5 Months',
      level: 'ALL LEVELS',
      title: 'HMI Programming',
      desc: 'Interactive human-machine interface screen design, touch panel configuration, PLC tag linking, alarm banners, security levels, and recipe management.',
      img: '/assets/eee-course-power.jpg'
    },
    {
      badge: 'PRACTICAL',
      badgeColor: '#3b82f6',
      tag: 'PANEL',
      duration: '2 Months',
      level: 'INTERMEDIATE',
      title: 'Electrical Panel Design',
      desc: 'Control panel layout engineering, switchgear selection, busbar sizing, thermal calculations, GA drawings, wiring dress-up, and cable schedules.',
      img: '/assets/eee-course-panel.jpg'
    },
    {
      badge: 'CAREER TRACK',
      badgeColor: '#ec4899',
      tag: 'AUTOMATION',
      duration: '4 Months',
      level: 'ADVANCED',
      title: 'Industrial Automation',
      desc: 'Complete industrial automation integrating variable frequency drives (VFDs), servo drives, industrial sensors, Modbus/Profibus, and DCS networks.',
      img: '/assets/eee-course-embedded.jpg'
    },
    {
      badge: 'COMPREHENSIVE',
      badgeColor: '#8b5cf6',
      tag: 'INSTRUMENT',
      duration: '3 Months',
      level: 'INTERMEDIATE → ADVANCED',
      title: 'Instrumentation Engineering',
      desc: 'Process control instrumentation, P&ID diagram analysis, pressure/flow/level/temp transmitters, control valve sizing, calibration, and loop checking.',
      img: '/assets/eee-course-instrumentation.jpg'
    }
  ];

  const faqs = [
    {
      q: 'Do I need prior electrical engineering experience for PLC & SCADA?',
      a: 'A basic understanding of electrical circuits and relays is helpful, but our curriculum starts from foundational relay logic, contactor controls, and electrical symbols before advancing to PLC ladder logic and SCADA graphics.'
    },
    {
      q: 'Will I work on physical PLC hardware or software simulators?',
      a: 'Both! You will train on industry-standard simulators (Siemens TIA Portal, LogixPro, Factory I/O 3D) and gain hands-on wiring, downloading, and troubleshooting experience on physical PLC test benches in our lab.'
    },
    {
      q: 'What jobs can I target after completing the EEE & Automation track?',
      a: 'Graduates pursue high-growth roles including Automation Engineer, PLC Programmer, Electrical Design Engineer, Instrumentation Engineer, SCADA Specialist, and Panel Design Engineer in manufacturing, process plants, and power sectors.'
    },
    {
      q: 'Are the certifications recognized by core electrical industries?',
      a: 'Yes, GV DesignTech certificates verify hands-on competency in AutoCAD Electrical, PLC/SCADA programming, and panel design with a unique online ID for recruiter verification.'
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.35)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span>⚡</span>
            <span>ELECTRICAL, INSTRUMENTATION &amp; AUTOMATION</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 24px', background: 'linear-gradient(135deg, #ffffff 30%, #fbbf24 70%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Master EEE, PLC SCADA &amp; Industrial Automation
          </h1>

          <p style={{ maxWidth: '820px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.65, color: '#94a3b8' }}>
            Hands-on training in AutoCAD Electrical, EPLAN Electric P8, PLC &amp; SCADA Programming, HMI Development, Electrical Panel Design, and Process Instrumentation for modern manufacturing industries.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(245, 158, 11, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Enroll in EEE &amp; Automation
            </button>
            <a
              href="#eee-courses"
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
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
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fbbf24' }}>8 Programs</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Schematic to SCADA Tracks</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#38bdf8' }}>PLC / SCADA</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Siemens, AB, Delta Benches</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#4ade80' }}>100%</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Real Wiring &amp; Panel Labs</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ec4899' }}>EPLAN &amp; CAD</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Global Drawing Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* EEE COURSES SECTION */}
      <section id="eee-courses" style={{ position: 'relative', zIndex: 1, padding: '70px 24px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', color: '#fbbf24', textTransform: 'uppercase', marginBottom: '8px' }}>
            — WHAT WE TEACH —
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', color: '#fff', margin: '0 0 12px' }}>
            EEE &amp; INSTRUMENTATION <span style={{ color: '#fbbf24' }}>COURSES</span>
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '15px', color: '#94a3b8', lineHeight: 1.6 }}>
            Industry-aligned electrical engineering and automation programs designed for real-world plant and process readiness.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {eeeCourses.map((c, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15, 11, 33, 0.85)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
                <img
                  src={c.img}
                  alt={c.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: c.badgeColor,
                    color: '#fff',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    letterSpacing: '0.8px',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  {c.badge}
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
                  {c.tag}
                </span>
              </div>

              <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '12px' }}>
                  <span style={{ color: '#94a3b8' }}>{c.duration}</span>
                  <span style={{ color: '#fbbf24', fontWeight: '700', letterSpacing: '0.5px' }}>{c.level}</span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '0 0 10px', lineHeight: 1.35 }}>
                  {c.title}
                </h3>

                <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 22px', flex: 1 }}>
                  {c.desc}
                </p>

                <button
                  type="button"
                  onClick={onOpenModal}
                  style={{
                    width: '100%',
                    padding: '11px 0',
                    background: '#d97706',
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
          ))}
        </div>
      </section>

      {/* FAQS SECTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '70px 24px 90px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', margin: '0 0 10px' }}>
            Frequently Asked <span style={{ color: '#fbbf24' }}>Questions</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8' }}>
            Everything you need to know about our EEE, Automation, and Instrumentation training paths.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 11, 33, 0.8)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
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
                <span style={{ fontSize: '20px', color: '#fbbf24' }}>{activeFaq === idx ? '−' : '+'}</span>
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
            Become an Industry-Ready <span style={{ color: '#fbbf24' }}>Automation Engineer</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Join GV DesignTech's hands-on PLC, SCADA, and Electrical Design training today. Gain real hardware wiring experience and secure your role in top manufacturing companies.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              padding: '16px 42px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.4)'
            }}
          >
            Apply for EEE Training
          </button>
        </div>
      </section>
    </div>
  );
}