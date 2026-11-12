import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Laptop, Repeat, Rocket, ArrowRight } from 'lucide-react';

export const LearningExperienceScene: React.FC = () => {
  const stages = [
    {
      num: 'STAGE 01',
      title: 'Understand',
      subtitle: 'Conceptual Clarity & First Principles',
      desc: 'Clarifying why engineering constraints, algorithmic paradigms, or user experience heuristics exist before starting the software tool.',
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      accent: 'border-amber-500/30 text-amber-400',
    },
    {
      num: 'STAGE 02',
      title: 'Learn',
      subtitle: 'Software Interface Navigation',
      desc: 'Acquiring tactile familiarity with coordinate systems, feature trees, command ribbons, terminal scripts, and design tokens.',
      icon: <Laptop className="w-5 h-5 text-cinematic-red" />,
      accent: 'border-cinematic-red/30 text-cinematic-red',
    },
    {
      num: 'STAGE 03',
      title: 'Practise',
      subtitle: 'Graduated Lab Exercises',
      desc: 'Executing sequential drafting assignments, parametric part configurations, full-stack database links, and UI wireframing.',
      icon: <Repeat className="w-5 h-5 text-blue-400" />,
      accent: 'border-blue-500/30 text-blue-400',
    },
    {
      num: 'STAGE 04',
      title: 'Apply',
      subtitle: 'Real-World Technical Capstones',
      desc: 'Synthesizing acquired skills to produce manufacturing-ready drawings, deployed applications, or professional design portfolios.',
      icon: <Rocket className="w-5 h-5 text-emerald-400" />,
      accent: 'border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-canvas-subtle border-b border-canvas-border overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-canvas-border pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-cinematic-red uppercase tracking-widest block">
              [ SCENE 06 // PEDAGOGICAL NARRATIVE ]
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-ink-pure">
              The 4-Stage <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-pure via-ink-secondary to-cinematic-red">
                Learning Trajectory
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-ink-muted max-w-sm">
            A progressive, repeatable method guiding learners from fundamental understanding to independent technical execution.
          </p>
        </div>

        {/* 4 Connected Stages in Editorial Sequential Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stage, idx) => (
            <div
              key={stage.title}
              className="p-8 rounded-3xl bg-canvas-surface border border-canvas-border hover:border-canvas-borderHover hover:bg-canvas-card transition-all flex flex-col justify-between space-y-8 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-muted">
                    {stage.num}
                  </span>
                  <div className={`p-2 rounded-lg bg-canvas border ${stage.accent}`}>
                    {stage.icon}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink-primary group-hover:text-cinematic-red transition-colors">
                    {stage.title}
                  </h3>
                  <span className="text-xs font-mono text-ink-muted block mt-1">
                    {stage.subtitle}
                  </span>
                </div>

                <p className="text-xs text-ink-secondary font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-canvas-border flex items-center justify-between text-[11px] font-mono text-ink-muted">
                <span>PHASE 0{idx + 1}</span>
                {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-ink-faint hidden lg:block" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

