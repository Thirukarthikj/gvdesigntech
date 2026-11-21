import React, { useState } from 'react';
import { galleryItems } from '../data/gallery.js';

export default function FlagshipGallery({ onOpenModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const categories = [
    { key: 'all', label: 'All Moments' },
    { key: 'internships', label: 'Internships' },
    { key: 'workshops', label: 'Workshops' },
    { key: 'placements', label: 'Placements' },
    { key: 'hackathons', label: 'Hackathons' }
  ];

  const filtered = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => (item.category || '').toLowerCase() === selectedCategory);

  return (
    <div className="gallery-page" style={{ minHeight: '100vh', background: '#050816', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            PYBOT MOMENTS
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Capturing Every Milestone of Innovation
          </h1>
          <p style={{ maxWidth: '720px', margin: '0 auto 32px', fontSize: '16.5px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
            Highlighting internships, workshops, placements, hackathons, certifications, industrial visits, and student celebrations at PyBot AI Academy.
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCategory(c.key)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: selectedCategory === c.key ? '#d946ef' : 'rgba(255,255,255,0.15)',
                  background: selectedCategory === c.key ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxImg(item.image)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.7), rgba(6, 6, 24, 0.8))',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, border-color 0.25s ease'
              }}
            >
              <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.image || `/assets/recent-activity/ai-workshop-2.jpg`}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onError={(e) => {
                    e.target.src = '/assets/recent-activity/ai-workshop-2.jpg';
                  }}
                />
                <span style={{ position: 'absolute', top: '10px', right: '10px', padding: '4px 10px', background: 'rgba(2, 4, 18, 0.75)', border: '1px solid rgba(217, 70, 239, 0.5)', borderRadius: '999px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#e879f9' }}>
                  {item.category}
                </span>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 6px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.45 }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <img
              src={lightboxImg}
              alt="Enlarged"
              style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '16px', border: '2px solid rgba(217,70,239,0.7)' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '48px', background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(217,70,239,0.18))', border: '1px solid rgba(217,70,239,0.35)', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            Become Part of the Next PYBOT Success Story
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
            Gain hands-on skills, verified certificates, and direct access to top tech hiring partners.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 34px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
          >
            Join Our Next Batch
          </button>
        </div>
      </div>
    </div>
  );
}
