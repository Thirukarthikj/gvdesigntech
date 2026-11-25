import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredMous, saveStoredMous } from '../../data/contentPersistence.js';
import { uploadImageToCloudinary } from '../../services/cloudinaryService.js';

export default function AdminMouManager() {
  const [mous, setMous] = useState(() => getStoredMous());
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    detail: 'Academic Curriculum Collaboration & Placement Drives',
    tag: 'Placement',
    date: new Date().getFullYear().toString(),
    image: ''
  });

  const photoPresets = [
    { label: 'Campus Seminar', path: '/assets/gallery/gallery-02.jpg' },
    { label: 'CAD Lab Training', path: '/assets/gallery/gallery-01.jpg' },
    { label: 'Classroom Batch', path: '/assets/gallery/gallery-04.jpg' },
    { label: 'Industry Review', path: '/assets/gallery/gallery-06.jpg' }
  ];

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      detail: 'Academic Curriculum Collaboration & Placement Drives',
      tag: 'Placement',
      date: new Date().getFullYear().toString(),
      image: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      detail: item.detail || '',
      tag: item.tag || 'Placement',
      date: item.date || new Date().getFullYear().toString(),
      image: item.image || ''
    });
    setIsModalOpen(true);
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
      const result = await uploadImageToCloudinary(file, { folder: 'gv_designtech/mous' });
      setFormData(prev => ({ ...prev, image: result.url }));
      if (result.isCloudinary) {
        showNotification('☁️ Photo uploaded to Cloudinary CDN successfully!');
      } else {
        showNotification('Photo saved locally (Configure Cloudinary in Settings for cloud CDN)');
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the MOU for "${name}"?`)) {
      const updated = mous.filter(m => (m.id !== id && m.name !== name));
      setMous(updated);
      saveStoredMous(updated);
      showNotification(`Deleted MOU for "${name}"`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingItem) {
      const updated = mous.map(m => {
        if ((editingItem.id && m.id === editingItem.id) || (!editingItem.id && m.name === editingItem.name)) {
          return { ...m, ...formData };
        }
        return m;
      });
      setMous(updated);
      saveStoredMous(updated);
      showNotification(`Updated MOU for "${formData.name}"`);
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      const updated = [newItem, ...mous];
      setMous(updated);
      saveStoredMous(updated);
      showNotification(`Added new MOU for "${formData.name}"`);
    }

    setIsModalOpen(false);
  };

  const filtered = mous.filter(m => {
    const matchesSearch = (m.name || '').toLowerCase().includes(search.toLowerCase()) ||
                          (m.detail || '').toLowerCase().includes(search.toLowerCase());
    const matchesTag = filterTag === 'all' || (m.tag || '').toLowerCase() === filterTag.toLowerCase();
    return matchesSearch && matchesTag;
  });

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

      {/* Top Action Bar */}
      <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            className="admin-search-input"
            placeholder="🔍 Search college, university, scope..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="admin-select"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="all">All MOU Scopes</option>
            <option value="Placement">Placement Drives</option>
            <option value="Internship">Internship Collaboration</option>
            <option value="Training">Industrial Training</option>
            <option value="Skills">Skill Development</option>
            <option value="Collaboration">Workshops & Seminars</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            to="/flagship/mou"
            target="_blank"
            className="admin-btn-secondary"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>👁️ View Public MOU Page</span>
          </Link>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="admin-btn-primary"
          >
            + Add New MOU Partnership
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">
              <span>🏛️</span>
              <span>Signed Institutional MOUs ({filtered.length} Active Records)</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
              Changes made here update the public <strong style={{ color: '#c084fc' }}>/flagship/mou</strong> page immediately.
            </p>
          </div>
          <span style={{ fontSize: '12px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            ● Live Sync Enabled
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          padding: '24px'
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
              No institutional MOUs matched your query.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const displayImg = item.image || photoPresets[idx % photoPresets.length].path;
              return (
                <div
                  key={item.id || idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '180px', position: 'relative', background: '#0a0618' }}>
                    <img
                      src={displayImg}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/gallery/gallery-02.jpg'; }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      color: '#c084fc',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {item.tag || 'MOU Signed'}
                    </span>
                  </div>

                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700', color: '#fff', lineHeight: 1.35 }}>
                      {item.name}
                    </h4>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, flex: 1 }}>
                      {item.detail}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#38bdf8' }}>
                        📍 {item.date || 'Active'}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          style={{
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            color: '#c084fc',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            color: '#f87171',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
            maxWidth: '580px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                {editingItem ? '✏️ Edit Institutional MOU' : '🏛️ Add New Institutional Partner MOU'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '22px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  College or Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Government College of Engineering, Salem"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
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
                  Partnership Scope & Objectives *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. Mechanical CAD Lab Setup, Campus Placement Drives & Joint Summer Internships"
                  value={formData.detail}
                  onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Category Tag
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: '#150f30',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="Placement">Placement</option>
                    <option value="Internship">Internship</option>
                    <option value="Training">Training</option>
                    <option value="Skills">Skills</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Validity / Signed Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2024 - 2027"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
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

              {/* Institution / Event Image Section */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc', margin: 0 }}>
                    📷 Institution / MOU Signing Photo or Logo
                  </label>
                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#f87171',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ✕ Remove Photo
                    </button>
                  )}
                </div>

                {/* File Upload from PC */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    <span>Upload Photo to Cloudinary:</span>
                    {uploadingImage && <span style={{ color: '#22d3ee', fontWeight: '700' }}>⏳ Uploading to Cloudinary...</span>}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingImage}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px dashed rgba(139, 92, 246, 0.4)',
                      color: '#cbd5e1',
                      fontSize: '12px',
                      cursor: uploadingImage ? 'wait' : 'pointer'
                    }}
                  />
                </div>

                {/* Presets */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    Or Choose Campus Preset:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {photoPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.path })}
                        style={{
                          padding: '7px 10px',
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
                </div>

                {/* Direct URL input */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    Or enter image path / URL:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /assets/gallery/gallery-02.jpg or https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Live Preview */}
                {formData.image && (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '100px',
                      height: '65px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: '#0a0618',
                      border: '1px solid rgba(217, 70, 239, 0.4)',
                      flexShrink: 0
                    }}>
                      <img
                        src={formData.image}
                        alt="MOU Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <span style={{ fontSize: '12px', color: '#4ade80' }}>
                      ✓ Image attached and will appear on the public MOU card!
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
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
                  {editingItem ? '💾 Save Changes' : '+ Add MOU'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
