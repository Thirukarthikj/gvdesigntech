import React, { useState } from 'react';
import { CourseCategory } from '../../types';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { Link } from 'react-router-dom';
import { COURSE_CATEGORIES } from '../../data/coursesData';
import {
  ArrowRight,
  Layers,
  CheckCircle2,
  Users2,
  Target,
  ChevronRight,
  BookOpen,
  MapPin,
  Clock,
  PhoneCall,
  Globe
} from 'lucide-react';

interface CategoryDetailPageProps {
  category: CourseCategory;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ category }) => {
  const { openEnquiryModal } = useEnquiryModal();
  const [activeCourseId, setActiveCourseId] = useState<string>(category.courses[0]?.id || '');

  const activeCourse =
    category.courses.find((c) => c.id === activeCourseId) || category.courses[0];

  const otherCategories = COURSE_CATEGORIES.filter((c) => c.id !== category.id);

  return (
    <div className="py-12 sm:py-16 bg-white text-neutral-900">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Category Hero Banner */}
        <div className="relative rounded-xl border border-[#E5E5E2] p-6 sm:p-12 lg:p-14 overflow-hidden bg-white shadow-subtle group">
          {/* Authentic Technical / Course Background Image Layer (Mobile & Desktop) */}
          {category.heroImage && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              <img
                src={category.heroImage}
                alt={`${category.title} technical course background`}
                className="w-full h-full object-cover object-[80%_center] sm:object-right opacity-85 sm:opacity-85 scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Soft directional gradient: preserves text contrast on the left, leaves background view clearly visible on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent sm:from-white sm:via-white/85 sm:to-transparent" />
            </div>
          )}

          {/* OriginKit Architectural Crosshairs */}
          <span className="absolute top-2.5 left-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20 pointer-events-none">+</span>
          <span className="absolute top-2.5 right-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20 pointer-events-none">+</span>
          <span className="absolute bottom-2.5 left-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20 pointer-events-none">+</span>
          <span className="absolute bottom-2.5 right-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20 pointer-events-none">+</span>

          <div className="relative z-10 max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#DC2626]">
                {category.courseCountNote}
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-950 leading-tight">
              {category.title}
            </h1>

            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-900 font-semibold">
              {category.tagline}
            </p>

            <p className="text-xs sm:text-base text-neutral-800 font-medium leading-relaxed max-w-2xl">
              {category.detailedDescription}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs font-mono text-neutral-800 font-medium">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#DC2626] shrink-0" /> 100% Live Interactive Online Classes
              </span>
              <span className="hidden sm:inline text-neutral-300">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-600 shrink-0" /> Oddanchatram Headquarters, Tamil Nadu
              </span>
            </div>

            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => openEnquiryModal(category.courses[0]?.name || category.title)}
                className="w-full sm:w-auto px-6 py-3.5 rounded bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Enquire for {category.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+919655364707"
                className="w-full sm:w-auto px-5 py-3.5 rounded bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-900 font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Call Admissions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Master-Detail Course Curriculum Explorer */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span className="text-xs font-mono text-[#DC2626] uppercase tracking-widest font-semibold">
                CURRICULUM MODULES
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950">
              Available Courses Under {category.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Select any program to inspect software coverage, curriculum topics, and verified learning outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Course Selector List (4 Cols) */}
            <div className="lg:col-span-4 space-y-2">
              {category.courses.map((course, idx) => {
                const isSelected = course.id === activeCourse.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => setActiveCourseId(course.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                        : 'bg-white text-neutral-700 border-[#E5E5E2] hover:border-neutral-400 hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-mono block ${isSelected ? 'text-[#DC2626]' : 'text-neutral-400'}`}>
                        0{idx + 1}
                      </span>
                      <h3 className="font-editorial text-base font-normal mt-0.5">{course.name}</h3>
                      <p
                        className={`text-[11px] line-clamp-1 mt-0.5 ${
                          isSelected ? 'text-neutral-300' : 'text-neutral-500'
                        }`}
                      >
                        {course.shortDescription}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ml-2 ${
                        isSelected ? 'text-white' : 'text-neutral-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Detailed Course Syllabus (8 Cols) */}
            {activeCourse && (
              <div className="lg:col-span-8 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 sm:p-8 shadow-subtle space-y-6">
                {/* Course Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAE7]">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-widest font-semibold block">
                      {activeCourse.categoryName}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950">
                      {activeCourse.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
                      {activeCourse.overview || activeCourse.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={() => openEnquiryModal(activeCourse.name)}
                    className="btn-shimmer btn-tactile self-start sm:self-center px-5 py-2.5 rounded bg-neutral-950 hover:bg-[#DC2626] text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all shadow-sm"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Software Covered Tags */}
                {activeCourse.softwareCovered && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#DC2626]" /> SOFTWARE SUITES COVERED
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCourse.softwareCovered.map((software, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-white text-neutral-800 border border-[#E5E5E2]"
                        >
                          {software}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Curriculum Topics */}
                {activeCourse.keyTopics && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#DC2626]" /> CURRICULUM SYLLABUS TOPICS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeCourse.keyTopics.map((topic, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded bg-white border border-[#E5E5E2] text-xs text-neutral-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#DC2626] mt-0.5 shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dual Grid: Recommended For & Practical Outcomes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EAEAE7]">
                  {activeCourse.recommendedFor && (
                    <div className="p-4 rounded bg-white border border-[#E5E5E2]">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                        <Users2 className="w-3.5 h-3.5 text-[#DC2626]" /> RECOMMENDED CANDIDATES
                      </span>
                      <ul className="space-y-1.5 text-xs text-neutral-600">
                        {activeCourse.recommendedFor.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeCourse.learningOutcomes && (
                    <div className="p-4 rounded bg-white border border-[#E5E5E2]">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-emerald-600" /> VERIFIED CAPABILITIES
                      </span>
                      <ul className="space-y-1.5 text-xs text-neutral-600">
                        {activeCourse.learningOutcomes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Explore Other Domains */}
        <div className="pt-8 border-t border-[#EAEAE7]">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">
            EXPLORE OTHER TECHNICAL TRACKS:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/courses/${cat.slug}`}
                className="p-3.5 rounded bg-[#FAF9F7] border border-[#E5E5E2] hover:border-neutral-400 hover:bg-white transition-all text-xs font-mono text-neutral-700 hover:text-neutral-950 flex items-center justify-between group"
              >
                <span className="truncate">{cat.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#DC2626] transition-colors ml-1 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
