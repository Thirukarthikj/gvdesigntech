import React, { useState, useEffect } from 'react';
import { getStoredLeads, saveStoredLeads } from '../../data/adminInitialData.js';

export default function AdminEnrollments() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New lead form state
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    program: 'Mechanical & Automobile CAD',
    message: ''
  });

  useEffect(() => {
    setLeads(getStoredLeads());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    saveStoredLeads(updated);
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to remove this student inquiry?')) {
      const updated = leads.filter((l) => l.id !== id);
      setLeads(updated);
      saveStoredLeads(updated);
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newLeadForm.name.trim() || !newLeadForm.phone.trim()) {
      alert('Please provide student name and phone number');
      return;
    }

    const created = {
      id: 'lead-' + Date.now(),
      name: newLeadForm.name.trim(),
      email: newLeadForm.email.trim() || 'N/A',
      phone: newLeadForm.phone.trim(),
      college: newLeadForm.college.trim() || 'Direct Walk-in',
      program: newLeadForm.program,
      message: newLeadForm.message.trim() || 'Recorded by Admin',
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    const updated = [created, ...leads];
    setLeads(updated);
    saveStoredLeads(updated);
    setIsAddModalOpen(false);
    setNewLeadForm({
      name: '',
      email: '',
      phone: '',
      college: '',
      program: 'Mechanical & Automobile CAD',
      message: ''
    });
  };

  const handleExportCSV = () => {
    const headers = ['ID,Name,Email,Phone,College,Program,Date,Status,Notes'];
    const rows = leads.map(l =>
      `"${l.id}","${l.name}","${l.email}","${l.phone}","${l.college || ''}","${l.program}","${l.date}","${l.status}","${(l.message || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gv-student-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter leads
  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.college || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || l.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesProgram = programFilter === 'all' || l.program.toLowerCase().includes(programFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesProgram;
  });

  return (
    <div>
      {/* Top Controls Toolbar */}
      <div className="admin-toolbar">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          <input
            type="text"
            className="admin-search-input"
            placeholder="🔍 Search name, phone, email, college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            className="admin-select"
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
          >
            <option value="all">All Engineering Domains</option>
            <option value="Mechanical">Mechanical CAD</option>
            <option value="Civil">Civil BIM</option>
            <option value="CNC">CNC Machining</option>
            <option value="Computer">Computer Science</option>
            <option value="EEE">EEE &amp; Automation</option>
            <option value="ECE">ECE Embedded</option>
            <option value="Piping">Piping Engineering</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="button" onClick={handleExportCSV} className="admin-btn-secondary">
            📥 Export CSV
          </button>
          <button type="button" onClick={() => setIsAddModalOpen(true)} className="admin-btn-primary">
            + Record Walk-in Lead
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>📋</span>
            <span>Admissions &amp; Inquiries Pipeline ({filtered.length})</span>
          </h3>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Click any row to inspect student comments &amp; manage admission status
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="admin-table-desktop">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Candidate</th>
                  <th>Desired Program</th>
                  <th>College / Background</th>
                  <th>Phone / Contact</th>
                  <th>Date Received</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                      No student inquiries match the applied filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((l) => (
                    <React.Fragment key={l.id}>
                      <tr
                        style={{ cursor: 'pointer', background: selectedLead?.id === l.id ? 'rgba(139, 92, 246, 0.12)' : 'transparent' }}
                        onClick={() => setSelectedLead(selectedLead?.id === l.id ? null : l)}
                      >
                        <td style={{ fontWeight: '700', color: '#fff' }}>
                          <div>{l.name}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal' }}>{l.email}</div>
                        </td>
                        <td>
                          <span style={{ color: '#c084fc', fontWeight: '600' }}>{l.program}</span>
                        </td>
                        <td style={{ color: '#cbd5e1' }}>{l.college || 'Direct Walk-in'}</td>
                        <td style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{l.phone}</td>
                        <td style={{ fontSize: '13px', color: '#94a3b8' }}>{l.date}</td>
                        <td>
                          <select
                            value={l.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleStatusChange(l.id, e.target.value)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '999px',
                              background: '#0d0f28',
                              border: '1px solid rgba(139, 92, 246, 0.4)',
                              color: l.status === 'Enrolled' ? '#34d399' : l.status === 'New' ? '#22d3ee' : '#fbbf24',
                              fontSize: '12px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteLead(l.id);
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '15px' }}
                            title="Delete inquiry"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Details Drawer */}
                      {selectedLead?.id === l.id && (
                        <tr style={{ background: 'rgba(20, 16, 45, 0.95)' }}>
                          <td colSpan="7" style={{ padding: '20px 24px', borderBottom: '2px solid rgba(217, 70, 239, 0.4)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                              <div>
                                <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Inquiry Message / Requirement</div>
                                <p style={{ margin: 0, color: '#f8fafc', fontSize: '14px', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
                                  "{l.message || 'No additional note provided by student.'}"
                                </p>
                              </div>

                              <div>
                                <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Communication Channels</div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                                  <a
                                    href={`tel:${l.phone}`}
                                    style={{ padding: '6px 14px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.35)', color: '#22d3ee', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}
                                  >
                                    📞 Call Student
                                  </a>
                                  <a
                                    href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}
                                  >
                                    💬 WhatsApp Chat
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
              No student inquiries match the applied filters.
            </div>
          ) : (
            filtered.map((l) => (
              <div key={l.id} className="admin-mobile-data-card">
                <div className="admin-mobile-card-header">
                  <div>
                    <h4 className="admin-mobile-card-title">{l.name}</h4>
                    <div className="admin-mobile-card-subtitle">{l.email}</div>
                  </div>
                  <span
                    className="admin-mobile-card-badge"
                    style={{
                      background: 'rgba(192, 132, 252, 0.15)',
                      border: '1px solid rgba(192, 132, 252, 0.35)',
                      color: '#c084fc'
                    }}
                  >
                    {l.program}
                  </span>
                </div>

                <div className="admin-mobile-card-body">
                  <div className="admin-mobile-card-item">
                    <span>🎓</span>
                    <span>{l.college || 'Direct Walk-in'}</span>
                  </div>
                  <div className="admin-mobile-card-item">
                    <span>📞</span>
                    <a href={`tel:${l.phone}`} style={{ color: '#38bdf8', textDecoration: 'none', fontFamily: 'monospace', fontWeight: '600' }}>
                      {l.phone}
                    </a>
                  </div>
                  <div className="admin-mobile-card-item" style={{ fontSize: '12px', color: '#94a3b8' }}>
                    <span>📅</span>
                    <span>Received: {l.date}</span>
                  </div>

                  {l.message && (
                    <div className="admin-mobile-card-note">
                      "{l.message}"
                    </div>
                  )}
                </div>

                <div className="admin-mobile-card-footer">
                  <select
                    value={l.status}
                    onChange={(e) => handleStatusChange(l.id, e.target.value)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '999px',
                      background: '#0d0f28',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      color: l.status === 'Enrolled' ? '#34d399' : l.status === 'New' ? '#22d3ee' : '#fbbf24',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <div className="admin-mobile-card-actions">
                    <a
                      href={`tel:${l.phone}`}
                      className="admin-mobile-action-pill"
                      style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.35)', color: '#22d3ee' }}
                      title="Call candidate"
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-mobile-action-pill"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399' }}
                      title="WhatsApp message"
                    >
                      💬 Chat
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDeleteLead(l.id)}
                      className="admin-mobile-action-pill"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#f87171' }}
                      title="Delete inquiry"
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

      {/* Record Walk-in Lead Modal */}
      {isAddModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#fff' }}>Record Walk-in Student Inquiry</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="admin-form-group">
                <label className="admin-label">Student Full Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. Gokul Prasath"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="admin-input"
                    required
                    placeholder="+91 98765 43210"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Email Address</label>
                  <input
                    type="email"
                    className="admin-input"
                    placeholder="gokul.prasath@gmail.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">College / Polytechnic / University</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. MCET Pollachi / GCT Coimbatore"
                  value={newLeadForm.college}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, college: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Interested Program</label>
                <select
                  className="admin-input"
                  value={newLeadForm.program}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, program: e.target.value })}
                >
                  <option value="Mechanical & Automobile CAD">Mechanical &amp; Automobile CAD</option>
                  <option value="Civil BIM & Structural Design">Civil BIM &amp; Structural Design</option>
                  <option value="CNC Programming & MasterCAM">CNC Programming &amp; MasterCAM</option>
                  <option value="Computer Science & Full Stack">Computer Science &amp; Full Stack</option>
                  <option value="EEE & Industrial Automation">EEE &amp; Industrial Automation</option>
                  <option value="ECE – Embedded Systems & IoT">ECE – Embedded Systems &amp; IoT</option>
                  <option value="Piping Engineering (Oil & Gas)">Piping Engineering (Oil &amp; Gas)</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Notes &amp; Specific Career Aspirations</label>
                <textarea
                  className="admin-textarea"
                  rows="3"
                  placeholder="e.g. Student looking for weekend batch before final year placement drive"
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Save Student Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
