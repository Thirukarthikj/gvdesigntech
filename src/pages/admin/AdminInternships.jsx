import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getStoredInternshipPrograms,
  saveStoredInternshipPrograms,
  subscribeToContentUpdates,
  slugifyDepartment,
  normalizeInternshipLink
} from '../../data/contentPersistence.js';
import {
  fetchInternshipProgramsFromMongo,
  createInternshipProgramInMongo,
  updateInternshipProgramInMongo,
  deleteInternshipProgramInMongo
} from '../../services/mongoService.js';
import { getStoredInternships, saveStoredInternships } from '../../data/adminInitialData.js';

const BADGE_COLOR_PRESETS = [
  { label: 'Pink', hex: '#ec4899' },
  { label: 'Amber', hex: '#f59e0b' },
  { label: 'Sky Blue', hex: '#0ea5e9' },
  { label: 'Emerald', hex: '#10b981' },
  { label: 'Purple', hex: '#8b5cf6' },
  { label: 'Rose', hex: '#f43f5e' }
];

const ACCENT_COLOR_PRESETS = [
  { label: 'Lilac', hex: '#c084fc' },
  { label: 'Orange', hex: '#f97316' },
  { label: 'Cyan', hex: '#38bdf8' },
  { label: 'Mint', hex: '#34d399' },
  { label: 'Violet', hex: '#a855f7' },
  { label: 'Fuchsia', hex: '#d946ef' }
];

