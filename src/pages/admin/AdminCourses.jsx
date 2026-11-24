import React, { useState, useEffect } from 'react';
import { getStoredBatches, saveStoredBatches } from '../../data/adminInitialData.js';

export default function AdminCourses() {
  const [batches, setBatches] = useState([]);
  const [filterDept, setFilterDept] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newBatch, setNewBatch] = useState({
    department: 'Mechanical',
    courseName: 'SolidWorks & CATIA Masterclass',
    startDate: '',
    timing: 'Morning Batch (09:30 AM - 12:30 PM)',
    mode: 'Classroom Studio',
    totalSeats: 20,
    filledSeats: 0,
    status: 'Upcoming'
  });

  useEffect(() => {
    setBatches(getStoredBatches());
  }, []);

  const handleSeatChange = (id, delta) => {
    const updated = batches.map(b => {
      if (b.id === id) {
        const next = Math.max(0, Math.min(b.totalSeats, b.filledSeats + delta));
        let nextStatus = b.status;
        if (next === b.totalSeats) nextStatus = 'Housefull';
        else if (next >= b.totalSeats * 0.8) nextStatus = 'Almost Full';
        else if (next >= b.totalSeats * 0.5) nextStatus = 'Filling Fast';
        return { ...b, filledSeats: next, status: nextStatus };
      }
      return b;
    });
    setBatches(updated);
    saveStoredBatches(updated);
  };

  const handleDeleteBatch = (id) => {
    if (window.confirm('Delete this batch cohort?')) {
      const updated = batches.filter(b => b.id !== id);
      setBatches(updated);
      saveStoredBatches(updated);
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newBatch.courseName.trim() || !newBatch.startDate) {
      alert('Please fill out course name and start date');
      return;
    }

    const created = {
      ...newBatch,
      id: 'batch-' + Date.now(),
      totalSeats: parseInt(newBatch.totalSeats) || 20,
      filledSeats: parseInt(newBatch.filledSeats) || 0
    };

    const updated = [created, ...batches];
    setBatches(updated);
    saveStoredBatches(updated);
    setIsModalOpen(false);
  };

  const filtered = filterDept === 'all'
    ? batches
    : batches.filter(b => b.department.toLowerCase().includes(filterDept.toLowerCase()));

  return (
    <div>
      <div className="admin-toolbar">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            className="admin-select"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil &amp; BIM</option>
            <option value="CNC">CNC Machining</option>
            <option value="Computer">Computer Science</option>
            <option value="EEE">EEE &amp; Automation</option>
            <option value="Piping">Piping Engineering</option>
          </select>

          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Showing {filtered.length} active cohorts
          </span>
        </div>

        <button type="button" onClick={() => setIsModalOpen(true)} className="admin-btn-primary">
          + Schedule New Batch
        </button>
      </div>

      {/* Batches Grid */}
      <div className="admin-batch-grid">
        {filtered.map((b) => {
          const percent = Math.round((b.filledSeats / b.totalSeats) * 100);
          return (
            <div key={b.id} className="admin-batch-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc', textTransform: 'uppercase' }}>
                    {b.department}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '999px', color: '#f472b6' }}>
                    {b.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 8px', lineHeight: 1.35 }}>
                  {b.courseName}
                </h3>

                <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '18px' }}>
                  <div>📅 Starts: <strong style={{ color: '#fff' }}>{b.startDate}</strong></div>
                  <div>⏰ Timing: <span style={{ color: '#cbd5e1' }}>{b.timing}</span></div>
                  <div>🏢 Mode: <span style={{ color: '#22d3ee' }}>{b.mode}</span></div>
                </div>
              </div>

              {/* Progress & Seat Controls */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Seats Booked</span>
                  <span style={{ color: '#fff', fontWeight: '700' }}>
                    {b.filledSeats} / {b.totalSeats} ({percent}%)
                  </span>
                </div>

                <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: `${percent}%`,
                      height: '100%',
                      background: percent > 85 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                      borderRadius: '999px',
                      transition: 'width 0.3s ease'
                    }}
                  ></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => handleSeatChange(b.id, -1)}
                      style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}
                      title="Decrease seats filled"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSeatChange(b.id, 1)}
                      style={{ padding: '4px 10px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#c084fc', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}
                      title="Increase seats filled"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteBatch(b.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer' }}
                  >
                    Delete Batch
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Batch Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#fff' }}>Schedule New Course Cohort</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="admin-form-group">
                <label className="admin-label">Department</label>
                <select
                  className="admin-input"
                  value={newBatch.department}
                  onChange={(e) => setNewBatch({ ...newBatch, department: e.target.value })}
                >
                  <option value="Mechanical">Mechanical &amp; Automobile</option>
                  <option value="Civil">Civil &amp; BIM</option>
                  <option value="CNC">CNC Machining &amp; CAM</option>
                  <option value="Computer Science">Computer Science &amp; Full Stack</option>
                  <option value="EEE & Automation">EEE &amp; Automation</option>
                  <option value="ECE Embedded">ECE Embedded &amp; IoT</option>
                  <option value="Piping">Piping Engineering</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Course / Track Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. Master Mechanical CAD & FEA Analysis"
                  value={newBatch.courseName}
                  onChange={(e) => setNewBatch({ ...newBatch, courseName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Batch Start Date *</label>
                  <input
                    type="date"
                    className="admin-input"
                    required
                    value={newBatch.startDate}
                    onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Intake Capacity (Seats)</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    className="admin-input"
                    value={newBatch.totalSeats}
                    onChange={(e) => setNewBatch({ ...newBatch, totalSeats: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Timing &amp; Schedule</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Regular Morning Batch (09:30 AM - 12:30 PM)"
                  value={newBatch.timing}
                  onChange={(e) => setNewBatch({ ...newBatch, timing: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Training Delivery Mode</label>
                <select
                  className="admin-input"
                  value={newBatch.mode}
                  onChange={(e) => setNewBatch({ ...newBatch, mode: e.target.value })}
                >
                  <option value="Classroom Studio">Classroom Studio (Workstation Lab)</option>
                  <option value="Hybrid Lab">Hybrid Lab (Studio + Remote 24/7)</option>
                  <option value="Workshop Floor">Workshop Floor (Physical CNC/PLC)</option>
                  <option value="Live Interactive Online">Live Interactive Online</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Publish Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
