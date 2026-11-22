import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aboutStyles as Im } from '../data/styles.js';

export default function About({ onOpenModal }) {
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

          <div className={Im['ab-svc-row']}>
            <div className={`${Im['ab-svc-col']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-svc-img']}>
                <img alt="Mechanical & Automobile CAD" src="/assets/cad-isometric-room.png" />
              </div>
              <h3 className={Im['ab-svc-title']}>Mechanical &amp; Automobile CAD</h3>
              <p className={Im['ab-svc-desc']}>
                Parametric 3D solid modeling, assembly design, sheet metal, and GD&amp;T production drafting using AutoCAD, SolidWorks, and CATIA.
              </p>
            </div>

            <div className={`${Im['ab-svc-col']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-svc-img']}>
                <img alt="Civil BIM & Architectural Drafting" src="/assets/cad-floorplan-hero.jpg" />
              </div>
              <h3 className={Im['ab-svc-title']}>Civil BIM &amp; Architectural Drafting</h3>
              <p className={Im['ab-svc-desc']}>
                Structural 2D drafting, 3D elevation rendering, MEP coordination, and Building Information Modeling with Revit and Navisworks.
              </p>
            </div>

            <div className={`${Im['ab-svc-col']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-svc-img']}>
                <img alt="CNC Programming & CAM" src="/assets/cad-success-model.jpg" />
              </div>
              <h3 className={Im['ab-svc-title']}>CNC Programming &amp; CAM</h3>
              <p className={Im['ab-svc-desc']}>
                Precision G-code / M-code generation, 3-axis/5-axis CNC turning and milling toolpath simulations, and modern CAM workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className={Im['ab-showcase']}>
        <div className={Im['ab-showcase-wrap']}>
          <div className={Im['ab-showcase-grid']}>
            <div className={`${Im['ab-showcase-left']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-hero-tag']}>EXCELLENCE IN CAD ENGINEERING</div>
              <h2>We're All About Industry-Standard CAD Solutions That Transform Careers</h2>
              <p>
                Our students model, analyze, and detail real-world engineering assemblies and architectural structures. Through weekly design challenges, 1-on-1 portfolio reviews, and corporate industry projects, we cultivate true engineering design mastery.
              </p>
              <div className={Im['ab-showcase-badges']}>
                <span>AutoCAD 2D/3D</span>
                <span>SolidWorks</span>
                <span>Revit BIM</span>
                <span>CATIA</span>
                <span>CNC / CAM</span>
                <span>Ansys FEA</span>
              </div>
            </div>
            <div className={`${Im['ab-showcase-right']} ${Im['ab-reveal']} ${Im.visible}`}>
              <img alt="GV Design Tech CAD Engineering" src="/assets/cad-success-model.jpg" style={{ borderRadius: '16px', objectFit: 'cover' }} />
            </div>
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
