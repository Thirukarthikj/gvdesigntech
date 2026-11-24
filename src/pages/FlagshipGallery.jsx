import React, { useState, useEffect, useRef } from 'react';
import { getStoredGallery } from '../data/contentPersistence.js';

export default function FlagshipGallery({ onOpenModal }) {
  const [galleryList, setGalleryList] = useState(() => getStoredGallery());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleUpdate = () => setGalleryList(getStoredGallery());
    window.addEventListener('gv_content_updated', handleUpdate);
    return () => window.removeEventListener('gv_content_updated', handleUpdate);
  }, []);

  // Background dynamic star & grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(217, 70, 239, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.16 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const categories = [
    { key: 'all', label: 'All Moments' },
    { key: 'workshops', label: 'Workshops & Seminars' },
    { key: 'internships', label: 'Internships' },
    { key: 'labs', label: 'CAD Labs' },
    { key: 'projects', label: 'Project Reviews' }
  ];

  const filtered = selectedCategory === 'all'
    ? galleryList
    : galleryList.filter((item) => (item.category || '').toLowerCase() === selectedCategory);

  return (
    <div className="gallery-page" style={{ position: 'relative', minHeight: '100vh', background: '#04020a', color: '#fff', padding: '140px 24px 80px', overflowX: 'hidden' }}>
      {/* Background Star Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.12)', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '18px' }}>
            <span>📸</span>
            <span>GV DESIGNTECH LIFE &amp; MOMENTS</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 30%, #c084fc 70%, #d946ef 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Capturing Real Milestones of Engineering Innovation
          </h1>
          <p style={{ maxWidth: '740px', margin: '0 auto 30px', fontSize: '16.5px', color: '#94a3b8', lineHeight: 1.6 }}>
            Explore genuine classroom training sessions, high-tech CAD workstations, university guest lectures, project reviews, and student cohort milestones at GV DesignTech.
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCategory(c.key)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: selectedCategory === c.key ? '#d946ef' : 'rgba(255,255,255,0.15)',
                  background: selectedCategory === c.key ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255,255,255,0.04)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: selectedCategory === c.key ? '0 4px 18px rgba(217, 70, 239, 0.35)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '26px', marginBottom: '80px' }}>
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setActiveItem(item)}
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                background: 'linear-gradient(160deg, rgba(25, 18, 55, 0.75), rgba(7, 7, 22, 0.85))',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                cursor: 'pointer',
                transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.6)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(217, 70, 239, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(4, 2, 10, 0.85) 100%)', pointerEvents: 'none' }}></div>
                <span style={{ position: 'absolute', top: '12px', right: '12px', padding: '5px 12px', background: 'rgba(4, 2, 12, 0.82)', border: '1px solid rgba(217, 70, 239, 0.55)', borderRadius: '999px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#f472b6', backdropFilter: 'blur(6px)', letterSpacing: '0.5px' }}>
                  {item.tag || item.category}
                </span>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '0 0 8px', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', margin: '0 0 16px', lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#c084fc' }}>
                  <span>View Full Photo</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            onClick={() => setActiveItem(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(3, 2, 10, 0.92)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '92vw',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                style={{
                  position: 'absolute',
                  top: '-46px',
                  right: '0',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                ✕
              </button>

              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '74vh',
                  borderRadius: '16px',
                  border: '2px solid rgba(217, 70, 239, 0.65)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
                  objectFit: 'contain'
                }}
              />

              <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '700px' }}>
                <div style={{ display: 'inline-block', padding: '3px 12px', background: 'rgba(217, 70, 239, 0.2)', border: '1px solid rgba(217, 70, 239, 0.45)', borderRadius: '999px', fontSize: '12px', fontWeight: '700', color: '#f472b6', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {activeItem.tag || activeItem.category}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: '0 0 6px' }}>
                  {activeItem.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '52px 32px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.2))', border: '1px solid rgba(217, 70, 239, 0.38)', borderRadius: '24px', backdropFilter: 'blur(10px)', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '12px', color: '#fff' }}>
            Experience Practical CAD Training with GV DesignTech
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '28px', fontSize: '16px', maxWidth: '640px', margin: '0 auto 28px' }}>
            Gain hands-on skills, authorized software certifications, and dedicated placement support with direct recruitment partners.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 38px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)', transition: 'transform 0.2s ease' }}
          >
            Apply for Next Training Batch
          </button>
        </div>
      </div>
    </div>
  );
}
