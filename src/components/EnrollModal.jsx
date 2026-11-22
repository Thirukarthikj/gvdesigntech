import React, { useState, useEffect } from 'react';
import { modalStyles } from '../data/styles.js';

export default function EnrollModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(112); // ~1m 52s

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 120));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

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
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      sessionStorage.setItem('pybot_enrolled', 'true');
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
          <h2 className={s['em-title']}>Enroll Now</h2>
          <p className={s['em-subtitle']}>Start your journey with GV DesignTech</p>
        </div>

        <div className={s['em-offer']}>
          <div className={s['em-offer-badge']}>
            <strong>EMI</strong>
            <span>OFFER</span>
          </div>
          <div className={s['em-offer-body']}>
            <p className={s['em-offer-title']}>🪔 Instant Installment Offer</p>
            <p className={s['em-offer-sub']}>Diwali Special · Pay your course fee in installments</p>
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
                    placeholder="Gokul Prasath"
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
                    placeholder="Doe"
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
                  placeholder="gokul@example.com"
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
                >
                  <option value="">Choose your program…</option>
                  <option value="Python for Beginners">Python for Beginners</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Full Stack Development">Full Stack Development</option>
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
              <span className={s['em-submit-text']}>Join Us</span>
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
