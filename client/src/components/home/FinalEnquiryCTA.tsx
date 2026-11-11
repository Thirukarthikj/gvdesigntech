import React from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { ArrowRight, PhoneCall } from 'lucide-react';

export const FinalEnquiryCTA: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="py-20 sm:py-24 bg-slate-100/70 border-b border-slate-200/90 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent-orange block">
          BECOME INDUSTRY READY
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-950 leading-tight">
          Your Next Skill Starts Here.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Acquire the technical software proficiency that transforms your academic coursework, portfolio projects, and career capability with GV DESIGN TECH in Oddanchatram.
        </p>

        {/* Action Buttons matching reference */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={() => openEnquiryModal()}
            className="w-full sm:w-auto px-7 py-3.5 rounded bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2 group"
          >
            <span>Enquire About Admission</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="tel:+919655364707"
            className="w-full sm:w-auto px-6 py-3.5 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-accent-orange" />
            <span>Connect Via Phone: +91 96553 64707</span>
          </a>
        </div>

        {/* Micro-links below buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span>Oddanchatram Campus</span>
          <span className="text-slate-300">•</span>
          <span>Online Live Batches</span>
          <span className="text-slate-300">•</span>
          <span>Flexible Schedules</span>
        </div>
      </div>
    </section>
  );
};
