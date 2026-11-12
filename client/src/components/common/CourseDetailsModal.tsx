import React, { useEffect } from 'react';
import { Course } from '../../types';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import {
  X,
  Layers,
  BookOpen,
  Target,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Calendar,
  MapPin,
  Globe,
  ArrowRight,
} from 'lucide-react';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  onClose,
}) => {
  const { openEnquiryModal } = useEnquiryModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && course) {
        onClose();
      }
    };
    if (course) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-elevated border border-[#E5E5E2] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#FAF9F7] text-neutral-900 p-6 border-b border-[#EAEAE7] flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#DC2626]">
              {course.categoryName} • SYLLABUS SPECIFICATION
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 tracking-tight">
              {course.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 pt-1">
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#DC2626]" /> 100% Live Interactive Online
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Oddanchatram, Tamil Nadu
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
              Module Overview
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {course.overview || course.shortDescription}
            </p>
          </div>

          {/* Software & Tools */}
          {course.softwareCovered && course.softwareCovered.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#DC2626]" /> Software &amp; Tools Covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.softwareCovered.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-[#FAF9F7] border border-[#E5E5E2] rounded text-xs font-mono text-neutral-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Syllabus Topics */}
          {course.keyTopics && course.keyTopics.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#DC2626]" /> Core Syllabus Topics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.keyTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF9F7] rounded border border-[#E5E5E2] text-xs text-neutral-700 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0 mt-1.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Outcomes */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#DC2626]" /> Practical Outcomes &amp; Deliverables
              </h3>
              <div className="space-y-2">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="bg-[#FAF9F7] p-5 border-t border-[#EAEAE7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-neutral-500 text-center sm:text-left">
            Admissions Desk: <strong className="text-neutral-900">+91 96553 64707</strong>
          </div>

          <button
            onClick={() => {
              onClose();
              openEnquiryModal(course.name);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <span>Enquire For This Course</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
