import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '24px', color: '#fff' }}>
      <div style={{ width: '100%', maxWidth: '440px', padding: '40px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.9), rgba(6, 6, 24, 0.95))', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <img alt="GV DesignTech" src="/assets/gv-logo.png" style={{ height: '36px' }} />
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>GV DesignTech</span>
          </Link>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '16px', marginBottom: '6px' }}>Student Registration</h2>
          <p style={{ color: '#475569', fontSize: '13.5px', margin: 0 }}>Create your GV DesignTech account</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Thiruvenkatesh"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              required
              placeholder="thiru@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Phone Number</label>
            <input
              type="tel"
              required
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Create Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.3)', color: '#fff', fontSize: '14.5px', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }}
          >
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13.5px', color: '#475569' }}>
          Already registered?{' '}
          <Link to="/Login" style={{ color: '#d946ef', fontWeight: '600', textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
