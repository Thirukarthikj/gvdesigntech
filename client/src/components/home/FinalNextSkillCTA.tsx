import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const FinalNextSkillCTA: React.FC = () => {
  return (
    <section className="relative bg-white py-16 lg:py-24 border-b border-[#EAEAE7] overflow-hidden">
      <div className="max-w-6xl 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Light Editorial Card with Authentic Light-Themed CAD Drafting Background */}
        <div className="relative rounded-2xl border border-[#E5E5E2] p-8 sm:p-14 lg:p-16 text-center shadow-subtle hover:shadow-card transition-all duration-500 overflow-hidden group bg-white">
          
          {/* Authentic Light CAD Technical Drafting Linework Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/images/cad-design-light.jpg"
              alt="CAD technical engineering drafting design with mechanical assemblies and architectural sections"
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out opacity-95"
            />
            {/* Soft Radial Vignette for Clean Typography Contrast */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.85)_0%,_rgba(255,255,255,0.35)_60%,_rgba(255,255,255,0.05)_100%)]" />
          </div>

          {/* Architectural OriginKit Corner Crosshairs */}
          <span className="absolute top-2.5 left-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>
          <span className="absolute top-2.5 right-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>
          <span className="absolute bottom-2.5 left-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>
          <span className="absolute bottom-2.5 right-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>

          {/* Foreground Editorial Content (Pure Light Aesthetics, Zero Black Background) */}
          <div className="relative z-10 max-w-2xl mx-auto">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E5E5E2] shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-[#DC2626] uppercase">
                READY TO MASTER REAL TOOLS?
              </span>
            </div>

            {/* Headline in Signature Editorial Serif */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[52px] leading-[1.1] text-neutral-950 font-normal tracking-tight mb-4">
              Your Next Skill Starts Here.
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed mb-8 font-light">
              Explore our comprehensive software training programs today. Gain authentic competence in mechanical design, computer programming, graphic design, and CNC manufacturing under practical live online mentorship.
            </p>

            {/* Action Buttons (Uiverse Styled in Light Theme Palette) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                to="/courses"
                className="btn-shimmer btn-tactile group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-sm"
              >
                <span>EXPLORE ALL COURSES</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/919655364707?text=Hello%20GV%20DESIGN%20TECH,%20I%20would%20like%20to%20connect%20with%20an%20instructor%20regarding%20online%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded border border-neutral-300 hover:border-neutral-400 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WHATSAPP TECHNICAL MENTORS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>

            {/* Subtext */}
            <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              100% Live Interactive Online Training • Headquartered in Oddanchatram, Tamil Nadu • Mon–Sat 9AM–9PM
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
