import React from 'react';
import { Terminal, Users, FolderCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MethodologySection: React.FC = () => {
  return (
    <section className="relative bg-[#FAF9F7] py-16 lg:py-20 border-b border-[#EAEAE7]">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white border border-[#E5E5E2] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="text-[11px] font-mono font-semibold tracking-widest text-[#DC2626] uppercase">
              OUR METHODOLOGY
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] text-neutral-950 font-normal tracking-tight max-w-3xl">
            Direct Software Mastery Over Abstract Speculation.
          </h2>
        </div>

        {/* 2-Column Asymmetric Cards (21st.dev Card Lift) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Card: Laboratory-First Instruction */}
          <div className="card-interactive lg:col-span-5 bg-white rounded-lg border border-[#E5E5E2] p-8 shadow-subtle flex flex-col justify-between h-full group">
            <div>
              <div className="w-10 h-10 rounded-md bg-[#FAF9F7] border border-[#EAEAE7] flex items-center justify-center text-neutral-900 mb-6 group-hover:border-[#DC2626]/50 transition-colors">
                <Terminal className="w-5 h-5 text-[#DC2626]" />
              </div>

              <h3 className="text-xl font-bold text-neutral-950 mb-3 tracking-tight group-hover:text-[#DC2626] transition-colors">
                Laboratory-First Instruction
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-8">
                Learning engineering software requires hours of hands-on practice, not passive slide-viewing. Every single hour at GV DESIGN TECH is divided into direct tool demonstration followed by live practical execution under the active guidance of our mentors.
              </p>
            </div>

            {/* Pill Tags */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-[#F0F0EE]">
              <span className="px-3 py-1 bg-[#FAF9F7] border border-[#E5E5E2] rounded-full text-xs font-mono text-neutral-700 hover:border-neutral-400 transition-colors">
                80% Practical Terminal Time
              </span>
              <span className="px-3 py-1 bg-[#FAF9F7] border border-[#E5E5E2] rounded-full text-xs font-mono text-neutral-700 hover:border-neutral-400 transition-colors">
                1:1 Live Mentorship
              </span>
              <span className="px-3 py-1 bg-[#FAF9F7] border border-[#E5E5E2] rounded-full text-xs font-mono text-neutral-700 hover:border-neutral-400 transition-colors">
                100% Live Interactive Online
              </span>
            </div>
          </div>

          {/* Right Card: Why Practical Lab Training Drives Technical Careers */}
          <div className="card-interactive lg:col-span-7 bg-white rounded-lg border border-[#E5E5E2] p-8 shadow-subtle flex flex-col justify-between group">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-semibold mb-2">
                PRACTICAL COMPETENCE OVER THEORY
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3 tracking-tight group-hover:text-[#DC2626] transition-colors">
                Why Practical Lab Training Drives Technical Careers
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                Industry employers do not value theoretical test scores; they test whether you can create a production assembly, draft an error-free drawing, code a robust backend, or design an intuitive interface on demand.
              </p>

              {/* Comparative Visual Bar (Uiverse animated gradient bar) */}
              <div className="bg-[#FAF9F7] p-5 rounded-lg border border-[#EAEAE7] mb-8">
                <div className="flex justify-between text-xs font-mono mb-2.5">
                  <span className="text-neutral-500">Traditional Classroom (20% Software / 80% Theory)</span>
                  <span className="text-[#DC2626] font-bold">GV DESIGN TECH (85% Software / 15% Principles)</span>
                </div>
                
                {/* Visual Ratio Bar with subtle inner shadow & glow */}
                <div className="h-5 w-full bg-neutral-200/80 rounded-full overflow-hidden flex p-0.5 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '20%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-neutral-400 h-full rounded-l-full"
                    title="Traditional Classroom 20% Software"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] h-full rounded-r-full shadow-sm hover:brightness-110 transition-all duration-300 relative group/bar"
                    title="GV DESIGN TECH 85% Practical Software"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-2">
                  <span>Theory Memorization</span>
                  <span className="text-[#DC2626] font-semibold">Live Production Capability</span>
                </div>
              </div>
            </div>

            {/* Sub-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0F0EE]">
              <div className="p-4 bg-[#FAF9F7] rounded-lg border border-[#EAEAE7] hover:border-neutral-400 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#DC2626]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    1:1 Mentorship Ratio
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Interactive two-way screen sharing with direct mentor assistance whenever a bug, constraint error or design barrier emerges.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F7] rounded-lg border border-[#EAEAE7] hover:border-neutral-400 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <FolderCheck className="w-4 h-4 text-[#DC2626]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Real, Reusable Portfolios
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every graduate leaves with a project dossier featuring parametric parts, operational web apps, or production artwork.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
