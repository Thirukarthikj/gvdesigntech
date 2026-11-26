import React, { useState, useEffect, useMemo } from 'react';
import {
  getStoredSkillTestQuestions,
  saveStoredSkillTestQuestions,
  getStoredSkillTestResults,
  deleteStoredSkillTestResult,
  clearStoredSkillTestResults,
  subscribeToContentUpdates
} from '../../data/contentPersistence.js';
import { initialSkillDomains, initialSkillQuestions } from '../../data/skillTestData.js';

export default function AdminSkillTest() {
  const [activeTab, setActiveTab] = useState('results'); // 'results' | 'questions'

  // Questions state
  const [questions, setQuestions] = useState(() => getStoredSkillTestQuestions());
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Student results state
  const [results, setResults] = useState(() => getStoredSkillTestResults());
  const [resultSearch, setResultSearch] = useState('');
  const [resultDomainFilter, setResultDomainFilter] = useState('all');
  const [viewingResult, setViewingResult] = useState(null);

  const [toast, setToast] = useState('');

  // Question form
  const [qForm, setQForm] = useState({
    domain: 'cad',
    category: 'Mechanical CAD & Automobile',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Intermediate',
    explanation: ''
  });

  // Sync from backend MongoDB and realtime updates on mount
  useEffect(() => {
    // 1. Fetch questions from MongoDB
    fetch('/api/skill-test-questions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data);
          localStorage.setItem('gv_skill_test_questions', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 2. Fetch results from MongoDB
    fetch('/api/skill-test-results')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setResults(data);
          localStorage.setItem('gv_skill_test_results', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 3. Listen to realtime content updates
    const unsub = subscribeToContentUpdates((collection) => {
      if (collection === 'skill_test_questions') {
        setQuestions(getStoredSkillTestQuestions());
      } else if (collection === 'skill_test_results') {
        setResults(getStoredSkillTestResults());
      }
    });

    return () => unsub();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // --- Statistics ---
  const stats = useMemo(() => {
    const totalStudents = results.length;
    const totalQuestions = questions.length;
    const avgScore = totalStudents > 0
      ? Math.round(results.reduce((acc, r) => acc + (r.percentage || 0), 0) / totalStudents)
      : 0;
    const qualifiedCount = results.filter(r => (r.percentage || 0) >= 60).length;

    return { totalStudents, totalQuestions, avgScore, qualifiedCount };
  }, [results, questions]);

  // --- Filtered Questions ---
  const filteredQuestions = useMemo(() => {
    if (selectedDomain === 'all') return questions;
    return questions.filter(q => q.domain === selectedDomain);
  }, [questions, selectedDomain]);

  // --- Filtered Results ---
  const filteredResults = useMemo(() => {
    return results.filter(r => {
      const matchesDomain = resultDomainFilter === 'all' || r.domain === resultDomainFilter;
      const q = resultSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        (r.studentName && r.studentName.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.phone && r.phone.includes(q)) ||
        (r.college && r.college.toLowerCase().includes(q));
      return matchesDomain && matchesSearch;
    });
  }, [results, resultSearch, resultDomainFilter]);

  // --- Modal Helpers ---
  const openNewQuestionModal = () => {
    setEditingQuestion(null);
    setQForm({
      domain: selectedDomain === 'all' ? 'cad' : selectedDomain,
      category: 'Mechanical CAD & Automobile',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 0,
      marks: 1,
      difficulty: 'Intermediate',
      explanation: ''
    });
    setIsQuestionModalOpen(true);
  };

  const openEditQuestionModal = (q) => {
    setEditingQuestion(q);
    setQForm({
      domain: q.domain || 'cad',
      category: q.category || 'Engineering Question',
      question: q.question || q.q || '',
      optionA: q.options?.[0] || '',
      optionB: q.options?.[1] || '',
      optionC: q.options?.[2] || '',
      optionD: q.options?.[3] || '',
      correctAnswer: q.correctAnswer ?? q.correct ?? 0,
      marks: q.marks || 1,
      difficulty: q.difficulty || 'Intermediate',
      explanation: q.explanation || ''
    });
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!qForm.question.trim()) {
      alert('Please enter question text');
      return;
    }
    if (!qForm.optionA.trim() || !qForm.optionB.trim()) {
      alert('Please provide at least Option A and Option B');
      return;
    }

    const options = [
      qForm.optionA.trim(),
      qForm.optionB.trim(),
      qForm.optionC.trim() || 'N/A',
      qForm.optionD.trim() || 'N/A'
    ];

    const domainItem = initialSkillDomains.find(d => d.key === qForm.domain);
    const categoryName = domainItem ? domainItem.label : qForm.category;

    if (editingQuestion) {
      const updated = questions.map(q => {
        if (q.id === editingQuestion.id) {
          return {
            ...q,
            domain: qForm.domain,
            category: categoryName,
            question: qForm.question.trim(),
            options,
            correctAnswer: Number(qForm.correctAnswer),
            marks: Number(qForm.marks) || 1,
            difficulty: qForm.difficulty,
            explanation: qForm.explanation.trim(),
            updatedAt: new Date().toISOString()
          };
        }
        return q;
      });
      saveStoredSkillTestQuestions(updated);
      setQuestions(updated);
      showToast('Question updated successfully!');
    } else {
      const newQuestion = {
        id: 'stq-' + Date.now(),
        domain: qForm.domain,
        category: categoryName,
        question: qForm.question.trim(),
        options,
        correctAnswer: Number(qForm.correctAnswer),
        marks: Number(qForm.marks) || 1,
        difficulty: qForm.difficulty,
        explanation: qForm.explanation.trim(),
        createdAt: new Date().toISOString()
      };
      const updated = [...questions, newQuestion];
      saveStoredSkillTestQuestions(updated);
      setQuestions(updated);
      showToast('New question published to Skill Test!');
    }

    setIsQuestionModalOpen(false);
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updated = questions.filter(q => q.id !== id);
      saveStoredSkillTestQuestions(updated);
      setQuestions(updated);
      showToast('Question removed from test pool.');
    }
  };

  const handleSeedQuestions = () => {
    if (window.confirm('Reset Question Bank with standard engineering assessment questions?')) {
      saveStoredSkillTestQuestions(initialSkillQuestions);
      setQuestions(initialSkillQuestions);
      showToast('Default engineering question bank restored!');
    }
  };

  const handleDeleteResult = (id) => {
    if (window.confirm('Delete this student score record?')) {
      deleteStoredSkillTestResult(id);
      setResults(results.filter(r => r.id !== id));
      showToast('Student score record deleted.');
    }
  };

  const handleClearAllResults = () => {
    if (window.confirm('Are you sure you want to clear ALL student score records? This action cannot be undone.')) {
      clearStoredSkillTestResults();
      setResults([]);
      showToast('All student score records cleared.');
    }
  };

  const handleExportCSV = () => {
    if (results.length === 0) {
      alert('No student records to export.');
      return;
    }
    const headers = ['Student Name', 'Email', 'Phone', 'College', 'Department', 'Year', 'Track', 'Score', 'Total Questions', 'Percentage', 'Status', 'Date Submitted'];
    const rows = results.map(r => [
      `"${r.studentName || ''}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${(r.college || '').replace(/"/g, '""')}"`,
      `"${r.department || ''}"`,
      `"${r.year || ''}"`,
      `"${r.domainLabel || r.domain || ''}"`,
      r.score ?? 0,
      r.totalQuestions ?? 0,
      `${r.percentage ?? 0}%`,
      `"${r.status || ''}"`,
      `"${r.submittedAt ? new Date(r.submittedAt).toLocaleString() : r.date || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gv-designtech-skill-test-scores-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ color: '#fff', paddingBottom: '60px' }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999, background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✓</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '999px', fontSize: '12px', fontWeight: '700', color: '#f472b6', marginBottom: '8px' }}>
            <span>🎯</span> TECHNICAL ASSESSMENT REPOSITORY
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px', color: '#fff' }}>
            Skill Test Question Bank &amp; Student Scores
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Manage assessment questions, configure technical options, and evaluate live student test scores in real time.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {activeTab === 'questions' ? (
            <>
              <button
                type="button"
                onClick={openNewQuestionModal}
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 20px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(217, 70, 239, 0.3)' }}
              >
                <span>➕</span> Add New Question
              </button>
              <button
                type="button"
                onClick={handleSeedQuestions}
                style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#cbd5e1', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Restore Standard Pool
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleExportCSV}
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 20px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>📥</span> Export Scores (CSV)
              </button>
              {results.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllResults}
                  style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Clear All Scores
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Top Telemetry Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '18px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Total Students Assessed
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>
            {stats.totalStudents}
          </div>
          <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '4px' }}>
            Live Student Test Submissions
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(217, 70, 239, 0.25)', borderRadius: '18px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Average Benchmark Score
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#c084fc' }}>
            {stats.avgScore}%
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
            Across all engineering domains
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: '18px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Qualified Candidates (≥60%)
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#34d399' }}>
            {stats.qualifiedCount}
          </div>
          <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px' }}>
            {stats.totalStudents > 0 ? `${Math.round((stats.qualifiedCount / stats.totalStudents) * 100)}% qualification rate` : 'Awaiting tests'}
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '18px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Active Question Bank
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#fbbf24' }}>
            {stats.totalQuestions}
          </div>
          <div style={{ fontSize: '12px', color: '#fbbf24', marginTop: '4px' }}>
            Questions across 6 technical disciplines
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('results')}
          style={{
            background: activeTab === 'results' ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(217,70,239,0.3))' : 'transparent',
            border: activeTab === 'results' ? '1px solid #d946ef' : '1px solid transparent',
            color: activeTab === 'results' ? '#fff' : '#94a3b8',
            padding: '10px 22px',
            borderRadius: '12px',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>📊</span> Student Test Scores &amp; Results ({results.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          style={{
            background: activeTab === 'questions' ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(217,70,239,0.3))' : 'transparent',
            border: activeTab === 'questions' ? '1px solid #d946ef' : '1px solid transparent',
            color: activeTab === 'questions' ? '#fff' : '#94a3b8',
            padding: '10px 22px',
            borderRadius: '12px',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>⚙️</span> Manage Question Bank ({questions.length})
        </button>
      </div>

      {/* ========================================================
          TAB 1: STUDENT TEST SCORES & EVALUATION RECORDS
          ======================================================== */}
      {activeTab === 'results' && (
        <div>
          {/* Filters & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: '1', maxWidth: '500px' }}>
              <input
                type="text"
                placeholder="Search student by name, email, phone, or college..."
                value={resultSearch}
                onChange={(e) => setResultSearch(e.target.value)}
                style={{ width: '100%', padding: '12px 18px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Filter Track:</span>
              <select
                value={resultDomainFilter}
                onChange={(e) => setResultDomainFilter(e.target.value)}
                style={{ padding: '10px 14px', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '10px', color: '#fff', fontSize: '13.5px', outline: 'none', colorScheme: 'dark' }}
              >
                <option value="all">All Tracks</option>
                {initialSkillDomains.map(d => (
                  <option key={d.key} value={d.key}>{d.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Table */}
          {filteredResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: '20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📝</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 6px' }}>No Student Test Scores Recorded Yet</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '460px', margin: '0 auto 20px' }}>
                When students register their full details and complete the technical assessment, their evaluation scores and contact details will appear here automatically.
              </p>
              <a
                href="/pest-exam"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', padding: '10px 22px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid #8b5cf6', color: '#c084fc', borderRadius: '10px', fontSize: '13.5px', fontWeight: '700', textDecoration: 'none' }}
              >
                Open Public Skill Test Page ↗
              </a>
            </div>
          ) : (
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(139, 92, 246, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Candidate</th>
                      <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>College &amp; Dept</th>
                      <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Assessment Track</th>
                      <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Score / Result</th>
                      <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Date</th>
                      <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((r) => {
                      const pct = r.percentage ?? (r.totalQuestions ? Math.round((r.score / r.totalQuestions) * 100) : 0);
                      const isHigh = pct >= 75;
                      const isPass = pct >= 50;

                      return (
                        <tr key={r.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s' }}>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ fontWeight: '700', fontSize: '14.5px', color: '#fff' }}>{r.studentName}</div>
                            <div style={{ fontSize: '13px', color: '#94a3b8' }}>{r.email}</div>
                            <div style={{ fontSize: '12px', color: '#a78bfa' }}>📞 {r.phone}</div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ fontSize: '13.5px', color: '#cbd5e1' }}>{r.college || 'N/A'}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{r.department} {r.year ? `• ${r.year}` : ''}</div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', fontSize: '12.5px', fontWeight: '600', color: '#c084fc' }}>
                              {r.domainLabel || r.domain?.toUpperCase() || 'GENERAL'}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '16px', fontWeight: '800', color: isHigh ? '#34d399' : isPass ? '#38bdf8' : '#f87171' }}>
                                {r.score} / {r.totalQuestions}
                              </span>
                              <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '6px', background: isHigh ? 'rgba(52, 211, 153, 0.15)' : isPass ? 'rgba(56, 189, 248, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: isHigh ? '#34d399' : isPass ? '#38bdf8' : '#f87171', fontWeight: '700' }}>
                                {pct}%
                              </span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: isHigh ? '#34d399' : isPass ? '#38bdf8' : '#94a3b8', marginTop: '2px' }}>
                              {r.status || (isHigh ? 'Qualified' : isPass ? 'Passed' : 'Needs Practice')}
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                            {r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : r.date || 'Today'}
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <button
                              type="button"
                              onClick={() => setViewingResult(r)}
                              style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#c084fc', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', marginRight: '8px' }}
                            >
                              View Details
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteResult(r.id)}
                              style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: MANAGE QUESTION BANK
          ======================================================== */}
      {activeTab === 'questions' && (
        <div>
          {/* Domain Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={() => setSelectedDomain('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: selectedDomain === 'all' ? '#d946ef' : 'rgba(255, 255, 255, 0.12)',
                background: selectedDomain === 'all' ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(217,70,239,0.3))' : 'rgba(255, 255, 255, 0.03)',
                color: '#fff'
              }}
            >
              All Questions ({questions.length})
            </button>
            {initialSkillDomains.map(d => {
              const count = questions.filter(q => q.domain === d.key).length;
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setSelectedDomain(d.key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: selectedDomain === d.key ? '#d946ef' : 'rgba(255, 255, 255, 0.12)',
                    background: selectedDomain === d.key ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(217,70,239,0.3))' : 'rgba(255, 255, 255, 0.03)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{d.icon}</span>
                  <span>{d.label}</span>
                  <span style={{ fontSize: '11px', padding: '1px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Question Cards List */}
          {filteredQuestions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: '20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>❓</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 6px' }}>No Questions Found For This Discipline</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '460px', margin: '0 auto 20px' }}>
                You can add technical questions for this category or restore the standard engineering question pool.
              </p>
              <button
                type="button"
                onClick={openNewQuestionModal}
                style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
              >
                + Create Question
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredQuestions.map((q, idx) => {
                const correctIdx = q.correctAnswer ?? q.correct ?? 0;
                return (
                  <div
                    key={q.id || idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '18px',
                      padding: '24px',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#22d3ee', padding: '3px 8px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '6px' }}>
                          Q#{idx + 1}
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', padding: '3px 10px', background: 'rgba(192, 132, 252, 0.12)', borderRadius: '999px' }}>
                          {q.category || q.domain?.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '11px', color: '#94a3b8', padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
                          Difficulty: {q.difficulty || 'Intermediate'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#fbbf24', padding: '2px 8px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '6px' }}>
                          Marks: {q.marks || 1}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => openEditQuestionModal(q)}
                          style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#c084fc', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(q.id)}
                          style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '16px', fontWeight: '700', lineHeight: 1.4, margin: '0 0 16px', color: '#fff' }}>
                      {q.question || q.q}
                    </h4>

                    {/* Options Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                      {(q.options || []).map((opt, oIdx) => {
                        const isCorrect = oIdx === correctIdx;
                        return (
                          <div
                            key={oIdx}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              background: isCorrect ? 'rgba(52, 211, 153, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                              border: isCorrect ? '1px solid #34d399' : '1px solid rgba(255, 255, 255, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}
                          >
                            <span style={{ fontSize: '12px', fontWeight: '800', width: '22px', height: '22px', borderRadius: '50%', background: isCorrect ? '#34d399' : 'rgba(255,255,255,0.1)', color: isCorrect ? '#000' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span style={{ fontSize: '13.5px', color: isCorrect ? '#34d399' : '#cbd5e1', fontWeight: isCorrect ? '700' : '400', flex: 1 }}>
                              {opt}
                            </span>
                            {isCorrect && (
                              <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 6px', background: '#34d399', color: '#000', borderRadius: '4px' }}>
                                Correct Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div style={{ marginTop: '12px', fontSize: '12.5px', color: '#94a3b8', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px' }}>
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          ADD / EDIT QUESTION MODAL
          ======================================================== */}
      {isQuestionModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '640px', background: '#0b0c22', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '24px', padding: '32px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.9)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#fff' }}>
                {editingQuestion ? 'Edit Assessment Question' : 'Create New Assessment Question'}
              </h2>
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Engineering Discipline / Track
                  </label>
                  <select
                    value={qForm.domain}
                    onChange={(e) => {
                      const domainItem = initialSkillDomains.find(d => d.key === e.target.value);
                      setQForm({
                        ...qForm,
                        domain: e.target.value,
                        category: domainItem ? domainItem.label : qForm.category
                      });
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#111827', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '14px', outline: 'none', colorScheme: 'dark' }}
                  >
                    {initialSkillDomains.map(d => (
                      <option key={d.key} value={d.key}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Difficulty Level
                  </label>
                  <select
                    value={qForm.difficulty}
                    onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#111827', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '14px', outline: 'none', colorScheme: 'dark' }}
                  >
                    <option value="Beginner">Beginner (Foundational)</option>
                    <option value="Intermediate">Intermediate (Industry Applied)</option>
                    <option value="Advanced">Advanced (Expert / Specialized)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Question Text *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. Which projection method is standard in European engineering drawings?"
                  value={qForm.question}
                  onChange={(e) => setQForm({ ...qForm, question: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Options A, B, C, D */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#c084fc', marginBottom: '10px' }}>
                  Answer Choices (Select the radio of the correct answer)
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { key: 'optionA', label: 'Option A', idx: 0 },
                    { key: 'optionB', label: 'Option B', idx: 1 },
                    { key: 'optionC', label: 'Option C', idx: 2 },
                    { key: 'optionD', label: 'Option D', idx: 3 }
                  ].map((opt) => (
                    <div key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        id={`corr-${opt.idx}`}
                        name="correctAnswer"
                        checked={Number(qForm.correctAnswer) === opt.idx}
                        onChange={() => setQForm({ ...qForm, correctAnswer: opt.idx })}
                        style={{ width: '18px', height: '18px', accentColor: '#34d399', cursor: 'pointer' }}
                      />
                      <label htmlFor={`corr-${opt.idx}`} style={{ fontSize: '13px', fontWeight: '700', color: Number(qForm.correctAnswer) === opt.idx ? '#34d399' : '#94a3b8', width: '70px', cursor: 'pointer' }}>
                        {opt.label}:
                      </label>
                      <input
                        type="text"
                        required={opt.idx < 2}
                        placeholder={`Enter ${opt.label} text...`}
                        value={qForm[opt.key]}
                        onChange={(e) => setQForm({ ...qForm, [opt.key]: e.target.value })}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: Number(qForm.correctAnswer) === opt.idx ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Explanation / Solution Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Standardized under ISO 128 for engineering projection methods."
                  value={qForm.explanation}
                  onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14.5px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {editingQuestion ? 'Save Changes' : 'Publish Question to Test'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  style={{ padding: '12px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW STUDENT RESULT DETAILS MODAL
          ======================================================== */}
      {viewingResult && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '580px', background: '#0b0c22', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '24px', padding: '32px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.9)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#38bdf8', padding: '3px 8px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '6px' }}>
                  EVALUATION REPORT
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '4px 0 0', color: '#fff' }}>
                  {viewingResult.studentName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setViewingResult(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Email Address:</span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{viewingResult.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Phone Number:</span>
                <span style={{ color: '#22d3ee', fontSize: '13px', fontWeight: '600' }}>{viewingResult.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>College / University:</span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{viewingResult.college || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Department &amp; Year:</span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{viewingResult.department} ({viewingResult.year || 'Standard'})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Assessment Domain:</span>
                <span style={{ color: '#c084fc', fontSize: '13px', fontWeight: '700' }}>{viewingResult.domainLabel || viewingResult.domain}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '700' }}>Benchmark Score:</span>
                <span style={{ color: viewingResult.percentage >= 60 ? '#34d399' : '#f87171', fontSize: '18px', fontWeight: '800' }}>
                  {viewingResult.score} / {viewingResult.totalQuestions} ({viewingResult.percentage}%)
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Status Tier:</span>
                <span style={{ color: viewingResult.percentage >= 60 ? '#34d399' : '#fbbf24', fontSize: '13px', fontWeight: '700' }}>
                  {viewingResult.status}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Attended On:</span>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                  {viewingResult.submittedAt ? new Date(viewingResult.submittedAt).toLocaleString() : viewingResult.date}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={`tel:${viewingResult.phone}`}
                style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: '#fff', borderRadius: '10px', fontSize: '13.5px', fontWeight: '700', textAlign: 'center', textDecoration: 'none' }}
              >
                📞 Call Candidate
              </a>
              <a
                href={`mailto:${viewingResult.email}?subject=GV%20DesignTech%20Technical%20Assessment%20Result`}
                style={{ flex: 1, padding: '12px', background: 'rgba(217, 70, 239, 0.2)', border: '1px solid #d946ef', color: '#f472b6', borderRadius: '10px', fontSize: '13.5px', fontWeight: '700', textAlign: 'center', textDecoration: 'none' }}
              >
                ✉️ Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
