import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/');
    } else {
      setError('Please provide valid credentials.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050816', padding: '24px', color: '#fff' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '40px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.9), rgba(6, 6, 24, 0.95))', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <img alt="PyBot" src="/assets/logo-0m0vxTot.png" style={{ height: '36px' }} />
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>PyBot</span>
          </Link>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '16px', marginBottom: '6px' }}>Student Login</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13.5px', margin: 0 }}>Access your training portal and live labs</p>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#fca5a5', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              required
              placeholder="student@pybot.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}
          >
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13.5px', color: 'rgba(255,255,255,0.6)' }}>
          Don't have an account?{' '}
          <Link to="/Register" style={{ color: '#d946ef', fontWeight: '600', textDecoration: 'none' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
