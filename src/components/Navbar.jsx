import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  getStoredCourses,
  subscribeToContentUpdates,
  isCustomDepartment,
  slugifyDepartment
} from '../data/contentPersistence.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [courses, setCourses] = useState(() => getStoredCourses());
  const location = useLocation();
  const closeTimerRef = useRef(null);

  // Dynamically map whichever departments the admin chooses in courses to the front page Courses dropdown menu
  const activeDisciplines = useMemo(() => {
    const deptMap = new Map();

    courses.forEach((course) => {
      const rawDept = (course.department || '').trim();

      // If marked as explicit discipline, respect it directly
      if (course.isDiscipline) {
        const id = course.id || course.title;
        if (!deptMap.has(id)) {
          const isCustom = isCustomDepartment(rawDept);
          const defaultLink = isCustom
            ? `/department/${slugifyDepartment(rawDept || course.title)}`
            : (course.link || '/mechanical');

          deptMap.set(id, {
            id,
            title: course.title,
            department: course.department,
            link: (course.link && course.link.startsWith('/department/')) ? course.link : defaultLink,
            modules: course.modules ? course.modules.split('(')[0].trim() : `${course.duration || 'Specialized'}`
          });
        }
        return;
      }

      if (!rawDept) return;

      // FIRST: Check if this is a custom department section created by admin (e.g. "CS", "Aerospace")
      // It must get its OWN SEPARATE PAGE route: /department/:slug
      if (isCustomDepartment(rawDept)) {
        const key = `custom-${slugifyDepartment(rawDept)}`;
        const targetLink = `/department/${slugifyDepartment(rawDept)}`;
        const defaultModules = course.modules ? course.modules.split('(')[0].trim() : `${course.duration || 'Specialized Track'}`;

        if (!deptMap.has(key)) {
          deptMap.set(key, {
            id: `dept-${key}`,
            title: rawDept,
            department: rawDept,
            link: (course.link && course.link.startsWith('/department/')) ? course.link : targetLink,
            modules: defaultModules,
            coursesCount: 1,
            isCustom: true
          });
        } else {
          deptMap.get(key).coursesCount += 1;
        }
        return;
      }

      // Default Standard Departments:
      const dept = rawDept.toLowerCase();
      let key = '';
      let title = '';
      let link = '/mechanical';
      let defaultModules = '8 Software modules';

      if (dept.includes('mech')) {
        key = 'mech';
        title = course.department || 'Mechanical & Automobile';
        link = '/mechanical';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : '8 Software modules';
      } else if (dept.includes('civil')) {
        key = 'civil';
        title = course.department || 'Civil Engineering & BIM';
        link = '/civil-engineering';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : '6 Software modules';
      } else if (dept.includes('cnc')) {
        key = 'cnc';
        title = course.department || 'CNC Programming & CAM';
        link = '/cnc-programming';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : '6 Software modules';
      } else if (dept.includes('computer') || dept.includes('software') || dept.includes('information')) {
        key = 'cs';
        title = course.department || 'Computer Science & IT';
        link = '/computer-science';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : '8 Software modules';
      } else if (dept.includes('eee') || dept.includes('instrument') || dept.includes('electr')) {
        key = 'eee';
        title = course.department || 'EEE & Automation';
        link = '/eee-instrumentation';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : '8 Software modules';
      } else if (dept.includes('ece')) {
        key = 'ece';
        title = course.department || 'ECE Embedded & IoT';
        link = '/ece';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : '7 Software modules';
      } else if (dept.includes('piping') || dept.includes('oil') || dept.includes('gas')) {
        key = 'piping';
        title = course.department || 'Piping Engineering (Oil & Gas)';
        link = '/piping-engineering';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : '8 Software modules';
      } else if (dept.includes('robot')) {
        key = 'robotics';
        title = course.department || 'Robotics & Automation';
        link = '/mechanical';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : 'ROS 2, MATLAB Simulink, SolidWorks';
      } else if (dept.includes('ai') || dept.includes('data')) {
        key = 'ai';
        title = course.department || 'AI & Data Science';
        link = '/computer-science';
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : 'Python, PyTorch, Deep Learning';
      } else {
        key = slugifyDepartment(rawDept);
        title = rawDept;
        link = `/department/${slugifyDepartment(rawDept)}`;
        defaultModules = course.modules ? course.modules.split('(')[0].trim() : `${course.duration || 'Specialized'}`;
      }

      if (!deptMap.has(key)) {
        deptMap.set(key, {
          id: `dept-${key}`,
          title,
          department: course.department,
          link,
          modules: defaultModules,
          coursesCount: 1
        });
      } else {
        const item = deptMap.get(key);
        item.coursesCount += 1;
      }
    });

    return Array.from(deptMap.values());
  }, [courses]);

  useEffect(() => {
    setCourses(getStoredCourses());
    const unsub = subscribeToContentUpdates(() => {
      setCourses(getStoredCourses());
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

  const handleMouseEnter = (name) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(prev => prev === name ? null : name);
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
