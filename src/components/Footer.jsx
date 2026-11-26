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
          <p>Join 8,500+ learners already enrolled in GV Design Tech.</p>
        </div>
        <div className="nl-form">
          <div className="nl-badge-showcase">
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
          <div className="footer-social-links" style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <a
              href="https://www.youtube.com/@GVDESIGNTECH"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
              style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="https://www.instagram.com/gvdesigntech/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.35)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/gv-design-tech-undefined-42845a35a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.35)', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61596803677692"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.35)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
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
