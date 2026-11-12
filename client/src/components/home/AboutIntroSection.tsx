import React from 'react';
import {
  Users,
  Layers,
  CheckCircle2,
  Cpu,
  MonitorCheck
} from 'lucide-react';

export const AboutIntroSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Institute Focus (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-between bg-white shadow-subtle">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent-red block">
                INSTITUTE FOCUS
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 leading-snug">
                Direct Software Mastery Over Mere Memorisation.
              </h2>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-800 text-xs font-semibold">
                <MonitorCheck className="w-3.5 h-3.5 text-accent-red" />
                <span>Dedicated Instruction</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Engineering software and modern frameworks cannot be mastered through lectures alone. At GV DESIGN TECH, every theoretical principle is immediately translated into mouse clicks, code keystrokes, and physical drafting on computer workstations.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                Hands-on Exercises
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                Direct Mentor Assistance
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                Real-world Workflows
              </span>
            </div>
          </div>

          {/* Right Card: Practical Lab Emphasis (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-between bg-white shadow-subtle space-y-6">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent-red block">
                PRACTICAL LAB EMPHASIS
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 leading-snug">
                Why Practical Lab Training Drives Technical Careers
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Students spend their training time directly inside professional software suites. We bridge the critical gap between academic syllabus theory and the practical software competence required by modern design consultancies, IT firms, and manufacturing units.
              </p>
            </div>

            {/* Visual Ratio Bar matching reference */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Practical Software Application (80%)</span>
                <span className="text-slate-500 font-normal">Theoretical Grounding (20%)</span>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-slate-950 w-4/5 rounded-l-full" />
                <div className="h-full bg-accent-red w-1/5 rounded-r-full" />
              </div>
            </div>

            {/* Two Lower Callouts with Icons matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-accent-red flex items-center justify-center mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                  1:1 Instructor Guidance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive direct assistance when resolving sketches, constraints, syntax errors, or design bugs.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-2.5">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                  Project-Oriented Exercises
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete comprehensive design drawings, functional web apps, and machine toolpaths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
