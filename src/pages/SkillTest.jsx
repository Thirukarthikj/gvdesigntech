import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getStoredSkillTestQuestions,
  saveStoredSkillTestResult,
  subscribeToContentUpdates
} from '../data/contentPersistence.js';
import { initialSkillDomains } from '../data/skillTestData.js';
import { pestStyles as J } from '../data/styles.js';

export default function SkillTest() {
  // Step state: 'select_domain' | 'fill_details' | 'test_active' | 'finished'
  const [step, setStep] = useState('select_domain');
  const [selectedDomain, setSelectedDomain] = useState('cad');
  const [allQuestions, setAllQuestions] = useState(() => getStoredSkillTestQuestions());

  // Candidate Details Form
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: 'Mechanical Engineering',
    year: 'Final Year'
  });
  const [formError, setFormError] = useState('');

  // Test session state
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState({});
  const [finalResult, setFinalResult] = useState(null);

  // Sync questions from backend and persistence
  useEffect(() => {
    fetch('/api/skill-test-questions')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          setAllQuestions(d);
          localStorage.setItem('gv_skill_test_questions', JSON.stringify(d));
        }
      })
      .catch(() => {});

    const unsub = subscribeToContentUpdates((col) => {
      if (col === 'skill_test_questions') {
        setAllQuestions(getStoredSkillTestQuestions());
      }
    });
    return () => unsub();
  }, []);

  // Filter questions for the selected domain
  const domainQuestions = allQuestions.filter(q => q.domain === selectedDomain);
  // Fallback to all questions if none explicitly tagged for that domain
  const activeQuestions = domainQuestions.length > 0 ? domainQuestions : allQuestions;

  const activeDomainInfo = initialSkillDomains.find(d => d.key === selectedDomain) || {
    key: selectedDomain,
    label: 'Technical Assessment',
    icon: '⚙️'
  };

  // --- Handlers ---
  const handleProceedToDetails = (domainKey) => {
    setSelectedDomain(domainKey);
    const dInfo = initialSkillDomains.find(d => d.key === domainKey);
    if (dInfo) {
      setCandidate(prev => ({
        ...prev,
        department: dInfo.label.split('&')[0].trim()
      }));
    }
    setStep('fill_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTest = (e) => {
    e.preventDefault();
    setFormError('');

    if (!candidate.name.trim() || !candidate.email.trim() || !candidate.phone.trim() || !candidate.college.trim()) {
      setFormError('Please complete all required fields (Name, Email, Phone, College).');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(candidate.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (candidate.phone.trim().replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (activeQuestions.length === 0) {
      setFormError('No questions currently published for this discipline. Please choose another track.');
      return;
    }

    // Begin assessment
    setCurrentQ(0);
    setSelectedAns({});
    setStep('test_active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (idx) => {
    setSelectedAns({ ...selectedAns, [currentQ]: idx });
  };

  const handleNext = () => {
    if (currentQ < activeQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    let earned = 0;
    activeQuestions.forEach((q, idx) => {
      const correctIdx = q.correctAnswer ?? q.correct ?? 0;
      if (selectedAns[idx] === correctIdx) {
        earned += (q.marks || 1);
      }
    });

    const totalPoints = activeQuestions.reduce((acc, q) => acc + (q.marks || 1), 0);
    const percentage = totalPoints > 0 ? Math.round((earned / totalPoints) * 100) : 0;
    const isQualified = percentage >= 60;
    const status = percentage >= 75 ? 'Qualified (Fast-Track)' : percentage >= 60 ? 'Qualified' : 'Needs Practice';

    const resultPayload = {
      id: 'str-' + Date.now(),
      studentName: candidate.name.trim(),
      email: candidate.email.trim(),
      phone: candidate.phone.trim(),
      college: candidate.college.trim(),
      department: candidate.department.trim(),
      year: candidate.year,
      domain: selectedDomain,
      domainLabel: activeDomainInfo.label,
      score: earned,
      totalQuestions: activeQuestions.length,
      percentage,
      status,
      date: new Date().toISOString().split('T')[0],
      submittedAt: new Date().toISOString(),
      userResponses: selectedAns
    };

    // Store directly in Admin Registry (MongoDB, localStorage, Firestore)
    saveStoredSkillTestResult(resultPayload);
    setFinalResult(resultPayload);
    setStep('finished');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAll = () => {
    setSelectedAns({});
    setCurrentQ(0);
    setFinalResult(null);
    setStep('select_domain');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={J['mi-page']} style={{ minHeight: '100vh', background: '#04020a', color: '#fff', padding: '130px 24px 80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Global Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            <span>🎯</span> GV DESIGNTECH TECHNICAL BENCHMARK
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 14px', background: 'linear-gradient(135deg, #ffffff 40%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Engineering Technical Assessment<br />Skill Test (P.S.T)
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '16px', color: '#94a3b8', lineHeight: 1.6 }}>
            Benchmark your engineering competence with our industry-evaluated assessment. Your score is automatically validated and registered with the GV DesignTech Placement Cell.
          </p>
        </div>

        {/* ========================================================
            STEP 1: CHOOSE ASSESSMENT TRACK / DOMAIN
            ======================================================== */}
        {step === 'select_domain' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
                Select Your Assessment Specialization
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                Choose the discipline you wish to be evaluated in.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {initialSkillDomains.map((d) => {
                const count = allQuestions.filter(q => q.domain === d.key).length;
                const isSelected = selectedDomain === d.key;

                return (
                  <div
                    key={d.key}
                    onClick={() => setSelectedDomain(d.key)}
                    style={{
                      padding: '24px',
                      borderRadius: '20px',
                      background: isSelected
                        ? 'linear-gradient(145deg, rgba(139, 92, 246, 0.25), rgba(217, 70, 239, 0.25))'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid',
                      borderColor: isSelected ? '#d946ef' : 'rgba(139, 92, 246, 0.25)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 12px 30px rgba(217, 70, 239, 0.25)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '14px' }}>{d.icon}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 6px', color: isSelected ? '#fff' : '#cbd5e1' }}>
                      {d.label}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 14px', lineHeight: 1.5 }}>
                      {d.desc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', padding: '3px 10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', color: '#38bdf8', fontWeight: '700' }}>
                        {count > 0 ? `${count} Questions Pool` : 'Active Assessment'}
                      </span>
                      <span style={{ fontSize: '13px', color: '#d946ef', fontWeight: '700' }}>
                        {isSelected ? '✓ Selected' : 'Choose →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => handleProceedToDetails(selectedDomain)}
                style={{
                  padding: '16px 48px',
                  background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                  border: 'none',
                  borderRadius: '14px',
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(217, 70, 239, 0.4)'
                }}
              >
                Proceed to Candidate Verification →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: FULL DETAILS CANDIDATE REGISTRATION FORM
            (Student must fill this before starting test)
            ======================================================== */}
        {step === 'fill_details' && (
          <div style={{ maxWidth: '640px', margin: '0 auto', background: 'linear-gradient(160deg, rgba(26, 18, 62, 0.85), rgba(6, 6, 24, 0.95))', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '24px', padding: '36px', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '999px', fontSize: '11px', fontWeight: '700', color: '#38bdf8', marginBottom: '10px' }}>
                <span>📋</span> CANDIDATE PROFILE VERIFICATION
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px', color: '#fff' }}>
                Enter Your Full Details
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                Selected Track: <strong style={{ color: '#c084fc' }}>{activeDomainInfo.label}</strong>
              </p>
            </div>

            {formError && (
              <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '12px', color: '#fca5a5', fontSize: '13.5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⚠️</span>
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleStartTest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gokul Prasath"
                  value={candidate.name}
                  onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="gokul.prasath@example.com"
                    value={candidate.email}
                    onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={candidate.phone}
                    onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  College / Institute / University *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Government College of Technology / Anna University"
                  value={candidate.college}
                  onChange={(e) => setCandidate({ ...candidate, college: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Branch / Major *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mechanical / Civil / CSE / EEE"
                    value={candidate.department}
                    onChange={(e) => setCandidate({ ...candidate, department: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Academic Year / Status *
                  </label>
                  <select
                    value={candidate.year}
                    onChange={(e) => setCandidate({ ...candidate, year: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', colorScheme: 'dark' }}
                  >
                    <option value="1st Year">1st Year Student</option>
                    <option value="2nd Year">2nd Year Student</option>
                    <option value="3rd Year">3rd Year Student</option>
                    <option value="Final Year">Final Year Student</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)'
                  }}
                >
                  Start Assessment Now ({activeQuestions.length} Questions) →
                </button>
                <button
                  type="button"
                  onClick={() => setStep('select_domain')}
                  style={{ padding: '15px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', borderRadius: '12px', fontSize: '14px', cursor: 'pointer' }}
                >
                  Change Track
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  🔒 Your details and scores are securely stored in the GV DesignTech Admin Registry.
                </span>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            STEP 3: LIVE ACTIVE ASSESSMENT SCREEN
            ======================================================== */}
        {step === 'test_active' && activeQuestions.length > 0 && (
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '36px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.85), rgba(6, 6, 24, 0.95))', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '24px', boxShadow: '0 24px 60px rgba(0,0,0,0.8)' }}>
            
            {/* Top Bar with Candidate Badge & Question Counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#22d3ee', padding: '4px 10px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '8px' }}>
                  QUESTION {currentQ + 1} OF {activeQuestions.length}
                </span>
                <span style={{ fontSize: '12px', color: '#c084fc', padding: '4px 10px', background: 'rgba(192, 132, 252, 0.12)', borderRadius: '8px', fontWeight: '700' }}>
                  {activeDomainInfo.label}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: '#cbd5e1', padding: '4px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px' }}>
                👤 Candidate: <strong style={{ color: '#fff' }}>{candidate.name}</strong>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden', marginBottom: '28px' }}>
              <div
                style={{
                  width: `${((currentQ + 1) / activeQuestions.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            {/* Question Text */}
            <h3 style={{ fontSize: '20px', fontWeight: '700', lineHeight: 1.45, marginBottom: '24px', color: '#fff' }}>
              {activeQuestions[currentQ].question || activeQuestions[currentQ].q}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {(activeQuestions[currentQ].options || []).map((opt, oIdx) => {
                const isSelected = selectedAns[currentQ] === oIdx;

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(oIdx)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: isSelected ? '#d946ef' : 'rgba(255,255,255,0.12)',
                      background: isSelected ? 'rgba(217, 70, 239, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: isSelected ? '600' : '400',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.15s'
                    }}
                  >
                    <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: isSelected ? '#d946ef' : 'rgba(255,255,255,0.08)', color: isSelected ? '#fff' : '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span style={{ flex: 1, color: isSelected ? '#fff' : '#cbd5e1' }}>
                      {opt}
                    </span>
                    {isSelected && (
                      <span style={{ color: '#d946ef', fontSize: '16px' }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Quit this assessment? Current answers will not be saved.')) {
                    resetAll();
                  }
                }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}
              >
                Quit Assessment
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={selectedAns[currentQ] === undefined}
                style={{
                  padding: '13px 36px',
                  background: selectedAns[currentQ] !== undefined
                    ? 'linear-gradient(135deg, #8b5cf6, #d946ef)'
                    : 'rgba(255,255,255,0.08)',
                  border: 'none',
                  borderRadius: '12px',
                  color: selectedAns[currentQ] !== undefined ? '#fff' : 'rgba(255,255,255,0.3)',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: selectedAns[currentQ] !== undefined ? 'pointer' : 'not-allowed',
                  boxShadow: selectedAns[currentQ] !== undefined ? '0 8px 24px rgba(217, 70, 239, 0.35)' : 'none'
                }}
              >
                {currentQ === activeQuestions.length - 1 ? 'Finish & Submit Score →' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: ASSESSMENT COMPLETED & SCORE STORED
            ======================================================== */}
        {step === 'finished' && finalResult && (
          <div style={{ maxWidth: '640px', margin: '0 auto', padding: '44px 36px', textAlign: 'center', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.9), rgba(6, 6, 24, 0.95))', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '24px', boxShadow: '0 24px 60px rgba(0,0,0,0.85)' }}>
            <div style={{ fontSize: '54px', marginBottom: '16px' }}>🏆</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.35)', borderRadius: '999px', fontSize: '12px', fontWeight: '700', color: '#34d399', marginBottom: '12px' }}>
              <span>✓</span> SCORE PERMANENTLY RECORDED IN ADMIN PANEL
            </div>
            
            <h2 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>
              Congratulations, {finalResult.studentName}!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px' }}>
              Your technical assessment for <strong style={{ color: '#c084fc' }}>{finalResult.domainLabel}</strong> is complete.
            </p>

            {/* Score Highlight Box */}
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '18px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Assessment Score
              </div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: finalResult.percentage >= 60 ? '#34d399' : '#38bdf8' }}>
                {finalResult.score} <span style={{ fontSize: '24px', color: '#94a3b8' }}>/ {finalResult.totalQuestions}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#c084fc', marginTop: '4px' }}>
                {finalResult.percentage}% Accuracy
              </div>
            </div>

            {/* Performance Feedback */}
            <p style={{ fontSize: '14.5px', color: finalResult.percentage >= 60 ? '#34d399' : '#fbbf24', background: finalResult.percentage >= 60 ? 'rgba(52, 211, 153, 0.12)' : 'rgba(251, 191, 36, 0.12)', border: finalResult.percentage >= 60 ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(251, 191, 36, 0.3)', padding: '14px', borderRadius: '12px', marginBottom: '32px' }}>
              {finalResult.percentage >= 75
                ? '🎉 Outstanding! You qualify for GV DesignTech Advanced Placement fast-tracking and verified scholarship eligibility!'
                : finalResult.percentage >= 60
                ? '✅ Benchmark Passed! You have demonstrated good foundational technical aptitude.'
                : '📚 Good attempt! Explore our specialized modules to strengthen your core design proficiency.'}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={resetAll}
                style={{ padding: '13px 28px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
              >
                Take Another Assessment
              </button>
              <Link
                to="/Contactus"
                style={{ padding: '13px 24px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#cbd5e1', fontSize: '15px', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                Consult an Advisor →
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
