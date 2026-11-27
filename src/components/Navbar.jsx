import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  getStoredCourses,
  getStoredCustomDepartments,
  getStoredInternshipPrograms,
  subscribeToContentUpdates,
  isCustomDepartment,
  slugifyDepartment,
  normalizeInternshipLink
} from '../data/contentPersistence.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [courses, setCourses] = useState(() => getStoredCourses());
  const [customDepts, setCustomDepts] = useState(() => getStoredCustomDepartments());
  const [internships, setInternships] = useState(() => getStoredInternshipPrograms());
  const location = useLocation();
  const closeTimerRef = useRef(null);

  // Dynamically map whichever departments the admin chooses in courses to the front page Courses dropdown menu
  const activeDisciplines = useMemo(() => {
    const deptMap = new Map();

    // 1. Process all departments that have courses assigned by the admin
    courses.forEach((course) => {
      // If admin explicitly disabled this course from navbar, skip
      if (course.isDiscipline === false) return;

      const rawDept = (course.department || '').trim();
      if (!rawDept) return;

      const key = rawDept.toLowerCase();

      // Determine proper link
      let link = '/mechanical';
      if (isCustomDepartment(rawDept)) {
        link = (course.link && course.link.startsWith('/department/'))
          ? course.link
          : `/department/${slugifyDepartment(rawDept)}`;
      } else {
        const d = rawDept.toLowerCase();
        if (d.includes('mech') || d.includes('auto')) link = '/mechanical';
        else if (d.includes('civil') || d.includes('bim')) link = '/civil-engineering';
        else if (d.includes('cnc') || d.includes('cam')) link = '/cnc-programming';
        else if (d.includes('computer') || d.includes('software') || d === 'it') link = '/computer-science';
        else if (d.includes('eee') || d.includes('electr')) link = '/eee-instrumentation';
        else if (d.includes('ece') || d.includes('embed') || d.includes('iot')) link = '/ece';
        else if (d.includes('piping') || d.includes('oil') || d.includes('gas')) link = '/piping-engineering';
        else if (d.includes('robot')) link = '/mechanical';
        else if (d.includes('ai') || d.includes('data')) link = '/computer-science';
      }

      const subtext = course.modules
        ? course.modules.split('(')[0].trim()
        : (course.title || course.duration || 'Specialized Track');

      if (!deptMap.has(key)) {
        deptMap.set(key, {
          id: `dept-${slugifyDepartment(rawDept)}`,
          title: rawDept, // EXACT DEPARTMENT NAME CHOSEN BY ADMIN
          department: rawDept,
          link,
          modules: subtext,
          coursesCount: 1,
          isCustom: isCustomDepartment(rawDept)
        });
      } else {
        const entry = deptMap.get(key);
        entry.coursesCount += 1;
        // Update subtext if previous was generic
        if ((!entry.modules || entry.modules === 'Specialized Track') && subtext) {
          entry.modules = subtext;
        }
      }
    });

    // 2. Also ensure any custom department created by the admin is listed
    customDepts.forEach((customDept) => {
      const rawDept = (customDept || '').trim();
      if (!rawDept) return;
      const key = rawDept.toLowerCase();
      if (!deptMap.has(key)) {
        deptMap.set(key, {
          id: `dept-${slugifyDepartment(rawDept)}`,
          title: rawDept, // EXACT DEPARTMENT NAME CHOSEN BY ADMIN
          department: rawDept,
          link: `/department/${slugifyDepartment(rawDept)}`,
          modules: 'Specialized Track',
          coursesCount: 0,
          isCustom: true
        });
      }
    });

    return Array.from(deptMap.values());
  }, [courses, customDepts]);

  useEffect(() => {
    setCourses(getStoredCourses());
    setCustomDepts(getStoredCustomDepartments());
    setInternships(getStoredInternshipPrograms());
    const unsub = subscribeToContentUpdates(() => {
      setCourses(getStoredCourses());
      setCustomDepts(getStoredCustomDepartments());
      setInternships(getStoredInternshipPrograms());
    });
    return () => unsub();
  }, []);

  // Close menus on route change or unmount
  useEffect(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo(0, 0);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [location.pathname]);

  const isDesktop = () => {
    return typeof window !== 'undefined' && window.innerWidth > 1080;
  };

  const handleMouseEnter = (name) => {
    if (!isDesktop()) return;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    if (!isDesktop()) return;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const toggleDropdown = (name, e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  const closeAll = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
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
          <div
            className={`dropdown ${activeDropdown === 'courses' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('courses')}
            onMouseLeave={handleMouseLeave}
          >
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown('courses', e)}>
              Courses <i className="chevron"></i>
            </span>
            <div className="dropdown-menu courses-curated-dropdown">
              <div className="curated-header">
                <span>CURATED DISCIPLINES ({activeDisciplines.length})</span>
                <span className="curated-dot"></span>
              </div>
              <div className="curated-list">
                {activeDisciplines.length === 0 ? (
                  <div style={{ padding: '20px 24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    No courses published yet
                  </div>
                ) : (
                  activeDisciplines.map((item) => {
                    return (
                      <Link
                        to={item.link || '/mechanical'}
                        key={item.id || item.title}
                        className="curated-item"
                        onClick={closeAll}
                      >
                        <div className="curated-item-info">
                          <span className="curated-item-title">{item.title}</span>
                          <span className="curated-item-modules">{item.modules}</span>
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
          <div
            className={`dropdown ${activeDropdown === 'internship' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('internship')}
            onMouseLeave={handleMouseLeave}
          >
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown('internship', e)}>
              Internship <i className="chevron"></i>
            </span>
            <div className="dropdown-menu courses-curated-dropdown">
              <div className="curated-header">
                <span>INTERNSHIP TRACKS ({internships.length})</span>
                <span className="curated-dot"></span>
              </div>
              <div className="curated-list">
                <Link
                  to="/internship"
                  onClick={closeAll}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 18px',
                    color: '#c084fc',
                    fontWeight: '700',
                    fontSize: '13px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    textDecoration: 'none'
                  }}
                >
                  <span>All Internship Programs</span>
                  <span>→</span>
                </Link>
                {internships.length === 0 ? (
                  <div style={{ padding: '16px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    No internship tracks available
                  </div>
                ) : (
                  internships.map((prog) => {
                    const targetLink = normalizeInternshipLink(prog);
                    const subtext = prog.subtitle || prog.tag || (Array.isArray(prog.modules) ? prog.modules[0] : (typeof prog.modules === 'string' ? prog.modules.split('\n')[0] : 'Specialized Cohort'));
                    return (
                      <Link
                        to={targetLink}
                        key={prog.id || prog._id || prog.title}
                        className="curated-item"
                        onClick={closeAll}
                      >
                        <div className="curated-item-info">
                          <span className="curated-item-title">{prog.title}</span>
                          <span className="curated-item-modules">{subtext}</span>
                        </div>
                        <span className="curated-arrow">→</span>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Flagship Dropdown */}
          <div
            className={`dropdown ${activeDropdown === 'flagship' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('flagship')}
            onMouseLeave={handleMouseLeave}
          >
            <span className="dropdown-trigger" onClick={(e) => toggleDropdown('flagship', e)}>
              Flagship <i className="chevron"></i>
            </span>
            <div className="dropdown-menu">
              <Link to="/flagship/mou" onClick={closeAll}>MOU</Link>
              <Link to="/flagship/galleryPage" onClick={closeAll}>Gallery</Link>
              <Link to="/flagship/Placement" onClick={closeAll}>Placement</Link>
              <Link to="/flagship/Blog-page" onClick={closeAll}>Blog</Link>
              <Link to="/certificate-verification" onClick={closeAll}>Certificate Verification</Link>
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
