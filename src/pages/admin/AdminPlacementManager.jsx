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
    quote: ''
  });

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
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
      quote: ''
    });
    setIsStoryModalOpen(true);
  };

  const handleOpenEditStory = (story) => {
    setEditingStory(story);
    setStoryForm({
      name: story.name || '',
      role: story.role || '',
      pkg: story.pkg || '',
      quote: story.quote || ''
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

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Designation &amp; Company</th>
                <th>Package</th>
                <th>Testimonial Quote</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data.stories || []).length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No success stories created yet.
                  </td>
                </tr>
              ) : (
                (data.stories || []).map((story, idx) => (
                  <tr key={story.id || idx}>
                    <td style={{ fontWeight: '700', color: '#fff', minWidth: '160px' }}>
                      {story.name}
                    </td>
                    <td style={{ color: '#22d3ee', fontWeight: '500', minWidth: '220px' }}>
                      {story.role}
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        background: 'rgba(217, 70, 239, 0.15)',
                        border: '1px solid rgba(217, 70, 239, 0.4)',
                        color: '#f472b6',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {story.pkg}
                      </span>
                    </td>
                    <td style={{ color: '#cbd5e1', fontSize: '13px', maxWidth: '380px', fontStyle: 'italic' }}>
                      "{story.quote}"
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditStory(story)}
                          style={{
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            color: '#c084fc',
                            padding: '6px 12px',
                            borderRadius: '8px',
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
                            padding: '6px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
            maxWidth: '560px',
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
                  rows="4"
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
