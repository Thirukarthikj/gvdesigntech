import React, { useState } from 'react';
import { getStoredSiteConfig, saveStoredSiteConfig, initialSiteConfig } from '../../data/contentPersistence.js';
import { uploadImageToCloudinary, compressImageFile } from '../../services/cloudinaryService.js';

export default function AdminHomeCustomizer() {
  const [config, setConfig] = useState(() => getStoredSiteConfig());
  const [activeTab, setActiveTab] = useState('demoVideo'); // 'demoVideo' | 'recentActivity' | 'stats' | 'showcaseImages'
  const [toast, setToast] = useState('');
  const [uploading, setUploading] = useState(false);

  // New activity slide temporary form
  const [newSlide, setNewSlide] = useState({ src: '', alt: '' });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleSaveAll = (updatedConfig) => {
    const toSave = updatedConfig || config;
    setConfig(toSave);
    saveStoredSiteConfig(toSave);
    showToast('✨ Changes saved and synced across website and MongoDB!');
  };

  // Image upload helper
  const handleFileUpload = async (e, onComplete) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploading(true);
    try {
      const localData = await compressImageFile(file);
      onComplete(localData);

      const result = await uploadImageToCloudinary(file, { folder: 'gvdesigntech/customizer' });
      if (result && result.isCloudinary) {
        onComplete(result.url);
        showToast('☁️ Uploaded to Cloudinary CDN successfully!');
      } else {
        showToast('✓ Photo ready to save!');
      }
    } catch (err) {
      console.warn('Upload fallback to local image:', err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          padding: '14px 22px',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '14px',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <span>{toast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '24px' }}>✨</span>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: 0 }}>
            Home Page &amp; Showcase Customizer
          </h1>
        </div>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
          Configure the Watch Demo video, floating Recent Activities widget, Key Impact statistics, and Training Environment showcase photos in real time.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '12px',
        marginBottom: '28px',
        overflowX: 'auto'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('demoVideo')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'demoVideo' ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'demoVideo' ? '#fff' : '#94a3b8',
            border: activeTab === 'demoVideo' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>🎬</span>
          <span>Watch Demo Video</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('recentActivity')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'recentActivity' ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'recentActivity' ? '#fff' : '#94a3b8',
            border: activeTab === 'recentActivity' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>⚡</span>
          <span>Recent Activities</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'stats' ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'stats' ? '#fff' : '#94a3b8',
            border: activeTab === 'stats' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>📈</span>
          <span>Impact Numbers &amp; Stats</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('showcaseImages')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'showcaseImages' ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'showcaseImages' ? '#fff' : '#94a3b8',
            border: activeTab === 'showcaseImages' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>🏫</span>
          <span>Classroom &amp; Lab Photos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('enrollModal')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'enrollModal' ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'enrollModal' ? '#fff' : '#94a3b8',
            border: activeTab === 'enrollModal' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>📝</span>
          <span>Enroll Form &amp; Offer Banner</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: WATCH DEMO VIDEO
          ======================================================== */}
      {activeTab === 'demoVideo' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>🎬</span>
              <span>Watch Demo Video Configuration</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Played when visitors click "Watch Demo" on Home &amp; on /showcase-video
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
            <div className="admin-form-group">
              <label className="admin-label">
                Video Embed / Stream URL <span style={{ color: '#d946ef' }}>*</span>
              </label>
              <input
                type="text"
                className="admin-input"
                required
                placeholder="https://www.youtube-nocookie.com/embed/... or direct MP4 link"
                value={config.demoVideo?.videoUrl || ''}
                onChange={(e) => setConfig({
                  ...config,
                  demoVideo: { ...config.demoVideo, videoUrl: e.target.value }
                })}
              />
              <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', display: 'block' }}>
                Tip: Paste YouTube embed link (e.g. https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID) or direct video URL.
              </span>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Headline / Title</label>
              <input
                type="text"
                className="admin-input"
                value={config.demoVideo?.title || ''}
                onChange={(e) => setConfig({
                  ...config,
                  demoVideo: { ...config.demoVideo, title: e.target.value }
                })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Tour Description</label>
              <textarea
                className="admin-input"
                rows={3}
                value={config.demoVideo?.description || ''}
                onChange={(e) => setConfig({
                  ...config,
                  demoVideo: { ...config.demoVideo, description: e.target.value }
                })}
              />
            </div>

            {/* Live Video Preview Box */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc', marginBottom: '12px' }}>
                📺 LIVE VIDEO PREVIEW
              </div>
              <div style={{ width: '100%', height: '360px', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={config.demoVideo?.videoUrl || 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A'}
                  title="Demo Video Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleSaveAll({ ...config, demoVideo: initialSiteConfig.demoVideo })}
              >
                Reset to Default
              </button>
              <button type="submit" className="admin-btn-primary">
                Save Video Configuration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          TAB 2: RECENT ACTIVITIES WIDGET
          ======================================================== */}
      {activeTab === 'recentActivity' && (
        <div>
          {/* Card Config */}
          <div className="admin-card" style={{ marginBottom: '24px' }}>
            <div className="admin-card-header">
              <h3 className="admin-card-title">
                <span>⚡</span>
                <span>Floating Card Settings</span>
              </h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Badge Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.recentActivity?.badge || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      recentActivity: { ...config.recentActivity, badge: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Card Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.recentActivity?.title || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      recentActivity: { ...config.recentActivity, title: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-label">Card Subtitle / Description</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.recentActivity?.desc || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      recentActivity: { ...config.recentActivity, desc: e.target.value }
                    })}
                  />
                </div>
              </div>

              {/* Thumbnail image */}
              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label className="admin-label">Thumbnail Image (Shown on bottom-right floating pill)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#000', border: '1px solid rgba(217, 70, 239, 0.4)', flexShrink: 0 }}>
                    <img
                      src={config.recentActivity?.thumb || '/assets/recent-activity/ai-workshop-2.jpg'}
                      alt="Thumbnail Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Image URL or upload file below"
                      value={config.recentActivity?.thumb || ''}
                      onChange={(e) => setConfig({
                        ...config,
                        recentActivity: { ...config.recentActivity, thumb: e.target.value }
                      })}
                      style={{ marginBottom: '8px' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => {
                        setConfig(prev => ({
                          ...prev,
                          recentActivity: { ...prev.recentActivity, thumb: url }
                        }));
                      })}
                      style={{ fontSize: '12px', color: '#94a3b8' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="submit" className="admin-btn-primary">
                  Save Card Settings
                </button>
              </div>
            </form>
          </div>

          {/* Activity Carousel Slides */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">
                <span>🖼️</span>
                <span>Interactive 3D Carousel Slides ({config.recentActivity?.items?.length || 0})</span>
              </h3>
            </div>

            {/* List of current slides */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {(config.recentActivity?.items || []).map((item, idx) => (
                <div
                  key={item.id || idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ width: '100%', height: '150px', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{item.alt || `Slide ${idx + 1}`}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', wordBreak: 'break-all' }}>{item.src}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedItems = (config.recentActivity?.items || []).filter((_, i) => i !== idx);
                      const updated = {
                        ...config,
                        recentActivity: { ...config.recentActivity, items: updatedItems }
                      };
                      handleSaveAll(updated);
                    }}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Remove Slide
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Slide Form */}
            <div style={{ padding: '20px', background: 'rgba(139, 92, 246, 0.08)', border: '1px dashed rgba(139, 92, 246, 0.4)', borderRadius: '16px' }}>
              <h4 style={{ margin: '0 0 14px', color: '#c084fc', fontSize: '15px', fontWeight: '700' }}>
                + Add New Activity Photo Slide
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Slide Caption / Alt Description</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Hands-on Robotic Arm Assembly Workshop"
                    value={newSlide.alt}
                    onChange={(e) => setNewSlide({ ...newSlide, alt: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Image URL or Upload</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Enter image URL"
                    value={newSlide.src}
                    onChange={(e) => setNewSlide({ ...newSlide, src: e.target.value })}
                    style={{ marginBottom: '6px' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => setNewSlide(prev => ({ ...prev, src: url })))}
                    style={{ fontSize: '12px', color: '#94a3b8' }}
                  />
                </div>
              </div>

              {newSlide.src && (
                <div style={{ marginTop: '12px', width: '120px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={newSlide.src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  className="admin-btn-primary"
                  disabled={!newSlide.src || uploading}
                  onClick={() => {
                    if (!newSlide.src) return;
                    const newItem = {
                      id: Date.now(),
                      src: newSlide.src,
                      alt: newSlide.alt || 'GV DesignTech Recent Activity'
                    };
                    const updatedItems = [...(config.recentActivity?.items || []), newItem];
                    const updated = {
                      ...config,
                      recentActivity: { ...config.recentActivity, items: updatedItems }
                    };
                    handleSaveAll(updated);
                    setNewSlide({ src: '', alt: '' });
                  }}
                >
                  {uploading ? 'Processing Image...' : '+ Add Slide to Carousel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: KEY IMPACT NUMBERS & STATS (4th image)
          ======================================================== */}
      {activeTab === 'stats' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>📈</span>
              <span>Key Impact Numbers &amp; Statistics Counter</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Displayed on Home page Section 4 with animated counting
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
              {(config.stats || []).map((st, idx) => (
                <div
                  key={st.id || idx}
                  style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', marginBottom: '12px' }}>
                    STAT CARD #{idx + 1}
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Numeric Target Value</label>
                    <input
                      type="number"
                      className="admin-input"
                      required
                      value={st.count}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        const updatedStats = [...config.stats];
                        updatedStats[idx] = { ...updatedStats[idx], count: val };
                        setConfig({ ...config, stats: updatedStats });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Suffix Symbol (e.g. + or %)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={st.suffix || '+'}
                      onChange={(e) => {
                        const updatedStats = [...config.stats];
                        updatedStats[idx] = { ...updatedStats[idx], suffix: e.target.value };
                        setConfig({ ...config, stats: updatedStats });
                      }}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Description / Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      required
                      value={st.title || ''}
                      onChange={(e) => {
                        const updatedStats = [...config.stats];
                        updatedStats[idx] = { ...updatedStats[idx], title: e.target.value };
                        setConfig({ ...config, stats: updatedStats });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Live Preview of Stats Grid */}
            <div style={{ marginTop: '28px', padding: '24px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', marginBottom: '16px', letterSpacing: '1px' }}>
                👀 LIVE WEBSITE PREVIEW
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'center' }}>
                {(config.stats || []).map((st, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '32px', fontWeight: '900', color: '#c084fc', marginBottom: '6px' }}>
                      {st.count}{st.suffix || '+'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>
                      {st.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleSaveAll({ ...config, stats: initialSiteConfig.stats })}
              >
                Reset to Defaults
              </button>
              <button type="submit" className="admin-btn-primary">
                Save Statistics
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          TAB 4: CLASSROOM & LAB SHOWCASE IMAGES (5th image)
          ======================================================== */}
      {activeTab === 'showcaseImages' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>🏫</span>
              <span>Training Environment Classroom &amp; Lab Photos</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Displayed on Home page Section 6 in the interactive training environment gallery
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Photo 1 */}
              <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#c084fc', marginBottom: '12px' }}>
                  PHOTO 1 (Lab Classroom Overview)
                </div>

                <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', background: '#000', marginBottom: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <img
                    src={config.showcaseImages?.image1 || '/assets/cad-lab-classroom.jpg'}
                    alt={config.showcaseImages?.alt1 || 'Classroom'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Image URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.showcaseImages?.image1 || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      showcaseImages: { ...config.showcaseImages, image1: e.target.value }
                    })}
                    placeholder="Enter image URL"
                    style={{ marginBottom: '8px' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => {
                      setConfig(prev => ({
                        ...prev,
                        showcaseImages: { ...prev.showcaseImages, image1: url }
                      }));
                    })}
                    style={{ fontSize: '12px', color: '#94a3b8' }}
                  />
                </div>

                <div className="admin-form-group" style={{ marginTop: '12px' }}>
                  <label className="admin-label">Alt / Caption Description</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.showcaseImages?.alt1 || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      showcaseImages: { ...config.showcaseImages, alt1: e.target.value }
                    })}
                  />
                </div>
              </div>

              {/* Photo 2 */}
              <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#c084fc', marginBottom: '12px' }}>
                  PHOTO 2 (Students CAD Modeling Lab)
                </div>

                <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', background: '#000', marginBottom: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <img
                    src={config.showcaseImages?.image2 || '/assets/cad-lab-students.jpg'}
                    alt={config.showcaseImages?.alt2 || 'Students'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Image URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.showcaseImages?.image2 || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      showcaseImages: { ...config.showcaseImages, image2: e.target.value }
                    })}
                    placeholder="Enter image URL"
                    style={{ marginBottom: '8px' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => {
                      setConfig(prev => ({
                        ...prev,
                        showcaseImages: { ...prev.showcaseImages, image2: url }
                      }));
                    })}
                    style={{ fontSize: '12px', color: '#94a3b8' }}
                  />
                </div>

                <div className="admin-form-group" style={{ marginTop: '12px' }}>
                  <label className="admin-label">Alt / Caption Description</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.showcaseImages?.alt2 || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      showcaseImages: { ...config.showcaseImages, alt2: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleSaveAll({ ...config, showcaseImages: initialSiteConfig.showcaseImages })}
              >
                Reset to Defaults
              </button>
              <button type="submit" className="admin-btn-primary">
                Save Showcase Photos
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          TAB 5: ENROLL MODAL & OFFER BANNER
          ======================================================== */}
      {activeTab === 'enrollModal' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>📝</span>
              <span>Enroll Now Modal &amp; Offer Banner Customizer</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Displayed on the website when visitors click "Get Started Now", "Enroll Now", or course enrollment buttons
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
            {/* Modal Heading Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Modal Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={config.enrollModal?.title || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    enrollModal: { ...config.enrollModal, title: e.target.value }
                  })}
                  placeholder="e.g. Enroll Now"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Modal Subtitle</label>
                <input
                  type="text"
                  className="admin-input"
                  value={config.enrollModal?.subtitle || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    enrollModal: { ...config.enrollModal, subtitle: e.target.value }
                  })}
                  placeholder="e.g. Start your journey with GV DesignTech"
                />
              </div>
            </div>

            {/* Offer Banner Card */}
            <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(217, 70, 239, 0.3)', borderRadius: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#f472b6' }}>
                  🎁 PROMOTIONAL OFFER BANNER &amp; BADGE IMAGE
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#fff', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={config.enrollModal?.showOffer !== false}
                    onChange={(e) => setConfig({
                      ...config,
                      enrollModal: { ...config.enrollModal, showOffer: e.target.checked }
                    })}
                    style={{ width: '18px', height: '18px', accentColor: '#d946ef', cursor: 'pointer' }}
                  />
                  <span>Show Offer Banner on Modal</span>
                </label>
              </div>

              {/* Offer Badge Image & Text */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">
                    Badge Logo / Icon Image
                  </label>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #d946ef', flexShrink: 0 }}>
                      {config.enrollModal?.offerBadgeImage ? (
                        <img
                          src={config.enrollModal.offerBadgeImage}
                          alt="Offer Badge"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
                          <strong style={{ display: 'block', fontSize: '12px', color: '#b91c1c' }}>{config.enrollModal?.offerBadgeText || 'EMI'}</strong>
                          <span style={{ fontSize: '9px', fontWeight: '800', color: '#334155' }}>{config.enrollModal?.offerBadgeSub || 'OFFER'}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Image URL or upload file below"
                        value={config.enrollModal?.offerBadgeImage || ''}
                        onChange={(e) => setConfig({
                          ...config,
                          enrollModal: { ...config.enrollModal, offerBadgeImage: e.target.value }
                        })}
                        style={{ marginBottom: '6px' }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => {
                          setConfig(prev => ({
                            ...prev,
                            enrollModal: { ...prev.enrollModal, offerBadgeImage: url }
                          }));
                        })}
                        style={{ fontSize: '12px', color: '#94a3b8' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Badge Text Fallback (if no image)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. EMI"
                      value={config.enrollModal?.offerBadgeText || ''}
                      onChange={(e) => setConfig({
                        ...config,
                        enrollModal: { ...config.enrollModal, offerBadgeText: e.target.value }
                      })}
                    />
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. OFFER"
                      value={config.enrollModal?.offerBadgeSub || ''}
                      onChange={(e) => setConfig({
                        ...config,
                        enrollModal: { ...config.enrollModal, offerBadgeSub: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Offer Content */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Offer Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.enrollModal?.offerTitle || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      enrollModal: { ...config.enrollModal, offerTitle: e.target.value }
                    })}
                    placeholder="e.g. 🪔 Instant Installment Offer"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Offer Subtitle / Details</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.enrollModal?.offerSub || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      enrollModal: { ...config.enrollModal, offerSub: e.target.value }
                    })}
                    placeholder="e.g. Diwali Special · Pay your course fee in installments"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Countdown Duration (Minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    className="admin-input"
                    value={config.enrollModal?.offerMinutes || 2}
                    onChange={(e) => setConfig({
                      ...config,
                      enrollModal: { ...config.enrollModal, offerMinutes: parseInt(e.target.value, 10) || 2 }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Submit Button CTA Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={config.enrollModal?.buttonText || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      enrollModal: { ...config.enrollModal, buttonText: e.target.value }
                    })}
                    placeholder="e.g. Join Us or Enroll Now"
                  />
                </div>
              </div>
            </div>

            {/* Live Visual Preview of Enroll Modal */}
            <div style={{ padding: '24px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', marginBottom: '16px', letterSpacing: '1px' }}>
                👀 LIVE ENROLL MODAL PREVIEW
              </div>

              <div style={{ maxWidth: '420px', margin: '0 auto', background: '#0e0924', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '20px', padding: '22px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                    {config.enrollModal?.title || 'Enroll Now'}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
                    {config.enrollModal?.subtitle || 'Start your journey with GV DesignTech'}
                  </p>
                </div>

                {/* Offer Banner */}
                {config.enrollModal?.showOffer !== false && (
                  <div style={{
                    background: 'linear-gradient(135deg, #ef4444, #f97316)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
                  }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {config.enrollModal?.offerBadgeImage ? (
                        <img
                          src={config.enrollModal.offerBadgeImage}
                          alt="Badge Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', lineHeight: 1 }}>
                          <strong style={{ display: 'block', fontSize: '10px', color: '#b91c1c' }}>{config.enrollModal?.offerBadgeText || 'EMI'}</strong>
                          <span style={{ fontSize: '7.5px', fontWeight: '800', color: '#334155' }}>{config.enrollModal?.offerBadgeSub || 'OFFER'}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {config.enrollModal?.offerTitle || '🪔 Instant Installment Offer'}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {config.enrollModal?.offerSub || 'Diwali Special · Pay your course fee in installments'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                      <div style={{ background: '#7f1d1d', borderRadius: '4px', padding: '2px 4px', fontSize: '11px', fontWeight: '800', color: '#fff' }}>01</div>
                      <span style={{ color: '#fff', fontSize: '10px' }}>:</span>
                      <div style={{ background: '#7f1d1d', borderRadius: '4px', padding: '2px 4px', fontSize: '11px', fontWeight: '800', color: '#fff' }}>52</div>
                    </div>
                  </div>
                )}

                {/* Form fields mockup */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1, height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '11.5px', color: '#64748b' }}>First Name</div>
                    <div style={{ flex: 1, height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '11.5px', color: '#64748b' }}>Last Name</div>
                  </div>
                  <div style={{ height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '11.5px', color: '#64748b' }}>Email</div>
                  <div style={{ height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '11.5px', color: '#64748b' }}>Phone Number</div>
                  <div style={{ height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '11.5px', color: '#64748b' }}>Choose your program…</div>

                  <div style={{
                    height: '42px',
                    marginTop: '6px',
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '13px',
                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
                  }}>
                    {config.enrollModal?.buttonText || 'Join Us'} →
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleSaveAll({ ...config, enrollModal: initialSiteConfig.enrollModal })}
              >
                Reset to Defaults
              </button>
              <button type="submit" className="admin-btn-primary">
                Save Form &amp; Offer Configuration
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
