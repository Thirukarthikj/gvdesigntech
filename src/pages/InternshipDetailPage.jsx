import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getStoredInternshipPrograms,
  saveStoredInternshipPrograms,
  subscribeToContentUpdates,
  slugifyDepartment,
  getStoredSiteConfig,
  initialSiteConfig
} from '../data/contentPersistence.js';
import { fetchInternshipProgramsFromMongo } from '../services/mongoService.js';

export default function InternshipDetailPage({ onOpenModal }) {
  const { programSlug } = useParams();
  const [programs, setPrograms] = useState(() => getStoredInternshipPrograms());
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  const siteConfig = getStoredSiteConfig() || initialSiteConfig;
  const contact = siteConfig.contactInfo || initialSiteConfig.contactInfo;
  const phoneDigits = (contact.phone || '919655364707').replace(/[^0-9]/g, '');
  const whatsappNumber = phoneDigits.length === 10 ? `91${phoneDigits}` : (phoneDigits || '919655364707');

  // Load latest programs from MongoDB and subscribe to updates
  useEffect(() => {
    async function loadPrograms() {
      const mongoList = await fetchInternshipProgramsFromMongo();
      if (mongoList && Array.isArray(mongoList) && mongoList.length > 0) {
        setPrograms(mongoList);
        saveStoredInternshipPrograms(mongoList);
      } else {
        setPrograms(getStoredInternshipPrograms());
      }
    }
    loadPrograms();

    const unsub = subscribeToContentUpdates(() => {
      setPrograms(getStoredInternshipPrograms());
    });
    return () => unsub();
  }, []);

  // Match the active program by slug, id, or link
  const program = useMemo(() => {
    if (!programSlug) return null;
    const cleanSlug = programSlug.toLowerCase().trim();

    // 1. Direct slug match
    let match = programs.find(p => slugifyDepartment(p.title || '') === cleanSlug);
    if (match) return match;

    // 2. ID match
    match = programs.find(p => (p.id || '').toLowerCase() === cleanSlug);
    if (match) return match;

    // 3. Link path match
    match = programs.find(p => {
      if (!p.link) return false;
      const lastSegment = p.link.split('/').filter(Boolean).pop()?.toLowerCase();
      return lastSegment === cleanSlug;
    });
    if (match) return match;

    // 4. Subtitle / Title inclusion match
    match = programs.find(p => {
      const t = (p.title || '').toLowerCase();
      const s = (p.subtitle || '').toLowerCase();
      return t.includes(cleanSlug) || cleanSlug.includes(t) || s.includes(cleanSlug);
    });
    return match || null;
  }, [programSlug, programs]);

  // Dynamic cosmic node canvas background
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

    const accentColor = program?.accent || '#c084fc';
    const nodes = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.2
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

        ctx.fillStyle = `rgba(192, 132, 252, ${n.alpha})`;
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
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.16 * (1 - dist / 115)})`;
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
  }, [program]);

  // Format module list
  const moduleList = useMemo(() => {
    if (!program || !program.modules) {
      return [
        'Hands-On Technical Learning & Architecture',
        'Industry Toolchain & Workflow Implementation',
        'Real-Time Project Development Experience',
        '1-on-1 Mentor Code Review & Documentation'
      ];
    }
    if (Array.isArray(program.modules)) return program.modules;
    if (typeof program.modules === 'string') {
      return program.modules
        .split('\n')
        .map(s => s.trim().replace(/^[-*•✓]\s*/, ''))
        .filter(Boolean);
    }
    return [];
  }, [program]);

  const badgeColor = program?.badgeColor || '#ec4899';
  const accentColor = program?.accent || '#c084fc';
  const programTitle = program?.title || (programSlug ? programSlug.replace(/-/g, ' ').toUpperCase() : 'Internship Program');
  const programSubtitle = program?.subtitle || `${programTitle} Training Track`;

  const benefits = [
    { icon: '💻', title: 'Hands-On Practical Training', desc: 'Work directly with industry standard frameworks, developer tooling, and modern deployment pipelines.' },
    { icon: '🚀', title: 'Real-Time Portfolio Project', desc: 'Build an end-to-end production-ready capstone project to highlight on your resume and GitHub.' },
    { icon: '👨‍🏫', title: '1-on-1 Senior Mentorship', desc: 'Continuous code reviews, architectural feedback, and weekly milestones guided by senior engineers.' },
    { icon: '📜', title: 'ISO 9001:2015 Certification', desc: 'Earn a verifiable certificate with a unique QR code valid for academic credit and job interviews.' }
  ];

  const faqs = [
    {
      q: `Who is eligible to apply for the ${programTitle}?`,
      a: `Undergraduate and postgraduate students, diploma holders, fresh engineering graduates, and entry-level professionals seeking intensive project-based practical experience are eligible to enroll.`
    },
    {
      q: 'What is the mode and duration of this internship?',
      a: 'Programs are offered via in-person Workstation Studios at our Oddanchatram Headquarters and Live Interactive Online cohorts with flexible durations from 4 weeks to 3 months.'
    },
    {
      q: 'Will I receive an authentic, verifiable certificate upon completion?',
      a: 'Yes! Upon successful project submission and review, you will receive an official ISO 9001:2015 certified credential with a unique serial number verifiable on our website.'
    },
    {
      q: `What is the target outcome of ${programTitle}?`,
      a: program?.outcome || 'Master industry-demanded tools, complete a production-grade portfolio project, and gain the practical confidence needed to clear technical interviews.'
    }
  ];

  const handleApplyClick = () => {
    if (typeof onOpenModal === 'function') {
      onOpenModal(programSubtitle || programTitle);
    }
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello GV DesignTech, I am interested in applying for the "${programTitle}". Please share batch dates, fee details, and syllabus.`
  )}`;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#04020a', color: '#f8fafc', overflowX: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '140px 24px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '28px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/internship" style={{ color: '#94a3b8', textDecoration: 'none' }}>Internships</Link>
          <span>/</span>
          <span style={{ color: accentColor, fontWeight: '700' }}>{programTitle}</span>
        </div>

        {/* HERO SECTION */}
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto 60px',
          background: `radial-gradient(ellipse at top, ${badgeColor}22 0%, transparent 70%)`,
          padding: '40px 20px',
          borderRadius: '30px'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 20px',
            background: `${badgeColor}20`,
            border: `1px solid ${badgeColor}66`,
            borderRadius: '999px',
            fontSize: '12.5px',
            fontWeight: '800',
            color: '#fff',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '22px'
          }}>
            <span>✨</span>
            <span>{program?.badge || 'OFFICIAL INTERNSHIP COHORT'}</span>
            {program?.number && <span>• PROGRAM {program.number}</span>}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(34px, 5.5vw, 62px)',
            fontWeight: '900',
            lineHeight: 1.15,
            margin: '0 0 16px',
            background: `linear-gradient(135deg, #ffffff 40%, ${accentColor} 80%, ${badgeColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {programTitle}
          </h1>

          {/* Subtitle */}
          <div style={{ fontSize: 'clamp(18px, 2.8vw, 24px)', fontWeight: '700', color: accentColor, marginBottom: '22px' }}>
            {programSubtitle}
          </div>

          {/* Description */}
          <p style={{ maxWidth: '820px', margin: '0 auto 36px', fontSize: '17px', lineHeight: 1.7, color: '#cbd5e1' }}>
            {program?.desc || 'Gain real-world experience, build verified technical competencies, and complete an industrial portfolio project mentored by experienced engineers at GV DesignTech.'}
          </p>

          {/* Hero Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleApplyClick}
              style={{
                padding: '16px 36px',
                background: `linear-gradient(135deg, ${badgeColor}, #8b5cf6)`,
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: `0 8px 28px ${badgeColor}4d`,
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Apply for {programTitle}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '16px 30px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                borderRadius: '12px',
                color: '#4ade80',
                fontSize: '15px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(34, 197, 94, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '18px' }}></i>
              <span>Inquire via WhatsApp</span>
            </a>
          </div>

          {/* Outcome Highlight Box */}
          <div style={{
            maxWidth: '840px',
            margin: '46px auto 0',
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${accentColor}44`,
            borderRadius: '18px',
            padding: '24px 30px',
            textAlign: 'left',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: accentColor, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              🎯 Target Program Outcome
            </div>
            <div style={{ fontSize: '15px', color: '#f1f5f9', lineHeight: 1.6, fontWeight: '500' }}>
              {program?.outcome || 'Develop industry-ready skills, complete real-world projects, and earn verified certification credentials for corporate recruitment.'}
            </div>
          </div>
        </div>

        {/* CURRICULUM & WHAT YOU WILL LEARN */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', margin: '0 0 10px' }}>
              Curriculum &amp; What You Will Learn
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>
              Practical, syllabus-aligned modules covered step-by-step with continuous code &amp; design reviews.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {moduleList.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 11, 33, 0.8)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `${accentColor}25`,
                  color: accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '800',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700', color: '#f8fafc' }}>
                    {typeof m === 'object' && m !== null ? m.title : String(m)}
                  </h4>
                  {typeof m === 'object' && m !== null && m.desc && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
                      {m.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFITS GRID */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>
              Why Choose GV DesignTech Internships?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14.5px', margin: 0 }}>
              Bridging academic concepts with corporate industry delivery standards.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {benefits.map((b, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '26px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>{b.icon}</div>
                <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>{b.title}</h4>
                <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQS SECTION */}
        <div style={{ maxWidth: '840px', margin: '0 auto 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              Key details regarding enrollment, eligibility, and program certification.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((f, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 11, 33, 0.7)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    borderRadius: '14px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      background: 'none',
                      border: 'none',
                      color: '#f8fafc',
                      fontSize: '15.5px',
                      fontWeight: '700',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{f.q}</span>
                    <span style={{ color: accentColor, fontSize: '18px', fontWeight: '800' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 22px 20px', fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6 }}>
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div style={{
          background: `linear-gradient(135deg, rgba(26, 18, 55, 0.9) 0%, rgba(10, 8, 26, 0.95) 100%)`,
          border: `1px solid ${accentColor}44`,
          borderRadius: '24px',
          padding: '50px 30px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}>
          <h3 style={{ fontSize: '30px', fontWeight: '800', color: '#fff', margin: '0 0 12px' }}>
            Ready to Accelerate Your Career with {programTitle}?
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '16px', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Enroll today to reserve your seat in the upcoming cohort. Seats are limited to maintain 1-on-1 mentor guidance.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleApplyClick}
              style={{
                padding: '15px 36px',
                background: `linear-gradient(135deg, ${badgeColor}, #8b5cf6)`,
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: `0 8px 24px ${badgeColor}40`
              }}
            >
              Enroll Now in {programTitle}
            </button>
            <Link
              to="/internship"
              style={{
                padding: '15px 30px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15.5px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Explore All Programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
