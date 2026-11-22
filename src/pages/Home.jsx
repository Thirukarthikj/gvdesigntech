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
              professionals: Math.floor(progress * 1000),
              years: Math.floor(progress * 13),
              alumni: Math.floor(progress * 500),
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

  // 3D tilt effect on hero robot card
  useEffect(() => {
    const el = heroCardRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 800) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      el.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
    'Artificial Intelligence Certification Course – Gen AI, LLM & Deep Learning',
    'Advanced Data Science Blueprint – Python, Statistics & Machine Learning',
    'Machine Learning Engineering Bootcamp – NLP, Computer Vision & Predictive Models',
    'Data Analytics Institute – SQL, Excel & Business Analytics Insights',
    'Power BI Corporate Training – Dashboards, Reports & Data Visualization Tools',
    'Python Full Stack Developer Track – HTML, CSS, JavaScript & Django Architecture',
    'Cloud Computing Deployment Labs – AWS, Azure & DevOps Automation',
    'Cyber Security Training Infrastructure – Ethical Hacking & Network Protection',
    'Generative AI Certification – Prompt Engineering Concepts & Autonomous AI Agents',
    'Data Engineering Academy – Scalable ETL Pipelines & Big Data Clusters'
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
            <div
              className={P['hero-bg-text']}
              style={{
                left: '50%',
                fontSize: 'clamp(36px, 9.5vw, 130px)',
                letterSpacing: '-2px'
              }}
            >
              GV DESIGNTECH
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
            ©MASTER THE MOST DEMANDED TECHNOLOGIES OF THE FUTURE &amp; CAREER SUCCESS
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
                <img alt="GV DesignTech Core Training Systems" src="/assets/logo-0m0vxTot.png" />
              </div>
            </div>
          </div>
          <div className={P['ai-right']}>
            <span className={P['mini-title']}>WELCOME TO GV DESIGNTECH</span>
            <h2>
              Pioneering the Future of Data Science &amp; <span>Generative AI Classes</span>
            </h2>
            <p className={P.desc}>
              Master cutting-edge technologies, from Generative AI and Large Language Models to scalable enterprise data pipelines. Build real-world expertise with our industry-aligned local career paths.
            </p>
            <div className={P.feature}>
              <span className={P.dot}></span>
              <div>
                <h4>Generative AI &amp; LLM Systems Integration</h4>
                <p>
                  Deploy, build, and optimize foundational model pipelines to architect secure transactional knowledge networks and smart conversational workflows.
                </p>
              </div>
            </div>
            <div className={P.feature}>
              <span className={P.dot}></span>
              <div>
                <h4>Predictive Data Science Analytics &amp; Big Data Systems</h4>
                <p>
                  Convert massive telemetry streams into structural business foresights utilizing automated modeling loops and predictive algorithmic vectors.
                </p>
              </div>
            </div>
            <div className={P.feature}>
              <span className={P.dot}></span>
              <div>
                <h4>Enterprise Infrastructure Data Pipeline Engineering</h4>
                <p>
                  Build secure, reliable, and compliant real-time ETL configurations tailored to localized data processing mandates.
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
                Core Technology Training Core
              </div>
              <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
                The Analytical Intelligence <em>Behind</em> Our Bootcamps
              </h2>
              <p className={`${P.lead} ${P.reveal} ${P.visible} ${P.show}`}>
                Our proprietary engineering cluster training systems guide students through massive dataset analytics, preparing candidates to resolve complex engineering challenges with precision.
              </p>
              <div className={P['ai-orbit']}>
                <div className={P['center-core']}>
                  <img alt="GV DesignTech Interactive Core Training Environment" src="/assets/logo-0m0vxTot.png" />
                </div>
                <div className={P['ai-left']}>
                  <div className={P['training-gallery']}>
                    <img
                      alt="Advanced Machine Learning Laboratory inside GV DesignTech Academy"
                      src="/assets/image1-CO0kRs3Y.jpeg"
                    />
                    <img
                      alt="Students managing data science algorithms and neural network code visualization"
                      src="/assets/image2-KIrwALpr.jpeg"
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
              See what our localized technical candidates have to <span>say about our courses</span>
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
              <div className={P['sm-l']}>Placed Tech Candidates</div>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div>
              <div className={P['big-n']}>
                94<sup>%</sup>
              </div>
              <div className={P['sm-l']}>Verified Career Placement Rate</div>
            </div>
          </div>

          <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
            The Tech Ecosystem of Tomorrow Is Here — Are You Ready to Join <span>GV DesignTech?</span>
          </h2>
          <p>
            Master specialized modern methodologies including contextual natural language structures, automated diagnostic pipelines, and scalable enterprise data models built for fast workflows. Apply near you today.
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
              Talk to a Career Expert Near You
            </Link>
          </div>
        </div>

        {/* Section 12: Success Placement Track */}
        <section className={`${P['success-section']} ${P.reveal} ${P.visible} ${P.show}`}>
          <div className={P['success-container']}>
            <div className={`${P['success-content']} ${P['reveal-left']} ${P.visible} ${P.show}`}>
              <span className={P['success-tag']}>OUR SUCCESS TRACK</span>
              <h2 className={`${P.h2} ${P.reveal} ${P.visible} ${P.show}`}>
                We Have A Proven Track Record<span> Of Student Placement Workflows</span>
              </h2>
              <p>
                Empowering student cohorts through hands-on analytics training, industry-vetted project architectures, comprehensive corporate mock trials, and custom engineering portfolio reviews.
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
                    <h4>Data Analytics <br />And Business Insights</h4>
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
                    <h4>AI-Driven <br />Process Automation</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${P['success-image']} ${P['reveal-right']} ${P.visible} ${P.show}`}>
              <img alt="Successful Certified AI Academy Alumni Graduate" src="/assets/head-Bg-sBvkC.jpeg" />
              <div className={P['floating-card']}>
                <h3>520,000+</h3>
                <span>Verified Members</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
