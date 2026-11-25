import React, { useState, useEffect, useRef } from 'react';
import { getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function Mechanical({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Digital technical grid & connection canvas
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

    // Floating particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
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

  const mechanicalCourses = [
    {
      id: 'cad',
      title: 'CAD – COMPUTER AIDED DESIGN',
      duration: '3 Months',
      level: 'BEGINNER → ADVANCED',
      badge: 'MOST POPULAR',
      category: 'CAD',
      desc: 'Learn 2D Drafting, 3D Modeling, GD&T and Production Drawings using industry-standard tools.',
      image: '/assets/mech-cad.jpg'
    },
    {
      id: 'cam',
      title: 'CAM – COMPUTER AIDED MANUFACTURING',
      duration: '2 Months',
      level: 'INTERMEDIATE',
      badge: 'IN DEMAND',
      category: 'CAM',
      desc: 'Learn CNC Programming, Tool Paths and Manufacturing Process Design for real production environments.',
      image: '/assets/mech-cam.jpg'
    },
    {
      id: 'cae',
      title: 'CAE – COMPUTER AIDED ENGINEERING',
      duration: '3 Months',
      level: 'ADVANCED',
      badge: 'HIGH VALUE',
      category: 'CAE',
      desc: 'Learn Structural Analysis, Thermal Analysis and Simulation Techniques used in aerospace and automotive.',
      image: '/assets/mech-cae.jpg'
    },
    {
      id: 'prod-design',
      title: 'PRODUCT DESIGN',
      duration: '4 Months',
      level: 'INTERMEDIATE',
      badge: 'COMPREHENSIVE',
      category: 'DESIGN',
      desc: 'Complete Product Development Workflow from concept sketching to manufacturing-ready 3D models.',
      image: '/assets/mech-prod-design.jpg'
    },
    {
      id: 'gdt',
      title: 'GD&T – GEOMETRIC DIMENSIONING',
      duration: '1 Month',
      level: 'ALL LEVELS',
      badge: 'FAST TRACK',
      category: 'GD&T',
      desc: 'Industry standard dimensioning and tolerancing for precision manufacturing and quality control.',
      image: '/assets/mech-gdt.jpg'
    },
    {
      id: 'rev-eng',
      title: 'REVERSE ENGINEERING',
      duration: '2 Months',
      level: 'ADVANCED',
      badge: 'SPECIALISED',
      category: 'RE',
      desc: '3D scanning and product reconstruction for legacy part documentation and design improvement.',
      image: '/assets/mech-rev-eng.jpg'
    }
  ];

  const [coursesList, setCoursesList] = useState(() => {
    const stored = getStoredCourses().filter(c =>
      (c.department && c.department.toLowerCase().includes('mechanical')) ||
      (c.category && c.category.toLowerCase().includes('mechanical'))
    );
    const custom = stored.filter(s => !mechanicalCourses.some(m => m.id === s.id || m.title === s.title));
    return [...mechanicalCourses, ...custom];
  });

  useEffect(() => {
    const unsub = subscribeToContentUpdates(() => {
      const stored = getStoredCourses().filter(c =>
        (c.department && c.department.toLowerCase().includes('mechanical')) ||
        (c.category && c.category.toLowerCase().includes('mechanical'))
      );
      const custom = stored.filter(s => !mechanicalCourses.some(m => m.id === s.id || m.title === s.title));
      setCoursesList([...mechanicalCourses, ...custom]);
    });
    return () => unsub();
  }, []);

  const faqs = [
    {
      q: 'Who is this Mechanical & Automobile Engineering program for?',
      a: 'This track is designed for Mechanical, Automobile, Mechatronics, and Production engineering students, recent graduates, and drafting professionals looking to master industry-grade CAD/CAM/CAE tools and secure high-growth design engineering roles.'
    },
    {
      q: 'What software certifications are included?',
      a: 'Students receive authorized certifications for AutoCAD 2D/3D, SolidWorks Parametric Modeling, CATIA Surface Design, ANSYS Structural Simulation, and MasterCAM CNC Machining upon completing practical project evaluations.'
    },
    {
      q: 'How does 100% placement support work for core mechanical companies?',
      a: 'Our placement team works directly with over 150+ tier-1 manufacturing, automotive OEM, and precision engineering design centers across India. We provide resume preparation, portfolio design books, GD&T test drills, and direct interviews.'
    },
    {
      q: 'Are courses available in offline classroom and online modes?',
      a: 'Yes! We conduct interactive hands-on studio sessions with high-performance CAD workstations at our center, as well as live online batches with 24/7 remote lab access.'
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0d1e', color: '#fff', overflow: 'hidden' }}>
      {/* Visual Canvas & Cosmic Ambient Background */}
      <canvas className="ds3-brain-canvas" ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div className="ds3-nebula" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="stars" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}></div>

      {/* Hero Header */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '100px 24px 36px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: '#c084fc', marginBottom: '22px', boxShadow: '0 0 16px rgba(139, 92, 246, 0.2)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 8px #22d3ee' }}></span>
          GV DESIGNTECH · MECHANICAL &amp; AUTOMOBILE
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 20px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master Mechanical &amp; Automobile<br />Engineering Design
        </h1>

        <p style={{ maxWidth: '780px', margin: '0 auto 34px', fontSize: '17px', lineHeight: 1.6, color: '#94a3b8' }}>
          Industry-aligned curriculum covering 2D Drafting, 3D Parametric Modeling, FEA Simulation, CNC Programming, and Product Design. Build real-world portfolio assemblies and secure premier core engineering placements.
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
            href="#mechanical-courses"
            style={{ padding: '14px 32px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '12px', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: '600', backdropFilter: 'blur(10px)' }}
          >
            Explore Courses ↓
          </a>
        </div>
      </div>

      {/* =========================================================================
          Mechanical Courses & Software Programs (Cohesive Cosmic Dark Theme)
          ========================================================================= */}
      <div className="mech-page-container" id="mechanical-courses">

        {/* Section 1: Mechanical Courses (Image 1) */}
        <section className="mech-courses-section">
          <div className="mech-courses-header">
            <span className="mech-eyebrow">
              <span className="mech-eyebrow-dot"></span>
              WHAT WE TEACH
            </span>
            <h2 className="mech-title">
              MECHANICAL <span className="highlight-red">COURSES</span>
            </h2>
            <p className="mech-subtitle">
              Hands-on, industry-aligned programs designed to make you job-ready from day one. Click any card to explore the curriculum.
            </p>
          </div>

          <div className="mech-grid">
            {coursesList.map((c) => (
              <div key={c.id || c._id} className="mech-card" onClick={onOpenModal}>
                <div className="mech-card-media">
                  <span className="mech-badge-popular">{c.badge}</span>
                  <img className="mech-card-img" alt={c.title} src={c.image} />
                  <span className="mech-badge-category">{c.category}</span>
                </div>
                <div className="mech-card-body">
                  <div className="mech-meta-row">
                    <span className="mech-duration">⏱ {c.duration}</span>
                    <span className="mech-level">{c.level}</span>
                  </div>
                  <h3 className="mech-card-heading">{c.title}</h3>
                  <p className="mech-card-desc">{c.desc}</p>
                  <button
                    type="button"
                    className="mech-btn-learn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal();
                    }}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Main Container Continued: 6-Month Roadmap & FAQs */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '10px 24px 60px' }}>
        
        {/* 6-Month Career Roadmap */}
        <section style={{ marginBottom: '50px', padding: '40px 32px', background: 'rgba(20, 14, 52, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '36px', color: '#fff' }}>
            Your 6-Month Engineering Roadmap
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ color: '#22d3ee', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 1–2</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>2D Drafting &amp; GD&amp;T</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                Master AutoCAD 2D drafting, orthographic projections, isometric views, sectioning, and ASME Y14.5 GD&amp;T symbols.
              </p>
            </div>
            <div>
              <div style={{ color: '#a78bfa', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 3–4</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>3D Parametric CAD</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                SolidWorks &amp; CATIA solid modeling, sheet metal fabrication, complex surfacing, assembly constraints, and kinematics.
              </p>
            </div>
            <div>
              <div style={{ color: '#e879f9', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 5</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>CAE &amp; Finite Element Analysis</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                ANSYS static structural simulation, thermal analysis, mesh convergence, modal analysis, and stress optimization.
              </p>
            </div>
            <div>
              <div style={{ color: '#34d399', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 6</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>CAM, Capstone &amp; Placement</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.55 }}>
                MasterCAM CNC milling/turning toolpaths, full automotive assembly capstone project, portfolio prep, and interviews.
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
            Your Mechanical &amp; Automobile Career Starts Today
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '26px', fontSize: '16px', maxWidth: '640px', margin: '0 auto 26px' }}>
            Limited seats per cohort to guarantee personalized one-on-one CAD software mentorship and physical workshop access.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)', transition: 'all 0.25s ease' }}
          >
            Enroll in Mechanical Track
          </button>
        </div>

      </div>
    </div>
  );
}
