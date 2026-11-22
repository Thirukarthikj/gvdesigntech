import React from 'react';
import { summerInternStyles as H } from '../data/styles.js';

export default function SummerInternship({ onOpenModal }) {
  const roadmap = [
    { week: 'WEEK 01', title: 'Orientation & Foundation', desc: 'Python programming deep dive, computational logic, data structures, and Git collaborative workflows.' },
    { week: 'WEEK 02', title: 'Data Analysis & Problem Solving', desc: 'Exploratory data analysis with NumPy/Pandas, SQL query optimization, and data visual dashboards.' },
    { week: 'WEEK 03', title: 'Model Development', desc: 'Training machine learning models, loss optimization, cross-validation metrics, and feature selection.' },
    { week: 'WEEK 04', title: 'Project Deployment', desc: 'Packaging models with Docker and FastAPI, deploying live web demos, and portfolio presentation.' }
  ];

  const mentors = [
    { name: 'Dr. Muhaideen', role: 'Chief AI Scientist', exp: '15+ Years Experience' },
    { name: 'Saravanakumar', role: 'Principal ML Engineer', exp: 'Ex-Zoho / Senior Architect' },
    { name: 'Thiruvenkatesh', role: 'Full Stack AI Lead', exp: 'Specialist in Cloud & MLOps' },
    { name: 'Vinoth Marisan', role: 'Data Intelligence Lead', exp: 'Enterprise Big Data Specialist' }
  ];

  return (
    <div className={H['si-page']} style={{ minHeight: '100vh', background: '#f8fafc', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            SUMMER ACCELERATOR
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Build Real Skills.<br />Launch Your Career.
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto 36px', fontSize: '17px', color: '#475569', lineHeight: 1.6 }}>
            Make your vacation truly count. 4 weeks of hands-on industrial projects, live mentor feedback, verified certification, and direct hiring drive opportunities.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 38px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
          >
            Apply for Summer Cohort
          </button>
        </div>

        {/* 4-Week Roadmap */}
        <section style={{ marginBottom: '80px', padding: '40px', background: 'rgba(20, 14, 52, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '36px' }}>
            Your 4-Week Roadmap
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {roadmap.map((r, i) => (
              <div key={i} style={{ padding: '24px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#22d3ee', letterSpacing: '1px' }}>{r.week}</span>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '10px 0 8px' }}>{r.title}</h4>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mentors */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '36px' }}>
            Learn from Experienced Mentors
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {mentors.map((m, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.6), rgba(6, 6, 24, 0.7))', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  👨‍🏫
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '0 0 4px' }}>{m.name}</h4>
                <div style={{ fontSize: '13px', color: '#a78bfa', marginBottom: '4px' }}>{m.role}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{m.exp}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
