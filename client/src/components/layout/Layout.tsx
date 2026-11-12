import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { InstitutionalFooter } from './InstitutionalFooter';
import { EnquiryModal } from '../common/EnquiryModal';
import { FloatingContactWidget } from '../common/FloatingContactWidget';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top upon navigating to any new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#DC2626] selection:text-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <InstitutionalFooter />
      <EnquiryModal />
      <FloatingContactWidget />
    </div>
  );
};
