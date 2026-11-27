import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredLeaders, saveStoredLeaders } from '../../data/contentPersistence.js';
import { uploadImageToCloudinary, compressImageFile } from '../../services/cloudinaryService.js';

export default function AdminLeaderManager() {
  const [leaders, setLeaders] = useState(() => getStoredLeaders());
  const [toast, setToast] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    org: 'GV DesignTech',
    image: '/assets/chairman-real-uq_F_5Yk.jpg',
    objectPosition: 'center center'
  });

  const photoPresets = [
    { label: 'Vinith Gunasekaran', path: '/assets/chairman-real-uq_F_5Yk.jpg', pos: 'center center' },
    { label: 'Gokul Prasath K', path: '/assets/gokul-prasath.jpg', pos: 'center 12%' },
    { label: 'CAD Lab Executive 1', path: '/assets/gallery/gallery-01.jpg', pos: 'center center' },
    { label: 'Project Director', path: '/assets/gallery/gallery-06.jpg', pos: 'center center' }
  ];

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 'leader-' + Date.now(),
      name: '',
      role: 'Director',
      org: 'GV DesignTech',
      image: '/assets/chairman-real-uq_F_5Yk.jpg',
      objectPosition: 'center center'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name || '',
      role: item.role || '',
      org: item.org || 'GV DesignTech',
      image: item.image || '/assets/chairman-real-uq_F_5Yk.jpg',
      objectPosition: item.objectPosition || 'center center'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete leadership profile for "${name}"?`)) {
      const updated = leaders.filter(l => l.id !== id);
      setLeaders(updated);
      saveStoredLeaders(updated);
      showNotification(`Deleted profile for ${name}`);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP).');
      return;
    }

    setUploadingImage(true);
    try {
      const localData = await compressImageFile(file);
      setFormData(prev => ({ ...prev, image: localData }));
      showNotification('📷 Leader photo attached! Processing cloud upload...');

      const result = await uploadImageToCloudinary(file, { folder: 'gvdesigntech/leaders' });
      if (result && result.isCloudinary) {
        setFormData(prev => ({ ...prev, image: result.url }));
        showNotification('☁️ Leader photo uploaded to Cloudinary CDN successfully!');
      } else {
        showNotification('✓ Leader photo attached and ready to save!');
      }
    } catch (err) {
      console.warn('Upload fallback to local image:', err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.image.trim()) return;

    let updated;
    if (editingItem) {
      updated = leaders.map(l => (l.id === editingItem.id ? { ...l, ...formData } : l));
      showNotification(`Updated profile for ${formData.name}`);
    } else {
      updated = [...leaders, { ...formData, id: 'leader-' + Date.now() }];
      showNotification(`Added ${formData.name} to Leadership Team`);
    }

    setLeaders(updated);
    saveStoredLeaders(updated);
    setIsModalOpen(false);
  };

  return (
    <div>
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          zIndex: 9999,
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>✅</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 4px', color: '#fff' }}>
            👑 Leadership &amp; Founders Profiles Management
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
            Edit founder names, executive titles, and profile photos displayed on the main homepage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            to="/"
            target="_blank"
            className="admin-btn-secondary"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>👁️ View Live Website</span>
          </Link>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="admin-btn-primary"
          >
            + Add Leadership Profile
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">
              <span>👥</span>
              <span>Active Leadership Profiles ({leaders.length})</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
              These cards render on the hero section of the homepage beside "Best CAD &amp; Engineering Design Training Center".
            </p>
          </div>
          <span style={{ fontSize: '12px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            ● Live Sync Enabled
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '16px',
          padding: '16px 0'
        }}>
          {leaders.map((leader) => (
            <div
              key={leader.id}
              style={{
                background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.6), rgba(6, 6, 24, 0.8))',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                borderRadius: '20px',
                padding: '16px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flexWrap: 'wrap',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              {/* Photo Frame */}
              <div style={{
                width: '120px',
                height: '140px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#0a0618',
                border: '2px solid rgba(217, 70, 239, 0.4)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                flexShrink: 0
              }}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: leader.objectPosition || 'center center'
                  }}
                  onError={(e) => { e.target.src = '/assets/chairman-real-uq_F_5Yk.jpg'; }}
                />
              </div>

              {/* Info Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#22d3ee',
                  letterSpacing: '1px',
                  marginBottom: '4px',
                  textTransform: 'uppercase'
                }}>
                  {leader.org || 'GV DesignTech'}
                </span>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {leader.name}
                </h4>
                <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#c084fc', marginBottom: '14px' }}>
                  {leader.role}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(leader)}
                    style={{
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      color: '#c084fc',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}
                  >
                    ✏️ Edit Photo &amp; Name
                  </button>
                  {leaders.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDelete(leader.id, leader.name)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        color: '#f87171',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 2, 10, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999
        }}>
          <div style={{
            background: 'linear-gradient(160deg, #181136, #090518)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '30px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                {editingItem ? '✏️ Edit Leadership Profile' : '👑 Add Leadership Profile'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '22px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Leader Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vinith Gunasekaran"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Founder / CEO"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Organization / Center
                  </label>
                  <input
                    type="text"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Photo selection */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Leader Photo URL or Choose Preset:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '10px' }}>
                  {photoPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.path, objectPosition: preset.pos })}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: formData.image === preset.path ? '#d946ef' : 'rgba(255,255,255,0.1)',
                        background: formData.image === preset.path ? 'rgba(217, 70, 239, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: formData.image === preset.path ? '#fff' : '#94a3b8',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    <span>Upload Leader Photo to Cloudinary:</span>
                    {uploadingImage && <span style={{ color: '#22d3ee', fontWeight: '700' }}>⏳ Uploading to Cloudinary...</span>}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingImage}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px dashed rgba(139, 92, 246, 0.4)',
                      color: '#cbd5e1',
                      fontSize: '12px',
                      cursor: uploadingImage ? 'wait' : 'pointer'
                    }}
                  />
                </div>

                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                  Or enter custom image URL/path:
                </label>
                <input
                  type="text"
                  required
                  placeholder="/assets/chairman-real-uq_F_5Yk.jpg or https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Position and Live Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '14px', alignItems: 'center' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Photo Alignment
                  </label>
                  <select
                    value={formData.objectPosition}
                    onChange={(e) => setFormData({ ...formData, objectPosition: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: '#150f30',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  >
                    <option value="center center">Center (Default)</option>
                    <option value="center 12%">Focus Top / Face (Center 12%)</option>
                    <option value="center 20%">Focus Face (Center 20%)</option>
                    <option value="top center">Top Center</option>
                  </select>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '96px',
                    margin: '0 auto',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#0a0618',
                    border: '2px solid rgba(217, 70, 239, 0.4)'
                  }}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: formData.objectPosition
                      }}
                      onError={(e) => { e.target.src = '/assets/chairman-real-uq_F_5Yk.jpg'; }}
                    />
                  </div>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Preview</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#cbd5e1',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{ padding: '10px 24px', fontSize: '14px' }}
                >
                  {editingItem ? '💾 Save Changes' : '+ Add Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
