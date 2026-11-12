import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_COURSES, COURSE_CATEGORIES } from '../data/coursesData';
import { CourseCard } from '../components/common/CourseCard';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import { Search, BookOpen, Layers, X, ArrowRight } from 'lucide-react';

export const AllCoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { openEnquiryModal } = useEnquiryModal();

  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === 'all' || course.categorySlug === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesName = course.name.toLowerCase().includes(query);
      const matchesDescription = course.shortDescription.toLowerCase().includes(query);
      const matchesSoftware = course.softwareCovered.some((s) =>
        s.toLowerCase().includes(query)
      );
      const matchesCategoryName = course.categoryName.toLowerCase().includes(query);

      return (
        matchesCategory &&
        (matchesName || matchesDescription || matchesSoftware || matchesCategoryName)
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-12 sm:py-16 bg-white text-neutral-900">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="border-b border-[#EAEAE7] pb-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="text-[11px] font-mono font-semibold text-[#DC2626] uppercase tracking-widest block">
              ALL TECHNICAL DISCIPLINES • 24+ PROGRAMS
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
            Comprehensive Course Directory
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Industry-aligned modules across Mechanical &amp; Automobile CAD, Civil Drafting, CNC Programming, Computer Science &amp; IT, UI/UX, and Digital Arts. Delivered through live interactive online classes led by experienced mentors in Oddanchatram, Tamil Nadu.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-5 space-y-4 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                id="course-search-input"
                name="course-search"
                type="text"
                aria-label="Search courses by tool or language"
                placeholder="Search courses by tool or language (e.g. SolidWorks, Python, Figma, CATIA, MySQL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-uiverse w-full pl-10 pr-9 py-2 rounded border border-[#E5E5E2] text-xs text-neutral-900 bg-white placeholder-neutral-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Summary Pill */}
            <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-neutral-500">
              <span>Showing:</span>
              <span className="font-bold text-neutral-900 px-2 py-0.5 rounded bg-white border border-[#E5E5E2]">
                {filteredCourses.length} Courses
              </span>
              <span>across 6 Disciplines</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#EAEAE7]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn-tactile px-3 py-1.5 rounded text-xs font-mono transition-all ${
                selectedCategory === 'all'
                  ? 'bg-neutral-950 text-white font-semibold shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-[#E5E5E2] hover:border-neutral-400'
              }`}
            >
              All Categories ({ALL_COURSES.length})
            </button>

            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn-tactile px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-950 text-white font-semibold shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-[#E5E5E2] hover:border-neutral-400'
                }`}
              >
                {cat.title} ({cat.courses.length})
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid with Smooth Card Entrance */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] space-y-4">
            <Layers className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900">No courses match your search</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We couldn't find any courses matching "{searchQuery}". Try searching for terms like "AutoCAD", "Python", "Figma", or "CNC".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Help Banner */}
        <div className="bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl font-normal text-neutral-950">
              Need personalized guidance on which software course fits your career?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600">
              Talk directly with our technical mentors in Oddanchatram. We assess your background and recommend the exact technical software pathway.
            </p>
          </div>
          <button
            onClick={() => openEnquiryModal()}
            className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded shrink-0 transition-colors"
          >
            Request Syllabus Consultation →
          </button>
        </div>
      </div>
    </div>
  );
};
