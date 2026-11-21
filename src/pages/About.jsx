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
          <img alt="PYBOT Hero" src="/assets/about-Back-C27jZxMR.avif" />
          <div className={Im['ab-hero-overlay']}></div>
        </div>
        <div className={Im['ab-hero-content']}>
          <div className={Im['ab-hero-tag']}>ABOUT PYBOT</div>
          <h1>Redefining Tech Training Through Innovation</h1>
          <p>
            At PYBOT, we transform your vision into reality through comprehensive web development, data analytics, and artificial intelligence solutions. Our cutting-edge curriculum bridges the gap between academic theory and industry demands.
          </p>
          <div className={Im['ab-hero-buttons']}>
            <a href="#services" className={Im['ab-btn-grad']}>
              Explore Services
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
              <img alt="PYBOT Team" src="/assets/aboutai-CRoG2fVh.svg" />
            </div>
            <div className={`${Im['ab-about-body']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-hero-tag']}>WHO WE ARE</div>
              <h2>Building Tomorrow's Tech Leaders Today</h2>
              <p>
                PYBOT is Coimbatore's premier tech training institute, specializing in web development, big data analytics, UI/UX design, and AI-driven systems. We empower students, freshers, and professionals with hands-on technical skills and corporate readiness.
              </p>
              <p>
                Founded by Dr. Muthuraj Madamuthu, our mission is to democratize advanced AI education across Tier-2 and Tier-3 engineering clusters, delivering elite corporate bootcamps with 100% placement track records.
              </p>
              <div style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className={Im['ab-btn-grad']}
                  onClick={onOpenModal}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Join PYBOT Today
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
            <div className={Im['ab-hero-tag']}>OUR CAPABILITIES</div>
            <h2>
              Drive Your Digital Success With<br />Our Comprehensive Services
            </h2>
          </div>

          <div className={Im['ab-svc-row']}>
            <div className={`${Im['ab-svc-col']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-svc-img']}>
                <img alt="AI-Powered Virtual Assistants" src="/assets/service1-CsuxCGGW.png" />
              </div>
              <h3 className={Im['ab-svc-title']}>AI-Powered Virtual Assistants</h3>
              <p className={Im['ab-svc-desc']}>
                Intelligent software applications that understand and respond to human inputs, performing complex automated task routines.
              </p>
            </div>

            <div className={`${Im['ab-svc-col']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-svc-img']}>
                <img alt="Human Resource Management" src="/assets/service2-Cl6drwQJ.png" />
              </div>
              <h3 className={Im['ab-svc-title']}>Human Resource Management</h3>
              <p className={Im['ab-svc-desc']}>
                Automated talent sourcing, performance metrics analysis, and AI-guided career mapping systems.
              </p>
            </div>

            <div className={`${Im['ab-svc-col']} ${Im['ab-reveal']} ${Im.visible}`}>
              <div className={Im['ab-svc-img']}>
                <img alt="Supply Chain Optimization" src="/assets/service3-CDLdTOAM.png" />
              </div>
              <h3 className={Im['ab-svc-title']}>Supply Chain Optimization</h3>
              <p className={Im['ab-svc-desc']}>
                Predictive algorithms and telemetry data streams designed to prevent downtime and synchronize logistics pipelines.
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
              <div className={Im['ab-hero-tag']}>EXCELLENCE IN AUTOMATION</div>
              <h2>We're All About Creating Intelligent AI Solutions That Transform Careers</h2>
              <p>
                Our students design, evaluate, and deploy enterprise-level models that solve real industrial friction points. Through weekly hackathons, 1-on-1 code reviews, and corporate partner projects, we cultivate true technical mastery.
              </p>
              <div className={Im['ab-showcase-badges']}>
                <span>Data Analytics</span>
                <span>Full Stack</span>
                <span>Generative AI</span>
                <span>Computer Vision</span>
                <span>Cloud DevOps</span>
              </div>
            </div>
            <div className={`${Im['ab-showcase-right']} ${Im['ab-reveal']} ${Im.visible}`}>
              <img alt="PYBOT AI" src="/assets/about-robo-C8tkXfGz.jpg" />
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
              <span className={Im['ab-cta-lbl']}>Happy Students</span>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
            <div>
              <span className={Im['ab-cta-num']}>94%</span>
              <span className={Im['ab-cta-lbl']}>Placement Rate</span>
            </div>
          </div>
          <h2>The Future of Work is Here — Are You Ready to PYBOT AI?</h2>
          <p>
            Join the next generation of engineers mastering Generative AI, Large Language Models, and Cloud Analytics.
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
