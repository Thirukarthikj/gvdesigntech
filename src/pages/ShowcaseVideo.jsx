import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredSiteConfig, subscribeToContentUpdates } from '../data/contentPersistence.js';
import { isVideoFile, formatVideoEmbedUrl } from '../data/videoUtils.js';

export default function ShowcaseVideo() {
  const [siteConfig, setSiteConfig] = useState(() => getStoredSiteConfig());

  useEffect(() => {
    return subscribeToContentUpdates(() => {
      setSiteConfig(getStoredSiteConfig());
    });
  }, []);

  const video = siteConfig.demoVideo || {};

  return (
    <div style={{ minHeight: '100vh', background: '#04020a', color: '#fff', padding: '140px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <div style={{ maxWidth: '960px', width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
          GV DESIGNTECH SHOWCASE
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', lineHeight: 1.2, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {video.title || 'Watch How We Shape the Future of CAD & Engineering Design Education'}
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto 40px', fontSize: '16px', color: '#94a3b8', lineHeight: 1.6 }}>
          {video.description || 'Take a guided virtual tour through our state-of-the-art CAD workstations, hands-on 3D printing & prototyping labs, BIM coordination studios, and placement training sessions at GV DesignTech.'}
        </p>

        {/* Video Player Box */}
        <div style={{ width: '100%', height: '480px', borderRadius: '24px', overflow: 'hidden', background: '#000', border: '1px solid rgba(217, 70, 239, 0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.7)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isVideoFile(video.videoUrl) ? (
            <video
              controls
              playsInline
              src={video.videoUrl}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={formatVideoEmbedUrl(video.videoUrl || 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A')}
              title={video.title || 'GV DesignTech Showcase Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 'none' }}
            ></iframe>
          )}
        </div>

        <div style={{ marginTop: '40px' }}>
          <Link
            to="/"
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '600',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.35)'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
