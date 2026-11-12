import React, { useState } from 'react';
import { Phone, Mail, Instagram, Clock, Copy, Check } from 'lucide-react';
import { EnquiryForm } from '../common/EnquiryForm';

export const EnrolmentConversationSection: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <section id="contact-section" className="relative bg-white py-14 sm:py-16 lg:py-20 border-b border-[#EAEAE7]">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#FAF9F7] border border-[#E5E5E2] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8592B]" />
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-[#E8592B] uppercase">
              GET IN TOUCH WITH US
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-[46px] leading-[1.15] sm:leading-[1.12] text-neutral-950 font-normal tracking-tight">
            Begin Your Enrolment Conversation
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 mt-2 max-w-2xl leading-relaxed">
            Whether you are an engineering student preparing for your first role, a graduate seeking specialized software mastery, or a professional aiming to upgrade skills, our team is ready to guide your course selection.
          </p>
        </div>

        {/* 2-Column Grid (Responsive Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            
            {/* Phone Card 1 (Uiverse Copy Interaction & Dial) */}
            <div className="card-interactive p-4 sm:p-5 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] flex items-center justify-between group">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-white border border-[#E5E5E2] flex items-center justify-center text-[#E8592B] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    DIRECT ADMISSIONS &amp; COUNSELING HOTLINE
                  </div>
                  <a
                    href="tel:+919655364707"
                    className="text-sm sm:text-base md:text-lg font-bold text-neutral-950 hover:text-[#E8592B] transition-colors"
                  >
                    +91 96553 64707
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('+91 96553 64707', 'p1')}
                className="p-2 rounded bg-white border border-[#E5E5E2] hover:border-neutral-400 text-neutral-400 hover:text-neutral-900 transition-colors"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedItem === 'p1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Email Card */}
            <div className="card-interactive p-4 sm:p-5 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] flex items-center justify-between group">
              <div className="flex items-center gap-3 sm:gap-3.5 overflow-hidden">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-white border border-[#E5E5E2] flex items-center justify-center text-[#E8592B] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    DIRECT EMAIL COUNSELING
                  </div>
                  <a
                    href="mailto:gvdesigntech707@gmail.com"
                    className="text-xs sm:text-sm md:text-base font-semibold text-neutral-950 hover:text-[#E8592B] transition-colors truncate block"
                  >
                    gvdesigntech707@gmail.com
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('gvdesigntech707@gmail.com', 'email')}
                className="p-2 rounded bg-white border border-[#E5E5E2] hover:border-neutral-400 text-neutral-400 hover:text-neutral-900 transition-colors shrink-0"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Instagram Card */}
            <div className="card-interactive p-4 sm:p-5 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] group">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-white border border-[#E5E5E2] flex items-center justify-center text-[#E8592B] shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    OFFICIAL INSTAGRAM
                  </div>
                  <a
                    href="https://instagram.com/gvdesigntech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm md:text-base font-semibold text-neutral-950 hover:text-[#E8592B] transition-colors"
                  >
                    @gvdesigntech
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="p-4 sm:p-5 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2]">
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-white border border-[#E5E5E2] flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-0.5">
                    INSTITUTE OPERATING HOURS
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-900">
                    Monday – Saturday: 9:00 AM – 9:00 PM
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
                    Sunday: Closed for maintenance &amp; curriculum review
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Course Application Details Form (OriginKit Form Card) */}
          <div className="relative lg:col-span-7 bg-white rounded-lg border border-[#E5E5E2] p-5 sm:p-8 shadow-card">
            {/* OriginKit Crosshairs */}
            <span className="absolute -top-1.5 -left-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
            <span className="absolute -top-1.5 -right-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>

            <div className="mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#F0F0EE]">
              <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-1">
                ADMISSION REGISTRATION
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-normal text-neutral-950">
                Course Application Details
              </h3>
            </div>

            <EnquiryForm />
          </div>

        </div>

      </div>
    </section>
  );
};
