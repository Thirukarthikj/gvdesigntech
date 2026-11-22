import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingElements from './components/FloatingElements.jsx';
import EnrollModal from './components/EnrollModal.jsx';
import IntroSplash from './components/IntroSplash.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import DataScience from './pages/DataScience.jsx';
import DataAnalytics from './pages/DataAnalytics.jsx';
import ArtificialIntelligence from './pages/ArtificialIntelligence.jsx';
import MachineLearning from './pages/MachineLearning.jsx';
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
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PybotVideo from './pages/PybotVideo.jsx';

export default function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const location = useLocation();

  const isAuthOrAdmin =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/Login' ||
    location.pathname === '/Register' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/verify-otp';

  // Automatically prompt EnrollModal on initial visit after intro splash finishes + 2.5s
  useEffect(() => {
    if (!isIntroActive && !sessionStorage.getItem('pybot_enrolled')) {
      const timer = setTimeout(() => {
        setIsEnrollModalOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isIntroActive]);

  const openModal = () => setIsEnrollModalOpen(true);

  return (
    <div className="App">
      {isIntroActive && (
        <IntroSplash onFinish={() => setIsIntroActive(false)} />
      )}
      {!isAuthOrAdmin && <Navbar />}
      {!isAuthOrAdmin && <FloatingElements />}

      <Routes>
        <Route path="/" element={<Home onOpenModal={openModal} />} />
        <Route path="/about" element={<About onOpenModal={openModal} />} />
        <Route path="/datascience" element={<DataScience onOpenModal={openModal} />} />
        <Route path="/dataanalytics" element={<DataAnalytics onOpenModal={openModal} />} />
        <Route path="/Artificial" element={<ArtificialIntelligence onOpenModal={openModal} />} />
        <Route path="/machinelearning" element={<MachineLearning onOpenModal={openModal} />} />
        
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
        <Route path="/Pybot-video" element={<PybotVideo />} />

        {/* Auth */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

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
