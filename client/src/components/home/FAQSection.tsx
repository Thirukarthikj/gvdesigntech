import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/faqData';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const { openEnquiryModal } = useEnquiryModal();

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching reference */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
            FAQ & POLICIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-slate-950">
            Frequently Answered Instructional Queries
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Clear, transparent facts about GV DESIGN TECH in Oddanchatram, Tamil Nadu.
          </p>
        </div>

        {/* Minimal Accordion Rows matching reference */}
        <div className="space-y-3">
          {FAQ_DATA.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-b border-slate-200 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <span
                    className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                      isOpen ? 'text-accent-orange' : 'text-slate-900 group-hover:text-slate-700'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-accent-orange' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Link */}
        <div className="text-center pt-4">
          <button
            onClick={() => openEnquiryModal()}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-accent-orange inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Have a specific syllabus question? Enquire directly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
