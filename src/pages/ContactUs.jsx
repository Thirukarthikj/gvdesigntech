import React, { useState } from 'react';
import { contactStyles as L } from '../data/styles.js';

export default function ContactUs() {
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
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className={L['ct-page']} style={{ minHeight: '100vh', background: '#f8fafc', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            CONNECT WITH US
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #0f172a 40%, #c026d3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Find Us With Our<br />Updated Contact Options
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '16.5px', color: '#475569', lineHeight: 1.6 }}>
            Have questions about our Mechanical CAD, Civil BIM, CNC Programming, or Engineering programs? Reach out to our admissions team at our Headquarters in Oddanchatram, Tamil Nadu.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          {/* Info Card */}
          <div style={{ padding: '36px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.7), rgba(6, 6, 24, 0.8))', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '24px', color: '#fff' }}>
              Headquarters: Oddanchatram, Tamil Nadu
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(139,92,246,0.2)', border: '1px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📍
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Location Address</h4>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    Headquarters: Oddanchatram, Tamil Nadu
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(217,70,239,0.2)', border: '1px solid #d946ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📩
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Email Address</h4>
                  <a href="mailto:gvdesigntech707@gmail.com" style={{ fontSize: '14px', color: '#e879f9', textDecoration: 'none' }}>
                    gvdesigntech707@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(34,211,238,0.2)', border: '1px solid #22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  📞
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Call or WhatsApp</h4>
                  <a href="tel:+919655364707" style={{ fontSize: '14px', color: '#22d3ee', textDecoration: 'none' }}>
                    +91 96553 64707
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(251,191,36,0.2)', border: '1px solid #fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  ⏰
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px', color: '#fff' }}>Operating Hours</h4>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    Monday – Saturday: 9:00 AM – 7:00 PM<br />Sunday: Prior Appointment Only
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '36px', background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.7), rgba(4, 5, 22, 0.8))', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>
              Reach Out to GV DesignTech Today
            </h2>
            <p style={{ color: '#475569', fontSize: '14.5px', marginBottom: '24px' }}>
              Fill in your details and an academic mentor will contact you within 24 hours.
            </p>

            {submitted ? (
              <div style={{ padding: '36px', textAlign: 'center', background: 'rgba(34, 211, 238, 0.1)', border: '1px solid #22d3ee', borderRadius: '16px' }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>🎉</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#22d3ee', margin: '0 0 6px' }}>Message Sent!</h3>
                <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
                  Thank you! Our admissions coordinator will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karthik Raj"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="karthik@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Interested Program</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
                  >
                    <option value="">Select a Program</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Student Internship">Student Internship</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Message / Queries</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your background or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none', resize: 'vertical' }}
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
      </div>
    </div>
  );
}
