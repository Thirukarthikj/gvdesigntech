import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredBlogs, saveStoredBlogs } from '../../data/contentPersistence.js';
import { blogCategories } from '../../data/blogs.js';
import { uploadImageToCloudinary, compressImageFile } from '../../services/cloudinaryService.js';

export default function AdminBlogManager() {
  const [blogs, setBlogs] = useState(() => getStoredBlogs());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Mechanical CAD',
    excerpt: '',
    content: '',
    author: 'GV Tech Editorial',
    readTime: '5 min read',
    views: '1.2k',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    image: '/assets/recent-activity/ai-workshop-2.jpg'
  });

  const blogPresets = [
    { label: 'CAD & AI Workshop', path: '/assets/recent-activity/ai-workshop-2.jpg' },
    { label: 'Campus Seminar', path: '/assets/gallery/gallery-02.jpg' },
    { label: 'CAD Lab Practical', path: '/assets/gallery/gallery-01.jpg' },
    { label: 'Workstation Modeling', path: '/assets/gallery/gallery-03.jpg' }
  ];

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
      showNotification('📷 Blog cover attached! Processing cloud upload...');

      const result = await uploadImageToCloudinary(file, { folder: 'gvdesigntech/blogs' });
      if (result && result.isCloudinary) {
        setFormData(prev => ({ ...prev, image: result.url }));
        showNotification('☁️ Blog cover uploaded to Cloudinary CDN successfully!');
      } else {
        showNotification('✓ Blog cover attached and ready to save!');
      }
    } catch (err) {
      console.warn('Upload fallback to local image:', err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Mechanical CAD',
      excerpt: '',
      content: '',
      author: 'GV Tech Editorial',
      readTime: '5 min read',
      views: '850',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: '/assets/recent-activity/ai-workshop-2.jpg'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Mechanical CAD',
      excerpt: item.excerpt || '',
      content: item.content || item.excerpt || '',
      author: item.author || 'GV Tech Editorial',
      readTime: item.readTime || '5 min read',
      views: item.views || '1.2k',
      date: item.date || 'Active',
      image: item.image || '/assets/recent-activity/ai-workshop-2.jpg'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      saveStoredBlogs(updated);
      showNotification(`Deleted article "${title}"`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      const updated = blogs.map(b => {
        if (b.id === editingItem.id) {
          return { ...b, ...formData };
        }
        return b;
      });
      setBlogs(updated);
      saveStoredBlogs(updated);
      showNotification(`Updated article "${formData.title}"`);
    } else {
      const newItem = {
        id: 'blog-' + Date.now(),
        ...formData
      };
      const updated = [newItem, ...blogs];
      setBlogs(updated);
      saveStoredBlogs(updated);
      showNotification(`Published new article "${formData.title}"`);
    }

    setIsModalOpen(false);
  };

  const filtered = blogs.filter(b => {
    const matchesSearch = (b.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (b.excerpt || '').toLowerCase().includes(search.toLowerCase()) ||
                          (b.author || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || b.category === categoryFilter;
    return matchesSearch && matchesCat;
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

      {/* Toolbar */}
      <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            className="admin-search-input"
            placeholder="🔍 Search articles by title, author, topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="admin-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {blogCategories.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            to="/flagship/Blog-page"
            target="_blank"
            className="admin-btn-secondary"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>👁️ View Public Blog</span>
          </Link>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="admin-btn-primary"
          >
            + Create New Article
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">
              <span>📰</span>
              <span>Engineering Articles &amp; Insights ({filtered.length} Posts)</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
              Published articles on the public <strong style={{ color: '#c084fc' }}>/flagship/Blog-page</strong>.
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
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>📰</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>No Blog Articles in Database</div>
              <p style={{ margin: 0, fontSize: '13px' }}>Click "+ Create New Article" above to publish your first technical article.</p>
            </div>
          ) : (
            filtered.map((post) => (
              <div
                key={post.id}
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
                    src={post.image || '/assets/recent-activity/ai-workshop-2.jpg'}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/assets/recent-activity/ai-workshop-2.jpg'; }}
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
                    {post.category}
                  </span>
                </div>

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700', color: '#fff', lineHeight: 1.35 }}>
                    {post.title}
                  </h4>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#38bdf8' }}>
                      📍 {post.date || 'Active'}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(post)}
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
                        onClick={() => handleDelete(post.id, post.title)}
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
            ))
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
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '30px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                {editingItem ? '✏️ Edit Article' : '📰 Create Technical Article'}
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
                  Article Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mastering GD&T Standards in Automotive Part Drafting"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: '#150f30',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    {blogCategories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GV Tech Editorial"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
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

              {/* Cover Image Section */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#c084fc', marginBottom: '8px' }}>
                  📷 Article Cover Graphic / Image
                </label>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    <span>Upload Cover Graphic to Cloudinary:</span>
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

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    Or Choose Preset Graphic:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {blogPresets.map((preset, idx) => (
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

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                    Or enter image URL:
                  </label>
                  <input
                    type="text"
                    placeholder="/assets/recent-activity/ai-workshop-2.jpg"
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

                {formData.image && (
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
                        src={formData.image}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <span style={{ fontSize: '12px', color: '#4ade80' }}>
                      ✓ Cover image attached!
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Short Summary / Excerpt *
                </label>
                <textarea
                  rows="2"
                  required
                  placeholder="Brief synopsis shown in article cards..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
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

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Full Article Body / Key Insights
                </label>
                <textarea
                  rows="5"
                  placeholder="Full technical guide, breakdown, methodology and code/design explanations..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                  {editingItem ? '💾 Save Changes' : '🚀 Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
