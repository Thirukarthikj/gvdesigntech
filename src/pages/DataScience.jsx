import React, { useState, useEffect, useRef } from 'react';

export default function DataScience({ onOpenModal }) {
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

  const softwarePrograms = [
    {
      id: 'autocad',
      title: 'AUTOCAD',
      subtitle: '2D Drafting & 3D Modeling',
      category: 'CAD',
      letter: 'A',
      image: '/assets/sw-autocad.jpg'
    },
    {
      id: 'solidworks',
      title: 'SOLIDWORKS',
      subtitle: 'Parametric 3D Design',
      category: 'CAD/CAE',
      letter: 'S',
      image: '/assets/sw-solidworks.jpg'
    },
    {
      id: 'catia',
      title: 'CATIA',
      subtitle: 'Advanced Surface Modeling',
      category: 'CAD',
      letter: 'C',
      image: '/assets/sw-catia.jpg'
    },
    {
      id: 'ansys',
      title: 'ANSYS',
      subtitle: 'FEA & Simulation',
      category: 'CAE',
      letter: 'A',
      image: '/assets/sw-ansys.jpg'
    },
    {
      id: 'creo',
      title: 'CREO',
      subtitle: 'Product Design & PLM',
      category: 'CAD',
      letter: 'C',
      image: '/assets/sw-creo.jpg'
    },
    {
      id: 'nxcad',
      title: 'NX CAD',
      subtitle: 'Industrial Design & Mfg',
      category: 'CAD/CAM',
      letter: 'N',
      image: '/assets/sw-nxcad.jpg'
    },
    {
      id: 'hypermesh',
      title: 'HYPERMESH',
      subtitle: 'Pre/Post Processing',
      category: 'CAE',
      letter: 'H',
      image: '/assets/sw-hypermesh.jpg'
    },
    {
      id: 'mastercam',
      title: 'MASTERCAM',
      subtitle: 'CNC Programming & CAM',
      category: 'CAM',
      letter: 'M',
      image: '/assets/sw-mastercam.jpg'
    }
  ];

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
      <canvas className="ds3-brain-canvas" ref={canvasRef} />
      <div className="ds3-nebula"></div>
      <div className="stars"></div>

      {/* Engineering Telemetry HUD Panels */}
      <div className="ds3-hud-panel ds3-hud-tl">
        ▸ CAD TOLERANCE HUD<br />
        <span style={{ color: '#22d3ee' }}>Precision: ±0.005 mm</span> · ISO 2768<br />
        Surface Finish: Ra 0.8 µm
      </div>
      <div className="ds3-hud-panel ds3-hud-tr">
        FEA SIMULATION HUD ◂<br />
        Von Mises: 240 MPa · Safety: 2.1<br />
        <span style={{ color: '#a78bfa' }}>Mesh: Tetrahedral 2.4M Elements</span>
      </div>
      <div className="ds3-hud-panel ds3-hud-br">
        CNC TOOLPATH HUD ◂<br />
        Feed: 1,800 mm/min · Spindle: 8,500 RPM<br />
        <span style={{ color: '#34d399' }}>5-Axis CAM · 34% Cycle Reduction</span>
      </div>

      <div className="ds3-floating-widgets">
        <div className="ds3-widget-pill">
          <span className="ds3-w-lbl">MODEL PRECISION</span>
          <span className="ds3-w-val" style={{ color: '#22d3ee' }}>99.8%</span>
        </div>
        <div className="ds3-widget-pill">
          <span className="ds3-w-lbl">GD&amp;T COMPLIANCE</span>
          <span className="ds3-w-val" style={{ color: '#f472b6' }}>ASME Y14.5</span>
        </div>
        <div className="ds3-widget-pill">
          <span className="ds3-w-lbl">FEA BENCHMARK</span>
          <span className="ds3-w-val" style={{ color: '#a78bfa' }}>99.2%</span>
        </div>
      </div>

      {/* Hero Header */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '120px 24px 60px', textAlign: 'center' }}>
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
            {mechanicalCourses.map((c) => (
              <div key={c.id} className="mech-card" onClick={onOpenModal}>
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

        {/* Section 2: Software Training Programs (Image 2) */}
        <section className="sw-programs-section" id="software-programs">
          <div className="sw-programs-header">
            <span className="mech-eyebrow">
              <span className="mech-eyebrow-dot"></span>
              TOOLS &amp; PLATFORMS
            </span>
            <h2 className="mech-title">
              SOFTWARE <span className="highlight-red">TRAINING PROGRAMS</span>
            </h2>
            <p className="mech-subtitle">
              Industry standard mechanical design tools used by top engineering companies worldwide.
            </p>
          </div>

          <div className="sw-grid">
            {softwarePrograms.map((s) => (
              <div key={s.id} className="sw-card" onClick={onOpenModal}>
                <div className="sw-card-media">
                  <span className="sw-badge-category">{s.category}</span>
                  <img className="sw-card-img" alt={s.title} src={s.image} />
                  <div className="sw-avatar">{s.letter}</div>
                </div>
                <div className="sw-card-body">
                  <h4 className="sw-card-title">{s.title}</h4>
                  <p className="sw-card-subtitle">{s.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Main Container Continued: 6-Month Roadmap & FAQs */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '80px 24px' }}>
        
        {/* 6-Month Career Roadmap */}
        <section style={{ marginBottom: '80px', padding: '44px 36px', background: 'rgba(20, 14, 52, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
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
