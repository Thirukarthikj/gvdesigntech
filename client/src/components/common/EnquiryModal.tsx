import React, { useEffect } from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { EnquiryForm } from './EnquiryForm';
import { X, GraduationCap, MapPin, Clock } from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { isOpen, selectedCourse, selectedMode, closeEnquiryModal } = useEnquiryModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeEnquiryModal();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeEnquiryModal]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeEnquiryModal();
      }}
    >
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-elevated border border-[#E5E5E2] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#FAF9F7] px-6 py-5 border-b border-[#EAEAE7] flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest uppercase mb-1 text-[#E8592B]">
              <GraduationCap className="w-3.5 h-3.5" /> ADMISSION ENQUIRY
            </div>
            <h2 className="font-editorial text-2xl font-normal text-neutral-950 tracking-tight">
              Connect with GV DESIGN TECH
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E8592B]" /> Oddanchatram, Tamil Nadu
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" /> Mon–Sat: 9 AM – 9 PM
              </span>
            </div>
          </div>

          <button
            onClick={closeEnquiryModal}
            className="p-1.5 rounded text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Course Context */}
        {selectedCourse && (
          <div className="bg-neutral-50 border-b border-[#EAEAE7] px-6 py-2.5 text-xs font-mono text-neutral-600 flex items-center justify-between">
            <div>
              Course of interest: <strong className="text-[#E8592B]">{selectedCourse}</strong>
            </div>
            <span className="text-[10px] text-neutral-400 uppercase">PRE-SELECTED</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          <EnquiryForm initialCourse={selectedCourse} initialMode={selectedMode} />
        </div>
      </div>
    </div>
  );
};
