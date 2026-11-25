import React, { useState, useEffect } from 'react';
import { getStoredCourses, saveStoredCourses, subscribeToContentUpdates } from '../../data/contentPersistence.js';
import { getStoredBatches, saveStoredBatches } from '../../data/adminInitialData.js';
import { uploadImageToCloudinary, compressImageFile } from '../../services/cloudinaryService.js';
import { fetchCoursesFromMongo, deleteCourseInMongo } from '../../services/mongoService.js';

export default function AdminCourses() {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'batches'

  // --- Courses State ---
  const [courses, setCourses] = useState(() => getStoredCourses());
  const [courseSearch, setCourseSearch] = useState('');
  const [filterCourseDept, setFilterCourseDept] = useState('all');
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  // --- Batches State ---
  const [batches, setBatches] = useState(() => getStoredBatches());
  const [filterBatchDept, setFilterBatchDept] = useState('all');
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({
    department: 'Mechanical',
    courseName: 'SolidWorks & CATIA Masterclass',
    startDate: '',
    timing: 'Morning Batch (09:30 AM - 12:30 PM)',
    mode: 'Classroom Studio',
    totalSeats: 20,
    filledSeats: 0,
    status: 'Upcoming'
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
      if (mongoList && Array.isArray(mongoList) && mongoList.length > 0) {
        setCourses(mongoList);
        saveStoredCourses(mongoList);
      } else {
        setCourses(getStoredCourses());
      }
    }
    loadMongoCourses();

    const unsubscribe = subscribeToContentUpdates(() => {
      setCourses(getStoredCourses());
      setBatches(getStoredBatches());
    });

    return () => unsubscribe();
  }, []);

  // --- Courses Handlers ---
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({
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
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title || '',
      department: course.department || 'Mechanical & Automobile',
      category: course.category || 'Mechanical',
      duration: course.duration || '3 Months',
      level: course.level || 'Beginner → Advanced',
      badge: course.badge || '',
      modules: course.modules || '',
      desc: course.desc || '',
      link: course.link || '/mechanical',
      mode: course.mode || 'Classroom Studio & Live Online',
      image: course.image || ''
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
      // 1. Instant local compression (<40KB) for instant preview and zero-delay save
      const compressedData = await compressImageFile(file);
      setCourseForm(prev => ({ ...prev, image: compressedData }));
      showToast('📷 Image attached! Syncing to cloud storage...');

      // 2. Upload to Cloudinary in background
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

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) {
      alert('Please enter a course title');
      return;
    }

    if (editingCourse) {
      const updated = courses.map(c => {
        if ((editingCourse.id && c.id === editingCourse.id) || (editingCourse._id && c._id === editingCourse._id)) {
          return {
            ...c,
            ...courseForm,
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      });
      setCourses(updated);
      saveStoredCourses(updated);
      showToast(`Updated course "${courseForm.title}"`);
    } else {
      const newEntry = {
        ...courseForm,
        id: `course-${Date.now()}`,
        order: courses.length + 1,
        createdAt: new Date().toISOString()
      };
      const updated = [newEntry, ...courses];
      setCourses(updated);
      saveStoredCourses(updated);
      showToast(`Added new course "${courseForm.title}" to MongoDB & Website!`);
    }

    setIsCourseModalOpen(false);
  };

  // --- Batches Handlers ---
  const handleSeatChange = (id, delta) => {
    const updated = batches.map(b => {
      if (b.id === id) {
        const next = Math.max(0, Math.min(b.totalSeats, b.filledSeats + delta));
        let nextStatus = b.status;
        if (next === b.totalSeats) nextStatus = 'Housefull';
        else if (next >= b.totalSeats * 0.8) nextStatus = 'Almost Full';
        else if (next >= b.totalSeats * 0.5) nextStatus = 'Filling Fast';
        return { ...b, filledSeats: next, status: nextStatus };
      }
      return b;
    });
    setBatches(updated);
    saveStoredBatches(updated);
  };

  const handleDeleteBatch = (id) => {
    if (window.confirm('Delete this batch cohort?')) {
      const updated = batches.filter(b => b.id !== id);
      setBatches(updated);
      saveStoredBatches(updated);
      showToast('Deleted batch cohort');
    }
  };

  const handleCreateBatchSubmit = (e) => {
    e.preventDefault();
    if (!newBatch.courseName.trim() || !newBatch.startDate) {
      alert('Please fill out course name and start date');
      return;
    }

    const created = {
      ...newBatch,
      id: 'batch-' + Date.now(),
      totalSeats: parseInt(newBatch.totalSeats) || 20,
      filledSeats: parseInt(newBatch.filledSeats) || 0
    };

    const updated = [created, ...batches];
    setBatches(updated);
    saveStoredBatches(updated);
    setIsBatchModalOpen(false);
    showToast(`Scheduled batch for "${newBatch.courseName}"`);
  };

  // Filtered lists
  const filteredCourses = courses.filter(c => {
    const matchesDept = filterCourseDept === 'all' ||
      (c.department && c.department.toLowerCase().includes(filterCourseDept.toLowerCase())) ||
      (c.category && c.category.toLowerCase().includes(filterCourseDept.toLowerCase()));
    const matchesSearch = !courseSearch.trim() ||
      (c.title && c.title.toLowerCase().includes(courseSearch.toLowerCase())) ||
      (c.modules && c.modules.toLowerCase().includes(courseSearch.toLowerCase())) ||
      (c.desc && c.desc.toLowerCase().includes(courseSearch.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const filteredBatches = filterBatchDept === 'all'
    ? batches
    : batches.filter(b => b.department.toLowerCase().includes(filterBatchDept.toLowerCase()));

  // Department link mapper helper
  const handleDepartmentChange = (dept) => {
    let link = '/mechanical';
    let cat = 'Mechanical';
    if (dept.includes('Civil')) { link = '/civil-engineering'; cat = 'Civil'; }
    else if (dept.includes('CNC')) { link = '/cnc-programming'; cat = 'CNC'; }
    else if (dept.includes('Computer')) { link = '/computer-science'; cat = 'Computer Science'; }
    else if (dept.includes('EEE')) { link = '/eee-instrumentation'; cat = 'Electrical'; }
    else if (dept.includes('ECE')) { link = '/ece'; cat = 'Electronics'; }
    else if (dept.includes('Piping')) { link = '/piping-engineering'; cat = 'Piping'; }

    setCourseForm(prev => ({
      ...prev,
      department: dept,
      category: cat,
      link: prev.link === '/mechanical' ? link : prev.link
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Courses &amp; Curriculum Management</span>
            <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '999px', color: '#34d399' }}>
              🍃 MongoDB Active
            </span>
            <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc' }}>
              ⚡ Live Sync Enabled
            </span>
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
            Add, update, and manage official training programs, software tracks, and cohort batch schedules across all disciplines.
          </p>
        </div>

        {/* Tab Navigation Pill */}
        <div style={{
          display: 'flex',
          background: 'rgba(15, 13, 36, 0.8)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            style={{
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'courses' ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'transparent',
              color: activeTab === 'courses' ? '#fff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '13.5px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🎓 All Courses</span>
            <span style={{
              background: activeTab === 'courses' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.08)',
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '11.5px'
            }}>
              {courses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batches')}
            style={{
              padding: '8px 18px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'batches' ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'transparent',
              color: activeTab === 'batches' ? '#fff' : '#94a3b8',
              fontWeight: '700',
              fontSize: '13.5px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>⏱️ Batch Schedules</span>
            <span style={{
              background: activeTab === 'batches' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.08)',
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '11.5px'
            }}>
              {batches.length}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB 1: COURSES & CURRICULUM
          ======================================================== */}
      {activeTab === 'courses' && (
        <div>
          {/* Courses Toolbar */}
          <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
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

              {/* Department Filter */}
              <select
                className="admin-select"
                value={filterCourseDept}
                onChange={(e) => setFilterCourseDept(e.target.value)}
                style={{ height: '40px' }}
              >
                <option value="all">All Disciplines &amp; Tracks</option>
                <option value="Mechanical">Mechanical &amp; Automobile</option>
                <option value="Civil">Civil Engineering &amp; BIM</option>
                <option value="CNC">CNC Programming &amp; CAM</option>
                <option value="Computer">Computer Science &amp; IT</option>
                <option value="EEE">EEE &amp; Automation</option>
                <option value="ECE">ECE Embedded &amp; IoT</option>
                <option value="Piping">Piping Engineering (Oil &amp; Gas)</option>
              </select>

              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Showing {filteredCourses.length} courses
              </span>
            </div>

            {/* Primary Action: + Add New Course */}
            <button
              type="button"
              onClick={handleOpenAddCourse}
              className="admin-btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                fontSize: '14px',
                fontWeight: '700',
                boxShadow: '0 4px 15px rgba(217, 70, 239, 0.35)'
              }}
            >
              <span>+ Add New Course</span>
            </button>
          </div>

          {/* Courses Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px'
          }}>
            {filteredCourses.map((c, idx) => {
              const displayImg = c.image || '/assets/mech-cad.jpg';

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
                        <span>📐</span>
                        <span style={{ fontSize: '12px', fontWeight: '700', marginTop: '6px', color: '#e2e8f0' }}>
                          {c.department || 'Curated Course'}
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
                      {c.department || c.category || 'Engineering'}
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
                      fontSize: '17px',
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
                        href={c.link || '/mechanical'}
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

                      <div style={{ display: 'flex', gap: '8px' }}>
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

          {filteredCourses.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(15, 13, 36, 0.5)',
              borderRadius: '16px',
              border: '1px dashed rgba(139, 92, 246, 0.3)'
            }}>
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ color: '#fff', fontSize: '18px', margin: '0 0 6px' }}>No courses match your criteria</h4>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 16px' }}>Try adjusting your search terms or department filter.</p>
              <button
                type="button"
                onClick={handleOpenAddCourse}
                className="admin-btn-primary"
              >
                + Add New Course Offering
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: BATCH SCHEDULES & SEATS
          ======================================================== */}
      {activeTab === 'batches' && (
        <div>
          {/* Batches Toolbar */}
          <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select
                className="admin-select"
                value={filterBatchDept}
                onChange={(e) => setFilterBatchDept(e.target.value)}
                style={{ height: '40px' }}
              >
                <option value="all">All Departments</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil &amp; BIM</option>
                <option value="CNC">CNC Machining</option>
                <option value="Computer">Computer Science</option>
                <option value="EEE">EEE &amp; Automation</option>
                <option value="Piping">Piping Engineering</option>
              </select>

              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Showing {filteredBatches.length} active cohorts
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsBatchModalOpen(true)}
              className="admin-btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                fontSize: '14px',
                fontWeight: '700'
              }}
            >
              + Schedule New Batch
            </button>
          </div>

          {/* Batches Grid */}
          <div className="admin-batch-grid">
            {filteredBatches.map((b) => {
              const percent = Math.round((b.filledSeats / b.totalSeats) * 100);
              return (
                <div key={b.id} className="admin-batch-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc', textTransform: 'uppercase' }}>
                        {b.department}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.35)', borderRadius: '999px', color: '#f472b6' }}>
                        {b.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', margin: '0 0 8px', lineHeight: 1.35 }}>
                      {b.courseName}
                    </h3>

                    <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '18px' }}>
                      <div>📅 Starts: <strong style={{ color: '#fff' }}>{b.startDate}</strong></div>
                      <div>⏰ Timing: <span style={{ color: '#cbd5e1' }}>{b.timing}</span></div>
                      <div>🏢 Mode: <span style={{ color: '#22d3ee' }}>{b.mode}</span></div>
                    </div>
                  </div>

                  {/* Progress & Seat Controls */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                      <span style={{ color: '#94a3b8' }}>Seats Booked</span>
                      <span style={{ color: '#fff', fontWeight: '700' }}>
                        {b.filledSeats} / {b.totalSeats} ({percent}%)
                      </span>
                    </div>

                    <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: `${percent}%`,
                          height: '100%',
                          background: percent > 85 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                          borderRadius: '999px',
                          transition: 'width 0.3s ease'
                        }}
                      ></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleSeatChange(b.id, -1)}
                          style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}
                          title="Decrease seats filled"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSeatChange(b.id, 1)}
                          style={{ padding: '4px 10px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#c084fc', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}
                          title="Increase seats filled"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteBatch(b.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer' }}
                      >
                        Delete Batch
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
                  <label className="admin-label">Discipline / Department *</label>
                  <select
                    className="admin-input"
                    value={courseForm.department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                  >
                    <option value="Mechanical & Automobile">Mechanical &amp; Automobile</option>
                    <option value="Civil Engineering">Civil Engineering &amp; BIM</option>
                    <option value="CNC Programming">CNC Programming &amp; CAM</option>
                    <option value="Computer Science & IT">Computer Science &amp; IT</option>
                    <option value="EEE/Instrumentation">EEE &amp; Automation</option>
                    <option value="ECE">ECE Embedded &amp; IoT</option>
                    <option value="Piping (Oil & Gas)">Piping Engineering (Oil &amp; Gas)</option>
                    <option value="Robotics & Automation">Robotics &amp; Automation</option>
                    <option value="AI & Data Science">AI &amp; Data Science</option>
                  </select>
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
                <label className="admin-label">Software Modules / Skills Covered *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. 8 Software modules (SolidWorks, CATIA, AutoCAD, ANSYS, GD&amp;T)"
                  value={courseForm.modules}
                  onChange={(e) => setCourseForm({ ...courseForm, modules: e.target.value })}
                />
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
          MODAL: SCHEDULE NEW BATCH
          ======================================================== */}
      {isBatchModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsBatchModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#fff' }}>Schedule New Course Cohort</h3>
              <button type="button" onClick={() => setIsBatchModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleCreateBatchSubmit}>
              <div className="admin-form-group">
                <label className="admin-label">Department</label>
                <select
                  className="admin-input"
                  value={newBatch.department}
                  onChange={(e) => setNewBatch({ ...newBatch, department: e.target.value })}
                >
                  <option value="Mechanical">Mechanical &amp; Automobile</option>
                  <option value="Civil">Civil &amp; BIM</option>
                  <option value="CNC">CNC Machining &amp; CAM</option>
                  <option value="Computer Science">Computer Science &amp; Full Stack</option>
                  <option value="EEE & Automation">EEE &amp; Automation</option>
                  <option value="ECE Embedded">ECE Embedded &amp; IoT</option>
                  <option value="Piping">Piping Engineering</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Course / Track Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  required
                  placeholder="e.g. Master Mechanical CAD &amp; FEA Analysis"
                  value={newBatch.courseName}
                  onChange={(e) => setNewBatch({ ...newBatch, courseName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Batch Start Date *</label>
                  <input
                    type="date"
                    className="admin-input"
                    required
                    value={newBatch.startDate}
                    onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Intake Capacity (Seats)</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    className="admin-input"
                    value={newBatch.totalSeats}
                    onChange={(e) => setNewBatch({ ...newBatch, totalSeats: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Timing &amp; Schedule</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Regular Morning Batch (09:30 AM - 12:30 PM)"
                  value={newBatch.timing}
                  onChange={(e) => setNewBatch({ ...newBatch, timing: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Training Delivery Mode</label>
                <select
                  className="admin-input"
                  value={newBatch.mode}
                  onChange={(e) => setNewBatch({ ...newBatch, mode: e.target.value })}
                >
                  <option value="Classroom Studio">Classroom Studio (Workstation Lab)</option>
                  <option value="Hybrid Lab">Hybrid Lab (Studio + Remote 24/7)</option>
                  <option value="Workshop Floor">Workshop Floor (Physical CNC/PLC)</option>
                  <option value="Live Interactive Online">Live Interactive Online</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" onClick={() => setIsBatchModalOpen(false)} className="admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Publish Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
