import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredSiteConfig, subscribeToContentUpdates, initialSiteConfig } from '../data/contentPersistence.js';

export default function Footer() {
  const [siteConfig, setSiteConfig] = useState(() => getStoredSiteConfig());

  useEffect(() => {
    const unsubscribe = subscribeToContentUpdates(() => {
      setSiteConfig(getStoredSiteConfig());
    });
    return unsubscribe;
  }, []);

  const contact = siteConfig.contactInfo || initialSiteConfig.contactInfo;
  const social = siteConfig.socialLinks || initialSiteConfig.socialLinks;
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
          <div className="footer-social-links" style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
            {social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.35)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.35)', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.35)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            )}
            {social.whatsapp && (
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.35)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'all 0.2s' }}
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            )}
          </div>
        </div>

        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/Contactus">Contact</Link></li>
            <li><Link to="/admin/login" style={{ color: '#c084fc', fontWeight: '600' }}>Admin Portal 🔐</Link></li>
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
            <span>{contact.address || 'Headquarters: Oddanchatram, Tamil Nadu'}</span>
          </div>
          <div className="contact-item" style={{ cursor: 'pointer' }} onClick={() => window.location.href = `mailto:${contact.email || 'gvdesigntech707@gmail.com'}`}>
            <div className="ci-ico">📩</div>
            <span>{contact.email || 'gvdesigntech707@gmail.com'}</span>
          </div>
          <div className="contact-item" style={{ cursor: 'pointer' }} onClick={() => window.location.href = `tel:${(contact.phone || '+91 96553 64707').replace(/[^0-9+]/g, '')}`}>
            <div className="ci-ico">📞</div>
            <span>{contact.phone || '+91 96553 64707'}</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link
            to="/admin/login"
            style={{
              color: '#c084fc',
              textDecoration: 'none',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '8px',
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🔒</span>
            <span>Admin Portal</span>
          </Link>
          <p className="credits" style={{ margin: 0 }}>Designed for GV Design Tech</p>
        </div>
      </div>
    </footer>
  );
}
