import React, { useState } from 'react';
import { placementStyles as G } from '../data/styles.js';

export default function FlagshipPlacement({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { target: '500+', label: 'Students Placed' },
    { target: '150+', label: 'Hiring Partners' },
    { target: '98%', label: 'Placement Rate' },
    { target: '₹7.5L', label: 'Highest Package' },
    { target: '₹5.2L', label: 'Average Package' }
  ];

  const steps = [
    { title: 'Explore', desc: 'Assess strengths, choose target technology tracks, and define personal career goals.' },
    { title: 'Prepare', desc: 'Build foundational and advanced domain expertise through live laboratory projects.' },
    { title: 'Practice', desc: 'Simulate coding tests, system architecture interviews, and behavioral HR rounds.' },
    { title: 'Interview', desc: 'Direct referral pipelines to 150+ corporate partners and MNC recruitment drives.' },
    { title: 'Get Hired', desc: 'Negotiate offers with confidence and onboard smoothly into junior to senior roles.' }
  ];

  const pillars = [
    { title: 'Resume Building', desc: 'Transform academic projects into professional impact-driven achievements.' },
    { title: 'Mock Interviews', desc: 'Real-time 1-on-1 simulations with senior engineers from top MNCs.' },
    { title: 'Aptitude Training', desc: 'Quantitative problem solving, pattern deduction, and logical reasoning.' },
    { title: 'Communication Coaching', desc: 'Master executive presence, client presentations, and technical storytelling.' },
    { title: 'Technical Training', desc: 'In-depth algorithms, data structures, full stack frameworks, and AI.' },
    { title: 'HR Preparation', desc: 'Master cultural fitment, compensation discussions, and situational answers.' },
    { title: 'LinkedIn Optimization', desc: 'Boost inbound recruiter reach with tailored profile keywords.' },
    { title: 'Portfolio Building', desc: 'Deploy live projects with clean documentation, GitHub repos, and demo URLs.' },
    { title: 'ATS Optimization', desc: 'Format resumes to bypass automated screening filters with 90%+ match scores.' }
  ];

  const stories = [
    { name: 'Thiruvenkatesh', role: 'Data Scientist @ Top Analytics MNC', pkg: '7.2 LPA', quote: 'The real-world projects and mock interview simulations at PyBot gave me the exact skills needed to clear all rounds in one attempt.' },
    { name: 'Jeya Kutty', role: 'Full Stack Engineer @ Tech Startup', pkg: '6.5 LPA', quote: 'From zero coding background to deploying full stack Django applications — the mentors at PyBot are exceptional.' },
    { name: 'Revathi', role: 'ML Engineer @ Enterprise AI Lab', pkg: '7.0 LPA', quote: 'The deep learning curriculum with PyTorch and NLP was cutting-edge. I got 3 job offers within two months of graduation.' }
  ];

  return (
    <div className={G.placementPage} style={{ minHeight: '100vh', background: '#050816', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            CAREER ECOSYSTEM
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Your Career Mission Starts Here
          </h1>
          <p style={{ maxWidth: '740px', margin: '0 auto 36px', fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
            Transform from student to industry-ready professional with PYBOT's comprehensive placement ecosystem, corporate hiring drives, and individualized mentoring.
          </p>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {stats.map((s, idx) => (
              <div key={idx} style={{ padding: '20px', background: 'rgba(30, 22, 68, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#22d3ee', marginBottom: '4px' }}>{s.target}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 38px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
          >
            Register for Placement Drive
          </button>
        </div>

        {/* Placement Journey */}
        <section style={{ marginBottom: '80px', padding: '40px', background: 'rgba(20, 14, 52, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '36px' }}>
            Your Placement Journey
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {steps.map((st, i) => (
              <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#d946ef', letterSpacing: '1px' }}>STAGE 0{i + 1}</span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '8px 0 6px' }}>{st.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Students Get Hired */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>
            Why Students Get Hired
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {pillars.map((p, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.5), rgba(6, 6, 24, 0.6))', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '36px' }}>
            Student Success Stories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {stories.map((s, idx) => (
              <div key={idx} style={{ padding: '28px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.7), rgba(6, 6, 24, 0.8))', border: '1px solid rgba(217, 70, 239, 0.3)', borderRadius: '20px' }}>
                <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px' }}>
                  "{s.quote}"
                </p>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 4px' }}>{s.name}</h4>
                  <div style={{ fontSize: '13px', color: '#22d3ee', marginBottom: '4px' }}>{s.role}</div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#e879f9' }}>Package: {s.pkg}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
