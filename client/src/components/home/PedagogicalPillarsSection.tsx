import React from 'react';

const PILLARS = [
  {
    num: '01',
    title: 'Core Foundations',
    description:
      'Structured conceptual grounding in fundamental engineering, programming, or design rules before touching the tools.',
  },
  {
    num: '02',
    title: 'Workstation Practice',
    description:
      'Uninterrupted hands-on terminal practice executing the exact software procedures demonstrated by the instructor.',
  },
  {
    num: '03',
    title: 'Real Task Drills',
    description:
      'Challenging design problems replicating actual drawing office or industry agency requests without guided prompts.',
  },
  {
    num: '04',
    title: 'Feature Mastery',
    description:
      'Systematic exposure to advanced modules, parametric constraints, complex database queries or multi-axis toolpaths.',
  },
  {
    num: '05',
    title: 'Project Portfolio',
    description:
      'Independent end-to-end project developed from scratch, comprehensively documented and ready for employer review.',
  },
];

export const PedagogicalPillarsSection: React.FC = () => {
  return (
    <section className="relative bg-white py-14 sm:py-16 lg:py-20 border-b border-[#EAEAE7]">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#FAF9F7] border border-[#E5E5E2] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8592B]" />
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-[#E8592B] uppercase">
              OUR METHODOLOGY
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-[46px] leading-[1.15] sm:leading-[1.12] text-neutral-950 font-normal tracking-tight">
            Five Pedagogical Pillars for True Mastery
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 mt-2 max-w-2xl leading-relaxed">
            We structure every course at GV DESIGN TECH to ensure students move smoothly through systematic exposure, active practice, and independent application.
          </p>
        </div>

        {/* 5 Column Grid (Responsive from mobile single, tablet 2-cols, to desktop 5-cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="card-interactive group p-5 sm:p-6 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] flex flex-col justify-between"
            >
              <div>
                <div className="font-editorial text-3xl sm:text-4xl text-neutral-900 group-hover:text-[#E8592B] font-normal mb-2 sm:mb-3 transition-colors">
                  {pillar.num}
                </div>
                <h3 className="text-sm font-bold text-neutral-950 mb-1.5 sm:mb-2 tracking-tight group-hover:text-neutral-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#EAEAE7]">
                <span className="w-4 h-0.5 bg-neutral-300 group-hover:w-10 group-hover:bg-[#E8592B] transition-all duration-300 block" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
