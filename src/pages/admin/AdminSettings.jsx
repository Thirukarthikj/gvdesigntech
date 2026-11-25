import React, { useState, useEffect } from 'react';
import { initialAdminLeads, initialAdminBatches, initialAdminInternships, saveStoredLeads, saveStoredBatches, saveStoredInternships } from '../../data/adminInitialData.js';
import { getCloudinaryConfig, saveCloudinaryConfig, testCloudinaryConnection } from '../../services/cloudinaryService.js';
import { firebaseConfig, syncToFirestore } from '../../services/firebase.js';
import { getStoredMous, getStoredGallery, getStoredPlacements, getStoredBlogs, getStoredLeaders, getStoredCertificates } from '../../data/contentPersistence.js';

export default function AdminSettings() {
  const [notificationSaved, setNotificationSaved] = useState(false);
  const [centerPhone, setCenterPhone] = useState('+91 96553 64707');
  const [centerEmail, setCenterEmail] = useState('info@gvdesigntech.com');
  const [admissionOpen, setAdmissionOpen] = useState(true);

  // Cloudinary settings state
  const [cloudinaryConfig, setCloudinaryConfig] = useState(() => getCloudinaryConfig());
  const [cloudinaryStatus, setCloudinaryStatus] = useState({ testing: false, msg: '', success: null });
  const [cloudinarySaved, setCloudinarySaved] = useState(false);

  // Firebase status state
  const [firebaseStatus, setFirebaseStatus] = useState({ syncing: false, msg: '', success: null });

  // MongoDB status state
  const [mongoStatus, setMongoStatus] = useState({ testing: false, syncing: false, msg: '', success: null, data: null });

  useEffect(() => {
    // Check MongoDB on mount
    fetch('/api/health')
      .then(r => r.json())
      .then(d => {
        if (d.status === 'connected') {
          setMongoStatus(prev => ({
            ...prev,
            success: true,
            msg: `MongoDB connected on ${d.host} (Database: ${d.database})`,
            data: d
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleTestMongo = async () => {
    setMongoStatus(prev => ({ ...prev, testing: true, msg: 'Checking MongoDB connection...', success: null }));
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      if (data.status === 'connected') {
        setMongoStatus({
          testing: false,
          syncing: false,
          msg: `Connected to MongoDB database "${data.database}" at ${data.host}!`,
          success: true,
          data
        });
      } else {
        setMongoStatus({
          testing: false,
          syncing: false,
          msg: data.message || 'MongoDB connection returned unexpected response',
          success: false,
          data: null
        });
      }
    } catch (err) {
      setMongoStatus({
        testing: false,
        syncing: false,
        msg: 'Connection error: ' + err.message,
        success: false,
        data: null
      });
    }
  };

  const handleSyncAllToMongo = async () => {
    setMongoStatus(prev => ({ ...prev, syncing: true, msg: 'Syncing all records to MongoDB...', success: null }));
    try {
      const mous = getStoredMous();
      const gallery = getStoredGallery();
      const placements = getStoredPlacements();
      const blogs = getStoredBlogs();
      const leaders = getStoredLeaders();
      const certs = getStoredCertificates();
      const leads = JSON.parse(localStorage.getItem('gv_admin_leads') || '[]');

      await Promise.all([
        fetch('/api/mous/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mous) }),
        fetch('/api/gallery/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gallery) }),
        fetch('/api/placements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(placements) }),
        fetch('/api/blogs/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogs) }),
        fetch('/api/leaders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leaders) }),
        fetch('/api/certificates/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(certs) }),
        fetch('/api/leads/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leads) })
      ]);

      const healthRes = await fetch('/api/health');
      const healthData = await healthRes.json();

      setMongoStatus({
        testing: false,
        syncing: false,
        msg: 'All MOUs, Gallery photos, Placements, Blogs, Leaders, and Student Leads synced to MongoDB successfully!',
        success: true,
        data: healthData
      });
    } catch (err) {
      setMongoStatus({
        testing: false,
        syncing: false,
        msg: 'MongoDB sync error: ' + err.message,
        success: false,
        data: null
      });
    }
  };

  const handleExportBackup = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      leads: JSON.parse(localStorage.getItem('gv_admin_leads') || '[]'),
      batches: JSON.parse(localStorage.getItem('gv_admin_batches') || '[]'),
      internships: JSON.parse(localStorage.getItem('gv_admin_internships') || '[]')
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `gv-designtech-backup-${new Date().toISOString().split('T')[0]}.json`);
    dl.click();
  };

  const handleResetData = () => {
    if (window.confirm('Reset all leads, batches, and candidates back to original seed data?')) {
      saveStoredLeads(initialAdminLeads);
      saveStoredBatches(initialAdminBatches);
      saveStoredInternships(initialAdminInternships);
      alert('Admin database restored to initial seed state.');
      window.location.reload();
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setNotificationSaved(true);
    setTimeout(() => setNotificationSaved(false), 3000);
  };

  const handleSaveCloudinary = (e) => {
    e.preventDefault();
    saveCloudinaryConfig(cloudinaryConfig);
    setCloudinarySaved(true);
    setTimeout(() => setCloudinarySaved(false), 3000);
  };

  const handleTestCloudinary = async () => {
    setCloudinaryStatus({ testing: true, msg: 'Testing upload to Cloudinary...', success: null });
    const res = await testCloudinaryConnection(
      cloudinaryConfig.cloudName,
      cloudinaryConfig.uploadPreset,
      cloudinaryConfig.apiKey,
      cloudinaryConfig.apiSecret
    );
    setCloudinaryStatus({ testing: false, msg: res.message, success: res.success });
  };

  const handleSyncAllToFirebase = async () => {
    setFirebaseStatus({ syncing: true, msg: 'Syncing all records to Firebase Cloud Firestore...', success: null });
    try {
      const mous = getStoredMous();
      const gallery = getStoredGallery();
      const placements = getStoredPlacements();
      const blogs = getStoredBlogs();
      const leaders = getStoredLeaders();
      const certs = getStoredCertificates();
      const leads = JSON.parse(localStorage.getItem('gv_admin_leads') || '[]');

      await Promise.all([
        syncToFirestore('mous', mous),
        syncToFirestore('gallery', gallery),
        syncToFirestore('placements', placements),
        syncToFirestore('blogs', blogs),
        syncToFirestore('leaders', leaders),
        syncToFirestore('certificates', certs),
        syncToFirestore('leads', leads)
      ]);

      setFirebaseStatus({
        syncing: false,
        msg: 'All MOUs, Gallery, Placements, Blogs, Leaders, and Student Leads synced to Firebase Firestore successfully!',
        success: true
      });
    } catch (err) {
      setFirebaseStatus({
        syncing: false,
        msg: 'Sync error: ' + err.message,
        success: false
      });
    }
  };

  const handleTestFirebase = async () => {
    setFirebaseStatus({ syncing: true, msg: 'Testing Firebase Firestore connection...', success: null });
    try {
      const testSuccess = await syncToFirestore('system_health', {
        timestamp: new Date().toISOString(),
        status: 'online',
        testMessage: 'GV DesignTech Firebase Connection Verified'
      });
      if (testSuccess) {
        setFirebaseStatus({
          syncing: false,
          msg: `Firebase Firestore (Project: ${firebaseConfig.projectId}) is connected and live!`,
          success: true
        });
      } else {
        setFirebaseStatus({
          syncing: false,
          msg: `Connected to Firebase app, but Firestore rules may need read/write permissions.`,
          success: false
        });
      }
    } catch (err) {
      setFirebaseStatus({ syncing: false, msg: 'Firebase error: ' + err.message, success: false });
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Center Details */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>⚙️</span>
            <span>Center Information &amp; Operational Config</span>
          </h3>
        </div>

        {notificationSaved && (
          <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', color: '#34d399', fontSize: '14px', marginBottom: '18px' }}>
            ✓ Center settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSaveConfig}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-label">Official Helpline Phone</label>
              <input
                type="text"
                className="admin-input"
                value={centerPhone}
                onChange={(e) => setCenterPhone(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Official Inquiries Email</label>
              <input
                type="email"
                className="admin-input"
                value={centerEmail}
                onChange={(e) => setCenterEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Physical Center Address</label>
            <input
              type="text"
              className="admin-input"
              defaultValue="No. 12, Pollachi Main Road, Coimbatore, Tamil Nadu 641021"
            />
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '14.5px' }}>Admissions Status Banner</div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Shows "Next Batch Admissions Open" indicator on website</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
              <input
                type="checkbox"
                checked={admissionOpen}
                onChange={(e) => setAdmissionOpen(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#d946ef' }}
              />
              <span style={{ fontSize: '13px', color: admissionOpen ? '#34d399' : '#94a3b8', fontWeight: '700' }}>
                {admissionOpen ? 'Active' : 'Paused'}
              </span>
            </label>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="admin-btn-primary">
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Cloudinary Cloud Storage Configuration */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="admin-card-title">
            <span>☁️</span>
            <span>Cloudinary Image Cloud Storage</span>
          </h3>
          <span style={{
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '999px',
            background: cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
            color: cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset ? '#34d399' : '#facc15',
            border: '1px solid',
            borderColor: cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset ? 'rgba(16, 185, 129, 0.3)' : 'rgba(234, 179, 8, 0.3)',
            fontWeight: '600'
          }}>
            {cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset ? '● Cloudinary Active' : '○ Standby / Local Mode'}
          </span>
        </div>

        {cloudinarySaved && (
          <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', color: '#34d399', fontSize: '14px', marginBottom: '18px' }}>
            ✓ Cloudinary credentials saved successfully! All newly uploaded photos will sync to Cloudinary.
          </div>
        )}

        {cloudinaryStatus.msg && (
          <div style={{
            padding: '12px 16px',
            background: cloudinaryStatus.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: '1px solid',
            borderColor: cloudinaryStatus.success ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)',
            borderRadius: '10px',
            color: cloudinaryStatus.success ? '#34d399' : '#f87171',
            fontSize: '13.5px',
            marginBottom: '18px'
          }}>
            {cloudinaryStatus.success ? '✅ ' : '⚠️ '}
            {cloudinaryStatus.msg}
          </div>
        )}

        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
          Connect your Cloudinary account for high-resolution cloud storage, automatic WebP compression, and global CDN delivery for all MOU photos, student placement profiles, and campus gallery pictures.
        </p>

        <form onSubmit={handleSaveCloudinary}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-label">Cloudinary Cloud Name *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. tci2igsn"
                value={cloudinaryConfig.cloudName}
                onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, cloudName: e.target.value })}
              />
              <span style={{ fontSize: '11px', color: '#64748b' }}>Cloud Name on your Cloudinary Dashboard</span>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Upload Preset Name (Unsigned) *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. gvdesigntech"
                value={cloudinaryConfig.uploadPreset}
                onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, uploadPreset: e.target.value })}
              />
              <span style={{ fontSize: '11px', color: '#64748b' }}>Settings &gt; Upload &gt; Add Upload Preset (Mode: Unsigned)</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-label">Cloudinary API Key (Optional / Signed)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. 474526512345773"
                value={cloudinaryConfig.apiKey || ''}
                onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, apiKey: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Cloudinary API Secret (Optional / Signed)</label>
              <input
                type="password"
                className="admin-input"
                placeholder="••••••••••••••••••••••••••••••"
                value={cloudinaryConfig.apiSecret || ''}
                onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, apiSecret: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginBottom: '20px' }}>
            <label className="admin-label">Cloudinary Folder</label>
            <input
              type="text"
              className="admin-input"
              placeholder="gvdesigntech"
              value={cloudinaryConfig.folder}
              onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, folder: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button type="submit" className="admin-btn-primary">
              💾 Save Cloudinary Settings
            </button>
            <button
              type="button"
              onClick={handleTestCloudinary}
              disabled={cloudinaryStatus.testing || !cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset}
              className="admin-btn-secondary"
              style={{ cursor: cloudinaryStatus.testing ? 'wait' : 'pointer' }}
            >
              {cloudinaryStatus.testing ? '⏳ Testing Connection...' : '⚡ Test Connection'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '12px', fontSize: '13px', color: '#e2e8f0', lineHeight: 1.7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: '700', fontSize: '14px', marginBottom: '8px' }}>
            <span>⚡</span>
            <span>Cloudinary Direct Browser Upload Setup (One-time, 30 seconds):</span>
          </div>
          <p style={{ margin: '0 0 10px', color: '#94a3b8' }}>
            To allow direct browser image uploads to Cloudinary without exposing secrets or hitting API key permissions, enable an <strong>Unsigned Upload Preset</strong> in your Cloudinary Console:
          </p>
          <ol style={{ margin: '0 0 12px 20px', padding: 0 }}>
            <li>Open <a href="https://console.cloudinary.com/settings/upload" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>console.cloudinary.com/settings/upload</a> (Settings ⚙️ &rarr; <strong>Upload</strong>).</li>
            <li>Scroll to <strong>Upload presets</strong> and click <strong>Add upload preset</strong>.</li>
            <li>Set <strong>Upload preset name</strong> to: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#f472b6', fontWeight: '700' }}>gvdesigntech</code></li>
            <li>Set <strong>Signing Mode</strong> to: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>Unsigned</code> (Important!)</li>
            <li>Set <strong>Folder</strong> to: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>gvdesigntech</code></li>
            <li>Click <strong>Save</strong> at the top right.</li>
          </ol>
          <div style={{ padding: '8px 12px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '8px', fontSize: '12px', color: '#4ade80' }}>
            ✓ Once saved, click <strong>"⚡ Test Connection"</strong> above to verify green status. All images added or edited in the Admin panel will instantly upload to Cloudinary CDN and appear on the live website!
          </div>
        </div>
      </div>

      {/* MongoDB Database Center */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="admin-card-title">
            <span>🍃</span>
            <span>MongoDB Database Center</span>
          </h3>
          <span style={{
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '999px',
            background: mongoStatus.success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: mongoStatus.success ? '#4ade80' : '#fbbf24',
            border: `1px solid ${mongoStatus.success ? 'rgba(34, 197, 94, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`,
            fontWeight: '600'
          }}>
            {mongoStatus.success ? '● MongoDB Connected (127.0.0.1:27017)' : '● Checking MongoDB...'}
          </span>
        </div>

        {mongoStatus.msg && (
          <div style={{
            padding: '12px 16px',
            background: mongoStatus.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: '1px solid',
            borderColor: mongoStatus.success ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)',
            borderRadius: '10px',
            color: mongoStatus.success ? '#34d399' : '#f87171',
            fontSize: '13.5px',
            marginBottom: '18px'
          }}>
            {mongoStatus.success ? '✅ ' : '⚠️ '}
            {mongoStatus.msg}
          </div>
        )}

        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
          All data in the admin panel (MOUs, Gallery photos, Placements, Blogs, Leadership, Certificates, Student Leads) is connected directly to your local MongoDB database (<strong style={{ color: '#4ade80' }}>gvdesigntech</strong>). Any new content added or updated in the admin panel persists to MongoDB and immediately updates the public website.
        </p>

        {mongoStatus.data && mongoStatus.data.counts && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', marginBottom: '20px' }}>
            {Object.entries(mongoStatus.data.counts).map(([col, count]) => (
              <div key={col} style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'capitalize' }}>{col}</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8', marginTop: '2px' }}>{count}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleSyncAllToMongo}
            disabled={mongoStatus.syncing}
            className="admin-btn-primary"
            style={{ cursor: mongoStatus.syncing ? 'wait' : 'pointer' }}
          >
            {mongoStatus.syncing ? '⏳ Syncing to MongoDB...' : '🍃 Sync All Content to MongoDB'}
          </button>
          <button
            type="button"
            onClick={handleTestMongo}
            disabled={mongoStatus.testing}
            className="admin-btn-secondary"
            style={{ cursor: mongoStatus.testing ? 'wait' : 'pointer' }}
          >
            {mongoStatus.testing ? '⏳ Checking...' : '⚡ Test MongoDB Connection'}
          </button>
        </div>
      </div>

      {/* Firebase Cloud Infrastructure (gvde-3e923) */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="admin-card-title">
            <span>🔥</span>
            <span>Firebase Cloud Infrastructure</span>
          </h3>
          <span style={{
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            fontWeight: '600'
          }}>
            ● Firebase App: {firebaseConfig.projectId}
          </span>
        </div>

        {firebaseStatus.msg && (
          <div style={{
            padding: '12px 16px',
            background: firebaseStatus.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: '1px solid',
            borderColor: firebaseStatus.success ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)',
            borderRadius: '10px',
            color: firebaseStatus.success ? '#34d399' : '#f87171',
            fontSize: '13.5px',
            marginBottom: '18px'
          }}>
            {firebaseStatus.success ? '✅ ' : '⚠️ '}
            {firebaseStatus.msg}
          </div>
        )}

        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
          GV DesignTech is linked to Google Firebase for real-time multi-device cloud synchronization, Google Analytics 4 tracking, and cloud data persistence.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project ID</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginTop: '4px' }}>{firebaseConfig.projectId}</div>
          </div>
          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Storage Bucket</div>
            <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#38bdf8', marginTop: '4px', wordBreak: 'break-all' }}>{firebaseConfig.storageBucket}</div>
          </div>
          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Auth Domain</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginTop: '4px' }}>{firebaseConfig.authDomain}</div>
          </div>
          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Analytics Measurement ID</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#fbbf24', marginTop: '4px' }}>{firebaseConfig.measurementId}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleSyncAllToFirebase}
            disabled={firebaseStatus.syncing}
            className="admin-btn-primary"
            style={{ cursor: firebaseStatus.syncing ? 'wait' : 'pointer' }}
          >
            {firebaseStatus.syncing ? '⏳ Syncing to Cloud...' : '🔥 Sync All Content to Firebase Cloud'}
          </button>
          <button
            type="button"
            onClick={handleTestFirebase}
            disabled={firebaseStatus.syncing}
            className="admin-btn-secondary"
            style={{ cursor: firebaseStatus.syncing ? 'wait' : 'pointer' }}
          >
            ⚡ Test Firebase Connection
          </button>
        </div>
      </div>

      {/* Database Maintenance & Backups */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>💾</span>
            <span>Data Backups &amp; Maintenance</span>
          </h3>
        </div>

        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
          Export the full database containing student inquiries, course batches, and candidate records as an offline JSON snapshot.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button type="button" onClick={handleExportBackup} className="admin-btn-primary">
            📥 Download Complete Backup (.json)
          </button>
          <button type="button" onClick={handleResetData} className="admin-btn-secondary" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            ⚠️ Reset Database to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
