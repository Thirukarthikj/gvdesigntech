import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Cpu } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const HeroSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="relative bg-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 border-b border-[#EAEAE7] overflow-hidden">
      {/* OriginKit Subtle Grid Canvas Texture */}
      <div className="absolute inset-0 originkit-grid-fade pointer-events-none opacity-60" />

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* 21st.dev Style Eyebrow Pill with Live Pulse */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FAF9F7] border border-[#E5E5E2] shadow-sm mb-5 self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8592B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8592B]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-neutral-800 uppercase">
                PRACTICAL TECHNICAL TRAINING INSTITUTE
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-[1.12] sm:leading-[1.08] text-neutral-950 tracking-tight font-normal mb-5 sm:mb-6">
              Practical Technical Training Built for Real Industry Competence.
            </h1>

            {/* Subhead Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-sans font-normal">
              Master industry-standard engineering, design, computer science and multimedia software through live interactive online classes led by experienced mentors from Oddanchatram, Tamil Nadu. Practical project-driven training in Mechanical CAD, Full-Stack Development, Civil Engineering, CNC programming, and Graphic Design.
            </p>

            {/* Call to Actions (Uiverse Shimmer & Responsive Mobile Stack) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
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
            </div>

            {/* 3-Part Metric Ticker with Responsive Padding & Font Sizing */}
            <div className="relative grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-[#EAEAE7]">
              {/* OriginKit Crosshairs */}
              <span className="absolute -top-1.5 -left-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
              <span className="absolute -top-1.5 right-0 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>

              <div className="group">
                <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-none mb-1 group-hover:text-[#E8592B] transition-colors">
                  6
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 leading-tight">
                  Curated Disciplines
                </div>
              </div>

              <div className="group">
                <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-none mb-1 group-hover:text-[#E8592B] transition-colors">
                  24+
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 leading-tight">
                  Industry-Standard Tools
                </div>
              </div>

              <div className="group">
                <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-none mb-1 group-hover:text-[#E8592B] transition-colors">
                  100%
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 leading-tight">
                  Live Interactive Online
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Photographic Lab Visuals */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            
            {/* Visual 1: Mechanical & CAD Lab */}
            <div className="card-interactive group relative bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] overflow-hidden shadow-subtle">
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
                  alt="Mechanical and Design CAD Laboratory at GV DESIGN TECH Oddanchatram"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-neutral-950/85 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-1 rounded border border-white/10 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8592B] animate-pulse" />
                  <span>LIVE ONLINE CAD</span>
                </div>
              </div>
              <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white border-t border-[#EAEAE7]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E8592B]" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-wide uppercase text-neutral-800 truncate">
                    MECHANICAL &amp; DESIGN CAD — LIVE ONLINE SESSIONS
                  </span>
                </div>
                <Monitor className="w-4 h-4 text-neutral-400 group-hover:text-[#E8592B] transition-colors shrink-0" />
              </div>
            </div>

            {/* Visual 2: Computer Science & Digital Lab */}
            <div className="card-interactive group relative bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] overflow-hidden shadow-subtle">
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                  alt="Computer Science and Digital Software Laboratory at GV DESIGN TECH Oddanchatram"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-neutral-950/85 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-1 rounded border border-white/10 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE CODE WORKSHOP</span>
                </div>
              </div>
              <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white border-t border-[#EAEAE7]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E8592B]" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-wide uppercase text-neutral-800 truncate">
                    COMPUTER SCIENCE &amp; DIGITAL LAB — LIVE ONLINE CLASSES
                  </span>
                </div>
                <Cpu className="w-4 h-4 text-neutral-400 group-hover:text-[#E8592B] transition-colors shrink-0" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
