import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingElements from './components/FloatingElements.jsx';
import EnrollModal from './components/EnrollModal.jsx';
import IntroSplash from './components/IntroSplash.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Mechanical from './pages/Mechanical.jsx';
import CivilEngineering from './pages/CivilEngineering.jsx';
import CncProgramming from './pages/CncProgramming.jsx';
import ComputerScience from './pages/ComputerScience.jsx';
import EeeInstrumentation from './pages/EeeInstrumentation.jsx';
import EceCommunication from './pages/EceCommunication.jsx';
import PipingEngineering from './pages/PipingEngineering.jsx';
import FlagshipMou from './pages/FlagshipMou.jsx';
import FlagshipPlacement from './pages/FlagshipPlacement.jsx';
import FlagshipGallery from './pages/FlagshipGallery.jsx';
import FlagshipBlog from './pages/FlagshipBlog.jsx';
import InternshipPrograms from './pages/InternshipPrograms.jsx';
import AiInternship from './pages/AiInternship.jsx';
import SummerInternship from './pages/SummerInternship.jsx';
import CollegeInternship from './pages/CollegeInternship.jsx';
import DataScienceInternship from './pages/DataScienceInternship.jsx';
import MachineLearningInternship from './pages/MachineLearningInternship.jsx';
import CertificateVerification from './pages/CertificateVerification.jsx';
import ContactUs from './pages/ContactUs.jsx';
import SkillTest from './pages/SkillTest.jsx';
import ShowcaseVideo from './pages/ShowcaseVideo.jsx';
import DepartmentPage from './pages/DepartmentPage.jsx';
import InternshipDetailPage from './pages/InternshipDetailPage.jsx';

