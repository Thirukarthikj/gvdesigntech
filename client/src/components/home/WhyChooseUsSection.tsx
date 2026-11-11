import React from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { PhoneCall, ArrowRight, ShieldCheck, MapPin, Clock } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark High-Contrast Statement Banner matching reference */}
        <div className="rounded-2xl bg-slate-950 text-white p-8 sm:p-12 lg:p-14 shadow-premium border border-slate-900 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headline & Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
                AUTHENTIC TECHNICAL EDUCATION
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight text-white leading-tight">
                Real Skills in Oddanchatram. No Gimmicks.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                We do not sell false 100% placement guarantees or inflated claims. We provide rigorous, hands-on software education that gives engineering students, diploma holders, and graduates genuine, verifiable competence to succeed on their own merits.
              </p>
            </div>

            {/* Right Action CTAs (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => openEnquiryModal()}
                className="w-full py-3.5 px-6 rounded bg-accent-orange hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider text-center shadow-sm transition-all"
              >
                <span>Enquire About Courses</span>
              </button>

              <a
                href="tel:+919655364707"
                className="w-full py-3.5 px-6 rounded bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider text-center border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-accent-orange" />
                <span>Call +91 96553 64707</span>
              </a>
            </div>
          </div>

          {/* Bottom Strip matching reference */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-accent-orange" />
              <span>Direct Numbers: +91 96553 64707 / +91 63819 74581</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span>Operating Schedule: Mon–Sat: 9:00 AM – 9:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-300" />
              <span>Campus Location: Oddanchatram, Tamil Nadu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
