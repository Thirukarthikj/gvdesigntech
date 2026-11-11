import React from 'react';
import { motion } from 'framer-motion';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { ArrowRight, ArrowDownRight, Compass, Sparkles, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CinematicHero: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 bg-canvas overflow-hidden cinema-grid">
      {/* Ambient background light gradients (2D) */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cinematic-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cinematic-electric/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-ink-muted border-b border-canvas-border pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cinematic-orange animate-pulse" />
          <span className="text-ink-secondary tracking-widest uppercase">
            GV DESIGN TECH • TECHNICAL INSTITUTE
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-ink-secondary">
            <MapPin className="w-3.5 h-3.5 text-cinematic-orange" />
            10.4851° N, 77.7479° E — Oddanchatram, Tamil Nadu
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-canvas-surface border border-canvas-border text-ink-primary font-mono text-[11px]">
            <Globe className="w-3 h-3 text-emerald-400" /> 100% LIVE ONLINE
          </span>
        </div>
      </div>

      {/* Center Stage: Oversized Expressive Typographic Composition */}
      <div className="relative z-10 my-auto py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Main Statement (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs sm:text-sm font-mono text-cinematic-orange uppercase tracking-widest block mb-2">
                  [ 01 // FOUNDATIONAL MANIFESTO ]
                </span>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-[96px] xl:text-[116px] font-extrabold tracking-tighter text-ink-pure leading-[0.88] uppercase">
                  Learn Today. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-pure via-ink-secondary to-cinematic-orange">
                    Lead Tomorrow.
                  </span>
                </h1>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-ink-secondary max-w-2xl font-light leading-relaxed"
            >
              Practical technical training. Creative thinking. Skills for what comes next. Master industry-standard engineering CAD, software development, and digital design in Oddanchatram.
            </motion.p>

            {/* Asymmetrical Action Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => openEnquiryModal()}
                className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cinematic-orange hover:bg-cinematic-orangeHover active:scale-98 text-white font-display font-bold text-sm tracking-wide shadow-glow-orange transition-all group"
              >
                <span>ENQUIRE FOR ADMISSIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-canvas-surface hover:bg-canvas-card border border-canvas-border text-ink-primary font-mono text-xs uppercase tracking-wider transition-all"
              >
                <span>EXPLORE 24+ COURSES</span>
                <ArrowDownRight className="w-3.5 h-3.5 text-cinematic-orange" />
              </Link>
            </motion.div>
          </div>

          {/* Right Visual Frame: Photographic & Contextual Telemetry (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-canvas-border bg-canvas-surface group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="Engineering CAD & Technical Workstation at GV DESIGN TECH Oddanchatram"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Overlay Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-canvas/90 backdrop-blur-md border border-canvas-border text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cinematic-orange block">
                    ODDANCHATRAM STUDIO
                  </span>
                  <span className="font-display font-bold text-ink-primary">
                    Hands-on Software Rigor
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-canvas-card border border-canvas-border flex items-center justify-center text-cinematic-orange font-mono text-xs">
                  01
                </div>
              </div>
            </div>

            {/* Editorial Quick-Spec Strip */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-canvas-surface border border-canvas-border">
                <span className="text-[10px] text-ink-muted uppercase block">DISCIPLINES</span>
                <span className="font-bold text-ink-primary">6 CORE TRACKS</span>
              </div>
              <div className="p-3 rounded-xl bg-canvas-surface border border-canvas-border">
                <span className="text-[10px] text-ink-muted uppercase block">SCHEDULE</span>
                <span className="font-bold text-ink-primary">MON–SAT: 9AM–9PM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Cue Strip */}
      <div className="relative z-10 pt-6 border-t border-canvas-border flex items-center justify-between text-xs font-mono text-ink-muted">
        <div className="flex items-center gap-6">
          <span>[ SCROLL TO DISCOVER ]</span>
          <span className="hidden sm:inline text-ink-faint">|</span>
          <span className="hidden sm:inline">NO GENERIC TEMPLATES • PURE TECHNICAL FLUIDITY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cinematic-orange">01</span>
          <span className="text-ink-faint">/</span>
          <span>09 SCENES</span>
        </div>
      </div>
    </section>
  );
};

