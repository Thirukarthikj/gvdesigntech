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

  const navItems = [
    { to: '/admin/dashboard', icon: '📊', label: 'Overview' },
    { to: '/admin/enrollments', icon: '📝', label: 'Inquiries & Leads' },
    { to: '/admin/courses', icon: '🎓', label: 'Courses & Batches' },
    { to: '/admin/internships', icon: '💼', label: 'Internship Applicants' },
    { to: '/admin/partners', icon: '🤝', label: 'MOU & Placements' },
    { to: '/admin/settings', icon: '⚙️', label: 'Settings' }
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('enrollments')) return 'Student Inquiries & Admissions';
    if (path.includes('courses')) return 'Course Cohorts & Batch Management';
    if (path.includes('internships')) return 'Internship Applications';
    if (path.includes('partners')) return 'MOU & Placement Corporate Partners';
    if (path.includes('settings')) return 'Portal Administration & Settings';
    return 'Executive CAD Operations Dashboard';
  };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" className="admin-brand">
            <div className="admin-brand-icon">⚡</div>
            <div>
              <div className="admin-brand-title">GV DesignTech</div>
              <span className="admin-brand-badge">ADMIN PORTAL</span>
            </div>
          </Link>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
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
            <div>
              <h2 className="admin-header-title">{getPageTitle()}</h2>
              <div className="admin-header-sub">GV DesignTech CAD / CAM / CAE Management Center</div>
            </div>
          </div>

          <div className="admin-header-actions">
            <div className="admin-status-indicator">
              <span className="admin-status-dot"></span>
              <span>System Live</span>
            </div>

            <div className="admin-user-pill">
              <div className="admin-avatar">
                {adminUser.name.charAt(0)}
              </div>
              <div style={{ display: 'none', md: 'block' }}>
                <div className="admin-user-name">{adminUser.name}</div>
                <div className="admin-user-role">{adminUser.role}</div>
              </div>
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
