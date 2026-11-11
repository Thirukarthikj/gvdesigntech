import React, { useState } from 'react';
import { ALL_COURSES, COURSE_CATEGORIES } from '../../data/coursesData';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { CourseDetailsModal } from '../common/CourseDetailsModal';
import { Course } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, Layers, Search, Filter } from 'lucide-react';

export const CourseShowcaseScene: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const { openEnquiryModal } = useEnquiryModal();

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesFilter =
      selectedFilter === 'all' || course.categorySlug === selectedFilter;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesFilter;

    const matchesName = course.name.toLowerCase().includes(query);
    const matchesSoftware = course.softwareCovered.some(s =>
      s.toLowerCase().includes(query)
    );
    return matchesFilter && (matchesName || matchesSoftware);
  });

  return (
    <>
      <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-canvas border-b border-canvas-border overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-canvas-border pb-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono text-cinematic-orange uppercase tracking-widest block">
                [ SCENE 05 // COMPREHENSIVE COURSE DIRECTORY ]
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-ink-pure">
                Interactive <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-pure to-cinematic-orange">
                  Course Showcase
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-canvas-surface hover:bg-canvas-card border border-canvas-border text-ink-primary font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>OPEN FULL CATALOG ({ALL_COURSES.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-cinematic-orange" />
              </Link>
            </div>
          </div>

          {/* Interactive Filtering Bar */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-ink-muted absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Filter by software or language (e.g. SolidWorks, Python, Figma, C++)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-canvas-surface border border-canvas-border text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-cinematic-orange transition-colors font-sans"
                />
              </div>

              {/* Quick Count */}
              <div className="md:col-span-6 flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-ink-muted">
                <span>
                  SHOWING <strong className="text-ink-primary">{filteredCourses.length}</strong> OF {ALL_COURSES.length} COURSES
                </span>
                {(selectedFilter !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-cinematic-orange hover:underline uppercase"
                  >
                    RESET
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-cinematic-orange text-white font-bold'
                    : 'bg-canvas-surface text-ink-secondary hover:text-ink-primary border border-canvas-border'
                }`}
              >
                ALL DISCIPLINES
              </button>
              {COURSE_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedFilter(category.slug)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    selectedFilter === category.slug
                      ? 'bg-cinematic-orange text-white font-bold'
                      : 'bg-canvas-surface text-ink-secondary hover:text-ink-primary border border-canvas-border'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Course Strips Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice(0, 12).map((course, idx) => (
              <div
                key={course.id}
                className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border hover:border-canvas-borderHover hover:bg-canvas-card transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
                    <span className="text-cinematic-orange font-bold uppercase">
                      {course.categoryName}
                    </span>
                    <span>0{idx + 1}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink-primary group-hover:text-cinematic-orange transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-xs text-ink-secondary font-light line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Software Tags */}
                  {course.softwareCovered && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.softwareCovered.map((soft, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas border border-canvas-border text-ink-secondary"
                        >
                          {soft}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-canvas-border grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCourseForDetails(course)}
                    className="py-2 px-3 rounded-lg bg-canvas border border-canvas-border hover:border-canvas-borderHover text-ink-primary font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-ink-muted" />
                    <span>Syllabus</span>
                  </button>

                  <button
                    onClick={() => openEnquiryModal(course.name)}
                    className="py-2 px-3 rounded-lg bg-cinematic-orange hover:bg-cinematic-orangeHover text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length > 12 && (
            <div className="text-center pt-8">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-canvas font-mono text-xs font-bold uppercase tracking-wider hover:bg-cinematic-orange hover:text-white transition-colors"
              >
                <span>VIEW REMAINING COURSES IN DIRECTORY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Reusable Course Details Modal */}
      <CourseDetailsModal
        course={selectedCourseForDetails}
        onClose={() => setSelectedCourseForDetails(null)}
      />
    </>
  );
};

