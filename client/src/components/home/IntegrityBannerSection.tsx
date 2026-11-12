import React from 'react';
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const IntegrityBannerSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="relative bg-white text-neutral-900 py-16 lg:py-20 border-y border-[#EAEAE7] overflow-hidden">
      {/* Technical CAD Engineering Drafting Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/images/cad-design-light.jpg"
          alt="Technical CAD drafting and engineering blueprint background"
          className="w-full h-full object-cover object-center opacity-95 scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Soft Feathered Gradient: Keeps CAD Linework Crisp & Bold on the Right, Readable on the Left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      {/* OriginKit Architectural Grid Corner Crosshairs */}
      <span className="absolute top-3 left-4 text-neutral-300 font-mono text-xs leading-none select-none z-20">+</span>
      <span className="absolute top-3 right-4 text-neutral-300 font-mono text-xs leading-none select-none z-20">+</span>
      <span className="absolute bottom-3 left-4 text-neutral-300 font-mono text-xs leading-none select-none z-20">+</span>
      <span className="absolute bottom-3 right-4 text-neutral-300 font-mono text-xs leading-none select-none z-20">+</span>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-[#EAEAE7]">
          
          {/* Left Text Block */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-white/95 border border-[#E5E5E2] shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
              <span className="text-[10px] font-mono font-semibold tracking-widest text-[#DC2626] uppercase">
                TRANSPARENCY &amp; INTEGRITY PROMISE
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight text-neutral-950 mb-4 leading-[1.12]">
              Real Skills. Rigorous Live Training. No Gimmicks.
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl font-normal">
              We do not promise fake 100% placement guarantees, fabricated testimonial quotes, or deceptive job shortcuts. We offer disciplined, high-rigour, software-first technical courses designed to build authentic competence and professional confidence for engineers, designers, programmers, and creatives who want genuine capability that speaks for itself.
            </p>
          </div>

          {/* Right Action Buttons (Uiverse Styled) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
            <button
              onClick={() => openEnquiryModal()}
              className="btn-shimmer btn-tactile group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.5)]"
            >
              <span>ENROL FOR UPCOMING BATCHES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="https://wa.me/919655364707?text=Hello%20GV%20DESIGN%20TECH,%20I%20would%20like%20to%20know%20more%20about%20your%20upcoming%20batches."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#FAF9F7] text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded border border-[#E5E5E2] hover:border-neutral-400 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WHATSAPP ADMISSION ADVISOR</span>
            </a>
          </div>

        </div>

        {/* Bottom Contact Quick Strip */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-neutral-500">CALL:</span>
              <a href="tel:+919655364707" className="text-neutral-900 hover:text-[#DC2626] font-semibold transition-colors">
                +91 96553 64707
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="text-neutral-500">EMAIL:</span>
            <a href="mailto:gvdesigntech707@gmail.com" className="text-neutral-900 hover:text-[#DC2626] font-semibold transition-colors">
              gvdesigntech707@gmail.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
