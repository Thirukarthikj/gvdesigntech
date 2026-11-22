import React from 'react';
import { mouStyles as yb } from '../data/styles.js';
import { mouList } from '../data/mous.js';

export default function FlagshipMou({ onOpenModal }) {
  return (
    <div className={yb['mou-page']}>
      {/* Hero */}
      <section style={{ padding: '140px 24px 70px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1.2px', marginBottom: '20px' }}>
            OFFICIAL PARTNERSHIPS
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 20px', color: '#fff' }}>
            Memorandum of<br /><span style={{ background: 'linear-gradient(135deg, #a78bfa, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Understanding</span>
          </h1>
          <p style={{ maxWidth: '720px', margin: '0 auto 36px', fontSize: '17px', lineHeight: 1.6, color: '#475569' }}>
            Bridging academia and the artificial intelligence industry through collaborative curriculum design, certified student internships, state-of-the-art incubation labs, and dedicated campus hiring drives.
          </p>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#39d0ff' }}>500+</div>
              <div style={{ fontSize: '13px', color: '#475569' }}>Partner Institutions</div>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }}></div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#a78bfa' }}>10,000+</div>
              <div style={{ fontSize: '13px', color: '#475569' }}>Students Benefited</div>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }}></div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#d946ef' }}>100%</div>
              <div style={{ fontSize: '13px', color: '#475569' }}>Placement Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* MOU Cards Grid */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>
            Our MOUs Signed
          </h2>
          <p style={{ color: '#475569', fontSize: '15px' }}>
            Empowering top colleges and universities across Tamil Nadu and beyond
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {mouList.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '24px',
                background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.7), rgba(4, 5, 22, 0.8))',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ padding: '4px 12px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', fontSize: '12px', fontWeight: '700', color: '#f472b6' }}>
                  {item.tag || 'MOU Signed'}
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.date}</span>
              </div>

              {item.img && (
                <div style={{ width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden', background: '#0a081e' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '0 0 6px' }}>{item.name}</h3>
                <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
