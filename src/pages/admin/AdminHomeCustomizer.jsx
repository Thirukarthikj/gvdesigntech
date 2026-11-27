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

  // Determine active tab directly from URL route or prop
  const getTabFromRoute = () => {
    const p = location.pathname;
    if (p.includes('contact-info') || p.includes('headquarters') || p.includes('contact')) return 'contactInfo';
    if (p.includes('demo-video')) return 'demoVideo';
    if (p.includes('about-video')) return 'aboutVideo';
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
          title: 'Watch Demo Video Manager',
          desc: 'Configure the Watch Demo video link, title, and description displayed in the hero banner and video showcase modal.'
        };
      case 'aboutVideo':
        return {
          icon: '🎥',
          title: 'Home About Section Video Player',
          desc: 'Configure or upload the dedicated video shown in the About Us showcase card (replacing the 3D model) on the Home Page, separate from the Watch Demo Video option.'
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

  // Unified Activity (Photo + Content) state
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [editingActivityIdx, setEditingActivityIdx] = useState(null);
  const [activityForm, setActivityForm] = useState({
    src: '',
    alt: '',
    title: '',
    accent: '',
    date: 'September 2026',
    location: 'GV DesignTech, Oddanchatram, Tamil Nadu',
    desc: ''
  });

  const handleOpenAddActivity = () => {
    setEditingActivityIdx(null);
    setActivityForm({
      src: '',
      alt: '',
      title: '',
      accent: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      location: 'GV DesignTech, Oddanchatram, Tamil Nadu',
      desc: ''
    });
    setActivityModalOpen(true);
  };

  const handleOpenEditActivity = (item, idx) => {
    setEditingActivityIdx(idx);
    setActivityForm({
      src: item.src || '',
      alt: item.alt || '',
      title: item.title || item.modalHeading || config.recentActivity?.modalHeading || 'AI Workshop',
      accent: item.accent !== undefined ? item.accent : (item.modalHeadingAccent !== undefined ? item.modalHeadingAccent : (config.recentActivity?.modalHeadingAccent || 'Successfully Completed')),
      date: item.date || item.modalDate || config.recentActivity?.modalDate || 'September 2026',
      location: item.location || item.modalLocation || config.recentActivity?.modalLocation || 'GV DesignTech, Oddanchatram, Tamil Nadu',
      desc: item.desc || item.modalText || config.recentActivity?.modalText || ''
    });
    setActivityModalOpen(true);
  };

  const handleSaveActivity = (e) => {
    if (e) e.preventDefault();
    if (!activityForm.src) {
      alert('Please select or upload an activity photo.');
      return;
    }
    const currentItems = Array.isArray(config.recentActivity?.items) ? [...config.recentActivity.items] : [];
    const itemData = {
      id: (editingActivityIdx !== null && currentItems[editingActivityIdx]?.id) ? currentItems[editingActivityIdx].id : `act-${Date.now()}`,
      src: activityForm.src,
      alt: activityForm.alt || activityForm.title || 'GV DesignTech Recent Activity',
      title: activityForm.title || 'AI Workshop',
      accent: activityForm.accent || '',
      date: activityForm.date || '',
      location: activityForm.location || '',
      desc: activityForm.desc || ''
    };

    if (editingActivityIdx !== null && editingActivityIdx >= 0) {
      currentItems[editingActivityIdx] = itemData;
    } else {
      currentItems.push(itemData);
    }

    const updated = {
      ...config,
      recentActivity: {
        ...config.recentActivity,
        modalHeading: currentItems[0]?.title || config.recentActivity?.modalHeading || 'AI Workshop',
        modalHeadingAccent: currentItems[0]?.accent || config.recentActivity?.modalHeadingAccent || 'Successfully Completed',
        modalText: currentItems[0]?.desc || config.recentActivity?.modalText || '',
        modalDate: currentItems[0]?.date || config.recentActivity?.modalDate || 'September 2026',
        modalLocation: currentItems[0]?.location || config.recentActivity?.modalLocation || 'GV DesignTech, Oddanchatram, Tamil Nadu',
        thumb: config.recentActivity?.thumb || currentItems[0]?.src || '',
        items: currentItems
      }
    };

    handleSaveAll(updated);
    setActivityModalOpen(false);
    showToast(editingActivityIdx !== null ? '✓ Activity updated successfully!' : '✓ New activity added successfully!');
  };

  const handleDeleteActivity = (idx) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;
    const currentItems = (config.recentActivity?.items || []).filter((_, i) => i !== idx);
    const updated = {
      ...config,
      recentActivity: {
        ...config.recentActivity,
        items: currentItems
      }
    };
    handleSaveAll(updated);
    showToast('Activity deleted');
  };

  const handleActivityImageUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    try {
      setUploading(true);
      const localData = await compressImageFile(file);
      setActivityForm(prev => ({ ...prev, src: localData }));
      showToast('📷 Photo attached! Processing cloud upload...');

      const result = await uploadImageToCloudinary(file, { folder: 'gvdesigntech/activities' });
      if (result && result.isCloudinary) {
        setActivityForm(prev => ({ ...prev, src: result.url }));
        showToast('☁️ Activity photo uploaded to Cloudinary CDN!');
      }
    } catch (err) {
      console.warn('Fallback to local image for activity:', err.message);
    } finally {
      setUploading(false);
    }
  };

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
          { id: 'demoVideo', route: '/admin/demo-video', icon: '🎬', label: 'Watch Demo Video (Hero)' },
          { id: 'aboutVideo', route: '/admin/about-video', icon: '🎥', label: 'Home About Video (Card)' },
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
            {/* SOURCE SELECTION: Upload from Device OR Paste URL */}
            <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#c084fc', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📁</span>
                <span>OPTION 1: UPLOAD VIDEO FROM YOUR DEVICE</span>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#94a3b8' }}>
                Select an MP4, WebM, or MOV video file directly from your computer or phone. It will be uploaded and served across the website.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: '12px',
                    background: videoUploading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: videoUploading ? 'wait' : 'pointer',
                    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.35)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{videoUploading ? '⏳' : '📤'}</span>
                  <span>{videoUploading ? 'Uploading Video from Device...' : 'Choose Video File from Device'}</span>
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
                          const updated = {
                            ...config,
                            demoVideo: { ...config.demoVideo, videoUrl: res.url }
                          };
                          setConfig(updated);
                          handleSaveAll(updated);
                          showToast(res.isCloudinary ? '☁️ Video uploaded to Cloudinary & saved live!' : '✓ Device video uploaded & saved live across website!');
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
                  <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '600' }}>
                    📎 {videoFileInfo}
                  </span>
                )}
              </div>
            </div>

            {/* OPTION 2: Paste YouTube / Stream URL */}
            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="admin-label" style={{ margin: 0 }}>
                  OPTION 2: Video Embed / Stream URL (or YouTube Link) <span style={{ color: '#d946ef' }}>*</span>
                </label>
                {config.demoVideo?.videoUrl && isVideoFile(config.demoVideo.videoUrl) && (
                  <span style={{ fontSize: '11.5px', color: '#4ade80', fontWeight: '700' }}>
                    ✓ Device Video Loaded
                  </span>
                )}
                {config.demoVideo?.videoUrl && !isVideoFile(config.demoVideo.videoUrl) && config.demoVideo.videoUrl.includes('embed') && (
                  <span style={{ fontSize: '11.5px', color: '#c084fc', fontWeight: '700' }}>
                    ✓ YouTube Embed Ready
                  </span>
                )}
              </div>

              <input
                type="text"
                className="admin-input"
                required
                placeholder="Paste YouTube link (e.g. https://youtu.be/...) or direct MP4 link"
                value={config.demoVideo?.videoUrl || ''}
                onChange={(e) => {
                  const raw = e.target.value;
                  const formatted = formatVideoEmbedUrl(raw);
                  setConfig(prev => ({
                    ...prev,
                    demoVideo: { ...prev.demoVideo, videoUrl: formatted }
                  }));
                }}
              />
              <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', display: 'block' }}>
                💡 <strong>YouTube Links Auto-Fixed:</strong> You can paste any YouTube URL (like <code>https://youtu.be/b68HETiNO98?si=...</code> or <code>https://youtube.com/watch?v=...</code>) and it will automatically convert to the working embed format.
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
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0, 0, 0, 0.6)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc' }}>
                  📺 LIVE VIDEO PREVIEW
                </div>
                <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  {isVideoFile(config.demoVideo?.videoUrl) ? 'HTML5 Native Video Player' : 'Embedded Video Player'}
                </span>
              </div>

              <div style={{ width: '100%', height: '380px', borderRadius: '12px', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isVideoFile(config.demoVideo?.videoUrl) ? (
                  <video
                    key={config.demoVideo?.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    src={config.demoVideo.videoUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  >
                    <source src={config.demoVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    key={config.demoVideo?.videoUrl}
                    width="100%"
                    height="100%"
                    src={formatVideoEmbedUrl(config.demoVideo?.videoUrl || 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A')}
                    title="Demo Video Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: 'none' }}
                  ></iframe>
                )}
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
                💾 Save Video Configuration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          TAB: HOME ABOUT SECTION VIDEO (CARD IN ABOUT US)
          ======================================================== */}
      {activeTab === 'aboutVideo' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">
                <span>🎥</span>
                <span>Home About Section Video Player</span>
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                Dedicated video displayed inside the About Us card on the Home Page (separate from Watch Demo Video).
              </p>
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Displayed in About Card next to "Master Industry-Standard CAD"
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}>
            {/* SOURCE SELECTION: Upload from Device OR Paste URL */}
            <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#c084fc', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📁</span>
                <span>OPTION 1: UPLOAD VIDEO FROM YOUR DEVICE</span>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#94a3b8' }}>
                Select an MP4, WebM, or MOV video file directly from your computer or phone for the About section card.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    borderRadius: '12px',
                    background: videoUploading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: videoUploading ? 'wait' : 'pointer',
                    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.35)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{videoUploading ? '⏳' : '📤'}</span>
                  <span>{videoUploading ? 'Uploading Video from Device...' : 'Choose Video File from Device'}</span>
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
                          const updated = {
                            ...config,
                            aboutVideo: { ...(config.aboutVideo || {}), videoUrl: res.url }
                          };
                          setConfig(updated);
                          handleSaveAll(updated);
                          showToast(res.isCloudinary ? '☁️ Video uploaded to Cloudinary & saved live!' : '✓ Device video uploaded & saved live in About section!');
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
                  <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '600' }}>
                    📎 {videoFileInfo}
                  </span>
                )}
              </div>
            </div>

            {/* OPTION 2: Paste YouTube / Stream URL */}
            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="admin-label" style={{ margin: 0 }}>
                  OPTION 2: Video Embed / Stream URL (or YouTube Link) <span style={{ color: '#d946ef' }}>*</span>
                </label>
                {config.aboutVideo?.videoUrl && isVideoFile(config.aboutVideo.videoUrl) && (
                  <span style={{ fontSize: '11.5px', color: '#4ade80', fontWeight: '700' }}>
                    ✓ Device Video Loaded
                  </span>
                )}
                {config.aboutVideo?.videoUrl && !isVideoFile(config.aboutVideo.videoUrl) && config.aboutVideo.videoUrl.includes('embed') && (
                  <span style={{ fontSize: '11.5px', color: '#c084fc', fontWeight: '700' }}>
                    ✓ YouTube Embed Ready
                  </span>
                )}
              </div>

              <input
                type="text"
                className="admin-input"
                required
                placeholder="Paste YouTube link (e.g. https://youtu.be/...) or direct MP4 link"
                value={config.aboutVideo?.videoUrl || ''}
                onChange={(e) => {
                  const raw = e.target.value;
                  const formatted = formatVideoEmbedUrl(raw);
                  setConfig(prev => ({
                    ...prev,
                    aboutVideo: { ...(prev.aboutVideo || {}), videoUrl: formatted }
                  }));
                }}
              />
              <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', display: 'block' }}>
                💡 <strong>YouTube Links Auto-Fixed:</strong> You can paste any YouTube URL (like <code>https://youtu.be/b68HETiNO98?si=...</code> or <code>https://youtube.com/watch?v=...</code>) and it will automatically convert to the working embed format.
              </span>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Top Badge Tag (Display Above Video)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. 3D 5-AXIS VMC MACHINING CENTER"
                value={config.aboutVideo?.tag || ''}
                onChange={(e) => setConfig({
                  ...config,
                  aboutVideo: { ...(config.aboutVideo || {}), tag: e.target.value }
                })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Headline / Title</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Master Industry-Standard CAD & Engineering Design"
                value={config.aboutVideo?.title || ''}
                onChange={(e) => setConfig({
                  ...config,
                  aboutVideo: { ...(config.aboutVideo || {}), title: e.target.value }
                })}
              />
            </div>

            {/* Live Video Preview Box */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0, 0, 0, 0.6)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc' }}>
                  📺 LIVE VIDEO PREVIEW (ABOUT CARD)
                </div>
                <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  {isVideoFile(config.aboutVideo?.videoUrl) ? 'HTML5 Native Video Player' : 'Embedded Video Player'}
                </span>
              </div>

              <div style={{ width: '100%', height: '380px', borderRadius: '12px', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isVideoFile(config.aboutVideo?.videoUrl) ? (
                  <video
                    key={config.aboutVideo?.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    src={config.aboutVideo.videoUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  >
                    <source src={config.aboutVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    key={config.aboutVideo?.videoUrl}
                    width="100%"
                    height="100%"
                    src={formatVideoEmbedUrl(config.aboutVideo?.videoUrl || 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A')}
                    title={config.aboutVideo?.title || 'Home About Section Video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: 'none' }}
                  ></iframe>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleSaveAll({ ...config, aboutVideo: initialSiteConfig.aboutVideo })}
              >
                Reset to Default
              </button>
              <button type="submit" className="admin-btn-primary">
                💾 Save About Video Configuration
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

          {/* Unified Activities & Showcase Manager */}
          <div className="admin-card" style={{ marginBottom: '24px' }}>
            <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="admin-card-title">
                  <span>⚡</span>
                  <span>Activities & Showcase Manager ({(config.recentActivity?.items || []).length} Activities)</span>
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                  Add or edit activity photos and event details together in one unified form. Each activity has its own photo, headline, accent, full story, date, and campus location.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn-primary"
                onClick={handleOpenAddActivity}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '14px', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)' }}
              >
                <span>➕</span>
                <span>Add New Activity</span>
              </button>
            </div>

            {/* List of current activities */}
            {(!config.recentActivity?.items || config.recentActivity.items.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', border: '1px dashed rgba(255, 255, 255, 0.15)' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📸</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9', marginBottom: '6px' }}>No Activities Added Yet</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '400px', margin: '0 auto 16px' }}>
                  Click "Add New Activity" above to create your first activity with its photo, title, and description.
                </p>
                <button
                  type="button"
                  className="admin-btn-primary"
                  onClick={handleOpenAddActivity}
                >
                  + Add First Activity
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
                {config.recentActivity.items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    style={{
                      background: 'radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%)',
                      border: '1px solid rgba(168, 85, 247, 0.25)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                      transition: 'transform 0.2s ease, border-color 0.2s ease'
                    }}
                  >
                    {/* Activity Photo Thumbnail */}
                    <div style={{ position: 'relative', width: '100%', height: '180px', background: '#0b0f19', overflow: 'hidden' }}>
                      <img
                        src={item.src}
                        alt={item.alt || item.title || `Activity ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#c084fc',
                        border: '1px solid rgba(192, 132, 252, 0.4)'
                      }}>
                        Activity #{idx + 1}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '800', color: '#fff', lineHeight: 1.3 }}>
                          {item.title || item.modalHeading || 'AI Workshop'}{' '}
                          <span style={{ color: '#c084fc' }}>
                            {item.accent !== undefined ? item.accent : (item.modalHeadingAccent || 'Successfully Completed')}
                          </span>
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                          <span>📅 {item.date || item.modalDate || 'September 2026'}</span>
                          <span>•</span>
                          <span>📍 {item.location || item.modalLocation || 'GV DesignTech'}</span>
                        </div>
                      </div>

                      <p style={{
                        margin: '6px 0 0',
                        fontSize: '13px',
                        color: '#cbd5e1',
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1
                      }}>
                        {item.desc || item.modalText || 'No description provided.'}
                      </p>

                      {/* Card Actions */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditActivity(item, idx)}
                          style={{
                            flex: 1,
                            padding: '8px 14px',
                            background: 'rgba(168, 85, 247, 0.15)',
                            border: '1px solid rgba(168, 85, 247, 0.4)',
                            color: '#d8b4fe',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          ✏️ Edit Photo & Content
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteActivity(idx)}
                          style={{
                            padding: '8px 12px',
                            background: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                          title="Delete Activity"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unified Add / Edit Activity Modal Dialog */}
          {activityModalOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: 'rgba(5, 5, 12, 0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
              onClick={() => setActivityModalOpen(false)}
            >
              <div
                style={{
                  background: '#0e111d',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  borderRadius: '20px',
                  width: '100%',
                  maxWidth: '680px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(168, 85, 247, 0.2)',
                  padding: '28px',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{editingActivityIdx !== null ? '✏️' : '✨'}</span>
                      <span>{editingActivityIdx !== null ? `Edit Activity #${editingActivityIdx + 1}` : 'Add New Activity'}</span>
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                      Add or update the activity photo, title, accent, story description, date, and location in this single form.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivityModalOpen(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: '#cbd5e1',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveActivity}>
                  {/* Photo Section */}
                  <div style={{
                    padding: '16px',
                    background: 'rgba(168, 85, 247, 0.06)',
                    border: '1px dashed rgba(168, 85, 247, 0.35)',
                    borderRadius: '14px',
                    marginBottom: '20px'
                  }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#e2e8f0', marginBottom: '10px' }}>
                      📷 Activity Photo <span style={{ color: '#ec4899' }}>*</span>
                    </label>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {/* Thumbnail Preview */}
                      <div style={{
                        width: '120px',
                        height: '90px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#000',
                        border: '2px solid rgba(168, 85, 247, 0.5)',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {activityForm.src ? (
                          <img
                            src={activityForm.src}
                            alt="Activity Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', padding: '4px' }}>No photo selected</span>
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ marginBottom: '10px' }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleActivityImageUpload}
                            id="activity-file-input"
                            style={{ display: 'none' }}
                          />
                          <label
                            htmlFor="activity-file-input"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 14px',
                              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                              color: '#fff',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            <span>📁</span>
                            <span>Choose Photo from Device</span>
                          </label>
                          {uploading && <span style={{ marginLeft: '10px', fontSize: '12px', color: '#c084fc' }}>Uploading...</span>}
                        </div>

                        <div>
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="Or paste image URL (e.g. /assets/recent-activity/workshop.jpg)"
                            value={activityForm.src}
                            onChange={(e) => setActivityForm(prev => ({ ...prev, src: e.target.value }))}
                            style={{ fontSize: '12px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Headline & Accent */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div className="admin-form-group">
                      <label className="admin-label">Event Headline / Prefix <span style={{ color: '#ec4899' }}>*</span></label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. AI Workshop"
                        value={activityForm.title}
                        onChange={(e) => setActivityForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                      <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', display: 'block' }}>First part in clean bold white</span>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Headline Accent (Purple Highlighted)</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Successfully Completed"
                        value={activityForm.accent}
                        onChange={(e) => setActivityForm(prev => ({ ...prev, accent: e.target.value }))}
                      />
                      <span style={{ fontSize: '11px', color: '#c084fc', marginTop: '4px', display: 'block' }}>Second part highlighted with gradient</span>
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div className="admin-form-group">
                      <label className="admin-label">📅 Event Date / Timing</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. September 2026"
                        value={activityForm.date}
                        onChange={(e) => setActivityForm(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">📍 Event Location</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. GV DesignTech, Oddanchatram, Tamil Nadu"
                        value={activityForm.location}
                        onChange={(e) => setActivityForm(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="admin-form-group" style={{ marginBottom: '16px' }}>
                    <label className="admin-label">Event Full Description / Story</label>
                    <textarea
                      className="admin-input"
                      rows={4}
                      placeholder="Students participated in a hands-on AI and technology workshop focused on practical learning, real-world applications, and future-ready skills."
                      value={activityForm.desc}
                      onChange={(e) => setActivityForm(prev => ({ ...prev, desc: e.target.value }))}
                    />
                  </div>

                  {/* Optional Alt text */}
                  <div className="admin-form-group" style={{ marginBottom: '20px' }}>
                    <label className="admin-label">Photo Description / Alt Label (Optional)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Hands-on Classroom Workshop Session"
                      value={activityForm.alt}
                      onChange={(e) => setActivityForm(prev => ({ ...prev, alt: e.target.value }))}
                    />
                  </div>

                  {/* Live Modal Preview */}
                  <div style={{
                    marginBottom: '20px',
                    padding: '16px',
                    background: 'radial-gradient(ellipse at center, rgba(30, 18, 60, 0.7) 0%, rgba(10, 8, 25, 0.95) 100%)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '14px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                      Live Preview Inside 3D Showcase
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>
                      {activityForm.title || 'Activity Title'}{' '}
                      <span style={{
                        background: 'linear-gradient(135deg, #c084fc, #e879f9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {activityForm.accent || ''}
                      </span>
                    </h4>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', maxWidth: '520px', margin: '0 auto 8px', lineHeight: 1.45 }}>
                      {activityForm.desc || 'Activity description will appear here as users scroll or select this slide.'}
                    </p>
                    <div style={{ display: 'inline-flex', gap: '12px', fontSize: '11px', color: '#94a3b8', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {activityForm.date && <span>📅 {activityForm.date}</span>}
                      {activityForm.date && activityForm.location && <span>|</span>}
                      {activityForm.location && <span>📍 {activityForm.location}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="admin-btn-secondary"
                      onClick={() => setActivityModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="admin-btn-primary"
                      disabled={uploading}
                    >
                      💾 {editingActivityIdx !== null ? 'Save Changes' : 'Add Activity'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
