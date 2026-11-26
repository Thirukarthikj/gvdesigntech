import React, { useState, useEffect } from 'react';
import { contactStyles as L } from '../data/styles.js';
import { syncToFirestore } from '../services/firebase.js';
import { saveStoredInternshipApplicant, getStoredSiteConfig, subscribeToContentUpdates, initialSiteConfig } from '../data/contentPersistence.js';

export default function ContactUs() {
  const [siteConfig, setSiteConfig] = useState(() => getStoredSiteConfig());

  useEffect(() => {
    const unsubscribe = subscribeToContentUpdates(() => {
      setSiteConfig(getStoredSiteConfig());
    });
    return unsubscribe;
  }, []);

  const contact = siteConfig.contactInfo || initialSiteConfig.contactInfo;
  const social = siteConfig.socialLinks || initialSiteConfig.socialLinks;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const existing = JSON.parse(localStorage.getItem('gv_admin_leads') || '[]');
      const newLead = {
        id: 'lead-' + Date.now(),
        name: formData.name || 'Website Inquirer',
        email: formData.email || 'N/A',
        phone: formData.phone || 'N/A',
        college: 'General Inquiry',
        program: formData.subject || 'Course Inquiries & Admissions',
        message: formData.message || 'Submitted via Contact Us page',
        date: new Date().toISOString().split('T')[0],
        status: 'New'
      };
      const updated = [newLead, ...existing];
      localStorage.setItem('gv_admin_leads', JSON.stringify(updated));
      syncToFirestore('leads', updated);

      // If applying for an internship, also store in the Internship Applicants Pipeline
      if ((formData.subject || '').toLowerCase().includes('internship')) {
        saveStoredInternshipApplicant({
          id: 'intern-' + Date.now(),
          candidateName: formData.name || 'Website Inquirer',
          email: formData.email || '',
          phone: formData.phone || '',
          college: 'Engineering College',
          department: 'Engineering Student',
          cgpa: '8.5',
          internshipProgram: formData.subject || 'Engineering Internship',
          appliedDate: new Date().toISOString().split('T')[0],
          status: 'Under Review'
        });
      }
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className={L['ct-page']} style={{ minHeight: '100vh', background: '#04020a', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            CONNECT WITH US
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #c026d3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Find Us With Our<br />Updated Contact Options
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '16.5px', color: '#94a3b8', lineHeight: 1.6 }}>
            Have questions about our Mechanical CAD, Civil BIM, CNC Programming, or Engineering programs? Reach out to our admissions team at our Headquarters in Oddanchatram, Tamil Nadu.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          {/* Info Card */}
          <div style={{ padding: '36px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.7), rgba(6, 6, 24, 0.8))', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '24px', color: '#fff' }}>
              {contact.heading || 'Headquarters: Oddanchatram, Tamil Nadu'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(139,92,246,0.2)', border: '1px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📍
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Location Address</h4>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {contact.address || 'Headquarters: Oddanchatram, Tamil Nadu 624619'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(217,70,239,0.2)', border: '1px solid #d946ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📩
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Email Address</h4>
                  <a href={`mailto:${contact.email || 'gvdesigntech707@gmail.com'}`} style={{ fontSize: '14px', color: '#e879f9', textDecoration: 'none' }}>
                    {contact.email || 'gvdesigntech707@gmail.com'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(34,211,238,0.2)', border: '1px solid #22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📞
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Call or WhatsApp</h4>
                  <a href={`tel:${(contact.phone || '+91 96553 64707').replace(/[^0-9+]/g, '')}`} style={{ fontSize: '14px', color: '#22d3ee', textDecoration: 'none' }}>
                    {contact.phone || '+91 96553 64707'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(251,191,36,0.2)', border: '1px solid #fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  ⏰
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Operating Hours</h4>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {contact.operatingHoursWeekdays || 'Monday – Saturday: 9:00 AM – 7:00 PM'}<br />
                    {contact.operatingHoursSunday || 'Sunday: Prior Appointment Only'}
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 12px', color: '#cbd5e1', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Official Social Channels
                </h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}
                    >
                      <i className="fa-brands fa-youtube" style={{ fontSize: '16px' }}></i> YouTube
                    </a>
                  )}
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#ec4899', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}
                    >
                      <i className="fa-brands fa-instagram" style={{ fontSize: '16px' }}></i> Instagram
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.12)', border: '1px solid rgba(14, 165, 233, 0.3)', color: '#0ea5e9', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}
                    >
                      <i className="fa-brands fa-linkedin-in" style={{ fontSize: '16px' }}></i> LinkedIn
                    </a>
                  )}
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#3b82f6', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}
                    >
                      <i className="fa-brands fa-facebook-f" style={{ fontSize: '16px' }}></i> Facebook
                    </a>
                  )}
                  {social.whatsapp && (
                    <a
                      href={social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22c55e', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}
                    >
                      <i className="fa-brands fa-whatsapp" style={{ fontSize: '16px' }}></i> WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '36px', background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.7), rgba(4, 5, 22, 0.8))', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>
              Reach Out to GV DesignTech Today
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14.5px', marginBottom: '24px' }}>
              Fill in your details and an academic mentor will contact you within 24 hours.
            </p>

            {submitted ? (
              <div style={{ padding: '36px', textAlign: 'center', background: 'rgba(34, 211, 238, 0.1)', border: '1px solid #22d3ee', borderRadius: '16px' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>🎉</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#22d3ee', margin: '0 0 6px' }}>Message Sent!</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
                  Thank you! Our admissions coordinator will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karthik Raj"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="karthik@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>Interested Program</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none', colorScheme: 'dark' }}
                  >
                    <option value="" style={{ backgroundColor: '#0f1123', color: '#94a3b8' }}>Select a Program</option>
                    <option value="Mechanical & Automobile CAD" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>Mechanical &amp; Automobile CAD</option>
                    <option value="Civil Engineering & BIM" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>Civil Engineering &amp; BIM</option>
                    <option value="CNC Programming & CAM" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>CNC Programming &amp; CAM</option>
                    <option value="Computer Science & IT" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>Computer Science &amp; IT</option>
                    <option value="EEE / Instrumentation" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>EEE / Instrumentation</option>
                    <option value="ECE Design" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>ECE Design</option>
                    <option value="Piping (Oil & Gas)" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>Piping (Oil &amp; Gas)</option>
                    <option value="Engineering Internship" style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>Engineering Internship</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>Message / Queries</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your background or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '14px',
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Google Map Section */}
        <div
          style={{
            background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.75), rgba(8, 6, 26, 0.9))',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Header & Directions Button */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '12px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '8px' }}>
                📍 CAMPUS NAVIGATION &amp; DIRECTIONS
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px', color: '#fff' }}>
                Visit GV DesignTech Headquarters
              </h2>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#94a3b8' }}>
                {contact.mapAddress || 'Headquarters: Oddanchatram, Dindigul District, Tamil Nadu 624619, India'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={contact.mapDirectionsUrl || `https://maps.google.com/?q=${encodeURIComponent(contact.mapAddress || contact.address || 'Oddanchatram, Tamil Nadu')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span>🗺️</span> Get Directions in Google Maps →
              </a>
            </div>
          </div>

          {/* Highlights Pills Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              marginBottom: '20px'
            }}
          >
            <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🏫</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>CAD Lab &amp; Classrooms</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Workstations &amp; 3D Prototyping</div>
              </div>
            </div>
            <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🚌</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Transport Accessibility</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Near Bus Stand &amp; Railway</div>
              </div>
            </div>
            <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>💼</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Admissions Desk</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>In-Person Career Counseling</div>
              </div>
            </div>
          </div>

          {/* Google Map Iframe Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              background: '#090a16'
            }}
          >
            <iframe
              title="GV DesignTech Headquarters Map"
              src={contact.mapEmbedUrl || 'https://maps.google.com/maps?q=Oddanchatram,+Tamil+Nadu,+India&t=&z=14&ie=UTF8&iwloc=&output=embed'}
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: 'block',
                filter: 'invert(90%) hue-rotate(180deg) contrast(95%) saturate(120%)'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
