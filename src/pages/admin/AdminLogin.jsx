import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect straight to dashboard
    const token = localStorage.getItem('gv_admin_token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both administrative email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Validate credentials (accepts admin@gvdesigntech.com or admin with password admin2026 / admin123)
      const validEmail = email.trim().toLowerCase() === 'admin@gvdesigntech.com' || email.trim().toLowerCase() === 'admin';
      const validPass = password.trim() === 'admin2026' || password.trim() === 'admin123';

      if (validEmail && validPass) {
        localStorage.setItem('gv_admin_token', 'gv_session_' + Date.now());
        localStorage.setItem('gv_admin_user', JSON.stringify({
          name: 'Chief Admin Officer',
          email: 'admin@gvdesigntech.com',
          role: 'Super Administrator'
        }));
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Invalid credentials. Use admin@gvdesigntech.com / admin2026');
        setLoading(false);
      }
    }, 600);
  };

  const fillDemoCreds = () => {
    setEmail('admin@gvdesigntech.com');
    setPassword('admin2026');
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#04020a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow ambient effects */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', top: '10%', left: '15%', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, transparent 70%)', bottom: '10%', right: '15%', pointerEvents: 'none' }}></div>

      <div style={{ width: '100%', maxWidth: '440px', background: 'linear-gradient(160deg, rgba(24, 18, 52, 0.85), rgba(7, 7, 24, 0.95))', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)', position: 'relative', zIndex: 1, backdropFilter: 'blur(16px)' }}>
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 0 24px rgba(217, 70, 239, 0.4)' }}>
            ⚙️
          </div>
          <div style={{ display: 'inline-block', padding: '3px 12px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '999px', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', color: '#f472b6', marginBottom: '10px' }}>
            GV DESIGNTECH ADMIN PORTAL
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 8px', color: '#fff' }}>
            Administrator Sign In
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Enter your authorized management credentials
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '12px', color: '#fca5a5', fontSize: '13.5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
              Admin Email / Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gvdesigntech.com"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
              autoComplete="username"
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: '#c084fc', fontSize: '12px', cursor: 'pointer' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: '12px', color: '#fff', fontSize: '14.5px', outline: 'none', boxSizing: 'border-box' }}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal →'}
          </button>
        </form>

        {/* Quick Demo Fill Helper */}
        <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={fillDemoCreds}
            style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', padding: '6px 14px', color: '#c084fc', fontSize: '12.5px', cursor: 'pointer', fontWeight: '600' }}
          >
            ⚡ Click to Auto-Fill Admin Credentials
          </button>
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
