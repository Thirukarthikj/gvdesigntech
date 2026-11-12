import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { Phone, Mail, Instagram, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const InstitutionalFooter: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <footer className="bg-[#FAF9F7] text-neutral-800 border-t border-[#EAEAE7]">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#E5E5E2]">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" />

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mt-3">
              Practical technical training institute in Oddanchatram, Tamil Nadu. Dedicated to real software mastery, engineering discipline, and hands-on skill development across Mechanical &amp; Automobile CAD, Civil Drafting, CNC Programming, Computer Science, and Graphic Design.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Oddanchatram, Tamil Nadu, India — 624619</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Monday – Saturday: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Engineering Disciplines (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-900 font-bold mb-4">
              ENGINEERING DISCIPLINES
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li>
                <Link to="/courses/mechanical-automobile" className="hover:text-[#DC2626] transition-colors">
                  Mechanical &amp; Automobile Design
                </Link>
              </li>
              <li>
                <Link to="/courses/civil-engineering" className="hover:text-[#DC2626] transition-colors">
                  Civil Engineering &amp; Architecture
                </Link>
              </li>
              <li>
                <Link to="/courses/cnc-programming" className="hover:text-[#DC2626] transition-colors">
                  CNC &amp; VMC Programming
                </Link>
              </li>
              <li>
                <Link to="/courses/computer-science-it" className="hover:text-[#DC2626] transition-colors">
                  Computer Science &amp; IT
                </Link>
              </li>
              <li>
                <Link to="/courses/multimedia-graphic-design" className="hover:text-[#DC2626] transition-colors">
                  Multimedia &amp; Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/courses/arts-multimedia" className="hover:text-[#DC2626] transition-colors">
                  Comprehensive Arts &amp; Layouts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institute (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-900 font-bold mb-4">
              INSTITUTE
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li>
                <Link to="/about" className="hover:text-[#DC2626] transition-colors">
                  About Our Approach
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#DC2626] transition-colors">
                  Live Interactive Methods
                </Link>
              </li>
              <li>
                <Link to="/learning-modes" className="hover:text-[#DC2626] transition-colors">
                  Live Online Experience
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#DC2626] transition-colors">
                  All Courses &amp; Tools
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#DC2626] transition-colors">
                  Admissions &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Direct Enrolment (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-900 font-bold mb-4">
              CONTACT &amp; ENROLMENT
            </h4>

            <div className="space-y-2 text-xs text-neutral-600">
              <div>
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Direct Admissions Line:</span>
                <a href="tel:+919655364707" className="font-semibold text-neutral-900 hover:text-[#DC2626] block">
                  +91 96553 64707
                </a>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Official Email:</span>
                <a href="mailto:gvdesigntech707@gmail.com" className="font-medium text-neutral-900 hover:text-[#DC2626] break-all">
                  gvdesigntech707@gmail.com
                </a>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Instagram:</span>
                <a
                  href="https://instagram.com/gvdesigntech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 hover:text-[#DC2626]"
                >
                  @gvdesigntech
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openEnquiryModal()}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                <span>ENQUIRE ONLINE NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Commitments */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 GV DESIGN TECH. All rights reserved. Practical technical training in Oddanchatram, Tamil Nadu.
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span className="hover:text-neutral-800 cursor-pointer">Terms of Enrolment</span>
            <span className="text-neutral-300">•</span>
            <span className="hover:text-neutral-800 cursor-pointer">Privacy Policy</span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-700 font-medium">Non-Deceptive Education Commitment</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

