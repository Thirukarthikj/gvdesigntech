import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStoredCourses, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [courses, setCourses] = useState(() => getStoredCourses());
  const location = useLocation();

  const curatedList = courses.filter(c => c.isDiscipline || (c.id && c.id.startsWith('course-')));
  const displayList = curatedList.length > 0 ? curatedList : courses;
  const uniqueCourses = displayList.filter((c, idx, arr) =>
    arr.findIndex(x => (x.id && x.id === c.id) || (x.title && x.title === c.title)) === idx
  );

  useEffect(() => {
    setCourses(getStoredCourses());
    const unsub = subscribeToContentUpdates(() => {
      setCourses(getStoredCourses());
    });
    return () => unsub();
  }, []);

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
                <span>CURATED DISCIPLINES ({uniqueCourses.length})</span>
                <span className="curated-dot"></span>
              </div>
              <div className="curated-list">
                {uniqueCourses.length === 0 ? (
                  <div style={{ padding: '20px 24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    No courses published yet
                  </div>
                ) : (
                  uniqueCourses.map((course) => {
                    const title = course.title || course.department;
                    const mod = course.modules ? course.modules.split('(')[0].trim() : `${course.duration || 'Specialized'}`;
                    return (
                      <Link
                        to={course.link || '/mechanical'}
                        key={course.id || course._id || title}
                        className="curated-item"
                        onClick={closeAll}
                      >
                        <div className="curated-item-info">
                          <span className="curated-item-title">{course.title || course.department}</span>
                          <span className="curated-item-modules">{mod}</span>
                        </div>
                        <span className="curated-arrow">→</span>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Internship Dropdown */}
          <div className={`dropdown ${activeDropdown === 'internship' ? 'active' : ''}`}>
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown('internship', e)}>
              Internship <i className="chevron"></i>
            </span>
            <div className="dropdown-menu">
              <Link to="/internship" onClick={closeAll} style={{ color: '#c084fc', fontWeight: '700', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px', marginBottom: '4px' }}>
                All Internship Programs →
              </Link>
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
