import React, { useState, useEffect, useRef } from 'react';
import { getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function ComputerScience({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Digital matrix particle connection canvas
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

    const particles = Array.from({ length: 36 }, () => ({
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

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 * (1 - dist / 115)})`;
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

  const csCourses = [
    {
      badge: 'MOST POPULAR',
      badgeColor: '#ef4444',
      tag: 'PYTHON',
      duration: '2.5 Months',
      level: 'ALL LEVELS',
      title: 'Python Programming',
      desc: 'Master core Python syntax, OOP concepts, data structures, file handling, automation scripting, and scientific computing with NumPy & Pandas.',
      img: '/assets/python-programming-fundamentals-tutorial-BWzxYAlF.webp'
    },
    {
      badge: 'IN DEMAND',
      badgeColor: '#f97316',
      tag: 'JAVA',
      duration: '3 Months',
      level: 'BEGINNER → ADVANCED',
      title: 'Java Programming',
      desc: 'Comprehensive Core & Advanced Java, JVM architecture, multithreading, Collections framework, JDBC, and Spring Boot enterprise development.',
      img: '/assets/java-programming-guide-2026-v0YhQs6E.webp'
    },
    {
      badge: 'CORE FOUNDATION',
      badgeColor: '#38bdf8',
      tag: 'C & C++',
      duration: '2 Months',
      level: 'BEGINNER',
      title: 'C and C++',
      desc: 'Build fundamental coding mastery with pointers, memory allocation, data structures, algorithm design, and modern C++ object-oriented principles.',
      img: '/assets/computer-science-training-DbNu6b5m.webp'
    },
    {
      badge: 'CAREER TRACK',
      badgeColor: '#ec4899',
      tag: 'FULL STACK',
      duration: '4 Months',
      level: 'INTERMEDIATE → ADVANCED',
      title: 'Full Stack Development',
      desc: 'End-to-end full stack software engineering using React, Node.js, Express, MongoDB, RESTful APIs, cloud containerization, and modern Git workflows.',
      img: '/assets/mern-stack-development-Blgwje8-.webp'
    },
    {
      badge: 'FAST TRACK',
      badgeColor: '#a855f7',
      tag: 'FRONTEND',
      duration: '2.5 Months',
      level: 'ALL LEVELS',
      title: 'Web Development',
      desc: 'Modern web engineering with HTML5, responsive CSS3/Tailwind, JavaScript ES6+, asynchronous DOM programming, and interactive UI component design.',
      img: '/assets/javascript-es6-features-let-const-arrow-functions-destructuring-C_dDQ0UK.webp'
    },
    {
      badge: 'HIGH VALUE',
      badgeColor: '#eab308',
      tag: 'ANALYTICS',
      duration: '3.5 Months',
      level: 'INTERMEDIATE',
      title: 'Data Science',
      desc: 'Exploratory data analysis, statistical methods, data wrangling with Pandas, Seaborn visual insights, hypothesis testing, and BI report generation.',
      img: '/assets/Data-science-BIyx-gTh.webp'
    },
    {
      badge: 'SPECIALISED',
      badgeColor: '#06b6d4',
      tag: 'AI / ML',
      duration: '4 Months',
      level: 'ADVANCED',
      title: 'Artificial Intelligence & Machine Learning',
      desc: 'Predictive regression, classification, clustering, deep neural networks with PyTorch, computer vision, NLP transformers, and production AI deployment.',
      img: '/assets/machine-learning-ai-0RgAZyb4.webp'
    },
    {
      badge: 'ESSENTIAL',
      badgeColor: '#10b981',
      tag: 'DATABASE',
      duration: '1.5 Months',
      level: 'ALL LEVELS',
      title: 'SQL & Database Management',
      desc: 'Relational database schema modeling, advanced SQL queries, joins, subqueries, indexing, stored procedures, normalization, and ACID transactions.',
      img: '/assets/sql-database-design-keys-relationships-tutorial-CvfVvMeC.webp'
    }
  ];

  const [coursesList, setCoursesList] = useState(() => {
    const stored = getStoredCourses().filter(c =>
      (c.department && c.department.toLowerCase().includes('computer')) ||
      (c.category && c.category.toLowerCase().includes('computer'))
    );
    const custom = stored.filter(s => !csCourses.some(m => m.id === s.id || m.title === s.title));
    return [...csCourses, ...custom];
  });

  useEffect(() => {
    const unsub = subscribeToContentUpdates(() => {
      const stored = getStoredCourses().filter(c =>
        (c.department && c.department.toLowerCase().includes('computer')) ||
        (c.category && c.category.toLowerCase().includes('computer'))
      );
      const custom = stored.filter(s => !csCourses.some(m => m.id === s.id || m.title === s.title));
      setCoursesList([...csCourses, ...custom]);
    });
    return () => unsub();
  }, []);

  const faqs = [
    {
      q: 'Which programming track is recommended for beginners?',
      a: 'If you are completely new to programming, we recommend starting with Python Programming or C/C++. Python has clean, readable syntax and opens pathways into Web Development, Data Science, and Automation.'
    },
    {
      q: 'Do your Full Stack and Web Development courses include portfolio projects?',
      a: 'Yes! Every student completes 3 to 5 real-world capstone projects (such as e-commerce platforms, SaaS dashboards, and database APIs) deployed live with GitHub repositories for portfolio presentation.'
    },
    {
      q: 'Are these courses aligned with IT industry hiring standards?',
      a: 'Our curriculum is designed alongside top software companies and startups, emphasizing clean code, data structures, algorithm problem-solving, and system design evaluations.'
    },
    {
      q: 'What certifications are awarded upon completion?',
      a: 'Upon successful project submission and code review, you will receive an official GV DesignTech Verified Certification with a unique online credential ID for LinkedIn and resume verification.'
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
            <span>💻</span>
            <span>COMPUTER SCIENCE &amp; SOFTWARE ENGINEERING</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 24px', background: 'linear-gradient(135deg, #ffffff 30%, #38bdf8 70%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Master Full Stack, AI &amp; Modern Software Engineering
          </h1>

          <p style={{ maxWidth: '820px', margin: '0 auto 40px', fontSize: '18px', lineHeight: 1.65, color: '#94a3b8' }}>
            Industry-aligned software engineering tracks covering Python, Java, C/C++, Full Stack Development, Data Science, AI/ML, and SQL Database Systems. Build production projects and accelerate your tech career.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(56, 189, 248, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              Enroll in CS &amp; IT Track
            </button>
            <a
              href="#cs-courses"
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
              Explore Programs ↓
            </a>
          </div>

          {/* Metric Telemetry Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '980px', margin: '60px auto 0', textAlign: 'left' }}>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#38bdf8' }}>8 Tracks</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Foundational &amp; Advanced Tracks</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#c084fc' }}>100%</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Hands-on Coding Labs</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#4ade80' }}>5+ Projects</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Live Portfolio Deployments</div>
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fbbf24' }}>Placement</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Dedicated Tech Hiring Drives</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPUTER SCIENCE COURSES SECTION */}
      <section id="cs-courses" style={{ position: 'relative', zIndex: 1, padding: '70px 24px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px' }}>
            — WHAT WE TEACH —
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', color: '#fff', margin: '0 0 12px' }}>
            COMPUTER SCIENCE &amp; IT <span style={{ color: '#38bdf8' }}>COURSES</span>
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '15px', color: '#94a3b8', lineHeight: 1.6 }}>
            Industry-curated software engineering courses designed to make you interview-ready and technically proficient.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {coursesList.map((c, i) => (
            <div
              key={c.id || c._id || i}
              style={{
                background: 'rgba(15, 11, 33, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
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
                  <span style={{ color: '#38bdf8', fontWeight: '700', letterSpacing: '0.5px' }}>{c.level}</span>
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
                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
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
            Frequently Asked <span style={{ color: '#38bdf8' }}>Questions</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8' }}>
            Everything you need to know about our Computer Science &amp; IT curriculum and placement opportunities.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 11, 33, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
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
                <span style={{ fontSize: '20px', color: '#38bdf8' }}>{activeFaq === idx ? '−' : '+'}</span>
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
            Launch Your Career in <span style={{ color: '#38bdf8' }}>Software &amp; IT</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Join GV DesignTech's coding bootcamps and IT certifications today. Build real applications, master algorithms, and crack your dream tech placement.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              padding: '16px 42px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(2, 132, 199, 0.4)'
            }}
          >
            Apply for CS &amp; IT Training
          </button>
        </div>
      </section>
    </div>
  );
}