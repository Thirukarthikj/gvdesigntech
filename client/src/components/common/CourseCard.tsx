import React, { useState } from 'react';
import { Course } from '../../types';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { CourseDetailsModal } from './CourseDetailsModal';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  categorySlug?: string;
  variant?: 'grid' | 'compact' | 'featured';
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = 'grid',
}) => {
  const { openEnquiryModal } = useEnquiryModal();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="card-interactive group relative bg-white rounded-lg border border-[#E5E5E2] shadow-subtle flex flex-col justify-between overflow-hidden">
        {/* OriginKit Technical Corner Markers */}
        <span className="crosshair-corner top-1.5 left-2 font-mono text-[9px] leading-none select-none">+</span>
        <span className="crosshair-corner top-1.5 right-2 font-mono text-[9px] leading-none select-none">+</span>

        <div className="p-5 flex-grow flex flex-col space-y-3">
          {/* Category Badge */}
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#DC2626] font-semibold uppercase tracking-wider group-hover:tracking-widest transition-all">
              {course.categoryName}
            </span>
            <span className="text-neutral-400 font-medium">
              PRACTICAL LAB
            </span>
          </div>

          {/* Course Title */}
          <h3 className="font-editorial text-xl font-normal text-neutral-950 group-hover:text-[#DC2626] transition-colors">
            {course.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-light">
            {course.shortDescription}
          </p>

          {/* Key Software Tools */}
          {course.softwareCovered && course.softwareCovered.length > 0 && (
            <div className="pt-1">
              <div className="flex flex-wrap gap-1">
                {course.softwareCovered.map((software, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FAF9F7] text-neutral-700 border border-[#E5E5E2] group-hover:border-neutral-300 transition-colors"
                  >
                    {software}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {variant !== 'compact' && course.keyTopics && (
            <div className="mt-auto pt-3 border-t border-[#F0F0EE]">
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {course.keyTopics.slice(0, 3).map((topic, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="line-clamp-1">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="p-3.5 bg-[#FAF9F7] border-t border-[#EAEAE7] grid grid-cols-2 gap-2 font-mono">
          <button
            onClick={() => setShowDetails(true)}
            className="btn-tactile inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-white border border-[#E5E5E2] hover:bg-neutral-50 hover:border-neutral-400 text-neutral-900 text-xs uppercase tracking-wider transition-all"
          >
            <BookOpen className="w-3 h-3 text-neutral-500" />
            <span>Syllabus</span>
          </button>

          <button
            onClick={() => openEnquiryModal(course.name)}
            className="btn-shimmer btn-tactile inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-neutral-950 hover:bg-[#DC2626] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Syllabus Modal */}
      <CourseDetailsModal
        course={showDetails ? course : null}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};
