import React, { useState } from 'react';
import { initialAdminLeads, initialAdminBatches, initialAdminInternships, saveStoredLeads, saveStoredBatches, saveStoredInternships } from '../../data/adminInitialData.js';

export default function AdminSettings() {
  const [notificationSaved, setNotificationSaved] = useState(false);
  const [centerPhone, setCenterPhone] = useState('+91 96553 64707');
  const [centerEmail, setCenterEmail] = useState('info@gvdesigntech.com');
  const [admissionOpen, setAdmissionOpen] = useState(true);

  const handleExportBackup = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      leads: JSON.parse(localStorage.getItem('gv_admin_leads') || '[]'),
      batches: JSON.parse(localStorage.getItem('gv_admin_batches') || '[]'),
      internships: JSON.parse(localStorage.getItem('gv_admin_internships') || '[]')
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `gv-designtech-backup-${new Date().toISOString().split('T')[0]}.json`);
    dl.click();
  };

  const handleResetData = () => {
    if (window.confirm('Reset all leads, batches, and candidates back to original seed data?')) {
      saveStoredLeads(initialAdminLeads);
      saveStoredBatches(initialAdminBatches);
      saveStoredInternships(initialAdminInternships);
      alert('Admin database restored to initial seed state.');
      window.location.reload();
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setNotificationSaved(true);
    setTimeout(() => setNotificationSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Center Details */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>⚙️</span>
            <span>Center Information &amp; Operational Config</span>
          </h3>
        </div>

        {notificationSaved && (
          <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', color: '#34d399', fontSize: '14px', marginBottom: '18px' }}>
            ✓ Center settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSaveConfig}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-label">Official Helpline Phone</label>
              <input
                type="text"
                className="admin-input"
                value={centerPhone}
                onChange={(e) => setCenterPhone(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Official Inquiries Email</label>
              <input
                type="email"
                className="admin-input"
                value={centerEmail}
                onChange={(e) => setCenterEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Physical Center Address</label>
            <input
              type="text"
              className="admin-input"
              defaultValue="No. 12, Pollachi Main Road, Coimbatore, Tamil Nadu 641021"
            />
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '14.5px' }}>Admissions Status Banner</div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Shows "Next Batch Admissions Open" indicator on website</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
              <input
                type="checkbox"
                checked={admissionOpen}
                onChange={(e) => setAdmissionOpen(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#d946ef' }}
              />
              <span style={{ fontSize: '13px', color: admissionOpen ? '#34d399' : '#94a3b8', fontWeight: '700' }}>
                {admissionOpen ? 'Active' : 'Paused'}
              </span>
            </label>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="admin-btn-primary">
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Database Maintenance & Backups */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>💾</span>
            <span>Data Backups &amp; Maintenance</span>
          </h3>
        </div>

        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
          Export the full database containing student inquiries, course batches, and candidate records as an offline JSON snapshot.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button type="button" onClick={handleExportBackup} className="admin-btn-primary">
            📥 Download Complete Backup (.json)
          </button>
          <button type="button" onClick={handleResetData} className="admin-btn-secondary" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            ⚠️ Reset Database to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
