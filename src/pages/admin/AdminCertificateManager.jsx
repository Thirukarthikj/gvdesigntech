import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredCertificates, saveStoredCertificates } from '../../data/contentPersistence.js';

export default function AdminCertificateManager() {
  const [certMap, setCertMap] = useState(() => getStoredCertificates());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const [toast, setToast] = useState('');

  const [formData, setFormData] = useState({
    certId: '',
    name: '',
    course: 'Master Diploma in Mechanical CAD & FEA Simulation',
    completionDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  });

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const certList = Object.keys(certMap).map(id => ({
    id,
    ...certMap[id]
  }));

  const handleOpenAdd = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setEditingCertId(null);
    setFormData({
      certId: `GV-ENG-${new Date().getFullYear()}-${randomSuffix}`,
      name: '',
      course: 'Master Diploma in Mechanical CAD & FEA Simulation',
      completionDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      grade: 'Distinction (A+)',
      status: 'VERIFIED AUTHENTIC',
      issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCertId(cert.id);
    setFormData({
      certId: cert.id,
      name: cert.name || '',
      course: cert.course || '',
      completionDate: cert.completionDate || '',
      grade: cert.grade || 'Distinction (A+)',
      status: cert.status || 'VERIFIED AUTHENTIC',
      issuedBy: cert.issuedBy || 'GV DesignTech, Oddanchatram, Tamil Nadu'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id, studentName) => {
    if (window.confirm(`Delete certificate "${id}" for ${studentName}?`)) {
      const updated = { ...certMap };
      delete updated[id];
      setCertMap(updated);
      saveStoredCertificates(updated);
      showNotification(`Certificate ${id} deleted`);
    }
  };

  const handleToggleRevoke = (cert) => {
    const newStatus = cert.status === 'REVOKED' ? 'VERIFIED AUTHENTIC' : 'REVOKED';
    const updated = {
      ...certMap,
      [cert.id]: {
        ...cert,
        status: newStatus
      }
    };
    setCertMap(updated);
    saveStoredCertificates(updated);
    showNotification(`Certificate ${cert.id} status changed to ${newStatus}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idKey = formData.certId.trim().toUpperCase();
    if (!idKey || !formData.name.trim()) return;

    let updated = { ...certMap };

    if (editingCertId && editingCertId !== idKey) {
      delete updated[editingCertId];
    }

    updated[idKey] = {
      certId: idKey,
      name: formData.name.trim(),
      course: formData.course.trim(),
      completionDate: formData.completionDate.trim(),
      grade: formData.grade.trim(),
      status: formData.status,
      issuedBy: formData.issuedBy.trim()
    };

    setCertMap(updated);
    saveStoredCertificates(updated);
    showNotification(editingCertId ? `Certificate ${idKey} updated successfully` : `Issued Certificate ${idKey} for ${formData.name}`);
    setIsModalOpen(false);
  };

  const filtered = certList.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
                          (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
                          (c.course || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            placeholder="🔍 Search Certificate ID (e.g. GV-CAD-2024-105) or Student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Verification Statuses</option>
            <option value="VERIFIED AUTHENTIC">Verified Authentic</option>
            <option value="PENDING REVIEW">Pending Review</option>
            <option value="REVOKED">Revoked / Suspended</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            to="/certificate-verification"
            target="_blank"
            className="admin-btn-secondary"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>👁️ Public Verification Portal</span>
          </Link>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="admin-btn-primary"
          >
            + Issue New Certificate
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card">
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-card-title">
              <span>📜</span>
              <span>Issued Certificates &amp; Verification Registry ({filtered.length} Credentials)</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
              Instantly validated on the public <strong style={{ color: '#38bdf8' }}>/certificate-verification</strong> portal for employers and universities.
            </p>
          </div>
          <span style={{ fontSize: '12px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            ● Live Sync Enabled
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="admin-table-desktop">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Certificate ID</th>
                  <th>Student Graduate</th>
                  <th>Certification Course</th>
                  <th>Grade</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                      No certificates found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((cert) => {
                    const isRevoked = cert.status === 'REVOKED';
                    return (
                      <tr key={cert.id}>
                        <td style={{ fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px' }}>
                          {cert.id}
                        </td>
                        <td style={{ fontWeight: '700', color: '#fff' }}>
                          {cert.name}
                        </td>
                        <td style={{ color: '#cbd5e1', maxWidth: '280px' }}>
                          {cert.course}
                        </td>
                        <td style={{ color: '#e879f9', fontWeight: '600' }}>
                          {cert.grade}
                        </td>
                        <td style={{ color: '#94a3b8', fontSize: '13px' }}>
                          {cert.completionDate}
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '999px',
                            background: isRevoked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                            border: `1px solid ${isRevoked ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
                            color: isRevoked ? '#f87171' : '#4ade80',
                            fontSize: '11px',
                            fontWeight: '800',
                            letterSpacing: '0.5px'
                          }}>
                            {cert.status || 'VERIFIED AUTHENTIC'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(cert)}
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
                              onClick={() => handleToggleRevoke(cert)}
                              title={isRevoked ? 'Reinstate Certificate' : 'Revoke Certificate'}
                              style={{
                                background: isRevoked ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                                border: `1px solid ${isRevoked ? 'rgba(34, 197, 94, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
                                color: isRevoked ? '#4ade80' : '#facc15',
                                padding: '6px 10px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            >
                              {isRevoked ? 'Re-verify' : 'Revoke'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(cert.id, cert.name)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#f87171',
                                padding: '6px 10px',
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Vertical Cards (Top to Bottom Scroll) */}
        <div className="admin-cards-mobile">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: '#64748b', background: 'rgba(5, 5, 18, 0.6)', borderRadius: '12px' }}>
              No certificates found matching your criteria.
            </div>
          ) : (
            filtered.map((cert) => {
              const isRevoked = cert.status === 'REVOKED';
              return (
                <div key={cert.id} className="admin-mobile-data-card">
                  <div className="admin-mobile-card-header">
                    <div>
                      <h4 className="admin-mobile-card-title">{cert.name}</h4>
                      <div className="admin-mobile-card-subtitle" style={{ color: '#38bdf8', fontFamily: 'monospace', fontWeight: '700' }}>
                        {cert.id}
                      </div>
                    </div>
                    <span
                      className="admin-mobile-card-badge"
                      style={{
                        background: isRevoked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        border: `1px solid ${isRevoked ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
                        color: isRevoked ? '#f87171' : '#4ade80'
                      }}
                    >
                      {cert.status || 'VERIFIED AUTHENTIC'}
                    </span>
                  </div>

                  <div className="admin-mobile-card-body">
                    <div className="admin-mobile-card-item">
                      <span>📜</span>
                      <span>{cert.course}</span>
                    </div>
                    <div className="admin-mobile-card-item">
                      <span>🎯</span>
                      <span>Grade: <strong style={{ color: '#e879f9' }}>{cert.grade}</strong></span>
                    </div>
                    <div className="admin-mobile-card-item" style={{ fontSize: '12px', color: '#94a3b8' }}>
                      <span>📅</span>
                      <span>Issue Date: {cert.completionDate}</span>
                    </div>
                  </div>

                  <div className="admin-mobile-card-footer">
                    <button
                      type="button"
                      onClick={() => handleToggleRevoke(cert)}
                      className="admin-mobile-action-pill"
                      style={{
                        background: isRevoked ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                        border: `1px solid ${isRevoked ? 'rgba(34, 197, 94, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
                        color: isRevoked ? '#4ade80' : '#facc15'
                      }}
                    >
                      {isRevoked ? '✓ Re-verify' : '✕ Revoke'}
                    </button>

                    <div className="admin-mobile-card-actions">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(cert)}
                        className="admin-mobile-action-pill"
                        style={{
                          background: 'rgba(139, 92, 246, 0.15)',
                          border: '1px solid rgba(139, 92, 246, 0.4)',
                          color: '#c084fc'
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cert.id, cert.name)}
                        className="admin-mobile-action-pill"
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          color: '#f87171'
                        }}
                      >
                        🗑️
                      </button>
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
            maxWidth: '600px',
            padding: '30px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                {editingCertId ? '✏️ Edit Student Certificate' : '📜 Issue Official Certificate'}
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Certificate ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GV-CAD-2026-105"
                    value={formData.certId}
                    onChange={(e) => setFormData({ ...formData, certId: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#38bdf8',
                      fontWeight: '700',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gokul Prasath"
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Course / Certification Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Diploma in Mechanical CAD & FEA Simulation"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
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
                    Grade / Result
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Distinction (A+)"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
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
                    Completion Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15 November 2026"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
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
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
                    <option value="VERIFIED AUTHENTIC">VERIFIED AUTHENTIC</option>
                    <option value="PENDING REVIEW">PENDING REVIEW</option>
                    <option value="REVOKED">REVOKED</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Issued By Center
                  </label>
                  <input
                    type="text"
                    value={formData.issuedBy}
                    onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
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
                  {editingCertId ? '💾 Save Certificate' : '📜 Issue Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