// Admin Portal Pages
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminEnrollments from './pages/admin/AdminEnrollments.jsx';
import AdminCourses from './pages/admin/AdminCourses.jsx';
import AdminInternships from './pages/admin/AdminInternships.jsx';
import AdminPartners from './pages/admin/AdminPartners.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import AdminMouManager from './pages/admin/AdminMouManager.jsx';
import AdminGalleryManager from './pages/admin/AdminGalleryManager.jsx';
import AdminPlacementManager from './pages/admin/AdminPlacementManager.jsx';
import AdminBlogManager from './pages/admin/AdminBlogManager.jsx';
import AdminCertificateManager from './pages/admin/AdminCertificateManager.jsx';
import AdminLeaderManager from './pages/admin/AdminLeaderManager.jsx';
import AdminHomeCustomizer from './pages/admin/AdminHomeCustomizer.jsx';
import AdminSkillTest from './pages/admin/AdminSkillTest.jsx';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const location = useLocation();

  const isAuthOrAdmin =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/dashboard' ||
    location.pathname === '/verify-otp';

  // Automatically prompt EnrollModal on initial visit after intro completes smoothly
  useEffect(() => {
    if (!isAuthOrAdmin && !sessionStorage.getItem('gv_enrolled')) {
      const timer = setTimeout(() => {
        setIsEnrollModalOpen(true);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [isAuthOrAdmin]);

  // Ensure every route transition scrolls smoothly to top of page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState('');

  const openModal = (courseNameOrDetails = '') => {
    let courseTitle = '';
    let coursePayload = null;

    if (typeof courseNameOrDetails === 'string') {
      courseTitle = courseNameOrDetails.trim();
      coursePayload = courseTitle;
    } else if (courseNameOrDetails && typeof courseNameOrDetails === 'object' && !courseNameOrDetails.nativeEvent && !courseNameOrDetails.target) {
      courseTitle = courseNameOrDetails.title || courseNameOrDetails.program || courseNameOrDetails.department || '';
      coursePayload = courseNameOrDetails;
    }

    // If no course explicitly passed, intelligently default to the active page's course or internship program!
    if (!courseTitle) {
      const p = (location.pathname || '').toLowerCase();
      if (p.includes('/internship/ai')) courseTitle = 'AI & Artificial Intelligence Internship';
      else if (p.includes('/internship/datascience')) courseTitle = 'Data Science & Analytics Internship';
      else if (p.includes('/internship/machinelearning')) courseTitle = 'Machine Learning & Deep Learning Internship';
      else if (p.includes('/internship/summer')) courseTitle = 'Summer Internship for Engineering Students';
      else if (p.includes('/internship/college')) courseTitle = 'College In-Plant Internship Training';
      else if (p.startsWith('/internship')) courseTitle = 'Industrial Internship Program';
      else if (p.includes('/civil')) courseTitle = 'Civil Engineering & BIM';
      else if (p.includes('/mechanical')) courseTitle = 'Mechanical & Automobile';
      else if (p.includes('/cnc')) courseTitle = 'CNC Programming & CAM';
      else if (p.includes('/computer-science') || p.includes('/artificial')) courseTitle = 'Computer Science & IT';
      else if (p.includes('/eee') || p.includes('/instrumentation')) courseTitle = 'EEE & Automation';
      else if (p.includes('/ece') || p.includes('/electronics')) courseTitle = 'ECE Embedded & IoT';
      else if (p.includes('/piping')) courseTitle = 'Piping Engineering (Oil & Gas)';
      else if (p.startsWith('/department/') || p.startsWith('/discipline/') || p.startsWith('/curriculum/')) {
        const rawSlug = p.split('/')[2] || 'Specialized Track';
        courseTitle = decodeURIComponent(rawSlug).toUpperCase();
      }
      coursePayload = courseTitle;
    }

    setSelectedCourseForEnroll(coursePayload || courseTitle);
    setIsEnrollModalOpen(true);
  };

  return (
    <div className="App">
      {!isAuthOrAdmin && showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}
      {!isAuthOrAdmin && <Navbar />}
      {!isAuthOrAdmin && <FloatingElements />}

      <Routes>
        <Route path="/" element={<Home onOpenModal={openModal} />} />
        <Route path="/about" element={<About onOpenModal={openModal} />} />
        
        {/* Core CAD, BIM & Engineering Courses */}
        <Route path="/mechanical" element={<Mechanical onOpenModal={openModal} />} />
        <Route path="/datascience" element={<Mechanical onOpenModal={openModal} />} />
        
        <Route path="/civil-engineering" element={<CivilEngineering onOpenModal={openModal} />} />
        <Route path="/civil" element={<CivilEngineering onOpenModal={openModal} />} />
        <Route path="/dataanalytics" element={<CivilEngineering onOpenModal={openModal} />} />
        
        <Route path="/cnc-programming" element={<CncProgramming onOpenModal={openModal} />} />
        <Route path="/machinelearning" element={<CncProgramming onOpenModal={openModal} />} />
        
        <Route path="/computer-science" element={<ComputerScience onOpenModal={openModal} />} />
        <Route path="/Artificial" element={<ComputerScience onOpenModal={openModal} />} />
        
        <Route path="/eee-instrumentation" element={<EeeInstrumentation onOpenModal={openModal} />} />
        <Route path="/eee" element={<EeeInstrumentation onOpenModal={openModal} />} />
        <Route path="/instrumentation" element={<EeeInstrumentation onOpenModal={openModal} />} />
        
        <Route path="/ece" element={<EceCommunication onOpenModal={openModal} />} />
        <Route path="/ece-communication" element={<EceCommunication onOpenModal={openModal} />} />
        <Route path="/electronics" element={<EceCommunication onOpenModal={openModal} />} />
        
        <Route path="/piping-engineering" element={<PipingEngineering onOpenModal={openModal} />} />
        <Route path="/piping" element={<PipingEngineering onOpenModal={openModal} />} />
        <Route path="/piping-design" element={<PipingEngineering onOpenModal={openModal} />} />
        
        {/* Flagship */}
        <Route path="/flagship/mou" element={<FlagshipMou onOpenModal={openModal} />} />
        <Route path="/flagship/Placement" element={<FlagshipPlacement onOpenModal={openModal} />} />
        <Route path="/flagship/placement" element={<FlagshipPlacement onOpenModal={openModal} />} />
        <Route path="/flagship/galleryPage" element={<FlagshipGallery onOpenModal={openModal} />} />
        <Route path="/flagship/Blog-page" element={<FlagshipBlog />} />
        
        {/* Internships */}
        <Route path="/internship" element={<InternshipPrograms onOpenModal={openModal} />} />
        <Route path="/internships" element={<InternshipPrograms onOpenModal={openModal} />} />
        <Route path="/internship/aiInternship" element={<AiInternship onOpenModal={openModal} />} />
        <Route path="/internship/ai" element={<AiInternship onOpenModal={openModal} />} />
        <Route path="/internship/summerinternship" element={<SummerInternship onOpenModal={openModal} />} />
        <Route path="/internship/summer" element={<SummerInternship onOpenModal={openModal} />} />
        <Route path="/internship/college" element={<CollegeInternship onOpenModal={openModal} />} />
        <Route path="/internship/datascience" element={<DataScienceInternship onOpenModal={openModal} />} />
        <Route path="/internship/Machinelearning" element={<MachineLearningInternship onOpenModal={openModal} />} />
        <Route path="/internship/machinelearning" element={<MachineLearningInternship onOpenModal={openModal} />} />
        {/* Dynamic Dedicated Pages for Any Admin-Created Internship Programs */}
        <Route path="/internship/:programSlug" element={<InternshipDetailPage onOpenModal={openModal} />} />
        <Route path="/internships/:programSlug" element={<InternshipDetailPage onOpenModal={openModal} />} />
        <Route path="/interahip/:programSlug" element={<InternshipDetailPage onOpenModal={openModal} />} />
        <Route path="/intership/:programSlug" element={<InternshipDetailPage onOpenModal={openModal} />} />

        {/* Core Verification, Contact, Skill Test */}
        <Route path="/certificate-verification" element={<CertificateVerification />} />
        <Route path="/Contactus" element={<ContactUs />} />
        <Route path="/pest-exam" element={<SkillTest />} />
        <Route path="/skill-test" element={<SkillTest />} />
        <Route path="/skill-assessment" element={<SkillTest />} />
        <Route path="/showcase-video" element={<ShowcaseVideo />} />

        {/* Dynamic Dedicated Department & Custom Section Pages */}
        <Route path="/department/:deptSlug" element={<DepartmentPage onOpenModal={openModal} />} />
        <Route path="/discipline/:deptSlug" element={<DepartmentPage onOpenModal={openModal} />} />
        <Route path="/curriculum/:deptSlug" element={<DepartmentPage onOpenModal={openModal} />} />

        {/* Admin Portal Protected Routing */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="internships" element={<AdminInternships />} />
          <Route path="skill-test" element={<AdminSkillTest />} />
          <Route path="pest-exam" element={<AdminSkillTest />} />
          <Route path="skill-tests" element={<AdminSkillTest />} />
          <Route path="partners" element={<AdminMouManager />} />
          <Route path="mou" element={<AdminMouManager />} />
          <Route path="mous" element={<AdminMouManager />} />
          <Route path="content-leaders" element={<AdminLeaderManager />} />
          <Route path="leaders" element={<AdminLeaderManager />} />
          <Route path="content-mou" element={<AdminMouManager />} />
          <Route path="content-gallery" element={<AdminGalleryManager />} />
          <Route path="gallery" element={<AdminGalleryManager />} />
          <Route path="content-placement" element={<AdminPlacementManager />} />
          <Route path="placement" element={<AdminPlacementManager />} />
          <Route path="placements" element={<AdminPlacementManager />} />
          <Route path="content-blog" element={<AdminBlogManager />} />
          <Route path="blog" element={<AdminBlogManager />} />
          <Route path="blogs" element={<AdminBlogManager />} />
          <Route path="content-certificates" element={<AdminCertificateManager />} />
          <Route path="certificates" element={<AdminCertificateManager />} />
          <Route path="contact-info" element={<AdminHomeCustomizer initialTab="contactInfo" />} />
          <Route path="headquarters" element={<AdminHomeCustomizer initialTab="contactInfo" />} />
          <Route path="contact" element={<AdminHomeCustomizer initialTab="contactInfo" />} />
          <Route path="demo-video" element={<AdminHomeCustomizer initialTab="demoVideo" />} />
          <Route path="recent-activities" element={<AdminHomeCustomizer initialTab="recentActivity" />} />
          <Route path="impact-stats" element={<AdminHomeCustomizer initialTab="stats" />} />
          <Route path="lab-photos" element={<AdminHomeCustomizer initialTab="showcaseImages" />} />
          <Route path="enroll-form" element={<AdminHomeCustomizer initialTab="enrollModal" />} />
          <Route path="specializations" element={<AdminHomeCustomizer initialTab="specializations" />} />
          <Route path="specialization" element={<AdminHomeCustomizer initialTab="specializations" />} />
          <Route path="home-customizer" element={<AdminHomeCustomizer />} />
          <Route path="showcase-customizer" element={<AdminHomeCustomizer />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Route aliases for flagship pages */}
        <Route path="/mou" element={<Navigate to="/flagship/mou" replace />} />
        <Route path="/gallery" element={<Navigate to="/flagship/galleryPage" replace />} />
        <Route path="/flagship/gallery" element={<Navigate to="/flagship/galleryPage" replace />} />
        <Route path="/placement" element={<Navigate to="/flagship/Placement" replace />} />
        <Route path="/placements" element={<Navigate to="/flagship/Placement" replace />} />
        <Route path="/blog" element={<Navigate to="/flagship/Blog-page" replace />} />
        <Route path="/blogs" element={<Navigate to="/flagship/Blog-page" replace />} />
        <Route path="/flagship/blog" element={<Navigate to="/flagship/Blog-page" replace />} />
        <Route path="/flagship/blogs" element={<Navigate to="/flagship/Blog-page" replace />} />

        {/* Redirect removed auth routes to Home */}
        <Route path="/Login" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/Register" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Home onOpenModal={openModal} />} />
      </Routes>

      {!isAuthOrAdmin && <Footer />}

      {!isAuthOrAdmin && (
        <EnrollModal
          isOpen={isEnrollModalOpen}
          onClose={() => {
            setIsEnrollModalOpen(false);
            setSelectedCourseForEnroll('');
          }}
          initialProgram={selectedCourseForEnroll}
        />
      )}
    </div>
  );
}
