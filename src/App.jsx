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
import AiInternship from './pages/AiInternship.jsx';
import SummerInternship from './pages/SummerInternship.jsx';
import CollegeInternship from './pages/CollegeInternship.jsx';
import DataScienceInternship from './pages/DataScienceInternship.jsx';
import MachineLearningInternship from './pages/MachineLearningInternship.jsx';
import CertificateVerification from './pages/CertificateVerification.jsx';
import ContactUs from './pages/ContactUs.jsx';
import SkillTest from './pages/SkillTest.jsx';
import ShowcaseVideo from './pages/ShowcaseVideo.jsx';

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
    if (!sessionStorage.getItem('gv_enrolled')) {
      const timer = setTimeout(() => {
        setIsEnrollModalOpen(true);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, []);

  const openModal = () => setIsEnrollModalOpen(true);

  return (
    <div className="App">
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}
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
        <Route path="/internship/aiInternship" element={<AiInternship onOpenModal={openModal} />} />
        <Route path="/internship/summerinternship" element={<SummerInternship onOpenModal={openModal} />} />
        <Route path="/internship/college" element={<CollegeInternship onOpenModal={openModal} />} />
        <Route path="/internship/datascience" element={<DataScienceInternship onOpenModal={openModal} />} />
        <Route path="/internship/Machinelearning" element={<MachineLearningInternship onOpenModal={openModal} />} />

        {/* Core Verification, Contact, Skill Test */}
        <Route path="/certificate-verification" element={<CertificateVerification />} />
        <Route path="/Contactus" element={<ContactUs />} />
        <Route path="/pest-exam" element={<SkillTest />} />
        <Route path="/showcase-video" element={<ShowcaseVideo />} />
        <Route path="/Pybot-video" element={<ShowcaseVideo />} />

        {/* Redirect removed auth routes to Home */}
        <Route path="/Login" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/Register" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Home onOpenModal={openModal} />} />
      </Routes>

      {!isAuthOrAdmin && <Footer />}

      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  );
}
