import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getStoredSiteConfig, saveStoredSiteConfig, initialSiteConfig } from '../../data/contentPersistence.js';
import { uploadImageToCloudinary, uploadVideoToCloudinary, compressImageFile } from '../../services/cloudinaryService.js';
import { isVideoFile, formatVideoEmbedUrl } from '../../data/videoUtils.js';

export default function AdminHomeCustomizer({ initialTab = 'demoVideo' }) {
  const location = useLocation();
  const [config, setConfig] = useState(() => getStoredSiteConfig());
  const [toast, setToast] = useState('');
  const [uploading, setUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoFileInfo, setVideoFileInfo] = useState('');

  // Video Management Modal & Form State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    tag: 'Campus Tour',
    description: '',
    videoUrl: '',
    isFeatured: false
  });

  // Determine active tab directly from URL route or prop
  const getTabFromRoute = () => {
    const p = location.pathname;
    if (p.includes('contact-info') || p.includes('headquarters') || p.includes('contact')) return 'contactInfo';
    if (p.includes('demo-video') || p.includes('videos')) return 'demoVideo';
    if (p.includes('recent-activities')) return 'recentActivity';
    if (p.includes('impact-stats')) return 'stats';
    if (p.includes('lab-photos')) return 'showcaseImages';
    if (p.includes('enroll-form')) return 'enrollModal';
    if (p.includes('specializations') || p.includes('specialization')) return 'specializations';
    return initialTab || 'demoVideo';
  };

  const [tabOverride, setTabOverride] = useState(null);
  const activeTab = tabOverride || getTabFromRoute();

  // Reset tab override when location route changes
  React.useEffect(() => {
    setTabOverride(null);
  }, [location.pathname]);

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'contactInfo':
        return {
          icon: '📍',
          title: 'Headquarters, Contact & Social Channels Manager',
          desc: 'Configure headquarters address, admissions email, phone / WhatsApp, operating hours, official social channels, and Google Maps campus directions in real-time.'
        };
      case 'demoVideo':
        return {
          icon: '🎬',
          title: 'Video Library & Demo Showcase Manager',
          desc: 'Add new videos, edit existing videos, manage the video showcase library, and choose which video is featured on the Home Page in real-time.'
        };
      case 'recentActivity':
        return {
          icon: '⚡',
          title: 'Recent Activities & Floating Widget Manager',
          desc: 'Manage the live activities slideshow photos, heading, and subtitle for the floating Recent Activities card.'
        };
      case 'stats':
        return {
          icon: '📈',
          title: 'Impact Numbers & Statistics',
          desc: 'Customize the key performance numbers (Learners, Benchmark, Success Rate, 24/7 Labs) shown across the website.'
        };
      case 'showcaseImages':
        return {
          icon: '🏫',
          title: 'Classroom & Lab Photos Manager',
          desc: 'Upload and manage physical classroom, computer lab workstation, and CNC workshop training pictures.'
        };
      case 'enrollModal':
        return {
          icon: '📝',
          title: 'Enroll Form & Offer Banner Manager',
          desc: 'Customize the Instant Enroll modal offer heading, countdown timer minutes, and form configuration in real time.'
        };
      case 'specializations':
        return {
          icon: '🎯',
          title: 'Core Specialization Cards (About Page)',
          desc: 'Configure the 3 core CAD discipline tracks (Mechanical, Civil BIM, CNC Machining) displayed in the Our Core Specializations section on the About Us page.'
        };
      default:
        return {
          icon: '🎯',
          title: 'Core Specialization Cards',
          desc: 'Configure the primary discipline tracks displayed across the website.'
        };
    }
  };
  const headerInfo = getHeaderInfo();

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

  // Video Library List Computation
  const rawVideoList = (Array.isArray(config.videoList) && config.videoList.length > 0)
    ? config.videoList
    : (config.demoVideo ? [{
        id: 'video-default',
        videoUrl: config.demoVideo.videoUrl || initialSiteConfig.demoVideo.videoUrl,
        title: config.demoVideo.title || initialSiteConfig.demoVideo.title,
        description: config.demoVideo.description || initialSiteConfig.demoVideo.description,
        tag: config.demoVideo.tag || 'Campus Tour',
        isFeatured: true
      }] : initialSiteConfig.videoList);

  const featuredVideo = rawVideoList.find((v) => v.isFeatured) || rawVideoList[0] || config.demoVideo || {};

  const openAddVideoModal = () => {
    setEditingVideoId(null);
    setVideoFormData({
      title: '',
      tag: 'Campus Tour',
      description: '',
      videoUrl: '',
      isFeatured: rawVideoList.length === 0
    });
    setVideoFileInfo('');
    setVideoModalOpen(true);
  };

  const openEditVideoModal = (v) => {
    setEditingVideoId(v.id);
    setVideoFormData({
      title: v.title || '',
      tag: v.tag || 'Campus Tour',
      description: v.description || '',
      videoUrl: v.videoUrl || '',
      isFeatured: !!v.isFeatured
    });
    setVideoFileInfo('');
    setVideoModalOpen(true);
  };

  const handleSaveVideoModal = (e) => {
    if (e) e.preventDefault();
    if (!videoFormData.videoUrl || !videoFormData.videoUrl.trim()) {
      alert('Please provide a video URL or upload a video file from your device.');
      return;
    }

    let updatedList = [...rawVideoList];
    const targetId = editingVideoId || ('video_' + Date.now());
    const willBeFeatured = videoFormData.isFeatured || rawVideoList.length === 0;

    const newVideoObj = {
      id: targetId,
      title: videoFormData.title.trim() || 'GV DesignTech CAD Showcase Video',
      tag: videoFormData.tag.trim() || 'Campus Tour',
      description: videoFormData.description.trim(),
      videoUrl: videoFormData.videoUrl.trim(),
      isFeatured: willBeFeatured
    };

    if (editingVideoId) {
      updatedList = updatedList.map((v) => {
        if (v.id === editingVideoId) {
          return newVideoObj;
        }
        return willBeFeatured ? { ...v, isFeatured: false } : v;
      });
    } else {
      if (willBeFeatured) {
        updatedList = updatedList.map((v) => ({ ...v, isFeatured: false }));
      }
      updatedList.unshift(newVideoObj);
    }

    const featuredVid = willBeFeatured
      ? newVideoObj
      : (updatedList.find((v) => v.isFeatured) || updatedList[0]);

    const updatedConfig = {
      ...config,
      videoList: updatedList,
      demoVideo: {
        videoUrl: featuredVid.videoUrl,
        title: featuredVid.title,
        description: featuredVid.description,
        tag: featuredVid.tag,
        isFeatured: true
      }
    };

    handleSaveAll(updatedConfig);
    setVideoModalOpen(false);
    showToast(editingVideoId ? '✏️ Video updated successfully!' : '🎉 New video added successfully!');
  };

  const handleSetFeaturedVideo = (video) => {
    const updatedList = rawVideoList.map((v) => ({
      ...v,
      isFeatured: v.id === video.id
    }));
    const updatedConfig = {
      ...config,
      videoList: updatedList,
      demoVideo: {
        videoUrl: video.videoUrl,
        title: video.title,
        description: video.description,
        tag: video.tag,
        isFeatured: true
      }
    };
    handleSaveAll(updatedConfig);
    showToast(`★ "${video.title}" is now featured on the Home Page!`);
  };

  const handleDeleteVideo = (videoId) => {
    if (rawVideoList.length <= 1) {
      alert('Cannot delete the last video. There must be at least one video in the showcase library.');
      return;
    }
    const toDelete = rawVideoList.find((v) => v.id === videoId);
    if (!window.confirm(`Are you sure you want to delete "${toDelete?.title || 'this video'}"?`)) {
      return;
    }
    const updatedList = rawVideoList.filter((v) => v.id !== videoId);
    let newFeatured = updatedList.find((v) => v.isFeatured);
    if (!newFeatured) {
      updatedList[0].isFeatured = true;
      newFeatured = updatedList[0];
    }
    const updatedConfig = {
      ...config,
      videoList: updatedList,
      demoVideo: {
        videoUrl: newFeatured.videoUrl,
        title: newFeatured.title,
        description: newFeatured.description,
        tag: newFeatured.tag,
        isFeatured: true
      }
    };
    handleSaveAll(updatedConfig);
    showToast('🗑️ Video deleted from library.');
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
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '26px' }}>{headerInfo.icon}</span>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: 0 }}>
            {headerInfo.title}
          </h1>
        </div>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
          {headerInfo.desc}
        </p>
      </div>

      {/* Quick Tab Switcher */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[
          { id: 'contactInfo', route: '/admin/contact-info', icon: '📍', label: 'Headquarters & Contact' },
          { id: 'demoVideo', route: '/admin/demo-video', icon: '🎬', label: 'Videos & Showcase' },
          { id: 'recentActivity', route: '/admin/recent-activities', icon: '⚡', label: 'Recent Activities' },
          { id: 'stats', route: '/admin/impact-stats', icon: '📈', label: 'Impact Numbers' },
          { id: 'showcaseImages', route: '/admin/lab-photos', icon: '🏫', label: 'Lab & Classroom Photos' },
          { id: 'enrollModal', route: '/admin/enroll-form', icon: '📝', label: 'Enroll Form & Offer' },
          { id: 'specializations', route: '/admin/specializations', icon: '🎯', label: 'Specialization Cards' }
        ].map(t => (
          <Link
            key={t.id}
            to={t.route}
            onClick={() => setTabOverride(t.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === t.id
                ? 'linear-gradient(135deg, #8b5cf6, #d946ef)'
                : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === t.id ? '#fff' : '#94a3b8',
              border: activeTab === t.id ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: activeTab === t.id ? '0 4px 15px rgba(217, 70, 239, 0.35)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </Link>
        ))}
      </div>

      {/* ========================================================
          TAB 0: HEADQUARTERS & CONTACT INFO
          ======================================================== */}
      {activeTab === 'contactInfo' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>📍</span>
              <span>Headquarters &amp; Contact Options</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Displayed on /Contactus page, Footer &amp; MongoDB Atlas site_config
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div className="admin-form-group">
                <label className="admin-label">
                  Headquarters Card Heading <span style={{ color: '#d946ef' }}>*</span>
                </label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. Headquarters: Oddanchatram, Tamil Nadu"
                  value={config.contactInfo?.heading || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    contactInfo: { ...config.contactInfo, heading: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">
                  Location Address <span style={{ color: '#d946ef' }}>*</span>
                </label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. Headquarters: Oddanchatram, Tamil Nadu 624619"
                  value={config.contactInfo?.address || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    contactInfo: { ...config.contactInfo, address: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">
                  Official Inquiries Email <span style={{ color: '#d946ef' }}>*</span>
                </label>
                <input
                  type="email"
                  className="admin-input"
                  required
                  placeholder="e.g. gvdesigntech707@gmail.com"
                  value={config.contactInfo?.email || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    contactInfo: { ...config.contactInfo, email: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">
                  Call or WhatsApp Phone <span style={{ color: '#d946ef' }}>*</span>
                </label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. +91 96553 64707"
                  value={config.contactInfo?.phone || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    contactInfo: { ...config.contactInfo, phone: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Operating Hours (Monday – Saturday)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Monday – Saturday: 9:00 AM – 7:00 PM"
                  value={config.contactInfo?.operatingHoursWeekdays || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    contactInfo: { ...config.contactInfo, operatingHoursWeekdays: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Operating Hours (Sunday / Holidays)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Sunday: Prior Appointment Only"
                  value={config.contactInfo?.operatingHoursSunday || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    contactInfo: { ...config.contactInfo, operatingHoursSunday: e.target.value }
                  })}
                />
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div style={{ marginTop: '24px', marginBottom: '24px', padding: '20px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#c084fc', marginBottom: '14px', letterSpacing: '0.5px' }}>
                🌐 OFFICIAL SOCIAL CHANNELS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">YouTube Channel Link</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://www.youtube.com/@GVDESIGNTECH"
                    value={config.socialLinks?.youtube || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      socialLinks: { ...config.socialLinks, youtube: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Instagram Profile Link</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://www.instagram.com/gvdesigntech/"
                    value={config.socialLinks?.instagram || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      socialLinks: { ...config.socialLinks, instagram: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">LinkedIn Page Link</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://www.linkedin.com/in/gv-design-tech-..."
                    value={config.socialLinks?.linkedin || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      socialLinks: { ...config.socialLinks, linkedin: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Facebook Page Link</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://www.facebook.com/profile.php?id=..."
                    value={config.socialLinks?.facebook || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      socialLinks: { ...config.socialLinks, facebook: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">WhatsApp Direct Chat Link</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="https://wa.me/919655364707"
                    value={config.socialLinks?.whatsapp || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      socialLinks: { ...config.socialLinks, whatsapp: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Google Campus Map & Directions */}
            <div style={{ marginTop: '24px', marginBottom: '24px', padding: '20px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#c084fc', marginBottom: '14px', letterSpacing: '0.5px' }}>
                🗺️ CAMPUS MAP &amp; GOOGLE DIRECTIONS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Map Address Subtitle</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Headquarters: Oddanchatram, Dindigul District, Tamil Nadu 624619, India"
                    value={config.contactInfo?.mapAddress || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      contactInfo: { ...config.contactInfo, mapAddress: e.target.value }
                    })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Google Maps Directions URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="https://maps.google.com/?q=Oddanchatram,+Tamil+Nadu"
                    value={config.contactInfo?.mapDirectionsUrl || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      contactInfo: { ...config.contactInfo, mapDirectionsUrl: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '12px' }}>
                <label className="admin-label">Google Maps Embed Iframe URL</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="https://maps.google.com/maps?q=Oddanchatram,+Tamil+Nadu,+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  value={config.contactInfo?.mapEmbedUrl || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    contactInfo: { ...config.contactInfo, mapEmbedUrl: e.target.value }
                  })}
                />
              </div>
            </div>

            {/* Live Visual Preview matching screenshot */}
            <div style={{ marginTop: '28px', padding: '24px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', marginBottom: '16px', letterSpacing: '1px' }}>
                👀 LIVE CONTACT CARD PREVIEW
              </div>

              <div style={{
                maxWidth: '560px',
                padding: '32px',
                background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.9), rgba(6, 6, 24, 0.95))',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '22px', color: '#fff', lineHeight: 1.3 }}>
                  {config.contactInfo?.heading || 'Headquarters: Oddanchatram, Tamil Nadu'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(139,92,246,0.2)', border: '1px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                      📍
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>Location Address</div>
                      <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.4 }}>
                        {config.contactInfo?.address || 'Headquarters: Oddanchatram, Tamil Nadu 624619'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(217,70,239,0.2)', border: '1px solid #d946ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                      📩
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>Email Address</div>
                      <div style={{ fontSize: '13.5px', color: '#e879f9' }}>
                        {config.contactInfo?.email || 'gvdesigntech707@gmail.com'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(34,211,238,0.2)', border: '1px solid #22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                      📞
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>Call or WhatsApp</div>
                      <div style={{ fontSize: '13.5px', color: '#22d3ee' }}>
                        {config.contactInfo?.phone || '+91 96553 64707'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(251,191,36,0.2)', border: '1px solid #fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                      ⏰
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>Operating Hours</div>
                      <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.4 }}>
                        {config.contactInfo?.operatingHoursWeekdays || 'Monday – Saturday: 9:00 AM – 7:00 PM'}<br />
                        {config.contactInfo?.operatingHoursSunday || 'Sunday: Prior Appointment Only'}
                      </div>
                    </div>
                  </div>

                  {/* Social Buttons in Preview */}
                  <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 12px', color: '#cbd5e1', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Official Social Channels
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '12.5px', fontWeight: '600' }}>
                        <i className="fa-brands fa-youtube"></i> YouTube
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#ec4899', fontSize: '12.5px', fontWeight: '600' }}>
                        <i className="fa-brands fa-instagram"></i> Instagram
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.12)', border: '1px solid rgba(14, 165, 233, 0.3)', color: '#0ea5e9', fontSize: '12.5px', fontWeight: '600' }}>
                        <i className="fa-brands fa-linkedin-in"></i> LinkedIn
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#3b82f6', fontSize: '12.5px', fontWeight: '600' }}>
                        <i className="fa-brands fa-facebook-f"></i> Facebook
                      </span>
                      {config.socialLinks?.whatsapp && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22c55e', fontSize: '12.5px', fontWeight: '600' }}>
                          <i className="fa-brands fa-whatsapp"></i> WhatsApp
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleSaveAll({
                  ...config,
                  contactInfo: initialSiteConfig.contactInfo,
                  socialLinks: initialSiteConfig.socialLinks
                })}
              >
                Reset to Defaults
              </button>
              <button type="submit" className="admin-btn-primary">
                💾 Save Headquarters &amp; Contact Options
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          TAB 1: WATCH DEMO VIDEO & LIBRARY MANAGER
          ======================================================== */}
      {activeTab === 'demoVideo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Top Actions & Overview Card */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '24px' }}>🎬</span>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                    Video Showcase &amp; Library Manager
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', maxWidth: '640px', lineHeight: 1.5 }}>
                  Add, edit, or upload videos from your device or YouTube. Manage your entire academy video collection and pick which video appears featured on the website front page.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link
                  to="/showcase-video"
                  target="_blank"
                  className="admin-btn-secondary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>🔗</span>
                  <span>Public Page</span>
                </Link>
                <button
                  type="button"
                  onClick={openAddVideoModal}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(217, 70, 239, 0.4)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>➕</span>
                  <span>Add New Video</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Featured Home Page Video Highlight Card */}
          <div
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'linear-gradient(145deg, rgba(30, 20, 60, 0.8), rgba(10, 6, 24, 0.95))',
              border: '1px solid rgba(217, 70, 239, 0.45)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(217, 70, 239, 0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px', color: '#f0abfc' }}>★</span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#f0abfc', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Current Featured Home Page Video
                </span>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.35)', color: '#4ade80', fontSize: '11.5px', fontWeight: '700' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80' }}></span>
                Live on Front Page
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'center' }}>
              {/* Left: Video Player Box */}
              <div style={{ width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isVideoFile(featuredVideo.videoUrl) ? (
                  <video
                    key={featuredVideo.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    src={featuredVideo.videoUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  >
                    <source src={featuredVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    key={featuredVideo.videoUrl}
                    width="100%"
                    height="100%"
                    src={formatVideoEmbedUrl(featuredVideo.videoUrl || 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A')}
                    title="Featured Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: 'none' }}
                  ></iframe>
                )}
              </div>

              {/* Right: Video Metadata & Edit CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
                    🏷️ {featuredVideo.tag || 'Campus Tour'}
                  </span>
                  <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: '0 0 10px', lineHeight: 1.3 }}>
                    {featuredVideo.title || 'GV DesignTech CAD & Engineering Training Tour'}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {featuredVideo.description || 'Virtual guided tour showing our CAD labs, 3D printing equipment, CNC machining units, and student design workstations.'}
                  </p>
                </div>

                <div style={{ fontSize: '11.5px', color: '#64748b', wordBreak: 'break-all' }}>
                  <strong>Source:</strong> {featuredVideo.videoUrl}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => openEditVideoModal(featuredVideo)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      background: 'rgba(139, 92, 246, 0.25)',
                      border: '1px solid #8b5cf6',
                      color: '#fff',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    <span>✏️</span>
                    <span>Edit Featured Video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Library Grid */}
          <div className="admin-card">
            <div className="admin-card-header" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="admin-card-title" style={{ margin: 0 }}>
                  <span>📚</span>
                  <span>Video Showcase Library ({rawVideoList.length})</span>
                </h3>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Click "Set as Featured" on any video below to immediately display it on the Home Page.
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {rawVideoList.map((v, idx) => {
                const isFeatured = v.isFeatured || (v.id === featuredVideo.id);
                return (
                  <div
                    key={v.id || idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: isFeatured ? '1px solid rgba(217, 70, 239, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: isFeatured ? '0 8px 30px rgba(217, 70, 239, 0.2)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {/* Card Video Player / Preview */}
                    <div style={{ width: '100%', height: '190px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {isVideoFile(v.videoUrl) ? (
                        <video
                          key={v.videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          src={v.videoUrl}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        >
                          <source src={v.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <iframe
                          key={v.videoUrl}
                          width="100%"
                          height="100%"
                          src={formatVideoEmbedUrl(v.videoUrl || '')}
                          title={v.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          style={{ border: 'none' }}
                        ></iframe>
                      )}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', gap: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(139,92,246,0.15)', color: '#c084fc', fontSize: '11px', fontWeight: '700' }}>
                            {v.tag || 'Showcase'}
                          </span>
                          {isFeatured && (
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#f0abfc', background: 'rgba(217, 70, 239, 0.2)', padding: '2px 8px', borderRadius: '6px' }}>
                              ★ FEATURED
                            </span>
                          )}
                        </div>

                        <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', margin: '0 0 6px', lineHeight: 1.35 }}>
                          {v.title}
                        </h4>
                        <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {v.description || 'No description provided.'}
                        </p>
                      </div>

                      {/* Card Footer Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <div>
                          {isFeatured ? (
                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#4ade80' }}>
                              ✓ Active on Home
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetFeaturedVideo(v)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: 'rgba(139, 92, 246, 0.15)',
                                border: '1px solid rgba(139, 92, 246, 0.4)',
                                color: '#c084fc',
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              ☆ Set as Home
                            </button>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => openEditVideoModal(v)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: 'none',
                              color: '#fff',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(v.id)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#f87171',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                            title="Delete Video"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              ADD / EDIT VIDEO MODAL
              ======================================================== */}
          {videoModalOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
              onClick={() => setVideoModalOpen(false)}
            >
              <div
                style={{
                  maxWidth: '680px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  background: '#0e0b1f',
                  border: '1px solid rgba(139, 92, 246, 0.5)',
                  borderRadius: '24px',
                  padding: '30px',
                  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.25)',
                  animation: 'fadeIn 0.2s ease'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px' }}>{editingVideoId ? '✏️' : '➕'}</span>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                      {editingVideoId ? 'Edit Video Details' : 'Add New Video to Library'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: '#cbd5e1',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '15px'
                    }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveVideoModal} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">
                      Video Headline / Title <span style={{ color: '#d946ef' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      required
                      placeholder="e.g. GV DesignTech CAD & Engineering Training Tour"
                      value={videoFormData.title}
                      onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">
                      Category Tag / Badge
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Campus Tour, 5-Axis CNC, Student Demo, CAD Tutorial"
                      value={videoFormData.tag}
                      onChange={(e) => setVideoFormData({ ...videoFormData, tag: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">
                      Tour / Video Description
                    </label>
                    <textarea
                      className="admin-input"
                      rows={3}
                      placeholder="Describe what learners will experience in this video..."
                      value={videoFormData.description}
                      onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                    />
                  </div>

                  {/* SOURCE SELECTION: Upload from Device OR Paste URL */}
                  <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#c084fc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>📁</span>
                      <span>OPTION 1: UPLOAD VIDEO FROM YOUR DEVICE</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <label
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 18px',
                          borderRadius: '10px',
                          background: videoUploading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                          color: '#fff',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: videoUploading ? 'wait' : 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span>{videoUploading ? '⏳' : '📤'}</span>
                        <span>{videoUploading ? 'Uploading Video File...' : 'Choose Video File from Device'}</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime,video/ogg,video/x-matroska,video/*"
                          disabled={videoUploading}
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files && e.target.files[0];
                            if (!file) return;
                            if (!file.type.startsWith('video/')) {
                              alert('Please select a valid video file (MP4, WebM, MOV, OGG).');
                              return;
                            }
                            setVideoUploading(true);
                            setVideoFileInfo(`${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
                            try {
                              showToast('⏳ Uploading video from device, please wait...');
                              const res = await uploadVideoToCloudinary(file, { folder: 'gvdesigntech/videos' });
                              if (res && res.url) {
                                setVideoFormData(prev => ({ ...prev, videoUrl: res.url }));
                                showToast(res.isCloudinary ? '☁️ Video uploaded to Cloudinary CDN!' : '✓ Device video uploaded successfully!');
                              }
                            } catch (err) {
                              console.error('Video upload error:', err);
                              showToast('⚠️ Video upload error: ' + err.message);
                            } finally {
                              setVideoUploading(false);
                            }
                          }}
                        />
                      </label>

                      {videoFileInfo && (
                        <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600' }}>
                          📎 {videoFileInfo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* OPTION 2: Video Embed URL / YouTube */}
                  <div className="admin-form-group">
                    <label className="admin-label">
                      OPTION 2: Video Embed / Stream URL (or YouTube Link) <span style={{ color: '#d946ef' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Paste YouTube link (https://youtu.be/...) or direct MP4 link"
                      value={videoFormData.videoUrl}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const formatted = formatVideoEmbedUrl(raw);
                        setVideoFormData({ ...videoFormData, videoUrl: formatted });
                      }}
                    />
                    <span style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                      💡 YouTube URLs auto-convert to embed format.
                    </span>
                  </div>

                  {/* Live Modal Preview */}
                  {videoFormData.videoUrl && (
                    <div style={{ marginTop: '6px', padding: '12px', background: 'rgba(0,0,0,0.6)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', marginBottom: '8px' }}>
                        📺 LIVE MODAL PREVIEW
                      </div>
                      <div style={{ width: '100%', height: '220px', borderRadius: '10px', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isVideoFile(videoFormData.videoUrl) ? (
                          <video
                            key={videoFormData.videoUrl}
                            controls
                            playsInline
                            preload="metadata"
                            src={videoFormData.videoUrl}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          >
                            <source src={videoFormData.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <iframe
                            key={videoFormData.videoUrl}
                            width="100%"
                            height="100%"
                            src={formatVideoEmbedUrl(videoFormData.videoUrl)}
                            title="Modal Video Preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ border: 'none' }}
                          ></iframe>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Feature on Home Page Toggle */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <input
                      type="checkbox"
                      checked={videoFormData.isFeatured}
                      onChange={(e) => setVideoFormData({ ...videoFormData, isFeatured: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#d946ef', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                        ★ Set as Featured Video on Home Page
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                        When checked, this video will be prominently showcased on the front page and public showcase.
                      </div>
                    </div>
                  </label>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '14px' }}>
                    <button
                      type="button"
                      className="admin-btn-secondary"
                      onClick={() => setVideoModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={videoUploading}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                        color: '#fff',
                        fontWeight: '800',
                        fontSize: '14px',
                        border: 'none',
                        cursor: videoUploading ? 'wait' : 'pointer',
                        boxShadow: '0 8px 25px rgba(217, 70, 239, 0.4)'
                      }}
                    >
                      💾 Save Video
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
                    <div style={{ flex: 1, height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '11.5px', color: '#64748b' }}>Gokul</div>
                    <div style={{ flex: 1, height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '11.5px', color: '#64748b' }}>Prasath</div>
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

      {/* ========================================================
          TAB 6: CORE SPECIALIZATIONS (3 CARDS)
          ======================================================== */}
      {activeTab === 'specializations' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>🎯</span>
              <span>Core Specialization Programs &amp; Cards (About Page)</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Displayed on About Us page in the "Our Core Specializations" section
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
            {/* Section Tag & Title */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Section Tag</label>
                <input
                  type="text"
                  className="admin-input"
                  value={config.specializations?.sectionTag || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    specializations: { ...config.specializations, sectionTag: e.target.value }
                  })}
                  placeholder="e.g. OUR CORE SPECIALIZATIONS"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Section Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={config.specializations?.sectionTitle || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    specializations: { ...config.specializations, sectionTitle: e.target.value }
                  })}
                  placeholder="e.g. Drive Your Engineering Success With Our CAD Training Programs"
                />
              </div>
            </div>

            {/* List of Specialization Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '28px' }}>
              {(config.specializations?.cards || []).map((card, idx) => (
                <div
                  key={card.id || idx}
                  style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(139, 92, 246, 0.28)',
                    borderRadius: '18px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#c084fc' }}>
                      CARD #{idx + 1}: {card.title || 'Specialization Track'}
                    </div>
                    {config.specializations?.cards?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (config.specializations?.cards || []).filter((_, i) => i !== idx);
                          setConfig({
                            ...config,
                            specializations: { ...config.specializations, cards: updated }
                          });
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
                        🗑️ Delete Card
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {/* Media Column */}
                    <div>
                      <div className="admin-form-group">
                        <label className="admin-label">Card Banner Image</label>
                        <div style={{ width: '100%', height: '170px', borderRadius: '12px', overflow: 'hidden', background: '#000', marginBottom: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <img
                            src={card.image || '/assets/cad-card-mechanical.jpg'}
                            alt={card.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="Image URL or upload file below"
                          value={card.image || ''}
                          onChange={(e) => {
                            const updated = [...config.specializations.cards];
                            updated[idx] = { ...updated[idx], image: e.target.value };
                            setConfig({
                              ...config,
                              specializations: { ...config.specializations, cards: updated }
                            });
                          }}
                          style={{ marginBottom: '6px' }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => {
                            const updated = [...config.specializations.cards];
                            updated[idx] = { ...updated[idx], image: url };
                            setConfig({
                              ...config,
                              specializations: { ...config.specializations, cards: updated }
                            });
                          })}
                          style={{ fontSize: '12px', color: '#94a3b8' }}
                        />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div>
                      <div className="admin-form-group">
                        <label className="admin-label">Badge Label</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={card.badge || ''}
                          onChange={(e) => {
                            const updated = [...config.specializations.cards];
                            updated[idx] = { ...updated[idx], badge: e.target.value };
                            setConfig({
                              ...config,
                              specializations: { ...config.specializations, cards: updated }
                            });
                          }}
                          placeholder="e.g. ⚙️ Mechanical & Auto CAD"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Card Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          required
                          value={card.title || ''}
                          onChange={(e) => {
                            const updated = [...config.specializations.cards];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setConfig({
                              ...config,
                              specializations: { ...config.specializations, cards: updated }
                            });
                          }}
                          placeholder="e.g. Mechanical & Automobile CAD"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Description</label>
                        <textarea
                          className="admin-input"
                          rows={2}
                          value={card.desc || ''}
                          onChange={(e) => {
                            const updated = [...config.specializations.cards];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            setConfig({
                              ...config,
                              specializations: { ...config.specializations, cards: updated }
                            });
                          }}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Tools &amp; Software Pills (comma-separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={Array.isArray(card.tools) ? card.tools.join(', ') : (card.tools || '')}
                          onChange={(e) => {
                            const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            const updated = [...config.specializations.cards];
                            updated[idx] = { ...updated[idx], tools: arr };
                            setConfig({
                              ...config,
                              specializations: { ...config.specializations, cards: updated }
                            });
                          }}
                          placeholder="e.g. AutoCAD 2D/3D, SolidWorks, CATIA V5, Ansys FEA, GD&T"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Button CTA Text</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={card.btnText || ''}
                          onChange={(e) => {
                            const updated = [...config.specializations.cards];
                            updated[idx] = { ...updated[idx], btnText: e.target.value };
                            setConfig({
                              ...config,
                              specializations: { ...config.specializations, cards: updated }
                            });
                          }}
                          placeholder="e.g. Explore Mechanical Track →"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Specialization Card Button */}
            <div style={{ marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => {
                  const newCard = {
                    id: 'spec-' + Date.now(),
                    badge: '🎓 Engineering CAD Track',
                    image: '/assets/cad-card-mechanical.jpg',
                    title: 'New CAD Track',
                    desc: 'Master industry-standard engineering tools and production detailing.',
                    tools: ['AutoCAD', 'SolidWorks', 'FEA Analysis'],
                    btnText: 'Explore Track →'
                  };
                  setConfig({
                    ...config,
                    specializations: {
                      ...config.specializations,
                      cards: [...(config.specializations?.cards || []), newCard]
                    }
                  });
                }}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px dashed #a78bfa',
                  borderRadius: '10px',
                  color: '#c084fc',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
              >
                + Add Another Specialization Card
              </button>
            </div>

            {/* Live Visual Preview of 3 Cards Grid */}
            <div style={{ padding: '24px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', marginBottom: '16px', letterSpacing: '1px' }}>
                👀 LIVE ABOUT PAGE PREVIEW
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {(config.specializations?.cards || []).map((card, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.8), rgba(4, 5, 22, 0.95))',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '150px', position: 'relative', overflow: 'hidden' }}>
                      <span style={{ position: 'absolute', top: '10px', left: '10px', padding: '4px 10px', background: 'rgba(2, 4, 18, 0.85)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', fontSize: '10.5px', fontWeight: '700', color: '#c084fc', zIndex: 2 }}>
                        {card.badge}
                      </span>
                      <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#fff' }}>{card.title}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>{card.desc}</p>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '10px' }}>
                        {(Array.isArray(card.tools) ? card.tools : (card.tools || '').split(',')).map((t, ti) => (
                          <span key={ti} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', fontSize: '10px', color: '#cbd5e1' }}>
                            {typeof t === 'string' ? t.trim() : t}
                          </span>
                        ))}
                      </div>

                      <div style={{
                        marginTop: '8px',
                        padding: '8px 12px',
                        background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                        borderRadius: '8px',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '12px'
                      }}>
                        {card.btnText || 'Explore Track →'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleSaveAll({ ...config, specializations: initialSiteConfig.specializations })}
              >
                Reset to Defaults
              </button>
              <button type="submit" className="admin-btn-primary">
                Save Specialization Cards
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
