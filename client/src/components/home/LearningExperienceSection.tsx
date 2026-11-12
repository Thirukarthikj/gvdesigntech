import React from 'react';

export const LearningExperienceSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Core Foundations',
      description:
        'Understand core geometry, algorithmic logic, or user heuristics before opening software tools.',
    },
    {
      num: '02',
      title: 'Workstation Practice',
      description:
        'Direct hands-on hours navigating software ribbons, command palettes, and coordinate systems.',
    },
    {
      num: '03',
      title: 'Real-Task Drills',
      description:
        'Progressive exercises starting from simple 2D drafting to multi-part parametric assemblies.',
    },
    {
      num: '04',
      title: 'Feature Autonomy',
      description:
        'Independent debugging of geometry conflicts, syntax errors, or layout bugs with instructor guidance.',
    },
    {
      num: '05',
      title: 'Project Portfolios',
      description:
        'Compile standardized engineering sheets, deployed web utilities, or digital design portfolios.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching reference */}
        <div className="max-w-3xl space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-red block">
            OUR PEDAGOGY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-slate-950">
            Five Pedagogical Pillars for True Mastery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We accompany every student from their first software click to complete project independence through systematic, repeatable steps.
          </p>
        </div>

        {/* 5 Numbered Columns matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map(pillar => (
            <div
              key={pillar.num}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="font-serif text-3xl font-light text-slate-400 block mb-3">
                  {pillar.num}
                </span>
                <h3 className="font-sans text-sm font-bold text-slate-950 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="h-0.5 w-6 bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
