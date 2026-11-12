import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Terminal, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TechnicalLearningMotionScene: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Conceptual Blueprinting',
      desc: 'Decoding geometrical tolerances, architectural grids, algorithmic time complexities, or user interaction journeys.',
      tag: 'THEORY & LOGIC',
    },
    {
      num: '02',
      title: 'Workstation Implementation',
      desc: 'Translating logic into parameter ribbons in SolidWorks, CSS Flexbox layouts, Python ORM models, or G-Code canned cycles.',
      tag: 'SOFTWARE EXECUTION',
    },
    {
      num: '03',
      title: 'Independent Debugging',
      desc: 'Resolving mechanical mate interferences, runtime exceptions, and design layout friction under direct instructor review.',
      tag: 'CONFIDENCE & MASTERY',
    },
  ];

  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-canvas-subtle border-b border-canvas-border overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-canvas-border pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-cinematic-red uppercase tracking-widest block">
              [ SCENE 04 // TECHNICAL LEARNING IN MOTION ]
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-ink-pure">
              Software Mastery <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-pure via-ink-secondary to-cinematic-red">
                Through Kinetic Practice
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-ink-muted max-w-sm">
            Bridging the divide between textbook formulas and industry production environments through structured workstation hours.
          </p>
        </div>

        {/* Layered Editorial Photographic Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Layered Visual Frame (7 Cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-canvas-border bg-canvas shadow-cinematic">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80"
                  alt="Creative UI and digital software engineering workstation"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-4 bg-canvas/95 border-t border-canvas-border flex items-center justify-between text-xs font-mono">
                <span className="text-ink-secondary">
                  CAD, IT & DIGITAL DESIGN INTERFACES
                </span>
                <span className="text-cinematic-red font-bold">ODDANCHATRAM LAB</span>
              </div>
            </div>

            {/* Floating Overlapping Editorial Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-72 p-5 rounded-2xl bg-canvas-surface/95 backdrop-blur-md border border-canvas-border shadow-cinematic space-y-2">
              <span className="text-[10px] font-mono text-cinematic-red uppercase block">
                PRACTICAL RATIO
              </span>
              <p className="font-display font-bold text-sm text-ink-pure">
                80% Software Practice, 20% Conceptual Grounding
              </p>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                Every theoretical rule is applied directly inside software tools within the same training session.
              </p>
            </div>
          </div>

          {/* Right Narrative Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {pillars.map(pillar => (
                <div
                  key={pillar.num}
                  className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border hover:border-canvas-borderHover transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cinematic-red">
                      {pillar.num} // {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink-primary uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-ink-secondary font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/learning-modes"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinematic-red hover:text-white transition-colors"
              >
                <span>Read About Our Learning Modes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

