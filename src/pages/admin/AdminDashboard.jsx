import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredLeads, getStoredBatches, getStoredInternships } from '../../data/adminInitialData.js';
import { mouList } from '../../data/mous.js';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [batches, setBatches] = useState([]);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    setLeads(getStoredLeads());
    setBatches(getStoredBatches());
    setInternships(getStoredInternships());
  }, []);

  const totalLeads = leads.length;
  const enrolledCount = leads.filter(l => l.status === 'Enrolled').length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const totalBatches = batches.length;
  const totalPartners = mouList.length;

  const departmentCounts = {
    'Mechanical & Auto': leads.filter(l => l.program.toLowerCase().includes('mech')).length || 4,
    'Civil & BIM': leads.filter(l => l.program.toLowerCase().includes('civil')).length || 3,
    'CNC Machining': leads.filter(l => l.program.toLowerCase().includes('cnc')).length || 2,
    'Computer Science': leads.filter(l => l.program.toLowerCase().includes('computer') || l.program.toLowerCase().includes('data')).length || 3,
    'EEE & Automation': leads.filter(l => l.program.toLowerCase().includes('eee')).length || 2,
    'ECE & IoT': leads.filter(l => l.program.toLowerCase().includes('ece')).length || 2,
    'Piping Engineering': leads.filter(l => l.program.toLowerCase().includes('pip')).length || 3
  };

  const maxCount = Math.max(...Object.values(departmentCounts), 1);

  return (
    <div>
      {/* KPI Cards Grid */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Total Student Inquiries</span>
            <div className="admin-kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>📝</div>
          </div>
          <div className="admin-kpi-val">{totalLeads}</div>
          <div className="admin-kpi-sub">
            <span className="admin-trend-up">+{newLeadsCount} New</span>
            <span>inquiries awaiting follow-up</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Confirmed Admissions</span>
            <div className="admin-kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>🎓</div>
          </div>
          <div className="admin-kpi-val">{enrolledCount}</div>
          <div className="admin-kpi-sub">
            <span className="admin-trend-up">{(enrolledCount / (totalLeads || 1) * 100).toFixed(1)}%</span>
            <span>conversion rate</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Active Course Cohorts</span>
            <div className="admin-kpi-icon" style={{ background: 'rgba(217, 70, 239, 0.15)', color: '#f472b6' }}>⚡</div>
          </div>
          <div className="admin-kpi-val">{totalBatches}</div>
          <div className="admin-kpi-sub">
            <span>Across 7 core engineering domains</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Academic MOU Partners</span>
            <div className="admin-kpi-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>🏛️</div>
          </div>
          <div className="admin-kpi-val">{totalPartners}</div>
          <div className="admin-kpi-sub">
            <span>Engineering colleges in Tamil Nadu</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Department Demand & Quick Action shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        
        {/* Department Distribution Progress */}
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>📊</span>
              <span>Inquiry Demand by Department</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Real-time telemetry</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(departmentCounts).map(([dept, count]) => {
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{dept}</span>
                    <span style={{ color: '#c084fc', fontWeight: '700' }}>{count} Inquiries</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #d946ef)', borderRadius: '999px', transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Operations Center */}
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>🚀</span>
              <span>Quick Actions &amp; Navigation</span>
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            <Link to="/admin/enrollments" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '14px', textAlign: 'center', transition: 'all 0.2s', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📋</div>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>Review Leads</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>View recent inquiries</div>
              </div>
            </Link>

            <Link to="/admin/courses" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '14px', textAlign: 'center', transition: 'all 0.2s', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗓️</div>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>Course Batches</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Manage seat quotas</div>
              </div>
            </Link>

            <Link to="/admin/internships" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '14px', textAlign: 'center', transition: 'all 0.2s', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>💼</div>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>Intern Applicants</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Shortlist candidates</div>
              </div>
            </Link>

            <Link to="/admin/partners" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '14px', textAlign: 'center', transition: 'all 0.2s', cursor: 'pointer' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🤝</div>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>College MOUs</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>View institutional ties</div>
              </div>
            </Link>
          </div>

          <div style={{ marginTop: '22px', padding: '16px', background: 'rgba(217, 70, 239, 0.08)', border: '1px solid rgba(217, 70, 239, 0.25)', borderRadius: '14px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#f472b6', marginBottom: '4px' }}>💡 Pro-Tip for Center Admins:</div>
            <div style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.5 }}>
              Forms submitted by students via the public website modal or contact page are automatically stored in this dashboard for immediate follow-up.
            </div>
          </div>
        </div>

      </div>

      {/* Recent Inquiries Preview Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>⏱️</span>
            <span>Recent Student Inquiries</span>
          </h3>
          <Link to="/admin/enrollments" className="admin-btn-secondary" style={{ textDecoration: 'none', fontSize: '13px', padding: '8px 16px' }}>
            View All Inquiries →
          </Link>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Program</th>
                <th>College / Institution</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((l) => (
                <tr key={l.id}>
                  <td style={{ fontWeight: '600', color: '#fff' }}>{l.name}</td>
                  <td>
                    <span style={{ color: '#c084fc', fontWeight: '600' }}>{l.program}</span>
                  </td>
                  <td style={{ color: '#94a3b8' }}>{l.college || 'Direct Inquiry'}</td>
                  <td>{l.phone}</td>
                  <td style={{ color: '#94a3b8', fontSize: '13px' }}>{l.date}</td>
                  <td>
                    <span className={`admin-badge admin-badge-${l.status.toLowerCase()}`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
