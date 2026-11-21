import React from 'react';
import { Link } from 'react-router-dom';

export default function PybotVideo() {
  return (
    <div style={{ minHeight: '100vh', background: '#050816', color: '#fff', padding: '140px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
          PYBOT ACADEMY SHOWCASE
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', lineHeight: 1.2, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Watch How We Shape the Future of AI Education
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto 40px', fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
          Take a guided virtual tour through our modern training laboratories, hands-on project reviews, hackathon arenas, and placement mentorship sessions in Pollachi, Coimbatore.
        </p>

        {/* Video Player Box */}
        <div style={{ width: '100%', height: '480px', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.9), rgba(6, 6, 24, 0.95))', border: '1px solid rgba(217, 70, 239, 0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.7)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A"
            title="PyBot AI Academy Showcase Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ border: 'none' }}
          ></iframe>
        </div>

        <div style={{ marginTop: '40px' }}>
          <Link
            to="/"
            style={{
              padding: '12px 28px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '600'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
