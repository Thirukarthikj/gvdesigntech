import React from 'react';
import { collegeInternStyles as U } from '../data/styles.js';

export default function CollegeInternship({ onOpenModal }) {
  const tracks = [
    { title: 'Computer Science & IT', topics: 'Full Stack Web, Python, Cloud Databases, AI Integrations' },
    { title: 'ECE & Telecommunication', topics: 'Embedded AI, Edge Computing, Signal Processing, IoT Systems' },
    { title: 'EEE & Robotics', topics: 'Robotic Process Automation, Predictive Power Analytics, Sensor Telemetry' },
    { title: 'Mechanical & Civil', topics: 'Computational Modeling, CAD Python Automation, Structural Analytics' }
  ];

  return (
    <div className={U['ci-page']} style={{ minHeight: '100vh', background: '#04020a', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(57, 208, 255, 0.15)', border: '1px solid rgba(57, 208, 255, 0.4)', borderRadius: '999px', color: '#39d0ff', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            ACADEMIC ACCREDITED INTERNSHIP
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            College Internship Program
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto 36px', fontSize: '17px', color: '#94a3b8', lineHeight: 1.6 }}>
            Designed specifically for engineering and technology students fulfilling mandatory university internship credits. Complete real industrial projects in CAD, BIM, and Software with verified certificates and mentor sign-offs.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 38px', background: 'linear-gradient(135deg, #39d0ff, #8b5cf6)', border: 'none', borderRadius: '12px', color: '#020412', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
          >
            Apply for College Batch
          </button>
        </div>

        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>
            Department Specialized Tracks
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {tracks.map((t, idx) => (
              <div key={idx} style={{ padding: '28px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.6), rgba(6, 6, 24, 0.7))', border: '1px solid rgba(57, 208, 255, 0.3)', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>{t.title}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{t.topics}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
