import React, { useState, useEffect } from 'react';
import { getStoredMous, saveStoredMous, subscribeToContentUpdates } from '../../data/contentPersistence.js';

export default function AdminPartners() {
  const [partnerList, setPartnerList] = useState(() => getStoredMous());
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/mous')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPartnerList(data);
          localStorage.setItem('gv_admin_mous', JSON.stringify(data));
        }
      })
      .catch(() => {});

    const unsub = subscribeToContentUpdates((topic) => {
      if (topic === 'mou' || topic === 'all') {
        setPartnerList(getStoredMous());
      }
    });

    return () => unsub();
  }, []);

  const [newPartner, setNewPartner] = useState({
    name: '',
    detail: 'Academic Curriculum Collaboration & Placement Drives',
    tag: 'Placement',
    date: new Date().getFullYear().toString()
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newPartner.name.trim()) return;

    const created = {
      ...newPartner,
      id: Date.now()
    };
    const updated = [created, ...partnerList];
    setPartnerList(updated);
    saveStoredMous(updated);
    setIsModalOpen(false);
    setNewPartner({
      name: '',
      detail: 'Academic Curriculum Collaboration & Placement Drives',
      tag: 'Placement',
      date: new Date().getFullYear().toString()
    });
  };

  const filtered = partnerList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.detail.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter === 'all' || p.tag.toLowerCase() === tagFilter.toLowerCase();
    return matchesSearch && matchesTag;
  });

  return (
    <div>
      <div className="admin-toolbar">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          <input
            type="text"
            className="admin-search-input"
            placeholder="🔍 Search college, institution, detail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="admin-select"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="all">All Partnership Types</option>
            <option value="Placement">Placement Drives</option>
            <option value="Internship">Internship Collaboration</option>
            <option value="Training">Industrial Training</option>
            <option value="Skills">Skill Development</option>
            <option value="Collaboration">Workshops &amp; Seminars</option>
          </select>
        </div>

        <button type="button" onClick={() => setIsModalOpen(true)} className="admin-btn-primary">
          + Add Academic Partner
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>🏛️</span>
            <span>Signed Institutional MOUs &amp; Academic Tie-ups ({filtered.length})</span>
          </h3>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Official university agreements empowering student cohorts across Tamil Nadu
          </span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>College / Institution Name</th>
                <th>Partnership Scope</th>
                <th>Category Tag</th>
                <th>Signed / Valid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td style={{ fontWeight: '700', color: '#fff' }}>{item.name}</td>
                  <td style={{ color: '#cbd5e1' }}>{item.detail}</td>
                  <td>
                    <span style={{ padding: '4px 10px', borderRadius: '999px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', color: '#f472b6', fontSize: '12px', fontWeight: '700' }}>
                      {item.tag}
                    </span>
                  </td>
                  <td style={{ color: '#94a3b8', fontSize: '13px' }}>{item.date}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12px', fontWeight: '700' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                      Active MOU
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#fff' }}>Register New Academic Partner MOU</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="admin-form-group">
                <label className="admin-label">College / University Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. Coimbatore Institute of Engineering and Technology (CIET)"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Partnership Scope / Detail</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. CAD Training, Faculty Development & Placement"
                  value={newPartner.detail}
                  onChange={(e) => setNewPartner({ ...newPartner, detail: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Partnership Category</label>
                  <select
                    className="admin-input"
                    value={newPartner.tag}
                    onChange={(e) => setNewPartner({ ...newPartner, tag: e.target.value })}
                  >
                    <option value="Placement">Placement</option>
                    <option value="Internship">Internship</option>
                    <option value="Training">Training</option>
                    <option value="Skills">Skills</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Signing Date / Year</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Nov 2026"
                    value={newPartner.date}
                    onChange={(e) => setNewPartner({ ...newPartner, date: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Save Partner MOU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
