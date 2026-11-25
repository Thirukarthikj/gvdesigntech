import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredPlacements, saveStoredPlacements } from '../../data/contentPersistence.js';

export default function AdminPlacementManager() {
  const [data, setData] = useState(() => getStoredPlacements());
  const [toast, setToast] = useState('');
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);

  // Form state for editing headline stats
  const [stats, setStats] = useState(() => (data.stats || []).map(s => ({ ...s })));

  // Form state for student success story
  const [storyForm, setStoryForm] = useState({
    name: '',
    role: '',
    pkg: '',
    quote: '',
    image: ''
  });

  const storyPresets = [
    { label: 'Automotive CAD', path: '/assets/cad-card-mechanical.jpg' },
    { label: 'BIM Infrastructure', path: '/assets/cad-card-civil.jpg' },
    { label: 'Precision Machining', path: '/assets/gallery/gallery-01.jpg' },
    { label: 'AI & Full Stack', path: '/assets/recent-activity/ai-workshop-2.jpg' }
  ];

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target.result;
      setStoryForm(prev => ({ ...prev, image: base64Url }));
    };
    reader.readAsDataURL(file);
  };

  const handleStatChange = (index, field, value) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const handleSaveStats = (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      stats: stats
    };
    setData(updatedData);
    saveStoredPlacements(updatedData);
    showNotification('Placement headline statistics saved successfully!');
  };

  const handleOpenAddStory = () => {
    setEditingStory(null);
    setStoryForm({
      name: '',
      role: '',
      pkg: '6.5 LPA',
      quote: '',
      image: ''
    });
    setIsStoryModalOpen(true);
  };

  const handleOpenEditStory = (story) => {
    setEditingStory(story);
    setStoryForm({
      name: story.name || '',
      role: story.role || '',
      pkg: story.pkg || '',
      quote: story.quote || '',
      image: story.image || ''
    });
    setIsStoryModalOpen(true);
  };

  const handleDeleteStory = (storyId, name) => {
    if (window.confirm(`Delete placement story for "${name}"?`)) {
      const updatedStories = (data.stories || []).filter(s => (s.id !== storyId && s.name !== name));
      const updatedData = { ...data, stories: updatedStories };
      setData(updatedData);
      saveStoredPlacements(updatedData);
      showNotification(`Deleted story for ${name}`);
    }
  };

  const handleSaveStory = (e) => {
    e.preventDefault();
    if (!storyForm.name.trim() || !storyForm.quote.trim()) return;

    let updatedStories;
    if (editingStory) {
      updatedStories = (data.stories || []).map(s => {
        if ((editingStory.id && s.id === editingStory.id) || (!editingStory.id && s.name === editingStory.name)) {
          return { ...s, ...storyForm };
        }
        return s;
      });
      showNotification(`Updated story for ${storyForm.name}`);
    } else {
      const newStory = {
        id: 'story-' + Date.now(),
        ...storyForm
      };
      updatedStories = [newStory, ...(data.stories || [])];
      showNotification(`Added new story for ${storyForm.name}`);
    }

    const updatedData = { ...data, stories: updatedStories };
    setData(updatedData);
    saveStoredPlacements(updatedData);
    setIsStoryModalOpen(false);
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

      {/* Top Bar */}
      <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 4px', color: '#fff' }}>
            💼 Placement & Career Outcomes Management
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
            Modify headline metrics and student placement achievements on the public <strong style={{ color: '#c084fc' }}>/flagship/placement</strong> page.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            to="/flagship/placement"
            target="_blank"
            className="admin-btn-secondary"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>👁️ View Public Placement Page</span>
          </Link>
        </div>
      </div>

      {/* Section 1: Headline Statistics */}
      <div className="admin-card" style={{ marginBottom: '32px' }}>
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">
              <span>📊</span>
              <span>Headline Placement Metrics</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
              The 5 key metrics highlighted in the hero section.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSaveStats}
            className="admin-btn-primary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            💾 Save Metrics
          </button>
        </div>

        <form onSubmit={handleSaveStats} style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {stats.map((st, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '14px'
                }}
              >
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Metric Value
                </label>
                <input
                  type="text"
                  value={st.target}
                  onChange={(e) => handleStatChange(idx, 'target', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#0e0924',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    color: '#22d3ee',
                    fontSize: '18px',
                    fontWeight: '800',
                    marginBottom: '10px'
                  }}
                />

                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Label
                </label>
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#0e0924',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn-primary">
              💾 Save Headline Metrics
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Student Success Stories */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">
              <span>🌟</span>
              <span>Student Success Stories &amp; Testimonials ({(data.stories || []).length})</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
              Real alumni testimonials showcasing placements across automotive, infrastructure, aerospace &amp; IT firms.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddStory}
            className="admin-btn-primary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            + Add Success Story
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          padding: '24px'
        }}>
          {(data.stories || []).length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
              No success stories created yet.
            </div>
          ) : (
            (data.stories || []).map((story, idx) => {
              const displayImg = story.image || storyPresets[idx % storyPresets.length].path;
              return (
                <div
                  key={story.id || idx}
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
                      alt={story.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/cad-card-mechanical.jpg'; }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(217, 70, 239, 0.6)',
                      color: '#f472b6',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {story.pkg}
                    </span>
                  </div>

                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#fff' }}>
                      {story.name}
                    </h4>
                    <div style={{ fontSize: '12.5px', color: '#22d3ee', fontWeight: '600', marginBottom: '8px' }}>
                      {story.role}
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, flex: 1, fontStyle: 'italic' }}>
                      "{story.quote}"
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#38bdf8' }}>
                        📍 Verified Placement
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditStory(story)}
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
                          onClick={() => handleDeleteStory(story.id, story.name)}
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

      {/* Story Modal */}
      {isStoryModalOpen && (
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
            padding: '30px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                {editingStory ? '✏️ Edit Success Story' : '🌟 Add Student Success Story'}
              </h3>
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '22px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karthik Raja"
                  value={storyForm.name}
                  onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Job Role &amp; Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mechanical Design Engineer @ Automotive Tier-1"
                    value={storyForm.role}
                    onChange={(e) => setStoryForm({ ...storyForm, role: e.target.value })}
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
                    Package *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 7.2 LPA"
                    value={storyForm.pkg}
                    onChange={(e) => setStoryForm({ ...storyForm, pkg: e.target.value })}
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

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Student Testimonial Quote *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Share the student's personal experience, the skills learned, and how they succeeded in interviews..."
                  value={storyForm.quote}
                  onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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

              {/* Photo Upload & Presets */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc', margin: 0 }}>
                    📷 Student Placement / Company Work Photo
                  </label>
                  {storyForm.image && (
                    <button
                      type="button"
                      onClick={() => setStoryForm({ ...storyForm, image: '' })}
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

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    Upload Photo from Computer:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px dashed rgba(139, 92, 246, 0.4)',
                      color: '#cbd5e1',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    Or Choose Engineering Preset:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {storyPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setStoryForm({ ...storyForm, image: preset.path })}
                        style={{
                          padding: '7px 10px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: storyForm.image === preset.path ? '#d946ef' : 'rgba(255,255,255,0.1)',
                          background: storyForm.image === preset.path ? 'rgba(217, 70, 239, 0.2)' : 'rgba(255,255,255,0.03)',
                          color: storyForm.image === preset.path ? '#fff' : '#94a3b8',
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

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    Or enter image URL:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /assets/cad-card-mechanical.jpg or https://..."
                    value={storyForm.image}
                    onChange={(e) => setStoryForm({ ...storyForm, image: e.target.value })}
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

                {storyForm.image && (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '90px',
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: '#0a0618',
                      border: '1px solid rgba(217, 70, 239, 0.4)',
                      flexShrink: 0
                    }}>
                      <img
                        src={storyForm.image}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <span style={{ fontSize: '12px', color: '#4ade80' }}>
                      ✓ Photo attached to alumni story!
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
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
                  {editingStory ? '💾 Save Story' : '+ Add Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