export default function AdminInternships() {
  const [activeTab, setActiveTab] = useState('programs'); // 'programs' | 'applicants'

  // --- Master Programs Catalog State ---
  const [programs, setPrograms] = useState(() => getStoredInternshipPrograms());
  const [programSearch, setProgramSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [toast, setToast] = useState('');

  // Form state
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    badge: 'POPULAR & TRENDING',
    badgeColor: '#ec4899',
    number: '',
    tag: 'FAST TRACK',
    accent: '#c084fc',
    desc: '',
    modules: '',
    outcome: '',
    link: '/internship'
  });

  // --- Student Applicants State ---
  const [applicants, setApplicants] = useState([]);
  const [applicantSearch, setApplicantSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Load programs & applicants from MongoDB on mount
  useEffect(() => {
    async function loadPrograms() {
      const mongoList = await fetchInternshipProgramsFromMongo();
      if (mongoList && Array.isArray(mongoList) && mongoList.length > 0) {
        setPrograms(mongoList);
        saveStoredInternshipPrograms(mongoList);
      } else {
        setPrograms(getStoredInternshipPrograms());
      }
    }
    loadPrograms();

    // 2. Fetch applicants from MongoDB
    fetch('/api/internship-applicants')
      .then(res => res.json())
      .then(data => {
        const localList = getStoredInternships();
        if (Array.isArray(data) && data.length > 0) {
          const combined = [
            ...data,
            ...localList.filter(l => !data.some(d => String(d.id) === String(l.id) || (d.email && d.email.toLowerCase() === l.email.toLowerCase())))
          ];
          setApplicants(combined);
          localStorage.setItem('gv_admin_internships', JSON.stringify(combined));
        } else {
          setApplicants(localList);
          // Initial seed sync to MongoDB
          if (localList.length > 0) {
            fetch('/api/internship-applicants/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(localList)
            }).catch(() => {});
          }
        }
      })
      .catch(() => {
        setApplicants(getStoredInternships());
      });

    // 3. Realtime event listener
    const unsub = subscribeToContentUpdates((topic) => {
      if (!topic || topic === 'all' || topic === 'internship_programs') {
        setPrograms(getStoredInternshipPrograms());
      }
      if (!topic || topic === 'all' || topic === 'internship_applicants') {
        setApplicants(getStoredInternships());
      }
    });
    return () => unsub();
  }, []);

  // --- Program Handlers ---
  const handleOpenAdd = () => {
    setEditingProgram(null);
    const nextNum = programs.length + 1;
    const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    setForm({
      title: '',
      subtitle: '',
      badge: 'NEW COHORT',
      badgeColor: '#10b981',
      number: numStr,
      tag: 'NEW TRACK',
      accent: '#34d399',
      desc: '',
      modules: 'Hands-On Technical Learning\nReal-World Project Development\nIndustry Mentor Guidance\nProject Documentation & Review',
      outcome: 'Gain verified industry experience and build projects for your portfolio.',
      link: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProgram(p);
    const modulesStr = Array.isArray(p.modules)
      ? p.modules.join('\n')
      : (p.modules || '');

    setForm({
      title: p.title || '',
      subtitle: p.subtitle || '',
      badge: p.badge || 'POPULAR & TRENDING',
      badgeColor: p.badgeColor || '#ec4899',
      number: p.number || '01',
      tag: p.tag || '',
      accent: p.accent || '#c084fc',
      desc: p.desc || '',
      modules: modulesStr,
      outcome: p.outcome || '',
      link: p.link || '/internship'
    });
    setIsModalOpen(true);
  };

  const handleSaveProgram = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please enter a program title.');
      return;
    }

    const parsedModules = form.modules
      .split('\n')
      .map(m => m.trim().replace(/^[-*•✓]\s*/, ''))
      .filter(Boolean);

    const finalLink = normalizeInternshipLink({
      link: form.link,
      title: form.title.trim()
    });

    const programPayload = {
      ...form,
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || form.title.trim(),
      link: finalLink,
      modules: parsedModules.length > 0 ? parsedModules : ['Practical Technical Training', 'Live Project Development'],
      outcome: form.outcome.trim() || 'Gain hands-on industry experience and complete project portfolio work.'
    };

    let updatedList = [];

    if (editingProgram) {
      const targetId = editingProgram.id || editingProgram._id;
      // Update in MongoDB
      await updateInternshipProgramInMongo(targetId, programPayload);
      updatedList = programs.map(p => (p.id === targetId || p._id === targetId) ? { ...p, ...programPayload } : p);
      showToast(`✅ "${form.title}" updated and synced live!`);
    } else {
      const newId = `internship-${Date.now()}`;
      const toInsert = {
        ...programPayload,
        id: newId,
        order: programs.length + 1,
        createdAt: new Date().toISOString()
      };
      // Create in MongoDB
      const mongoRes = await createInternshipProgramInMongo(toInsert);
      const inserted = mongoRes || toInsert;
      updatedList = [...programs, inserted];
      showToast(`🎉 "${form.title}" added & published to front page!`);
    }

    setPrograms(updatedList);
    saveStoredInternshipPrograms(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteProgram = async (p) => {
    const id = p.id || p._id;
    if (window.confirm(`Are you sure you want to remove the "${p.title}" internship program from the website?`)) {
      await deleteInternshipProgramInMongo(id);
      const updatedList = programs.filter(item => (item.id !== id && item._id !== id));
      setPrograms(updatedList);
      saveStoredInternshipPrograms(updatedList);
      showToast(`🗑️ "${p.title}" deleted.`);
    }
  };

  // --- Applicant Handlers ---
  const handleStatusChange = (id, newStatus) => {
    const updated = applicants.map(i => i.id === id ? { ...i, status: newStatus } : i);
    setApplicants(updated);
    saveStoredInternships(updated);

    try {
      fetch(`/api/internship-applicants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).catch(() => {});
    } catch {}

    showToast('Applicant review status updated');
  };

  const handleDeleteApplicant = (id) => {
    if (window.confirm('Delete this internship applicant record?')) {
      const updated = applicants.filter(i => i.id !== id);
      setApplicants(updated);
      saveStoredInternships(updated);

      try {
        fetch(`/api/internship-applicants/${id}`, { method: 'DELETE' }).catch(() => {});
      } catch {}

      showToast('Applicant removed');
    }
  };

  // Filtered Programs
  const filteredPrograms = programs.filter(p => {
    const q = programSearch.toLowerCase();
    return (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      (p.desc && p.desc.toLowerCase().includes(q)) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  });

  // Filtered Applicants
  const filteredApplicants = applicants.filter(i => {
    const matchesSearch =
      i.candidateName.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      i.college.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      i.email.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchesProgram = programFilter === 'all' || i.internshipProgram.toLowerCase().includes(programFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || i.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          padding: '14px 24px',
          borderRadius: '12px',
          fontWeight: '700',
          boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)',
          animation: 'slideIn 0.3s ease'
        }}>
          {toast}
        </div>
      )}

      {/* Top Header Summary & Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💼</span>
            <span>Internship Programs &amp; Applicants</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Manage the live internship tracks displayed on the front page or evaluate student applicants.
          </p>
        </div>

        {activeTab === 'programs' && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="admin-btn admin-btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(217, 70, 239, 0.35)'
            }}
          >
            <span>✨</span>
            <span>+ Add New Internship Program</span>
          </button>
        )}
      </div>

      {/* Modern Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.25)',
        paddingBottom: '10px'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('programs')}
          style={{
            padding: '10px 22px',
            borderRadius: '10px',
            background: activeTab === 'programs' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(255, 255, 255, 0.05)',
            border: activeTab === 'programs' ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.1)',
            color: activeTab === 'programs' ? '#fff' : '#94a3b8',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <span>🎓</span>
          <span>Internship Programs Catalog ({programs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('applicants')}
          style={{
            padding: '10px 22px',
            borderRadius: '10px',
            background: activeTab === 'applicants' ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'rgba(255, 255, 255, 0.05)',
            border: activeTab === 'applicants' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
            color: activeTab === 'applicants' ? '#fff' : '#94a3b8',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <span>📋</span>
          <span>Student Applicants Pipeline ({applicants.length})</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: INTERNSHIP PROGRAMS CATALOG
          ========================================================= */}
      {activeTab === 'programs' && (
        <div>
          {/* Search bar */}
          <div className="admin-toolbar" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1, alignItems: 'center' }}>
              <input
                type="text"
                className="admin-search-input"
                placeholder="🔍 Search programs by title, track, tags or skills..."
                value={programSearch}
                onChange={(e) => setProgramSearch(e.target.value)}
                style={{ flex: 1, minWidth: '280px' }}
              />
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Showing {filteredPrograms.length} of {programs.length} programs
              </span>
              <Link
                to="/internship"
                target="_blank"
                style={{
                  padding: '9px 18px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  color: '#c084fc',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                👁️ View Front Page →
              </Link>
            </div>
          </div>

          {/* Programs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {filteredPrograms.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 24px',
                background: 'rgba(20, 14, 52, 0.6)',
                border: '1px dashed rgba(139, 92, 246, 0.3)',
                borderRadius: '16px'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
                <h4 style={{ fontSize: '18px', color: '#fff', margin: '0 0 8px' }}>No programs match your search</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 20px' }}>
                  Try another keyword or click "+ Add New Internship Program" to create one.
                </p>
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="admin-btn admin-btn-primary"
                  style={{ padding: '10px 20px' }}
                >
                  + Add New Internship Program
                </button>
              </div>
            ) : (
              filteredPrograms.map((p, idx) => {
                const modulesList = Array.isArray(p.modules)
                  ? p.modules
                  : (typeof p.modules === 'string'
                    ? p.modules.split('\n').filter(Boolean)
                    : []);
                const badgeColor = p.badgeColor || '#ec4899';
                const accent = p.accent || '#c084fc';
                const num = p.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`);

                return (
                  <div
                    key={p.id || p._id || idx}
                    style={{
                      background: 'rgba(20, 14, 52, 0.75)',
                      border: '1px solid rgba(139, 92, 246, 0.28)',
                      borderRadius: '18px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 10px 28px rgba(0, 0, 0, 0.35)'
                    }}
                  >
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          background: badgeColor,
                          color: '#fff',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '800',
                          textTransform: 'uppercase'
                        }}>
                          {p.badge || 'INTERNSHIP'}
                        </span>
                        {p.tag && (
                          <span style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#e2e8f0',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '10.5px',
                            fontWeight: '700'
                          }}>
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: 'rgba(255, 255, 255, 0.25)' }}>
                        #{num}
                      </span>
                    </div>

                    {/* Program Titles */}
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: '0 0 4px', lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: accent, marginBottom: '12px' }}>
                      {p.subtitle || p.title}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 16px', flex: '0 0 auto' }}>
                      {p.desc}
                    </p>

                    {/* Modules Bullet Points */}
                    <div style={{ marginBottom: '16px', flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                        Modules ({modulesList.length}):
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {modulesList.slice(0, 4).map((m, mIdx) => (
                          <div key={mIdx} style={{ fontSize: '12.5px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                            <span style={{ color: accent, fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>✓</span>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{m}</span>
                          </div>
                        ))}
                        {modulesList.length > 4 && (
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontStyle: 'italic', marginTop: '2px' }}>
                            + {modulesList.length - 4} more topics
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Target Outcome Box */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${accent}33`,
                      borderRadius: '10px',
                      padding: '10px 12px',
                      marginBottom: '18px'
                    }}>
                      <div style={{ fontSize: '10px', fontWeight: '800', color: accent, textTransform: 'uppercase', marginBottom: '3px' }}>
                        Target Outcome
                      </div>
                      <div style={{ fontSize: '12px', color: '#f1f5f9', lineHeight: 1.45 }}>
                        {p.outcome}
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', alignItems: 'center' }}>
                      <Link
                        to={normalizeInternshipLink(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '9px 12px',
                          background: 'rgba(56, 189, 248, 0.15)',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          borderRadius: '8px',
                          color: '#38bdf8',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap'
                        }}
                        title="View the live public dedicated page for this internship"
                      >
                        <span>👁️</span>
                        <span>Public Page ↗</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          background: 'rgba(139, 92, 246, 0.2)',
                          border: '1px solid rgba(139, 92, 246, 0.4)',
                          borderRadius: '8px',
                          color: '#c084fc',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>✏️</span>
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProgram(p)}
                        style={{
                          padding: '9px 14px',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.35)',
                          borderRadius: '8px',
                          color: '#f87171',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Delete this program"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: STUDENT APPLICANTS PIPELINE
          ========================================================= */}
      {activeTab === 'applicants' && (
        <div>
          <div className="admin-toolbar" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
              <input
                type="text"
                className="admin-search-input"
                placeholder="🔍 Search candidate, college, email..."
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
              />

              <select
                className="admin-select"
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
              >
                <option value="all">All Internship Programs</option>
                {programs.map((p) => (
                  <option key={p.id || p.title} value={p.title}>
                    {p.title}
                  </option>
                ))}
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
                <span>📋</span>
                <span>Internship Candidates Pipeline ({filteredApplicants.length})</span>
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
                    {filteredApplicants.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                          No internship candidates match the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredApplicants.map((item) => (
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
                              onClick={() => handleDeleteApplicant(item.id)}
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

            {/* Mobile Vertical Cards */}
            <div className="admin-cards-mobile">
              {filteredApplicants.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px', color: '#94a3b8', background: 'rgba(5, 5, 18, 0.6)', borderRadius: '12px' }}>
                  No internship candidates match the filter criteria.
                </div>
              ) : (
                filteredApplicants.map((item) => (
                  <div key={item.id} className="admin-mobile-data-card">
                    <div className="admin-mobile-card-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                      <div style={{ width: '100%' }}>
                        <h4 className="admin-mobile-card-title" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{item.candidateName}</h4>
                        <div className="admin-mobile-card-subtitle" style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}>{item.email}</div>
                      </div>
                      <span
                        className="admin-mobile-card-badge"
                        style={{
                          background: 'rgba(34, 211, 238, 0.15)',
                          border: '1px solid rgba(34, 211, 238, 0.35)',
                          color: '#22d3ee',
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                          maxWidth: '100%',
                          display: 'inline-block',
                          boxSizing: 'border-box'
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
                        <button
                          type="button"
                          onClick={() => handleDeleteApplicant(item.id)}
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
      )}

      {/* =========================================================
          MODAL: ADD / EDIT INTERNSHIP PROGRAM
          ========================================================= */}
      {isModalOpen && (
        <div
          className="admin-modal-overlay"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(4, 2, 10, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 12px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #120e2e, #0a061c)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '32px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
              margin: 'auto 0'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: '0 0 4px' }}>
                  {editingProgram ? '✏️ Edit Internship Program' : '✨ Add New Internship Program'}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                  Fill in the cohort details. It will appear live on the front page and in the Enroll Form.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProgram}>
              {/* Row 1: Title & Subtitle */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cloud &amp; DevOps Internship"
                    value={form.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setForm(prev => {
                        const isAutoLink = !prev.link || prev.link === '/internship' || prev.link.startsWith('/internship/');
                        return {
                          ...prev,
                          title: newTitle,
                          link: (isAutoLink && newTitle.trim()) ? `/internship/${slugifyDepartment(newTitle)}` : prev.link
                        };
                      });
                    }}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.35)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                    Subtitle / Track Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AWS, Docker, Kubernetes &amp; CI/CD"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.35)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Badge Text & Badge Color */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                    Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. POPULAR &amp; TRENDING / FAST TRACK"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.35)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                    Badge Color
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={form.badgeColor}
                      onChange={(e) => setForm({ ...form, badgeColor: e.target.value })}
                      style={{
                        width: '42px',
                        height: '42px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {BADGE_COLOR_PRESETS.map((p) => (
                        <button
                          key={p.hex}
                          type="button"
                          onClick={() => setForm({ ...form, badgeColor: p.hex })}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            background: p.hex,
                            border: form.badgeColor === p.hex ? '2px solid #fff' : 'none',
                            cursor: 'pointer'
                          }}
                          title={p.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Cohort Number, Domain Tag, Accent Color */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                    Cohort Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 06"
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.35)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                    Domain / Tech Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CLOUD / DEVOPS"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.35)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                    Accent Highlight Color
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={form.accent}
                      onChange={(e) => setForm({ ...form, accent: e.target.value })}
                      style={{
                        width: '42px',
                        height: '42px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {ACCENT_COLOR_PRESETS.map((p) => (
                        <button
                          key={p.hex}
                          type="button"
                          onClick={() => setForm({ ...form, accent: p.hex })}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            background: p.hex,
                            border: form.accent === p.hex ? '2px solid #fff' : 'none',
                            cursor: 'pointer'
                          }}
                          title={p.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Detail Route Link */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                  Detail Page Route / Link
                </label>
                <input
                  type="text"
                  placeholder="e.g. /internship or /internship/aiInternship"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <div style={{ fontSize: '11.5px', color: '#c084fc', marginTop: '6px' }}>
                  ✨ Automatically generates a dedicated public page at <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>{form.link || `/internship/${slugifyDepartment(form.title || 'program')}`}</code> and adds it to the Navbar &quot;Internship&quot; dropdown.
                </div>
              </div>

              {/* Row 5: Description */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                  Program Description *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summarize the core technical scope and industrial relevance of this internship..."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Row 6: What You Will Learn (Modules) */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                  What You Will Learn (1 Topic per line) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={"Introduction to Cloud Infrastructure\nDocker Containerization & Multi-Stage Builds\nKubernetes Orchestration & Clusters\nCI/CD Pipelines with GitHub Actions"}
                  value={form.modules}
                  onChange={(e) => setForm({ ...form, modules: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '13.5px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Row 7: Target Outcome */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                  Target Outcome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deploy live enterprise cloud applications and earn an industry-recognized certificate."
                  value={form.outcome}
                  onChange={(e) => setForm({ ...form, outcome: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#cbd5e1',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '14.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(217, 70, 239, 0.4)'
                  }}
                >
                  {editingProgram ? '💾 Save Changes' : '🚀 Publish Internship Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
