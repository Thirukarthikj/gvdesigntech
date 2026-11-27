import React, { useState, useEffect } from 'react';
import { modalStyles } from '../data/styles.js';
import { syncToFirestore } from '../services/firebase.js';
import {
  getStoredSiteConfig,
  getStoredCourses,
  getStoredInternshipPrograms,
  saveStoredInternshipApplicant,
  subscribeToContentUpdates
} from '../data/contentPersistence.js';

export const STANDARD_DISCIPLINES = [
  'Mechanical & Automobile CAD',
  'Civil BIM & Architectural Drafting',
  'CNC Programming & CAM',
  'Mechanical & Automobile',
  'Civil Engineering & BIM',
  'Computer Science & IT',
  'EEE & Automation',
  'ECE Embedded & IoT',
  'Piping Engineering (Oil & Gas)',
  'Robotics & Automation',
  'AI & Data Science'
];

export const INTERNSHIP_PROGRAMS = [
  'AI & Artificial Intelligence Internship',
  'Data Science & Analytics Internship',
  'Machine Learning & Deep Learning Internship',
  'Summer Internship for Engineering Students',
  'College In-Plant Internship Training',
  'Full Stack Software Development Internship',
  'Mechanical CAD / CAE Industrial Internship',
  'Civil BIM & Structural Detailing Internship',
  'Embedded Systems & IoT Internship',
  'Industrial Internship Program'
];

export const STANDARD_COURSES = STANDARD_DISCIPLINES;

function inferDepartment(program = '') {
  const p = (program || '').toLowerCase();
  if (p.includes('ai') || p.includes('artificial')) return 'AI & Data Science';
  if (p.includes('data')) return 'Data Science & Analytics';
  if (p.includes('machine learning')) return 'AI & Machine Learning';
  if (p.includes('mechanical') || p.includes('cad') || p.includes('cae')) return 'Mechanical Engineering';
  if (p.includes('civil') || p.includes('bim')) return 'Civil Engineering';
  if (p.includes('iot') || p.includes('embedded') || p.includes('ece')) return 'ECE / Embedded Systems';
  if (p.includes('cnc')) return 'Manufacturing / CNC';
  if (p.includes('cloud') || p.includes('software') || p.includes('full stack')) return 'Computer Science & IT';
  return 'Engineering Department';
}

