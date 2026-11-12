import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSE_CATEGORIES } from '../../data/coursesData';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export const LearningDomainsScene: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(COURSE_CATEGORIES[0].id);
  const { openEnquiryModal } = useEnquiryModal();

  const currentCategory =
    COURSE_CATEGORIES.find(c => c.id === activeCategoryId) || COURSE_CATEGORIES[0];

  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-canvas border-b border-canvas-border overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-canvas-border pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono text-cinematic-red uppercase tracking-widest block">
              [ SCENE 03 // TECHNICAL DIRECTORY ]
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-ink-pure">
              Explore The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-pure to-cinematic-red">
                Learning Domains
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-ink-muted max-w-sm">
            Select a discipline below to review real software workflows, specialized technical modules, and immediate syllabus previews.
          </p>
        </div>

        {/* Interactive Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-canvas-border pb-4">
          {COURSE_CATEGORIES.map((cat, idx) => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`relative px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cinematic-red text-white font-bold shadow-glow-red'
                    : 'bg-canvas-surface text-ink-secondary hover:text-ink-primary hover:bg-canvas-card border border-canvas-border'
                }`}
              >
                <span>0{idx + 1}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Editorial Showcase Stage for Selected Category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Large Visual Panel (6 Cols) */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-canvas-border bg-canvas-surface relative flex flex-col justify-between group">
              <div className="relative aspect-[16/11] lg:aspect-auto lg:h-[480px] overflow-hidden">
                <img
                  src={currentCategory.heroImage}
                  alt={currentCategory.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
              </div>

              {/* In-Frame Context Content */}
              <div className="p-8 absolute bottom-0 left-0 right-0 space-y-4">
                <span className="text-[10px] font-mono text-cinematic-red uppercase tracking-widest block">
                  {currentCategory.courseCountNote}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-ink-pure">
                  {currentCategory.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary font-light max-w-lg line-clamp-3">
                  {currentCategory.detailedDescription}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to={`/courses/${currentCategory.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-canvas font-mono text-xs font-bold uppercase tracking-wider hover:bg-cinematic-red hover:text-white transition-colors"
                  >
                    <span>EXPLORE ALL COURSES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => openEnquiryModal(currentCategory.courses[0]?.name || currentCategory.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-canvas-card border border-canvas-border text-ink-primary font-mono text-xs uppercase tracking-wider hover:border-cinematic-red transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-cinematic-red" />
                    <span>ENQUIRE FOR THIS DOMAIN</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Course Grid & Technical Highlights (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-ink-muted pb-2 border-b border-canvas-border">
                  <span>ACTIVE CURRICULUM MODULES</span>
                  <span>ODDANCHATRAM + LIVE ONLINE</span>
                </div>

                {/* Courses List as Minimalist Sleek Strips */}
                <div className="space-y-2.5">
                  {currentCategory.courses.map(course => (
                    <div
                      key={course.id}
                      className="p-4 rounded-xl bg-canvas-surface border border-canvas-border hover:border-canvas-borderHover hover:bg-canvas-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <h4 className="font-display text-base font-bold text-ink-primary group-hover:text-cinematic-red transition-colors">
                          {course.name}
                        </h4>
                        <p className="text-xs text-ink-muted line-clamp-1 font-light">
                          {course.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                        {course.softwareCovered && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-card border border-canvas-border text-ink-secondary">
                            {course.softwareCovered[0]}
                          </span>
                        )}
                        <button
                          onClick={() => openEnquiryModal(course.name)}
                          className="p-2 rounded-lg bg-canvas-card hover:bg-cinematic-red hover:text-white text-ink-secondary border border-canvas-border transition-colors"
                          title={`Enquire for ${course.name}`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Domain Jump */}
              <div className="p-4 rounded-2xl bg-canvas-surface/60 border border-canvas-border flex items-center justify-between text-xs font-mono text-ink-muted">
                <span>WANT DEEPER TECHNICAL SYLLABUS DETAILS?</span>
                <Link
                  to={`/courses/${currentCategory.slug}`}
                  className="text-cinematic-red hover:underline font-bold flex items-center gap-1"
                >
                  FULL TRACK SPEC <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

