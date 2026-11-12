import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: 'What software tools and versions are taught at GV DESIGN TECH?',
    answer:
      'We train on current industry-standard software releases across mechanical design (AutoCAD, SolidWorks, Creo PTC, CATIA, Mastercam, SolidCAM), IT and software development (C, C++, Java, Python, Django, MySQL, HTML, Frontend frameworks), digital media (Adobe Photoshop, Illustrator, Adobe XD, Figma), Civil architectural software, and industrial CNC/VMC programming.',
  },
  {
    question: 'Who is eligible to apply for our courses?',
    answer:
      'Our programs are open to engineering diploma students, B.E./B.Tech graduates (Mechanical, Civil, EEE, ECE, CSE, IT), arts and science graduates, working technicians seeking advanced software upskilling, and motivated beginners looking to build genuine practical competence. Each course begins from fundamental principles.',
  },
  {
    question: 'How are classes conducted at GV DESIGN TECH?',
    answer:
      'All our courses are conducted 100% Live Online. Students attend scheduled interactive screen-sharing sessions, engage in real-time discussions with instructors, and work on software assignments from home while receiving 1:1 guidance from our faculty based in Oddanchatram, Tamil Nadu.',
  },
  {
    question: 'Where is the institute headquartered?',
    answer:
      'GV DESIGN TECH is headquartered in Oddanchatram, Tamil Nadu, India (Pin: 624619). While our administrative team and faculty are located here, all courses are delivered through live online classes so learners across Tamil Nadu and beyond can attend from anywhere.',
  },
  {
    question: 'What are the institute operating hours?',
    answer:
      'Our team is active Monday to Saturday from 9:00 AM to 9:00 PM. We offer morning, evening, and weekend live online batch timings to comfortably suit college students and working professionals. Sundays are closed.',
  },
  {
    question: 'How do I submit an application or verify course fees?',
    answer:
      'You can submit an online enquiry form directly on this website, send a WhatsApp message or call +91 96553 64707. Our counseling advisors will discuss your academic background, explain the module syllabus, verify current batch vacancies, and provide straightforward fee schedules without hidden charges.',
  },
];

export const FAQAccordionSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#FAF9F7] py-16 lg:py-20 border-b border-[#EAEAE7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-3 px-3 py-1 rounded-full bg-white border border-[#E5E5E2] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="text-[11px] font-mono font-semibold tracking-widest text-[#DC2626] uppercase">
              CLARIFICATIONS
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] text-neutral-950 font-normal tracking-tight">
            Frequently Answered Institutional Queries
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Honest answers about education at GV DESIGN TECH in Oddanchatram, Tamil Nadu.
          </p>
        </div>

        {/* Accordion List (21st.dev Style Smooth Item) */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`bg-white rounded-lg border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-neutral-900 shadow-card'
                    : 'border-[#E5E5E2] hover:border-neutral-400'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-sm sm:text-base font-semibold transition-colors pr-4 ${
                    isOpen ? 'text-[#DC2626]' : 'text-neutral-950 group-hover:text-[#DC2626]'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 p-1 rounded transition-colors ${
                    isOpen ? 'bg-[#FAF9F7] text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-900'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-[#F0F0EE] animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
