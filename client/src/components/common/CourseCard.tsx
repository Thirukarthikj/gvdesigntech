import React from 'react';
import { Course } from '../../types';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  categorySlug?: string;
  variant?: 'grid' | 'compact' | 'featured';
}

const getCategoryFallback = (slug?: string) => {
  switch (slug) {
    case 'mechanical-automobile':
      return '/images/courses/mechanical-cad-hero.jpg';
    case 'civil-engineering':
      return '/images/courses/civil-architecture-hero.jpg';
    case 'cnc-programming':
      return '/images/courses/cnc-machining-hero.jpg';
    case 'computer-science-it':
    case 'cs-it':
      return '/images/courses/software-dev-hero.jpg';
    case 'multimedia-graphic-design':
    case 'arts-multimedia':
      return '/images/courses/graphic-design-hero.jpg';
    default:
      return '/images/hero-cad-classroom.jpg';
  }
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = 'grid',
}) => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <div className="card-interactive group relative bg-white rounded-lg border border-[#E5E5E2] shadow-subtle flex flex-col justify-between overflow-hidden">
      {/* OriginKit Technical Corner Markers */}
      <span className="crosshair-corner top-2 left-2 z-20 font-mono text-[9px] text-white/70 leading-none select-none drop-shadow-sm">+</span>
      <span className="crosshair-corner top-2 right-2 z-20 font-mono text-[9px] text-white/70 leading-none select-none drop-shadow-sm">+</span>

      {/* Course Card Photographic Header Image - Directly Related to Course */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-900 border-b border-[#EAEAE7]">
        <img
          src={course.image || getCategoryFallback(course.categorySlug)}
          alt={`${course.name} Course at GV DESIGN TECH Oddanchatram`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getCategoryFallback(course.categorySlug);
          }}
        />
        {/* Subtle Dark Gradient Overlay for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Software Tool Badge Overlay directly on Image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white text-[10.5px] font-mono border border-white/20 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
          <span className="font-semibold uppercase tracking-wider">{course.name}</span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col space-y-3">
        {/* Category Badge */}
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#DC2626] font-semibold uppercase tracking-wider group-hover:tracking-widest transition-all">
            {course.categoryName}
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

      {/* Card Footer Actions - Single Prominent Enquire Button */}
      <div className="p-3.5 bg-[#FAF9F7] border-t border-[#EAEAE7] font-mono">
        <button
          onClick={() => openEnquiryModal(course.name)}
          className="w-full btn-shimmer btn-tactile inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-neutral-950 hover:bg-[#DC2626] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
        >
          <span>Enquire</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
