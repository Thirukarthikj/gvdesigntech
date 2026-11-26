import React, { useState, useEffect, useMemo } from 'react';
import {
  getStoredCourses,
  saveStoredCourses,
  getStoredCustomDepartments,
  saveStoredCustomDepartments,
  subscribeToContentUpdates,
  DEFAULT_DEPARTMENTS,
  getDepartmentIcon,
  courseMatchesDept,
  isCustomDepartment,
  slugifyDepartment
} from '../../data/contentPersistence.js';
import { uploadImageToCloudinary, compressImageFile } from '../../services/cloudinaryService.js';
import { fetchCoursesFromMongo, deleteCourseInMongo } from '../../services/mongoService.js';

export default function AdminCourses() {
  // --- Courses State ---
  const [courses, setCourses] = useState(() => getStoredCourses());
  const [customDepts, setCustomDepts] = useState(() => getStoredCustomDepartments());
  const [courseSearch, setCourseSearch] = useState('');
  const [filterCourseDept, setFilterCourseDept] = useState('all');
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isCustomDept, setIsCustomDept] = useState(false);
  const [isNewDeptModalOpen, setIsNewDeptModalOpen] = useState(false);
  const [newDeptInput, setNewDeptInput] = useState('');

  // Dynamically compute all unique departments from default list + custom depts + stored courses
  const allDepartments = useMemo(() => {
    const deptSet = new Set(DEFAULT_DEPARTMENTS);
    customDepts.forEach(d => { if (d && d.trim()) deptSet.add(d.trim()); });
    courses.forEach(c => {
      if (c.department && c.department.trim()) {
        deptSet.add(c.department.trim());
      }
    });
    return Array.from(deptSet);
  }, [courses, customDepts]);

  // Sections to render: defaults + custom departments + courses with unique depts
  const departmentsToDisplay = useMemo(() => {
    const list = [...DEFAULT_DEPARTMENTS];
    customDepts.forEach(d => {
      if (d && !list.some(x => x.toLowerCase().trim() === d.toLowerCase().trim())) {
        list.push(d.trim());
      }
    });
    courses.forEach(c => {
      if (c.department && c.department.trim() && !list.some(x => x.toLowerCase().trim() === c.department.toLowerCase().trim())) {
        list.push(c.department.trim());
      }
    });

    if (filterCourseDept === 'disciplines') {
      return ['Curated Disciplines'];
    }
    if (filterCourseDept !== 'all') {
      return list.filter(d => d.toLowerCase().trim() === filterCourseDept.toLowerCase().trim());
    }
    return list;
  }, [courses, customDepts, filterCourseDept]);

  // Helper to match search query
  const matchesSearch = (course) => {
    if (!courseSearch.trim()) return true;
    const q = courseSearch.toLowerCase();
    return (
      (course.title && course.title.toLowerCase().includes(q)) ||
      (course.modules && course.modules.toLowerCase().includes(q)) ||
      (course.desc && course.desc.toLowerCase().includes(q)) ||
      (course.department && course.department.toLowerCase().includes(q))
    );
  };

  // --- Course Form Data ---
  const [courseForm, setCourseForm] = useState({
    title: '',
    department: 'Mechanical & Automobile',
    category: 'Mechanical',
    duration: '3 Months',
    level: 'Beginner → Advanced',
    badge: 'NEW COURSE',
    modules: '',
    desc: '',
    link: '/mechanical',
    mode: 'Classroom Studio & Live Online',
    image: ''
  });

  // --- Notification Toast ---
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Load from MongoDB and subscribe to live updates
  useEffect(() => {
    async function loadMongoCourses() {
      const mongoList = await fetchCoursesFromMongo();
      if (mongoList && Array.isArray(mongoList)) {
        setCourses(mongoList);
        saveStoredCourses(mongoList);
      } else {
        setCourses(getStoredCourses());
      }
    }
    loadMongoCourses();

    const unsubscribe = subscribeToContentUpdates(() => {
      setCourses(getStoredCourses());
      setCustomDepts(getStoredCustomDepartments());
    });

    return () => unsubscribe();
  }, []);

  // --- Department Section Handlers ---
  const handleCreateNewDeptSection = (deptName) => {
    const trimmed = (deptName || '').trim();
    if (!trimmed) {
      alert('Please enter a department name');
      return;
    }
    const exists = allDepartments.some(d => d.toLowerCase().trim() === trimmed.toLowerCase());
    if (exists) {
      showToast(`Department section "${trimmed}" already exists.`);
      setFilterCourseDept(trimmed);
      setIsNewDeptModalOpen(false);
      setNewDeptInput('');
      return;
    }
    const updated = [...customDepts, trimmed];
    setCustomDepts(updated);
    saveStoredCustomDepartments(updated);
    showToast(`✨ Created new section for "${trimmed}"!`);
    setFilterCourseDept(trimmed);
    setIsNewDeptModalOpen(false);
    setNewDeptInput('');
  };

  const handleDeleteCustomDept = (deptToDelete) => {
    const count = courses.filter(c => courseMatchesDept(c, deptToDelete)).length;
    const msg = count > 0
      ? `Are you sure you want to delete the "${deptToDelete}" department section and all ${count} course(s) in it?`
      : `Are you sure you want to delete the "${deptToDelete}" department section?`;
    if (!window.confirm(msg)) return;

    const nextCustom = customDepts.filter(d => d.toLowerCase().trim() !== deptToDelete.toLowerCase().trim());
    setCustomDepts(nextCustom);
    saveStoredCustomDepartments(nextCustom);

    if (count > 0) {
      const remainingCourses = courses.filter(c => !courseMatchesDept(c, deptToDelete));
      setCourses(remainingCourses);
      saveStoredCourses(remainingCourses);
    }
    if (filterCourseDept.toLowerCase().trim() === deptToDelete.toLowerCase().trim()) {
      setFilterCourseDept('all');
    }
    showToast(`Removed department section "${deptToDelete}"`);
  };

  // --- Courses Handlers ---
  const handleOpenAddCourse = (deptToSelect = null, isNewDept = false) => {
    setEditingCourse(null);
    const chosenDept = deptToSelect || (filterCourseDept !== 'all' && filterCourseDept !== 'disciplines' ? filterCourseDept : 'Mechanical & Automobile');
    const isCustom = isNewDept || isCustomDepartment(chosenDept);
    setIsCustomDept(isCustom);

    let link = '/mechanical';
    let cat = 'Mechanical';
    if (chosenDept.includes('Civil')) { link = '/civil-engineering'; cat = 'Civil'; }
    else if (chosenDept.includes('CNC')) { link = '/cnc-programming'; cat = 'CNC'; }
    else if (chosenDept.includes('Computer') || chosenDept.includes('IT')) { link = '/computer-science'; cat = 'Computer Science'; }
    else if (chosenDept.includes('EEE')) { link = '/eee-instrumentation'; cat = 'Electrical'; }
    else if (chosenDept.includes('ECE')) { link = '/ece'; cat = 'Electronics'; }
    else if (chosenDept.includes('Piping')) { link = '/piping-engineering'; cat = 'Piping'; }
    else if (chosenDept.includes('Robotics')) { link = '/mechanical'; cat = 'Robotics'; }
    else if (chosenDept.includes('AI') || chosenDept.includes('Data')) { link = '/computer-science'; cat = 'AI & Data Science'; }
    else if (isCustom) {
      link = `/department/${slugifyDepartment(chosenDept)}`;
      cat = chosenDept || 'Custom Department';
    }

    setCourseForm({
      title: '',
      department: isNewDept ? '' : chosenDept,
      category: cat,
      duration: '3 Months',
      level: 'Beginner → Advanced',
      badge: 'NEW COURSE',
      modules: '',
      desc: '',
      link: link,
      mode: 'Classroom Studio & Live Online',
      image: ''
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    const isCustom = isCustomDepartment(course.department);
    const defaultCustomLink = isCustom ? `/department/${slugifyDepartment(course.department)}` : '/mechanical';
    setEditingCourse(course);
    setIsCustomDept(isCustom);
    setCourseForm({
      title: course.title || '',
      department: course.department || 'Mechanical & Automobile',
      category: course.category || (isCustom ? course.department : 'Mechanical'),
      duration: course.duration || '3 Months',
      level: course.level || 'Beginner → Advanced',
      badge: course.badge || '',
      modules: course.modules || '',
      desc: course.desc || '',
      link: (course.link && course.link !== '/courses' && course.link !== '/mechanical') ? course.link : defaultCustomLink,
      mode: course.mode || 'Classroom Studio & Live Online',
      image: course.image || course.img || '',
      isDiscipline: !!(course.isDiscipline || (course.id && course.id.startsWith('course-')))
    });
    setIsCourseModalOpen(true);
  };

  const handleCourseImageUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP).');
      return;
    }

    setUploadingImage(true);
    try {
      const compressedData = await compressImageFile(file);
      setCourseForm(prev => ({ ...prev, image: compressedData }));
      showToast('📷 Image attached! Syncing to cloud storage...');

      const res = await uploadImageToCloudinary(file, { folder: 'gvdesigntech/courses' });
      if (res && res.isCloudinary) {
        setCourseForm(prev => ({ ...prev, image: res.url }));
        showToast('☁️ Course image uploaded to Cloudinary CDN!');
      } else {
        showToast('✓ Course image attached and ready!');
      }
    } catch (err) {
      console.warn('Image upload fallback:', err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteCourse = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete course "${title}"?`)) {
      const updated = courses.filter(c => (c.id !== id && c._id !== id));
      setCourses(updated);
      saveStoredCourses(updated);
      try {
        await deleteCourseInMongo(id);
      } catch (e) {}
      showToast(`Deleted course "${title}"`);
    }
  };

  const handleMoveCourseInSection = (courseId, direction, deptName) => {
    const deptCourseList = courses.filter(c => {
      if (deptName === 'Curated Disciplines') {
        return !!(c.isDiscipline || (c.id && c.id.startsWith('course-')));
      }
      return courseMatchesDept(c, deptName);
    });
    const currentDeptIdx = deptCourseList.findIndex(c => (c.id === courseId || c._id === courseId));
    if (currentDeptIdx === -1) return;
    const targetDeptIdx = currentDeptIdx + direction;
    if (targetDeptIdx < 0 || targetDeptIdx >= deptCourseList.length) return;

    const targetCourse = deptCourseList[targetDeptIdx];
    const mainIdx1 = courses.findIndex(c => (c.id === courseId || c._id === courseId));
    const mainIdx2 = courses.findIndex(c => (c.id === targetCourse.id || c._id === targetCourse._id));
    if (mainIdx1 === -1 || mainIdx2 === -1) return;

    const reordered = [...courses];
    const temp = reordered[mainIdx1];
    reordered[mainIdx1] = reordered[mainIdx2];
    reordered[mainIdx2] = temp;

    setCourses(reordered);
    saveStoredCourses(reordered);
    showToast(`Reordered "${temp.title}" in ${deptName}`);
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) {
      alert('Please enter a course title');
      return;
    }
    const enteredDept = (courseForm.department || '').trim();
    if (!enteredDept) {
      alert('Please specify a department');
      return;
    }

    // If custom department, register into customDepts so its section is permanent!
    const isCustom = isCustomDepartment(enteredDept);
    if (isCustom) {
      if (!customDepts.some(d => d.toLowerCase().trim() === enteredDept.toLowerCase())) {
        const nextCustom = [...customDepts, enteredDept];
        setCustomDepts(nextCustom);
        saveStoredCustomDepartments(nextCustom);
      }
    }

    const finalLink = (courseForm.link && courseForm.link !== '/courses' && courseForm.link !== '/mechanical')
      ? courseForm.link
      : (isCustom ? `/department/${slugifyDepartment(enteredDept)}` : (courseForm.link || '/mechanical'));

    if (editingCourse) {
      const updated = courses.map(c => {
        if ((editingCourse.id && c.id === editingCourse.id) || (editingCourse._id && c._id === editingCourse._id)) {
          return {
            ...c,
            ...courseForm,
            department: enteredDept,
            link: finalLink,
            category: isCustom ? (courseForm.category || enteredDept) : (courseForm.category || 'Engineering'),
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      });
      setCourses(updated);
      saveStoredCourses(updated);
      showToast(`Updated course "${courseForm.title}" in section "${enteredDept}"`);
    } else {
      const newEntry = {
        ...courseForm,
        department: enteredDept,
        link: finalLink,
        category: isCustom ? (courseForm.category || enteredDept) : (courseForm.category || 'Engineering'),
        id: `course-${Date.now()}`,
        order: courses.length + 1,
        createdAt: new Date().toISOString()
      };
      const updated = [newEntry, ...courses];
      setCourses(updated);
      saveStoredCourses(updated);
      showToast(`Added new course "${courseForm.title}" to section "${enteredDept}"!`);
    }

    setIsCourseModalOpen(false);
  };

  // Department link mapper helper
  const handleDepartmentChange = (dept) => {
    if (isCustomDepartment(dept)) {
      setCourseForm(prev => ({
        ...prev,
        department: dept,
        category: dept || 'Custom Department',
        link: `/department/${slugifyDepartment(dept)}`
      }));
      return;
    }

    let link = '/mechanical';
    let cat = 'Mechanical';
    if (dept.includes('Civil')) { link = '/civil-engineering'; cat = 'Civil'; }
    else if (dept.includes('CNC')) { link = '/cnc-programming'; cat = 'CNC'; }
    else if (dept.includes('Computer')) { link = '/computer-science'; cat = 'Computer Science'; }
    else if (dept.includes('EEE')) { link = '/eee-instrumentation'; cat = 'Electrical'; }
    else if (dept.includes('ECE')) { link = '/ece'; cat = 'Electronics'; }
    else if (dept.includes('Piping')) { link = '/piping-engineering'; cat = 'Piping'; }
    else if (dept.includes('Robotics')) { link = '/mechanical'; cat = 'Robotics'; }
    else if (dept.includes('AI') || dept.includes('Data')) { link = '/computer-science'; cat = 'AI & Data Science'; }

    setCourseForm(prev => ({
      ...prev,
      department: dept,
      category: cat,
      link: link
    }));
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          zIndex: 9999,
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <span>✓</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header & MongoDB Connection Indicator */}
      <div className="admin-page-header-row">
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span>Courses &amp; Curriculum Management</span>
            <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '999px', color: '#34d399' }}>
              🍃 MongoDB Active
            </span>
            <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc' }}>
              ⚡ Live Sync Enabled
            </span>
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
            Add, update, and manage official training programs, software tracks, and curated disciplines across the platform.
          </p>
        </div>

        {/* Total Courses Stat Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '8px 18px',
          borderRadius: '10px'
        }}>
          <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#e2e8f0' }}>🎓 Total Stored Courses:</span>
          <span style={{ fontSize: '16px', fontWeight: '800', color: '#c084fc' }}>{courses.length}</span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            ({courses.filter(c => c.isDiscipline || (c.id && c.id.startsWith('course-'))).length} Curated, {courses.filter(c => !c.isDiscipline && !(c.id && c.id.startsWith('course-'))).length} Department Tracks)
          </span>
        </div>
      </div>

      {/* Informative Guidance Banner for Navbar Dropdown */}
      <div style={{
        background: 'rgba(139, 92, 246, 0.08)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🧭</span>
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#fff' }}>
              Universal MongoDB Courses &amp; Department Pages Sync
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
              All 57+ courses across Mechanical, Civil, CNC, Computer Science, EEE, ECE, Piping, and Robotics are stored in MongoDB. Any edits or additions instantly update both the admin panel and public department curriculum pages.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '7px 14px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '12.5px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Live Website Preview ↗</span>
          </a>
        </div>
      </div>

      {/* ========================================================
          COURSES & CURRICULUM DIRECTORY (BY DEPARTMENT SECTIONS)
          ======================================================== */}
      <div>
        {/* Courses Toolbar */}
        <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
            {/* Search */}
            <input
              type="text"
              placeholder="Search courses by title, modules..."
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              className="admin-input"
              style={{ maxWidth: '300px', height: '40px' }}
            />

            {/* Department Filter & Dropdown Action Menu */}
            <select
              className="admin-select"
              value={filterCourseDept}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '__add_new__') {
                  handleOpenAddCourse(filterCourseDept !== 'all' && filterCourseDept !== 'disciplines' ? filterCourseDept : null);
                } else if (val === '__add_dept__') {
                  setIsNewDeptModalOpen(true);
                } else {
                  setFilterCourseDept(val);
                }
              }}
              style={{ height: '40px' }}
            >
              <option value="all">All Department Sections ({courses.length} courses)</option>
              <option value="disciplines">Curated Disciplines Only ({courses.filter(c => c.isDiscipline || (c.id && c.id.startsWith('course-'))).length})</option>

              {customDepts.length > 0 && (
                <optgroup label="✨ Custom Department Sections">
                  {customDepts.map((dept) => {
                    const count = courses.filter(c => courseMatchesDept(c, dept)).length;
                    return (
                      <option key={dept} value={dept}>
                        ✨ {dept} ({count} courses)
                      </option>
                    );
                  })}
                </optgroup>
              )}

              <optgroup label="Standard Department Sections">
                {DEFAULT_DEPARTMENTS.map((dept) => {
                  const count = courses.filter(c => courseMatchesDept(c, dept)).length;
                  return (
                    <option key={dept} value={dept}>
                      {getDepartmentIcon(dept)} {dept} ({count})
                    </option>
                  );
                })}
              </optgroup>

              <optgroup label="⚡ Quick Section Actions">
                <option value="__add_dept__">➕ Create New Department Section...</option>
                <option value="__add_new__">➕ Add New Course to this Menu...</option>
              </optgroup>
            </select>

            <span style={{ fontSize: '13px', color: '#94a3b8' }}>
              Showing {departmentsToDisplay.length} department section{departmentsToDisplay.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Action Buttons: + New Department Section & + Add New Course */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setIsNewDeptModalOpen(true)}
              className="admin-btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '13.5px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(217, 70, 239, 0.5)',
                color: '#f0abfc',
                cursor: 'pointer',
                borderRadius: '10px'
              }}
            >
              <span>✨ + New Department Section</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenAddCourse(filterCourseDept !== 'all' && filterCourseDept !== 'disciplines' ? filterCourseDept : null)}
              className="admin-btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                fontSize: '13.5px',
                fontWeight: '700',
                boxShadow: '0 4px 15px rgba(217, 70, 239, 0.35)'
              }}
            >
              <span>
                {filterCourseDept !== 'all' && filterCourseDept !== 'disciplines'
                  ? `+ Add Course to ${filterCourseDept}`
                  : '+ Add New Course'}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Department Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '26px',
          padding: '10px 14px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px'
        }}>
          <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '4px' }}>
            Filter Sections:
          </span>

          <button
            type="button"
            onClick={() => setFilterCourseDept('all')}
            style={{
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '999px',
              cursor: 'pointer',
              border: filterCourseDept === 'all' ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.1)',
              background: filterCourseDept === 'all' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.04)',
              color: filterCourseDept === 'all' ? '#fff' : '#cbd5e1',
              transition: 'all 0.2s ease'
            }}
          >
            All Sections ({courses.length})
          </button>

          {/* Custom Department Pills */}
          {customDepts.map((d) => {
            const count = courses.filter(c => courseMatchesDept(c, d)).length;
            const isSelected = filterCourseDept.toLowerCase().trim() === d.toLowerCase().trim();
            return (
              <button
                key={d}
                type="button"
                onClick={() => setFilterCourseDept(isSelected ? 'all' : d)}
                style={{
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #f472b6' : '1px solid rgba(217, 70, 239, 0.4)',
                  background: isSelected ? 'linear-gradient(135deg, rgba(217, 70, 239, 0.4), rgba(168, 85, 247, 0.4))' : 'rgba(217, 70, 239, 0.12)',
                  color: isSelected ? '#fff' : '#f0abfc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>✨</span>
                <span>{d}</span>
                <span style={{ fontSize: '10.5px', opacity: 0.85 }}>({count})</span>
              </button>
            );
          })}

          {/* Standard Department Pills */}
          {DEFAULT_DEPARTMENTS.map((d) => {
            const count = courses.filter(c => courseMatchesDept(c, d)).length;
            const isSelected = filterCourseDept.toLowerCase().trim() === d.toLowerCase().trim();
            return (
              <button
                key={d}
                type="button"
                onClick={() => setFilterCourseDept(isSelected ? 'all' : d)}
                style={{
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#fff' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{getDepartmentIcon(d)}</span>
                <span>{d}</span>
                <span style={{ fontSize: '10.5px', opacity: 0.8 }}>({count})</span>
              </button>
            );
          })}

          {/* Quick + Section Button */}
          <button
            type="button"
            onClick={() => setIsNewDeptModalOpen(true)}
            style={{
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '999px',
              cursor: 'pointer',
              border: '1px dashed rgba(217, 70, 239, 0.6)',
              background: 'transparent',
              color: '#f0abfc',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            + New Section
          </button>
        </div>

        {/* ========================================================
            DEPARTMENT SECTIONS LIST (ONLY ADDED COURSES APPEAR IN EACH)
            ======================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {departmentsToDisplay.map((deptName) => {
            const isCustom = isCustomDepartment(deptName) && deptName !== 'Curated Disciplines';
            const isDisciplinesOnly = deptName === 'Curated Disciplines';

            // Strictly filter courses belonging to THIS department section only!
            const sectionCourses = courses.filter(c => {
              if (isDisciplinesOnly) {
                return !!(c.isDiscipline || (c.id && c.id.startsWith('course-')));
              }
              return courseMatchesDept(c, deptName);
            });

            // Apply active search filter
            const visibleCourses = sectionCourses.filter(matchesSearch);

            // If user has typed search text and this department section has no matches, hide the section
            if (courseSearch.trim() && visibleCourses.length === 0) {
              return null;
            }

            const deptIcon = isDisciplinesOnly ? '⭐' : getDepartmentIcon(deptName);

            return (
              <div
                key={deptName}
                id={`dept-section-${deptName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                style={{
                  background: isCustom
                    ? 'linear-gradient(180deg, rgba(28, 18, 52, 0.85) 0%, rgba(15, 12, 34, 0.85) 100%)'
                    : 'rgba(15, 12, 34, 0.6)',
                  border: isCustom
                    ? '1px solid rgba(217, 70, 239, 0.45)'
                    : '1px solid rgba(139, 92, 246, 0.22)',
                  borderRadius: '18px',
                  padding: '24px',
                  boxShadow: isCustom
                    ? '0 10px 30px rgba(217, 70, 239, 0.12)'
                    : '0 8px 25px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Section Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: isCustom
                    ? '1px solid rgba(217, 70, 239, 0.25)'
                    : '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  {/* Department Icon, Title & Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '28px',
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: isCustom ? 'rgba(217, 70, 239, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isCustom ? '1px solid rgba(217, 70, 239, 0.4)' : '1px solid rgba(139, 92, 246, 0.25)'
                    }}>
                      {deptIcon}
                    </span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>
                          {deptName}
                        </h3>
                        {isCustom && (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.25), rgba(168, 85, 247, 0.25))',
                            border: '1px solid rgba(217, 70, 239, 0.6)',
                            color: '#f0abfc',
                            letterSpacing: '0.4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            ✨ Custom Department Section
                          </span>
                        )}
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: 'rgba(255, 255, 255, 0.07)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#cbd5e1'
                        }}>
                          {sectionCourses.length} {sectionCourses.length === 1 ? 'Course' : 'Courses'}
                        </span>
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                        {isCustom
                          ? `Dedicated section for ${deptName}. Only courses specifically added to this department appear here.`
                          : `Curriculum and training tracks under ${deptName}.`}
                      </p>
                    </div>
                  </div>

                  {/* Section Actions: Public Page, + Add Course to Dept, Remove Section */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={isCustom ? `/department/${slugifyDepartment(deptName)}` : (
                        deptName.includes('Civil') ? '/civil-engineering' :
                        deptName.includes('CNC') ? '/cnc-programming' :
                        deptName.includes('Computer') || deptName.includes('IT') ? '/computer-science' :
                        deptName.includes('EEE') ? '/eee-instrumentation' :
                        deptName.includes('ECE') ? '/ece' :
                        deptName.includes('Piping') ? '/piping-engineering' :
                        deptName.includes('AI') || deptName.includes('Data') ? '/computer-science' :
                        '/mechanical'
                      )}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#38bdf8',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        fontSize: '12.5px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>Public Page ↗</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenAddCourse(deptName)}
                      style={{
                        background: isCustom
                          ? 'linear-gradient(135deg, #d946ef, #8b5cf6)'
                          : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        border: 'none',
                        color: '#fff',
                        padding: '9px 18px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: isCustom
                          ? '0 4px 15px rgba(217, 70, 239, 0.35)'
                          : '0 4px 12px rgba(139, 92, 246, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <span>+ Add Course to {deptName}</span>
                    </button>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomDept(deptName)}
                        title={`Delete ${deptName} section`}
                        style={{
                          background: 'rgba(239, 68, 68, 0.12)',
                          border: '1px solid rgba(239, 68, 68, 0.35)',
                          color: '#f87171',
                          padding: '9px 14px',
                          borderRadius: '10px',
                          fontSize: '12.5px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <span>🗑️ Remove Section</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Courses inside this Department Section */}
                {visibleCourses.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                    gap: '18px'
                  }}>
                    {visibleCourses.map((c, idx) => {
                      const displayImg = c.image || '/assets/mech-cad.jpg';
                      const isFirst = idx === 0;
                      const isLast = idx === visibleCourses.length - 1;

                      return (
                        <div
                          key={c.id || c._id || idx}
                          style={{
                            background: 'rgba(15, 13, 36, 0.75)',
                            border: '1px solid rgba(139, 92, 246, 0.25)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.25s ease',
                            backdropFilter: 'blur(10px)',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.6)';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.45)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {/* Media Thumbnail */}
                          <div style={{
                            height: '160px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: '#0a081a'
                          }}>
                            {c.image ? (
                              <img
                                src={displayImg}
                                alt={c.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            ) : (
                              <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.15))',
                                color: '#c084fc',
                                fontSize: '32px'
                              }}>
                                <span>{deptIcon}</span>
                                <span style={{ fontSize: '12px', fontWeight: '700', marginTop: '6px', color: '#e2e8f0' }}>
                                  {c.department || deptName}
                                </span>
                              </div>
                            )}

                            {/* Gradient Overlay */}
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(15, 13, 36, 0.95) 0%, transparent 60%)'
                            }} />

                            {/* Category Tag (Top Left) */}
                            <div style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              background: 'rgba(15, 13, 36, 0.85)',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(139, 92, 246, 0.4)',
                              padding: '4px 10px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '700',
                              color: '#c084fc',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {c.department || c.category || deptName}
                            </div>

                            {/* Badge (Top Right) */}
                            {c.badge && (
                              <div style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                background: 'linear-gradient(135deg, #d946ef, #8b5cf6)',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '10.5px',
                                fontWeight: '800',
                                color: '#fff',
                                letterSpacing: '0.5px',
                                boxShadow: '0 4px 12px rgba(217, 70, 239, 0.4)'
                              }}>
                                {c.badge}
                              </div>
                            )}
                          </div>

                          {/* Card Body */}
                          <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{
                              fontSize: '16.5px',
                              fontWeight: '700',
                              color: '#fff',
                              margin: '0 0 10px',
                              lineHeight: 1.35
                            }}>
                              {c.title}
                            </h3>

                            {/* Meta Pills (Duration, Level) */}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                              {c.duration && (
                                <span style={{
                                  fontSize: '11.5px',
                                  color: '#22d3ee',
                                  background: 'rgba(34, 211, 238, 0.1)',
                                  border: '1px solid rgba(34, 211, 238, 0.3)',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  ⏱️ {c.duration}
                                </span>
                              )}
                              {c.level && (
                                <span style={{
                                  fontSize: '11.5px',
                                  color: '#f472b6',
                                  background: 'rgba(244, 114, 182, 0.1)',
                                  border: '1px solid rgba(244, 114, 182, 0.3)',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  📈 {c.level}
                                </span>
                              )}
                              {c.mode && (
                                <span style={{
                                  fontSize: '11.5px',
                                  color: '#a78bfa',
                                  background: 'rgba(167, 139, 250, 0.1)',
                                  border: '1px solid rgba(167, 139, 250, 0.3)',
                                  padding: '3px 8px',
                                  borderRadius: '6px'
                                }}>
                                  🏢 {c.mode}
                                </span>
                              )}
                            </div>

                            {/* Software Modules */}
                            {c.modules && (
                              <div style={{
                                fontSize: '12.5px',
                                color: '#cbd5e1',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                marginBottom: '12px',
                                lineHeight: 1.45
                              }}>
                                <strong style={{ color: '#c084fc' }}>Software: </strong>
                                {c.modules}
                              </div>
                            )}

                            {/* Description */}
                            <p style={{
                              fontSize: '13px',
                              color: '#94a3b8',
                              lineHeight: 1.5,
                              margin: '0 0 16px',
                              flex: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {c.desc}
                            </p>

                            {/* Card Actions */}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingTop: '12px',
                              borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                              marginTop: 'auto'
                            }}>
                              <a
                                href={
                                  (c.link && c.link !== '/courses' && c.link !== '/mechanical')
                                    ? c.link
                                    : (isCustomDepartment(c.department)
                                        ? `/department/${slugifyDepartment(c.department)}`
                                        : (c.link || '/mechanical'))
                                }
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  fontSize: '12px',
                                  color: '#22d3ee',
                                  textDecoration: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <span>View Page ↗</span>
                              </a>

                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <button
                                  type="button"
                                  disabled={isFirst}
                                  onClick={() => handleMoveCourseInSection(c.id || c._id, -1, deptName)}
                                  title="Move up in this department section"
                                  style={{
                                    padding: '6px 10px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    color: isFirst ? '#475569' : '#e2e8f0',
                                    borderRadius: '8px',
                                    cursor: isFirst ? 'not-allowed' : 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  disabled={isLast}
                                  onClick={() => handleMoveCourseInSection(c.id || c._id, 1, deptName)}
                                  title="Move down in this department section"
                                  style={{
                                    padding: '6px 10px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    color: isLast ? '#475569' : '#e2e8f0',
                                    borderRadius: '8px',
                                    cursor: isLast ? 'not-allowed' : 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  ▼
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleOpenEditCourse(c)}
                                  style={{
                                    padding: '6px 14px',
                                    background: 'rgba(139, 92, 246, 0.15)',
                                    border: '1px solid rgba(139, 92, 246, 0.35)',
                                    color: '#c084fc',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '12.5px',
                                    fontWeight: '600'
                                  }}
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteCourse(c.id || c._id, c.title)}
                                  style={{
                                    padding: '6px 14px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#f87171',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '12.5px',
                                    fontWeight: '600'
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty state for this specific department section */
                  <div style={{
                    textAlign: 'center',
                    padding: '36px 20px',
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: '14px',
                    border: '1px dashed rgba(139, 92, 246, 0.3)'
                  }}>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📁</div>
                    <h4 style={{ color: '#fff', fontSize: '15.5px', margin: '0 0 6px', fontWeight: '700' }}>
                      No courses added to {deptName} yet
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                      Only courses you add with department &quot;{deptName}&quot; will appear in this dedicated section.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenAddCourse(deptName)}
                      style={{
                        background: isCustom
                          ? 'linear-gradient(135deg, #d946ef, #8b5cf6)'
                          : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        border: 'none',
                        color: '#fff',
                        padding: '9px 20px',
                        borderRadius: '9px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(217, 70, 239, 0.35)'
                      }}
                    >
                      + Add First Course to {deptName}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* When search matches 0 courses across all sections */}
          {departmentsToDisplay.every(deptName => {
            const sectionCourses = courses.filter(c => {
              if (deptName === 'Curated Disciplines') return !!(c.isDiscipline || (c.id && c.id.startsWith('course-')));
              return courseMatchesDept(c, deptName);
            });
            return sectionCourses.filter(matchesSearch).length === 0;
          }) && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(15, 13, 36, 0.5)',
              borderRadius: '16px',
              border: '1px dashed rgba(139, 92, 246, 0.3)'
            }}>
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ color: '#fff', fontSize: '18px', margin: '0 0 6px' }}>
                No courses found matching &quot;{courseSearch}&quot;
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 16px' }}>
                Try adjusting your search query or department filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCourseSearch('');
                  setFilterCourseDept('all');
                }}
                className="admin-btn-primary"
              >
                Clear Search &amp; Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          MODAL: ADD / EDIT COURSE
          ======================================================== */}
      {isCourseModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsCourseModalOpen(false)}>
          <div
            className="admin-modal"
            style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                  {editingCourse ? '✏️ Edit Course Details' : '🎓 Add New Course Offering'}
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                  Persists to MongoDB collection &quot;courses&quot; and synchronizes across the website immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '22px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCourseSubmit}>
              {/* Dropdown Menu Item Live Preview */}
              <div style={{
                background: 'rgba(15, 12, 34, 0.9)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                borderRadius: '12px',
                padding: '14px 16px',
                marginBottom: '18px'
              }}>
                <div style={{ fontSize: '11px', color: '#c084fc', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
                  Preview: How this department appears in Navbar &quot;CURATED DISCIPLINES&quot;
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div>
                    <div style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '14px' }}>
                      {courseForm.department || 'Select Department'}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>
                      {courseForm.modules ? courseForm.modules.split('(')[0].trim() : (courseForm.duration || 'Specialized Track')}
                    </div>
                  </div>
                  <span style={{ color: '#a855f7', fontSize: '16px', fontWeight: '700' }}>→</span>
                </div>
              </div>

              {/* Course Title */}
              <div className="admin-form-group">
                <label className="admin-label">Course Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. Master Mechanical CAD &amp; FEA Simulation"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                />
              </div>

              {/* Department & Level */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label className="admin-label" style={{ margin: 0 }}>Discipline / Department *</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomDept(!isCustomDept)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#c084fc',
                        fontSize: '11.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '0',
                        textDecoration: 'underline'
                      }}
                    >
                      {isCustomDept ? '← Choose Existing' : '+ Type Custom Dept'}
                    </button>
                  </div>

                  {isCustomDept ? (
                    <div>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Type custom dept name (e.g. Aerospace Engineering, Drone Technology)..."
                        value={courseForm.department}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        required
                        autoFocus
                      />
                      <div style={{
                        marginTop: '6px',
                        fontSize: '11.5px',
                        color: '#f0abfc',
                        background: 'rgba(217, 70, 239, 0.1)',
                        border: '1px solid rgba(217, 70, 239, 0.25)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span>✨</span>
                        <span>
                          Creates a dedicated section for <strong>&quot;{courseForm.department || 'this custom department'}&quot;</strong>. Only courses added to this custom dept will appear in that new section!
                        </span>
                      </div>
                    </div>
                  ) : (
                    <select
                      className="admin-input"
                      value={courseForm.department}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomDept(true);
                          setCourseForm(prev => ({ ...prev, department: '' }));
                        } else {
                          handleDepartmentChange(e.target.value);
                        }
                      }}
                    >
                      {allDepartments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                      <option value="__custom__">➕ Type Custom Department Name...</option>
                    </select>
                  )}
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Skill Level *</label>
                  <select
                    className="admin-input"
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                  >
                    <option value="Beginner → Advanced">Beginner → Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Intermediate → Advanced">Intermediate → Advanced</option>
                    <option value="Advanced">Advanced (Professional)</option>
                    <option value="All Levels">All Levels (Comprehensive)</option>
                  </select>
                </div>
              </div>

              {/* Duration & Badge */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Duration *</label>
                  <input
                    type="text"
                    className="admin-input"
                    required
                    placeholder="e.g. 3 Months, 6 Weeks"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Badge / Highlight Tag</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. MOST POPULAR, HIGH DEMAND, NEW"
                    value={courseForm.badge}
                    onChange={(e) => setCourseForm({ ...courseForm, badge: e.target.value })}
                  />
                </div>
              </div>

              {/* Software Modules / Curriculum */}
              <div className="admin-form-group">
                <label className="admin-label">Software Modules / Skills Covered (Optional)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. 8 Software modules (SolidWorks, CATIA, AutoCAD, ANSYS, GD&amp;T)"
                  value={courseForm.modules}
                  onChange={(e) => setCourseForm({ ...courseForm, modules: e.target.value })}
                />
              </div>

              {/* Curated Discipline Checkbox */}
              <div className="admin-form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#e2e8f0' }}>
                  <input
                    type="checkbox"
                    checked={courseForm.isDiscipline}
                    onChange={(e) => setCourseForm({ ...courseForm, isDiscipline: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#a855f7', cursor: 'pointer' }}
                  />
                  <span>Feature in Navbar <strong>CURATED DISCIPLINES</strong> Menu</span>
                </label>
              </div>

              {/* Training Delivery Mode & Route Link */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Training Delivery Mode</label>
                  <select
                    className="admin-input"
                    value={courseForm.mode}
                    onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value })}
                  >
                    <option value="Classroom Studio & Live Online">Classroom Studio &amp; Live Online</option>
                    <option value="Workstation Lab (Classroom)">Workstation Lab (Classroom)</option>
                    <option value="Workshop Floor (Physical CNC/PLC)">Workshop Floor (Physical CNC/PLC)</option>
                    <option value="Hybrid (Studio + 24/7 Lab)">Hybrid (Studio + 24/7 Lab)</option>
                    <option value="Live Interactive Online">Live Interactive Online</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Website Route / Page Link</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="/mechanical, /civil-engineering..."
                    value={courseForm.link}
                    onChange={(e) => setCourseForm({ ...courseForm, link: e.target.value })}
                  />
                </div>
              </div>

              {/* Description / Highlights */}
              <div className="admin-form-group">
                <label className="admin-label">Course Description &amp; Highlights *</label>
                <textarea
                  className="admin-textarea"
                  rows={3}
                  required
                  placeholder="Summarize course outcomes, industry assembly projects, and drafting competencies..."
                  value={courseForm.desc}
                  onChange={(e) => setCourseForm({ ...courseForm, desc: e.target.value })}
                />
              </div>

              {/* Course Thumbnail Image Upload */}
              <div className="admin-form-group">
                <label className="admin-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Course Thumbnail / Media</span>
                  <span style={{ fontSize: '12px', color: '#34d399' }}>Cloudinary &amp; Local Auto-Compress</span>
                </label>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCourseImageUpload}
                    style={{
                      fontSize: '13px',
                      color: '#cbd5e1',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  />
                  {uploadingImage && <span style={{ fontSize: '13px', color: '#c084fc' }}>Uploading...</span>}
                </div>

                {courseForm.image && (
                  <div style={{ position: 'relative', width: '120px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(139, 92, 246, 0.4)', marginTop: '8px' }}>
                    <img
                      src={courseForm.image}
                      alt="Course Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => setCourseForm(prev => ({ ...prev, image: '' }))}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: 'rgba(0,0,0,0.7)',
                        color: '#ff6b6b',
                        border: 'none',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{
                    boxShadow: '0 4px 15px rgba(217, 70, 239, 0.4)'
                  }}
                >
                  {editingCourse ? 'Save Changes' : 'Publish Course to Website & MongoDB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CREATE NEW DEPARTMENT SECTION
          ======================================================== */}
      {isNewDeptModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsNewDeptModalOpen(false)}>
          <div
            className="admin-modal"
            style={{ maxWidth: '480px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '19px', fontWeight: '800', color: '#fff' }}>
                  ✨ Create New Department Section
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
                  Generates a dedicated department section on the courses page where only its courses will be added.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewDeptModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateNewDeptSection(newDeptInput);
            }}>
              <div className="admin-form-group">
                <label className="admin-label">Department / Discipline Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  autoFocus
                  placeholder="e.g. Aerospace Engineering, Drone Technology, Mechatronics..."
                  value={newDeptInput}
                  onChange={(e) => setNewDeptInput(e.target.value)}
                />
              </div>

              <div style={{
                background: 'rgba(217, 70, 239, 0.1)',
                border: '1px solid rgba(217, 70, 239, 0.25)',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#f0abfc',
                lineHeight: 1.5
              }}>
                💡 Once created, a brand new department section is created on this page. Clicking <strong>&quot;+ Add Course to {newDeptInput || 'this dept'}&quot;</strong> will add courses exclusively to this new section.
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsNewDeptModalOpen(false)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #d946ef, #8b5cf6)',
                    boxShadow: '0 4px 15px rgba(217, 70, 239, 0.4)'
                  }}
                >
                  Create Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
