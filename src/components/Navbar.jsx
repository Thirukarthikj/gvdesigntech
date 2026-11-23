import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="nav">
      <Link className="brand" to="/" onClick={closeAll}>
        <img alt="GV DesignTech Logo" className="logo" src="/assets/gv-logo.png" />
        <span>GV DesignTech</span>
      </Link>

      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`nav-container ${isOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <Link to="/" onClick={closeAll}>Home</Link>
          <Link to="/about" onClick={closeAll}>About Us</Link>

          {/* Courses Dropdown */}
          <div className={`dropdown ${activeDropdown === 'courses' ? 'active' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown('courses', e)}>
              Courses <i className="chevron"></i>
            </span>
            <div className="dropdown-menu courses-curated-dropdown">
              <div className="curated-header">
                <span>CURATED DISCIPLINES (7)</span>
                <span className="curated-dot"></span>
              </div>
              <div className="curated-list">
                <Link to="/datascience" className="curated-item" onClick={closeAll}>
                  <div className="curated-item-info">
                    <span className="curated-item-title">Mechanical &amp; Automobile</span>
                    <span className="curated-item-modules">8 Software modules</span>
                  </div>
                  <span className="curated-arrow">→</span>
                </Link>

                <Link to="/dataanalytics" className="curated-item" onClick={closeAll}>
                  <div className="curated-item-info">
                    <span className="curated-item-title">Civil Engineering</span>
                    <span className="curated-item-modules">10 Software modules</span>
                  </div>
                  <span className="curated-arrow">→</span>
                </Link>

                <Link to="/machinelearning" className="curated-item" onClick={closeAll}>
                  <div className="curated-item-info">
                    <span className="curated-item-title">CNC Programming</span>
                    <span className="curated-item-modules">1 Software modules</span>
                  </div>
                  <span className="curated-arrow">→</span>
                </Link>

                <Link to="/Artificial" className="curated-item" onClick={closeAll}>
                  <div className="curated-item-info">
                    <span className="curated-item-title">Computer Science &amp; IT</span>
                    <span className="curated-item-modules">8 Software modules</span>
                  </div>
                  <span className="curated-arrow">→</span>
                </Link>

                <Link to="/datascience" className="curated-item" onClick={closeAll}>
                  <div className="curated-item-info">
                    <span className="curated-item-title">EEE/Instrumentation</span>
                    <span className="curated-item-modules">6 Software modules</span>
                  </div>
                  <span className="curated-arrow">→</span>
                </Link>

                <Link to="/Artificial" className="curated-item" onClick={closeAll}>
                  <div className="curated-item-info">
                    <span className="curated-item-title">ECE</span>
                    <span className="curated-item-modules">5 Software modules</span>
                  </div>
                  <span className="curated-arrow">→</span>
                </Link>

                <Link to="/datascience" className="curated-item" onClick={closeAll}>
                  <div className="curated-item-info">
                    <span className="curated-item-title">Piping (Oil &amp; Gas)</span>
                    <span className="curated-item-modules">4 Software modules</span>
                  </div>
                  <span className="curated-arrow">→</span>
                </Link>
              </div>

              <div className="curated-footer">
                <Link to="/datascience" className="curated-browse-all" onClick={closeAll}>
                  Browse All Courses →
                </Link>
              </div>
            </div>
          </div>

          {/* Internship Dropdown */}
          <div className={`dropdown ${activeDropdown === 'internship' ? 'active' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown('internship', e)}>
              Internship <i className="chevron"></i>
            </span>
            <div className="dropdown-menu">
              <Link to="/internship/aiInternship" onClick={closeAll}>AI Internship</Link>
              <Link to="/internship/summerinternship" onClick={closeAll}>Summer Internship</Link>
              <Link to="/internship/college" onClick={closeAll}>College Internship</Link>
              <Link to="/internship/datascience" onClick={closeAll}>Data Science Internship</Link>
              <Link to="/internship/Machinelearning" onClick={closeAll}>Machine Learning Internship</Link>
            </div>
          </div>

          {/* Flagship Dropdown */}
          <div className={`dropdown ${activeDropdown === 'flagship' ? 'active' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown('flagship', e)}>
              Flagship <i className="chevron"></i>
            </span>
            <div className="dropdown-menu">
              <Link to="/flagship/mou" onClick={closeAll}>MOU</Link>
              <Link to="/flagship/galleryPage" onClick={closeAll}>Gallery</Link>
              <Link to="/flagship/Placement" onClick={closeAll}>Placement</Link>
              <Link to="/flagship/Blog-page" onClick={closeAll}>Blog</Link>
              <Link to="/certificate-verification" onClick={closeAll}>Certification Verification</Link>
            </div>
          </div>

          <Link to="/Contactus" onClick={closeAll}>Contact Us</Link>
        </div>

        <Link className="nav-cta" to="/pest-exam" onClick={closeAll}>
          Skill Test
        </Link>
      </div>
    </nav>
  );
}
