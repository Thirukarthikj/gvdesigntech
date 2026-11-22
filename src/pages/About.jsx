import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aboutStyles as Im } from '../data/styles.js';

export default function About({ onOpenModal }) {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('training');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(Im.visible);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(`.${Im['ab-reveal']}`);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={Im['ab-page']}>
      {/* Hero Section */}
      <section className={Im['ab-hero']}>
        <div className={Im['ab-hero-bg']}>
          <img alt="GV Design Tech Hero" src="/assets/cad-floorplan-bg.jpg" />
          <div className={Im['ab-hero-overlay']}></div>
        </div>
        <div className={Im['ab-hero-content']}>
          <div className={Im['ab-hero-tag']}>ABOUT GV DESIGN TECH</div>
          <h1>Redefining CAD &amp; Engineering Design Through Innovation</h1>
          <p>
            At GV Design Tech, we transform your vision into reality through comprehensive Mechanical CAD, Civil BIM Drafting, and CNC Programming solutions. Our industry-aligned curriculum bridges the gap between academic theory and modern engineering demands.
          </p>
          <div className={Im['ab-hero-buttons']}>
            <a href="#services" className={Im['ab-btn-grad']}>
              Explore Programs
            </a>
            <Link to="/Contactus" className={Im['ab-btn-outline']}>
              Contact Us
            </Link>
          </div>
        </div>
        <div className={Im['ab-scroll-indicator']}>
          <div className={Im.abBounce}>↓</div>
        </div>
      </section>

      {/* About Overview Section */}
      <section className={Im['ab-about']}>
        <div className={Im['ab-about-container']}>
          <div className={Im['ab-about-grid']}>
            <div className={`${Im['ab-about-img-wrap']} ${Im['ab-reveal']} ${Im.visible}`}>
              <img alt="GV Design Tech CAD Design Center" src="/assets/cad-lab-classroom.jpg" style={{ borderRadius: '16px', objectFit: 'cover' }} />
            </div>
            <div className={`${Im['ab-about-body']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-hero-tag']}>WHO WE ARE</div>
              <h2>Building Tomorrow's Design &amp; Engineering Leaders Today</h2>
              <p>
                GV Design Tech is premier CAD &amp; Engineering Design training institute, specializing in Mechanical CAD, Civil Architectural Drafting, BIM modeling, and CNC Programming. We empower engineering students, freshers, and professionals with hands-on drafting skills, 3D modeling expertise, and industrial corporate readiness.
              </p>
              <p>
                Founded by Vinith Gunasekaran, our mission is to deliver premier engineering CAD education across engineering clusters, providing elite hands-on studio workshops and software mastery with 100% placement track records.
              </p>
              <div style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className={Im['ab-btn-grad']}
                  onClick={onOpenModal}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Join GV Design Tech Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={Im['ab-services']} id="services">
        <div className={Im['ab-about-container']}>
          <div className={Im['ab-svc-header']}>
            <div className={Im['ab-hero-tag']}>OUR CORE SPECIALIZATIONS</div>
            <h2>
              Drive Your Engineering Success With<br />Our CAD Training Programs
            </h2>
          </div>

          <div className="cad-programs-grid">
            {/* Card 1: Mechanical & Automobile CAD */}
            <div className="cad-program-card">
              <div className="cad-card-media">
                <span className="cad-card-badge">⚙️ Mechanical &amp; Auto CAD</span>
                <img alt="Mechanical & Automobile CAD" src="/assets/cad-card-mechanical.jpg" />
                <div className="cad-card-media-overlay"></div>
              </div>
              <div className="cad-card-body">
                <h3 className="cad-card-title">Mechanical &amp; Automobile CAD</h3>
                <p className="cad-card-desc">
                  Master parametric 3D solid modeling, powertrain assembly design, sheet metal fabrication, and GD&amp;T production drafting.
                </p>
                <div className="cad-card-tools">
                  <span className="cad-tool-pill">AutoCAD 2D/3D</span>
                  <span className="cad-tool-pill">SolidWorks</span>
                  <span className="cad-tool-pill">CATIA V5</span>
                  <span className="cad-tool-pill">Ansys FEA</span>
                  <span className="cad-tool-pill">GD&amp;T</span>
                </div>
                <button
                  type="button"
                  className="cad-card-action-btn"
                  onClick={onOpenModal}
                >
                  Explore Mechanical Track →
                </button>
              </div>
            </div>

            {/* Card 2: Civil BIM & Architectural Drafting */}
            <div className="cad-program-card">
              <div className="cad-card-media">
                <span className="cad-card-badge">🏛️ Civil &amp; Architectural BIM</span>
                <img alt="Civil BIM & Architectural Drafting" src="/assets/cad-card-civil.jpg" />
                <div className="cad-card-media-overlay"></div>
              </div>
              <div className="cad-card-body">
                <h3 className="cad-card-title">Civil BIM &amp; Architectural Drafting</h3>
                <p className="cad-card-desc">
                  Learn structural engineering drafting, 3D architectural elevations, MEP service coordination, and Building Information Modeling.
                </p>
                <div className="cad-card-tools">
                  <span className="cad-tool-pill">Revit Architecture</span>
                  <span className="cad-tool-pill">AutoCAD Civil 3D</span>
                  <span className="cad-tool-pill">BIM Modeling</span>
                  <span className="cad-tool-pill">Navisworks</span>
                  <span className="cad-tool-pill">3ds Max</span>
                </div>
                <button
                  type="button"
                  className="cad-card-action-btn"
                  onClick={onOpenModal}
                >
                  Explore Civil BIM Track →
                </button>
              </div>
            </div>

            {/* Card 3: CNC Programming & CAM */}
            <div className="cad-program-card">
              <div className="cad-card-media">
                <span className="cad-card-badge">⚡ CNC Machining &amp; CAM</span>
                <img alt="CNC Programming & CAM" src="/assets/cad-card-cnc.jpg" />
                <div className="cad-card-media-overlay"></div>
              </div>
              <div className="cad-card-body">
                <h3 className="cad-card-title">CNC Programming &amp; CAM</h3>
                <p className="cad-card-desc">
                  Develop precision G-code &amp; M-code routines, 3-axis/5-axis CNC turning and milling toolpath simulations, and modern CAM workflows.
                </p>
                <div className="cad-card-tools">
                  <span className="cad-tool-pill">MasterCAM</span>
                  <span className="cad-tool-pill">CNC Turning</span>
                  <span className="cad-tool-pill">5-Axis Milling</span>
                  <span className="cad-tool-pill">G-Code / M-Code</span>
                  <span className="cad-tool-pill">Toolpath Sim</span>
                </div>
                <button
                  type="button"
                  className="cad-card-action-btn"
                  onClick={onOpenModal}
                >
                  Explore CNC Track →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="cad-showcase-section">
        <div className="cad-showcase-wrap">
          {/* Left Column: Visual with Digital Twin blueprint & Telemetry chips */}
          <div className="cad-showcase-visual">
            <img alt="GV Design Tech CAD Engineering Showcase" src="/assets/cad-success-model.jpg" />
            <div className="cad-showcase-visual-overlay"></div>
            
            <div className="cad-telemetry-chip cad-chip-tl">
              <span className="cad-chip-dot"></span>
              <span>Digital Twin CAD Assembly</span>
            </div>
            
            <div className="cad-telemetry-chip cad-chip-br">
              <span className="cad-chip-dot" style={{ background: '#ec4899', boxShadow: '0 0 8px #ec4899' }}></span>
              <span>GD&amp;T Precision ±0.01mm</span>
            </div>
          </div>

          {/* Right Column: Content with Tabs, Badges, and CTA */}
          <div className="cad-showcase-content">
            <div className="cad-showcase-tag">EXCELLENCE IN CAD ENGINEERING</div>
            <h2 className="cad-showcase-title">
              We're All About <span>Industry-Standard CAD Solutions</span> That Transform Careers
            </h2>
            <p className="cad-showcase-desc">
              Our students model, analyze, and detail real-world engineering assemblies and architectural structures. Through weekly design challenges, 1-on-1 portfolio reviews, and corporate industry projects, we cultivate true engineering design mastery.
            </p>

            <div className="cad-showcase-tabs">
              <button
                type="button"
                className={`cad-showcase-tab-btn ${activeShowcaseTab === 'training' ? 'active' : ''}`}
                onClick={() => setActiveShowcaseTab('training')}
              >
                Studio CAD Training
              </button>
              <button
                type="button"
                className={`cad-showcase-tab-btn ${activeShowcaseTab === 'innovation' ? 'active' : ''}`}
                onClick={() => setActiveShowcaseTab('innovation')}
              >
                Industrial BIM &amp; CAM
              </button>
            </div>

            <div className="cad-showcase-tab-desc">
              {activeShowcaseTab === 'training'
                ? 'Hands-on laboratory training covering 2D drafting standards, parametric 3D solid modeling, sheet metal layouts, and mechanical engineering assembly tolerances.'
                : 'Advanced Building Information Modeling (BIM) structural workflows, MEP architectural coordination, and 5-axis CNC G-code toolpath simulations.'}
            </div>

            <div className="cad-showcase-badges">
              <span className="cad-showcase-pill">📐 AutoCAD 2D/3D</span>
              <span className="cad-showcase-pill">⚙️ SolidWorks</span>
              <span className="cad-showcase-pill">🏛️ Revit BIM</span>
              <span className="cad-showcase-pill">🚀 CATIA V5</span>
              <span className="cad-showcase-pill">⚡ CNC / CAM</span>
              <span className="cad-showcase-pill">🔬 Ansys FEA</span>
            </div>

            <button
              type="button"
              className="cad-showcase-cta"
              onClick={onOpenModal}
            >
              <span>Explore CAD Design Studio</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={Im['ab-cta']}>
        <div className={Im['ab-cta-content']}>
          <div className={Im['ab-cta-stats']}>
            <div>
              <span className={Im['ab-cta-num']}>5000+</span>
              <span className={Im['ab-cta-lbl']}>Trained Engineers</span>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
            <div>
              <span className={Im['ab-cta-num']}>94%</span>
              <span className={Im['ab-cta-lbl']}>Placement Rate</span>
            </div>
          </div>
          <h2>The Future of Engineering is Here — Are You Ready to Join GV Design Tech?</h2>
          <p>
            Join the next generation of engineers mastering 3D CAD Modeling, Civil BIM Drafting, and CNC Manufacturing.
          </p>
          <div style={{ marginTop: '28px' }}>
            <button
              type="button"
              className={Im['ab-btn-grad']}
              onClick={onOpenModal}
              style={{ border: 'none', cursor: 'pointer', fontSize: '16px', padding: '14px 34px' }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
