import React, { useState, useEffect } from 'react';
import { getStoredInternships, saveStoredInternships } from '../../data/adminInitialData.js';

export default function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setInternships(getStoredInternships());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = internships.map(i => i.id === id ? { ...i, status: newStatus } : i);
    setInternships(updated);
    saveStoredInternships(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this internship applicant?')) {
      const updated = internships.filter(i => i.id !== id);
      setInternships(updated);
      saveStoredInternships(updated);
    }
  };

  const filtered = internships.filter(i => {
    const matchesSearch =
      i.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      i.college.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase());
    const matchesProgram = programFilter === 'all' || i.internshipProgram.toLowerCase().includes(programFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || i.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <div>
      <div className="admin-toolbar">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          <input
            type="text"
            className="admin-search-input"
            placeholder="🔍 Search candidate, college, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="admin-select"
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
          >
            <option value="all">All Internship Programs</option>
            <option value="AI">AI Internship</option>
            <option value="Summer">Summer Internship</option>
            <option value="College">College Internship</option>
            <option value="Data Science">Data Science Internship</option>
            <option value="Machine Learning">Machine Learning Internship</option>
          </select>

          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Candidate Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>💼</span>
            <span>Internship Candidates Pipeline ({filtered.length})</span>
          </h3>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Evaluate student credentials and assign cohort selections
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="admin-table-desktop">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Program Applied</th>
                  <th>College / Department</th>
                  <th>CGPA</th>
                  <th>Applied Date</th>
                  <th>Review Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                      No internship candidates match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ fontWeight: '700', color: '#fff' }}>{item.candidateName}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.email} · {item.phone}</div>
                      </td>
                      <td>
                        <span style={{ color: '#22d3ee', fontWeight: '600' }}>{item.internshipProgram}</span>
                      </td>
                      <td>
                        <div style={{ color: '#cbd5e1' }}>{item.college}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Dept: {item.department}</div>
                      </td>
                      <td>
                        <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', fontWeight: '700', color: '#fbbf24' }}>
                          {item.cgpa}
                        </span>
                      </td>
                      <td style={{ fontSize: '13px', color: '#94a3b8' }}>{item.appliedDate}</td>
                      <td>
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '999px',
                            background: '#0d0f28',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            color: item.status === 'Selected' ? '#34d399' : item.status === 'Shortlisted' ? '#22d3ee' : item.status === 'Rejected' ? '#ef4444' : '#fbbf24',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '15px' }}
                          title="Delete candidate"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Vertical Cards (Top to Bottom Scroll) */}
        <div className="admin-cards-mobile">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: '#94a3b8', background: 'rgba(5, 5, 18, 0.6)', borderRadius: '12px' }}>
              No internship candidates match the filter criteria.
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className="admin-mobile-data-card">
                <div className="admin-mobile-card-header">
                  <div>
                    <h4 className="admin-mobile-card-title">{item.candidateName}</h4>
                    <div className="admin-mobile-card-subtitle">{item.email}</div>
                  </div>
                  <span
                    className="admin-mobile-card-badge"
                    style={{
                      background: 'rgba(34, 211, 238, 0.15)',
                      border: '1px solid rgba(34, 211, 238, 0.35)',
                      color: '#22d3ee'
                    }}
                  >
                    {item.internshipProgram}
                  </span>
                </div>

                <div className="admin-mobile-card-body">
                  <div className="admin-mobile-card-item">
                    <span>🎓</span>
                    <span>{item.college}</span>
                  </div>
                  <div className="admin-mobile-card-item">
                    <span>🏢</span>
                    <span>Dept: {item.department}</span>
                  </div>
                  <div className="admin-mobile-card-item">
                    <span>⭐</span>
                    <span>CGPA: <strong style={{ color: '#fbbf24', background: 'rgba(251, 191, 36, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>{item.cgpa}</strong></span>
                  </div>
                  <div className="admin-mobile-card-item">
                    <span>📞</span>
                    <a href={`tel:${item.phone}`} style={{ color: '#38bdf8', textDecoration: 'none', fontFamily: 'monospace', fontWeight: '600' }}>
                      {item.phone}
                    </a>
                  </div>
                  <div className="admin-mobile-card-item" style={{ fontSize: '12px', color: '#94a3b8' }}>
                    <span>📅</span>
                    <span>Applied: {item.appliedDate}</span>
                  </div>
                </div>

                <div className="admin-mobile-card-footer">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '999px',
                      background: '#0d0f28',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      color: item.status === 'Selected' ? '#34d399' : item.status === 'Shortlisted' ? '#22d3ee' : item.status === 'Rejected' ? '#ef4444' : '#fbbf24',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <div className="admin-mobile-card-actions">
                    <a
                      href={`tel:${item.phone}`}
                      className="admin-mobile-action-pill"
                      style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.35)', color: '#22d3ee' }}
                      title="Call candidate"
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-mobile-action-pill"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399' }}
                      title="WhatsApp candidate"
                    >
                      💬 Chat
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="admin-mobile-action-pill"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#f87171' }}
                      title="Delete candidate"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
