import React from 'react';
import { dsInternStyles as W } from '../data/styles.js';

export default function DataScienceInternship({ onOpenModal }) {
  const highlights = [
    { title: 'Data Cleaning & Transformation', desc: 'Handle missing values, outliers, automated imputation, and normalization.' },
    { title: 'Advanced Predictive Models', desc: 'Deploy Random Forest, Gradient Boosting, and XGBoost on real data.' },
    { title: 'Interactive BI Dashboards', desc: 'Build live reporting dashboards in Power BI and stream real-time metrics.' },
    { title: 'End-to-End Capstone', desc: 'Deploy a containerized analytics microservice with FastAPI.' }
  ];

  return (
    <div className={W.dsPage} style={{ minHeight: '100vh', background: '#050816', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            DATA SCIENCE INTERNSHIP
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Data Science Internship Program
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto 36px', fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
            Immerse yourself in full-lifecycle data science. Clean raw datasets, train state-of-the-art predictive algorithms, and deploy live analytics solutions.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 38px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
          >
            Apply for DS Internship
          </button>
        </div>

        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ padding: '24px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.6), rgba(6, 6, 24, 0.7))', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{h.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
