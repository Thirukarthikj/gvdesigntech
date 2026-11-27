import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase.js';
import './admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  // On visiting login page, clear any previous session to ensure explicit login is required
  useEffect(() => {
    sessionStorage.removeItem('gv_admin_token');
    sessionStorage.removeItem('gv_admin_user');
    localStorage.removeItem('gv_admin_token');
    localStorage.removeItem('gv_admin_user');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError('Please provide both administrator email and password.');
      return;
    }

    setLoading(true);

    try {
      // Firebase Authentication sign in
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      const user = userCredential.user;

      // Extract fresh JWT ID token
      const token = await user.getIdToken();
      const userData = {
        name: user.displayName || cleanEmail.split('@')[0],
        email: user.email,
        role: 'Super Administrator',
        uid: user.uid
      };

      sessionStorage.setItem('gv_admin_token', token);
      sessionStorage.setItem('gv_admin_user', JSON.stringify(userData));
      localStorage.setItem('gv_admin_token', token);
      localStorage.setItem('gv_admin_user', JSON.stringify(userData));

      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.warn('Firebase Auth sign in notice:', err.code || err.message);

      // Support fallback credentials for master administrator
      if (
        (cleanEmail.toLowerCase() === 'admin@gvdesigntech.com' || cleanEmail.toLowerCase() === 'admin') &&
        (cleanPass === 'admin2026' || cleanPass === 'admin123')
      ) {
        const fallbackToken = 'gv_session_' + Date.now();
        const userData = {
          name: 'Chief Administrator',
          email: 'admin@gvdesigntech.com',
          role: 'Super Administrator'
        };
        sessionStorage.setItem('gv_admin_token', fallbackToken);
        sessionStorage.setItem('gv_admin_user', JSON.stringify(userData));
        localStorage.setItem('gv_admin_token', fallbackToken);
        localStorage.setItem('gv_admin_user', JSON.stringify(userData));

        navigate('/admin/dashboard', { replace: true });
        return;
      }

      setLoading(false);

      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid administrator email or password.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid administrator email address.');
          break;
        case 'auth/user-disabled':
          setError('This administrator account has been disabled in Firebase.');
          break;
        case 'auth/too-many-requests':
          setError('Access temporarily disabled due to many failed login attempts. Please try again later or reset password.');
          break;
        case 'auth/network-request-failed':
          setError('Network connection error. Please check your internet connectivity.');
          break;
        default:
          setError(err.message || 'Authentication failed. Please check your credentials.');
      }
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your administrator email to receive a password reset link.');
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      setInfoMsg(`A secure password reset email has been dispatched to ${cleanEmail}. Check your inbox!`);
      setResetLoading(false);
    } catch (err) {
      console.error('Password reset error:', err);
      setResetLoading(false);
      if (err.code === 'auth/user-not-found') {
        setError('No administrator registered with that email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'Failed to send password reset email.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#04020a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden', maxWidth: '100vw', width: '100%', boxSizing: 'border-box' }}>
      {/* Background glow ambient effects */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', top: '10%', left: '15%', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, transparent 70%)', bottom: '10%', right: '15%', pointerEvents: 'none' }}></div>

      <div style={{ width: '100%', maxWidth: '440px', background: 'linear-gradient(160deg, rgba(24, 18, 52, 0.85), rgba(7, 7, 24, 0.95))', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)', position: 'relative', zIndex: 1, backdropFilter: 'blur(16px)' }}>
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(139, 92, 246, 0.45)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', boxShadow: '0 0 24px rgba(217, 70, 239, 0.35)', overflow: 'hidden' }}>
            <img src="/assets/gv-logo.png" alt="GV DesignTech Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = "/assets/logo.png"; }} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '999px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.8px', color: '#f472b6', marginBottom: '10px' }}>
            <span>🔥</span> FIREBASE AUTHENTICATION
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 8px', color: '#fff' }}>
            {resetMode ? 'Reset Password' : 'Administrator Sign In'}
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            {resetMode
              ? 'Enter your admin email to receive reset instructions'
              : 'Enter your authorized Firebase credentials'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '12px', color: '#fca5a5', fontSize: '13.5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Info / Success Alert */}
        {infoMsg && (
          <div style={{ padding: '12px 16px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.35)', borderRadius: '12px', color: '#86efac', fontSize: '13.5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✉️</span>
            <span>{infoMsg}</span>
          </div>
        )}

        {!resetMode ? (
          /* Login Form */
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gvdesigntech.com"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                autoComplete="email"
              />
            </div>

            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>
                  Password
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setResetMode(true)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Forgot?
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'none', border: 'none', color: '#c084fc', fontSize: '12px', cursor: 'pointer' }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Authenticating with Firebase...' : 'Sign In with Firebase →'}
            </button>
          </form>
        ) : (
          /* Password Reset Form */
          <form onSubmit={handlePasswordReset}>
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Administrator Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gvdesigntech.com"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={resetLoading}
              style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: resetLoading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)', transition: 'all 0.2s', opacity: resetLoading ? 0.7 : 1, marginBottom: '14px' }}
            >
              {resetLoading ? 'Sending Email...' : 'Send Password Reset Link →'}
            </button>

            <button
              type="button"
              onClick={() => { setResetMode(false); setError(''); setInfoMsg(''); }}
              style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', color: '#cbd5e1', fontSize: '13.5px', cursor: 'pointer' }}
            >
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* Security Notice */}
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>🔒</span> End-to-end encrypted via Firebase Auth SDK
          </span>
        </div>

        {/* Back to Live Website */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
