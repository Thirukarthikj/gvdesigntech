import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getStoredCourses,
  getStoredCustomDepartments,
  subscribeToContentUpdates,
  courseMatchesDept,
  getDepartmentIcon,
  slugifyDepartment,
  getStoredSiteConfig,
  initialSiteConfig
} from '../data/contentPersistence.js';

export default function DepartmentPage({ onOpenModal }) {
  const { deptSlug } = useParams();
  const [courses, setCourses] = useState(() => getStoredCourses());
  const [customDepts, setCustomDepts] = useState(() => getStoredCustomDepartments());
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  const siteConfig = getStoredSiteConfig() || initialSiteConfig;
  const contact = siteConfig.contactInfo || initialSiteConfig.contactInfo;
  const phoneDigits = (contact.phone || '919655364707').replace(/[^0-9]/g, '');
  const whatsappNumber = phoneDigits.length === 10 ? `91${phoneDigits}` : (phoneDigits || '919655364707');

  // Subscribe to live course updates
  useEffect(() => {
    const unsub = subscribeToContentUpdates(() => {
      setCourses(getStoredCourses());
      setCustomDepts(getStoredCustomDepartments());
    });
    return () => unsub();
  }, []);

  // Compute all available departments
  const allDepts = useMemo(() => {
    const set = new Set();
    customDepts.forEach(d => { if (d && d.trim()) set.add(d.trim()); });
    courses.forEach(c => { if (c.department && c.department.trim()) set.add(c.department.trim()); });
    return Array.from(set);
  }, [courses, customDepts]);

  // Match the active department by slug (e.g. "cs" matches "CS")
  const currentDept = useMemo(() => {
    if (!deptSlug) return 'Specialized Department';
    const cleanSlug = deptSlug.toLowerCase().trim();
    const found = allDepts.find(d => slugifyDepartment(d) === cleanSlug);
    if (found) return found;

    // Fallback: format title from slug
    if (cleanSlug === 'cs') return 'CS';
    if (cleanSlug === 'it') return 'IT';
    if (cleanSlug === 'ece') return 'ECE';
    if (cleanSlug === 'eee') return 'EEE';
    if (cleanSlug === 'cnc') return 'CNC';
    if (cleanSlug === 'cad') return 'CAD';
    if (cleanSlug === 'ai') return 'AI';

    return cleanSlug
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  }, [deptSlug, allDepts]);

  // Filter ONLY courses that strictly belong to this department section
  const deptCourses = useMemo(() => {
    return courses.filter(c => courseMatchesDept(c, currentDept));
  }, [courses, currentDept]);

  const deptIcon = getDepartmentIcon(currentDept);

  // Digital canvas background effect
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

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
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

        ctx.fillStyle = `rgba(217, 70, 239, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 110)})`;
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

  const handleEnrollClick = (courseTitle = '') => {
    if (typeof onOpenModal === 'function') {
      onOpenModal(courseTitle || currentDept);
    }
  };

  const getCourseWhatsAppUrl = (courseTitle) => {
    const msg = `Hello GV DesignTech, I am interested in enrolling in "${courseTitle || currentDept}" under the ${currentDept} department track. Please share course schedule, fee structure, and syllabus details.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const faqs = [
    {
      q: `Who should enroll in ${currentDept} training programs?`,
      a: `These tracks are specifically structured for engineering students, diploma holders, graduates, and working professionals looking to master industry-demanded tools and hands-on competencies in ${currentDept}.`
    },
    {
      q: `What software modules and practical tools are covered in ${currentDept}?`,
      a: deptCourses.length > 0 && deptCourses[0].modules
        ? `This track provides intensive training on ${deptCourses[0].modules}, along with real-world drafting, simulation, and project design standards.`
        : `Training focuses on current industrial workflows, project assembly drafting, computer-aided simulations, and hands-on laboratory exercises.`
    },
    {
      q: 'Will I receive an authentic, verifiable certificate upon completion?',
      a: 'Yes! Every student who successfully finishes the training receives an ISO 9001:2015 certified credential with a unique serial number that recruiters can instantly validate on our /certificate-verification portal.'
    },
    {
      q: 'What is the mode of training delivery?',
      a: 'Courses are offered via interactive Classroom Studio workstations at our Oddanchatram Headquarters, as well as Live Online interactive sessions with 1-on-1 mentor guidance.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#04020a', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6
        }}
      />

      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '140px 24px 80px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#cbd5e1' }}>Curriculum &amp; Disciplines</span>
          <span>/</span>
          <span style={{ color: '#f0abfc', fontWeight: '700' }}>{currentDept}</span>
        </div>

        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto 64px',
          background: 'radial-gradient(ellipse at top, rgba(217, 70, 239, 0.12) 0%, transparent 70%)',
          padding: '40px 20px',
          borderRadius: '30px'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            background: 'rgba(217, 70, 239, 0.15)',
            border: '1px solid rgba(217, 70, 239, 0.45)',
            borderRadius: '999px',
            color: '#f0abfc',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.6px',
            marginBottom: '20px'
          }}>
            <span>✨</span>
            <span>SPECIALIZED DEPARTMENT CURRICULUM</span>
          </div>

          {/* Department Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: '900',
            lineHeight: 1.15,
            margin: '0 0 18px',
            background: 'linear-gradient(135deg, #ffffff 40%, #f0abfc 80%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <span>{deptIcon}</span>
            <span>{currentDept} Programs</span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: '16.5px', color: '#cbd5e1', lineHeight: 1.65, margin: '0 auto 32px', maxWidth: '720px' }}>
            Explore industry-standard certification tracks and hands-on project training specifically designed for <strong style={{ color: '#fff' }}>{currentDept}</strong>. Master advanced professional software, real-world case studies, and corporate interview prep at GV DesignTech.
          </p>

          {/* Quick Stats Pill Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            <div style={{ padding: '8px 18px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#e2e8f0' }}>
              🎓 <span style={{ color: '#f0abfc' }}>{deptCourses.length}</span> {deptCourses.length === 1 ? 'Certified Course' : 'Certified Courses'}
            </div>
            <div style={{ padding: '8px 18px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#e2e8f0' }}>
              🏢 Classroom Studio &amp; Live Online
            </div>
            <div style={{ padding: '8px 18px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#e2e8f0' }}>
              💼 100% Placement &amp; Mentorship Support
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleEnrollClick(currentDept)}
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #d946ef, #8b5cf6)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(217, 70, 239, 0.45)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Enroll in {currentDept}
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello GV DesignTech, I would like to inquire about courses under the ${currentDept} department.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 28px',
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
        </div>

        {/* ========================================================
            COURSES GRID (STRICTLY THIS DEPARTMENT'S COURSES ONLY)
            ======================================================== */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Certified {currentDept} Curriculum Tracks</span>
                <span style={{ fontSize: '12px', padding: '3px 10px', background: 'rgba(217, 70, 239, 0.18)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f0abfc', fontWeight: '700' }}>
                  {deptCourses.length} {deptCourses.length === 1 ? 'Program' : 'Programs'}
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
                Courses listed below are tailored specifically for students and engineers pursuing {currentDept}.
              </p>
            </div>
          </div>

          {deptCourses.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {deptCourses.map((c, idx) => {
                const displayImg = c.image || '/assets/mech-cad.jpg';

                return (
                  <div
                    key={c.id || c._id || idx}
                    style={{
                      background: 'linear-gradient(160deg, rgba(26, 18, 55, 0.75) 0%, rgba(10, 8, 26, 0.85) 100%)',
                      border: '1px solid rgba(217, 70, 239, 0.35)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.7)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(217, 70, 239, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.35)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
                    }}
                  >
                    {/* Media Thumbnail */}
                    <div style={{
                      height: '170px',
                      width: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#0a081a'
                    }}>
                      {c.image ? (
                        <img
                          src={displayImg}
                          alt={c.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(139, 92, 246, 0.2))',
                          color: '#f0abfc',
                          fontSize: '36px'
                        }}>
                          <span>{deptIcon}</span>
                          <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px', color: '#e2e8f0' }}>
                            {currentDept} Track
                          </span>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10, 8, 26, 0.95) 0%, transparent 60%)'
                      }} />

                      {/* Department Tag */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(15, 13, 36, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(217, 70, 239, 0.5)',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#f0abfc',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {currentDept}
                      </div>

                      {/* Highlight Badge */}
                      {c.badge && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'linear-gradient(135deg, #d946ef, #8b5cf6)',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '10.5px',
                          fontWeight: '800',
                          color: '#fff',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 12px rgba(217, 70, 239, 0.4)'
                        }}>
                          {c.badge}
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '800',
                        color: '#fff',
                        margin: '0 0 12px',
                        lineHeight: 1.35
                      }}>
                        {c.title}
                      </h3>

                      {/* Meta Pills */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {c.duration && (
                          <span style={{
                            fontSize: '11.5px',
                            color: '#22d3ee',
                            background: 'rgba(34, 211, 238, 0.1)',
                            border: '1px solid rgba(34, 211, 238, 0.3)',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            ⏱️ {c.duration}
                          </span>
                        )}
                        {c.level && (
                          <span style={{
                            fontSize: '11.5px',
                            color: '#f472b6',
                            background: 'rgba(244, 114, 182, 0.1)',
                            border: '1px solid rgba(244, 114, 182, 0.3)',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            📈 {c.level}
                          </span>
                        )}
                        {c.mode && (
                          <span style={{
                            fontSize: '11.5px',
                            color: '#c084fc',
                            background: 'rgba(192, 132, 252, 0.1)',
                            border: '1px solid rgba(192, 132, 252, 0.3)',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            🏢 {c.mode}
                          </span>
                        )}
                      </div>

                      {/* Software Modules */}
                      {c.modules && (
                        <div style={{
                          fontSize: '12.5px',
                          color: '#cbd5e1',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          marginBottom: '12px',
                          lineHeight: 1.45
                        }}>
                          <strong style={{ color: '#f0abfc' }}>Software &amp; Tools: </strong>
                          {c.modules}
                        </div>
                      )}

                      {/* Description */}
                      <p style={{
                        fontSize: '13.5px',
                        color: '#94a3b8',
                        lineHeight: 1.55,
                        margin: '0 0 18px',
                        flex: 1
                      }}>
                        {c.desc}
                      </p>

                      {/* Card Action Buttons */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        marginTop: 'auto'
                      }}>
                        <button
                          type="button"
                          onClick={() => handleEnrollClick(c.title)}
                          style={{
                            padding: '10px',
                            background: 'linear-gradient(135deg, #d946ef, #8b5cf6)',
                            border: 'none',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(217, 70, 239, 0.3)',
                            textAlign: 'center'
                          }}
                        >
                          Enroll Now
                        </button>

                        <a
                          href={getCourseWhatsAppUrl(c.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '10px',
                            background: 'rgba(34, 197, 94, 0.12)',
                            border: '1px solid rgba(34, 197, 94, 0.4)',
                            borderRadius: '10px',
                            color: '#4ade80',
                            fontSize: '13px',
                            fontWeight: '700',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div style={{
              textAlign: 'center',
              padding: '60px 24px',
              background: 'rgba(26, 18, 55, 0.4)',
              border: '1px dashed rgba(217, 70, 239, 0.4)',
              borderRadius: '24px'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '14px' }}>📁</div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>
                {currentDept} Courses Coming Soon
              </h3>
              <p style={{ fontSize: '14.5px', color: '#94a3b8', margin: '0 auto 24px', maxWidth: '520px', lineHeight: 1.5 }}>
                Our academic engineering panel is currently finalizing syllabus offerings and workstation setups for <strong style={{ color: '#fff' }}>{currentDept}</strong>. Contact us on WhatsApp for early course syllabus and cohort reservations!
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello GV DesignTech, please notify me when new courses are launched under ${currentDept}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: '#fff',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                <i className="fa-brands fa-whatsapp" style={{ fontSize: '18px' }}></i>
                <span>Get Early Curriculum Access</span>
              </a>
            </div>
          )}
        </div>

        {/* ========================================================
            DEPARTMENT FEATURES / WHY CHOOSE GV DESIGNTECH
            ======================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '80px'
        }}>
          <div style={{ padding: '26px', background: 'rgba(26, 18, 55, 0.45)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '18px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🖥️</div>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>Dedicated Workstations</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Hands-on lab training on high-performance design rigs with dual monitors and licensed industrial tool suites.
            </p>
          </div>
          <div style={{ padding: '26px', background: 'rgba(26, 18, 55, 0.45)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '18px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📜</div>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>ISO Verified Credentials</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Recognized certification with online QR serial verification accepted across international hiring recruiters.
            </p>
          </div>
          <div style={{ padding: '26px', background: 'rgba(26, 18, 55, 0.45)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '18px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>Placement Assurance</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Resume drafting, technical interview mock rounds, and active recruitment drives with 150+ corporate partners.
            </p>
          </div>
          <div style={{ padding: '26px', background: 'rgba(26, 18, 55, 0.45)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '18px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>1-on-1 Faculty Mentorship</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Small batch cohorts ensuring every learner receives personalized code/drafting reviews and doubt resolution.
            </p>
          </div>
        </div>

        {/* ========================================================
            FAQS SECTION
            ======================================================== */}
        <div style={{ maxWidth: '820px', margin: '0 auto 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '14.5px', color: '#94a3b8', margin: 0 }}>
              Common queries regarding {currentDept} training, admissions, and schedules.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: isOpen ? 'rgba(217, 70, 239, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: isOpen ? '1px solid rgba(217, 70, 239, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
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
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: '700',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: '#f0abfc' }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 22px 18px', fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            BOTTOM ENROLLMENT CTA
            ======================================================== */}
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(139, 92, 246, 0.2))',
          border: '1px solid rgba(217, 70, 239, 0.45)',
          borderRadius: '26px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: '0 0 12px' }}>
            Ready to Begin Your {currentDept} Specialization?
          </h3>
          <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '0 auto 26px', maxWidth: '580px', lineHeight: 1.6 }}>
            Reserve your seat in the upcoming cohort at GV DesignTech Oddanchatram or start online with live interactive faculty mentorship.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleEnrollClick(currentDept)}
              style={{
                padding: '14px 34px',
                background: 'linear-gradient(135deg, #d946ef, #8b5cf6)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(217, 70, 239, 0.4)'
              }}
            >
              Enroll Now in {currentDept}
            </button>
            <Link
              to="/Contactus"
              style={{
                padding: '14px 28px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Visit Oddanchatram Campus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
