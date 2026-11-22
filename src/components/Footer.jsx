import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-nl">
        <div className="nl-text">
          <h3>
            Let's make something <span>great work together.</span>
          </h3>
          <p>Join 15,000+ learners already enrolled in GV Design Tech.</p>
        </div>
        <div className="nl-form">
          <div className="nl-badge-showcase">
            <div className="badge-text-wrap">
              <div className="badge-pill">ISO 9001:2015 Certified</div>
              <p>
                Empowering global engineering workflows with industry-vetted portfolios and secure deep learning laboratory clusters.
              </p>
            </div>
            <div className="badge-rating">
              <span className="rating-num">4.9</span>
              <div className="rating-stars">★★★★★</div>
              <span className="rating-count">from 3,200+ reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="foot-logo">
            <img alt="GV Design Tech Logo" src="/assets/gv-logo.png" />
            <span>GV Design Tech</span>
          </Link>
          <p>
            GV Design Tech provides premier CAD &amp; Engineering Design training. We empower engineers and designers with industry-ready skills through AutoCAD, Revit, SolidWorks, and BIM frameworks.
          </p>
          <div className="social-row">
            <div className="footer-stats">
              <div className="stat-box">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">500+</span>
                <span className="stat-label">Workshops</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Placements</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">50+</span>
                <span className="stat-label">Partners</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/Contactus">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Partners</h4>
          <ul>
            <li><p>Corporate Program</p></li>
            <li><p>Refer and Earn</p></li>
            <li><p>University Program</p></li>
            <li><p>Affiliate Program</p></li>
            <li><p>Placement Assistance Team</p></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <div className="contact-item">
            <div className="ci-ico">📍</div>
            <span>Headquarters: Oddanchatram, Tamil Nadu</span>
          </div>
          <div className="contact-item" style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'mailto:gvdesigntech707@gmail.com'}>
            <div className="ci-ico">📩</div>
            <span>gvdesigntech707@gmail.com</span>
          </div>
          <div className="contact-item" style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'tel:+919655364707'}>
            <div className="ci-ico">📞</div>
            <span>+91 96553 64707</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            © 2026 GV Design Tech.
          </Link>{' '}
          All rights reserved.
        </p>
        <p className="credits">Designed for GV Design Tech</p>
      </div>
    </footer>
  );
}
