import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import './admin.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: 'Admin', role: 'Super Admin' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem('gv_admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('gv_admin_user') || '{}');
      if (user.name) setAdminUser(user);
    } catch {
      // ignore
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('gv_admin_token');
    localStorage.removeItem('gv_admin_user');
    navigate('/admin/login', { replace: true });
  };

  const navSections = [
    {
      title: 'OPERATIONS',
      items: [
        { to: '/admin/dashboard', icon: '📊', label: 'Overview' },
        { to: '/admin/enrollments', icon: '📝', label: 'Inquiries & Leads' },
        { to: '/admin/courses', icon: '🎓', label: 'Courses & Batches' },
        { to: '/admin/internships', icon: '💼', label: 'Internship Applicants' }
      ]
    },
    {
      title: 'CONTENT & PAGES',
      items: [
        { to: '/admin/content-leaders', icon: '👑', label: 'Leadership & Founders' },
        { to: '/admin/content-mou', icon: '🏛️', label: 'Manage MOUs' },
        { to: '/admin/content-gallery', icon: '📸', label: 'Manage Gallery' },
        { to: '/admin/content-placement', icon: '🎯', label: 'Manage Placements' },
        { to: '/admin/content-blog', icon: '📰', label: 'Manage Blogs' },
        { to: '/admin/content-certificates', icon: '📜', label: 'Certificate Registry' }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { to: '/admin/settings', icon: '⚙️', label: 'Portal Settings' }
      ]
    }
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('enrollments')) return 'Student Inquiries & Admissions';
    if (path.includes('courses')) return 'Course Cohorts & Batch Management';
    if (path.includes('internships')) return 'Internship Applications';
    if (path.includes('content-leaders')) return 'Leadership & Executive Profiles';
    if (path.includes('content-mou') || path.includes('partners')) return 'MOU & Institutional Partnerships';
    if (path.includes('content-gallery')) return 'Campus Gallery & Infrastructure Photos';
    if (path.includes('content-placement')) return 'Placements, Hiring Partners & Student Stories';
    if (path.includes('content-blog')) return 'Technical Articles & Knowledge Insights';
    if (path.includes('content-certificates')) return 'Official Certificate Registry & Validation';
    if (path.includes('settings')) return 'Portal Administration & Settings';
    return 'Executive CAD Operations Dashboard';
  };

  return (
    <div className="admin-shell">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" className="admin-brand" onClick={() => setSidebarOpen(false)}>
            <div className="admin-brand-icon">⚡</div>
            <div>
              <div className="admin-brand-title">GV DesignTech</div>
              <span className="admin-brand-badge">ADMIN PORTAL</span>
            </div>
          </Link>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="admin-nav">
          {navSections.map((sec, secIdx) => (
            <div key={secIdx} style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '1px',
                color: '#64748b',
                padding: '0 16px',
                marginBottom: '8px'
              }}>
                {sec.title}
              </div>
              {sec.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="admin-live-link">
            <span>🌐 View Live Website</span>
            <span>↗</span>
          </Link>

          <button type="button" onClick={handleLogout} className="admin-logout-btn">
            <span>🚪 Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Body Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="admin-header-title-wrap">
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              ☰
            </button>
            <div className="admin-header-text">
              <h2 className="admin-header-title" title={getPageTitle()}>{getPageTitle()}</h2>
              <div className="admin-header-sub">GV DesignTech CAD / CAM / CAE Management Center</div>
            </div>
          </div>

          <div className="admin-header-actions">
            <div className="admin-status-indicator" title="System Live">
              <span className="admin-status-dot"></span>
              <span className="admin-status-text">System Live</span>
            </div>
          </div>
        </header>

        {/* Child Views */}
        <main className="admin-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
