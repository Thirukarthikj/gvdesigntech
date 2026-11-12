import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandStatementScene: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-canvas-subtle border-b border-canvas-border overflow-hidden">
      {/* Background kinetic grid & subtle glow */}
      <div className="absolute inset-0 cinema-dots opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-cinematic-red/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between border-b border-canvas-border pb-4 font-mono text-xs text-ink-muted">
          <span className="text-cinematic-red uppercase tracking-widest">
            [ SCENE 02 // INSTITUTIONAL MANIFESTO ]
          </span>
          <span>GV DESIGN TECH • ODDANCHATRAM</span>
        </div>

        {/* Massive Typographic Statement */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter uppercase leading-[0.92] text-ink-primary">
              Where Ideas <br />
              <span className="text-stroke-subtle hover:text-ink-pure transition-colors duration-500">
                Become Practical
              </span> <br />
              <span className="text-cinematic-red">
                Skills.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Narrative Columns with Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-canvas-border items-start">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase text-ink-muted tracking-wider block">
              THE PHILOSOPHY
            </span>
            <h3 className="font-display text-2xl font-bold text-ink-pure">
              Software Fluency Over Theoretical Passive Listening
            </h3>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base text-ink-secondary font-light leading-relaxed">
            <p>
              Engineering, digital design, and software development are applied crafts. At GV DESIGN TECH, theoretical concepts are directly connected to software execution: students sit in front of real tools, manipulating parametric geometry, executing server code, and rendering production assets.
            </p>
            <p>
              Whether joining in-person at our dedicated Oddanchatram campus or connecting remotely via structured live interactive sessions, every student receives direct, step-by-step mentor guidance tailored for academic excellence and long-term career readiness.
            </p>
          </div>
        </div>

        {/* Live Hardware & Telemetry Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border flex flex-col justify-between space-y-4 hover:border-canvas-borderHover transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cinematic-red">[ 01 ]</span>
              <Cpu className="w-5 h-5 text-ink-muted" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-ink-primary uppercase tracking-tight mb-1">
                Precision Engineering CAD
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                SolidWorks, CATIA, Creo, Mastercam, and AutoCAD with real mechanical tolerances.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border flex flex-col justify-between space-y-4 hover:border-canvas-borderHover transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cinematic-red">[ 02 ]</span>
              <Terminal className="w-5 h-5 text-ink-muted" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-ink-primary uppercase tracking-tight mb-1">
                Computer Science & Architecture
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                C, C++, Java, Python, Django frameworks, MySQL database design, and modern Frontend.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border flex flex-col justify-between space-y-4 hover:border-canvas-borderHover transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cinematic-red">[ 03 ]</span>
              <Palette className="w-5 h-5 text-ink-muted" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-ink-primary uppercase tracking-tight mb-1">
                UI/UX & Creative Multimedia
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Figma product workflows, Adobe Photoshop, Illustrator, XD, and digital illustration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

