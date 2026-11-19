import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const InstitutionalFooter: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <footer className="bg-[#FAF9F7] text-neutral-800 border-t border-[#EAEAE7]">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-[#E5E5E2] items-start">
          
          {/* Column 1: Brand & Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <BrandLogo variant="light" />

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg mt-3">
              Practical technical training institute in Oddanchatram, Tamil Nadu. Dedicated to real software mastery, engineering discipline, and hands-on skill development across Mechanical &amp; Automobile CAD, Civil Drafting, CNC Programming, Computer Science, and Graphic Design.
            </p>

            <div className="pt-2 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                <span>Oddanchatram, Tamil Nadu, India — 624619</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Monday – Saturday: 9:00 AM – 9:00 PM (Live Interactive Sessions)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Contact & Enrolment Box (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-[#EAEAE7] shadow-xs space-y-4">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-900 font-bold">
              CONTACT &amp; DIRECT ENROLMENT
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
              <div>
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Direct Admissions Line:</span>
                <a href="tel:+919655364707" className="font-semibold text-neutral-900 hover:text-[#DC2626] transition-colors block text-sm mt-0.5">
                  +91 96553 64707
                </a>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Official Email:</span>
                <a href="mailto:gvdesigntech707@gmail.com" className="font-medium text-neutral-900 hover:text-[#DC2626] transition-colors block break-all mt-0.5">
                  gvdesigntech707@gmail.com
                </a>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Official Instagram:</span>
                <a
                  href="https://instagram.com/gvdesigntech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 hover:text-[#DC2626] transition-colors block mt-0.5"
                >
                  @gvdesigntech
                </a>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Headquarters:</span>
                <span className="font-medium text-neutral-900 block mt-0.5">
                  Oddanchatram, Tamil Nadu
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F0F0EE]">
              <button
                onClick={() => openEnquiryModal()}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-950 hover:bg-[#DC2626] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
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

