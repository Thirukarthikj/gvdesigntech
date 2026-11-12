import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-[#EAEAE7] overflow-hidden">
      {/* OriginKit Subtle Grid Canvas Texture */}
      <div className="absolute inset-0 originkit-grid-fade pointer-events-none opacity-60" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* 21st.dev Style Eyebrow Pill with Live Pulse & Spring Entrance */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F7] border border-[#E5E5E2] shadow-subtle mb-5 mx-auto hover:border-[#DC2626]/40 transition-colors cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-neutral-800 uppercase">
            ONLINE LEARNING CLASSES
          </span>
        </motion.div>

        {/* Editorial Headline with Smooth Upward Stagger */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.14] text-neutral-950 tracking-tight font-normal mb-4 sm:mb-5 max-w-4xl mx-auto"
        >
          Online Learning Classes Built for Real Industry Competence.
        </motion.h1>

        {/* Subhead: Single Line Centered in Screen */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-4xl mx-auto mb-6 sm:mb-8 font-sans font-normal leading-relaxed"
        >
          Master industry-standard engineering, coding, and design through live interactive online classes.
        </motion.p>

        {/* Visual: Centered directly before the Explore Courses button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto mb-6 sm:mb-8"
        >
          <div className="card-interactive group relative bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] overflow-hidden shadow-subtle text-left">
            <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                alt="Computer Science and Digital Software Live Online Session at GV DESIGN TECH Oddanchatram"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-neutral-950/85 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-1 rounded border border-white/10 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE CODE WORKSHOP</span>
              </div>
            </div>
            <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white border-t border-[#EAEAE7]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-wide uppercase text-neutral-800 truncate">
                  COMPUTER SCIENCE &amp; DIGITAL DESIGN — LIVE ONLINE CLASSES
                </span>
              </div>
              <Cpu className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-colors shrink-0" />
            </div>
          </div>
        </motion.div>

        {/* Call to Actions (Responsive Centered Stack) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-md sm:max-w-none mx-auto"
        >
          <Link
            to="/courses"
            className="btn-shimmer btn-tactile group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-sm text-center"
          >
            <span>EXPLORE COURSES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/learning-modes"
            className="btn-tactile group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#FAF9F7] text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded border border-neutral-300 transition-all hover:border-neutral-400 text-center"
          >
            <span>ONLINE LEARNING</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* 3-Part Metric Ticker Centered with OriginKit Crosshairs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-[#EAEAE7] max-w-2xl mx-auto"
        >
          {/* OriginKit Crosshairs */}
          <span className="crosshair-corner -top-1.5 -left-1 font-mono text-[11px] leading-none select-none">+</span>
          <span className="crosshair-corner -top-1.5 right-0 font-mono text-[11px] leading-none select-none">+</span>

          <div className="group text-center transition-transform hover:-translate-y-0.5 duration-200">
            <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-none mb-1 group-hover:text-[#DC2626] transition-colors">
              25+
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 leading-tight">
              Technical Courses
            </div>
          </div>

          <div className="group text-center transition-transform hover:-translate-y-0.5 duration-200">
            <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-none mb-1 group-hover:text-[#DC2626] transition-colors">
              24+
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 leading-tight">
              Industry-Standard Tools
            </div>
          </div>

          <div className="group text-center transition-transform hover:-translate-y-0.5 duration-200">
            <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-none mb-1 group-hover:text-[#DC2626] transition-colors">
              100%
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 leading-tight">
              Live Interactive Online
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
