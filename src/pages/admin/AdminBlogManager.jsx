import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredBlogs, saveStoredBlogs } from '../../data/contentPersistence.js';
import { blogCategories } from '../../data/blogs.js';

export default function AdminBlogManager() {
  const [blogs, setBlogs] = useState(() => getStoredBlogs());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState('');

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

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Read Time</th>
                <th>Date Published</th>
                <th>Views</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No blog posts found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id}>
                    <td style={{ fontWeight: '700', color: '#fff', minWidth: '240px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#130d2d' }}>
                          <img
                            src={post.image || '/assets/recent-activity/ai-workshop-2.jpg'}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/assets/recent-activity/ai-workshop-2.jpg'; }}
                          />
                        </div>
                        <div>
                          <div>{post.title}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '400', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {post.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        background: 'rgba(139, 92, 246, 0.15)',
                        border: '1px solid rgba(139, 92, 246, 0.4)',
                        color: '#c084fc',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {post.category}
                      </span>
                    </td>
                    <td style={{ color: '#cbd5e1' }}>{post.author || 'GV Editorial'}</td>
                    <td style={{ color: '#94a3b8' }}>{post.readTime || '5 min'}</td>
                    <td style={{ color: '#cbd5e1' }}>{post.date}</td>
                    <td style={{ color: '#22d3ee', fontWeight: '600' }}>{post.views || '1.1k'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(post)}
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
                          onClick={() => handleDelete(post.id, post.title)}
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

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="/assets/recent-activity/ai-workshop-2.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
