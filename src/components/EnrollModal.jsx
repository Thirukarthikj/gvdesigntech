import React, { useState, useEffect } from 'react';
import { modalStyles } from '../data/styles.js';
import { syncToFirestore } from '../services/firebase.js';
import { getStoredSiteConfig, getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export const STANDARD_DISCIPLINES = [
  'Mechanical & Automobile',
  'Civil Engineering & BIM',
  'CNC Programming & CAM',
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

export default function EnrollModal({ isOpen, onClose, initialProgram = '' }) {
  const [siteConfig, setSiteConfig] = useState(() => getStoredSiteConfig());
  const [courses, setCourses] = useState(() => getStoredCourses());
  const modalConfig = siteConfig.enrollModal || {};
  const publishedCourses = (courses || []).filter(c => c && (c.title || c.department));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: initialProgram || '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const offerTotalSeconds = (modalConfig.offerMinutes ? modalConfig.offerMinutes * 60 : 120);
  const [secondsLeft, setSecondsLeft] = useState(offerTotalSeconds);

  useEffect(() => {
    return subscribeToContentUpdates(() => {
      setSiteConfig(getStoredSiteConfig());
      setCourses(getStoredCourses());
    });
  }, []);

  // Sync initialProgram whenever modal opens or program prop changes
  useEffect(() => {
    if (isOpen) {
      if (initialProgram) {
        const raw = (typeof initialProgram === 'string' ? initialProgram : '').trim();
        const trimmed = raw.toLowerCase();

        // 1. Try match in published dynamic courses from MongoDB
        const matchedCourse = publishedCourses.find(c =>
          (c.title && c.title.toLowerCase().trim() === trimmed) ||
          (c.department && c.department.toLowerCase().trim() === trimmed) ||
          (c.title && c.title.toLowerCase().includes(trimmed)) ||
          (trimmed.length >= 3 && (c.title || '').toLowerCase().includes(trimmed)) ||
          (trimmed.length >= 3 && trimmed.includes((c.title || '').toLowerCase()))
        );

        // 2. Try match in standard disciplines
        const matchedDiscipline = STANDARD_DISCIPLINES.find(d =>
          d.toLowerCase().trim() === trimmed ||
          (trimmed.length >= 3 && d.toLowerCase().includes(trimmed)) ||
          (trimmed.length >= 3 && trimmed.includes(d.toLowerCase()))
        );

        // 3. Try match in internships
        const matchedInternship = INTERNSHIP_PROGRAMS.find(p =>
          p.toLowerCase().trim() === trimmed ||
          (trimmed.length >= 3 && p.toLowerCase().includes(trimmed)) ||
          (trimmed.length >= 3 && trimmed.includes(p.toLowerCase()))
        );

        const resolved = matchedCourse
          ? (matchedCourse.title || matchedCourse.department)
          : (matchedInternship || matchedDiscipline || raw);

        setFormData(prev => ({
          ...prev,
          program: resolved,
          message: prev.message && !prev.message.startsWith('Interested in enrolling for') ? prev.message : `Interested in enrolling for ${resolved}`
        }));
      }
    }
  }, [isOpen, initialProgram, courses]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Save lead to localStorage for Admin Portal in real time
    try {
      const existing = JSON.parse(localStorage.getItem('gv_admin_leads') || '[]');
      const newLead = {
        id: 'lead-' + Date.now(),
        name: `${formData.firstName} ${formData.lastName}`.trim() || 'Website Inquirer',
        email: formData.email || 'N/A',
        phone: formData.phone || 'N/A',
        college: 'Website Direct Inquirer',
        program: formData.program || 'Mechanical & Automobile CAD',
        message: formData.message || 'Submitted via Instant Enroll Modal',
        date: new Date().toISOString().split('T')[0],
        status: 'New'
      };
      const updated = [newLead, ...existing];
      localStorage.setItem('gv_admin_leads', JSON.stringify(updated));
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
                    placeholder="Enter first name"
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
                    placeholder="Enter last name"
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
                  placeholder="name@example.com"
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
                  onChange={handleChange}
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
                    !INTERNSHIP_PROGRAMS.includes(formData.program) && (
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

                  {/* 3. Industry Internship Programs */}
                  <optgroup label="💼 Industry Internship Programs">
                    {INTERNSHIP_PROGRAMS.map((title) => (
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
