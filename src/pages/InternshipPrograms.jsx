import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function InternshipPrograms({ onOpenModal }) {
  const canvasRef = useRef(null);

  // Dynamic cosmic node canvas
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

    const nodes = Array.from({ length: 35 }, () => ({
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

  const programs = [
    {
      id: 'ai',
      badge: 'POPULAR & TRENDING',
      badgeColor: '#ec4899',
      number: '01',
      title: 'AI Internship',
      subtitle: 'Artificial Intelligence Internship',
      desc: 'Explore the world of Artificial Intelligence and learn how intelligent systems are developed and implemented.',
      modules: [
        'Introduction to Artificial Intelligence',
        'Generative AI and AI Tools',
        'Prompt Engineering',
        'AI Application Development',
        'Real-Time AI Projects',
        'Practical Implementation'
      ],
      outcome: 'Gain hands-on experience in AI technologies and develop intelligent applications.',
      link: '/internship/aiInternship',
      accent: '#c084fc',
      tag: 'AI / LLM'
    },
    {
      id: 'summer',
      badge: 'SEASONAL ACCELERATOR',
      badgeColor: '#f59e0b',
      number: '02',
      title: 'Summer Internship',
      subtitle: 'Summer Internship Program',
      desc: 'Make your summer productive by gaining practical industry experience and developing in-demand technical skills.',
      modules: [
        'Industry-Oriented Training',
        'Hands-On Coding Sessions',
        'Practical Assignments',
        'Real-Time Mini Projects',
        'Technical Mentorship',
        'Project Development Experience'
      ],
      outcome: 'Strengthen your technical knowledge and build projects for your portfolio.',
      link: '/internship/summerinternship',
      accent: '#f97316',
      tag: 'FAST-TRACK'
    },
    {
      id: 'college',
      badge: 'ACADEMIC ACCREDITED',
      badgeColor: '#0ea5e9',
      number: '03',
      title: 'College Internship',
      subtitle: 'College Internship Program',
      desc: 'Bridge the gap between academic learning and industry requirements through practical training and project-based learning.',
      modules: [
        'Technical Skill Development',
        'Mini & Final-Year Projects',
        'Full Stack Development',
        'Programming Fundamentals',
        'Team-Based Projects',
        'Project Documentation and Guidance'
      ],
      outcome: 'Develop industry-ready skills and gain confidence in practical project development.',
      link: '/internship/college',
      accent: '#38bdf8',
      tag: 'UNIVERSITY'
    },
    {
      id: 'datascience',
      badge: 'HIGH VALUE TRACK',
      badgeColor: '#10b981',
      number: '04',
      title: 'Data Science Internship',
      subtitle: 'Data Science Internship',
      desc: 'Learn how to collect, process, analyze, and visualize data to discover meaningful insights and support business decisions.',
      modules: [
        'Python for Data Science',
        'Data Cleaning and Processing',
        'NumPy and Pandas',
        'Data Visualization',
        'Statistical Analysis',
        'Machine Learning Fundamentals',
        'Real-Time Data Projects'
      ],
      outcome: 'Develop practical data analysis skills and work with real-world datasets.',
      link: '/internship/datascience',
      accent: '#34d399',
      tag: 'ANALYTICS'
    },
    {
      id: 'ml',
      badge: 'ADVANCED ENGINEERING',
      badgeColor: '#8b5cf6',
      number: '05',
      title: 'Machine Learning Internship',
      subtitle: 'Machine Learning Internship',
      desc: 'Discover how machines learn from data and develop predictive models using modern machine learning techniques.',
      modules: [
        'Python Programming',
        'Machine Learning Fundamentals',
        'Supervised and Unsupervised Learning',
        'Regression and Classification',
        'Model Training and Evaluation',
        'Scikit-learn',
        'Real-Time ML Projects'
      ],
      outcome: 'Build machine learning models and gain practical experience in predictive analytics.',
      link: '/internship/Machinelearning',
      accent: '#a855f7',
      tag: 'PREDICTIVE'
    }
  ];

  const benefits = [
    {
      icon: '💻',
      title: 'Practical Training',
      desc: 'Hands-on technical learning with industry best practices and modern development toolchains.'
    },
    {
      icon: '🚀',
      title: 'Live Projects',
      desc: 'Work on practical projects that solve real-world industrial and engineering friction.'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Guidance',
      desc: 'Learn with mentor support from experienced software engineers and domain specialists.'
    },
    {
      icon: '📜',
      title: 'Internship Certificate',
      desc: 'Certificate upon meeting program requirements, recognized for academic credits and hiring.'
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 20px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', color: '#c084fc', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span>⚡</span>
            <span>INDUSTRY-ORIENTED TRAINING</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 20px', background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Internship Programs
          </h1>

          <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: '700', color: '#f8fafc', marginBottom: '20px' }}>
            Build Your Skills. Gain Real-World Experience. <span style={{ color: '#c084fc' }}>Shape Your Future.</span>
          </div>

          <p style={{ maxWidth: '820px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.65, color: '#94a3b8' }}>
            Explore industry-oriented internship programs designed to help students develop practical skills, work on real-time projects, and prepare for successful careers in the IT industry.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('Industrial Internship Program')}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(139, 92, 246, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Apply for Internship
            </button>
            <a
              href="#internship-programs"
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '12px',
                color: '#f8fafc',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              Explore All 5 Tracks ↓
            </a>
          </div>

          {/* Metric Telemetry Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '980px', margin: '60px auto 0', textAlign: 'left' }}>
            <div style={{ background: 'rgba(15, 11, 33, 0.85)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#c084fc', fontSize: '28px', fontWeight: '800' }}>5 Tracks</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Curated Programs</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>AI, ML, DS, Summer &amp; College</div>
            </div>
            <div style={{ background: 'rgba(15, 11, 33, 0.85)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#c084fc', fontSize: '28px', fontWeight: '800' }}>100%</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Live Real-Time Projects</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Hands-on coding &amp; development</div>
            </div>
            <div style={{ background: 'rgba(15, 11, 33, 0.85)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#c084fc', fontSize: '28px', fontWeight: '800' }}>1-on-1</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Expert Mentorship</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Code reviews &amp; tech guidance</div>
            </div>
            <div style={{ background: 'rgba(15, 11, 33, 0.85)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#c084fc', fontSize: '28px', fontWeight: '800' }}>ISO Verified</div>
              <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>Internship Certificate</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Accepted for academic credits</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNSHIP PROGRAMS GRID */}
      <section id="internship-programs" style={{ position: 'relative', zIndex: 1, padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            — EXPLORE COHORTS —
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            FEATURED <span style={{ color: '#c084fc' }}>INTERNSHIP TRACKS</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '12px auto 0' }}>
            Choose the internship that aligns with your career goals and university curriculum.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
          {programs.map((p) => (
            <div
              key={p.id}
              style={{
                background: 'rgba(15, 11, 33, 0.85)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '20px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backdropFilter: 'blur(14px)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.6)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(139, 92, 246, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span
                  style={{
                    background: p.badgeColor,
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase'
                  }}
                >
                  {p.badge}
                </span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: 'rgba(255, 255, 255, 0.2)' }}>
                  {p.number}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#f8fafc', margin: '0 0 4px', lineHeight: 1.25 }}>
                {p.title}
              </h3>
              <div style={{ fontSize: '14px', fontWeight: '600', color: p.accent, marginBottom: '14px' }}>
                {p.subtitle}
              </div>

              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: '0 0 22px' }}>
                {p.desc}
              </p>

              {/* Curriculum Bullet Points */}
              <div style={{ marginBottom: '24px', flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#e2e8f0', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                  What You Will Learn:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.modules.map((m, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: '#cbd5e1' }}>
                      <span style={{ color: p.accent, fontWeight: '700', fontSize: '14px', lineHeight: 1 }}>✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome Box */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${p.accent}33`, borderRadius: '12px', padding: '14px 16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: p.accent, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Target Outcome
                </div>
                <div style={{ fontSize: '13px', color: '#f1f5f9', lineHeight: 1.5, fontWeight: '500' }}>
                  {p.outcome}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => onOpenModal && onOpenModal(p.subtitle || p.title || 'Industrial Internship Program')}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  Apply Now
                </button>
                <Link
                  to={p.link}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#cbd5e1',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMON INTERNSHIP BENEFITS */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', background: 'rgba(10, 8, 26, 0.7)', borderTop: '1px solid rgba(139, 92, 246, 0.15)', borderBottom: '1px solid rgba(139, 92, 246, 0.15)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              — PROGRAM PERKS —
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
              COMMON <span style={{ color: '#c084fc' }}>INTERNSHIP BENEFITS</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '12px auto 0' }}>
              Everything included across all GV DesignTech internship tracks to ensure practical excellence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {benefits.map((b, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 11, 33, 0.85)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '16px',
                  padding: '30px 24px',
                  textAlign: 'left',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{b.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#f8fafc', margin: '0 0 10px' }}>
                  {b.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px 120px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(15, 11, 33, 0.9))',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '24px',
            padding: '60px 32px',
            boxShadow: '0 24px 60px rgba(139, 92, 246, 0.2)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '20px' }}>
            APPLICATIONS OPEN FOR UPCOMING BATCH
          </div>

          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: '800', margin: '0 0 16px', color: '#f8fafc' }}>
            Start Your Internship Journey Today!
          </h2>

          <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: '700', color: '#c084fc', marginBottom: '20px', letterSpacing: '1px' }}>
            Learn. Practice. Build. Grow.
          </div>

          <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Develop practical technical skills, work on real-time projects under mentor guidance, and receive an industry-recognized certificate.
          </p>

          <button
            type="button"
            onClick={() => onOpenModal && onOpenModal('Industrial Internship Program')}
            style={{
              padding: '16px 42px',
              background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
              transition: 'transform 0.2s'
            }}
          >
            Apply for Internship →
          </button>
        </div>
      </section>
    </div>
  );
}