export default function EnrollModal({ isOpen, onClose, initialProgram = '' }) {
  const [siteConfig, setSiteConfig] = useState(() => getStoredSiteConfig());
  const [courses, setCourses] = useState(() => getStoredCourses());
  const [internshipPrograms, setInternshipPrograms] = useState(() => getStoredInternshipPrograms());
  const modalConfig = siteConfig.enrollModal || {};
  const publishedCourses = (courses || []).filter(c => c && (c.title || c.department));

  const dynamicInternships = (internshipPrograms || []).map(p => p.subtitle || p.title).filter(Boolean);
  const allInternshipOptions = Array.from(new Set([...dynamicInternships, ...INTERNSHIP_PROGRAMS]));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: typeof initialProgram === 'object' ? (initialProgram.title || initialProgram.courseName || initialProgram.program || '') : (initialProgram || ''),
    courseId: typeof initialProgram === 'object' ? (initialProgram.id || initialProgram._id || initialProgram.courseId || '') : '',
    courseName: typeof initialProgram === 'object' ? (initialProgram.title || initialProgram.courseName || initialProgram.program || '') : (typeof initialProgram === 'string' ? initialProgram : ''),
    college: '',
    department: '',
    cgpa: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const offerTotalSeconds = (modalConfig.offerMinutes ? modalConfig.offerMinutes * 60 : 120);
  const [secondsLeft, setSecondsLeft] = useState(offerTotalSeconds);

  useEffect(() => {
    return subscribeToContentUpdates(() => {
      setSiteConfig(getStoredSiteConfig());
      setCourses(getStoredCourses());
      setInternshipPrograms(getStoredInternshipPrograms());
    });
  }, []);

  // Sync initialProgram whenever modal opens or program prop changes
  useEffect(() => {
    if (isOpen) {
      let targetId = '';
      let rawTitle = '';
      let toolsList = [];
      let cardDesc = '';

      if (typeof initialProgram === 'string' && initialProgram.trim()) {
        rawTitle = initialProgram.trim();
      } else if (initialProgram && typeof initialProgram === 'object') {
        targetId = String(initialProgram.id || initialProgram._id || initialProgram.courseId || '').trim();
        rawTitle = (initialProgram.title || initialProgram.courseName || initialProgram.program || initialProgram.department || '').trim();
        if (Array.isArray(initialProgram.tools)) {
          toolsList = initialProgram.tools;
        } else if (typeof initialProgram.tools === 'string') {
          toolsList = initialProgram.tools.split(',');
        }
        cardDesc = initialProgram.desc || '';
      }

      const trimmed = rawTitle.toLowerCase();

      // 1. Try match by exact course ID in published courses
      let matchedCourse = null;
      if (targetId) {
        matchedCourse = publishedCourses.find(c =>
          (c.id && String(c.id).trim() === targetId) ||
          (c._id && String(c._id).trim() === targetId)
        );
      }

      // 2. Try match by exact course title (case-insensitive)
      if (!matchedCourse && trimmed) {
        matchedCourse = publishedCourses.find(c =>
          c.title && c.title.toLowerCase().trim() === trimmed
        );
      }

      // 3. Try match by exact department if no exact title matched
      if (!matchedCourse && trimmed) {
        matchedCourse = publishedCourses.find(c =>
          c.department && c.department.toLowerCase().trim() === trimmed
        );
      }

      // 4. Try match in standard disciplines (prefer exact match first)
      const matchedDiscipline = trimmed
        ? STANDARD_DISCIPLINES.find(d => d.toLowerCase().trim() === trimmed)
        : null;

      // 5. Try match in internships (both dynamic and static)
      const matchedInternship = trimmed
        ? allInternshipOptions.find(p => p.toLowerCase().trim() === trimmed)
        : null;

      const resolvedTitle = matchedCourse
        ? (matchedCourse.title || matchedCourse.department)
        : (matchedDiscipline || matchedInternship || rawTitle);

      const resolvedId = matchedCourse
        ? (matchedCourse.id || matchedCourse._id || targetId || '')
        : targetId;

      const resolvedTools = (matchedCourse && matchedCourse.tools)
        ? (Array.isArray(matchedCourse.tools) ? matchedCourse.tools : String(matchedCourse.tools).split(','))
        : toolsList;

      const resolvedDesc = (matchedCourse && matchedCourse.desc) ? matchedCourse.desc : cardDesc;

      const inferredDept = inferDepartment(resolvedTitle);

      let defaultMessage = resolvedTitle ? `Interested in enrolling for ${resolvedTitle}` : '';
      if (resolvedTools.length > 0) {
        const toolsStr = resolvedTools.map(t => String(t).trim()).filter(Boolean).join(', ');
        defaultMessage += ` (Focused Tools: ${toolsStr})`;
      } else if (resolvedDesc) {
        defaultMessage += ` (${resolvedDesc})`;
      }

      if (resolvedTitle || resolvedId) {
        setFormData(prev => ({
          ...prev,
          program: resolvedTitle || prev.program,
          courseName: resolvedTitle || prev.courseName,
          courseId: resolvedId || prev.courseId,
          department: prev.department || inferredDept,
          message: prev.message && !prev.message.startsWith('Interested in enrolling for')
            ? prev.message
            : (defaultMessage || prev.message)
        }));
      }

      // 6. Dynamically fetch the latest course details from MongoDB using course ID (or title)
      const fetchTarget = targetId || (rawTitle ? encodeURIComponent(rawTitle) : '');
      if (fetchTarget) {
        fetch(`/api/courses/${fetchTarget}`)
          .then(r => r.ok ? r.json() : null)
          .then(dbCourse => {
            if (dbCourse && (dbCourse.title || dbCourse.department)) {
              const exactTitle = dbCourse.title || dbCourse.department;
              const exactId = dbCourse.id || dbCourse._id || targetId;
              const dbTools = dbCourse.tools ? (Array.isArray(dbCourse.tools) ? dbCourse.tools : String(dbCourse.tools).split(',')) : [];
              let dynamicMsg = `Interested in enrolling for ${exactTitle}`;
              if (dbTools.length > 0) {
                const toolsStr = dbTools.map(t => String(t).trim()).filter(Boolean).join(', ');
                dynamicMsg += ` (Focused Tools: ${toolsStr})`;
              } else if (dbCourse.desc) {
                dynamicMsg += ` (${dbCourse.desc})`;
              }

              setFormData(prev => ({
                ...prev,
                program: exactTitle,
                courseName: exactTitle,
                courseId: exactId,
                department: prev.department || inferDepartment(exactTitle),
                message: prev.message && !prev.message.startsWith('Interested in enrolling for')
                  ? prev.message
                  : dynamicMsg
              }));
            }
          })
          .catch(() => {});
      }
    }
  }, [isOpen, initialProgram, courses, internshipPrograms]);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(offerTotalSeconds);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : offerTotalSeconds));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, offerTotalSeconds]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  const progressPercent = Math.max(10, Math.min(100, (secondsLeft / 120) * 100));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramSelectChange = (e) => {
    const selectedVal = e.target.value;
    const trimmedVal = selectedVal.toLowerCase().trim();

    const matched = publishedCourses.find(c =>
      (c.title && c.title.toLowerCase().trim() === trimmedVal) ||
      (c.department && c.department.toLowerCase().trim() === trimmedVal)
    );

    const cId = matched ? (matched.id || matched._id || '') : '';
    const cTitle = matched ? (matched.title || matched.department) : selectedVal;
    const inferred = inferDepartment(cTitle);

    setFormData(prev => ({
      ...prev,
      program: selectedVal,
      courseName: cTitle,
      courseId: cId,
      department: inferred,
      message: prev.message && !prev.message.startsWith('Interested in enrolling for')
        ? prev.message
        : (selectedVal ? `Interested in enrolling for ${selectedVal}` : '')
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Website Inquirer';
    const prog = (formData.program || '').toLowerCase();
    const isInternship =
      prog.includes('internship') ||
      (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('internship'));

    // 1. If applying for Internship, save directly into Student Applicants Pipeline
    if (isInternship) {
      try {
        const applicantRecord = {
          id: 'intern-' + Date.now(),
          candidateName: fullName,
          email: formData.email || '',
          phone: formData.phone || '',
          college: formData.college?.trim() || 'Engineering College / University',
          department: formData.department?.trim() || inferDepartment(formData.program),
          cgpa: formData.cgpa?.trim() || '8.5',
          internshipProgram: formData.program || 'Industrial Internship Program',
          appliedDate: new Date().toISOString().split('T')[0],
          status: 'Under Review'
        };
        saveStoredInternshipApplicant(applicantRecord);
      } catch (err) {
        console.warn('Error persisting internship applicant:', err);
      }
    }

    // 2. Also save lead to inquiries registry
    try {
      const existing = JSON.parse(localStorage.getItem('gv_admin_leads') || '[]');
      const newLead = {
        id: 'lead-' + Date.now(),
        name: fullName,
        email: formData.email || 'N/A',
        phone: formData.phone || 'N/A',
        college: formData.college?.trim() || 'Website Direct Inquirer',
        program: formData.program || 'Mechanical & Automobile CAD',
        courseId: formData.courseId || '',
        courseName: formData.courseName || formData.program || '',
        department: formData.department || inferDepartment(formData.program),
        message: formData.message || (isInternship ? `Applied for ${formData.program}` : 'Submitted via Instant Enroll Modal'),
        date: new Date().toISOString().split('T')[0],
        status: 'New'
      };
      const updated = [newLead, ...existing];
      localStorage.setItem('gv_admin_leads', JSON.stringify(updated));
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch(() => {});
      syncToFirestore('leads', updated);
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      sessionStorage.setItem('gv_enrolled', 'true');
    }, 2000);
  };

  const s = modalStyles;
  const isInternshipSelected = Boolean(
    (formData.program && formData.program.toLowerCase().includes('internship')) ||
    (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('internship'))
  );

  return (
    <div className={`${s['em-backdrop']} ${s['em-backdrop-in']}`} onClick={onClose}>
      <div className={`${s['em-modal']} ${s['em-modal-in']}`} onClick={(e) => e.stopPropagation()}>
        <button className={s['em-close']} aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={s['em-header']}>
          <h2 className={s['em-title']}>{modalConfig.title || 'Enroll Now'}</h2>
          <p className={s['em-subtitle']}>{modalConfig.subtitle || 'Start your journey with GV DesignTech'}</p>
        </div>

        {modalConfig.showOffer !== false && (
          <div className={s['em-offer']}>
            <div className={s['em-offer-badge']} style={{ overflow: 'hidden', padding: 0 }}>
              {modalConfig.offerBadgeImage ? (
                <img
                  src={modalConfig.offerBadgeImage}
                  alt="Offer Badge"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <strong>{modalConfig.offerBadgeText || 'EMI'}</strong>
                  <span>{modalConfig.offerBadgeSub || 'OFFER'}</span>
                </div>
              )}
            </div>
            <div className={s['em-offer-body']}>
              <p className={s['em-offer-title']}>{modalConfig.offerTitle || '🪔 Instant Installment Offer'}</p>
              <p className={s['em-offer-sub']}>{modalConfig.offerSub || 'Diwali Special · Pay your course fee in installments'}</p>
            </div>
            <div className={s['em-offer-timer']} role="timer" aria-label="Offer time remaining">
              <span className={s['em-offer-box']}>
                <b>{minutes}</b>
                <i>MIN</i>
              </span>
              <span className={s['em-offer-colon']}>:</span>
              <span className={s['em-offer-box']}>
                <b>{seconds}</b>
                <i>SEC</i>
              </span>
            </div>
            <div className={s['em-offer-bar']}>
              <span style={{ width: `${progressPercent}%` }}></span>
            </div>
          </div>
        )}

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#fff' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#39d0ff' }}>
              Application Received!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
              Thank you, {formData.firstName}! Our academic counselor will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form className={s['em-form']} onSubmit={handleSubmit}>
            <div className={s['em-row']}>
              <div className={`${s['em-field']} ${s['em-field-1']}`}>
                <label className={s['em-label']}>First Name</label>
                <div className={s['em-input-wrap']}>
                  <input
                    className={s['em-input']}
                    placeholder="Gokul"
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <div className={s['em-input-line']}></div>
                </div>
              </div>
              <div className={`${s['em-field']} ${s['em-field-2']}`}>
                <label className={s['em-label']}>Last Name</label>
                <div className={s['em-input-wrap']}>
                  <input
                    className={s['em-input']}
                    placeholder="Prasath"
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <div className={s['em-input-line']}></div>
                </div>
              </div>
            </div>

            <div className={`${s['em-field']} ${s['em-field-3']}`}>
              <label className={s['em-label']}>Email</label>
              <div className={s['em-input-wrap']}>
                <input
                  className={s['em-input']}
                  placeholder="gokul.prasath@example.com"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className={s['em-input-line']}></div>
              </div>
            </div>

            <div className={`${s['em-field']} ${s['em-field-4']}`}>
              <label className={s['em-label']}>Phone Number</label>
              <div className={s['em-input-wrap']}>
                <input
                  className={s['em-input']}
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  placeholder="9876543210"
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div className={s['em-input-line']}></div>
              </div>
            </div>

            <div className={`${s['em-field']} ${s['em-field-5']}`}>
              <label className={s['em-label']}>Select a Program</label>
              <div className={s['em-select-wrap']}>
                <select
                  className={s['em-select']}
                  name="program"
                  required
                  value={formData.program}
                  onChange={handleProgramSelectChange}
                  style={{
                    colorScheme: 'dark',
                    backgroundColor: 'rgba(15, 17, 35, 0.95)',
                    color: '#ffffff'
                  }}
                >
                  <option value="" style={{ backgroundColor: '#0f1123', color: '#94a3b8' }}>Choose your program…</option>

                  {/* Render active custom or dynamic selection on top if not in static lists */}
                  {formData.program &&
                    !publishedCourses.some(c => (c.title === formData.program || c.department === formData.program)) &&
                    !STANDARD_DISCIPLINES.includes(formData.program) &&
                    !allInternshipOptions.includes(formData.program) && (
                      <option value={formData.program} style={{ backgroundColor: '#0f1123', color: '#38bdf8', fontWeight: '700' }}>
                        {formData.program} (Selected)
                      </option>
                  )}

                  {/* 1. Dynamic Courses Published from MongoDB / Admin Panel */}
                  {publishedCourses.length > 0 && (
                    <optgroup label="🌟 Published Training Courses">
                      {publishedCourses.map((c) => (
                        <option key={c.id || c._id || c.title} value={c.title || c.department} style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>
                          {c.title || c.department}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {/* 2. Core Engineering Disciplines */}
                  <optgroup label="🎓 Engineering Disciplines &amp; Departments">
                    {STANDARD_DISCIPLINES.map((dept) => (
                      <option key={dept} value={dept} style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>
                        {dept}
                      </option>
                    ))}
                  </optgroup>

                  {/* 3. Industry Internship Programs (Dynamic from Admin & Catalog) */}
                  <optgroup label="💼 Industry Internship Programs">
                    {allInternshipOptions.map((title) => (
                      <option key={title} value={title} style={{ backgroundColor: '#0f1123', color: '#ffffff' }}>
                        {title}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <div className={s['em-select-arrow']}>
                  <svg viewBox="0 0 12 8" fill="none">
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className={s['em-input-line']}></div>
              </div>
            </div>

            {isInternshipSelected && (
              <>
                <div className={s['em-row']}>
                  <div className={`${s['em-field']} ${s['em-field-1']}`}>
                    <label className={s['em-label']}>College / University</label>
                    <div className={s['em-input-wrap']}>
                      <input
                        className={s['em-input']}
                        placeholder="e.g. MCET Pollachi / PSG Tech"
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                      />
                      <div className={s['em-input-line']}></div>
                    </div>
                  </div>
                  <div className={`${s['em-field']} ${s['em-field-2']}`}>
                    <label className={s['em-label']}>Department / Branch</label>
                    <div className={s['em-input-wrap']}>
                      <input
                        className={s['em-input']}
                        placeholder="e.g. Mechanical / CSE / EEE"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      />
                      <div className={s['em-input-line']}></div>
                    </div>
                  </div>
                </div>

                <div className={s['em-field']}>
                  <label className={s['em-label']}>Academic CGPA / Percentage (Optional)</label>
                  <div className={s['em-input-wrap']}>
                    <input
                      className={s['em-input']}
                      placeholder="e.g. 8.5"
                      type="text"
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleChange}
                    />
                    <div className={s['em-input-line']}></div>
                  </div>
                </div>
              </>
            )}

            <div className={`${s['em-field']} ${s['em-field-6']}`}>
              <label className={s['em-label']}>Additional Message</label>
              <div className={s['em-input-wrap']}>
                <textarea
                  className={`${s['em-input']} ${s['em-textarea']}`}
                  name="message"
                  placeholder="Tell us about your goals…"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <div className={s['em-input-line']}></div>
              </div>
            </div>

            <button type="submit" className={`${s['em-field']} ${s['em-field-7']} ${s['em-submit']}`}>
              <span className={s['em-submit-text']}>{modalConfig.buttonText || 'Join Us'}</span>
              <span className={s['em-submit-shine']}></span>
              <svg className={s['em-submit-icon']} viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
