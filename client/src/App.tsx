import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EnquiryModalProvider } from './context/EnquiryModalContext';
import { Layout } from './components/layout/Layout';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AllCoursesPage } from './pages/AllCoursesPage';
import { ComputerSciencePage } from './pages/categories/ComputerSciencePage';
import { MultimediaGraphicDesignPage } from './pages/categories/MultimediaGraphicDesignPage';
import { MechanicalAutomobilePage } from './pages/categories/MechanicalAutomobilePage';
import { CivilEngineeringPage } from './pages/categories/CivilEngineeringPage';
import { CncProgrammingPage } from './pages/categories/CncProgrammingPage';
import { ArtsMultimediaPage } from './pages/categories/ArtsMultimediaPage';
import { LearningModesPage } from './pages/LearningModesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <EnquiryModalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<AllCoursesPage />} />
            <Route
              path="/courses/computer-science-it"
              element={<ComputerSciencePage />}
            />
            <Route
              path="/courses/multimedia-graphic-design"
              element={<MultimediaGraphicDesignPage />}
            />
            <Route
              path="/courses/mechanical-automobile"
              element={<MechanicalAutomobilePage />}
            />
            <Route
              path="/courses/civil-engineering"
              element={<CivilEngineeringPage />}
            />
            <Route
              path="/courses/cnc-programming"
              element={<CncProgrammingPage />}
            />
            <Route
              path="/courses/arts-multimedia"
              element={<ArtsMultimediaPage />}
            />
            <Route path="/learning-modes" element={<LearningModesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </EnquiryModalProvider>
    </BrowserRouter>
  );
};

export default App;

