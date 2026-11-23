import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BrainCanvas from '../components/BrainCanvas.jsx';
import { homeStyles as P } from '../data/styles.js';
import { testimonialsRow1, testimonialsRow2 } from '../data/testimonials.js';

export default function Home({ onOpenModal }) {
  const [counts, setCounts] = useState({
    professionals: 0,
    years: 0,
    alumni: 0,
    awards: 0
  });
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef(null);
  const heroCardRef = useRef(null);
  const cadCardRef = useRef(null);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(P.visible);
            entry.target.classList.add(P.show);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(
      `.${P.reveal}, .${P['reveal-left']}, .${P['reveal-right']}, .${P['reveal-scale']}`
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          const duration = 2000;
          const start = Date.now();
          const timer = setInterval(() => {
            const timePassed = Date.now() - start;
            const progress = Math.min(1, timePassed / duration);
            setCounts({
              professionals: Math.floor(progress * 8500),
              years: Math.floor(progress * 3),
              alumni: Math.floor(progress * 250),
              awards: Math.floor(progress * 25)
            });
            if (progress === 1) clearInterval(timer);
          }, 20);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  // 3D rotation & tilt on CAD Showcase visual
  useEffect(() => {
    const el = cadCardRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 800) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = x * 36;
      const rotX = -y * 22 + 10;
      const model = el.querySelector('.cad-3d-model-inner');
      if (model) {
        model.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
        model.style.transition = 'transform 0.1s ease-out';
      }
    };

    const handleMouseLeave = () => {
      const model = el.querySelector('.cad-3d-model-inner');
      if (model) {
        model.style.transform = '';
        model.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
      }
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const marqueeItems = [
    'AutoCAD 2D Drafting & 3D Architectural Modeling Certification',
    'Mechanical Product Design & Digital Prototyping – SolidWorks & CATIA',
    'Civil CADD & Structural BIM Coordination – Revit, Tekla & ETABS',
    'CNC Programming & Precision CAM Machining – MasterCAM & G-Code',
    'Automobile Engineering CAD – Chassis, Powertrain & Sheet Metal Design',
    'Piping & Structural Drafting – SP3D, PDMS & Plant Design Systems',
    'Electrical CADD & Industrial Automation Panel Wiring Schematics',
    '3D Interior & Exterior Architectural Visualization – 3ds Max & V-Ray',
    'Finite Element Analysis (FEA) & Computational Simulation – ANSYS',
    'Master Diploma in Mechanical, Civil & Architectural CADD Systems'
  ];

  return (
    <div className={P['home-page']}>
      {/* Background Starfield and Nebula */}
      <div className={P.nebula}></div>
      <div className={P.stars}></div>

      <div id="home-content">
        {/* Section 0: Hero */}
        <section className={`${P.hero} ${P.reveal} ${P.visible} ${P.show}`}>
          <div className={P['hero-stack']} ref={heroCardRef}>
            <div className={P['hero-badge']}>
              <span className={P.dot}></span>
              <span>Future of CAD & Engineering Design Hub Near You</span>
            </div>

            {/* Center Floating 3D Logo with Site-Themed CAD Outer Circle */}
            <div className="hero-floating-logo-wrap">
              <div className="hero-logo-halo"></div>
              <img
                src="/assets/cad-engineering-circle.svg"
                alt="GV DesignTech CAD Engineering Rotating Ring"
                className="hero-logo-tech-circle"
              />
              <img
                src="/assets/gv-logo.png"
                alt="GV DesignTech Floating Emblem"
                className="hero-floating-logo"
              />
            </div>

            {/* Left Card */}
            <div className={`${P['floating-card']} ${P['card-left']} ${P.reveal} ${P.visible} ${P.show}`}>
              <div className={P.label}>Model Precision</div>
              <div className={P.value}>98.4%</div>
              <div className={P.sub}>Engineering CAD benchmark</div>
              <div className={P['card-bars']}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            {/* Right Card */}
            <div className={`${P['floating-card']} ${P['card-right']} ${P.reveal} ${P.visible} ${P.show}`}>
              <div className={P.label}>Active Learners</div>
              <div className={P.value}>12K+</div>
              <div className={P.sub}>Mastering CAD &amp; Design daily</div>
            </div>

            {/* Bottom Card */}
            <div className={`${P['floating-card']} ${P['card-bottom']} ${P.reveal} ${P.visible} ${P.show}`}>
              <div className={P.label}>Realtime Labs</div>
              <div className={P.value}>24/7</div>
              <div className={P.sub}>CAD &amp; Engineering Lab Access</div>
            </div>

            {/* Ambient Particles */}
            <div className={P['particle-field']}>
              <span className={`${P.particle} ${P.p1}`}></span>
              <span className={`${P.particle} ${P.p2}`}></span>
              <span className={`${P.particle} ${P.p3}`}></span>
              <span className={`${P.particle} ${P.p4}`}></span>
              <span className={`${P.particle} ${P.p5}`}></span>
              <span className={`${P.particle} ${P.p6}`}></span>
            </div>
          </div>

          <div className={P['hero-row']}>
            <div className="hero-leaders-group">
              <figure className={`${P['hero-chairman']} ${P.reveal} ${P.visible} ${P.show}`}>
                <div className={P['hero-chairman-frame']}>
                  <div className={P['hero-chairman-inner']}>
                    <img
                      alt="Vinith Gunasekaran, Founder and CEO of GV DesignTech"
                      className={P['hero-chairman-img']}
                      width="1122"
                      height="1402"
                      decoding="async"
                      src="/assets/chairman-real-uq_F_5Yk.jpg"
                    />
                    <figcaption className={P['hero-chairman-cap']}>
                      <span className={P['hero-chairman-role']}>Vinith Gunasekaran</span>
                      <span className={P['hero-chairman-title']}>Founder / CEO</span>
                      <span className={P['hero-chairman-org']}>GV DesignTech</span>
                    </figcaption>
                  </div>
                </div>
              </figure>

              <figure className={`${P['hero-chairman']} ${P.reveal} ${P.visible} ${P.show}`}>
                <div className={P['hero-chairman-frame']} style={{ animationDelay: '-3.5s' }}>
                  <div className={P['hero-chairman-inner']}>
                    <img
                      alt="Gokul Prasath K, Managing Director of GV DesignTech"
                      className={P['hero-chairman-img']}
                      width="819"
                      height="1024"
                      decoding="async"
                      src="/assets/gokul-prasath.jpg"
                      style={{ objectPosition: 'center 12%' }}
                    />
                    <figcaption className={P['hero-chairman-cap']}>
                      <span className={P['hero-chairman-role']}>Gokul Prasath K</span>
                      <span className={P['hero-chairman-title']}>Managing Director</span>
                      <span className={P['hero-chairman-org']}>GV DesignTech</span>
                    </figcaption>
                  </div>
                </div>
              </figure>
            </div>

            <div className={`${P['row-left']} ${P.reveal} ${P.visible} ${P.show}`}>
              <h1>Best CAD &amp; Engineering Design Training Center</h1>
              <div className={P['mini-line']}></div>
            </div>

            <div className={`${P['row-right']} ${P.reveal} ${P.visible} ${P.show}`}>
              <p>
                Online Learning Classes Built for Real Industry Competence. Master industry-standard engineering and design through live interactive online classes.
              </p>
              <div className={P['cta-group']}>
                <button
                  type="button"
                  className={P['btn-cta']}
                  onClick={onOpenModal}
                  style={{ border: 'none', font: 'inherit', cursor: 'pointer' }}
                >
                  Get Started Now
                </button>
                <Link
                  to="/Pybot-video"
                  className={P['btn-secondary']}
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Marquee */}
        <div className={P['trusted-section']}>
          <p className={P['trusted-label']}>
            MASTER INDUSTRY-STANDARD CAD, CAM &amp; ENGINEERING DESIGN DISCIPLINES
          </p>
          <div className={P['marquee-wrap']}>
            <div className={P['marquee-track']}>
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <span key={idx} className={P['marquee-logo']}>
                  <span className={P.dot}></span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: About */}
        <section className={P.section} id="about">
          <div className={P['about-grid']}>
            <div
              className={`${P['about-visual']} ${P.reveal} ${P.visible} ${P.show}`}
              ref={cadCardRef}
            >
              <div className={`${P['about-blob']} ${P.ab1}`}></div>
              <div className={`${P['about-blob']} ${P.ab2}`}></div>
              <div className={P['client-bubbles']} style={{ zIndex: 3 }}>
                <div className={P['c-avatar']}>AR</div>
                <div className={P['c-avatar']}>SK</div>
                <div className={P['c-avatar']}>MV</div>
                <div className={P['c-avatar']}>+</div>
              </div>

              {/* 3D Model Badge */}
              <div className="cad-badge-tag">
                <span className="cad-badge-dot"></span>
                <span>3D CAD Model</span>
              </div>

              {/* 3D Rotating CAD Showcase Scene */}
              <div className="cad-3d-scene">
                <div className="cad-3d-platform"></div>
                <div className="cad-3d-model-inner">
                  <img
                    src="/assets/cad-isometric-room.png"
                    alt="GV DesignTech 3D CAD Architectural Interior"
                  />
                </div>
              </div>

              <div className={P['about-stat-pill']} style={{ zIndex: 3 }}>
                <div>
                  <div className={P.big}>5200+</div>
                  <div className={P.sm}>Verified Local Members</div>
                </div>
                <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.12)' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'rgb(167, 139, 250)' }}>4.9★</div>
                  <div className={P.sm}>Avg Rating</div>
                </div>
              </div>
            </div>

            <div className={`${P['about-content']} ${P.reveal} ${P.visible} ${P.show}`}>
              <div className={P['section-eyebrow']}>
                <a href="#about">Welcome To GV DesignTech Academy</a>
              </div>
              <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
                Master Industry-Standard <span>CAD &amp; Engineering Design</span>
              </h2>
              <p className={P.lead}>
                Gain hands-on proficiency in architectural drafting, 3D mechanical modeling, BIM workflows, and structural analysis. Build real-world competence with our industry-aligned training programs.
              </p>
              <div className={P.flist} style={{ marginTop: '32px' }}>
                <div className={P['flist-item']}>
                  <div className={P['flist-bullet']}></div>
                  <div>
                    <h4>Advanced 2D/3D CAD &amp; Architectural Modeling</h4>
                    <p>
                      Master AutoCAD, Revit, and 3ds Max with parametric planning, photorealistic 3D visualization, and professional architectural blueprint generation.
                    </p>
                  </div>
                </div>
                <div className={P['flist-item']}>
                  <div className={P['flist-bullet']}></div>
                  <div>
                    <h4>Mechanical Product Design &amp; Digital Prototyping</h4>
                    <p>
                      Develop precision mechanical assemblies, generative CAD components, and production-ready manufacturing blueprints using SolidWorks and CATIA.
                    </p>
                  </div>
                </div>
                <div className={P['flist-item']}>
                  <div className={P['flist-bullet']}></div>
                  <div>
                    <h4>BIM Coordination &amp; Structural Engineering</h4>
                    <p>
                      Implement collaborative Building Information Modeling, structural analysis, and clash-detection simulation for modern infrastructure projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Divider */}
        <div className={P['section-divider']}></div>

        {/* Section 4: Stats */}
        <section className={P['stats-section']} id="stats" ref={statsRef}>
          <div className={P['stats-grid']}>
            <div className={`${P['stat-block']} ${P['reveal-scale']} ${P.visible} ${P.show}`}>
              <span className={P['stat-num1']}>{counts.professionals}+</span>
              <div className={P['stat-title']}>Professionals Worldwide Choose Us</div>
            </div>
            <div className={`${P['stat-block']} ${P['reveal-scale']} ${P.visible} ${P.show}`}>
              <span className={P['stat-num1']}>{counts.years}+</span>
              <div className={P['stat-title']}>Years of Training Excellence</div>
            </div>
            <div className={`${P['stat-block']} ${P['reveal-scale']} ${P.visible} ${P.show}`}>
              <span className={P['stat-num1']}>{counts.alumni}+</span>
              <div className={P['stat-title']}>Alumni Placed Globally</div>
            </div>
            <div className={`${P['stat-block']} ${P['reveal-scale']} ${P.visible} ${P.show}`}>
              <span className={P['stat-num1']}>{counts.awards}+</span>
              <div className={P['stat-title']}>Industry Awards &amp; Accreditations</div>
            </div>
          </div>
        </section>

        {/* Section 5: Divider */}
        <div className={P['section-divider']}></div>

        {/* Section 6: AI Radar & Earth Section */}
        <section className={P['ai-section']}>
          <div className={P['ai-left']}>
            <div className={P.earth}>
              <div className={P.texture}></div>
            </div>
          </div>
          <div className={P['ai-middle']}>
            <div className={P['ai-radar']}>
              <div className={P['cross-v']}></div>
              <div className={P['cross-h']}></div>
              <div className={P['outer-ring']}></div>
              <div className={P.sweep}></div>
              <div className={P['inner-box']}></div>
              <div className={P['logo-box']}>
                <img alt="GV DesignTech Core Training Systems" src="/assets/gv-logo.png" />
              </div>
            </div>
          </div>
          <div className={P['ai-right']}>
            <span className={P['mini-title']}>WELCOME TO GV DESIGNTECH</span>
            <h2>
              Industry-Aligned Modules Across <span>Mechanical, Civil &amp; CNC CAD</span>
            </h2>
            <p className={P.desc}>
              Industry-aligned modules across Mechanical &amp; Automobile CAD, Civil Drafting, CNC Programming. Master industry-standard engineering tools with real-world project portfolios, interactive 3D simulations, and hands-on laboratory training.
            </p>
            <div className={P.feature}>
              <span className={P.dot}></span>
              <div>
                <h4>Mechanical &amp; Automobile CAD Design</h4>
                <p>
                  Master SolidWorks, CATIA, Creo, and Autodesk Inventor with parametric 3D assembly, GD&amp;T, sheet metal fabrication, and automobile powertrain component modeling.
                </p>
              </div>
            </div>
            <div className={P.feature}>
              <span className={P.dot}></span>
              <div>
                <h4>Civil Drafting &amp; Architectural BIM Modeling</h4>
                <p>
                  Develop structural building plans, Revit BIM 3D models, 3ds Max architectural visualizations, structural reinforcement detailing, and municipal permit blueprints.
                </p>
              </div>
            </div>
            <div className={P.feature}>
              <span className={P.dot}></span>
              <div>
                <h4>CNC Programming &amp; Precision CAM Machining</h4>
                <p>
                  Generate multi-axis CNC lathe and milling toolpaths using MasterCAM, NX CAM, G-Code/M-Code simulation, and production-ready manufacturing documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Divider */}
        <div className={P['section-divider']}></div>

        {/* Section 8: Brain Section with Interactive Canvas */}
        <section className={P['brain-section']}>
          <div className={P['brain-inner']}>
            <div>
              <div className={`${P['section-eyebrow']} ${P.reveal} ${P.visible} ${P.show}`}>
                Industry-Standard CAD Curriculum
              </div>
              <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
                The Engineering Expertise <em>Behind</em> Mechanical, Civil &amp; CNC CAD
              </h2>
              <p className={`${P.lead} ${P.reveal} ${P.visible} ${P.show}`}>
                Industry-aligned modules across Mechanical &amp; Automobile CAD, Civil Drafting, CNC Programming. Master industry-standard engineering tools with real-world project portfolios, interactive 3D simulations, and hands-on laboratory training.
              </p>
              <div className={P['ai-orbit']}>
                <div className={P['center-core']}>
                  <img alt="GV DesignTech Interactive Core Training Environment" src="/assets/gv-logo.png" />
                </div>
                <div className={P['ai-left']}>
                  <div className={P['training-gallery']}>
                    <img
                      alt="CAD Design Classroom and Workshop at GV DesignTech"
                      src="/assets/cad-lab-classroom.jpg"
                    />
                    <img
                      alt="Students Practicing 2D and 3D CAD Modeling at GV DesignTech"
                      src="/assets/cad-lab-students.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${P['brain-visual']} ${P.reveal} ${P.visible} ${P.show}`}>
              <BrainCanvas />
            </div>
          </div>
        </section>

        {/* Section 9: Divider */}
        <div className={P['section-divider']}></div>

        {/* Section 10: Testimonials Track */}
        <section className={P['testi-section']} id="testimonials">
          <div className={`${P['testi-header']} ${P.reveal} ${P.visible} ${P.show}`}>
            <div className={P['section-eyebrow']}>Verified Student Reviews</div>
            <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
              See What Our CAD &amp; Engineering Trainees Have to <span>Say About Our Courses</span>
            </h2>
          </div>
          <div className={P['testi-rows']}>
            {/* Forward Track */}
            <div className={P['testi-row']}>
              <div className={`${P['testi-track']} ${P.fwd}`}>
                {[...testimonialsRow1, ...testimonialsRow1].map((item, idx) => (
                  <div key={idx} className={P.tcard}>
                    <div className={`${P['tcard-corner']} ${P.tl}`}></div>
                    <div className={`${P['tcard-corner']} ${P.tr}`}></div>
                    <div className={`${P['tcard-corner']} ${P.bl}`}></div>
                    <div className={`${P['tcard-corner']} ${P.br}`}></div>
                    <div className={P['tcard-quote']}>"</div>
                    <div className={P['tcard-stars']}>
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div className={P['tcard-title']}>{item.title}</div>
                    <div className={P['tcard-text']}>{item.text}</div>
                    <div className={P['tcard-author']}>
                      <div className={P['t-av']}>{item.initials}</div>
                      <div>
                        <div className={P['t-name']}>{item.name}</div>
                        <div className={P['t-handle']}>{item.handle}</div>
                      </div>
                      <div className={P['t-verified']}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backward Track */}
            <div className={P['testi-row']}>
              <div className={`${P['testi-track']} ${P.bwd}`}>
                {[...testimonialsRow2, ...testimonialsRow2].map((item, idx) => (
                  <div key={idx} className={P.tcard}>
                    <div className={`${P['tcard-corner']} ${P.tl}`}></div>
                    <div className={`${P['tcard-corner']} ${P.tr}`}></div>
                    <div className={`${P['tcard-corner']} ${P.bl}`}></div>
                    <div className={`${P['tcard-corner']} ${P.br}`}></div>
                    <div className={P['tcard-quote']}>"</div>
                    <div className={P['tcard-stars']}>
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div className={P['tcard-title']}>{item.title}</div>
                    <div className={P['tcard-text']}>{item.text}</div>
                    <div className={P['tcard-author']}>
                      <div className={P['t-av']}>{item.initials}</div>
                      <div>
                        <div className={P['t-name']}>{item.name}</div>
                        <div className={P['t-handle']}>{item.handle}</div>
                      </div>
                      <div className={P['t-verified']}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Call to Action */}
        <div className={`${P['cta-section']} ${P.reveal} ${P.visible} ${P.show}`}>
          <div className={P['stat-pill']}>
            <div>
              <div className={P['big-n']}>500+</div>
              <div className={P['sm-l']}>Placed CAD Engineers</div>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div>
              <div className={P['big-n']}>
                94<sup>%</sup>
              </div>
              <div className={P['sm-l']}>Core Industry Placement Rate</div>
            </div>
          </div>

          <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
            The Future of Engineering Design Starts Here — Are You Ready to Join <span>GV DesignTech?</span>
          </h2>
          <p>
            Master industry-grade CAD, CAM &amp; CAE workflows including parametric 3D modeling, precision GD&amp;T drafting, architectural BIM coordination, and CNC toolpath programming. Launch your engineering design career with us today.
          </p>
          <div className={P['cta-btns']}>
            <button
              type="button"
              className={P['btn-cta']}
              onClick={onOpenModal}
              style={{ border: 'none', font: 'inherit', cursor: 'pointer' }}
            >
              Get Started Now
            </button>
            <Link className={P['btn-outline']} to="/Contactus">
              Talk to a CAD Career Expert Near You
            </Link>
          </div>
        </div>

        {/* Section 12: Success Placement Track */}
        <section className={`${P['success-section']} ${P.reveal} ${P.visible} ${P.show}`}>
          <div className={P['success-container']}>
            <div className={`${P['success-content']} ${P['reveal-left']} ${P.visible} ${P.show}`}>
              <span className={P['success-tag']}>OUR SUCCESS TRACK</span>
              <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
                We Have A Proven Track Record<span> Of CAD Engineering Placements</span>
              </h2>
              <p>
                Empowering aspiring engineers through hands-on CAD/CAM drafting, industry-vetted 3D project portfolios, GD&amp;T tolerance standards, technical mock interviews, and direct recruitment placement support.
              </p>
              <div className={P['feature-divider']}></div>
              <div className={P['success-features']}>
                <div className={P['feature-box']}>
                  <div className={P['feature-icon']}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 13L11 10L13 12L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className={P['feature-content']}>
                    <h4>Mechanical &amp; Civil <br />CAD Design Workflows</h4>
                  </div>
                </div>

                <div className={P['feature-box']}>
                  <div className={P['feature-icon']}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      <path d="M19.4 15A1.65 1.65 0 0 0 20 13.5" stroke="currentColor" strokeWidth="2" />
                      <path d="M4.6 15A1.65 1.65 0 0 1 4 13.5" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className={P['feature-content']}>
                    <h4>CNC Programming &amp; <br />BIM Architecture</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${P['success-image']} ${P['reveal-right']} ${P.visible} ${P.show}`}>
              <img alt="GV DesignTech 3D CAD Engineering Design Model" src="/assets/cad-success-model.jpg" />
              <div className={P['floating-card']}>
                <h3>5,200+</h3>
                <span>Trained CAD Engineers</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
